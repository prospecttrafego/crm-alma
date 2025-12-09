import { cn } from "@/lib/utils";
import { useList, useUpdate, useGetIdentity } from "@refinedev/core";
import type { UserIdentity } from "@/authProvider";
import { useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MoreHorizontal,
  Plus,
  DollarSign,
  Calendar,
  User,
  Building2,
  Phone,
  Mail,
  MessageSquare,
  Clock,
} from "lucide-react";

// Tipos
interface Deal {
  id: string;
  title: string;
  value: number;
  probability: number;
  stage_id: string;
  contact_id?: string;
  company_id?: string;
  owner_id?: string;
  expected_close_date?: string;
  created_at: string;
  moved_at: string;
  // Relacionamentos (virão do join)
  contact?: {
    first_name: string;
    last_name?: string;
    email?: string;
    phone?: string;
  };
  company?: {
    name: string;
  };
  owner?: {
    full_name: string;
  };
}

interface Stage {
  id: string;
  name: string;
  color: string;
  display_order: number;
  is_won: boolean;
  is_lost: boolean;
  probability: number;
}

// Dados mockados para demonstração
const mockStages: Stage[] = [
  { id: "1", name: "Novo Lead", color: "#94a3b8", display_order: 0, is_won: false, is_lost: false, probability: 10 },
  { id: "2", name: "Qualificação", color: "#f59e0b", display_order: 1, is_won: false, is_lost: false, probability: 25 },
  { id: "3", name: "Proposta", color: "#605be5", display_order: 2, is_won: false, is_lost: false, probability: 50 },
  { id: "4", name: "Negociação", color: "#8b5cf6", display_order: 3, is_won: false, is_lost: false, probability: 75 },
  { id: "5", name: "Fechamento", color: "#06b6d4", display_order: 4, is_won: false, is_lost: false, probability: 90 },
];

const mockDeals: Deal[] = [
  { id: "d1", title: "Website Redesign", value: 15000, probability: 50, stage_id: "3", created_at: "2024-01-10", moved_at: "2024-01-15", contact: { first_name: "João", last_name: "Silva", email: "joao@techcorp.com", phone: "(11) 99999-1234" }, company: { name: "TechCorp" } },
  { id: "d2", title: "App Mobile iOS/Android", value: 45000, probability: 75, stage_id: "4", created_at: "2024-01-08", moved_at: "2024-01-14", contact: { first_name: "Maria", last_name: "Santos" }, company: { name: "StartupXYZ" } },
  { id: "d3", title: "Branding Completo", value: 8500, probability: 25, stage_id: "2", created_at: "2024-01-12", moved_at: "2024-01-12", contact: { first_name: "Carlos", last_name: "Oliveira" }, company: { name: "Loja ABC" } },
  { id: "d4", title: "E-commerce Platform", value: 65000, probability: 10, stage_id: "1", created_at: "2024-01-14", moved_at: "2024-01-14", contact: { first_name: "Ana", last_name: "Costa" }, company: { name: "Fashion Store" } },
  { id: "d5", title: "Landing Page", value: 3500, probability: 90, stage_id: "5", created_at: "2024-01-05", moved_at: "2024-01-13", contact: { first_name: "Pedro", last_name: "Lima" }, company: { name: "Consultoria Plus" } },
  { id: "d6", title: "Sistema CRM", value: 28000, probability: 25, stage_id: "2", created_at: "2024-01-11", moved_at: "2024-01-11", contact: { first_name: "Lucia", last_name: "Ferreira" }, company: { name: "Indústria Metal" } },
  { id: "d7", title: "Identidade Visual", value: 12000, probability: 10, stage_id: "1", created_at: "2024-01-13", moved_at: "2024-01-13", contact: { first_name: "Roberto", last_name: "Almeida" }, company: { name: "Restaurante Sabor" } },
];

