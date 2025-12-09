# 🗺️ CRM Alma - Roadmap Completo de Melhorias

> **Documento criado em:** 9 de Dezembro de 2025  
> **Status atual:** MVP Funcional com dados mockados  
> **Próxima milestone:** Integração completa com Supabase

---

## 📊 Status Atual do Projeto

### ✅ Concluído
- [x] Estrutura base do projeto (React + Vite + TypeScript)
- [x] Configuração do Refine com Supabase
- [x] Tema Alma (dark mode, cores, fonte Manrope)
- [x] Logo e favicon
- [x] Layout com Sidebar e Header
- [x] Páginas principais com dados mockados:
  - Dashboard com métricas e gráficos
  - Pipeline Kanban com drag-and-drop
  - Inbox com layout 3 colunas
  - Lista de Contatos
  - Lista de Empresas
  - Lista de Tarefas
  - Configurações (Perfil, Organização, Pipeline, Notificações)
- [x] Schema SQL completo para Supabase (11 tabelas)
- [x] RLS Policies para multi-tenant
- [x] AuthProvider para Supabase
- [x] Modo de desenvolvimento (bypass auth)

### ⚠️ Pendências Críticas
- [ ] Executar migrations no Supabase
- [ ] Conectar páginas ao banco de dados real
- [ ] Implementar CRUD real em todas as páginas
- [ ] Testar fluxo completo de autenticação
- [ ] Remover dados mockados

---

## 🚀 FASE 1: Integração com Supabase (Prioridade Alta)

### 1.1 Configuração do Banco de Dados
**Estimativa:** 2-3 horas

- [ ] Executar `001_initial_schema.sql` no Supabase SQL Editor
- [ ] Executar `002_seed_data.sql` para dados iniciais
- [ ] Verificar se todos os triggers foram criados
- [ ] Testar RLS policies manualmente
- [ ] Configurar Realtime para tabelas necessárias:
  - `conversations`
  - `messages`
  - `deals`
  - `tasks`

### 1.2 Fluxo de Onboarding
**Estimativa:** 4-6 horas

- [ ] Criar página `/onboarding` para novos usuários
- [ ] Implementar criação automática de organização no primeiro login
- [ ] Criar pipeline padrão automaticamente
- [ ] Adicionar wizard de configuração inicial:
  - Nome da organização
  - Configuração do pipeline
  - Importação de contatos (opcional)

### 1.3 Autenticação Completa
**Estimativa:** 3-4 horas

- [ ] Testar login com email/senha
- [ ] Configurar OAuth (Google, GitHub) no Supabase
- [ ] Implementar página de atualização de senha
- [ ] Adicionar verificação de email
- [ ] Implementar "Lembrar de mim"
- [ ] Trocar `authProvider.dev` para `authProvider` em produção

---

## 🔧 FASE 2: CRUD Completo das Entidades (Prioridade Alta)

### 2.1 Contatos
**Estimativa:** 6-8 horas

**Lista (`/contacts`)**
- [ ] Conectar `useList` ao Supabase
- [ ] Implementar paginação real
- [ ] Implementar busca por nome/email
- [ ] Filtros funcionais:
  - Por status (Lead, Prospect, Cliente, Inativo)
  - Por empresa
  - Por responsável
  - Por tags
- [ ] Ordenação por colunas
- [ ] Seleção múltipla para ações em lote
- [ ] Exportar para CSV

**Criar (`/contacts/create`)**
- [ ] Formulário com validação (Zod + React Hook Form)
- [ ] Campos: nome, email, telefone, empresa, cargo, tags
- [ ] Upload de avatar
- [ ] Seleção de empresa existente ou criar nova
- [ ] Atribuir responsável

**Editar (`/contacts/edit/:id`)**
- [ ] Carregar dados existentes
- [ ] Mesmos campos do criar
- [ ] Histórico de alterações

**Visualizar (`/contacts/show/:id`)**
- [ ] Informações completas do contato
- [ ] Timeline de atividades
- [ ] Deals relacionados
- [ ] Conversas relacionadas
- [ ] Tarefas pendentes
- [ ] Ações rápidas (ligar, enviar email, criar deal)

