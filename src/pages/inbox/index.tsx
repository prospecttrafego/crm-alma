import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { useList, useGetIdentity } from "@refinedev/core";
import type { UserIdentity } from "@/authProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Filter,
  MoreHorizontal,
  Send,
  Paperclip,
  AtSign,
  MessageSquare,
  Mail,
  Phone,
  User,
  Building2,
  Target,
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
  Archive,
} from "lucide-react";

// Tipos
interface Conversation {
  id: string;
  subject: string;
  channel: "email" | "whatsapp" | "internal" | "sms";
  status: "open" | "resolved" | "on_hold" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  last_message_preview: string;
  last_message_at: string;
  is_read: boolean;
  contact?: {
    first_name: string;
    last_name?: string;
    email?: string;
    phone?: string;
    company?: {
      name: string;
    };
  };
  deal?: {
    id: string;
    title: string;
    value: number;
  };
  assigned_to?: {
    full_name: string;
  };
}

interface Message {
  id: string;
  body: string;
  message_type: "text" | "internal_comment" | "attachment" | "system";
  is_internal: boolean;
  is_outbound: boolean;
  sender_name?: string;
  sender_email?: string;
  sender?: {
    full_name: string;
    avatar_url?: string;
  };
  attachments?: Array<{ name: string; url: string; type: string }>;
  created_at: string;
}

// Dados mockados
const mockConversations: Conversation[] = [
  {
    id: "c1",
    subject: "Dúvida sobre o projeto de redesign",
    channel: "email",
    status: "open",
    priority: "high",
    last_message_preview: "Olá, gostaria de saber mais sobre o prazo de entrega...",
    last_message_at: "2024-01-15T10:30:00",
    is_read: false,
    contact: { first_name: "João", last_name: "Silva", email: "joao@techcorp.com", company: { name: "TechCorp" } },
    deal: { id: "d1", title: "Website Redesign", value: 15000 },
  },
  {
    id: "c2",
    subject: "Aprovação da proposta",
    channel: "whatsapp",
    status: "open",
    priority: "medium",
    last_message_preview: "A proposta foi aprovada! Podemos agendar uma reunião?",
    last_message_at: "2024-01-15T09:15:00",
    is_read: true,
    contact: { first_name: "Maria", last_name: "Santos", phone: "(11) 99999-5678", company: { name: "StartupXYZ" } },
    deal: { id: "d2", title: "App Mobile", value: 45000 },
  },
  {
    id: "c3",
    subject: "Feedback sobre o branding",
    channel: "email",
    status: "on_hold",
    priority: "low",
    last_message_preview: "Estamos analisando internamente e retornamos em breve.",
    last_message_at: "2024-01-14T16:45:00",
    is_read: true,
    contact: { first_name: "Carlos", last_name: "Oliveira", email: "carlos@lojaabc.com", company: { name: "Loja ABC" } },
  },
  {
    id: "c4",
    subject: "Solicitação de orçamento",
    channel: "email",
    status: "open",
    priority: "urgent",
    last_message_preview: "Precisamos de um orçamento urgente para o projeto...",
    last_message_at: "2024-01-15T11:00:00",
    is_read: false,
    contact: { first_name: "Ana", last_name: "Costa", email: "ana@fashionstore.com", company: { name: "Fashion Store" } },
  },
];

const mockMessages: Message[] = [
  {
    id: "m1",
    body: "Olá, gostaria de saber mais sobre o prazo de entrega do projeto de redesign. Temos uma data limite interna que precisamos cumprir.",
    message_type: "text",
    is_internal: false,
    is_outbound: false,
    sender_name: "João Silva",
    sender_email: "joao@techcorp.com",
    created_at: "2024-01-15T10:30:00",
  },
  {
    id: "m2",
    body: "Nota interna: Cliente parece ansioso com o prazo. Verificar com a equipe se conseguimos adiantar.",
    message_type: "internal_comment",
    is_internal: true,
    is_outbound: true,
    sender: { full_name: "Você" },
    created_at: "2024-01-15T10:35:00",
  },
  {
    id: "m3",
    body: "Olá João! Obrigado pelo contato. Estamos trabalhando para entregar o projeto dentro do prazo acordado. Vou verificar com a equipe e te retorno ainda hoje com uma atualização mais detalhada.",
    message_type: "text",
    is_internal: false,
    is_outbound: true,
    sender: { full_name: "Você" },
    created_at: "2024-01-15T10:40:00",
  },
  {
    id: "m4",
    body: "Perfeito, aguardo o retorno. Se possível, seria ótimo ter uma previsão mais precisa para alinhar com a diretoria.",
    message_type: "text",
    is_internal: false,
    is_outbound: false,
    sender_name: "João Silva",
    sender_email: "joao@techcorp.com",
    created_at: "2024-01-15T11:15:00",
  },
];

