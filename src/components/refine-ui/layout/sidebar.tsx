"use client";

import { AlmaIcon, AlmaLogo } from "@/components/alma/logo";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarFooter as ShadcnSidebarFooter,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarRail as ShadcnSidebarRail,
  SidebarTrigger as ShadcnSidebarTrigger,
  useSidebar as useShadcnSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  useGetIdentity,
  useLink,
  useLogout,
  useMenu,
  type TreeMenuItem,
} from "@refinedev/core";
import {
  Building2,
  ChevronRight,
  ChevronsUpDown,
  Inbox,
  KanbanSquare,
  LayoutDashboard,
  ListIcon,
  LogOut,
  Settings,
  Users,
  CheckSquare,
} from "lucide-react";
import React from "react";
import type { UserIdentity } from "@/authProvider";

// Ícones customizados para cada recurso
const resourceIcons: Record<string, React.ReactNode> = {
  dashboard: <LayoutDashboard className="h-4 w-4" />,
  pipeline: <KanbanSquare className="h-4 w-4" />,
  inbox: <Inbox className="h-4 w-4" />,
  contacts: <Users className="h-4 w-4" />,
  companies: <Building2 className="h-4 w-4" />,
  tasks: <CheckSquare className="h-4 w-4" />,
  settings: <Settings className="h-4 w-4" />,
};

export function Sidebar() {
  const { open } = useShadcnSidebar();
  const { menuItems, selectedKey } = useMenu();

  return (
    <ShadcnSidebar 
      collapsible="icon" 
      className={cn("border-none bg-sidebar")}
    >
      <ShadcnSidebarRail />
      <SidebarHeader />
      <ShadcnSidebarContent
        className={cn(
          "transition-all",
          "duration-200",
          "flex",
          "flex-col",
          "gap-1.5",
          "pt-4",
          "pb-2",
          {
            "px-3": open,
            "px-3": !open, // Mesmo padding quando fechado para centralizar melhor
          }
        )}
      >
        {menuItems.map((item: TreeMenuItem) => (
          <SidebarItem
            key={item.key || item.name}
            item={item}
            selectedKey={selectedKey}
          />
        ))}
      </ShadcnSidebarContent>
      <SidebarFooterSection />
    </ShadcnSidebar>
  );
}

type MenuItemProps = {
  item: TreeMenuItem;
  selectedKey?: string;
};

function SidebarItem({ item, selectedKey }: MenuItemProps) {
  const { open } = useShadcnSidebar();

  if (item.meta?.group) {
    return <SidebarItemGroup item={item} selectedKey={selectedKey} />;
  }

  if (item.children && item.children.length > 0) {
    if (open) {
      return <SidebarItemCollapsible item={item} selectedKey={selectedKey} />;
    }
    return <SidebarItemDropdown item={item} selectedKey={selectedKey} />;
  }

  return <SidebarItemLink item={item} selectedKey={selectedKey} />;
}

