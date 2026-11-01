import { cn } from "@/lib/utils";

/**
 * Recreación vectorial del logo de SPC Gráfica Industrial:
 * cilindro metálico con "abc" + tipografía corporativa azul.
 * `variant="light"` para fondos oscuros (texto blanco).
 */
export function SpcLogo({
  className,
  variant = "dark",
  showTagline = true,
}: {
  className?: string;
  variant?: "dark" | "light";
  showTagline?: boolean;
}) {
  const textFill = variant === "light" ? "#FFFFFF" : "#27519B";
  const taglineFill = variant === "light" ? "rgba(233,238,251,0.85)" : "#27519B";

  return (
    <svg
      viewBox="0 0 260 96"
      role="img"
      aria-label="SPC Gráfica Industrial"
      className={cn("h-10 w-auto select-none", className)}
    >
      <defs>
        {/* Metal del cilindro: banda clara arriba, gris medio, borde inferior oscuro */}
        <linearGradient id="spcMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafd" />
          <stop offset="22%" stopColor="#ccd5e4" />
          <stop offset="42%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#9fabc2" />
          <stop offset="82%" stopColor="#dbe2ee" />
          <stop offset="100%" stopColor="#8794ad" />
        </linearGradient>
        <linearGradient id="spcMetalEnd" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8794ad" />
          <stop offset="35%" stopColor="#c7d0de" />
          <stop offset="65%" stopColor="#a5b1c7" />
          <stop offset="100%" stopColor="#77839c" />
        </linearGradient>
        <linearGradient id="spcShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Tagline */}
      {showTagline && (
        <text
          x="6"
          y="13"
          fill={taglineFill}
          fontFamily="var(--font-inter), sans-serif"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="2.6"
        >
          GRÁFICA INDUSTRIAL
        </text>
      )}

      {/* Cilindro metálico */}
      <g>
        <rect
          x="6"
          y="24"
          width="222"
          height="24"
          rx="12"
          fill="url(#spcMetal)"
          stroke="rgba(12,21,38,0.18)"
          strokeWidth="0.7"
        />
        {/* extremos redondeados */}
        <ellipse cx="18" cy="36" rx="12" ry="12" fill="url(#spcMetalEnd)" />
        <ellipse cx="216" cy="36" rx="12" ry="12" fill="url(#spcMetalEnd)" />
        {/* reflejo superior */}
        <rect x="24" y="26.5" width="186" height="7" rx="3.5" fill="url(#spcShine)" opacity="0.85" />
        {/* abc sobre el metal */}
        <text
          x="117"
          y="41.5"
          textAnchor="middle"
          fill="rgba(12,21,38,0.42)"
          fontFamily="var(--font-inter), sans-serif"
          fontSize="13"
          fontWeight="800"
          letterSpacing="1"
        >
          abc
        </text>
      </g>

      {/* SPC */}
      <text
        x="6"
        y="80"
        fill={textFill}
        fontFamily="var(--font-inter), sans-serif"
        fontSize="46"
        fontWeight="800"
        letterSpacing="2"
      >
        SPC
      </text>
      {/* reflejo del cilindro en la base */}
      <rect x="96" y="52" width="132" height="2.4" rx="1.2" fill={textFill} opacity="0.16" />
    </svg>
  );
}

/** Marca compacta solo con las iniciales — para favicon / avatar de chat */
export function SpcMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="SPC" className={cn("h-8 w-8", className)}>
      <defs>
        <linearGradient id="markMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafd" />
          <stop offset="40%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#9fabc2" />
          <stop offset="100%" stopColor="#dbe2ee" />
        </linearGradient>
        <linearGradient id="markBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3f6cc0" />
          <stop offset="55%" stopColor="#27519b" />
          <stop offset="100%" stopColor="#11095b" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#markBg)" />
      <rect x="10" y="14" width="44" height="13" rx="6.5" fill="url(#markMetal)" />
      <rect x="14" y="16" width="36" height="3.5" rx="1.75" fill="#ffffff" opacity="0.8" />
      <text
        x="32"
        y="47"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="var(--font-inter), sans-serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="1.5"
      >
        SPC
      </text>
    </svg>
  );
}
