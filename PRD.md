# 📋 PRD - Product Requirements Document
# CRM Alma

> **Versão:** 1.0  
> **Data:** 9 de Dezembro de 2025  
> **Autor:** Agência Alma  
> **Status:** Em Desenvolvimento

---

## 📑 Índice

1. [Visão Geral](#1-visão-geral)
2. [Problema e Oportunidade](#2-problema-e-oportunidade)
3. [Objetivos e Métricas de Sucesso](#3-objetivos-e-métricas-de-sucesso)
4. [Público-Alvo e Personas](#4-público-alvo-e-personas)
5. [Escopo do Produto](#5-escopo-do-produto)
6. [Requisitos Funcionais](#6-requisitos-funcionais)
7. [Requisitos Não-Funcionais](#7-requisitos-não-funcionais)
8. [Arquitetura Técnica](#8-arquitetura-técnica)
9. [Design e UX](#9-design-e-ux)
10. [Modelo de Dados](#10-modelo-de-dados)
11. [Integrações](#11-integrações)
12. [Roadmap de Desenvolvimento](#12-roadmap-de-desenvolvimento)
13. [Riscos e Mitigações](#13-riscos-e-mitigações)
14. [Glossário](#14-glossário)

---

## 1. Visão Geral

### 1.1 Resumo Executivo

O **CRM Alma** é uma plataforma de gestão de relacionamento com clientes desenvolvida especificamente para agências digitais e empresas de serviços. O sistema combina um pipeline de vendas visual (Kanban), inbox unificado multi-canal e gestão completa de contatos em uma única interface moderna e intuitiva.

### 1.2 Declaração de Visão

> *"Simplificar a gestão de relacionamentos comerciais para agências digitais, permitindo que equipes pequenas gerenciem grandes volumes de leads e clientes com eficiência e profissionalismo."*

### 1.3 Proposta de Valor

| Para | Agências digitais e empresas de serviços |
|------|------------------------------------------|
| Que | Precisam gerenciar leads, clientes e comunicações de forma centralizada |
| O CRM Alma é | Uma plataforma de CRM moderna e visual |
| Que | Unifica pipeline de vendas, inbox multi-canal e gestão de contatos |
| Diferente de | CRMs genéricos como Pipedrive, HubSpot ou RD Station |
| Nosso produto | É focado na realidade de agências brasileiras, com interface em português, preço acessível e sem complexidade desnecessária |

### 1.4 Stakeholders

| Stakeholder | Papel | Interesse |
|-------------|-------|-----------|
| Agência Alma | Product Owner | Usar internamente e comercializar como SaaS |
| Equipe Comercial | Usuário Principal | Gerenciar leads e fechar negócios |
| Gestores | Usuário Admin | Acompanhar métricas e equipe |
| Clientes (Contatos) | Beneficiário Indireto | Receber atendimento melhor |

---

## 2. Problema e Oportunidade

### 2.1 Problema

Agências digitais enfrentam desafios significativos na gestão de relacionamentos:

**Dores Identificadas:**

1. **Fragmentação de Comunicação**
   - Mensagens espalhadas entre WhatsApp, email, Instagram, telefone
   - Histórico perdido quando muda de responsável
   - Dificuldade em saber "onde paramos" com cada cliente

2. **Pipeline Desorganizado**
   - Planilhas Excel ou ferramentas inadequadas
   - Falta de visibilidade do funil de vendas
   - Deals esquecidos ou perdidos por falta de follow-up

3. **Ferramentas Caras e Complexas**
   - CRMs internacionais com preços em dólar
   - Funcionalidades excessivas que nunca são usadas
   - Curva de aprendizado alta

4. **Falta de Contexto**
   - Não saber rapidamente o histórico de um cliente
   - Informações em sistemas diferentes
   - Perda de tempo buscando informações

### 2.2 Oportunidade

O mercado brasileiro de agências digitais está em crescimento, com mais de 30.000 agências ativas. A maioria usa ferramentas inadequadas ou nenhuma ferramenta de CRM.

**Oportunidade de Mercado:**
- TAM (Total Addressable Market): R$ 500M/ano (30k agências × R$ 1.400/mês médio)
- SAM (Serviceable Available Market): R$ 50M/ano (3k agências médias/grandes)
- SOM (Serviceable Obtainable Market): R$ 2M/ano (200 agências no primeiro ano)

### 2.3 Hipóteses a Validar

| Hipótese | Como Validar |
|----------|--------------|
| Agências precisam de inbox unificado | Entrevistas + uso do produto |
| Pipeline visual aumenta conversão | Métricas de uso + A/B testing |
| Preço em reais é diferencial | Taxa de conversão vs concorrentes |
| Interface simples reduz churn | NPS + tempo de onboarding |

---

## 3. Objetivos e Métricas de Sucesso

### 3.1 Objetivos do Produto

**Objetivo Principal:**
Criar um CRM que uma agência de 5-50 pessoas consiga adotar em menos de 1 semana e usar diariamente sem fricção.

**Objetivos Secundários:**
1. Centralizar todas as comunicações com clientes
2. Visualizar claramente o pipeline de vendas
3. Reduzir tempo gasto buscando informações
4. Aumentar taxa de conversão de leads

### 3.2 KPIs e Métricas

#### Métricas de Produto

| Métrica | Meta MVP | Meta 6 meses | Meta 1 ano |
|---------|----------|--------------|------------|
| DAU/MAU (Stickiness) | 40% | 50% | 60% |
| Tempo médio de sessão | 15 min | 20 min | 25 min |
| Ações por sessão | 10 | 15 | 20 |
| Feature adoption rate | 60% | 70% | 80% |

#### Métricas de Negócio

| Métrica | Meta MVP | Meta 6 meses | Meta 1 ano |
|---------|----------|--------------|------------|
| Usuários ativos | 50 | 500 | 2.000 |
| Organizações | 10 | 100 | 400 |
| Churn mensal | <10% | <7% | <5% |
| NPS | 30 | 40 | 50 |
| MRR | R$ 5k | R$ 50k | R$ 200k |

#### Métricas de Sucesso do Cliente

| Métrica | Meta |
|---------|------|
| Tempo de onboarding | < 30 minutos |
| Time to first value | < 5 minutos |
| Deals criados por usuário/mês | > 10 |
| Taxa de resposta no inbox | > 80% em 24h |

### 3.3 Critérios de Sucesso do MVP

O MVP será considerado bem-sucedido se:

- [ ] 10 organizações usando ativamente por 30 dias
- [ ] NPS > 30
- [ ] < 5% de churn no primeiro mês
- [ ] Feedback qualitativo positivo em entrevistas
- [ ] Pelo menos 1 cliente pagante

---

## 4. Público-Alvo e Personas

### 4.1 Segmento Principal

**Agências Digitais de Pequeno/Médio Porte**
- 5 a 50 funcionários
- Faturamento: R$ 500k a R$ 5M/ano
- Serviços: Marketing digital, desenvolvimento web, design, social media
- Localização: Brasil (foco inicial em SP, RJ, MG)

### 4.2 Personas

#### Persona 1: Ana - Sócia/Diretora Comercial

| Atributo | Descrição |
|----------|-----------|
| **Idade** | 32 anos |
| **Cargo** | Sócia e Diretora Comercial |
| **Empresa** | Agência de marketing digital, 12 funcionários |
| **Responsabilidades** | Prospecção, vendas, relacionamento com clientes-chave |
| **Ferramentas atuais** | Planilha Excel, WhatsApp Web, Gmail |
| **Frustrações** | Perde deals por esquecimento, não sabe quanto tem no pipeline, gasta tempo demais organizando informações |
| **Objetivos** | Fechar mais negócios, ter visibilidade do funil, profissionalizar o comercial |
| **Citação** | *"Eu sei que estou perdendo dinheiro por não ter controle, mas não tenho tempo de aprender um CRM complexo"* |

**Jobs to be Done (Ana):**
1. Quando recebo um lead, quero registrar rapidamente para não esquecer
2. Quando vou ligar para um prospect, quero ver todo o histórico em segundos
3. Quando preciso priorizar, quero ver claramente onde estão as oportunidades
4. Quando fecho o mês, quero saber quanto vendi e quanto está no pipeline

---

#### Persona 2: Carlos - Executivo de Contas

| Atributo | Descrição |
|----------|-----------|
| **Idade** | 27 anos |
| **Cargo** | Executivo de Contas |
| **Empresa** | Agência de desenvolvimento web, 25 funcionários |
| **Responsabilidades** | Gerenciar carteira de 30 clientes, upsell, suporte comercial |
| **Ferramentas atuais** | Trello, WhatsApp, Notion |
| **Frustrações** | Informações espalhadas, não lembra de follow-ups, perde contexto de conversas |
| **Objetivos** | Atender bem os clientes, não deixar nada cair, bater metas |
| **Citação** | *"Meu dia é apagar incêndios. Preciso de algo que me ajude a ser proativo, não reativo"* |

**Jobs to be Done (Carlos):**
1. Quando um cliente me manda mensagem, quero responder de qualquer canal no mesmo lugar
2. Quando tenho uma tarefa pendente, quero ser lembrado automaticamente
3. Quando preciso fazer upsell, quero ver o histórico de compras do cliente
4. Quando meu gestor pergunta, quero mostrar meus números rapidamente

---

#### Persona 3: Marina - Gestora/CEO

| Atributo | Descrição |
|----------|-----------|
| **Idade** | 38 anos |
| **Cargo** | CEO |
| **Empresa** | Agência full-service, 40 funcionários |
| **Responsabilidades** | Gestão geral, estratégia, acompanhamento de métricas |
| **Ferramentas atuais** | Pipedrive (insatisfeita), Power BI, várias planilhas |
| **Frustrações** | Paga caro em dólar, time não usa direito, relatórios são trabalhosos |
| **Objetivos** | Visibilidade total do comercial, previsibilidade de receita, escalar vendas |
| **Citação** | *"Preciso de um CRM que o time realmente use, não que eu tenha que ficar cobrando"* |

**Jobs to be Done (Marina):**
1. Quando abro o CRM, quero ver um dashboard com a saúde do pipeline
2. Quando preciso projetar receita, quero dados confiáveis
3. Quando contrato alguém, quero que aprenda rápido
4. Quando comparo ferramentas, quero custo-benefício em reais

---

### 4.3 Anti-Personas (Quem NÃO é nosso público)

| Anti-Persona | Motivo |
|--------------|--------|
| Freelancers individuais | Volume muito baixo, não justifica CRM |
| Grandes empresas (+100 func) | Precisam de Salesforce/HubSpot Enterprise |
| E-commerces B2C | Precisam de ferramentas específicas (RD Station, etc) |
| Empresas que não vendem serviços | Nosso foco é serviços, não produtos |

---

## 5. Escopo do Produto

### 5.1 Escopo do MVP

#### Incluído no MVP ✅

| Módulo | Funcionalidades |
|--------|-----------------|
| **Autenticação** | Login, registro, recuperação de senha, multi-tenant |
| **Dashboard** | Métricas principais, gráficos de pipeline, atividades recentes |
| **Pipeline (Kanban)** | Visualização por etapas, drag-and-drop, criação/edição de deals |
| **Contatos** | CRUD completo, busca, filtros, tags, histórico |
| **Empresas** | CRUD completo, vinculação com contatos e deals |
| **Inbox** | Lista de conversas, visualização de mensagens, envio de mensagens, notas internas |
| **Tarefas** | Lista, criação, conclusão, vinculação com deals/contatos |
| **Configurações** | Perfil, organização, etapas do pipeline |

#### Fora do Escopo do MVP ❌

| Funcionalidade | Motivo | Previsão |
|----------------|--------|----------|
| Integração WhatsApp | Complexidade técnica | v1.1 |
| Integração Email | Requer infraestrutura | v1.1 |
| Automações | Escopo muito grande | v1.2 |
| App Mobile | Foco no web primeiro | v2.0 |
| IA/Lead Scoring | Precisa de dados primeiro | v2.0 |
| Multi-idioma | Foco no Brasil | v2.0 |
| API Pública | Precisa de demanda | v1.2 |

### 5.2 User Stories do MVP

#### Épico 1: Autenticação e Onboarding

```
US-001: Como novo usuário, quero me cadastrar com email e senha para criar minha conta
  Critérios de aceite:
  - Formulário com nome, email, senha, nome da organização
  - Validação de email único
  - Senha mínima de 6 caracteres
  - Confirmação de senha
  - Redirecionamento para onboarding após cadastro

US-002: Como novo usuário, quero passar por um onboarding guiado para configurar minha organização
  Critérios de aceite:
  - 4-5 etapas com progresso visual
  - Configuração do nome da organização
  - Escolha de template de pipeline
  - Opção de importar contatos (skip)
  - Tela de conclusão com próximos passos

US-003: Como usuário, quero fazer login com email e senha para acessar minha conta
  Critérios de aceite:
  - Formulário de email e senha
  - Opção "Esqueci minha senha"
  - Mensagem de erro clara para credenciais inválidas
  - Redirecionamento para dashboard após login

US-004: Como usuário, quero recuperar minha senha para voltar a acessar minha conta
  Critérios de aceite:
  - Formulário com campo de email
  - Envio de link de recuperação
  - Página para definir nova senha
  - Confirmação de alteração
```

#### Épico 2: Dashboard

```
US-010: Como usuário, quero ver um resumo das métricas principais ao acessar o sistema
  Critérios de aceite:
  - Card com total de deals em aberto (quantidade e valor)
  - Card com conversas aguardando resposta
  - Card com tarefas pendentes para hoje
  - Card com taxa de conversão do mês

US-011: Como usuário, quero ver um gráfico do pipeline para entender a distribuição de deals
  Critérios de aceite:
  - Gráfico de barras por etapa
  - Mostrar quantidade e valor por etapa
  - Cores correspondentes às etapas

US-012: Como usuário, quero ver as atividades recentes para saber o que está acontecendo
  Critérios de aceite:
  - Lista das últimas 10 atividades
  - Tipo de atividade (deal movido, mensagem, tarefa, etc)
  - Timestamp relativo (há 2 horas, ontem, etc)
  - Link para o item relacionado
```

#### Épico 3: Pipeline (Kanban)

```
US-020: Como usuário, quero ver meus deals em um quadro Kanban para visualizar o pipeline
  Critérios de aceite:
  - Colunas representando etapas do pipeline
  - Cards de deals com título, valor, contato
  - Total de valor por coluna
  - Contador de deals por coluna

US-021: Como usuário, quero arrastar deals entre etapas para atualizar seu status
  Critérios de aceite:
  - Drag-and-drop funcional
  - Feedback visual durante arraste
  - Atualização automática no banco
  - Registro de atividade "Deal movido"

US-022: Como usuário, quero criar um novo deal rapidamente para não perder oportunidades
  Critérios de aceite:
  - Botão "Novo Deal" visível
  - Modal com campos: título, valor, contato, empresa, etapa
  - Validação de campos obrigatórios
  - Deal aparece na coluna correta após criação

US-023: Como usuário, quero ver detalhes de um deal para entender o contexto completo
  Critérios de aceite:
  - Painel lateral ao clicar no deal
  - Informações: valor, probabilidade, contato, empresa
  - Histórico de atividades
  - Ações: editar, criar tarefa, enviar mensagem

US-024: Como usuário, quero filtrar deals para encontrar o que preciso
  Critérios de aceite:
  - Filtro por responsável
  - Filtro por valor (faixa)
  - Filtro por data de criação
  - Limpar filtros
```

#### Épico 4: Contatos

```
US-030: Como usuário, quero ver uma lista de todos os contatos para gerenciá-los
  Critérios de aceite:
  - Tabela com colunas: nome, email, empresa, status, responsável
  - Paginação (20 por página)
  - Ordenação por colunas
  - Indicador de total de contatos

US-031: Como usuário, quero buscar contatos por nome ou email para encontrar rapidamente
  Critérios de aceite:
  - Campo de busca no topo da lista
  - Busca em tempo real (debounce 300ms)
  - Busca por nome, email, telefone, empresa
  - Indicador de resultados encontrados

US-032: Como usuário, quero filtrar contatos por status para segmentar a lista
  Critérios de aceite:
  - Filtro por status (Lead, Prospect, Cliente, Inativo)
  - Filtro por empresa
  - Filtro por tags
  - Múltiplos filtros combinados

US-033: Como usuário, quero criar um novo contato para registrar uma pessoa
  Critérios de aceite:
  - Formulário com campos: nome, sobrenome, email, telefone, cargo
  - Seleção de empresa (existente ou criar nova)
  - Seleção de status
  - Adicionar tags
  - Campo de observações

US-034: Como usuário, quero ver o perfil completo de um contato para entender o histórico
  Critérios de aceite:
  - Informações básicas do contato
  - Empresa vinculada
  - Lista de deals relacionados
  - Histórico de conversas
  - Tarefas pendentes
  - Timeline de atividades

US-035: Como usuário, quero editar um contato para manter informações atualizadas
  Critérios de aceite:
  - Todos os campos editáveis
  - Validação de email
  - Confirmação de alterações
  - Registro de atividade "Contato editado"
```

#### Épico 5: Empresas

```
US-040: Como usuário, quero gerenciar empresas separadamente dos contatos
  Critérios de aceite:
  - CRUD completo de empresas
  - Campos: nome, domínio, website, indústria, tamanho
  - Lista de contatos da empresa
  - Lista de deals da empresa
  - Valor total de deals
```

#### Épico 6: Inbox

```
US-050: Como usuário, quero ver todas as conversas em um único lugar
  Critérios de aceite:
  - Lista de conversas ordenada por última mensagem
  - Preview da última mensagem
  - Indicador de não lidas
  - Filtro por status (aberta, fechada)
  - Busca por assunto ou contato

US-051: Como usuário, quero ver o histórico de uma conversa para entender o contexto
  Critérios de aceite:
  - Mensagens ordenadas cronologicamente
  - Diferenciação visual: cliente vs equipe vs sistema
  - Notas internas destacadas
  - Data/hora de cada mensagem
  - Anexos visíveis

US-052: Como usuário, quero enviar uma mensagem para responder ao cliente
  Critérios de aceite:
  - Campo de texto com formatação básica
  - Botão de enviar (e atalho Cmd/Ctrl+Enter)
  - Indicador de enviando/enviado
  - Mensagem aparece na conversa imediatamente

US-053: Como usuário, quero adicionar uma nota interna para registrar informações
  Critérios de aceite:
  - Botão para alternar entre mensagem e nota
  - Nota aparece com visual diferenciado (amarelo)
  - Nota não é enviada ao cliente
  - Outros membros da equipe podem ver

US-054: Como usuário, quero ver o contexto do contato enquanto respondo
  Critérios de aceite:
  - Painel lateral com informações do contato
  - Deals relacionados
  - Atividades recentes
  - Ações rápidas (criar tarefa, criar deal)
```

#### Épico 7: Tarefas

```
US-060: Como usuário, quero ver minhas tarefas pendentes para organizar meu dia
  Critérios de aceite:
  - Lista agrupada por status (A fazer, Em progresso, Concluído)
  - Filtro por data (hoje, esta semana, atrasadas)
  - Filtro por prioridade
  - Indicador de tarefas atrasadas

US-061: Como usuário, quero criar uma tarefa para não esquecer de fazer algo
  Critérios de aceite:
  - Campos: título, descrição, data de vencimento, prioridade
  - Vincular a deal (opcional)
  - Vincular a contato (opcional)
  - Atribuir a membro da equipe

US-062: Como usuário, quero marcar uma tarefa como concluída para registrar progresso
  Critérios de aceite:
  - Checkbox ou botão de concluir
  - Tarefa move para "Concluído"
  - Registro de atividade
  - Opção de desfazer
```

#### Épico 8: Configurações

```
US-070: Como usuário, quero editar meu perfil para manter informações atualizadas
  Critérios de aceite:
  - Campos: nome, email, avatar
  - Alterar senha
  - Preferências de notificação

US-071: Como admin, quero gerenciar as etapas do pipeline para customizar o funil
  Critérios de aceite:
  - Lista de etapas com ordem
  - Adicionar nova etapa
  - Editar nome e cor
  - Reordenar (drag-and-drop)
  - Excluir etapa (com validação de deals)

US-072: Como admin, quero editar informações da organização
  Critérios de aceite:
  - Nome da organização
  - Logo
  - Configurações gerais
```

---

## 6. Requisitos Funcionais

### 6.1 Matriz de Funcionalidades

| ID | Funcionalidade | Prioridade | Complexidade | MVP |
|----|----------------|------------|--------------|-----|
| F001 | Autenticação email/senha | Must Have | Baixa | ✅ |
| F002 | OAuth (Google) | Should Have | Média | ✅ |
| F003 | Multi-tenant (organizações) | Must Have | Alta | ✅ |
| F004 | Dashboard com métricas | Must Have | Média | ✅ |
| F005 | Pipeline Kanban | Must Have | Alta | ✅ |
| F006 | Drag-and-drop de deals | Must Have | Média | ✅ |
| F007 | CRUD de Contatos | Must Have | Média | ✅ |
| F008 | CRUD de Empresas | Must Have | Média | ✅ |
| F009 | CRUD de Deals | Must Have | Média | ✅ |
| F010 | Inbox de conversas | Must Have | Alta | ✅ |
| F011 | Envio de mensagens | Must Have | Média | ✅ |
| F012 | Notas internas | Should Have | Baixa | ✅ |
| F013 | Tarefas | Should Have | Média | ✅ |
| F014 | Busca global | Should Have | Média | ✅ |
| F015 | Filtros avançados | Should Have | Média | ✅ |
| F016 | Realtime (mensagens) | Should Have | Alta | ✅ |
| F017 | Onboarding guiado | Should Have | Média | ✅ |
| F018 | Configurações de pipeline | Should Have | Média | ✅ |
| F019 | Integração WhatsApp | Could Have | Alta | ❌ |
| F020 | Integração Email | Could Have | Alta | ❌ |
| F021 | Automações | Could Have | Alta | ❌ |
| F022 | Relatórios avançados | Could Have | Média | ❌ |
| F023 | API pública | Won't Have (MVP) | Alta | ❌ |
| F024 | App mobile | Won't Have (MVP) | Alta | ❌ |

### 6.2 Regras de Negócio

#### RN001 - Isolamento de Dados (Multi-tenant)
- Cada organização só pode ver seus próprios dados
- Usuários pertencem a uma única organização
- RLS (Row Level Security) aplicado em todas as tabelas
- `organization_id` obrigatório em todas as entidades

#### RN002 - Pipeline de Vendas
- Cada organização tem um pipeline padrão
- Pipeline tem de 3 a 10 etapas
- Etapas têm ordem definida (display_order)
- Deals só podem estar em uma etapa por vez
- Mover deal registra atividade e atualiza `moved_at`

#### RN003 - Deals
- Deal deve ter título e valor
- Deal pode ter contato e/ou empresa
- Deal tem probabilidade baseada na etapa
- Deal pode ser marcado como ganho ou perdido
- Valor ponderado = valor × probabilidade

#### RN004 - Contatos
- Contato deve ter pelo menos nome
- Email deve ser único por organização
- Contato pode pertencer a uma empresa
- Status: Lead → Prospect → Cliente → Inativo

#### RN005 - Conversas e Mensagens
- Conversa pertence a um contato
- Mensagens têm tipo: inbound, outbound, internal, system
- Notas internas não são visíveis para o cliente
- Conversa tem status: open, closed

#### RN006 - Tarefas
- Tarefa deve ter título e data de vencimento
- Tarefa pode ser vinculada a deal e/ou contato
- Status: todo → in_progress → done
- Prioridade: low, medium, high

---

## 7. Requisitos Não-Funcionais

### 7.1 Performance

| Requisito | Métrica | Meta |
|-----------|---------|------|
| Tempo de carregamento inicial | First Contentful Paint | < 1.5s |
| Tempo de interação | Time to Interactive | < 3s |
| Resposta de API | Latência P95 | < 500ms |
| Tamanho do bundle | Gzipped | < 300KB |
| Lighthouse Score | Performance | > 80 |

### 7.2 Escalabilidade

| Requisito | Meta MVP | Meta 1 ano |
|-----------|----------|------------|
| Usuários simultâneos | 100 | 1.000 |
| Organizações | 50 | 500 |
| Deals por organização | 1.000 | 10.000 |
| Contatos por organização | 5.000 | 50.000 |
| Mensagens por dia | 1.000 | 50.000 |

### 7.3 Disponibilidade

| Requisito | Meta |
|-----------|------|
| Uptime | 99.5% |
| RPO (Recovery Point Objective) | 1 hora |
| RTO (Recovery Time Objective) | 4 horas |
| Backup | Diário automático |

### 7.4 Segurança

| Requisito | Implementação |
|-----------|---------------|
| Autenticação | JWT + Refresh tokens |
| Autorização | RLS no Supabase |
| Criptografia em trânsito | HTTPS obrigatório |
| Criptografia em repouso | Supabase padrão |
| Senhas | Hash com bcrypt |
| CORS | Domínios permitidos |
| Rate limiting | 100 req/min por IP |

### 7.5 Usabilidade

| Requisito | Meta |
|-----------|------|
| Tempo de onboarding | < 30 minutos |
| Ações até primeiro valor | < 5 cliques |
| Suporte a teclado | Atalhos principais |
| Responsividade | Desktop + Tablet |
| Acessibilidade | WCAG 2.1 AA |

### 7.6 Compatibilidade

| Browser | Versão Mínima |
|---------|---------------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 14+ |
| Edge | 90+ |

---

## 8. Arquitetura Técnica

### 8.1 Stack Tecnológico

#### Frontend
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 18.x | Framework UI |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool |
| Refine | 4.x | Framework CRUD |
| Tailwind CSS | 3.x | Styling |
| Shadcn/UI | - | Componentes |
| @dnd-kit | 6.x | Drag and drop |
| Recharts | 2.x | Gráficos |
| React Router | 7.x | Roteamento |

#### Backend (BaaS)
| Tecnologia | Propósito |
|------------|-----------|
| Supabase | Database + Auth + Realtime |
| PostgreSQL | Banco de dados |
| PostgREST | API REST automática |
| GoTrue | Autenticação |
| Realtime | WebSockets |

#### Infraestrutura
| Serviço | Propósito |
|---------|-----------|
| Vercel | Hospedagem frontend |
| Supabase Cloud | Backend |
| GitHub | Repositório |
| GitHub Actions | CI/CD |

### 8.2 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   React +   │  │   Refine    │  │  Shadcn/UI  │              │
│  │ TypeScript  │  │  Framework  │  │ Components  │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
│         │                │                │                      │
│         └────────────────┼────────────────┘                      │
│                          │                                       │
│                    ┌─────┴─────┐                                 │
│                    │  Vercel   │                                 │
│                    │   CDN     │                                 │
│                    └─────┬─────┘                                 │
└──────────────────────────┼──────────────────────────────────────┘
                           │ HTTPS
┌──────────────────────────┼──────────────────────────────────────┐
│                     SUPABASE                                     │
│                          │                                       │
│  ┌─────────────┐  ┌─────┴─────┐  ┌─────────────┐                │
│  │   GoTrue    │  │ PostgREST │  │  Realtime   │                │
│  │    Auth     │  │    API    │  │ WebSockets  │                │
│  └──────┬──────┘  └─────┬─────┘  └──────┬──────┘                │
│         │               │               │                        │
│         └───────────────┼───────────────┘                        │
│                         │                                        │
│                   ┌─────┴─────┐                                  │
│                   │PostgreSQL │                                  │
│                   │    RLS    │                                  │
│                   └───────────┘                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 8.3 Estrutura de Pastas

```
crm-alma/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── alma/           # Componentes da marca
│   │   │   ├── logo.tsx
│   │   │   ├── skeletons.tsx
│   │   │   └── empty-state.tsx
│   │   ├── refine-ui/      # Componentes Refine customizados
│   │   │   ├── form/
│   │   │   ├── layout/
│   │   │   ├── notification/
│   │   │   └── theme/
│   │   └── ui/             # Shadcn UI
│   ├── pages/
│   │   ├── dashboard/
│   │   ├── pipeline/
│   │   ├── inbox/
│   │   ├── contacts/
│   │   ├── companies/
│   │   ├── tasks/
│   │   ├── settings/
│   │   ├── onboarding/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   ├── utility/
│   ├── App.tsx
│   ├── App.css
│   ├── authProvider.ts
│   └── authProvider.dev.ts
├── supabase/
│   └── migrations/
│       ├── 001_initial_schema.sql
│       └── 002_seed_data.sql
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 9. Design e UX

### 9.1 Identidade Visual

#### Paleta de Cores

| Nome | Hex | Uso |
|------|-----|-----|
| Primary (Alma Purple) | `#605be5` | Botões, links, destaques |
| Primary Light | `#7c78ed` | Hover states |
| Primary Dark | `#4a46c4` | Active states |
| Background Dark | `#0a0a0a` | Fundo principal (dark mode) |
| Card Dark | `#1a1a1a` | Cards e containers |
| Border Dark | `#2d2d2d` | Bordas |
| Text Primary | `#fafafa` | Texto principal |
| Text Muted | `#71717a` | Texto secundário |
| Success | `#22c55e` | Sucesso, ganho |
| Warning | `#f59e0b` | Atenção |
| Error | `#ef4444` | Erro, perdido |

#### Tipografia

| Elemento | Fonte | Peso | Tamanho |
|----------|-------|------|---------|
| Headings | Manrope | 700 | 24-32px |
| Body | Manrope | 400 | 14-16px |
| Labels | Manrope | 500 | 12-14px |
| Monospace | Geist Mono | 400 | 13px |

#### Espaçamento

| Nome | Valor | Uso |
|------|-------|-----|
| xs | 4px | Entre elementos inline |
| sm | 8px | Padding interno pequeno |
| md | 16px | Padding padrão |
| lg | 24px | Gap entre seções |
| xl | 32px | Margens de página |

### 9.2 Componentes de UI

#### Princípios de Design

1. **Consistência** - Mesmos padrões em todo o sistema
2. **Feedback** - Usuário sempre sabe o que está acontecendo
3. **Eficiência** - Mínimo de cliques para ações comuns
4. **Clareza** - Informação hierarquizada e legível

#### Estados de Componentes

| Estado | Visual |
|--------|--------|
| Default | Cor neutra, borda sutil |
| Hover | Fundo mais claro, borda destacada |
| Focus | Ring de foco (primary) |
| Active | Cor primary, texto claro |
| Disabled | Opacidade 50%, cursor not-allowed |
| Loading | Skeleton ou spinner |
| Error | Borda vermelha, mensagem de erro |

### 9.3 Layouts

#### Layout Principal (Autenticado)

```
┌────────────────────────────────────────────────────────┐
│ ┌──────┐                                    ┌────────┐ │
│ │ Logo │          Header                    │ Avatar │ │
│ └──────┘                                    └────────┘ │
├────────┬───────────────────────────────────────────────┤
│        │                                               │
│   S    │                                               │
│   i    │                                               │
│   d    │              Main Content                     │
│   e    │                                               │
│   b    │                                               │
│   a    │                                               │
│   r    │                                               │
│        │                                               │
├────────┴───────────────────────────────────────────────┤
│                     (Footer opcional)                  │
└────────────────────────────────────────────────────────┘
```

#### Layout do Inbox (3 colunas)

```
┌────────┬────────────────────┬──────────────┐
│        │                    │              │
│  List  │     Messages       │   Context    │
│        │                    │    Panel     │
│ Conver │                    │              │
│ sations│                    │  - Contact   │
│        │                    │  - Deal      │
│        │                    │  - Tasks     │
│        │                    │              │
│        ├────────────────────┤              │
│        │   Compose Area     │              │
└────────┴────────────────────┴──────────────┘
```

### 9.4 Fluxos de Usuário

#### Fluxo: Criar Novo Deal

```
[Pipeline] → [Botão "Novo Deal"] → [Modal de Criação]
                                         │
                    ┌────────────────────┼────────────────────┐
                    │                    │                    │
              [Preencher]          [Selecionar]         [Selecionar]
              [Título e Valor]     [Contato]            [Etapa]
                    │                    │                    │
                    └────────────────────┼────────────────────┘
                                         │
                                   [Salvar]
                                         │
                              [Deal aparece no Kanban]
```

#### Fluxo: Responder Conversa

```
[Inbox] → [Selecionar Conversa] → [Ver Histórico]
                                        │
                               [Digitar Resposta]
                                        │
                    ┌───────────────────┴───────────────────┐
                    │                                       │
            [Enviar Mensagem]                    [Adicionar Nota Interna]
                    │                                       │
                    └───────────────────┬───────────────────┘
                                        │
                              [Mensagem/Nota aparece]
```

---

## 10. Modelo de Dados

### 10.1 Diagrama ER

```
┌─────────────────┐       ┌─────────────────┐
│  organizations  │       │    profiles     │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │───┐   │ id (PK, FK)     │
│ name            │   │   │ organization_id │──┐
│ slug            │   │   │ full_name       │  │
│ created_at      │   │   │ avatar_url      │  │
│ updated_at      │   │   │ role            │  │
└─────────────────┘   │   │ created_at      │  │
                      │   └─────────────────┘  │
                      │                        │
                      │   ┌─────────────────┐  │
                      └───│    companies    │  │
                          ├─────────────────┤  │
                      ┌───│ id (PK)         │  │
                      │   │ organization_id │──┘
                      │   │ name            │
                      │   │ domain          │
                      │   │ industry        │
                      │   │ size            │
                      │   └─────────────────┘
                      │
                      │   ┌─────────────────┐
                      │   │    contacts     │
                      │   ├─────────────────┤
                      │   │ id (PK)         │───┐
                      └───│ company_id (FK) │   │
                          │ organization_id │   │
                          │ first_name      │   │
                          │ last_name       │   │
                          │ email           │   │
                          │ phone           │   │
                          │ status          │   │
                          │ owner_id (FK)   │   │
                          └─────────────────┘   │
                                                │
┌─────────────────┐       ┌─────────────────┐   │
│    pipelines    │       │      deals      │   │
├─────────────────┤       ├─────────────────┤   │
│ id (PK)         │───┐   │ id (PK)         │   │
│ organization_id │   │   │ pipeline_id(FK) │───┘
│ name            │   │   │ stage_id (FK)   │───┐
│ is_default      │   │   │ contact_id (FK) │   │
└─────────────────┘   │   │ company_id (FK) │   │
                      │   │ title           │   │
┌─────────────────┐   │   │ value           │   │
│ pipeline_stages │   │   │ probability     │   │
├─────────────────┤   │   │ owner_id (FK)   │   │
│ id (PK)         │───┘   │ status          │   │
│ pipeline_id(FK) │       │ won_at          │   │
│ name            │       │ lost_at         │   │
│ color           │       └─────────────────┘   │
│ display_order   │                             │
│ probability     │   ┌─────────────────┐       │
│ is_won          │   │  conversations  │       │
│ is_lost         │   ├─────────────────┤       │
└─────────────────┘   │ id (PK)         │───┐   │
                      │ organization_id │   │   │
                      │ contact_id (FK) │───┘   │
                      │ channel         │       │
                      │ subject         │       │
                      │ status          │       │
                      │ assigned_to(FK) │       │
                      └─────────────────┘       │
                                                │
                      ┌─────────────────┐       │
                      │    messages     │       │
                      ├─────────────────┤       │
                      │ id (PK)         │       │
                      │ conversation_id │───────┘
                      │ sender_id (FK)  │
                      │ type            │
                      │ content         │
                      │ attachments     │
                      │ created_at      │
                      └─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│   activities    │       │     tasks       │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ organization_id │       │ organization_id │
│ type            │       │ title           │
│ description     │       │ description     │
│ deal_id (FK)    │       │ due_date        │
│ contact_id (FK) │       │ priority        │
│ user_id (FK)    │       │ status          │
│ metadata        │       │ deal_id (FK)    │
│ created_at      │       │ contact_id (FK) │
└─────────────────┘       │ assigned_to(FK) │
                          └─────────────────┘
```

### 10.2 Tabelas Principais

#### organizations
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### contacts
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  company_id UUID REFERENCES companies(id),
  owner_id UUID REFERENCES profiles(id),
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  job_title TEXT,
  status contact_status DEFAULT 'lead',
  source TEXT,
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, email)
);
```

#### deals
```sql
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  pipeline_id UUID NOT NULL REFERENCES pipelines(id),
  stage_id UUID NOT NULL REFERENCES pipeline_stages(id),
  contact_id UUID REFERENCES contacts(id),
  company_id UUID REFERENCES companies(id),
  owner_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  value DECIMAL(15,2) DEFAULT 0,
  probability INTEGER DEFAULT 0,
  expected_close_date DATE,
  status deal_status DEFAULT 'open',
  won_at TIMESTAMPTZ,
  lost_at TIMESTAMPTZ,
  lost_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  moved_at TIMESTAMPTZ DEFAULT now()
);
```

### 10.3 Políticas RLS

```sql
-- Exemplo: Contatos só visíveis pela organização
CREATE POLICY "Contacts are viewable by organization members"
ON contacts FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
  )
);

-- Exemplo: Deals só editáveis pela organização
CREATE POLICY "Deals are editable by organization members"
ON deals FOR ALL
USING (
  organization_id IN (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
  )
);
```

---

## 11. Integrações

### 11.1 Integrações Planejadas

| Integração | Prioridade | Versão | Complexidade |
|------------|------------|--------|--------------|
| Google OAuth | Alta | MVP | Baixa |
| WhatsApp Business | Alta | v1.1 | Alta |
| Email (SMTP/IMAP) | Alta | v1.1 | Alta |
| Google Calendar | Média | v1.2 | Média |
| Slack | Baixa | v1.3 | Baixa |
| Zapier | Baixa | v1.3 | Média |

### 11.2 Especificação: WhatsApp Business (v1.1)

**Objetivo:** Receber e enviar mensagens de WhatsApp diretamente no CRM

**Requisitos:**
- Conta WhatsApp Business API (Meta)
- Webhook para receber mensagens
- Templates aprovados para mensagens outbound
- Suporte a mídia (imagens, documentos)

**Fluxo:**
1. Cliente envia mensagem → Webhook recebe → Cria/atualiza conversa → Notifica usuário
2. Usuário responde → API envia → Status de entrega → Atualiza conversa

### 11.3 Especificação: Email (v1.1)

**Objetivo:** Enviar e receber emails pelo CRM

**Opções de Implementação:**
1. **SendGrid/Resend** (envio) + **Webhook** (recebimento)
2. **IMAP/SMTP** direto (mais complexo)

**Requisitos:**
- Envio de emails com templates
- Recebimento via webhook ou polling
- Tracking de abertura e cliques
- Anexos

---

## 12. Roadmap de Desenvolvimento

### 12.1 Cronograma

```
2024 Q4 (Dez)
├── Semana 1-2: MVP Frontend ✅
│   ├── Estrutura base
│   ├── Tema e componentes
│   ├── Páginas com dados mockados
│   └── Melhorias de UX
│
└── Semana 3-4: Integração Supabase
    ├── Executar migrations
    ├── Conectar autenticação
    ├── CRUD de Contatos e Empresas
    └── Pipeline funcional

2025 Q1 (Jan-Mar)
├── Janeiro: Core Features
│   ├── Inbox completo
│   ├── Realtime
│   ├── Tarefas
│   └── Dashboard com dados reais
│
├── Fevereiro: Integrações
│   ├── WhatsApp Business
│   ├── Email (envio)
│   └── Calendário
│
└── Março: Polish
    ├── Performance
    ├── Testes
    ├── Documentação
    └── Lançamento Beta

2025 Q2 (Abr-Jun)
├── Abril: Automações
│   ├── Triggers
│   ├── Ações automáticas
│   └── Templates
│
├── Maio: IA
│   ├── Lead scoring
│   ├── Sugestões
│   └── Análise de sentimento
│
└── Junho: Escala
    ├── App mobile
    ├── API pública
    └── Marketplace
```

### 12.2 Milestones

| Milestone | Data | Critérios de Sucesso |
|-----------|------|----------------------|
| M1: MVP Frontend | 15/12/2024 | Todas as páginas com dados mockados ✅ |
| M2: Backend Integrado | 31/12/2024 | CRUD funcionando com Supabase |
| M3: Beta Fechado | 31/01/2025 | 10 organizações testando |
| M4: Integrações | 28/02/2025 | WhatsApp e Email funcionando |
| M5: Lançamento | 31/03/2025 | Produto público, pricing definido |

---

## 13. Riscos e Mitigações

### 13.1 Matriz de Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Atraso na integração WhatsApp | Alta | Alto | Começar cedo, ter alternativa (Twilio) |
| Supabase não escala | Baixa | Alto | Arquitetura permite migração |
| Baixa adoção inicial | Média | Alto | Validar com usuários, iterar rápido |
| Concorrência lança feature killer | Média | Médio | Foco no nicho (agências BR) |
| Problemas de performance | Média | Médio | Testes de carga, otimização |
| Complexidade de RLS | Alta | Médio | Testes extensivos, documentação |

### 13.2 Plano de Contingência

**Se WhatsApp não funcionar a tempo:**
- Lançar sem WhatsApp, apenas com email
- Usar Twilio como alternativa
- Integração manual via webhook genérico

**Se Supabase tiver problemas:**
- Migrar para PostgreSQL próprio (Railway/Render)
- Manter mesma estrutura de dados
- Implementar auth próprio com NextAuth

**Se não conseguir usuários beta:**
- Usar internamente na Agência Alma
- Oferecer gratuitamente para 3 meses
- Parceria com outras agências do network

---

## 14. Glossário

| Termo | Definição |
|-------|-----------|
| **Deal** | Oportunidade de negócio em andamento |
| **Pipeline** | Funil de vendas com etapas definidas |
| **Stage** | Etapa do pipeline (ex: Qualificação, Proposta) |
| **Lead** | Contato inicial, ainda não qualificado |
| **Prospect** | Lead qualificado com potencial de compra |
| **Conversation** | Thread de mensagens com um contato |
| **Inbox** | Central de mensagens do CRM |
| **RLS** | Row Level Security - segurança por linha no banco |
| **Multi-tenant** | Arquitetura onde múltiplas organizações usam o mesmo sistema isoladamente |
| **Kanban** | Visualização em quadro com colunas |
| **Drag-and-drop** | Arrastar e soltar elementos |
| **Realtime** | Atualização em tempo real via WebSocket |
| **Webhook** | URL que recebe notificações de eventos externos |

---

## Apêndices

### A. Wireframes
*Link para Figma: [A definir]*

### B. Protótipo Interativo
*Link para protótipo: [A definir]*

### C. Documentação Técnica
- [ROADMAP.md](./ROADMAP.md)
- [NEXT_STEPS.md](./NEXT_STEPS.md)
- [README.md](./README.md)

### D. Repositório
- GitHub: https://github.com/mateusolintof/crm_alma_refine

---

**Documento criado por:** Agência Alma  
**Última atualização:** 9 de Dezembro de 2025  
**Próxima revisão:** 15 de Dezembro de 2025

