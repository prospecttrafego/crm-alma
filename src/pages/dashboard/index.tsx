import { cn } from "@/lib/utils";
import { useGetIdentity } from "@refinedev/core";
import type { UserIdentity } from "@/authProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowUpRight,
  DollarSign,
  Inbox,
  TrendingUp,
  Users,
  CheckSquare,
  Target,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Dados mockados para demonstração (serão substituídos por dados reais)
const mockDealsData = [
  { month: "Jan", value: 12000 },
  { month: "Fev", value: 18000 },
  { month: "Mar", value: 15000 },
  { month: "Abr", value: 22000 },
  { month: "Mai", value: 28000 },
  { month: "Jun", value: 35000 },
];

const mockStagesData = [
  { name: "Novo Lead", count: 12, color: "#94a3b8" },
  { name: "Qualificação", count: 8, color: "#f59e0b" },
  { name: "Proposta", count: 5, color: "#605be5" },
  { name: "Negociação", count: 3, color: "#8b5cf6" },
  { name: "Fechamento", count: 2, color: "#06b6d4" },
];

export function Dashboard() {
  const { data: user } = useGetIdentity<UserIdentity>();

  // TODO: Buscar dados reais quando as tabelas existirem no Supabase
  // Por enquanto, usando dados mockados para demonstração

  // Valores mockados para demonstração
  const stats = {
    openDeals: 30,
    openDealsValue: 125000,
    openConversations: 12,
    pendingTasks: 8,
    totalContacts: 156,
    conversionRate: 23,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Olá, {user?.name?.split(" ")[0] || "Usuário"}! 👋
        </h1>
        <p className="text-muted-foreground">
          Aqui está o resumo do seu CRM hoje.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Deals em Aberto"
          value={stats.openDeals}
          description={`R$ ${stats.openDealsValue.toLocaleString("pt-BR")} em pipeline`}
          icon={<Target className="h-4 w-4" />}
          trend="+12%"
          trendUp
        />
        <StatsCard
          title="Conversas Abertas"
          value={stats.openConversations}
          description="Aguardando resposta"
          icon={<Inbox className="h-4 w-4" />}
          trend="-3"
          trendUp={false}
        />
        <StatsCard
          title="Tarefas Pendentes"
          value={stats.pendingTasks}
          description="Para hoje"
          icon={<CheckSquare className="h-4 w-4" />}
        />
        <StatsCard
          title="Total de Contatos"
          value={stats.totalContacts}
          description={`${stats.conversionRate}% de conversão`}
          icon={<Users className="h-4 w-4" />}
          trend="+8"
          trendUp
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Valor de Deals Fechados
            </CardTitle>
            <CardDescription>
              Últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockDealsData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#605be5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#605be5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `R$${value / 1000}k`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid gap-1">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                {payload[0].payload.month}
                              </span>
                              <span className="font-bold text-primary">
                                R$ {payload[0].value?.toLocaleString("pt-BR")}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#605be5"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Distribution */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Deals por Etapa
            </CardTitle>
            <CardDescription>
              Distribuição atual do pipeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockStagesData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <span className="font-bold">
                              {payload[0].value} deals
                            </span>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="count"
                    radius={[0, 4, 4, 0]}
                    fill="#605be5"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Deals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Deals Recentes
            </CardTitle>
            <CardDescription>
              Últimas movimentações no pipeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Website Redesign", company: "TechCorp", value: 15000, stage: "Proposta" },
                { title: "App Mobile", company: "StartupXYZ", value: 28000, stage: "Negociação" },
                { title: "Branding Completo", company: "Loja ABC", value: 8500, stage: "Qualificação" },
              ].map((deal, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{deal.title}</p>
                    <p className="text-sm text-muted-foreground">{deal.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      R$ {deal.value.toLocaleString("pt-BR")}
                    </p>
                    <p className="text-xs text-muted-foreground">{deal.stage}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks Due Today */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Tarefas para Hoje
            </CardTitle>
            <CardDescription>
              {stats.pendingTasks} tarefas pendentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Ligar para João - TechCorp", time: "09:00", priority: "high" },
                { title: "Enviar proposta - StartupXYZ", time: "14:00", priority: "medium" },
                { title: "Follow-up email - Loja ABC", time: "16:30", priority: "low" },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      task.priority === "high" && "bg-red-500",
                      task.priority === "medium" && "bg-amber-500",
                      task.priority === "low" && "bg-slate-400"
                    )}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.title}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{task.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

function StatsCard({ title, value, description, icon, trend, trendUp }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {trend && (
            <span
              className={cn(
                "flex items-center font-medium",
                trendUp ? "text-green-500" : "text-red-500"
              )}
            >
              {trendUp ? <TrendingUp className="h-3 w-3 mr-0.5" /> : null}
              {trend}
            </span>
          )}
          <span>{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}

Dashboard.displayName = "Dashboard";

