import { cn } from "@/lib/utils";
import { useGetIdentity } from "@refinedev/core";
import type { UserIdentity } from "@/authProvider";
import { useState } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  MoreHorizontal,
  Plus,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  Edit,
  Trash2,
  CheckSquare,
  FileText,
  TrendingUp,
  ExternalLink,
  X,
} from "lucide-react";
import { EmptyPipeline } from "@/components/alma/empty-state";

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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createInStage, setCreateInStage] = useState<string | null>(null);

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

  // Abrir modal de criação
  const openCreateModal = (stageId?: string) => {
    setCreateInStage(stageId || stages[0]?.id || null);
    setIsCreateModalOpen(true);
  };

  // Criar novo deal
  const handleCreateDeal = (newDeal: Partial<Deal>) => {
    const deal: Deal = {
      id: `d${Date.now()}`,
      title: newDeal.title || "Novo Deal",
      value: newDeal.value || 0,
      probability: newDeal.probability || 10,
      stage_id: createInStage || stages[0]?.id || "1",
      created_at: new Date().toISOString(),
      moved_at: new Date().toISOString(),
      contact: newDeal.contact,
      company: newDeal.company,
    };
    setDeals([...deals, deal]);
    setIsCreateModalOpen(false);
    setCreateInStage(null);
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
        <Button onClick={() => openCreateModal()}>
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
                onAddDeal={() => openCreateModal(stage.id)}
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
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          {selectedDeal && (
            <>
              <SheetHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <SheetTitle className="text-xl">{selectedDeal.title}</SheetTitle>
                    <SheetDescription className="flex items-center gap-2 mt-1">
                      {selectedDeal.company?.name}
                      <span className="text-muted-foreground">•</span>
                      <Badge variant="outline" className="text-xs">
                        {stages.find(s => s.id === selectedDeal.stage_id)?.name}
                      </Badge>
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              <DealDetailPanel deal={selectedDeal} stages={stages} />
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Create Deal Modal */}
      <CreateDealModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setCreateInStage(null);
        }}
        onSubmit={handleCreateDeal}
        stages={stages}
        defaultStageId={createInStage}
      />
    </div>
  );
}

// Kanban Column Component
interface KanbanColumnProps {
  stage: Stage;
  deals: Deal[];
  total: number;
  onDealClick: (deal: Deal) => void;
  onAddDeal: () => void;
}

function KanbanColumn({ stage, deals, total, onDealClick, onAddDeal }: KanbanColumnProps) {
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
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={onAddDeal}
        >
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
  stages: Stage[];
}

