import { useNavigation } from "@refinedev/core";
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
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Globe,
  Users,
} from "lucide-react";
import { TableSkeleton } from "@/components/alma/skeletons";
import { EmptyState } from "@/components/alma/empty-state";

interface Company {
  id: string;
  name: string;
  domain?: string;
  website?: string;
  industry?: string;
  size?: string;
  contacts_count: number;
  deals_count: number;
  total_value: number;
  created_at: string;
}

const mockCompanies: Company[] = [
  { id: "c1", name: "TechCorp", domain: "techcorp.com", website: "https://techcorp.com", industry: "Tecnologia", size: "51-200", contacts_count: 5, deals_count: 2, total_value: 60000, created_at: "2024-01-05" },
  { id: "c2", name: "StartupXYZ", domain: "startupxyz.com", website: "https://startupxyz.com", industry: "SaaS", size: "11-50", contacts_count: 3, deals_count: 1, total_value: 45000, created_at: "2024-01-08" },
  { id: "c3", name: "Loja ABC", domain: "lojaabc.com.br", website: "https://lojaabc.com.br", industry: "Varejo", size: "201-500", contacts_count: 2, deals_count: 1, total_value: 8500, created_at: "2024-01-10" },
  { id: "c4", name: "Fashion Store", domain: "fashionstore.com", website: "https://fashionstore.com", industry: "E-commerce", size: "51-200", contacts_count: 4, deals_count: 1, total_value: 65000, created_at: "2024-01-12" },
];

export function CompanyList() {
  const { create, show, edit } = useNavigation();
  const [companies] = useState<Company[]>(mockCompanies);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = companies.filter((company) =>
    `${company.name} ${company.industry} ${company.domain}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Empresas</h1>
          <p className="text-muted-foreground">Gerencie as empresas do CRM</p>
        </div>
        <Button onClick={() => create("companies")}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Empresa
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar empresas..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      {filteredCompanies.length > 0 ? (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Indústria</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Contatos</TableHead>
                <TableHead>Deals</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {company.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        {company.website && (
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                          >
                            <Globe className="h-3 w-3" />
                            {company.domain}
                          </a>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{company.industry || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{company.size || "-"}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {company.contacts_count}
                    </div>
                  </TableCell>
                  <TableCell>{company.deals_count}</TableCell>
                  <TableCell className="font-medium text-primary">
                    R$ {company.total_value.toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => show("companies", company.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => edit("companies", company.id)}>
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
      ) : (
        <EmptyState
          variant={searchQuery ? "search" : "companies"}
          title={searchQuery ? "Nenhuma empresa encontrada" : undefined}
          description={searchQuery ? "Tente buscar por outros termos." : undefined}
          actionLabel={searchQuery ? "Limpar Busca" : "Adicionar Empresa"}
          onAction={() => {
            if (searchQuery) {
              setSearchQuery("");
            } else {
              create("companies");
            }
          }}
        />
      )}
    </div>
  );
}

CompanyList.displayName = "CompanyList";

