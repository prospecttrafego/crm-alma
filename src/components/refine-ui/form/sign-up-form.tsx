"use client";

import { useState } from "react";

import { InputPassword } from "@/components/refine-ui/form/input-password";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  useLink,
  useNotification,
  useRegister,
} from "@refinedev/core";
import { AlmaLogo } from "@/components/alma/logo";
import { Building2, Mail, User, Lock, ArrowRight } from "lucide-react";

export const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { open } = useNotification();

  const Link = useLink();

  const { mutate: register } = useRegister();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      open?.({
        type: "error",
        message: "As senhas não coincidem",
        description:
          "Por favor, verifique se ambos os campos de senha contêm o mesmo valor.",
      });
      return;
    }

    if (password.length < 6) {
      open?.({
        type: "error",
        message: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
      });
      return;
    }

    setIsLoading(true);
    register({
      email,
      password,
      // Dados extras para criar perfil e organização
      options: {
        data: {
          name,
          organizationName,
        }
      }
    }, {
      onSettled: () => setIsLoading(false),
    });
  };

  const handleSignUpWithGoogle = () => {
    register({
      providerName: "google",
    });
  };

  return (
    <div
      className={cn(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "px-6",
        "py-8",
        "min-h-svh",
        "bg-gradient-to-br from-background via-background to-primary/5"
      )}
    >
      {/* Logo */}
      <div className={cn("mb-8")}>
        <AlmaLogo size="lg" />
      </div>

      <Card className={cn("w-full max-w-[480px]", "p-8", "shadow-xl", "border-border/50")}>
        <CardHeader className={cn("px-0 pt-0")}>
          <CardTitle
            className={cn(
              "text-primary",
              "text-2xl",
              "font-bold"
            )}
          >
            Criar conta
          </CardTitle>
          <CardDescription
            className={cn("text-muted-foreground")}
          >
            Comece a usar o CRM Alma para gerenciar seus clientes
          </CardDescription>
        </CardHeader>

        <CardContent className={cn("px-0")}>
          <form onSubmit={handleSignUp}>
            {/* Nome */}
            <div className={cn("flex", "flex-col", "gap-2")}>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Nome completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
              />
            </div>

            {/* Email */}
            <div className={cn("flex", "flex-col", "gap-2", "mt-4")}>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>

            {/* Organização */}
            <div className={cn("flex", "flex-col", "gap-2", "mt-4")}>
              <Label htmlFor="organization" className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Nome da organização
              </Label>
              <Input
                id="organization"
                type="text"
                placeholder="Nome da sua empresa ou agência"
                required
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                Você poderá convidar membros da equipe depois
              </p>
            </div>

            <Separator className="my-6" />

            {/* Senha */}
            <div
              className={cn("flex", "flex-col", "gap-2")}
            >
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                Senha
              </Label>
              <InputPassword
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Mínimo 6 caracteres"
                className="h-11"
              />
            </div>

            {/* Confirmar Senha */}
            <div
              className={cn("flex", "flex-col", "gap-2", "mt-4")}
            >
              <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                Confirmar senha
              </Label>
              <InputPassword
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Repita a senha"
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className={cn(
                "w-full",
                "mt-6",
                "h-12",
                "text-base",
                "font-semibold",
                "gap-2"
              )}
            >
              {isLoading ? (
                "Criando conta..."
              ) : (
                <>
                  Criar conta
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <div className={cn("flex", "items-center", "gap-4", "mt-6")}>
              <Separator className={cn("flex-1")} />
              <span className={cn("text-sm", "text-muted-foreground")}>ou</span>
              <Separator className={cn("flex-1")} />
            </div>

            <div className={cn("mt-6")}>
              <Button
                variant="outline"
                className={cn("w-full", "h-11", "gap-2")}
                onClick={handleSignUpWithGoogle}
                type="button"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.8375 8.63637C16.1151 8.63503 13.3926 8.6357 10.6702 8.63601C10.6705 9.76521 10.6688 10.8944 10.6708 12.0233C12.2475 12.0229 13.8242 12.0226 15.4005 12.0233C15.2178 13.1053 14.5747 14.0949 13.6628 14.704C13.0895 15.0895 12.4309 15.3397 11.7519 15.4586C11.0685 15.5752 10.3623 15.5902 9.68064 15.4522C8.9874 15.3138 8.32566 15.025 7.74838 14.6179C6.82531 13.9694 6.12086 13.0205 5.75916 11.9527C5.38931 10.8666 5.38659 9.65804 5.76085 8.57294C6.02053 7.80816 6.45275 7.10169 7.02054 6.52677C7.7209 5.80979 8.63145 5.29725 9.61248 5.08707C10.4525 4.90775 11.3383 4.94197 12.1607 5.19078C12.8597 5.40301 13.5041 5.78605 14.032 6.29013C14.5655 5.75959 15.0964 5.22602 15.629 4.6945C15.9083 4.4084 16.2019 4.13482 16.4724 3.84092C15.6636 3.09241 14.7154 2.49071 13.6794 2.11035C11.8143 1.42392 9.7108 1.40935 7.83312 2.05923C5.71711 2.78366 3.91535 4.36606 2.91636 6.36616C2.56856 7.05534 2.31463 7.79094 2.16209 8.54757C1.77834 10.4327 2.04582 12.4426 2.91533 14.1596C3.48044 15.2803 4.29063 16.2766 5.27339 17.0577C6.20055 17.797 7.28124 18.3431 8.42705 18.6479C9.87286 19.0357 11.4119 19.0269 12.8672 18.6957C14.1825 18.393 15.4269 17.7645 16.4205 16.8472C17.4707 15.882 18.2199 14.6105 18.6165 13.244C19.0491 11.7534 19.1088 10.1622 18.8375 8.63637Z"
                    fill="currentColor"
                  />
                </svg>
                Continuar com Google
              </Button>
            </div>
          </form>
        </CardContent>

        <Separator className="my-4" />

        <CardFooter className="px-0 pb-0">
          <div className={cn("w-full", "text-center text-sm")}>
            <span className={cn("text-muted-foreground")}>
              Já tem uma conta?{" "}
            </span>
            <Link
              to="/login"
              className={cn(
                "text-primary",
                "font-semibold",
                "hover:underline"
              )}
            >
              Fazer login
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Termos */}
      <p className="text-xs text-muted-foreground text-center mt-6 max-w-md">
        Ao criar uma conta, você concorda com nossos{" "}
        <a href="#" className="underline hover:text-foreground">Termos de Serviço</a>
        {" "}e{" "}
        <a href="#" className="underline hover:text-foreground">Política de Privacidade</a>
      </p>
    </div>
  );
};

SignUpForm.displayName = "SignUpForm";
