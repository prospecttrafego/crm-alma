-- =====================================================
-- CRM ALMA - Schema Inicial
-- Execute este SQL no Supabase SQL Editor
-- =====================================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMS (Tipos Enumerados)
-- =====================================================

-- Roles dos usuários na organização
CREATE TYPE user_role AS ENUM ('admin', 'sales', 'support', 'cs');

-- Fonte de contatos
CREATE TYPE contact_source AS ENUM ('email', 'form', 'manual', 'import', 'api', 'whatsapp', 'referral');

-- Status de contatos
CREATE TYPE contact_status AS ENUM ('lead', 'prospect', 'customer', 'inactive');

-- Canais de comunicação
CREATE TYPE channel_type AS ENUM ('email', 'internal', 'whatsapp', 'sms', 'telegram', 'phone');

-- Status de conversas
CREATE TYPE conversation_status AS ENUM ('open', 'resolved', 'on_hold', 'closed');

-- Prioridade
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high', 'urgent');

-- Tipo de mensagem
CREATE TYPE message_type AS ENUM ('text', 'internal_comment', 'attachment', 'system');

-- Tipo de atividade
CREATE TYPE activity_type AS ENUM ('call', 'email', 'meeting', 'note', 'task', 'status_change', 'deal_created', 'deal_won', 'deal_lost');

-- Status de tasks
CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'done', 'cancelled');

-- =====================================================
-- TABELAS PRINCIPAIS
-- =====================================================

