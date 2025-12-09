# CRM Alma - Agência Digital

Sistema de CRM (Customer Relationship Management) desenvolvido para a agência **Alma**, focado em atendimento comercial e gestão de pipeline de vendas.

## 🚀 Stack Tecnológica

- **Frontend**: React 19 + TypeScript + Vite
- **Framework**: [Refine](https://refine.dev/) (Admin/Data Framework)
- **UI**: Tailwind CSS + shadcn/ui
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL + Auth + Realtime)
- **Drag & Drop**: @dnd-kit
- **Gráficos**: Recharts

## 📋 Funcionalidades

### Core
- ✅ **Dashboard** - Visão geral com métricas e gráficos
- ✅ **Pipeline (Kanban)** - Gestão visual de deals com drag-and-drop
- ✅ **Inbox Unificado** - Central de mensagens multi-canal
- ✅ **Contatos** - CRUD completo de contatos/leads
- ✅ **Empresas** - Gestão de empresas/clientes
- ✅ **Tarefas** - Sistema de tarefas e atividades
- ✅ **Configurações** - Perfil, organização e pipeline

### Recursos Técnicos
- 🔐 Autenticação via Supabase Auth
- 🏢 Multi-tenant (isolamento por organização)
- 🔄 Realtime updates via Supabase
- 🌙 Dark mode como padrão (tema Alma)
- 📱 Layout responsivo

## 🛠️ Setup do Projeto

### 1. Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase

### 2. Configurar o Supabase

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Abra o projeto: `hnuipvspkyhqzvbmeyot`
3. Vá em **SQL Editor**
4. Execute os arquivos SQL na ordem:
   ```
   supabase/migrations/001_initial_schema.sql
   supabase/migrations/002_seed_data.sql
   ```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Rodar o Projeto

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 📁 Estrutura de Pastas

```
src/
├── assets/              # Logos e assets estáticos
├── components/
│   ├── alma/           # Componentes específicos da marca
│   ├── refine-ui/      # Componentes customizados do Refine
│   └── ui/             # Componentes shadcn/ui
├── pages/
│   ├── dashboard/      # Dashboard principal
│   ├── pipeline/       # Kanban de deals
│   ├── inbox/          # Inbox unificado
│   ├── contacts/       # CRUD de contatos
│   ├── companies/      # CRUD de empresas
│   ├── tasks/          # CRUD de tarefas
│   └── settings/       # Configurações
├── utility/
│   └── supabaseClient.ts
├── authProvider.ts     # Configuração de autenticação
└── App.tsx            # Configuração principal do Refine
```

## 🎨 Identidade Visual

### Paleta de Cores
- **Primary (Roxo Alma)**: `#605be5`
- **Background Dark**: `#0a0a0a`
- **Card Dark**: `#1a1a1a`
- **Border Dark**: `#2d2d2d`
- **Gray**: `#475467`

### Tipografia
- **Fonte Principal**: Manrope
- **Fallback**: Inter, system-ui

## 🔮 Roadmap - Integrações Futuras

### Email
Para integrar envio/recebimento de email real:
1. Configurar serviço de email (SendGrid, Resend, etc.)
2. Criar webhook para receber emails
3. Implementar em `src/services/email.ts`

### WhatsApp Business API
Para integrar WhatsApp:
1. Configurar conta no Meta Business
2. Obter API Key do WhatsApp Business
3. Criar webhook para mensagens
4. Implementar em `src/services/whatsapp.ts`

### IA - Lead Scoring
Para implementar lead scoring com IA:
1. Criar modelo de scoring baseado em:
   - Engajamento (emails abertos, cliques)
   - Perfil (cargo, empresa, indústria)
   - Comportamento (páginas visitadas, tempo)
2. Implementar em `src/services/ai/leadScoring.ts`

### IA - Next Best Action
Para sugestões de próxima ação:
1. Analisar histórico de atividades
2. Identificar padrões de sucesso
3. Sugerir ações baseadas em contexto
4. Implementar em `src/services/ai/nextBestAction.ts`

## 📝 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run start

# Refine CLI
npm run refine
```

## 🔒 Variáveis de Ambiente

As credenciais do Supabase estão em `src/utility/supabaseClient.ts`:

```typescript
SUPABASE_URL = "https://hnuipvspkyhqzvbmeyot.supabase.co"
SUPABASE_ANON_KEY = "..."
```

Para produção, mova para variáveis de ambiente:

```env
VITE_SUPABASE_URL=https://hnuipvspkyhqzvbmeyot.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
```

## 📄 Licença

Projeto proprietário - Alma Agência Digital © 2024
