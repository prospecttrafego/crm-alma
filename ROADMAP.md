# 🗺️ CRM Alma - Roadmap Completo de Melhorias

> **Documento criado em:** 9 de Dezembro de 2025  
> **Última atualização:** 9 de Dezembro de 2025  
> **Status atual:** MVP Frontend Completo - Aguardando integração com Supabase  
> **Próxima milestone:** Integração completa com Supabase

---

## 📊 Status Atual do Projeto

### ✅ Concluído - Estrutura Base
- [x] Estrutura base do projeto (React + Vite + TypeScript)
- [x] Configuração do Refine com Supabase
- [x] Tema Alma (dark mode, cores, fonte Manrope)
- [x] Logo e favicon
- [x] Layout com Sidebar e Header
- [x] Schema SQL completo para Supabase (11 tabelas)
- [x] RLS Policies para multi-tenant
- [x] AuthProvider para Supabase
- [x] Modo de desenvolvimento (bypass auth)

### ✅ Concluído - Páginas com Dados Mockados
- [x] Dashboard com métricas e gráficos
- [x] Pipeline Kanban com drag-and-drop
- [x] Inbox com layout 3 colunas
- [x] Lista de Contatos
- [x] Lista de Empresas
- [x] Lista de Tarefas
- [x] Configurações (Perfil, Organização, Pipeline, Notificações)

### ✅ Concluído - Melhorias de UX/UI (Dezembro 2025)
- [x] Componentes de Loading Skeleton reutilizáveis
- [x] Componentes de Empty State com variantes
- [x] Tooltips nos ícones do menu recolhido
- [x] Formulário de registro melhorado (campo organização)
- [x] Formulários visuais de criação de Contato
- [x] Formulários visuais de criação de Empresa
- [x] Modal de criação de Deal no Pipeline
- [x] Drawer de detalhes do Deal com abas (Detalhes, Atividades, Notas)
- [x] Página de Onboarding multi-step
- [x] Animações e transições CSS aprimoradas
- [x] Removidas dependências não utilizadas (Mantine, Emotion)
- [x] Deletadas pastas legadas (blog-posts, categories)

### ⚠️ Pendências Críticas (Dependem do Backend)
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
**Estimativa:** 2-3 horas (estrutura visual já criada)

- [x] ~~Criar página `/onboarding` para novos usuários~~
- [ ] Conectar ao backend para salvar dados
- [ ] Implementar criação automática de organização no primeiro login
- [ ] Criar pipeline padrão automaticamente
- [ ] Redirecionar após conclusão

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
**Estimativa:** 4-6 horas (formulários já criados)

**Lista (`/contacts`)**
- [ ] Conectar `useList` ao Supabase
- [ ] Implementar paginação real
- [ ] Implementar busca por nome/email
- [ ] Filtros funcionais
- [ ] Ordenação por colunas
- [ ] Seleção múltipla para ações em lote
- [ ] Exportar para CSV

**Criar (`/contacts/create`)**
- [x] ~~Formulário visual com validação~~
- [ ] Conectar ao Supabase
- [ ] Upload de avatar
- [ ] Seleção de empresa existente ou criar nova

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

### 2.2 Empresas
**Estimativa:** 3-4 horas (formulários já criados)

- [x] ~~Formulário de criação visual~~
- [ ] CRUD completo conectado ao Supabase
- [ ] Lista de contatos da empresa
- [ ] Deals da empresa
- [ ] Logo upload

### 2.3 Deals (Pipeline)
**Estimativa:** 6-8 horas (modal e drawer já criados)

**Kanban (`/pipeline`)**
- [ ] Carregar stages do banco
- [ ] Carregar deals por stage
- [ ] Drag-and-drop funcional com persistência
- [ ] Atualizar `stage_id` e `moved_at` ao mover
- [ ] Filtros funcionais

**Criar Deal**
- [x] ~~Modal para criação rápida~~
- [ ] Conectar ao Supabase

**Painel Lateral de Deal**
- [x] ~~Drawer com abas (Detalhes, Atividades, Notas)~~
- [ ] Conectar dados reais
- [ ] Edição inline
- [ ] Histórico de movimentações
- [ ] Marcar como ganho/perdido