-- Organizations (Multi-tenant)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles (Extensão de auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT NOT NULL,
    avatar_url TEXT,
    role user_role DEFAULT 'sales',
    is_active BOOLEAN DEFAULT true,
    phone TEXT,
    job_title TEXT,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Companies (Empresas/Clientes)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    domain TEXT,
    website TEXT,
    industry TEXT,
    size TEXT, -- '1-10', '11-50', '51-200', '201-500', '500+'
    logo_url TEXT,
    description TEXT,
    address JSONB DEFAULT '{}', -- {street, city, state, country, zip}
    social_links JSONB DEFAULT '{}', -- {linkedin, facebook, instagram}
    custom_fields JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts (Contatos/Leads)
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    whatsapp TEXT,
    job_title TEXT,
    department TEXT,
    avatar_url TEXT,
    tags TEXT[] DEFAULT '{}',
    source contact_source DEFAULT 'manual',
    status contact_status DEFAULT 'lead',
    description TEXT,
    address JSONB DEFAULT '{}',
    social_links JSONB DEFAULT '{}',
    custom_fields JSONB DEFAULT '{}',
    last_contacted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pipelines (Funis de vendas)
CREATE TABLE pipelines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pipeline Stages (Etapas do funil)
CREATE TABLE pipeline_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pipeline_id UUID NOT NULL REFERENCES pipelines(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#605be5', -- Cor padrão Alma
    display_order INT DEFAULT 0,
    is_won BOOLEAN DEFAULT false,
    is_lost BOOLEAN DEFAULT false,
    probability INT DEFAULT 50 CHECK (probability >= 0 AND probability <= 100),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deals (Negócios/Oportunidades)
CREATE TABLE deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    pipeline_id UUID NOT NULL REFERENCES pipelines(id) ON DELETE CASCADE,
    stage_id UUID NOT NULL REFERENCES pipeline_stages(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    value NUMERIC(15,2) DEFAULT 0,
    currency TEXT DEFAULT 'BRL',
    probability INT DEFAULT 50 CHECK (probability >= 0 AND probability <= 100),
    expected_close_date DATE,
    actual_close_date DATE,
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    custom_fields JSONB DEFAULT '{}',
    is_won BOOLEAN DEFAULT false,
    is_lost BOOLEAN DEFAULT false,
    lost_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    moved_at TIMESTAMPTZ DEFAULT NOW() -- Última vez que mudou de stage
);

-- Conversations (Conversas do Inbox)
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    deal_id UUID REFERENCES deals(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    channel channel_type DEFAULT 'email',
    subject TEXT,
    status conversation_status DEFAULT 'open',
    priority priority_level DEFAULT 'medium',
    is_read BOOLEAN DEFAULT false,
    last_message_preview TEXT,
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}', -- Para dados específicos do canal
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages (Mensagens das conversas)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- NULL se for mensagem externa
    sender_name TEXT, -- Nome do remetente externo
    sender_email TEXT, -- Email do remetente externo
    body TEXT NOT NULL,
    body_html TEXT, -- Versão HTML se disponível
    message_type message_type DEFAULT 'text',
    is_internal BOOLEAN DEFAULT false, -- Comentário interno
    is_outbound BOOLEAN DEFAULT false, -- Se foi enviada pela equipe
    attachments JSONB DEFAULT '[]', -- [{name, url, type, size}]
    read_by JSONB DEFAULT '[]', -- [user_id, ...]
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activities (Atividades/Timeline)
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    type activity_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    scheduled_for TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    duration_minutes INT,
    metadata JSONB DEFAULT '{}', -- Dados adicionais específicos do tipo
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks (Tarefas)
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    deal_id UUID REFERENCES deals(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    due_time TIME,
    priority priority_level DEFAULT 'medium',
    status task_status DEFAULT 'todo',
    tags TEXT[] DEFAULT '{}',
    reminder_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Profiles
CREATE INDEX idx_profiles_organization ON profiles(organization_id);
CREATE INDEX idx_profiles_email ON profiles(email);

-- Companies
CREATE INDEX idx_companies_organization ON companies(organization_id);
CREATE INDEX idx_companies_name ON companies(organization_id, name);

-- Contacts
CREATE INDEX idx_contacts_organization ON contacts(organization_id);
CREATE INDEX idx_contacts_company ON contacts(company_id);
CREATE INDEX idx_contacts_owner ON contacts(owner_id);
CREATE INDEX idx_contacts_email ON contacts(organization_id, email);
CREATE INDEX idx_contacts_status ON contacts(organization_id, status);

-- Pipelines
CREATE INDEX idx_pipelines_organization ON pipelines(organization_id);

-- Pipeline Stages
CREATE INDEX idx_stages_pipeline ON pipeline_stages(pipeline_id);
CREATE INDEX idx_stages_order ON pipeline_stages(pipeline_id, display_order);

-- Deals
CREATE INDEX idx_deals_organization ON deals(organization_id);
CREATE INDEX idx_deals_pipeline ON deals(pipeline_id);
CREATE INDEX idx_deals_stage ON deals(stage_id);
CREATE INDEX idx_deals_contact ON deals(contact_id);
CREATE INDEX idx_deals_owner ON deals(owner_id);
CREATE INDEX idx_deals_status ON deals(organization_id, is_won, is_lost);

-- Conversations
CREATE INDEX idx_conversations_organization ON conversations(organization_id);
CREATE INDEX idx_conversations_contact ON conversations(contact_id);
CREATE INDEX idx_conversations_assigned ON conversations(assigned_to);
CREATE INDEX idx_conversations_status ON conversations(organization_id, status);
CREATE INDEX idx_conversations_last_message ON conversations(organization_id, last_message_at DESC);

-- Messages
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_created ON messages(conversation_id, created_at DESC);

-- Activities
CREATE INDEX idx_activities_organization ON activities(organization_id);
CREATE INDEX idx_activities_contact ON activities(contact_id);
CREATE INDEX idx_activities_deal ON activities(deal_id);
CREATE INDEX idx_activities_created ON activities(organization_id, created_at DESC);

-- Tasks
CREATE INDEX idx_tasks_organization ON tasks(organization_id);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX idx_tasks_due ON tasks(organization_id, due_date);
CREATE INDEX idx_tasks_status ON tasks(organization_id, status);

-- =====================================================
-- FUNÇÕES AUXILIARES
-- =====================================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Função para criar profile automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para atualizar last_message_at na conversation
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE conversations
    SET 
        last_message_at = NEW.created_at,
        last_message_preview = LEFT(NEW.body, 100),
        updated_at = NOW()
    WHERE id = NEW.conversation_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Função para criar atividade quando deal muda de stage
CREATE OR REPLACE FUNCTION log_deal_stage_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.stage_id IS DISTINCT FROM NEW.stage_id THEN
        NEW.moved_at = NOW();
        
        INSERT INTO activities (
            organization_id,
            deal_id,
            contact_id,
            actor_id,
            type,
            title,
            metadata
        ) VALUES (
            NEW.organization_id,
            NEW.id,
            NEW.contact_id,
            NEW.owner_id,
            'status_change',
            'Deal movido para nova etapa',
            jsonb_build_object(
                'old_stage_id', OLD.stage_id,
                'new_stage_id', NEW.stage_id
            )
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Triggers para updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pipelines_updated_at BEFORE UPDATE ON pipelines
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pipeline_stages_updated_at BEFORE UPDATE ON pipeline_stages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para criar profile quando usuário se registra
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Trigger para atualizar last_message_at
CREATE TRIGGER on_new_message
    AFTER INSERT ON messages
    FOR EACH ROW EXECUTE FUNCTION update_conversation_last_message();

-- Trigger para log de mudança de stage
CREATE TRIGGER on_deal_stage_change
    BEFORE UPDATE ON deals
    FOR EACH ROW EXECUTE FUNCTION log_deal_stage_change();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Função helper para obter organization_id do usuário atual
CREATE OR REPLACE FUNCTION get_user_organization_id()
RETURNS UUID AS $$
    SELECT organization_id FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- =====================================================
-- POLICIES - Organizations
-- =====================================================

CREATE POLICY "Users can view their organization"
    ON organizations FOR SELECT
    USING (id = get_user_organization_id() OR owner_id = auth.uid());

CREATE POLICY "Owners can update their organization"
    ON organizations FOR UPDATE
    USING (owner_id = auth.uid());

CREATE POLICY "Anyone can create organization"
    ON organizations FOR INSERT
    WITH CHECK (true);

-- =====================================================
-- POLICIES - Profiles
-- =====================================================

CREATE POLICY "Users can view profiles in their organization"
    ON profiles FOR SELECT
    USING (organization_id = get_user_organization_id() OR id = auth.uid());

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (id = auth.uid());

CREATE POLICY "Allow profile creation on signup"
    ON profiles FOR INSERT
    WITH CHECK (id = auth.uid());

-- =====================================================
-- POLICIES - Companies
-- =====================================================

CREATE POLICY "Users can view companies in their organization"
    ON companies FOR SELECT
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can create companies in their organization"
    ON companies FOR INSERT
    WITH CHECK (organization_id = get_user_organization_id());

CREATE POLICY "Users can update companies in their organization"
    ON companies FOR UPDATE
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can delete companies in their organization"
    ON companies FOR DELETE
    USING (organization_id = get_user_organization_id());

-- =====================================================
-- POLICIES - Contacts
-- =====================================================

CREATE POLICY "Users can view contacts in their organization"
    ON contacts FOR SELECT
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can create contacts in their organization"
    ON contacts FOR INSERT
    WITH CHECK (organization_id = get_user_organization_id());

CREATE POLICY "Users can update contacts in their organization"
    ON contacts FOR UPDATE
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can delete contacts in their organization"
    ON contacts FOR DELETE
    USING (organization_id = get_user_organization_id());

-- =====================================================
-- POLICIES - Pipelines
-- =====================================================

CREATE POLICY "Users can view pipelines in their organization"
    ON pipelines FOR SELECT
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can create pipelines in their organization"
    ON pipelines FOR INSERT
    WITH CHECK (organization_id = get_user_organization_id());

CREATE POLICY "Users can update pipelines in their organization"
    ON pipelines FOR UPDATE
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can delete pipelines in their organization"
    ON pipelines FOR DELETE
    USING (organization_id = get_user_organization_id());

-- =====================================================
-- POLICIES - Pipeline Stages
-- =====================================================

CREATE POLICY "Users can view stages of their pipelines"
    ON pipeline_stages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM pipelines 
            WHERE pipelines.id = pipeline_stages.pipeline_id 
            AND pipelines.organization_id = get_user_organization_id()
        )
    );

CREATE POLICY "Users can create stages in their pipelines"
    ON pipeline_stages FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM pipelines 
            WHERE pipelines.id = pipeline_stages.pipeline_id 
            AND pipelines.organization_id = get_user_organization_id()
        )
    );

