import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-6",
  md: "h-8",
  lg: "h-10",
  xl: "h-14",
};

/**
 * Logo completo da Alma (Alma.)
 * Baseado na identidade visual da marca
 */
export function AlmaLogo({ className, showText = true, size = "md" }: LogoProps) {
  if (!showText) {
    return <AlmaIcon className={className} size={size} />;
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <svg
        viewBox="0 0 180 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(sizeClasses[size], "w-auto")}
      >
        {/* Letra A estilizada com diamante interno */}
        <g className="alma-letter-a">
          <path
            d="M0 48L14 4H22L8 48H0Z"
            fill="currentColor"
          />
          <path
            d="M22 4L36 48H28L14 4H22Z"
            fill="currentColor"
          />
          {/* Diamante interno do A */}
          <path
            d="M18 14L11 34H25L18 14Z"
            fill="currentColor"
            fillOpacity="0.15"
          />
        </g>

        {/* Letra L */}
        <path
          d="M40 4H48V40H62V48H40V4Z"
          fill="currentColor"
        />

        {/* Letra M */}
        <path
          d="M68 48V4H76L88 32L100 4H108V48H100V16L88 44L76 16V48H68Z"
          fill="currentColor"
        />

        {/* Letra A final */}
        <g className="alma-letter-a-final">
          <path
            d="M114 48L128 4H136L150 48H142L138 36H126L122 48H114Z"
            fill="currentColor"
          />
          {/* Espaço interno do A */}
          <path
            d="M128 28H136L132 14L128 28Z"
            fill="currentColor"
            className="dark:fill-[#0a0a0a] fill-white"
          />
        </g>

        {/* Ponto estilizado */}
        <g className="alma-dot">
          <circle cx="164" cy="40" r="8" fill="currentColor" />
          {/* Brilho no ponto */}
          <circle cx="167" cy="37" r="2.5" fill="currentColor" fillOpacity="0.3" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Ícone da Alma (apenas o A estilizado)
 * Para uso em favicon, sidebar colapsada, etc.
 */
export function AlmaIcon({ className, size = "md" }: Omit<LogoProps, "showText">) {
  return (
    <svg
      viewBox="0 0 36 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], "w-auto", className)}
    >
      {/* Letra A estilizada */}
      <path
        d="M0 48L14 4H22L8 48H0Z"
        fill="currentColor"
      />
      <path
        d="M22 4L36 48H28L14 4H22Z"
        fill="currentColor"
      />
      {/* Diamante interno */}
      <path
        d="M18 14L11 34H25L18 14Z"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  );
}

/**
 * Logo com tagline "Agência Digital"
 */
export function AlmaLogoFull({ className, size = "lg" }: Omit<LogoProps, "showText">) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <AlmaLogo size={size} />
      <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase font-medium">
        Agência Digital
      </span>
    </div>
  );
}

AlmaLogo.displayName = "AlmaLogo";
AlmaIcon.displayName = "AlmaIcon";
AlmaLogoFull.displayName = "AlmaLogoFull";