### 2.2 Empresas
**Estimativa:** 4-6 horas

- [ ] CRUD completo similar a Contatos
- [ ] Campos específicos: domínio, website, indústria, tamanho
- [ ] Lista de contatos da empresa
- [ ] Deals da empresa
- [ ] Logo upload

### 2.3 Deals (Pipeline)
**Estimativa:** 8-10 horas

**Kanban (`/pipeline`)**
- [ ] Carregar stages do banco
- [ ] Carregar deals por stage
- [ ] Drag-and-drop funcional com persistência
- [ ] Atualizar `stage_id` e `moved_at` ao mover
- [ ] Filtros:
  - Por pipeline (se houver múltiplos)
  - Por responsável
  - Por valor
  - Por data de fechamento esperada
- [ ] Ordenação dentro das colunas

**Criar Deal**
- [ ] Modal ou drawer para criação rápida
- [ ] Campos: título, valor, contato, empresa, probabilidade
- [ ] Selecionar stage inicial
- [ ] Data de fechamento esperada

**Painel Lateral de Deal**
- [ ] Informações completas
- [ ] Edição inline
- [ ] Histórico de movimentações
- [ ] Atividades relacionadas
- [ ] Contatos relacionados
- [ ] Arquivos anexados
- [ ] Marcar como ganho/perdido

### 2.4 Tarefas
**Estimativa:** 4-6 horas

- [ ] Lista agrupada por status (A Fazer, Em Progresso, Concluído)
- [ ] Filtros por data, prioridade, responsável
- [ ] Criar tarefa vinculada a deal/contato
- [ ] Lembretes (integração futura com notificações)
- [ ] Marcar como concluída
- [ ] Arrastar entre status

### 2.5 Inbox
**Estimativa:** 10-12 horas

**Lista de Conversas**
- [ ] Carregar conversas do banco
- [ ] Filtros por status, canal, prioridade
- [ ] Busca por assunto/contato
- [ ] Indicador de não lidas
- [ ] Ordenação por última mensagem

**Visualização de Conversa**
- [ ] Carregar mensagens da conversa
- [ ] Diferenciação visual:
  - Mensagens do cliente (esquerda)
  - Mensagens da equipe (direita, cor primária)
  - Notas internas (fundo amarelo)
  - Mensagens do sistema (cinza)
- [ ] Suporte a anexos
- [ ] Scroll infinito para histórico

**Envio de Mensagens**
- [ ] Textarea com formatação básica
- [ ] Botão de nota interna
- [ ] Upload de anexos
- [ ] Atalho Cmd/Ctrl + Enter para enviar
- [ ] Indicador de digitando (futuro)

**Realtime**
- [ ] Subscription para novas mensagens
- [ ] Atualização automática da lista
- [ ] Notificação sonora (opcional)

---

## 🎨 FASE 3: Melhorias de UX/UI (Prioridade Média)

### 3.1 Command Palette (Ctrl/Cmd + K)
**Estimativa:** 4-6 horas

- [ ] Configurar RefineKbar com ações
- [ ] Busca global por:
  - Contatos
  - Empresas
  - Deals
  - Conversas
- [ ] Ações rápidas:
  - Criar novo contato
  - Criar novo deal
  - Ir para página
- [ ] Atalhos de teclado documentados

### 3.2 Atalhos de Teclado
**Estimativa:** 2-3 horas

- [ ] `N` - Novo item (contexto da página)
- [ ] `G + D` - Ir para Dashboard
- [ ] `G + P` - Ir para Pipeline
- [ ] `G + I` - Ir para Inbox
- [ ] `G + C` - Ir para Contatos
- [ ] `Esc` - Fechar modais/drawers
- [ ] `?` - Mostrar ajuda de atalhos

### 3.3 Loading States
**Estimativa:** 2-3 horas