CREATE POLICY "Users can update stages in their pipelines"
    ON pipeline_stages FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM pipelines 
            WHERE pipelines.id = pipeline_stages.pipeline_id 
            AND pipelines.organization_id = get_user_organization_id()
        )
    );

CREATE POLICY "Users can delete stages in their pipelines"
    ON pipeline_stages FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM pipelines 
            WHERE pipelines.id = pipeline_stages.pipeline_id 
            AND pipelines.organization_id = get_user_organization_id()
        )
    );

-- =====================================================
-- POLICIES - Deals
-- =====================================================

CREATE POLICY "Users can view deals in their organization"
    ON deals FOR SELECT
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can create deals in their organization"
    ON deals FOR INSERT
    WITH CHECK (organization_id = get_user_organization_id());

CREATE POLICY "Users can update deals in their organization"
    ON deals FOR UPDATE
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can delete deals in their organization"
    ON deals FOR DELETE
    USING (organization_id = get_user_organization_id());

-- =====================================================
-- POLICIES - Conversations
-- =====================================================

CREATE POLICY "Users can view conversations in their organization"
    ON conversations FOR SELECT
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can create conversations in their organization"
    ON conversations FOR INSERT
    WITH CHECK (organization_id = get_user_organization_id());

CREATE POLICY "Users can update conversations in their organization"
    ON conversations FOR UPDATE
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can delete conversations in their organization"
    ON conversations FOR DELETE
    USING (organization_id = get_user_organization_id());