export function PipelineKanban() {
  const { data: user } = useGetIdentity<UserIdentity>();
  const [stages] = useState<Stage[]>(mockStages);
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const deal = deals.find((d) => d.id === active.id);
    if (deal) {
      setActiveDeal(deal);
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDeal(null);

    if (!over) return;

    const dealId = active.id as string;
    const newStageId = over.id as string;

    // Verificar se é um stage válido
    const isValidStage = stages.some((s) => s.id === newStageId);
    if (!isValidStage) return;

    // Atualizar deal localmente
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === dealId
          ? { ...deal, stage_id: newStageId, moved_at: new Date().toISOString() }
          : deal
      )
    );

    // TODO: Chamar API para persistir mudança
    // mutate({ resource: "deals", id: dealId, values: { stage_id: newStageId } });
  };

  // Calcular totais por stage
  const getStageDeals = (stageId: string) => {
    return deals.filter((d) => d.stage_id === stageId);
  };

  const getStageTotal = (stageId: string) => {
    return getStageDeals(stageId).reduce((sum, d) => sum + d.value, 0);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline</h1>
          <p className="text-muted-foreground">
            Gerencie seus deals e acompanhe o funil de vendas
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Deal
        </Button>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-4 h-full min-w-max pb-4">
            {stages.map((stage) => (
              <KanbanColumn
                key={stage.id}
                stage={stage}
                deals={getStageDeals(stage.id)}
                total={getStageTotal(stage.id)}
                onDealClick={setSelectedDeal}
              />
            ))}
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeDeal ? (
            <DealCard deal={activeDeal} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Deal Detail Sheet */}
      <Sheet open={!!selectedDeal} onOpenChange={() => setSelectedDeal(null)}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          {selectedDeal && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedDeal.title}</SheetTitle>
                <SheetDescription>
                  {selectedDeal.company?.name}
                </SheetDescription>
              </SheetHeader>
              <DealDetailPanel deal={selectedDeal} />
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Kanban Column Component
interface KanbanColumnProps {
  stage: Stage;
  deals: Deal[];
  total: number;
  onDealClick: (deal: Deal) => void;
}

function KanbanColumn({ stage, deals, total, onDealClick }: KanbanColumnProps) {
  const { setNodeRef } = useSortable({
    id: stage.id,
    data: { type: "column" },
  });

  return (
    <div
      ref={setNodeRef}
      className="w-[300px] flex-shrink-0 flex flex-col bg-muted/30 rounded-lg"
    >
      {/* Column Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: stage.color }}
            />
            <h3 className="font-semibold text-sm">{stage.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {deals.length}
            </Badge>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          R$ {total.toLocaleString("pt-BR")}
        </p>
      </div>

      {/* Cards */}
      <ScrollArea className="flex-1 p-2">
        <SortableContext
          items={deals.map((d) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {deals.map((deal) => (
              <SortableDealCard
                key={deal.id}
                deal={deal}
                onClick={() => onDealClick(deal)}
              />
            ))}
          </div>
        </SortableContext>

        {deals.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Nenhum deal nesta etapa
          </div>
        )}
      </ScrollArea>

      {/* Add Deal Button */}
      <div className="p-2 border-t border-border">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar deal
        </Button>
      </div>
    </div>
  );
}

// Sortable Deal Card
interface SortableDealCardProps {
  deal: Deal;
  onClick: () => void;
}

function SortableDealCard({ deal, onClick }: SortableDealCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
    >
      <DealCard deal={deal} isDragging={isDragging} />
    </div>
  );
}

// Deal Card Component
interface DealCardProps {
  deal: Deal;
  isDragging?: boolean;
}

function DealCard({ deal, isDragging }: DealCardProps) {
  const contactName = deal.contact
    ? `${deal.contact.first_name} ${deal.contact.last_name || ""}`.trim()
    : "Sem contato";

  return (
    <Card
      className={cn(
        "cursor-grab active:cursor-grabbing transition-all",
        "hover:border-primary/50 hover:shadow-md",
        isDragging && "opacity-50 rotate-2 shadow-lg"
      )}
    >
      <CardContent className="p-3 space-y-2">
        {/* Title */}
        <h4 className="font-medium text-sm line-clamp-2">{deal.title}</h4>

        {/* Value */}
        <div className="flex items-center gap-1 text-primary font-semibold">
          <DollarSign className="h-3 w-3" />
          <span>R$ {deal.value.toLocaleString("pt-BR")}</span>
        </div>

        {/* Contact & Company */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Avatar className="h-5 w-5">
            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
              {contactName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate">{contactName}</span>
          {deal.company && (
            <>
              <span>•</span>
              <span className="truncate">{deal.company.name}</span>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <Badge variant="outline" className="text-xs">
            {deal.probability}%
          </Badge>
          {deal.expected_close_date && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(deal.expected_close_date).toLocaleDateString("pt-BR")}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Deal Detail Panel
interface DealDetailPanelProps {
  deal: Deal;
}

function DealDetailPanel({ deal }: DealDetailPanelProps) {
  const contactName = deal.contact
    ? `${deal.contact.first_name} ${deal.contact.last_name || ""}`.trim()
    : "Sem contato";

  return (
    <div className="mt-6 space-y-6">
      {/* Value & Probability */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Valor</p>
            <p className="text-xl font-bold text-primary">
              R$ {deal.value.toLocaleString("pt-BR")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Probabilidade</p>
            <p className="text-xl font-bold">{deal.probability}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Info */}
      {deal.contact && (
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Contato</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {contactName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{contactName}</p>
                {deal.company && (
                  <p className="text-sm text-muted-foreground">{deal.company.name}</p>
                )}
              </div>
            </div>
            {deal.contact.email && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{deal.contact.email}</span>
              </div>
            )}
            {deal.contact.phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{deal.contact.phone}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          <MessageSquare className="h-4 w-4 mr-2" />
          Mensagem
        </Button>
        <Button variant="outline" className="flex-1">
          <Phone className="h-4 w-4 mr-2" />
          Ligar
        </Button>
      </div>

      {/* Timeline placeholder */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Atividades Recentes</h4>
        <div className="space-y-3">
          {[
            { type: "move", text: "Deal movido para Proposta", time: "2h atrás" },
            { type: "note", text: "Nota adicionada", time: "1 dia atrás" },
            { type: "create", text: "Deal criado", time: "3 dias atrás" },
          ].map((activity, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="text-sm">{activity.text}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

PipelineKanban.displayName = "PipelineKanban";