// Componente principal - Lista de conversas
export function InboxList() {
  const { data: user } = useGetIdentity<UserIdentity>();
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations[0]
  );
  const [messages] = useState<Message[]>(mockMessages);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((c) => {
    if (filter === "unread") return !c.is_read;
    if (filter === "open") return c.status === "open";
    if (filter === "on_hold") return c.status === "on_hold";
    return true;
  });

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Left Panel - Conversation List */}
      <div className="w-[350px] border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Inbox</h1>
            <Badge variant="secondary">{conversations.filter((c) => !c.is_read).length} novas</Badge>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversas..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filtrar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="unread">Não lidas</SelectItem>
                <SelectItem value="open">Abertas</SelectItem>
                <SelectItem value="on_hold">Em espera</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1">
          {filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedConversation?.id === conversation.id}
              onClick={() => setSelectedConversation(conversation)}
            />
          ))}
        </ScrollArea>
      </div>

      {/* Center Panel - Messages */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Conversation Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedConversation.contact?.first_name?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">
                      {selectedConversation.contact?.first_name}{" "}
                      {selectedConversation.contact?.last_name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.subject}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedConversation.status} />
                  <PriorityBadge priority={selectedConversation.priority} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Marcar como resolvido
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="h-4 w-4 mr-2" />
                        Arquivar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <MessageComposer />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Selecione uma conversa para visualizar
          </div>
        )}
      </div>

      {/* Right Panel - Context */}
      {selectedConversation && (
        <div className="w-[300px] border-l border-border p-4 space-y-4">
          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>
                  {selectedConversation.contact?.first_name}{" "}
                  {selectedConversation.contact?.last_name}
                </span>
              </div>
              {selectedConversation.contact?.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{selectedConversation.contact.email}</span>
                </div>
              )}
              {selectedConversation.contact?.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{selectedConversation.contact.phone}</span>
                </div>
              )}
              {selectedConversation.contact?.company && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{selectedConversation.contact.company.name}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Deal Info */}
          {selectedConversation.deal && (
            <>
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Deal Relacionado</h3>
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">
                        {selectedConversation.deal.title}
                      </span>
                    </div>
                    <p className="text-sm text-primary font-semibold">
                      R$ {selectedConversation.deal.value.toLocaleString("pt-BR")}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Separator />
            </>
          )}

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Ações Rápidas</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-1" />
                Ligar
              </Button>
              <Button variant="outline" size="sm">
                <Target className="h-4 w-4 mr-1" />
                Criar Deal
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Conversation Item Component
interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