-- =====================================================
-- POLICIES - Messages
-- =====================================================

CREATE POLICY "Users can view messages in their conversations"
    ON messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM conversations 
            WHERE conversations.id = messages.conversation_id 
            AND conversations.organization_id = get_user_organization_id()
        )
    );

CREATE POLICY "Users can create messages in their conversations"
    ON messages FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM conversations 
            WHERE conversations.id = messages.conversation_id 
            AND conversations.organization_id = get_user_organization_id()
        )
    );

CREATE POLICY "Users can update messages in their conversations"
    ON messages FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM conversations 
            WHERE conversations.id = messages.conversation_id 
            AND conversations.organization_id = get_user_organization_id()
        )
    );

-- =====================================================
-- POLICIES - Activities
-- =====================================================

CREATE POLICY "Users can view activities in their organization"
    ON activities FOR SELECT
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can create activities in their organization"
    ON activities FOR INSERT
    WITH CHECK (organization_id = get_user_organization_id());

CREATE POLICY "Users can update activities in their organization"
    ON activities FOR UPDATE
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can delete activities in their organization"
    ON activities FOR DELETE
    USING (organization_id = get_user_organization_id());

-- =====================================================
-- POLICIES - Tasks
-- =====================================================

CREATE POLICY "Users can view tasks in their organization"
    ON tasks FOR SELECT
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can create tasks in their organization"
    ON tasks FOR INSERT
    WITH CHECK (organization_id = get_user_organization_id());

CREATE POLICY "Users can update tasks in their organization"
    ON tasks FOR UPDATE
    USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can delete tasks in their organization"
    ON tasks FOR DELETE
    USING (organization_id = get_user_organization_id());

-- =====================================================
-- DADOS INICIAIS (Seed)
-- =====================================================

-- Nota: Os dados iniciais serão criados quando o primeiro usuário se registrar
-- através da aplicação, que criará a organização e o pipeline padrão.

