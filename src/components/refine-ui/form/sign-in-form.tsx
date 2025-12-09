"use client";

import { useState } from "react";
import { CircleHelp, Loader2 } from "lucide-react";

import { AlmaLogoFull } from "@/components/alma/logo";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useLink, useLogin } from "@refinedev/core";

export const SignInForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Link = useLink();
  const { mutate: login, isPending } = useLogin();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };

  const handleSignInWithGoogle = () => {
    login({
      providerName: "google",
    });
  };

  return (
    <div
      className={cn(
        "min-h-svh",
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "px-6",
        "py-8",
        "bg-background",
        // Background pattern sutil
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
        "from-primary/5",
        "via-background",
        "to-background"
      )}
    >
      {/* Logo Alma */}
      <div className={cn("mb-8")}>
        <AlmaLogoFull size="xl" />
      </div>

      <Card className={cn("w-full", "max-w-md", "border-border/50")}>
        <CardHeader className={cn("text-center", "pb-2")}>
          <CardTitle className={cn("text-2xl", "font-bold")}>
            Bem-vindo de volta
          </CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar o CRM
          </CardDescription>
        </CardHeader>

        <CardContent className={cn("pt-4")}>
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email */}
            <div className={cn("space-y-2")}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="h-11"
              />
            </div>

            {/* Senha */}
            <div className={cn("space-y-2")}>
              <Label htmlFor="password">Senha</Label>
              <InputPassword
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="h-11"
              />
            </div>

            {/* Remember & Forgot */}
            <div className={cn("flex items-center justify-between", "py-1")}>
              <div className={cn("flex items-center", "space-x-2")}>
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked === "indeterminate" ? false : checked)
                  }
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer">
                  Lembrar de mim
                </Label>
              </div>
              <Link
                to="/forgot-password"
                className={cn(
                  "text-sm",
                  "flex",
                  "items-center",
                  "gap-1.5",
                  "text-primary",
                  "hover:text-primary/80",
                  "transition-colors"
                )}
              >
                <span>Esqueci a senha</span>
                <CircleHelp className={cn("w-3.5", "h-3.5")} />
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className={cn("w-full", "h-11", "font-semibold")}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>

            {/* Divider */}
            <div className={cn("flex", "items-center", "gap-4", "py-2")}>
              <Separator className={cn("flex-1")} />
              <span className={cn("text-xs", "text-muted-foreground", "uppercase")}>
                ou continue com
              </span>
              <Separator className={cn("flex-1")} />
            </div>

            {/* Social Login */}
            <div className={cn("grid grid-cols-1", "gap-3")}>
              <Button
                variant="outline"
                className={cn("h-11")}
                onClick={handleSignInWithGoogle}
                type="button"
              >
                <svg
                  className="mr-2 h-4 w-4"
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

        <Separator />

        <CardFooter className={cn("justify-center", "pt-6")}>
          <p className={cn("text-sm", "text-muted-foreground")}>
            Não tem uma conta?{" "}
            <Link
              to="/register"
              className={cn(
                "text-primary",
                "font-semibold",
                "hover:underline"
              )}
            >
              Criar conta
            </Link>
          </p>
        </CardFooter>
      </Card>

      {/* Footer */}
      <p className={cn("mt-8", "text-xs", "text-muted-foreground/60")}>
        © {new Date().getFullYear()} Alma Agência Digital. Todos os direitos reservados.
      </p>
    </div>
  );
};

SignInForm.displayName = "SignInForm";