function ConversationItem({ conversation, isSelected, onClick }: ConversationItemProps) {
  const contactName = conversation.contact
    ? `${conversation.contact.first_name} ${conversation.contact.last_name || ""}`.trim()
    : "Desconhecido";

  return (
    <div
      className={cn(
        "p-3 border-b border-border cursor-pointer transition-colors",
        "hover:bg-accent",
        isSelected && "bg-primary/5 border-l-2 border-l-primary",
        !conversation.is_read && "bg-primary/5"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10 mt-0.5">
          <AvatarFallback
            className={cn(
              "text-xs",
              !conversation.is_read ? "bg-primary text-primary-foreground" : "bg-muted"
            )}
          >
            {contactName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className={cn("text-sm", !conversation.is_read && "font-semibold")}>
              {contactName}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTime(conversation.last_message_at)}
            </span>
          </div>
          <p className={cn("text-sm mb-1 truncate", !conversation.is_read ? "text-foreground" : "text-muted-foreground")}>
            {conversation.subject}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {conversation.last_message_preview}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <ChannelBadge channel={conversation.channel} />
            {conversation.priority === "urgent" && (
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                Urgente
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Message Bubble Component
interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isOutbound = message.is_outbound;
  const isInternal = message.is_internal;

  return (
    <div
      className={cn(
        "flex",
        isOutbound ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3",
          isInternal && "bg-amber-500/10 border border-amber-500/30",
          !isInternal && isOutbound && "bg-primary text-primary-foreground",
          !isInternal && !isOutbound && "bg-muted"
        )}
      >
        {/* Sender info for inbound messages */}
        {!isOutbound && !isInternal && (
          <p className="text-xs font-medium mb-1 opacity-70">
            {message.sender_name}
          </p>
        )}

        {/* Internal note indicator */}
        {isInternal && (
          <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 mb-1">
            <AtSign className="h-3 w-3" />
            <span>Nota interna</span>
          </div>
        )}

        {/* Message body */}
        <p className="text-sm whitespace-pre-wrap">{message.body}</p>

        {/* Timestamp */}
        <p
          className={cn(
            "text-[10px] mt-1",
            isOutbound && !isInternal ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {formatTime(message.created_at)}
        </p>
      </div>
    </div>
  );
}

// Message Composer Component
function MessageComposer() {
  const [message, setMessage] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: Enviar mensagem
    console.log("Enviando:", { message, isInternal });
    setMessage("");
  };

  return (
    <div className="p-4 border-t border-border">
      {/* Toggle interno/externo */}
      <div className="flex items-center gap-2 mb-2">
        <Button
          variant={!isInternal ? "default" : "outline"}
          size="sm"
          onClick={() => setIsInternal(false)}
        >
          <Send className="h-3 w-3 mr-1" />
          Responder
        </Button>
        <Button
          variant={isInternal ? "default" : "outline"}
          size="sm"
          onClick={() => setIsInternal(true)}
          className={isInternal ? "bg-amber-500 hover:bg-amber-600" : ""}
        >
          <AtSign className="h-3 w-3 mr-1" />
          Nota Interna
        </Button>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Textarea
          placeholder={isInternal ? "Adicionar nota interna..." : "Digite sua mensagem..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(
            "min-h-[80px] resize-none",
            isInternal && "border-amber-500/50 focus-visible:ring-amber-500/50"
          )}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              handleSend();
            }
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">⌘ + Enter para enviar</span>
          <Button onClick={handleSend} disabled={!message.trim()}>
            <Send className="h-4 w-4 mr-2" />
            {isInternal ? "Adicionar Nota" : "Enviar"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function ChannelBadge({ channel }: { channel: Conversation["channel"] }) {
  const config = {
    email: { icon: Mail, label: "Email", color: "text-blue-500" },
    whatsapp: { icon: MessageSquare, label: "WhatsApp", color: "text-green-500" },
    internal: { icon: AtSign, label: "Interno", color: "text-amber-500" },
    sms: { icon: Phone, label: "SMS", color: "text-purple-500" },
  };

  const { icon: Icon, label, color } = config[channel];

  return (
    <div className={cn("flex items-center gap-1 text-[10px]", color)}>
      <Icon className="h-3 w-3" />
      <span>{label}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: Conversation["status"] }) {
  const config = {
    open: { label: "Aberta", variant: "default" as const },
    resolved: { label: "Resolvida", variant: "secondary" as const },
    on_hold: { label: "Em espera", variant: "outline" as const },
    closed: { label: "Fechada", variant: "secondary" as const },
  };

  return <Badge variant={config[status].variant}>{config[status].label}</Badge>;
}

function PriorityBadge({ priority }: { priority: Conversation["priority"] }) {
  const config = {
    low: { color: "bg-slate-500" },
    medium: { color: "bg-amber-500" },
    high: { color: "bg-orange-500" },
    urgent: { color: "bg-red-500" },
  };

  return <div className={cn("h-2 w-2 rounded-full", config[priority].color)} />;
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = diff / (1000 * 60 * 60);

  if (hours < 1) return "Agora";
  if (hours < 24) return `${Math.floor(hours)}h`;
  if (hours < 48) return "Ontem";
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

// Export para rota de conversa específica
export function InboxConversation() {
  // Esta página seria acessada via /inbox/:id
  // Por enquanto, redireciona para a lista
  return <InboxList />;
}

InboxList.displayName = "InboxList";
InboxConversation.displayName = "InboxConversation";