- [ ] Skeletons para listas
- [ ] Skeletons para cards
- [ ] Skeletons para formulários
- [ ] Indicador de loading em botões
- [ ] Overlay de loading para ações

### 3.4 Empty States
**Estimativa:** 2-3 horas

- [ ] Ilustrações para estados vazios
- [ ] CTAs claros:
  - "Nenhum contato. Criar primeiro contato"
  - "Nenhum deal. Criar primeiro deal"
- [ ] Dicas de uso

### 3.5 Responsividade
**Estimativa:** 4-6 horas

- [ ] Dashboard responsivo (cards empilhados)
- [ ] Pipeline: scroll horizontal em mobile
- [ ] Inbox: navegação empilhada em mobile
- [ ] Tabelas: versão card em mobile
- [ ] Menu drawer em mobile

### 3.6 Notificações Toast
**Estimativa:** 1-2 horas

- [ ] Sucesso ao criar/editar/deletar
- [ ] Erros com mensagens claras
- [ ] Ações de desfazer (undoable)
- [ ] Notificações de realtime

---

## 📈 FASE 4: Dashboard Avançado (Prioridade Média)

### 4.1 Métricas Reais
**Estimativa:** 4-6 horas

- [ ] Total de deals em aberto (valor e quantidade)
- [ ] Conversas aguardando resposta
- [ ] Tarefas vencidas/para hoje
- [ ] Taxa de conversão
- [ ] Tempo médio no pipeline
- [ ] Filtro por período

### 4.2 Gráficos Dinâmicos
**Estimativa:** 4-6 horas

- [ ] Receita por mês (últimos 6-12 meses)
- [ ] Deals por etapa (gráfico de barras)
- [ ] Funil de conversão
- [ ] Atividades por tipo
- [ ] Comparativo com período anterior

### 4.3 Widgets Personalizáveis
**Estimativa:** 6-8 horas (futuro)

- [ ] Arrastar e reorganizar widgets
- [ ] Adicionar/remover widgets
- [ ] Salvar layout por usuário

---

## 🔌 FASE 5: Integrações (Prioridade Baixa - Futuro)

### 5.1 Email
**Estimativa:** 8-12 horas

- [ ] Integração com SendGrid ou Resend
- [ ] Envio de emails pelo CRM
- [ ] Recebimento via webhook
- [ ] Templates de email
- [ ] Tracking de abertura

### 5.2 WhatsApp Business API
**Estimativa:** 12-16 horas

- [ ] Integração com WhatsApp Cloud API
- [ ] Envio/recebimento de mensagens
- [ ] Templates aprovados
- [ ] Mídia (imagens, documentos)
- [ ] Webhook para mensagens recebidas

### 5.3 Calendário
**Estimativa:** 6-8 horas

- [ ] Integração com Google Calendar
- [ ] Sincronização de reuniões
- [ ] Criar eventos a partir de tarefas
- [ ] Visualização de agenda

### 5.4 Automações
**Estimativa:** 12-16 horas (futuro)

- [ ] Triggers baseados em eventos
- [ ] Ações automáticas:
  - Criar tarefa quando deal muda de stage
  - Enviar email quando contato é criado
  - Atribuir automaticamente
- [ ] Interface visual para criar automações

---

## 🤖 FASE 6: IA e Análises (Futuro)

### 6.1 Lead Scoring
**Estimativa:** 8-12 horas

- [ ] Modelo de pontuação baseado em:
  - Engajamento
  - Perfil da empresa
  - Histórico de interações
- [ ] Atualização automática
- [ ] Visualização no card do contato

### 6.2 Sugestões Inteligentes
**Estimativa:** 8-12 horas

- [ ] Próxima melhor ação
- [ ] Previsão de fechamento
- [ ] Alertas de deals em risco
- [ ] Sugestão de follow-up

### 6.3 Análise de Sentimento
**Estimativa:** 6-8 horas

- [ ] Análise de mensagens recebidas
- [ ] Indicador de sentimento na conversa
- [ ] Alertas para sentimento negativo

---

## 🧹 FASE 7: Limpeza e Otimização

