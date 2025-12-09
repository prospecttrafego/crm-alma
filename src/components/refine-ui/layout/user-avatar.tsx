import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGetIdentity } from "@refinedev/core";
import type { UserIdentity } from "@/authProvider";

interface UserAvatarProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function UserAvatar({ className, size = "md" }: UserAvatarProps) {
  const { data: user, isLoading: userIsLoading } = useGetIdentity<UserIdentity>();

  if (userIsLoading || !user) {
    return <Skeleton className={cn(sizeClasses[size], "rounded-full", className)} />;
  }

  const { name, avatar } = user;

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {avatar && <AvatarImage src={avatar} alt={name} />}
      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}

const getInitials = (name = "") => {
  const names = name.trim().split(" ");
  let initials = names[0]?.substring(0, 1)?.toUpperCase() || "U";

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

UserAvatar.displayName = "UserAvatar";