function DealDetailPanel({ deal, stages }: DealDetailPanelProps) {
  const contactName = deal.contact
    ? `${deal.contact.first_name} ${deal.contact.last_name || ""}`.trim()
    : "Sem contato";
  
  const currentStage = stages.find(s => s.id === deal.stage_id);

  return (
    <div className="mt-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="activities">Atividades</TabsTrigger>
          <TabsTrigger value="notes">Notas</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6 mt-4">
          {/* Stage Progress */}
          {currentStage && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: currentStage.color }}
              />
              <span className="text-sm font-medium">{currentStage.name}</span>
              <span className="text-xs text-muted-foreground">
                ({currentStage.probability}% probabilidade)
              </span>
            </div>
          )}

          {/* Value & Probability */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <DollarSign className="h-4 w-4" />
                  <p className="text-xs">Valor</p>
                </div>
                <p className="text-2xl font-bold text-primary">
                  R$ {deal.value.toLocaleString("pt-BR")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <p className="text-xs">Probabilidade</p>
                </div>
                <p className="text-2xl font-bold">{deal.probability}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          {deal.contact && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                Contato
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Ver perfil
                </Button>
              </h4>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {contactName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-lg">{contactName}</p>
                      {deal.company && (
                        <p className="text-sm text-muted-foreground">{deal.company.name}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {deal.contact.email && (
                      <a 
                        href={`mailto:${deal.contact.email}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span>{deal.contact.email}</span>
                      </a>
                    )}
                    {deal.contact.phone && (
                      <a 
                        href={`tel:${deal.contact.phone}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{deal.contact.phone}</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="h-12">
              <MessageSquare className="h-4 w-4 mr-2" />
              Enviar Mensagem
            </Button>
            <Button variant="outline" className="h-12">
              <Phone className="h-4 w-4 mr-2" />
              Ligar
            </Button>
            <Button variant="outline" className="h-12">
              <CheckSquare className="h-4 w-4 mr-2" />
              Criar Tarefa
            </Button>
            <Button variant="outline" className="h-12">
              <Calendar className="h-4 w-4 mr-2" />
              Agendar
            </Button>
          </div>

          {/* Deal Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button variant="destructive" className="flex-1">
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Histórico de Atividades</h4>
              <Button variant="outline" size="sm">
                <Plus className="h-3 w-3 mr-1" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { type: "move", text: "Deal movido para Proposta", time: "2h atrás", icon: TrendingUp },
                { type: "note", text: "Nota adicionada: Cliente interessado em pacote premium", time: "1 dia atrás", icon: FileText },
                { type: "call", text: "Ligação realizada (5 min)", time: "2 dias atrás", icon: Phone },
                { type: "email", text: "Email enviado: Proposta comercial", time: "2 dias atrás", icon: Mail },
                { type: "create", text: "Deal criado", time: "3 dias atrás", icon: Plus },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Notas</h4>
              <Button variant="outline" size="sm">
                <Plus className="h-3 w-3 mr-1" />
                Nova Nota
              </Button>
            </div>
            <Textarea 
              placeholder="Adicionar uma nota rápida..."
              className="min-h-[80px] resize-none"
            />
            <div className="space-y-3">
              {[
                { text: "Cliente mencionou interesse em expandir para app mobile no Q2.", time: "1 dia atrás", author: "Você" },
                { text: "Primeira reunião muito positiva. Decisor principal é o João.", time: "3 dias atrás", author: "Você" },
              ].map((note, i) => (
                <Card key={i}>
                  <CardContent className="p-3">
                    <p className="text-sm">{note.text}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>{note.author}</span>
                      <span>•</span>
                      <span>{note.time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Create Deal Modal
interface CreateDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (deal: Partial<Deal>) => void;
  stages: Stage[];
  defaultStageId: string | null;
}

function CreateDealModal({ isOpen, onClose, onSubmit, stages, defaultStageId }: CreateDealModalProps) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [stageId, setStageId] = useState(defaultStageId || stages[0]?.id || "");
  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const stage = stages.find(s => s.id === stageId);
    
    onSubmit({
      title,
      value: parseFloat(value.replace(/\D/g, "")) || 0,
      probability: stage?.probability || 10,
      stage_id: stageId,
      contact: contactName ? { first_name: contactName } : undefined,
      company: companyName ? { name: companyName } : undefined,
    });

    // Reset form
    setTitle("");
    setValue("");
    setContactName("");
    setCompanyName("");
    setIsSubmitting(false);
  };

  // Update stage when modal opens with different default
  useState(() => {
    if (defaultStageId) {
      setStageId(defaultStageId);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Novo Deal
          </DialogTitle>
          <DialogDescription>
            Adicione um novo deal ao seu pipeline de vendas
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Título do Deal <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Ex: Website Redesign - TechCorp"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">
                <DollarSign className="h-3.5 w-3.5 inline mr-1" />
                Valor
              </Label>
              <Input
                id="value"
                placeholder="R$ 0,00"
                value={value}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  const formatted = numericValue 
                    ? `R$ ${parseInt(numericValue).toLocaleString("pt-BR")}`
                    : "";
                  setValue(formatted);
                }}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">Etapa</Label>
              <Select value={stageId} onValueChange={setStageId}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id}>
                      <span className="flex items-center gap-2">
                        <span 
                          className="h-2 w-2 rounded-full" 
                          style={{ backgroundColor: stage.color }}
                        />
                        {stage.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contato</Label>
            <Select>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Selecione um contato (opcional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">
                  <span className="flex items-center gap-2 text-primary">
                    <Plus className="h-4 w-4" />
                    Criar novo contato
                  </span>
                </SelectItem>
                <SelectItem value="joao">João Silva - TechCorp</SelectItem>
                <SelectItem value="maria">Maria Santos - StartupXYZ</SelectItem>
                <SelectItem value="carlos">Carlos Oliveira - Loja ABC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <Select>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Selecione uma empresa (opcional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">
                  <span className="flex items-center gap-2 text-primary">
                    <Plus className="h-4 w-4" />
                    Criar nova empresa
                  </span>
                </SelectItem>
                <SelectItem value="techcorp">TechCorp</SelectItem>
                <SelectItem value="startupxyz">StartupXYZ</SelectItem>
                <SelectItem value="lojaabc">Loja ABC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!title || isSubmitting}>
              {isSubmitting ? "Criando..." : "Criar Deal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

PipelineKanban.displayName = "PipelineKanban";