### 7.1 Código
**Estimativa:** 4-6 horas

- [ ] Remover pastas não utilizadas:
  - `src/pages/blog-posts/`
  - `src/pages/categories/`
- [ ] Remover dependências não utilizadas:
  - `@refinedev/mantine`
  - `@mantine/*`
  - `@emotion/react`
- [ ] Organizar imports
- [ ] Adicionar comentários JSDoc
- [ ] Criar tipos TypeScript para todas as entidades

### 7.2 Performance
**Estimativa:** 4-6 horas

- [ ] Lazy loading de páginas
- [ ] Memoização de componentes pesados
- [ ] Virtualização de listas grandes
- [ ] Otimização de queries Supabase
- [ ] Cache de dados frequentes

### 7.3 Testes
**Estimativa:** 8-12 horas

- [ ] Configurar Vitest
- [ ] Testes unitários para utils
- [ ] Testes de integração para auth
- [ ] Testes E2E com Playwright (críticos)

### 7.4 Documentação
**Estimativa:** 4-6 horas

- [ ] README completo
- [ ] Documentação de API
- [ ] Guia de contribuição
- [ ] Changelog

---

## 📋 Checklist de Deploy

### Preparação
- [ ] Variáveis de ambiente configuradas
- [ ] Build sem erros
- [ ] Testes passando
- [ ] RLS policies verificadas
- [ ] Backup do banco

### Supabase
- [ ] Projeto em produção criado
- [ ] Migrations executadas
- [ ] Auth configurado (providers, URLs)
- [ ] Storage configurado (se necessário)
- [ ] Edge Functions (se necessário)

### Frontend
- [ ] Trocar para authProvider real
- [ ] Remover dados mockados
- [ ] Configurar domínio
- [ ] SSL configurado
- [ ] Analytics configurado

---

## 🎯 Priorização Sugerida

### Sprint 1 (1-2 semanas)
1. Executar migrations no Supabase
2. Implementar fluxo de onboarding
3. CRUD de Contatos completo
4. Testar autenticação

### Sprint 2 (1-2 semanas)
1. CRUD de Empresas
2. Pipeline Kanban funcional
3. Criar/editar deals

### Sprint 3 (1-2 semanas)
1. Inbox com Realtime
2. Tarefas
3. Dashboard com dados reais

### Sprint 4 (1-2 semanas)
1. Command Palette
2. Melhorias de UX
3. Responsividade
4. Limpeza de código

### Futuro
- Integrações (Email, WhatsApp)
- IA e automações
- Testes automatizados

---

## 📝 Notas Técnicas

### Estrutura de Pastas Recomendada

```
src/
├── components/
│   ├── alma/           # Componentes específicos da marca
│   ├── crm/            # Componentes de negócio (DealCard, ContactRow, etc)
│   ├── refine-ui/      # Componentes do Refine customizados
│   └── ui/             # Shadcn UI components
├── hooks/
│   ├── useContacts.ts
│   ├── useDeals.ts
│   ├── useConversations.ts
│   └── useRealtime.ts
├── lib/
│   ├── supabase.ts     # Cliente Supabase
│   ├── utils.ts        # Utilitários
│   └── constants.ts    # Constantes
├── pages/
│   ├── contacts/
│   ├── companies/
│   ├── pipeline/
│   ├── inbox/
│   ├── tasks/
│   ├── dashboard/
│   └── settings/
├── providers/
│   ├── auth-provider.ts
│   └── organization-provider.tsx  # Context para org atual
├── types/
│   ├── database.ts     # Tipos gerados do Supabase
│   └── index.ts
└── App.tsx
```

### Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Gerar tipos do Supabase
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts

# Lint
npm run lint
```

---

## 🤝 Contribuição

Para contribuir com o projeto:

1. Escolha uma tarefa do roadmap
2. Crie uma branch: `feature/nome-da-tarefa`
3. Implemente a funcionalidade
4. Faça PR para `main`

---

**Última atualização:** 9 de Dezembro de 2025

