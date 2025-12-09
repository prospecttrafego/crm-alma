import { cn } from "@/lib/utils";
import { useNavigation } from "@refinedev/core";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Calendar,
  User,
  Target,
} from "lucide-react";
import { EmptyState } from "@/components/alma/empty-state";

interface Task {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "done";
  contact?: { id: string; name: string };
  deal?: { id: string; title: string };
  assigned_to?: { id: string; name: string };
}

const mockTasks: Task[] = [
  { id: "t1", title: "Ligar para João - TechCorp", description: "Discutir proposta de redesign", due_date: "2024-01-15", priority: "high", status: "todo", contact: { id: "1", name: "João Silva" }, deal: { id: "d1", title: "Website Redesign" } },
  { id: "t2", title: "Enviar proposta - StartupXYZ", due_date: "2024-01-15", priority: "medium", status: "todo", contact: { id: "2", name: "Maria Santos" }, deal: { id: "d2", title: "App Mobile" } },
  { id: "t3", title: "Follow-up email - Loja ABC", due_date: "2024-01-16", priority: "low", status: "todo", contact: { id: "3", name: "Carlos Oliveira" } },
  { id: "t4", title: "Reunião de kickoff", due_date: "2024-01-17", priority: "high", status: "in_progress", deal: { id: "d2", title: "App Mobile" } },
  { id: "t5", title: "Preparar apresentação", due_date: "2024-01-14", priority: "medium", status: "done" },
];

export function TaskList() {
  const { create, edit } = useNavigation();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "done" ? "todo" : "done" }
          : task
      )
    );
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    const colors = {
      low: "bg-slate-500",
      medium: "bg-amber-500",
      high: "bg-red-500",
    };
    return colors[priority];
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const isToday = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate).toDateString() === new Date().toDateString();
  };

  // Agrupar por status
  const todoTasks = filteredTasks.filter((t) => t.status === "todo");
  const inProgressTasks = filteredTasks.filter((t) => t.status === "in_progress");
  const doneTasks = filteredTasks.filter((t) => t.status === "done");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tarefas</h1>
          <p className="text-muted-foreground">Gerencie suas tarefas e atividades</p>
        </div>
        <Button onClick={() => create("tasks")}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefas..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="todo">A fazer</SelectItem>
            <SelectItem value="in_progress">Em progresso</SelectItem>
            <SelectItem value="done">Concluídas</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="low">Baixa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <EmptyState
          variant={searchQuery || statusFilter !== "all" || priorityFilter !== "all" ? "search" : "tasks"}
          title={searchQuery || statusFilter !== "all" || priorityFilter !== "all" ? "Nenhuma tarefa encontrada" : undefined}
          actionLabel={searchQuery || statusFilter !== "all" || priorityFilter !== "all" ? "Limpar Filtros" : "Criar Tarefa"}
          onAction={() => {
            if (searchQuery || statusFilter !== "all" || priorityFilter !== "all") {
              setSearchQuery("");
              setStatusFilter("all");
              setPriorityFilter("all");
            } else {
              create("tasks");
            }
          }}
        />
      )}

      {filteredTasks.length > 0 && (
      <div className="space-y-6">
        {/* A Fazer */}
        {todoTasks.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">
              A FAZER ({todoTasks.length})
            </h2>
            <div className="space-y-2">
              {todoTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTaskStatus(task.id)}
                  onEdit={() => edit("tasks", task.id)}
                  getPriorityColor={getPriorityColor}
                  isOverdue={isOverdue}
                  isToday={isToday}
                />
              ))}
            </div>
          </div>
        )}

        {/* Em Progresso */}
        {inProgressTasks.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">
              EM PROGRESSO ({inProgressTasks.length})
            </h2>
            <div className="space-y-2">
              {inProgressTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTaskStatus(task.id)}
                  onEdit={() => edit("tasks", task.id)}
                  getPriorityColor={getPriorityColor}
                  isOverdue={isOverdue}
                  isToday={isToday}
                />
              ))}
            </div>
          </div>
        )}

        {/* Concluídas */}
        {doneTasks.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">
              CONCLUÍDAS ({doneTasks.length})
            </h2>
            <div className="space-y-2">
              {doneTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTaskStatus(task.id)}
                  onEdit={() => edit("tasks", task.id)}
                  getPriorityColor={getPriorityColor}
                  isOverdue={isOverdue}
                  isToday={isToday}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
}

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  getPriorityColor: (priority: Task["priority"]) => string;
  isOverdue: (date?: string) => boolean;
  isToday: (date?: string) => boolean;
}

function TaskCard({ task, onToggle, onEdit, getPriorityColor, isOverdue, isToday }: TaskCardProps) {
  const isDone = task.status === "done";

  return (
    <Card className={cn(isDone && "opacity-60")}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isDone}
            onCheckedChange={onToggle}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className={cn("h-2 w-2 rounded-full", getPriorityColor(task.priority))} />
              <p className={cn("font-medium", isDone && "line-through text-muted-foreground")}>
                {task.title}
              </p>
            </div>
            {task.description && (
              <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
            )}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {task.due_date && (
                <span
                  className={cn(
                    "flex items-center gap-1",
                    isOverdue(task.due_date) && !isDone && "text-red-500",
                    isToday(task.due_date) && !isDone && "text-amber-500"
                  )}
                >
                  <Calendar className="h-3 w-3" />
                  {new Date(task.due_date).toLocaleDateString("pt-BR")}
                  {isToday(task.due_date) && " (Hoje)"}
                </span>
              )}
              {task.contact && (
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {task.contact.name}
                </span>
              )}
              {task.deal && (
                <span className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {task.deal.title}
                </span>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

TaskList.displayName = "TaskList";

