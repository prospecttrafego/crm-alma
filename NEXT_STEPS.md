# 🚀 Próximos Passos Imediatos - CRM Alma

> Este documento contém as ações práticas para colocar o CRM em funcionamento real.
> 
> **Última atualização:** 9 de Dezembro de 2025

---

## ✅ Melhorias de Frontend Concluídas

As seguintes melhorias de UX/UI foram implementadas e não dependem do backend:

| Melhoria | Status |
|----------|--------|
| Componentes de Loading Skeleton reutilizáveis | ✅ Concluído |
| Componentes de Empty State com variantes | ✅ Concluído |
| Tooltips nos ícones do menu recolhido | ✅ Concluído |
| Formulário de registro melhorado (campo organização) | ✅ Concluído |
| Formulários visuais de criação de Contato e Empresa | ✅ Concluído |
| Modal de criação de Deal no Pipeline | ✅ Concluído |
| Drawer de detalhes do Deal com abas | ✅ Concluído |
| Página de Onboarding multi-step | ✅ Concluído |
| Animações e transições CSS aprimoradas | ✅ Concluído |
| Removidas dependências não utilizadas (Mantine) | ✅ Concluído |
| Deletadas pastas legadas (blog-posts, categories) | ✅ Concluído |

---

## ⚡ Ação Imediata: Configurar Supabase

### Passo 1: Executar o Schema SQL

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto: `hnuipvspkyhqzvbmeyot`
3. Vá em **SQL Editor**
4. Copie e cole o conteúdo de `supabase/migrations/001_initial_schema.sql`
5. Clique em **Run**
6. Repita para `supabase/migrations/002_seed_data.sql`

### Passo 2: Verificar Tabelas Criadas

No Supabase, vá em **Table Editor** e confirme que existem:
- `organizations`
- `profiles`
- `companies`
- `contacts`
- `pipelines`
- `pipeline_stages`
- `deals`
- `conversations`
- `messages`
- `activities`
- `tasks`

### Passo 3: Configurar Autenticação

1. No Supabase, vá em **Authentication** > **Providers**
2. Habilite **Email** (já deve estar habilitado)
3. (Opcional) Configure **Google** e **GitHub**

### Passo 4: Ativar AuthProvider Real

No arquivo `src/App.tsx`, troque:

```tsx
// DE:
import authProvider from "./authProvider.dev";

// PARA:
import authProvider from "./authProvider";
```

### Passo 5: Criar Primeiro Usuário

1. Acesse `http://localhost:5173/register`
2. Crie uma conta com email/senha
3. Verifique o email (ou desabilite verificação no Supabase para dev)
4. Faça login

---

## 📝 Tarefas Restantes por Página

### Dashboard (`/dashboard`)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Conectar cards às queries reais | Alta | 2h |
| Gráfico de receita com dados reais | Alta | 2h |
| Gráfico de deals por etapa | Alta | 1h |
| Lista de deals recentes | Média | 1h |
| Lista de tarefas do dia | Média | 1h |

### Pipeline (`/pipeline`)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Carregar stages do banco | Alta | 1h |
| Carregar deals por stage | Alta | 2h |
| Persistir drag-and-drop | Alta | 2h |
| ~~Modal de criação de deal~~ | ✅ Concluído | - |
| ~~Drawer de detalhes do deal~~ | ✅ Concluído | - |
| Filtros funcionais | Média | 2h |

### Inbox (`/inbox`)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Carregar conversas do banco | Alta | 2h |
| Carregar mensagens da conversa | Alta | 2h |
| Enviar nova mensagem | Alta | 2h |
| Criar nota interna | Alta | 1h |
| Realtime para novas mensagens | Alta | 3h |
| Upload de anexos | Média | 3h |

### Contatos (`/contacts`)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Lista com paginação real | Alta | 2h |
| Busca funcional | Alta | 1h |
| Filtros por status/empresa | Alta | 2h |
| ~~Formulário de criação visual~~ | ✅ Concluído | - |
| Formulário de edição | Alta | 2h |
| Página de detalhes | Alta | 4h |

### Empresas (`/companies`)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| CRUD com dados reais | Alta | 4h |
| ~~Formulário de criação visual~~ | ✅ Concluído | - |
| Lista de contatos da empresa | Média | 2h |
| Deals da empresa | Média | 2h |

### Tarefas (`/tasks`)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Lista com dados reais | Alta | 2h |
| Criar tarefa | Alta | 2h |
| Marcar como concluída | Alta | 1h |
| Filtros por data/prioridade | Média | 2h |