function SidebarItemGroup({ item, selectedKey }: MenuItemProps) {
  const { children } = item;
  const { open } = useShadcnSidebar();

  return (
    <div className={cn("pt-4")}>
      <span
        className={cn(
          "ml-3",
          "block",
          "text-[10px]",
          "font-semibold",
          "uppercase",
          "tracking-wider",
          "text-muted-foreground/70",
          "transition-all",
          "duration-200",
          "mb-2",
          {
            "h-auto opacity-100": open,
            "h-0 opacity-0 pointer-events-none": !open,
          }
        )}
      >
        {getDisplayName(item)}
      </span>
      {children && children.length > 0 && (
        <div className={cn("flex", "flex-col", "gap-1")}>
          {children.map((child: TreeMenuItem) => (
            <SidebarItem
              key={child.key || child.name}
              item={child}
              selectedKey={selectedKey}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarItemCollapsible({ item, selectedKey }: MenuItemProps) {
  const { name, children } = item;

  const chevronIcon = (
    <ChevronRight
      className={cn(
        "h-4",
        "w-4",
        "shrink-0",
        "text-muted-foreground",
        "transition-transform",
        "duration-200",
        "group-data-[state=open]:rotate-90"
      )}
    />
  );

  return (
    <Collapsible key={`collapsible-${name}`} className={cn("w-full", "group")}>
      <CollapsibleTrigger asChild>
        <SidebarButton item={item} rightIcon={chevronIcon} />
      </CollapsibleTrigger>
      <CollapsibleContent className={cn("ml-6", "flex", "flex-col", "gap-1", "mt-1")}>
        {children?.map((child: TreeMenuItem) => (
          <SidebarItem
            key={child.key || child.name}
            item={child}
            selectedKey={selectedKey}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function SidebarItemDropdown({ item, selectedKey }: MenuItemProps) {
  const { children } = item;
  const Link = useLink();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarButton item={item} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        {children?.map((child: TreeMenuItem) => {
          const { key: childKey } = child;
          const isSelected = childKey === selectedKey;

          return (
            <DropdownMenuItem key={childKey || child.name} asChild>
              <Link
                to={child.route || ""}
                className={cn("flex w-full items-center gap-2", {
                  "bg-accent text-accent-foreground": isSelected,
                })}
              >
                <ItemIcon
                  icon={child.meta?.icon ?? child.icon}
                  name={child.name}
                  isSelected={isSelected}
                />
                <span>{getDisplayName(child)}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarItemLink({ item, selectedKey }: MenuItemProps) {
  const isSelected = item.key === selectedKey;

  return <SidebarButton item={item} isSelected={isSelected} asLink={true} />;
}

function SidebarHeader() {
  const { open, isMobile } = useShadcnSidebar();

  return (
    <ShadcnSidebarHeader
      className={cn(
        "p-3",
        "h-16",
        "border-b",
        "border-sidebar-border",
        "flex-row",
        "items-center",
        "gap-2"
      )}
    >
      {/* Botão Toggle - SEMPRE visível e primeiro elemento */}
      <ShadcnSidebarTrigger
        className={cn(
          "text-muted-foreground",
          "hover:text-foreground",
          "hover:bg-sidebar-accent",
          "h-10 w-10",
          "rounded-lg",
          "transition-colors",
          "shrink-0"
        )}
      />

      {/* Logo - só aparece quando aberto */}
      {open && (
        <div
          className={cn(
            "flex",
            "flex-row",
            "items-center",
            "justify-start",
            "flex-1",
            "overflow-hidden"
          )}
        >
          <div className={cn("text-foreground")}>
            <AlmaLogo size="md" />
          </div>
        </div>
      )}
    </ShadcnSidebarHeader>
  );
}

function SidebarFooterSection() {
  const { open } = useShadcnSidebar();
  const { data: user } = useGetIdentity<UserIdentity>();
  const { mutate: logout } = useLogout();

  return (
    <ShadcnSidebarFooter className={cn("border-t border-sidebar-border p-3")}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full gap-2 h-12",
              "hover:bg-sidebar-accent",
              "rounded-lg",
              { 
                "px-0 justify-center": !open, 
                "px-3 justify-start": open 
              }
            )}
          >
            {/* Avatar */}
            <div className={cn(
              "h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center",
              "text-primary font-semibold text-sm shrink-0"
            )}>
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            
            {open && (
              <>
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="text-sm font-medium truncate w-full text-left">
                    {user?.name || "Usuário"}
                  </span>
                  <span className="text-xs text-muted-foreground truncate w-full text-left">
                    {user?.organizationName || user?.email}
                  </span>
                </div>
                <ChevronsUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align={open ? "start" : "center"} className="w-56">
          <DropdownMenuItem
            onClick={() => logout()}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ShadcnSidebarFooter>
  );
}

function getDisplayName(item: TreeMenuItem) {
  return item.meta?.label ?? item.label ?? item.name;
}

type IconProps = {
  icon?: React.ReactNode;
  name?: string;
  isSelected?: boolean;
};

function ItemIcon({ icon, name, isSelected }: IconProps) {
  // Usar ícone customizado baseado no nome do recurso
  const customIcon = name ? resourceIcons[name.toLowerCase()] : null;
  const displayIcon = icon ?? customIcon ?? <ListIcon className="h-4 w-4" />;

  return (
    <div
      className={cn("w-4 h-4 flex items-center justify-center", {
        "text-muted-foreground": !isSelected,
        "text-primary-foreground": isSelected,
      })}
    >
      {displayIcon}
    </div>
  );
}

type SidebarButtonProps = React.ComponentProps<typeof Button> & {
  item: TreeMenuItem;
  isSelected?: boolean;
  rightIcon?: React.ReactNode;
  asLink?: boolean;
  onClick?: () => void;
};

function SidebarButton({
  item,
  isSelected = false,
  rightIcon,
  asLink = false,
  className,
  onClick,
  ...props
}: SidebarButtonProps) {
  const Link = useLink();
  const { open } = useShadcnSidebar();

  const buttonContent = (
    <>
      <ItemIcon 
        icon={item.meta?.icon ?? item.icon} 
        name={item.name}
        isSelected={isSelected} 
      />
      <span
        className={cn(
          "tracking-tight",
          "transition-all",
          "duration-200",
          {
            "flex-1 text-left": rightIcon,
            "line-clamp-1 truncate": !rightIcon,
            "font-normal": !isSelected,
            "font-semibold": isSelected,
            "text-primary-foreground": isSelected,
            "text-sidebar-foreground": !isSelected,
            "opacity-100": open,
            "opacity-0 w-0": !open,
          }
        )}
      >
        {getDisplayName(item)}
      </span>
      {rightIcon && open && rightIcon}
    </>
  );

  return (
    <Button
      asChild={!!(asLink && item.route)}
      variant="ghost"
      size="lg"
      className={cn(
        "flex w-full items-center gap-3 py-2 text-sm",
        "transition-all duration-200",
        "rounded-lg",
        "min-h-[44px]", // Altura mínima para melhor toque
        {
          "px-3 justify-start": open,
          "px-0 justify-center": !open, // Centralizar quando fechado
          "bg-primary hover:bg-primary/90": isSelected,
          "text-primary-foreground": isSelected,
          "hover:bg-sidebar-accent": !isSelected,
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {asLink && item.route ? (
        <Link to={item.route} className={cn("flex w-full items-center gap-3", {
          "justify-start": open,
          "justify-center": !open,
        })}>
          {buttonContent}
        </Link>
      ) : (
        buttonContent
      )}
    </Button>
  );
}

Sidebar.displayName = "Sidebar";
