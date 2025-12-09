import { useState } from "react";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlmaLogo } from "@/components/alma/logo";
import {
  Building2,
  Users,
  KanbanSquare,
  Mail,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Rocket,
  Target,
  MessageSquare,
} from "lucide-react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Bem-vindo ao CRM Alma",
    description: "Vamos configurar seu CRM em poucos minutos",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    id: "organization",
    title: "Sua Organização",
    description: "Configure os dados da sua empresa",
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    id: "pipeline",
    title: "Pipeline de Vendas",
    description: "Personalize as etapas do seu funil",
    icon: <KanbanSquare className="h-6 w-6" />,
  },
  {
    id: "import",
    title: "Importar Dados",
    description: "Traga seus contatos existentes",
    icon: <Users className="h-6 w-6" />,
  },
  {
    id: "complete",
    title: "Tudo Pronto!",
    description: "Seu CRM está configurado",
    icon: <Rocket className="h-6 w-6" />,
  },
];

export function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    organizationName: "",
    industry: "",
    teamSize: "",
    pipelineStages: ["Novo Lead", "Qualificação", "Proposta", "Negociação", "Fechamento"],
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    // TODO: Salvar dados no Supabase
    navigate("/dashboard");
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case "welcome":
        return <WelcomeStep onNext={nextStep} />;
      case "organization":
        return (
          <OrganizationStep
            data={formData}
            onChange={(data) => setFormData({ ...formData, ...data })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case "pipeline":
        return (
          <PipelineStep
            stages={formData.pipelineStages}
            onChange={(stages) => setFormData({ ...formData, pipelineStages: stages })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case "import":
        return <ImportStep onNext={nextStep} onBack={prevStep} />;
      case "complete":
        return <CompleteStep onComplete={completeOnboarding} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <AlmaLogo size="md" />
      </header>

      {/* Progress */}
      <div className="px-6 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Passo {currentStep + 1} de {steps.length}
          </span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />

        {/* Step indicators */}
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center gap-1",
                index <= currentStep ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  index < currentStep && "bg-primary text-primary-foreground",
                  index === currentStep && "bg-primary/20 text-primary border-2 border-primary",
                  index > currentStep && "bg-muted text-muted-foreground"
                )}
              >
                {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span className="text-xs hidden sm:block">{step.title.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {renderStepContent()}
        </div>
      </main>
    </div>
  );
}

// Step Components
function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-3xl">Bem-vindo ao CRM Alma! 🎉</CardTitle>
        <CardDescription className="text-base mt-2">
          Estamos felizes em ter você aqui. Vamos configurar seu CRM para que você possa começar a gerenciar seus clientes de forma eficiente.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Target, title: "Pipeline Visual", desc: "Acompanhe seus deals" },
            { icon: MessageSquare, title: "Inbox Unificado", desc: "Todas as conversas" },
            { icon: Users, title: "Gestão de Contatos", desc: "Organize seus clientes" },
          ].map((feature, i) => (
            <div key={i} className="text-center p-4 rounded-lg bg-muted/50">
              <feature.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium text-sm">{feature.title}</h4>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        <Button onClick={onNext} size="lg" className="w-full h-12 text-base">
          Começar Configuração
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
}

interface OrganizationStepProps {
  data: { organizationName: string; industry: string; teamSize: string };
  onChange: (data: Partial<OrganizationStepProps["data"]>) => void;
  onNext: () => void;
  onBack: () => void;
}

function OrganizationStep({ data, onChange, onNext, onBack }: OrganizationStepProps) {
  return (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Sobre sua Organização</CardTitle>
            <CardDescription>Conte-nos um pouco sobre sua empresa</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="orgName">Nome da Organização</Label>
          <Input
            id="orgName"
            placeholder="Ex: Agência Alma"
            value={data.organizationName}
            onChange={(e) => onChange({ organizationName: e.target.value })}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label>Setor de Atuação</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {["Tecnologia", "Marketing", "Consultoria", "E-commerce", "Serviços", "Outro"].map((industry) => (
              <Button
                key={industry}
                type="button"
                variant={data.industry === industry ? "default" : "outline"}
                className="h-10"
                onClick={() => onChange({ industry })}
              >
                {industry}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tamanho da Equipe</Label>
          <div className="grid grid-cols-4 gap-2">
            {["1-5", "6-20", "21-50", "50+"].map((size) => (
              <Button
                key={size}
                type="button"
                variant={data.teamSize === size ? "default" : "outline"}
                className="h-10"
                onClick={() => onChange({ teamSize: size })}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button onClick={onNext} className="flex-1">
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface PipelineStepProps {
  stages: string[];
  onChange: (stages: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

function PipelineStep({ stages, onChange, onNext, onBack }: PipelineStepProps) {
  const defaultStages = ["Novo Lead", "Qualificação", "Proposta", "Negociação", "Fechamento"];

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <KanbanSquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Pipeline de Vendas</CardTitle>
            <CardDescription>Defina as etapas do seu funil de vendas</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Etapas do Pipeline</Label>
          <p className="text-sm text-muted-foreground">
            Você pode personalizar as etapas depois nas configurações
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {stages.map((stage, i) => (
              <Badge key={i} variant="secondary" className="text-sm py-1.5 px-3">
                {i + 1}. {stage}
              </Badge>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
          <p className="text-sm font-medium">Templates prontos:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange(defaultStages)}
            >
              Vendas B2B
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange(["Contato", "Briefing", "Proposta", "Aprovação", "Produção"])}
            >
              Agência
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange(["Lead", "Demo", "Trial", "Negociação", "Fechado"])}
            >
              SaaS
            </Button>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button onClick={onNext} className="flex-1">
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ImportStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Importar Contatos</CardTitle>
            <CardDescription>Traga seus contatos existentes (opcional)</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-green-500/10 mx-auto mb-3 flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.5 3h-15A2.5 2.5 0 002 5.5v13A2.5 2.5 0 004.5 21h15a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0019.5 3zm-9.5 15H6v-2h4v2zm0-4H6v-2h4v2zm0-4H6V8h4v2zm8 8h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-6V8h6v2z"/>
                </svg>
              </div>
              <h4 className="font-medium">Planilha Excel/CSV</h4>
              <p className="text-xs text-muted-foreground mt-1">Importe de uma planilha</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-red-500/10 mx-auto mb-3 flex items-center justify-center">
                <Mail className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="font-medium">Google Contacts</h4>
              <p className="text-xs text-muted-foreground mt-1">Sincronize com Google</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center py-4">
          <Button variant="link" onClick={onNext}>
            Pular esta etapa →
          </Button>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button onClick={onNext} className="flex-1">
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CompleteStep({ onComplete }: { onComplete: () => void }) {
  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
          <Check className="h-10 w-10 text-green-500" />
        </div>
        <CardTitle className="text-3xl">Tudo Pronto! 🚀</CardTitle>
        <CardDescription className="text-base mt-2">
          Seu CRM está configurado e pronto para uso. Comece a adicionar seus primeiros contatos e deals.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-muted/50 space-y-3">
          <h4 className="font-medium">Próximos passos sugeridos:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">1</span>
              </div>
              Adicione seu primeiro contato
            </li>
            <li className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">2</span>
              </div>
              Crie seu primeiro deal no pipeline
            </li>
            <li className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">3</span>
              </div>
              Convide membros da sua equipe
            </li>
          </ul>
        </div>

        <Button onClick={onComplete} size="lg" className="w-full h-12 text-base">
          <Rocket className="mr-2 h-5 w-5" />
          Ir para o Dashboard
        </Button>
      </CardContent>
    </Card>
  );
}

Onboarding.displayName = "Onboarding";