### Configurações (`/settings`)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Salvar perfil no banco | Alta | 2h |
| Salvar organização | Alta | 2h |
| CRUD de stages do pipeline | Alta | 4h |
| Preferências de notificação | Baixa | 2h |

---

## 🔧 Código para Conectar ao Supabase

### Exemplo: Lista de Contatos

```tsx
// src/pages/contacts/list.tsx
import { useList, useGo } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";

export const ContactList = () => {
  const go = useGo();
  
  const { tableQuery } = useTable({
    resource: "contacts",
    pagination: {
      pageSize: 20,
    },
    sorters: {
      initial: [{ field: "created_at", order: "desc" }],
    },
  });

  const { data, isLoading, isError } = tableQuery;

  if (isLoading) return <ContactListSkeleton />;
  if (isError) return <ErrorState />;
  if (!data?.data.length) return <EmptyState variant="contacts" />;

  return (
    <div>
      {data.data.map((contact) => (
        <ContactRow 
          key={contact.id} 
          contact={contact}
          onClick={() => go({ to: `/contacts/show/${contact.id}` })}
        />
      ))}
    </div>
  );
};
```

### Exemplo: Criar Contato

```tsx
// src/pages/contacts/create.tsx
import { useForm } from "@refinedev/react-hook-form";
import { useCreate, useGo, useGetIdentity } from "@refinedev/core";

export const ContactCreate = () => {
  const go = useGo();
  const { data: user } = useGetIdentity();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: createContact, isLoading } = useCreate();

  const onSubmit = (data) => {
    createContact({
      resource: "contacts",
      values: {
        ...data,
        organization_id: user?.organizationId,
        owner_id: user?.id,
      },
    }, {
      onSuccess: () => {
        go({ to: "/contacts" });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* campos do formulário */}
    </form>
  );
};
```

### Exemplo: Realtime no Inbox

```tsx
// src/hooks/useConversationRealtime.ts
import { useEffect } from "react";
import { supabaseClient } from "@/utility/supabaseClient";

export function useConversationRealtime(conversationId: string, onNewMessage: (message: any) => void) {
  useEffect(() => {
    const channel = supabaseClient
      .channel(`conversation:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          onNewMessage(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [conversationId, onNewMessage]);
}
```

---

## 🎯 Ordem de Execução Recomendada

### Dia 1
1. ⬜ Executar migrations no Supabase
2. ⬜ Ativar authProvider real
3. ⬜ Testar registro/login
4. ⬜ Testar página de onboarding

### Dia 2-3
5. ⬜ CRUD Contatos completo (conectar ao banco)
6. ⬜ CRUD Empresas completo (conectar ao banco)

### Dia 4-5
7. ⬜ Pipeline com dados reais
8. ⬜ Persistir drag-and-drop

### Dia 6-7
9. ⬜ Inbox funcional
10. ⬜ Realtime

### Dia 8-9
11. ⬜ Dashboard com métricas reais
12. ⬜ Tarefas conectadas ao banco

### Dia 10
13. ⬜ Configurações funcionais
14. ⬜ Testes finais
15. ⬜ Deploy em produção

---

## 📂 Novos Componentes Criados

### Skeletons (`src/components/alma/skeletons.tsx`)

Componentes disponíveis:
- `CardSkeleton` - Para cards do dashboard
- `ChartSkeleton` - Para gráficos
- `TableSkeleton` - Para tabelas de lista
- `KanbanSkeleton` - Para o pipeline
- `ConversationListSkeleton` - Para lista de conversas
- `MessagesSkeleton` - Para mensagens do inbox
- `DetailSkeleton` - Para páginas de detalhes
- `FormSkeleton` - Para formulários
- `DashboardSkeleton` - Dashboard completo

### Empty States (`src/components/alma/empty-state.tsx`)

Variantes disponíveis:
- `contacts` - Para lista de contatos vazia
- `companies` - Para lista de empresas vazia
- `deals` - Para pipeline vazio
- `conversations` - Para inbox vazio
- `tasks` - Para lista de tarefas vazia
- `search` - Para resultados de busca vazios
- `error` - Para erros
- `generic` - Genérico

Componentes especiais:
- `EmptyStateCompact` - Versão compacta inline
- `EmptyInbox` - Específico para inbox zerado
- `EmptyPipeline` - Específico para pipeline vazio

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do console do navegador
2. Verifique os logs do Supabase (Database > Logs)
3. Teste as queries diretamente no SQL Editor do Supabase

---

**Boa sorte com a implementação! 🚀**
