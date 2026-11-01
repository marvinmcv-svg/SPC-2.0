"use client";

import { cn } from "@/lib/utils";
import { waLink } from "@/lib/spc";

/** Glifo oficial de WhatsApp (ruta del brand asset) */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={cn("h-5 w-5", className)} aria-hidden>
      <path d="M23.92 18.16c-.16-.08-1.897-.935-2.19-1.042-.293-.106-.507-.16-.72.16-.213.32-.826 1.042-1.013 1.256-.187.214-.373.24-.693.08-.32-.16-1.35-.498-2.57-1.585-.95-.847-1.592-1.893-1.778-2.213-.187-.32-.02-.494.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.053-.56-.107-.16-.96-2.314-1.314-3.17-.346-.832-.698-.72-.96-.732-.248-.012-.532-.014-.816-.014-.283 0-.744.107-1.134.532-.39.426-1.487 1.452-1.487 3.54 0 2.086 1.52 4.103 1.733 4.389.213.286 2.99 4.568 7.24 6.403 1.011.436 1.802.696 2.417.892.948.301 1.81.258 2.494.157.761-.114 2.345-.958 2.676-1.884.33-.926.33-1.72.23-1.884-.099-.163-.356-.257-.75-.443z" />
      <path d="M16.045 2.4C8.61 2.4 2.583 8.427 2.583 15.862c0 2.372.62 4.695 1.795 6.744L2.4 29.6l7.135-1.94a13.39 13.39 0 0 0 6.51 1.672h.005c7.434 0 13.462-6.027 13.462-13.462 0-3.597-1.4-6.975-3.943-9.51a13.355 13.355 0 0 0-9.51-3.96h-.004zm0 24.583h-.004a11.13 11.13 0 0 1-5.669-1.552l-.406-.24-4.212 1.15 1.125-4.108-.264-.42a11.108 11.108 0 0 1-1.702-5.95c0-6.148 5.003-11.15 11.155-11.15 2.98 0 5.778 1.162 7.883 3.27a11.093 11.093 0 0 1 3.267 7.888c0 6.148-5.004 11.152-11.153 11.152z" />
    </svg>
  );
}

/**
 * CTA principal del funnel → WhatsApp con mensaje precargado.
 */
export function WhatsAppButton({
  message,
  children,
  className,
  size = "lg",
}: {
  message: string;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-10 px-4 text-sm gap-2 rounded-full",
    md: "h-12 px-6 text-[15px] gap-2.5 rounded-full",
    lg: "h-14 px-8 text-base gap-3 rounded-full",
  };
  const icons = { sm: "h-4.5 w-4.5", md: "h-5 w-5", lg: "h-6 w-6" };

  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "wa-btn btn-press group inline-flex items-center justify-center font-semibold text-white",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]",
        sizes[size],
        className
      )}
      aria-label="Contactar por WhatsApp"
    >
      <span className="relative flex items-center justify-center">
        <WhatsAppIcon className={cn(icons[size], "transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110")} />
      </span>
      {children ?? "Cotiza por WhatsApp"}
    </a>
  );
}
