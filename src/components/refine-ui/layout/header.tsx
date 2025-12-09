import { AlmaLogo } from "@/components/alma/logo";
import { UserAvatar } from "@/components/refine-ui/layout/user-avatar";
import { ThemeToggle } from "@/components/refine-ui/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  useActiveAuthProvider,
  useGetIdentity,
  useLogout,
} from "@refinedev/core";
import { Bell, LogOut, Search, Settings, User } from "lucide-react";
import type { UserIdentity } from "@/authProvider";
import { Breadcrumb } from "./breadcrumb";

export const Header = () => {
  const { isMobile } = useSidebar();

  return <>{isMobile ? <MobileHeader /> : <DesktopHeader />}</>;
};

function DesktopHeader() {
  return (
    <header
      className={cn(
        "sticky",
        "top-0",
        "flex",
        "h-14",
        "shrink-0",
        "items-center",
        "gap-4",
        "border-b",
        "border-border",
        "bg-background/95",
        "backdrop-blur",
        "supports-[backdrop-filter]:bg-background/60",
        "px-4",
        "justify-between",
        "z-40"
      )}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Breadcrumb />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Search Button - Placeholder para Command Palette */}
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "hidden md:flex",
            "h-9 w-64",
            "justify-start",
            "text-muted-foreground",
            "bg-muted/50"
          )}
        >
          <Search className="h-4 w-4 mr-2" />
          <span className="flex-1 text-left">Buscar...</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Bell className="h-4 w-4" />
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <UserDropdown />
      </div>
    </header>
  );
}

function MobileHeader() {
  const { open, isMobile } = useSidebar();

  return (
    <header
      className={cn(
        "sticky",
        "top-0",
        "flex",
        "h-14",
        "shrink-0",
        "items-center",
        "gap-2",
        "border-b",
        "border-border",
        "bg-background/95",
        "backdrop-blur",
        "px-3",
        "justify-between",
        "z-40"
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger
          className={cn("text-muted-foreground", {
            "opacity-0 pointer-events-none": open,
            "opacity-100 pointer-events-auto": !open || isMobile,
          })}
        />
        
        {/* Logo no mobile */}
        <AlmaLogo size="sm" />
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search className="h-4 w-4" />
        </Button>
        <ThemeToggle className="h-8 w-8" />
      </div>
    </header>
  );
}

const UserDropdown = () => {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { data: user } = useGetIdentity<UserIdentity>();
  const authProvider = useActiveAuthProvider();

  if (!authProvider?.getIdentity) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name || "Usuário"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
            {user?.organizationName && (
              <p className="text-xs leading-none text-primary mt-1">
                {user.organizationName}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Meu Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout()}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Header.displayName = "Header";
MobileHeader.displayName = "MobileHeader";
DesktopHeader.displayName = "DesktopHeader";
