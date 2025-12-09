-- =====================================================
-- CRM ALMA - Seed Data
-- Execute este SQL APÓS o schema inicial
-- =====================================================

-- Função para criar organização e pipeline padrão para um usuário
-- Será chamada após o primeiro login do usuário
CREATE OR REPLACE FUNCTION setup_user_organization(
    p_user_id UUID,
    p_org_name TEXT DEFAULT 'Minha Organização',
    p_org_slug TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_org_id UUID;
    v_pipeline_id UUID;
    v_slug TEXT;
BEGIN
    -- Gerar slug se não fornecido
    v_slug := COALESCE(p_org_slug, LOWER(REPLACE(p_org_name, ' ', '-')) || '-' || SUBSTRING(p_user_id::TEXT, 1, 8));
    
    -- Criar organização
    INSERT INTO organizations (name, slug, owner_id)
    VALUES (p_org_name, v_slug, p_user_id)
    RETURNING id INTO v_org_id;
    
    -- Atualizar profile com organization_id
    UPDATE profiles 
    SET organization_id = v_org_id, role = 'admin'
    WHERE id = p_user_id;
    
    -- Criar pipeline padrão
    INSERT INTO pipelines (organization_id, name, description, is_default, display_order)
    VALUES (v_org_id, 'Pipeline Principal', 'Funil de vendas principal', true, 0)
    RETURNING id INTO v_pipeline_id;
    
    -- Criar stages padrão
    INSERT INTO pipeline_stages (pipeline_id, name, color, display_order, probability, is_won, is_lost) VALUES
        (v_pipeline_id, 'Novo Lead', '#94a3b8', 0, 10, false, false),
        (v_pipeline_id, 'Qualificação', '#f59e0b', 1, 25, false, false),
        (v_pipeline_id, 'Proposta', '#605be5', 2, 50, false, false),
        (v_pipeline_id, 'Negociação', '#8b5cf6', 3, 75, false, false),
        (v_pipeline_id, 'Fechamento', '#06b6d4', 4, 90, false, false),
        (v_pipeline_id, 'Ganho', '#22c55e', 5, 100, true, false),
        (v_pipeline_id, 'Perdido', '#ef4444', 6, 0, false, true);
    
    RETURN v_org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para convidar usuário para organização
CREATE OR REPLACE FUNCTION invite_user_to_organization(
    p_inviter_id UUID,
    p_email TEXT,
    p_role user_role DEFAULT 'sales'
)
RETURNS JSONB AS $$
DECLARE
    v_org_id UUID;
    v_existing_user UUID;
BEGIN
    -- Obter organização do usuário que está convidando
    SELECT organization_id INTO v_org_id FROM profiles WHERE id = p_inviter_id;
    
    IF v_org_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Inviter has no organization');
    END IF;
    
    -- Verificar se email já existe
    SELECT id INTO v_existing_user FROM profiles WHERE email = p_email;
    
    IF v_existing_user IS NOT NULL THEN
        -- Atualizar organização do usuário existente
        UPDATE profiles 
        SET organization_id = v_org_id, role = p_role
        WHERE id = v_existing_user;
        
        RETURN jsonb_build_object('success', true, 'user_id', v_existing_user, 'new_user', false);
    END IF;
    
    -- Se não existe, retornar info para enviar convite por email
    RETURN jsonb_build_object(
        'success', true, 
        'organization_id', v_org_id, 
        'email', p_email, 
        'role', p_role,
        'new_user', true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- View para estatísticas do dashboard
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
    p.id as profile_id,
    p.organization_id,
    
    -- Deals stats
    (SELECT COUNT(*) FROM deals d WHERE d.organization_id = p.organization_id AND NOT d.is_won AND NOT d.is_lost) as open_deals_count,
    (SELECT COALESCE(SUM(value), 0) FROM deals d WHERE d.organization_id = p.organization_id AND NOT d.is_won AND NOT d.is_lost) as open_deals_value,
    (SELECT COUNT(*) FROM deals d WHERE d.organization_id = p.organization_id AND d.is_won AND d.actual_close_date >= DATE_TRUNC('month', CURRENT_DATE)) as won_deals_month,
    (SELECT COALESCE(SUM(value), 0) FROM deals d WHERE d.organization_id = p.organization_id AND d.is_won AND d.actual_close_date >= DATE_TRUNC('month', CURRENT_DATE)) as won_value_month,
    
    -- Conversations stats
    (SELECT COUNT(*) FROM conversations c WHERE c.organization_id = p.organization_id AND c.status = 'open') as open_conversations,
    (SELECT COUNT(*) FROM conversations c WHERE c.organization_id = p.organization_id AND c.status = 'open' AND c.assigned_to = p.id) as my_open_conversations,
    
    -- Tasks stats
    (SELECT COUNT(*) FROM tasks t WHERE t.organization_id = p.organization_id AND t.status != 'done' AND t.due_date = CURRENT_DATE) as tasks_due_today,
    (SELECT COUNT(*) FROM tasks t WHERE t.assigned_to = p.id AND t.status != 'done' AND t.due_date <= CURRENT_DATE) as my_overdue_tasks,
    
    -- Contacts stats
    (SELECT COUNT(*) FROM contacts c WHERE c.organization_id = p.organization_id) as total_contacts,
    (SELECT COUNT(*) FROM contacts c WHERE c.organization_id = p.organization_id AND c.created_at >= DATE_TRUNC('month', CURRENT_DATE)) as new_contacts_month

FROM profiles p;

-- Habilitar RLS na view
-- Views herdam as policies das tabelas base

-- Função para buscar deals por stage (para o Kanban)
CREATE OR REPLACE FUNCTION get_deals_by_pipeline(p_pipeline_id UUID)
RETURNS TABLE (
    stage_id UUID,
    stage_name TEXT,
    stage_color TEXT,
    stage_order INT,
    deals JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ps.id as stage_id,
        ps.name as stage_name,
        ps.color as stage_color,
        ps.display_order as stage_order,
        COALESCE(
            jsonb_agg(
                jsonb_build_object(
                    'id', d.id,
                    'title', d.title,
                    'value', d.value,
                    'probability', d.probability,
                    'contact_id', d.contact_id,
                    'contact_name', c.first_name || ' ' || COALESCE(c.last_name, ''),
                    'company_id', d.company_id,
                    'company_name', co.name,
                    'owner_id', d.owner_id,
                    'owner_name', pr.full_name,
                    'expected_close_date', d.expected_close_date,
                    'created_at', d.created_at,
                    'moved_at', d.moved_at
                ) ORDER BY d.moved_at DESC
            ) FILTER (WHERE d.id IS NOT NULL),
            '[]'::jsonb
        ) as deals
    FROM pipeline_stages ps
    LEFT JOIN deals d ON d.stage_id = ps.id AND NOT d.is_won AND NOT d.is_lost
    LEFT JOIN contacts c ON c.id = d.contact_id
    LEFT JOIN companies co ON co.id = d.company_id
    LEFT JOIN profiles pr ON pr.id = d.owner_id
    WHERE ps.pipeline_id = p_pipeline_id
    GROUP BY ps.id, ps.name, ps.color, ps.display_order
    ORDER BY ps.display_order;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para mover deal entre stages
CREATE OR REPLACE FUNCTION move_deal_to_stage(
    p_deal_id UUID,
    p_new_stage_id UUID,
    p_new_order INT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_stage RECORD;
BEGIN
    -- Obter info do novo stage
    SELECT * INTO v_stage FROM pipeline_stages WHERE id = p_new_stage_id;
    
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;
    
    -- Atualizar deal
    UPDATE deals
    SET 
        stage_id = p_new_stage_id,
        probability = v_stage.probability,
        is_won = v_stage.is_won,
        is_lost = v_stage.is_lost,
        actual_close_date = CASE WHEN v_stage.is_won OR v_stage.is_lost THEN CURRENT_DATE ELSE NULL END,
        moved_at = NOW()
    WHERE id = p_deal_id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para buscar timeline de um deal/contact
CREATE OR REPLACE FUNCTION get_timeline(
    p_deal_id UUID DEFAULT NULL,
    p_contact_id UUID DEFAULT NULL,
    p_limit INT DEFAULT 50
)
RETURNS TABLE (
    id UUID,
    type TEXT,
    title TEXT,
    description TEXT,
    actor_name TEXT,
    actor_avatar TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.type::TEXT,
        a.title,
        a.description,
        p.full_name as actor_name,
        p.avatar_url as actor_avatar,
        a.metadata,
        a.created_at
    FROM activities a
    LEFT JOIN profiles p ON p.id = a.actor_id
    WHERE 
        (p_deal_id IS NULL OR a.deal_id = p_deal_id)
        AND (p_contact_id IS NULL OR a.contact_id = p_contact_id)
    ORDER BY a.created_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Habilitar Realtime para tabelas importantes
ALTER PUBLICATION supabase_realtime ADD TABLE deals;
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE activities;

