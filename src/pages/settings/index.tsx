import { cn } from "@/lib/utils";
import { useGetIdentity } from "@refinedev/core";
import type { UserIdentity } from "@/authProvider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Building2,
  KanbanSquare,
  Bell,
  Shield,
  Save,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";

export function Settings() {
  const { data: user } = useGetIdentity<UserIdentity>();
  const [isSaving, setIsSaving] = useState(false);

  // Mock pipeline stages
  const [stages, setStages] = useState([
    { id: "1", name: "Novo Lead", color: "#94a3b8", probability: 10 },
    { id: "2", name: "Qualificação", color: "#f59e0b", probability: 25 },
    { id: "3", name: "Proposta", color: "#605be5", probability: 50 },
    { id: "4", name: "Negociação", color: "#8b5cf6", probability: 75 },
    { id: "5", name: "Fechamento", color: "#06b6d4", probability: 90 },
  ]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e configurações</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="organization" className="gap-2">
            <Building2 className="h-4 w-4" />
            Organização
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="gap-2">
            <KanbanSquare className="h-4 w-4" />
            Pipeline
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize suas informações de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Alterar foto
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG ou GIF. Máximo 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo</Label>
                  <Input id="role" placeholder="Seu cargo" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Gerencie sua senha e segurança</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Senha Atual</Label>
                  <Input id="current_password" type="password" />
                </div>
                <div></div>
                <div className="space-y-2">
                  <Label htmlFor="new_password">Nova Senha</Label>
                  <Input id="new_password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirmar Nova Senha</Label>
                  <Input id="confirm_password" type="password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline">Alterar Senha</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organization Tab */}
        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Organização</CardTitle>
              <CardDescription>Informações da sua empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    A
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Alterar logo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="org_name">Nome da Organização</Label>
                  <Input id="org_name" defaultValue={user?.organizationName || "Minha Organização"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org_slug">Slug</Label>
                  <Input id="org_slug" defaultValue={user?.organizationSlug} disabled />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipe</CardTitle>
              <CardDescription>Gerencie os membros da sua organização</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: user?.name || "Você", email: user?.email, role: "admin" },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="text-sm">
                          {member.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <Badge variant={member.role === "admin" ? "default" : "secondary"}>
                      {member.role === "admin" ? "Admin" : "Membro"}
                    </Badge>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Convidar Membro
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pipeline Tab */}
        <TabsContent value="pipeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Etapas do Pipeline</CardTitle>
              <CardDescription>Configure as etapas do seu funil de vendas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stages.map((stage, index) => (
                <div
                  key={stage.id}
                  className="flex items-center gap-4 p-3 border rounded-lg"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <Input
                    value={stage.name}
                    onChange={(e) => {
                      const newStages = [...stages];
                      newStages[index].name = e.target.value;
                      setStages(newStages);
                    }}
                    className="flex-1"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Prob:</span>
                    <Input
                      type="number"
                      value={stage.probability}
                      onChange={(e) => {
                        const newStages = [...stages];
                        newStages[index].probability = parseInt(e.target.value);
                        setStages(newStages);
                      }}
                      className="w-20"
                      min={0}
                      max={100}
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                  <Input
                    type="color"
                    value={stage.color}
                    onChange={(e) => {
                      const newStages = [...stages];
                      newStages[index].color = e.target.value;
                      setStages(newStages);
                    }}
                    className="w-12 h-9 p-1 cursor-pointer"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setStages(stages.filter((s) => s.id !== stage.id))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={() =>
                  setStages([
                    ...stages,
                    {
                      id: `new-${Date.now()}`,
                      name: "Nova Etapa",
                      color: "#605be5",
                      probability: 50,
                    },
                  ])
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Etapa
              </Button>

              <Separator />

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Salvando..." : "Salvar Pipeline"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Configure como você deseja receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { label: "Novos deals atribuídos", description: "Quando um deal for atribuído a você" },
                  { label: "Mensagens no inbox", description: "Quando receber novas mensagens" },
                  { label: "Tarefas vencidas", description: "Lembretes de tarefas que vencem hoje" },
                  { label: "Deals movidos", description: "Quando deals mudarem de etapa" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="email">Apenas email</SelectItem>
                        <SelectItem value="push">Apenas push</SelectItem>
                        <SelectItem value="none">Nenhuma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Salvando..." : "Salvar Preferências"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

Settings.displayName = "Settings";

