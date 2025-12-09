import { useNavigation, useGo } from "@refinedev/core";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  Save, 
  Building2, 
  Globe, 
  Users, 
  MapPin,
  Phone,
  Mail,
  Briefcase,
  MessageSquare,
  Linkedin,
  Instagram
} from "lucide-react";

export function CompanyCreate() {
  const { list } = useNavigation();
  const go = useGo();
  const goBack = () => go({ to: "..", type: "path" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      list("companies");
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={goBack} className="shrink-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nova Empresa</h1>
          <p className="text-muted-foreground">Adicione uma nova empresa ao CRM</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              Informações da Empresa
            </CardTitle>
            <CardDescription>Dados principais da empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-1">
                Nome da Empresa <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="name" 
                required 
                placeholder="Nome da empresa" 
                className="h-11"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="domain" className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  Domínio
                </Label>
                <Input 
                  id="domain" 
                  placeholder="empresa.com" 
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  Website
                </Label>
                <Input 
                  id="website" 
                  placeholder="https://empresa.com" 
                  className="h-11"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Classificação */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              Classificação
            </CardTitle>
            <CardDescription>Setor e porte da empresa</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Indústria</Label>
              <Select>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Tecnologia</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="retail">Varejo</SelectItem>
                  <SelectItem value="services">Serviços</SelectItem>
                  <SelectItem value="finance">Financeiro</SelectItem>
                  <SelectItem value="health">Saúde</SelectItem>
                  <SelectItem value="education">Educação</SelectItem>
                  <SelectItem value="manufacturing">Indústria</SelectItem>
                  <SelectItem value="consulting">Consultoria</SelectItem>
                  <SelectItem value="marketing">Marketing/Publicidade</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size" className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                Tamanho
              </Label>
              <Select>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Número de funcionários" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 funcionários</SelectItem>
                  <SelectItem value="11-50">11-50 funcionários</SelectItem>
                  <SelectItem value="51-200">51-200 funcionários</SelectItem>
                  <SelectItem value="201-500">201-500 funcionários</SelectItem>
                  <SelectItem value="501-1000">501-1000 funcionários</SelectItem>
                  <SelectItem value="1000+">1000+ funcionários</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Informações de Contato
            </CardTitle>
            <CardDescription>Dados de contato da empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  Telefone
                </Label>
                <Input 
                  id="phone" 
                  placeholder="(11) 3333-3333" 
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="contato@empresa.com" 
                  className="h-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                Endereço
              </Label>
              <Input 
                id="address" 
                placeholder="Rua, número, bairro, cidade - estado" 
                className="h-11"
              />
            </div>
          </CardContent>
        </Card>

        {/* Redes Sociais */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-primary" />
              Redes Sociais
            </CardTitle>
            <CardDescription>Perfis nas redes sociais</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="h-3.5 w-3.5 text-muted-foreground" />
                LinkedIn
              </Label>
              <Input 
                id="linkedin" 
                placeholder="linkedin.com/company/empresa" 
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="h-3.5 w-3.5 text-muted-foreground" />
                Instagram
              </Label>
              <Input 
                id="instagram" 
                placeholder="@empresa" 
                className="h-11"
              />
            </div>
          </CardContent>
        </Card>

        {/* Observações */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Observações
            </CardTitle>
            <CardDescription>Notas internas sobre a empresa</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              id="description" 
              placeholder="Adicione observações sobre a empresa..." 
              className="min-h-[120px] resize-none"
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={goBack} className="min-w-[100px]">
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? "Salvando..." : "Salvar Empresa"}
          </Button>
        </div>
      </form>
    </div>
  );
}

CompanyCreate.displayName = "CompanyCreate";
