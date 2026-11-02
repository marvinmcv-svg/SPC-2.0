/**
 * SPC bilingual system (ES/EN) — types, helpers and shared UI strings.
 * Component-level strings live colocated in each component as `T` objects.
 */

export type Lang = "es" | "en";

/** A bilingual value. */
export type L<T = string> = { es: T; en: T };

/** Pick the value for the active language. */
export function pick<T>(l: L<T>, lang: Lang): T {
  return l[lang];
}

/* ————————————————————————————————————————————————
   Shared UI strings used across multiple components
———————————————————————————————————————————————— */
export const SHARED = {
  nav: {
    home: { es: "Inicio", en: "Home" },
    about: { es: "Nosotros", en: "About us" },
    services: { es: "Servicios", en: "Services" },
    clients: { es: "Clientes", en: "Clients" },
    technology: { es: "Tecnología", en: "Technology" },
    faq: { es: "FAQ", en: "FAQ" },
    contact: { es: "Contacto", en: "Contact" },
    products: { es: "Productos", en: "Products" },
    industries: { es: "Industrias", en: "Industries" },
    process: { es: "Proceso", en: "Process" },
    navigation: { es: "Navegación", en: "Navigation" },
    the9: { es: "Los 9 servicios", en: "The 9 product lines" },
  } satisfies Record<string, L>,
  cta: {
    quote: { es: "Cotiza aquí", en: "Quote here" },
    quoteShort: { es: "Cotizar", en: "Quote" },
    quoteWa: { es: "Cotiza por WhatsApp", en: "Quote via WhatsApp" },
    explore: { es: "Explorar", en: "Explore" },
    continueWa: { es: "CONTINUAR EN WHATSAPP", en: "CONTINUE ON WHATSAPP" },
    talkAdvisor: { es: "Hablar con un asesor", en: "Talk to an advisor" },
  } satisfies Record<string, L>,
  misc: {
    openMenu: { es: "Abrir menú", en: "Open menu" },
    closeMenu: { es: "Cerrar menú", en: "Close menu" },
    closeChat: { es: "Cerrar chat de SPenCer", en: "Close SPenCer chat" },
  } satisfies Record<string, L>,
} as const;