### 2.4 Tarefas
**Estimativa:** 4-6 horas

- [ ] Lista com dados reais
- [ ] Criar tarefa vinculada a deal/contato
- [ ] Marcar como concluída
- [ ] Filtros por data/prioridade

### 2.5 Inbox
**Estimativa:** 10-12 horas

**Lista de Conversas**
- [ ] Carregar conversas do banco
- [ ] Filtros por status, canal, prioridade
- [ ] Indicador de não lidas

**Visualização de Conversa**
- [ ] Carregar mensagens da conversa
- [ ] Suporte a anexos
- [ ] Scroll infinito para histórico

**Envio de Mensagens**
- [ ] Textarea com formatação básica
- [ ] Botão de nota interna
- [ ] Upload de anexos

**Realtime**
- [ ] Subscription para novas mensagens
- [ ] Atualização automática da lista
- [ ] Notificação sonora (opcional)

---

## 🎨 FASE 3: Melhorias de UX/UI (Prioridade Média)

### 3.1 Command Palette (Ctrl/Cmd + K)
**Estimativa:** 4-6 horas

- [x] ~~RefineKbar configurado~~
- [ ] Busca global por Contatos, Empresas, Deals, Conversas
- [ ] Ações rápidas (criar novo, ir para página)
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
**Estimativa:** ✅ Concluído

- [x] Skeletons para listas
- [x] Skeletons para cards
- [x] Skeletons para formulários
- [x] Skeletons para dashboard
- [x] Skeletons para kanban
- [x] Skeletons para inbox

### 3.4 Empty States
**Estimativa:** ✅ Concluído

- [x] Componente reutilizável com variantes
- [x] CTAs claros para cada tipo
- [x] Versão compacta para inline
- [x] Estados específicos (EmptyInbox, EmptyPipeline)

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
**Estimativa:** ✅ Parcialmente concluído

- [x] Remover pastas não utilizadas (blog-posts, categories)
- [x] Remover dependências não utilizadas (Mantine, Emotion)
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
2. Testar página de onboarding
3. CRUD de Contatos completo (conectar ao banco)
4. Testar autenticação

### Sprint 2 (1-2 semanas)
1. CRUD de Empresas (conectar ao banco)
2. Pipeline Kanban funcional (conectar ao banco)
3. Persistir drag-and-drop

### Sprint 3 (1-2 semanas)
1. Inbox com Realtime
2. Tarefas conectadas ao banco
3. Dashboard com dados reais

### Sprint 4 (1-2 semanas)
1. Command Palette funcional
2. Atalhos de teclado
3. Responsividade
4. Testes finais

### Futuro
- Integrações (Email, WhatsApp)
- IA e automações
- Testes automatizados

---

## 📝 Notas Técnicas

### Estrutura de Pastas Atual

```
src/
├── components/
│   ├── alma/           # Componentes específicos da marca
│   │   ├── logo.tsx
│   │   ├── skeletons.tsx    # ✅ Novo
│   │   └── empty-state.tsx  # ✅ Novo
│   ├── refine-ui/      # Componentes do Refine customizados
│   └── ui/             # Shadcn UI components
├── pages/
│   ├── contacts/
│   ├── companies/
│   ├── pipeline/
│   ├── inbox/
│   ├── tasks/
│   ├── dashboard/
│   ├── settings/
│   └── onboarding/     # ✅ Novo
├── authProvider.ts     # Auth real
├── authProvider.dev.ts # Auth desenvolvimento
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

## 📈 Progresso Geral

| Fase | Status | Progresso |
|------|--------|-----------|
| Estrutura Base | ✅ Concluído | 100% |
| Melhorias UX/UI | ✅ Concluído | 100% |
| Integração Supabase | ⏳ Pendente | 0% |
| CRUD Entidades | ⏳ Pendente | 20% (formulários prontos) |
| Dashboard Avançado | ⏳ Pendente | 0% |
| Integrações | ⏳ Futuro | 0% |
| IA e Análises | ⏳ Futuro | 0% |

---

**Última atualização:** 9 de Dezembro de 2025
