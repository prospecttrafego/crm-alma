import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building2,
  KanbanSquare,
  Inbox,
  CheckSquare,
  Search,
  FileX,
  Plus,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

type EmptyStateVariant = 
  | "contacts"
  | "companies"
  | "deals"
  | "conversations"
  | "tasks"
  | "search"
  | "error"
  | "generic";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const variantConfig: Record<EmptyStateVariant, {
  icon: React.ReactNode;
  defaultTitle: string;
  defaultDescription: string;
  defaultAction: string;
  gradient: string;
}> = {
  contacts: {
    icon: <Users className="h-12 w-12" />,
    defaultTitle: "Nenhum contato ainda",
    defaultDescription: "Comece adicionando seu primeiro contato para gerenciar seus relacionamentos.",
    defaultAction: "Adicionar Contato",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  companies: {
    icon: <Building2 className="h-12 w-12" />,
    defaultTitle: "Nenhuma empresa cadastrada",
    defaultDescription: "Adicione empresas para organizar seus contatos e acompanhar negócios.",
    defaultAction: "Adicionar Empresa",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  deals: {
    icon: <TrendingUp className="h-12 w-12" />,
    defaultTitle: "Pipeline vazio",
    defaultDescription: "Crie seu primeiro deal para começar a acompanhar suas oportunidades de venda.",
    defaultAction: "Criar Deal",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  conversations: {
    icon: <MessageSquare className="h-12 w-12" />,
    defaultTitle: "Inbox vazio",
    defaultDescription: "Quando você receber mensagens de clientes, elas aparecerão aqui.",
    defaultAction: "Iniciar Conversa",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  tasks: {
    icon: <CheckSquare className="h-12 w-12" />,
    defaultTitle: "Nenhuma tarefa pendente",
    defaultDescription: "Ótimo! Você está em dia. Crie uma nova tarefa quando precisar.",
    defaultAction: "Criar Tarefa",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  search: {
    icon: <Search className="h-12 w-12" />,
    defaultTitle: "Nenhum resultado encontrado",
    defaultDescription: "Tente ajustar os filtros ou buscar por outros termos.",
    defaultAction: "Limpar Filtros",
    gradient: "from-gray-500/20 to-slate-500/20",
  },
  error: {
    icon: <FileX className="h-12 w-12" />,
    defaultTitle: "Algo deu errado",
    defaultDescription: "Não foi possível carregar os dados. Tente novamente.",
    defaultAction: "Tentar Novamente",
    gradient: "from-red-500/20 to-rose-500/20",
  },
  generic: {
    icon: <KanbanSquare className="h-12 w-12" />,
    defaultTitle: "Nada aqui ainda",
    defaultDescription: "Esta seção está vazia. Adicione algo para começar.",
    defaultAction: "Adicionar",
    gradient: "from-primary/20 to-primary/10",
  },
};

export function EmptyState({
  variant = "generic",
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const config = variantConfig[variant];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      {/* Animated Icon Container */}
      <div
        className={cn(
          "relative mb-6 rounded-full p-6",
          "bg-gradient-to-br",
          config.gradient,
          "animate-pulse"
        )}
      >
        <div className="text-muted-foreground">
          {config.icon}
        </div>
        
        {/* Decorative rings */}
        <div className="absolute inset-0 rounded-full border border-border/50 animate-ping opacity-20" />
        <div className="absolute -inset-2 rounded-full border border-border/30" />
        <div className="absolute -inset-4 rounded-full border border-border/20" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title || config.defaultTitle}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground max-w-md mb-6">
        {description || config.defaultDescription}
      </p>

      {/* Action Button */}
      {onAction && (
        <Button onClick={onAction} className="gap-2">
          <Plus className="h-4 w-4" />
          {actionLabel || config.defaultAction}
        </Button>
      )}
    </div>
  );
}

// Compact version for inline use
export function EmptyStateCompact({
  variant = "generic",
  title,
  description,
  className,
}: Omit<EmptyStateProps, "actionLabel" | "onAction">) {
  const config = variantConfig[variant];

  return (
    <div
      className={cn(
        "flex items-center gap-4 py-8 px-4 text-center justify-center",
        className
      )}
    >
      <div className={cn(
        "rounded-full p-3 bg-gradient-to-br",
        config.gradient
      )}>
        <div className="text-muted-foreground scale-75">
          {config.icon}
        </div>
      </div>
      <div className="text-left">
        <h4 className="font-medium text-foreground">
          {title || config.defaultTitle}
        </h4>
        <p className="text-sm text-muted-foreground">
          {description || config.defaultDescription}
        </p>
      </div>
    </div>
  );
}

// For Inbox specifically
export function EmptyInbox() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 px-4 text-center">
      <div className="relative mb-6">
        {/* Envelope animation */}
        <div className="relative">
          <Inbox className="h-16 w-16 text-muted-foreground/50" />
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Inbox zerado! 🎉
      </h3>
      <p className="text-muted-foreground max-w-sm">
        Você respondeu todas as mensagens. Aproveite para focar em outras tarefas.
      </p>
    </div>
  );
}

// For Pipeline specifically
export function EmptyPipeline({ onCreateDeal }: { onCreateDeal?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative mb-8">
        {/* Kanban illustration */}
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "w-16 h-24 rounded-lg border-2 border-dashed border-border",
                "flex items-center justify-center",
                i === 2 && "border-primary/50 bg-primary/5"
              )}
            >
              {i === 2 && <Plus className="h-6 w-6 text-primary/50" />}
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Seu pipeline está vazio
      </h3>
      <p className="text-muted-foreground max-w-md mb-6">
        Crie seu primeiro deal para começar a visualizar e gerenciar suas oportunidades de venda.
      </p>
      {onCreateDeal && (
        <Button onClick={onCreateDeal} size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Criar Primeiro Deal
        </Button>
      )}
    </div>
  );
}

