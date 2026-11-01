/**
 * SPC Impresores S.A. — Central brand configuration
 * Single source of truth for contact info, WhatsApp funnel and product data.
 *
 * ⚙️ Para cambiar el número de WhatsApp, edita SOLO `whatsapp.number` aquí.
 */
export const SPC = {
  name: "SPC Impresores S.A.",
  brand: "SPC Gráfica Industrial",
  slogan: "Imprimiendo lo mejor de Bolivia",
  founded: 2001,
  city: "La Paz, Bolivia",
  address: "Av. Las Américas Nº 756, La Paz – Bolivia",
  phone: "(+591) 2 2111121",
  phoneAlt: "(+591) 2 2248260",
  email: "grafcaindustrial@spc.com.bo",
  webToPrintUrl: "https://spc.net.bo/wtp2/client/index.php",
  website: "https://www.spc.net.bo",
  mission:
    "Brindamos servicios integrales en impresión comercial y packaging, orientados a las necesidades de nuestros clientes.",
  vision:
    "Fortalecer el liderazgo en el mercado de la industria gráfica, consolidando al sector y promoviendo solo lo mejor.",
  whatsapp: {
    /** Número de WhatsApp Business en formato internacional sin “+”.  */
    number: "5912211121",
    displayName: "SPC Impresores S.A.",
  },
} as const;

/** Construye un enlace wa.me con mensaje precargado (funnel de CTA). */
export function waLink(message: string): string {
  return `https://wa.me/${SPC.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Mensajes precargados por contexto (educan y guían al CTA). */
export const WA_MESSAGES = {
  general:
    "Hola SPC 👋 Quiero información sobre sus servicios de impresión y packaging.",
  packaging:
    "Hola SPC 👋 Quiero cotizar *packaging*: cajas, bolsas o envases para mi producto.",
  alimentos:
    "Hola SPC 👋 Necesito cotizar *packaging para alimentos* (cajas, envolturas, etiquetas).",
  farmaceutico:
    "Hola SPC 👋 Necesito cotizar *packaging farmacéutico* con estándares de la industria.",
  comercial:
    "Hola SPC 👋 Quiero cotizar *impresión comercial*: revistas, catálogos o impresos.",
  digital:
    "Hola SPC 👋 Me interesa la *impresión digital bajo demanda* para tirajes cortos.",
  books:
    "Hola SPC 👋 Quiero cotizar *libros emblocados* (Hotmelt/PUR) o publicaciones.",
  start:
    "Hola SPC 👋 Quiero iniciar un proyecto de impresión. ¿Me ayudan con una cotización?",
} as const;

/** Las 9 líneas de producto de SPC (datos reales de su catálogo). */
export type ServiceCategory = "packaging" | "comercial" | "digital";

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ServiceCategory;
  categoryLabel: string;
  highlights: string[];
  message: string;
}

export const SERVICES: Service[] = [
  {
    id: "packaging-alimentos",
    title: "Packaging de Alimentos",
    description:
      "Envases y cajas food-grade que protegen tu producto y elevan tu marca en góndola.",
    image: "/spc/packaging-alimentos.jpg",
    category: "packaging",
    categoryLabel: "Packaging",
    highlights: ["Cartón food-grade", "Impresión offset premium", "Bordes y troquel fino"],
    message: WA_MESSAGES.alimentos,
  },
  {
    id: "packaging-farmaceutico",
    title: "Packaging Farmacéutico",
    description:
      "Cajas y estuches con la precisión, trazabilidad y estándares que exige la industria.",
    image: "/spc/packaging-farmaceutico.jpg",
    category: "packaging",
    categoryLabel: "Packaging",
    highlights: ["Precisión farmacéutica", "Series y códigos", "Calidad certificada"],
    message: WA_MESSAGES.farmaceutico,
  },
  {
    id: "packaging-comercial",
    title: "Packaging Comercial y Promocional",
    description:
      "Estuches rígidos, packaging promocional y presentaciones que enamoran al cliente.",
    image: "/spc/packaging-comercial.jpg",
    category: "packaging",
    categoryLabel: "Packaging",
    highlights: ["Estuches rígidos", "Acabados premium", "Laminación y UV"],
    message: WA_MESSAGES.packaging,
  },
  {
    id: "paper-bags",
    title: "Paper Bags",
    description:
      "Bolsas de papel con asa, en todos los colores y tamaños, que convierten tu marca en experiencia.",
    image: "/spc/paper-bags.jpg",
    category: "packaging",
    categoryLabel: "Packaging",
    highlights: ["Asas resistentes", "Papeles de color", "Gran volumen"],
    message: WA_MESSAGES.packaging,
  },
  {
    id: "impresos-comerciales",
    title: "Impresos Comerciales",
    description:
      "Papelería comercial e identidad corporativa con acabados impecables: hojas membretadas, tarjetas y más.",
    image: "/spc/impresos-comerciales.jpg",
    category: "comercial",
    categoryLabel: "Comercial",
    highlights: ["Identidad corporativa", "Papeles premium", "Definición de color"],
    message: WA_MESSAGES.comercial,
  },
  {
    id: "libros",
    title: "Libros Emblocados Hotmelt/PUR",
    description:
      "Encuadernación Hotmelt y PUR de alta resistencia para libros que duran generaciones.",
    image: "/spc/libros.jpg",
    category: "comercial",
    categoryLabel: "Comercial",
    highlights: ["Encuadernación PUR", "Lomos cuadrados", "Tirajes largos"],
    message: WA_MESSAGES.books,
  },
  {
    id: "revistas",
    title: "Revistas y Catálogos",
    description:
      "Publicaciones periódicas y catálogos con papel, color y encuadernación de primer nivel.",
    image: "/spc/revistas.jpg",
    category: "comercial",
    categoryLabel: "Comercial",
    highlights: ["Calidad editorial", "Cosido y encolado", "Distribución nacional"],
    message: WA_MESSAGES.comercial,
  },
  {
    id: "calendarios",
    title: "Calendarios",
    description:
      "Calendarios de escritorio y pared que ponen tu marca frente a tu cliente los 365 días del año.",
    image: "/spc/calendarios.jpg",
    category: "comercial",
    categoryLabel: "Comercial",
    highlights: ["Diseños personalizados", "Espiral y taco", "Campaña anual"],
    message: WA_MESSAGES.comercial,
  },
  {
    id: "impresion-digital",
    title: "Impresión Digital",
    description:
      "Impresión digital bajo demanda: tirajes cortos, entregas rápidas y personalización variable.",
    image: "/spc/impresion-digital.jpg",
    category: "digital",
    categoryLabel: "Digital",
    highlights: ["Bajo demanda", "Datos variables", "Entrega express"],
    message: WA_MESSAGES.digital,
  },
];
