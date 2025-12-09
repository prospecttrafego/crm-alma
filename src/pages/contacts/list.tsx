import { cn } from "@/lib/utils";
import { useList, useNavigation, useDelete } from "@refinedev/core";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Building2,
  Filter,
} from "lucide-react";

// Tipos
interface Contact {
  id: string;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  job_title?: string;
  status: "lead" | "prospect" | "customer" | "inactive";
  source: string;
  tags: string[];
  company?: {
    id: string;
    name: string;
  };
  owner?: {
    id: string;
    full_name: string;
  };
  created_at: string;
}

// Dados mockados
const mockContacts: Contact[] = [
  { id: "1", first_name: "João", last_name: "Silva", email: "joao@techcorp.com", phone: "(11) 99999-1234", job_title: "CEO", status: "customer", source: "referral", tags: ["VIP", "Tech"], company: { id: "c1", name: "TechCorp" }, owner: { id: "u1", full_name: "Você" }, created_at: "2024-01-10" },
  { id: "2", first_name: "Maria", last_name: "Santos", email: "maria@startupxyz.com", phone: "(11) 99999-5678", job_title: "CTO", status: "prospect", source: "form", tags: ["Startup"], company: { id: "c2", name: "StartupXYZ" }, owner: { id: "u1", full_name: "Você" }, created_at: "2024-01-08" },
  { id: "3", first_name: "Carlos", last_name: "Oliveira", email: "carlos@lojaabc.com", phone: "(11) 99999-9012", job_title: "Diretor", status: "lead", source: "email", tags: ["Varejo"], company: { id: "c3", name: "Loja ABC" }, owner: { id: "u1", full_name: "Você" }, created_at: "2024-01-12" },
  { id: "4", first_name: "Ana", last_name: "Costa", email: "ana@fashionstore.com", phone: "(11) 99999-3456", job_title: "Marketing", status: "lead", source: "manual", tags: ["Fashion", "E-commerce"], company: { id: "c4", name: "Fashion Store" }, owner: { id: "u1", full_name: "Você" }, created_at: "2024-01-14" },
  { id: "5", first_name: "Pedro", last_name: "Lima", email: "pedro@consultoria.com", phone: "(11) 99999-7890", job_title: "Consultor", status: "customer", source: "referral", tags: ["Consultoria"], company: { id: "c5", name: "Consultoria Plus" }, owner: { id: "u1", full_name: "Você" }, created_at: "2024-01-05" },
];

export function ContactList() {
  const { create, show, edit } = useNavigation();
  const [contacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      `${contact.first_name} ${contact.last_name} ${contact.email} ${contact.company?.name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Contact["status"]) => {
    const config = {
      lead: { label: "Lead", variant: "secondary" as const },
      prospect: { label: "Prospect", variant: "outline" as const },
      customer: { label: "Cliente", variant: "default" as const },
      inactive: { label: "Inativo", variant: "destructive" as const },
    };
    return <Badge variant={config[status].variant}>{config[status].label}</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contatos</h1>
          <p className="text-muted-foreground">
            Gerencie seus contatos e leads
          </p>
        </div>
        <Button onClick={() => create("contacts")}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Contato
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar contatos..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="lead">Leads</SelectItem>
            <SelectItem value="prospect">Prospects</SelectItem>
            <SelectItem value="customer">Clientes</SelectItem>
            <SelectItem value="inactive">Inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contato</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {contact.first_name.charAt(0)}
                        {contact.last_name?.charAt(0) || ""}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {contact.first_name} {contact.last_name}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {contact.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {contact.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {contact.company && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{contact.company.name}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(contact.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {contact.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {contact.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{contact.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {contact.owner?.full_name}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => show("contacts", contact.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => edit("contacts", contact.id)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum contato encontrado</p>
          <Button variant="link" onClick={() => create("contacts")}>
            Criar primeiro contato
          </Button>
        </div>
      )}
    </div>
  );
}

ContactList.displayName = "ContactList";

