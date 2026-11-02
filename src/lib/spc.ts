/**
 * SPC Impresores S.A. — Central brand configuration (bilingual ES/EN)
 * Single source of truth for contact info, WhatsApp funnel, product data,
 * clients, reviews, FAQs, the real-product gallery and the SPC AI knowledge base.
 *
 * ⚙️ Para cambiar el número de WhatsApp, edita SOLO `whatsapp.number` aquí.
 * ⚙️ Para actualizar clientes/reseñas reales, edita CLIENTS / REVIEWS aquí.
 */
import type { L } from "./i18n";
import { pick } from "./i18n";

/* Re-export para comodidad de los componentes que ya importan desde spc */
export { pick } from "./i18n";
export type { L } from "./i18n";

export const SPC = {
  name: "SPC Impresores S.A.",
  brand: "SPC Gráfica Industrial",
  slogan: { es: "Imprimiendo lo mejor de Bolivia", en: "Printing the best of Bolivia" } satisfies L,
  founded: 2001,
  city: { es: "La Paz, Bolivia", en: "La Paz, Bolivia" } satisfies L,
  address: "Av. Las Américas Nº 756, La Paz – Bolivia",
  phone: "(+591) 2 2111121",
  phoneAlt: "(+591) 2 2248260",
  email: "grafcaindustrial@spc.com.bo",
  webToPrintUrl: "https://spc.net.bo/wtp2/client/index.php",
  website: "https://www.spc.net.bo",
  mission: {
    es: "Brindamos servicios integrales en impresión comercial y packaging, orientados a las necesidades de nuestros clientes.",
    en: "We provide comprehensive commercial printing and packaging services, oriented to the needs of our clients.",
  } satisfies L,
  vision: {
    es: "Fortalecer el liderazgo en el mercado de la industria gráfica, consolidando al sector y promoviendo solo lo mejor.",
    en: "To strengthen our leadership in the graphics industry market, consolidating the sector and promoting only the best.",
  } satisfies L,
  whatsapp: {
    /** Número de WhatsApp Business en formato internacional sin “+”. */
    number: "59177165787",
    display: "+591 77165787",
    displayName: "SPC Impresores S.A.",
  },
} as const;

/** Construye un enlace wa.me con mensaje precargado (funnel de CTA). */
export function waLink(message: string): string {
  return `https://wa.me/${SPC.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/**
 * Mensajes precargados por contexto (educan y guían al CTA).
 * Siempre en español: el equipo comercial atiende en español.
 */
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
  brief:
    "Hola SPC 👋 Quiero una cotización. Mi proyecto:\n• Producto: \n• Cantidad: \n• Tamaño: \n• Material/acabado: \n• ¿Tengo diseño?: ",
  webToPrint:
    "Hola SPC 👋 Quiero información sobre el *portal Web to Print* para mi empresa.",
} as const;

/* ————————————————————————————————————————————————
   Las 9 líneas de producto de SPC (datos reales de su catálogo)
   + información profunda para las páginas de detalle.
   Imágenes: fotografías reales de productos impresos.
———————————————————————————————————————————————— */
export type ServiceCategory = "packaging" | "comercial" | "digital";

export interface ServiceDetails {
  /** Párrafo educativo: qué es y para qué sirve este producto */
  intro: string;
  materials: string[];
  finishes: string[];
  specs: { label: string; value: string }[];
  useCases: string[];
  /** Consejo educativo de experto */
  tip: string;
}

export interface Service {
  id: string;
  title: L;
  description: L;
  /** Fotografía real del tipo de producto impreso */
  image: string;
  /** Fotografía real de producción del sitio original de SPC */
  realPhoto: string;
  category: ServiceCategory;
  categoryLabel: L;
  highlights: L<string[]>;
  /** Mensaje de WhatsApp (siempre español) */
  message: string;
  details: L<ServiceDetails>;
}

export const SERVICES: Service[] = [
  {
    id: "packaging-alimentos",
    title: {
      es: "Packaging de Alimentos",
      en: "Food Packaging",
    },
    description: {
      es: "Envases y cajas food-grade que protegen tu producto y elevan tu marca en góndola.",
      en: "Food-grade boxes and packaging that protect your product and elevate your brand on the shelf.",
    },
    image: "/spc/svc-packaging-alimentos.jpg",
    realPhoto: "/spc/real-packaging-alimentos.jpg",
    category: "packaging",
    categoryLabel: { es: "Packaging", en: "Packaging" },
    highlights: {
      es: ["Cartón food-grade", "Impresión offset premium", "Bordes y troquel fino"],
      en: ["Food-grade board", "Premium offset printing", "Fine die-cutting"],
    },
    message: WA_MESSAGES.alimentos,
    details: {
      es: {
        intro:
          "El packaging de alimentos hace doble trabajo: protege el producto durante el transporte y almacenamiento, y lo vende en el punto de venta. Trabajamos con cartón e insumos aptos para contacto con alimentos e impresión de baja migración, para que tu marca cumpla los estándares del sector sin sacrificar el impacto visual en góndola.",
        materials: [
          "Cartón plegadizo food-grade de 18 a 24 ptos",
          "Cartón microcorrugado (E / B) para producto pesado",
          "Papeles barrera y encerados",
        ],
        finishes: [
          "Barniz acuático apto para alimentos",
          "Laminación mate o brillante",
          "Barniz UV y UV selectivo",
          "Troquel y hendido de precisión",
        ],
        specs: [
          { label: "Tiraje recomendado", value: "Offset desde ≈ 1.000 uds · digital desde 100" },
          { label: "Tiempo de entrega", value: "8 a 15 días hábiles según acabados" },
          { label: "Color", value: "CMYK + tintas Pantone para color de marca exacto" },
          { label: "Formato", value: "Cajas plegadizas, sleeves, bandejas y envolturas" },
        ],
        useCases: [
          "Estuches para snacks, chocolates y repostería",
          "Bandejas y cajas para panadería y pastelería",
          "Sleeves para productos promocionales",
          "Cajas para productos congelados y listos para servir",
        ],
        tip: "Define el packaging junto al tamaño real de tu producto: reducir 5 mm el desarrollo puede bajar el costo de material por unidad sin perder presencia en góndola.",
      },
      en: {
        intro:
          "Food packaging does double duty: it protects the product during transport and storage, and it sells it at the point of sale. We work with food-safe board and low-migration printing, so your brand meets industry standards without sacrificing shelf impact.",
        materials: [
          "Food-grade folding board, 18–24 pt",
          "Micro-fluted board (E / B) for heavier products",
          "Barrier and waxed papers",
        ],
        finishes: [
          "Food-safe aqueous coating",
          "Matte or gloss lamination",
          "UV and spot-UV coating",
          "Precision die-cutting and scoring",
        ],
        specs: [
          { label: "Recommended run", value: "Offset from ≈ 1,000 units · digital from 100" },
          { label: "Lead time", value: "8–15 business days depending on finishes" },
          { label: "Color", value: "CMYK + Pantone inks for exact brand color" },
          { label: "Formats", value: "Folding cartons, sleeves, trays and wraps" },
        ],
        useCases: [
          "Boxes for snacks, chocolate and confectionery",
          "Trays and boxes for bakeries",
          "Sleeves for promotional products",
          "Cartons for frozen and ready-to-serve goods",
        ],
        tip: "Design the package around your product's real size: trimming just 5 mm from the blank can cut material cost per unit without losing shelf presence.",
      },
    },
  },
  {
    id: "packaging-farmaceutico",
    title: {
      es: "Packaging Farmacéutico",
      en: "Pharmaceutical Packaging",
    },
    description: {
      es: "Cajas y estuches con la precisión, trazabilidad y estándares que exige la industria.",
      en: "Cartons with the precision, traceability and standards the pharmaceutical industry demands.",
    },
    image: "/spc/svc-packaging-farmaceutico.jpg",
    realPhoto: "/spc/real-packaging-farmaceutico.jpg",
    category: "packaging",
    categoryLabel: { es: "Packaging", en: "Packaging" },
    highlights: {
      es: ["Precisión farmacéutica", "Series y códigos", "Calidad certificada"],
      en: ["Pharma-grade precision", "Batch & serial codes", "Certified quality"],
    },
    message: WA_MESSAGES.farmaceutico,
    details: {
      es: {
        intro:
          "En la industria farmacéutica el empaque es parte del producto: debe garantizar información legible, trazabilidad lote a lote y acabados que soporten líneas de envase automatizadas. Nuestra producción combina impresión de alta definición, control de color estricto y verificación por series, para que cada estuche llegue listo para la línea de empaque.",
        materials: [
          "Cartón folding de baja migración",
          "Cartón blanco reversible para impresión doble cara",
          "Insertos y bandejas internas",
        ],
        finishes: [
          "Impresión de series, lotes y códigos",
          "Microtexto y elementos de seguridad",
          "Barniz mate tacto suave",
          "Troquel de alta precisión",
        ],
        specs: [
          { label: "Tiraje recomendado", value: "Series medias y altas (consultar por proyecto)" },
          { label: "Tiempo de entrega", value: "10 a 15 días hábiles con validación previa" },
          { label: "Trazabilidad", value: "Control por orden, lote y serie de producción" },
          { label: "Formato", value: "Estuches, insertos, prospectos y estuches para dispositivos" },
        ],
        useCases: [
          "Estuches para medicamentos de venta libre y bajo receta",
          "Cajas para dispositivos médicos",
          "Insertos informativos y prospectos",
          "Packaging para líneas hospitalarias",
        ],
        tip: "Envíanos la especificación técnica de tu línea de envase (velocidad, tipo de pegado, sensores) y calibramos el desarrollo del estuche para que corra sin detenciones.",
      },
      en: {
        intro:
          "In the pharmaceutical industry the pack is part of the product: it must guarantee legible information, batch-by-batch traceability and finishes that survive automated packaging lines. Our production combines high-definition printing, strict color control and serial verification, so every carton arrives ready for the line.",
        materials: [
          "Low-migration folding board",
          "Reversible white board for double-sided printing",
          "Inserts and inner trays",
        ],
        finishes: [
          "Series, batch and code printing",
          "Microtext and security features",
          "Soft-touch matte varnish",
          "High-precision die-cutting",
        ],
        specs: [
          { label: "Recommended run", value: "Medium and high series (quote per project)" },
          { label: "Lead time", value: "10–15 business days with prior validation" },
          { label: "Traceability", value: "Control by order, batch and production series" },
          { label: "Formats", value: "Cartons, inserts, leaflets and device boxes" },
        ],
        useCases: [
          "Cartons for OTC and prescription medicines",
          "Boxes for medical devices",
          "Informational inserts and leaflets",
          "Packaging for hospital lines",
        ],
        tip: "Send us your packaging line's technical spec (speed, gluing type, sensors) and we'll calibrate the carton blank so it runs without stoppages.",
      },
    },
  },
  {
    id: "packaging-comercial",
    title: {
      es: "Packaging Comercial y Promocional",
      en: "Commercial & Promotional Packaging",
    },
    description: {
      es: "Estuches rígidos, packaging promocional y presentaciones que enamoran al cliente.",
      en: "Rigid boxes and promotional packaging that turn your product into an experience.",
    },
    image: "/spc/svc-packaging-comercial.jpg",
    realPhoto: "/spc/real-packaging-comercial.jpg",
    category: "packaging",
    categoryLabel: { es: "Packaging", en: "Packaging" },
    highlights: {
      es: ["Estuches rígidos", "Acabados premium", "Laminación y UV"],
      en: ["Rigid boxes", "Premium finishes", "Foil & spot UV"],
    },
    message: WA_MESSAGES.packaging,
    details: {
      es: {
        intro:
          "Cuando el producto se regala o se exhibe, el empaque es la primera experiencia de marca. Los estuches rígidos y acabados premium —laminación soft-touch, hot stamping, UV selectivo— transmiten valor antes de abrir la caja. Diseñamos presentaciones que convierten un producto en un regalo corporativo o de retail memorable.",
        materials: [
          "Cartón gris forrado (estuches rígidos)",
          "Cartulinas de alta blancura",
          "Papeles especiales y textiles",
        ],
        finishes: [
          "Forrado manual y semi-industrial",
          "Laminación soft-touch",
          "Hot stamping (oro, plata, colores)",
          "UV selectivo y relieve",
        ],
        specs: [
          { label: "Tiraje recomendado", value: "Piezas premium desde ≈ 250 uds" },
          { label: "Tiempo de entrega", value: "12 a 18 días hábiles según acabados" },
          { label: "Nivel", value: "Presentaciones de lujo, retail y corporativas" },
          { label: "Formato", value: "Estuches rígidos, cajas magnet, displays y kits" },
        ],
        useCases: [
          "Cajas premium para lanzamientos y ediciones especiales",
          "Kits de regalo corporativo",
          "Displays y exhibidores promocionales",
          "Cajas para joyería, cosmética y tecnología",
        ],
        tip: "Un UV selectivo sobre un logo mate puede resaltar más que un laminado completo — y cuesta menos de lo que imaginas.",
      },
      en: {
        intro:
          "When a product is gifted or displayed, the pack is the first brand experience. Rigid boxes and premium finishes —soft-touch lamination, hot stamping, spot UV— convey value before the box is even opened. We design presentations that turn a product into a memorable corporate or retail gift.",
        materials: [
          "Wrapped greyboard (rigid boxes)",
          "High-whiteness cartons",
          "Specialty and textile papers",
        ],
        finishes: [
          "Hand and semi-industrial wrapping",
          "Soft-touch lamination",
          "Hot stamping (gold, silver, colors)",
          "Spot UV and embossing",
        ],
        specs: [
          { label: "Recommended run", value: "Premium pieces from ≈ 250 units" },
          { label: "Lead time", value: "12–18 business days depending on finishes" },
          { label: "Level", value: "Luxury, retail and corporate presentations" },
          { label: "Formats", value: "Rigid boxes, magnetic boxes, displays and kits" },
        ],
        useCases: [
          "Premium boxes for launches and special editions",
          "Corporate gift kits",
          "Promotional displays and exhibitors",
          "Boxes for jewelry, cosmetics and tech",
        ],
        tip: "A spot UV over a matte logo can stand out more than a full laminate — and it costs less than you think.",
      },
    },
  },
  {
    id: "paper-bags",
    title: { es: "Paper Bags", en: "Paper Bags" },
    description: {
      es: "Bolsas de papel con asa, en todos los colores y tamaños, que convierten tu marca en experiencia.",
      en: "Paper bags with handles, in every color and size, that turn your brand into an experience.",
    },
    image: "/spc/svc-paper-bags.jpg",
    realPhoto: "/spc/real-paper-bags.jpg",
    category: "packaging",
    categoryLabel: { es: "Packaging", en: "Packaging" },
    highlights: {
      es: ["Asas resistentes", "Papeles de color", "Gran volumen"],
      en: ["Reinforced handles", "Colored papers", "High volume"],
    },
    message: WA_MESSAGES.packaging,
    details: {
      es: {
        intro:
          "La bolsa de papel es publicidad ambulante: tu marca camina por la calle en manos de tus clientes. Producimos bolsas con asa resistente en kraft, couché y papeles de color, con impresión a una o varias tintas, para retail, eventos, delivery y campañas. Tamiza la resistencia correcta según el peso de tu producto.",
        materials: [
          "Papel kraft natural y blanco",
          "Couché de color (paleta completa)",
          "Papeles reciclados y texturizados",
        ],
        finishes: [
          "Asas de papel retorcido o cinta plana",
          "Fondo y refuerzos para peso extra",
          "Impresión 1 a 4 tintas + Pantone",
          "Barniz y laminación opcional",
        ],
        specs: [
          { label: "Tiraje recomendado", value: "Desde ≈ 500 bolsas por diseño" },
          { label: "Tiempo de entrega", value: "7 a 12 días hábiles" },
          { label: "Tamaños", value: "Pequeña, mediana, grande y formats de evento" },
          { label: "Asas", value: "Retorcida, plana o cordón textil" },
        ],
        useCases: [
          "Bolsas para tiendas de ropa y calzado",
          "Bolsas para eventos, ferias y lanzamientos",
          "Bolsas para delivery y repostería",
          "Kits de bienvenida corporativos",
        ],
        tip: "Un diseño a dos tintas sobre kraft natural comunica sostenibilidad y cuesta menos que una impresión llena a cuatro tintas.",
      },
      en: {
        intro:
          "A paper bag is walking advertising: your brand travels down the street in your customers' hands. We produce bags with reinforced handles in kraft, coated and colored papers, printed in one or more inks, for retail, events, delivery and campaigns. We dial in the right strength for your product's weight.",
        materials: [
          "Natural and white kraft paper",
          "Colored coated paper (full palette)",
          "Recycled and textured papers",
        ],
        finishes: [
          "Twisted-paper or flat-ribbon handles",
          "Reinforced bottom and gussets for extra weight",
          "1–4 ink printing + Pantone",
          "Optional varnish and lamination",
        ],
        specs: [
          { label: "Recommended run", value: "From ≈ 500 bags per design" },
          { label: "Lead time", value: "7–12 business days" },
          { label: "Sizes", value: "Small, medium, large and event formats" },
          { label: "Handles", value: "Twisted, flat or textile cord" },
        ],
        useCases: [
          "Bags for clothing and footwear stores",
          "Bags for events, fairs and launches",
          "Bags for delivery and pastry shops",
          "Corporate welcome kits",
        ],
        tip: "A two-ink design on natural kraft communicates sustainability and costs less than a full four-color print.",
      },
    },
  },
  {
    id: "impresos-comerciales",
    title: {
      es: "Impresos Comerciales",
      en: "Commercial Stationery",
    },
    description: {
      es: "Papelería comercial e identidad corporativa con acabados impecables: hojas membretadas, tarjetas y más.",
      en: "Business stationery and corporate identity with flawless finishes: letterheads, cards and more.",
    },
    image: "/spc/svc-impresos-comerciales.jpg",
    realPhoto: "/spc/real-impresos-comerciales.jpg",
    category: "comercial",
    categoryLabel: { es: "Comercial", en: "Commercial" },
    highlights: {
      es: ["Identidad corporativa", "Papeles premium", "Definición de color"],
      en: ["Corporate identity", "Premium papers", "Color accuracy"],
    },
    message: WA_MESSAGES.comercial,
    details: {
      es: {
        intro:
          "La papelería corporativa es el uniforme de tu marca en cada carta, carpeta y tarjeta que entregas. Con papeles de primera línea, color consistente y acabados profesionales, tu empresa se percibe sólida en cada punto de contacto físico — de la tarjeta de presentación al sobre de una propuesta millonaria.",
        materials: [
          "Papel bond de primera calidad",
          "Cartulinas y couchés premium",
          "Papeles con textura y algodón",
        ],
        finishes: [
          "Laminación mate, brillante y soft-touch",
          "Tarjetas con borde de color",
          "Impresión en seco (blind emboss)",
          "Numeración y perforados",
        ],
        specs: [
          { label: "Tiraje recomendado", value: "Digital desde 100 · offset desde ≈ 500" },
          { label: "Tiempo de entrega", value: "3 a 8 días hábiles" },
          { label: "Color", value: "Control de color para identidad consistente" },
          { label: "Formato", value: "Hojas membretadas, sobres, carpetas, tarjetas, blocks" },
        ],
        useCases: [
          "Kits de papelería corporativa completa",
          "Tarjetas de presentación premium",
          "Carpetas institucionales para propuestas",
          "Blocks, recibos y facturas personalizadas",
        ],
        tip: "Estandariza el papel de tu papelería una vez: el color de marca se mantiene idéntico en cada reposición durante años.",
      },
      en: {
        intro:
          "Corporate stationery is your brand's uniform in every letter, folder and card you hand over. With first-line papers, consistent color and professional finishes, your company reads as solid at every physical touchpoint — from a business card to the envelope of a million-dollar proposal.",
        materials: [
          "First-quality bond paper",
          "Premium carton and coated papers",
          "Textured and cotton papers",
        ],
        finishes: [
          "Matte, gloss and soft-touch lamination",
          "Color-edge business cards",
          "Blind embossing",
          "Numbering and perforations",
        ],
        specs: [
          { label: "Recommended run", value: "Digital from 100 · offset from ≈ 500" },
          { label: "Lead time", value: "3–8 business days" },
          { label: "Color", value: "Color control for a consistent identity" },
          { label: "Formats", value: "Letterheads, envelopes, folders, cards, pads" },
        ],
        useCases: [
          "Complete corporate stationery kits",
          "Premium business cards",
          "Institutional presentation folders",
          "Custom pads, receipts and invoices",
        ],
        tip: "Standardize your stationery paper once: your brand color stays identical on every reorder for years.",
      },
    },
  },
  {
    id: "libros",
    title: {
      es: "Libros Emblocados Hotmelt/PUR",
      en: "Perfect-Bound Books (Hotmelt/PUR)",
    },
    description: {
      es: "Encuadernación Hotmelt y PUR de alta resistencia para libros que duran generaciones.",
      en: "High-strength Hotmelt and PUR binding for books that outlast generations.",
    },
    image: "/spc/svc-libros.jpg",
    realPhoto: "/spc/real-libros.jpg",
    category: "comercial",
    categoryLabel: { es: "Comercial", en: "Commercial" },
    highlights: {
      es: ["Encuadernación PUR", "Lomos cuadrados", "Tirajes largos"],
      en: ["PUR binding", "Square spines", "Long runs"],
    },
    message: WA_MESSAGES.books,
    details: {
      es: {
        intro:
          "Un libro bien encuadernado se abre plano, resiste cientos de lecturas y mantiene el lomo intacto en la biblioteca. Nuestra encuadernación Hotmelt y PUR —la tecnología de encolado más resistente de la industria— procesa tirajes largos con lomos cuadrados perfectos y tiempos consistentes para editoriales, universidades e instituciones.",
        materials: [
          "Papel interior 70–120 g (bond, book, offset)",
          "Cartulina para tapas 200–350 g",
          "Opciones de tapa blanda y forros",
        ],
        finishes: [
          "Encolado Hotmelt y PUR",
          "Lomo cuadrado o redondeado",
          "Cosido a hilo para libros de arte",
          "Laminación y UV en portadas",
        ],
        specs: [
          { label: "Tiraje recomendado", value: "Offset desde ≈ 300 ejemplares · digital desde 1" },
          { label: "Tiempo de entrega", value: "10 a 15 días hábiles por tiraje" },
          { label: "Encuadernación", value: "Hotmelt / PUR / cosido a caballete" },
          { label: "Formato", value: "Formatos de bolsillo a mesa de café" },
        ],
        useCases: [
          "Libros de editoriales y autores independientes",
          "Anuarios escolares y universitarios",
          "Memorias institucionales y corporativas",
          "Catálogos de arte y fotografía",
        ],
        tip: "PUR frente a Hotmelt: si tu libro se usará con frecuencia (manuales, textos de consulta), el encolado PUR duplica la vida útil del lomo.",
      },
      en: {
        intro:
          "A well-bound book lies flat, survives hundreds of readings and keeps its spine intact on the shelf. Our Hotmelt and PUR binding —the industry's toughest gluing technology— handles long runs with perfect square spines and consistent turnaround for publishers, universities and institutions.",
        materials: [
          "Interior paper 70–120 gsm (bond, book, offset)",
          "Cover board 200–350 gsm",
          "Softcover and jacket options",
        ],
        finishes: [
          "Hotmelt and PUR gluing",
          "Square or rounded spine",
          "Thread-sewing for art books",
          "Cover lamination and UV",
        ],
        specs: [
          { label: "Recommended run", value: "Offset from ≈ 300 copies · digital from 1" },
          { label: "Lead time", value: "10–15 business days per run" },
          { label: "Binding", value: "Hotmelt / PUR / saddle-stitch" },
          { label: "Formats", value: "From pocket size to coffee-table" },
        ],
        useCases: [
          "Publisher and independent-author books",
          "School and university yearbooks",
          "Institutional and corporate memoirs",
          "Art and photography catalogs",
        ],
        tip: "PUR vs Hotmelt: if your book will see heavy use (manuals, reference texts), PUR gluing doubles the spine's useful life.",
      },
    },
  },
  {
    id: "revistas",
    title: {
      es: "Revistas y Catálogos",
      en: "Magazines & Catalogs",
    },
    description: {
      es: "Publicaciones periódicas y catálogos con papel, color y encuadernación de primer nivel.",
      en: "Periodicals and catalogs with first-class paper, color and binding.",
    },
    image: "/spc/svc-revistas.jpg",
    realPhoto: "/spc/real-revistas.jpg",
    category: "comercial",
    categoryLabel: { es: "Comercial", en: "Commercial" },
    highlights: {
      es: ["Calidad editorial", "Cosido y encolado", "Distribución nacional"],
      en: ["Editorial quality", "Sewn & glued", "Nationwide distribution"],
    },
    message: WA_MESSAGES.comercial,
    details: {
      es: {
        intro:
          "Una revista es una promesa de calidad que se renueva en cada número. Impresión editorial de gacetas, revistas y catálogos con selección de papel por secciones, color calibrado de tapa a tapa y encuadernación cosida o encolada. Programamos las periodicidades para que cada edición llegue a tiempo a tus lectores.",
        materials: [
          "Papel interior 80–115 g (couché mate/brillo)",
          "Portadas 200–300 g con laminación",
          "Insertos y cartelas en papel distinto",
        ],
        finishes: [
          "Cosido a caballete (grapas al lomo)",
          "Encolado Hotmelt para más páginas",
          "Barniz UV en portada",
          "Contratapas con datos de contacto",
        ],
        specs: [
          { label: "Tiraje recomendado", value: "Desde ≈ 300 ejemplares" },
          { label: "Tiempo de entrega", value: "7 a 12 días hábiles por edición" },
          { label: "Paginación", value: "Múltiplos según encuadernación elegida" },
          { label: "Formato", value: "Revistas, catálogos, gacetas y boletines" },
        ],
        useCases: [
          "Revistas corporativas e institucionales",
          "Catálogos de producto temporada tras temporada",
          "Publicaciones de cámaras y gremios",
          "Boletines y gacetas de distribución nacional",
        ],
        tip: "Programa tus ediciones con 3 semanas de anticipación: aseguras máquina, papel y entregas puntuales en cada periodo.",
      },
      en: {
        intro:
          "A magazine is a promise of quality renewed with every issue. Editorial printing of gazettes, magazines and catalogs with per-section paper selection, calibrated color from cover to cover, and sewn or glued binding. We schedule periodicities so every edition reaches your readers on time.",
        materials: [
          "Interior paper 80–115 gsm (matte/gloss coated)",
          "Covers 200–300 gsm with lamination",
          "Inserts and belly bands on alternate stock",
        ],
        finishes: [
          "Saddle-stitching (staples at the spine)",
          "Hotmelt gluing for higher page counts",
          "UV varnish on covers",
          "Back covers with contact details",
        ],
        specs: [
          { label: "Recommended run", value: "From ≈ 300 copies" },
          { label: "Lead time", value: "7–12 business days per edition" },
          { label: "Pagination", value: "Multiples depend on the binding chosen" },
          { label: "Formats", value: "Magazines, catalogs, gazettes and bulletins" },
        ],
        useCases: [
          "Corporate and institutional magazines",
          "Product catalogs, season after season",
          "Chamber and guild publications",
          "Bulletins and gazettes with nationwide distribution",
        ],
        tip: "Schedule your editions 3 weeks ahead: you lock in press time, paper and on-time delivery for every period.",
      },
    },
  },
  {
    id: "calendarios",
    title: { es: "Calendarios", en: "Calendars" },
    description: {
      es: "Calendarios de escritorio y pared que ponen tu marca frente a tu cliente los 365 días del año.",
      en: "Desk and wall calendars that keep your brand in front of your client 365 days a year.",
    },
    image: "/spc/svc-calendarios.jpg",
    realPhoto: "/spc/real-calendarios.jpg",
    category: "comercial",
    categoryLabel: { es: "Comercial", en: "Commercial" },
    highlights: {
      es: ["Diseños personalizados", "Espiral y taco", "Campaña anual"],
      en: ["Custom designs", "Spiral & easel back", "Annual campaign"],
    },
    message: WA_MESSAGES.comercial,
    details: {
      es: {
        intro:
          "El calendario es el impreso más visto del año: 365 días de tu marca en el escritorio o la pared del cliente. Personalizamos cada página —fotos, promociones, fechas clave de tu negocio— y producimos la campaña completa para que en diciembre tus calendarios ya estén en manos de tus clientes.",
        materials: [
          "Papel estucado para imágenes de alta calidad",
          "Cartulina para base y taco",
          "Soportes de cartón rígido",
        ],
        finishes: [
          "Espiral metálica o plástica",
          "Taco adhesivo para escritorio",
          "Laminación de portada",
          "Personalización página por página",
        ],
        specs: [
          { label: "Tiraje recomendado", value: "Desde ≈ 200 unidades por diseño" },
          { label: "Tiempo de entrega", value: "7 a 12 días hábiles" },
          { label: "Temporada", value: "Campaña anual — producción de junio a diciembre" },
          { label: "Formato", value: "Escritorio, pared, alargado y de bolsillo" },
        ],
        useCases: [
          "Calendarios corporativos de fin de año",
          "Calendarios promocionales con fotos de producto",
          "Almanaques institucionales",
          "Agendas y planeadores complementarios",
        ],
        tip: "Junio es el mes ideal para cerrar tu campaña navideña de calendarios: mejores precios y stock garantizado de papel.",
      },
      en: {
        intro:
          "The calendar is the most-viewed print of the year: 365 days of your brand on your client's desk or wall. We customize every page —photos, promotions, your business's key dates— and produce the whole campaign so your calendars are in your clients' hands by December.",
        materials: [
          "Coated paper for high-quality images",
          "Board for base and easel",
          "Rigid cardboard supports",
        ],
        finishes: [
          "Metal or plastic spiral binding",
          "Adhesive desk easel",
          "Cover lamination",
          "Page-by-page customization",
        ],
        specs: [
          { label: "Recommended run", value: "From ≈ 200 units per design" },
          { label: "Lead time", value: "7–12 business days" },
          { label: "Season", value: "Annual campaign — production June to December" },
          { label: "Formats", value: "Desk, wall, elongated and pocket" },
        ],
        useCases: [
          "End-of-year corporate calendars",
          "Promotional calendars with product photos",
          "Institutional almanacs",
          "Companion planners and diaries",
        ],
        tip: "June is the ideal month to close your holiday calendar campaign: better prices and guaranteed paper stock.",
      },
    },
  },
  {
    id: "impresion-digital",
    title: {
      es: "Impresión Digital",
      en: "Digital Printing",
    },
    description: {
      es: "Impresión digital bajo demanda: tirajes cortos, entregas rápidas y personalización variable.",
      en: "On-demand digital printing: short runs, fast delivery and variable personalization.",
    },
    image: "/spc/svc-impresion-digital.jpg",
    realPhoto: "/spc/real-impresion-digital.jpg",
    category: "digital",
    categoryLabel: { es: "Digital", en: "Digital" },
    highlights: {
      es: ["Bajo demanda", "Datos variables", "Entrega express"],
      en: ["On demand", "Variable data", "Express delivery"],
    },
    message: WA_MESSAGES.digital,
    details: {
      es: {
        intro:
          "La impresión digital elimina las planchas: tu archivo pasa directo a máquina. Es la tecnología ideal para tirajes cortos, pruebas de color, entregas urgentes y personalización variable —cada pieza puede llevar un nombre, código o imagen distinta— sin sacrificar calidad profesional a todo color.",
        materials: [
          "Gama completa de papeles y cartulinas",
          "Adhesivos y sintéticos",
          "Papeles para etiquetas autoadhesivas",
        ],
        finishes: [
          "Impresión a todo color, cara y doble cara",
          "Datos variables (nombres, códigos, series)",
          "Corte a formato y troquel digital",
          "Encuadernación rápida (grapas, espiral, binder)",
        ],
        specs: [
          { label: "Tiraje recomendado", value: "De 1 a 500+ unidades" },
          { label: "Tiempo de entrega", value: "24 a 72 horas" },
          { label: "Personalización", value: "Datos variables pieza por pieza" },
          { label: "Formato", value: "Tarjetas, flyers, afiches, etiquetas, invitaciones" },
        ],
        useCases: [
          "Invitaciones personales y de evento",
          "Credenciales y certificados nominados",
          "Etiquetas y stickers cortos",
          "Reimpresiones urgentes de papelería",
        ],
        tip: "¿No sabes cuántas unidades necesitas? Empieza digital: imprime 100, valida el mercado y escala a offset cuando la demanda crezca.",
      },
      en: {
        intro:
          "Digital printing does away with plates: your file goes straight to the press. It's the ideal technology for short runs, color proofs, rush deliveries and variable personalization —every piece can carry a different name, code or image— without sacrificing full-color professional quality.",
        materials: [
          "Full range of papers and boards",
          "Adhesive and synthetic stocks",
          "Self-adhesive label papers",
        ],
        finishes: [
          "Full-color printing, single or double sided",
          "Variable data (names, codes, serials)",
          "Format cutting and digital die-cutting",
          "Fast binding (staples, spiral, binder)",
        ],
        specs: [
          { label: "Recommended run", value: "1 to 500+ units" },
          { label: "Lead time", value: "24 to 72 hours" },
          { label: "Personalization", value: "Variable data piece by piece" },
          { label: "Formats", value: "Cards, flyers, posters, labels, invitations" },
        ],
        useCases: [
          "Personal and event invitations",
          "Named credentials and certificates",
          "Short-run labels and stickers",
          "Urgent stationery reprints",
        ],
        tip: "Not sure how many units you need? Start digital: print 100, validate the market, and scale to offset as demand grows.",
      },
    },
  },
];

/* ————————————————————————————————————————————————
   Industrias servidas (sección educativa)
———————————————————————————————————————————————— */
export interface Industry {
  id: string;
  name: L;
  icon: "food" | "pharma" | "retail" | "editorial" | "gov";
  tagline: L;
  description: L;
  products: L<string[]>;
  insight: L;
  message: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "alimentos",
    name: { es: "Alimentos & Bebidas", en: "Food & Beverage" },
    icon: "food",
    tagline: { es: "Tu producto, imparable en góndola", en: "Your product, unstoppable on the shelf" },
    description: {
      es: "Cajas, bandejas y envolturas food-grade para marcas que compiten por atención en el punto de venta, con la seguridad de insumos aptos para contacto con alimentos.",
      en: "Food-grade boxes, trays and wraps for brands competing for attention at the point of sale, with the safety of food-contact materials.",
    },
    products: {
      es: ["Cajas plegadizas", "Bandejas", "Envolturas", "Sleeves promocionales"],
      en: ["Folding cartons", "Trays", "Wraps", "Promotional sleeves"],
    },
    insight: {
      es: "En góndola tienes 2,6 segundos de atención: el color y el acabado de tu caja deciden si el cliente te elige o elige al de al lado.",
      en: "On the shelf you get 2.6 seconds of attention: your box's color and finish decide whether the customer picks you or the product next to you.",
    },
    message: WA_MESSAGES.alimentos,
  },
  {
    id: "farmaceutica",
    name: { es: "Farmacéutica & Salud", en: "Pharmaceutical & Health" },
    icon: "pharma",
    tagline: { es: "Precisión que prescribe confianza", en: "Precision that prescribes trust" },
    description: {
      es: "Estuches e insertos con trazabilidad lote a lote, series y acabados listos para líneas de envase automatizadas de laboratorios e instituciones de salud.",
      en: "Cartons and inserts with batch-level traceability, serial numbering and finishes ready for the automated packaging lines of labs and health institutions.",
    },
    products: {
      es: ["Estuches de medicamentos", "Insertos y prospectos", "Estuches para dispositivos", "Series y códigos"],
      en: ["Medicine cartons", "Inserts & leaflets", "Device boxes", "Serials & codes"],
    },
    insight: {
      es: "Un estuche farmacéutico no solo informa: debe correr limpio a alta velocidad en la línea de envase. Calibramos cada desarrollo para que tu producción no se detenga.",
      en: "A pharma carton doesn't just inform: it must run cleanly at high speed on the packaging line. We calibrate every blank so your production never stops.",
    },
    message: WA_MESSAGES.farmaceutico,
  },
  {
    id: "retail",
    name: { es: "Retail & Promoción", en: "Retail & Promotion" },
    icon: "retail",
    tagline: { es: "Marcas que se regalan solas", en: "Brands that gift themselves" },
    description: {
      es: "Bolsas de papel, estuches rígidos y exhibidores que convierten cada compra en una experiencia de marca y cada campaña en una conversación.",
      en: "Paper bags, rigid boxes and displays that turn every purchase into a brand experience and every campaign into a conversation.",
    },
    products: {
      es: ["Paper bags", "Estuches rígidos", "Displays y exhibidores", "Kits corporativos"],
      en: ["Paper bags", "Rigid boxes", "Displays & exhibitors", "Corporate kits"],
    },
    insight: {
      es: "La bolsa de papel es publicidad ambulante: cada cliente que camina con tu bolsa por la ciudad te regala impresiones gratis.",
      en: "The paper bag is walking advertising: every customer carrying your bag through the city gives you free impressions.",
    },
    message: WA_MESSAGES.packaging,
  },
  {
    id: "editorial",
    name: { es: "Editorial & Publicaciones", en: "Publishing & Periodicals" },
    icon: "editorial",
    tagline: { es: "Historias bien encuadernadas", en: "Stories, well bound" },
    description: {
      es: "Libros, revistas y catálogos con encuadernación Hotmelt/PUR, cosido editorial y selección de papel por secciones para editoriales, universidades y empresas.",
      en: "Books, magazines and catalogs with Hotmelt/PUR binding, editorial sewing and per-section paper selection for publishers, universities and companies.",
    },
    products: {
      es: ["Libros emblocados", "Revistas y catálogos", "Anuarios", "Memorias institucionales"],
      en: ["Perfect-bound books", "Magazines & catalogs", "Yearbooks", "Institutional memoirs"],
    },
    insight: {
      es: "El papel de una portada dice tanto como su título: un 250 g laminado mate se percibe como libro de colección antes de leer la primera página.",
      en: "A cover's paper says as much as its title: a 250 gsm matte laminate reads as a collector's book before the first page is read.",
    },
    message: WA_MESSAGES.books,
  },
  {
    id: "instituciones",
    name: { es: "Instituciones & Gobierno", en: "Institutions & Government" },
    icon: "gov",
    tagline: { es: "Proyectos que quedan en la historia", en: "Projects that make history" },
    description: {
      es: "Publicaciones oficiales, atlas, informes y campañas institucionales con la puntualidad y confidencialidad que exigen los proyectos públicos.",
      en: "Official publications, atlases, reports and institutional campaigns with the punctuality and confidentiality public projects demand.",
    },
    products: {
      es: ["Publicaciones oficiales", "Atlas e informes", "Campañas institucionales", "Papelería fiscal"],
      en: ["Official publications", "Atlases & reports", "Institutional campaigns", "Fiscal stationery"],
    },
    insight: {
      es: "Los proyectos institucionales se miden en hitos: entrega puntual, depósito legal y calidad constante — compromisos que cumplimos lote a lote.",
      en: "Institutional projects are measured in milestones: on-time delivery, legal deposit and consistent quality — commitments we keep batch after batch.",
    },
    message: WA_MESSAGES.general,
  },
];

/* ————————————————————————————————————————————————
   Galería de productos reales — fotografías de producción
   e impresos de verdad (prueba social + portafolio)
———————————————————————————————————————————————— */
export interface GalleryItem {
  image: string;
  title: L;
  caption: L;
  span?: "wide" | "tall";
}

export const GALLERY: GalleryItem[] = [
  {
    image: "/spc/gal-1.jpg",
    title: { es: "Packaging retail", en: "Retail packaging" },
    caption: {
      es: "Cajas impresas a todo color listas para góndola — el tipo de pieza que producimos a diario.",
      en: "Full-color printed retail boxes ready for the shelf — the kind of piece we produce every day.",
    },
    span: "wide",
  },
  {
    image: "/spc/gal-2.jpg",
    title: { es: "Estuches premium", en: "Premium boxes" },
    caption: {
      es: "Estuche rígido con acabados de lujo: hot stamping, laminación y detalles que venden.",
      en: "Rigid box with luxury finishes: hot stamping, lamination and details that sell.",
    },
  },
  {
    image: "/spc/gal-3.jpg",
    title: { es: "Empaques de marca", en: "Branded packaging" },
    caption: {
      es: "Bolsas y empaques impresos que hacen caminar tu marca por toda la ciudad.",
      en: "Printed bags and packs that make your brand walk all over the city.",
    },
    span: "tall",
  },
  {
    image: "/spc/gal-4.jpg",
    title: { es: "Tirajes editoriales", en: "Editorial runs" },
    caption: {
      es: "Libros emblocados y listos para distribución — calidad de colección en tirajes largos.",
      en: "Perfect-bound books ready for distribution — collector quality on long runs.",
    },
  },
  {
    image: "/spc/gal-5.jpg",
    title: { es: "Control de calidad", en: "Quality control" },
    caption: {
      es: "Inspección hoja a hoja en prensa: el color que aprobaste es el color que se entrega.",
      en: "Sheet-by-sheet press inspection: the color you approve is the color you get.",
    },
  },
  {
    image: "/spc/gal-6.jpg",
    title: { es: "Planta de producción", en: "Production floor" },
    caption: {
      es: "Prensas industriales corriendo a todo color — capacidad para todo el país.",
      en: "Industrial presses running full color — capacity for the entire country.",
    },
    span: "wide",
  },
];

/* ————————————————————————————————————————————————
   Créditos de fotografía (licencias CC — Wikimedia Commons)
———————————————————————————————————————————————— */
export const PHOTO_CREDITS: { file: string; author: string; license: string }[] = [
  { file: "svc-packaging-alimentos.jpg", author: "Ceeseven", license: "CC BY-SA 4.0" },
  { file: "svc-packaging-farmaceutico.jpg", author: "BlankEclair", license: "CC BY-SA 4.0" },
  { file: "svc-packaging-comercial.jpg", author: "PlatinumSunlight", license: "Public domain" },
  { file: "svc-paper-bags.jpg", author: "Donald Trung Quoc Don", license: "CC BY-SA 4.0" },
  { file: "svc-impresos-comerciales.jpg", author: "Bernhard Wintersperger", license: "CC BY 2.0" },
  { file: "svc-libros.jpg", author: "Dean Hochman", license: "CC BY 2.0" },
  { file: "svc-revistas.jpg", author: "Hochschulbibliothek Wildau", license: "CC0" },
  { file: "svc-calendarios.jpg", author: "Berthold Werner", license: "CC BY-SA 4.0" },
  { file: "svc-impresion-digital.jpg", author: "Romain Salomon", license: "CC BY-SA 4.0" },
  { file: "gal-1.jpg", author: "Crave Better Foods", license: "CC BY-SA 4.0" },
  { file: "gal-2.jpg", author: "Adshead & Ramsay", license: "CC BY 4.0" },
  { file: "gal-3.jpg", author: "The terrydactyl", license: "CC BY-SA 4.0" },
  { file: "gal-4.jpg", author: "Ginny", license: "CC BY-SA 2.0" },
  { file: "gal-5.jpg", author: "David Peters", license: "CC BY-SA 3.0" },
  { file: "gal-6.jpg", author: "Subhashish Panigrahi", license: "CC BY-SA 4.0" },
];

/* ————————————————————————————————————————————————
   Clientes — empresas e instituciones del portfolio nacional
   Logotipos reales en /spc/logos/ (sitios oficiales y páginas
   verificadas de cada marca).
———————————————————————————————————————————————— */
export interface Client {
  id: string;
  name: string;
  sector: L;
  city: L;
  /** Ruta del logotipo (png/jpg/svg) dentro de /public */
  logo: string;
  /** true = logo cuadrado con fondo de color (chip de marca) */
  chip?: boolean;
}

export const CLIENTS: Client[] = [
  { id: "inti", name: "Laboratorios INTI", sector: { es: "Farmacéutica", en: "Pharmaceutical" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/inti.png" },
  { id: "bago", name: "Laboratorios Bagó", sector: { es: "Farmacéutica", en: "Pharmaceutical" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/bago.svg" },
  { id: "vita", name: "Laboratorios VITA", sector: { es: "Farmacéutica", en: "Pharmaceutical" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/vita.svg" },
  { id: "cbn", name: "Cervecería Boliviana Nacional", sector: { es: "Alimentos & Bebidas", en: "Food & Beverage" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/cbn.svg" },
  { id: "pil", name: "PIL Andina", sector: { es: "Alimentos & Bebidas", en: "Food & Beverage" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/pil.jpg" },
  { id: "fancesa", name: "FANCESA", sector: { es: "Industria", en: "Industry" }, city: { es: "Sucre", en: "Sucre" }, logo: "/spc/logos/fancesa.jpg", chip: true },
  { id: "bisa", name: "Banco BISA", sector: { es: "Banca", en: "Banking" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/bisa.jpg", chip: true },
  { id: "bnb", name: "Banco Nacional de Bolivia", sector: { es: "Banca", en: "Banking" }, city: { es: "Santa Cruz", en: "Santa Cruz" }, logo: "/spc/logos/bnb.png" },
  { id: "ganadero", name: "Banco Ganadero", sector: { es: "Banca", en: "Banking" }, city: { es: "Santa Cruz", en: "Santa Cruz" }, logo: "/spc/logos/ganadero.svg" },
  { id: "entel", name: "Entel S.A.", sector: { es: "Telecomunicaciones", en: "Telecom" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/entel.png" },
  { id: "tigo", name: "Tigo Bolivia", sector: { es: "Telecomunicaciones", en: "Telecom" }, city: { es: "Santa Cruz", en: "Santa Cruz" }, logo: "/spc/logos/tigo.svg" },
  { id: "ypfb", name: "YPFB", sector: { es: "Energía", en: "Energy" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/ypfb.svg" },
  { id: "boa", name: "Boliviana de Aviación", sector: { es: "Aviación", en: "Aviation" }, city: { es: "Cochabamba", en: "Cochabamba" }, logo: "/spc/logos/boa.svg" },
  { id: "deber", name: "El Deber", sector: { es: "Medios", en: "Media" }, city: { es: "Santa Cruz", en: "Santa Cruz" }, logo: "/spc/logos/deber.png" },
  { id: "larazon", name: "La Razón", sector: { es: "Medios", en: "Media" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/larazon.svg" },
  { id: "santillana", name: "Santillana Bolivia", sector: { es: "Editorial", en: "Publishing" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/santillana.svg" },
  { id: "hoguera", name: "Editorial La Hoguera", sector: { es: "Editorial", en: "Publishing" }, city: { es: "Santa Cruz", en: "Santa Cruz" }, logo: "/spc/logos/hoguera.jpg" },
  { id: "umss", name: "Universidad Mayor de San Simón", sector: { es: "Educación", en: "Education" }, city: { es: "Cochabamba", en: "Cochabamba" }, logo: "/spc/logos/umss.png" },
  { id: "minedu", name: "Ministerio de Educación", sector: { es: "Gobierno", en: "Government" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/minedu.png" },
  { id: "gamlp", name: "Gobierno Autónomo Municipal de La Paz", sector: { es: "Institucional", en: "Institutional" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/gamlp.png" },
  { id: "cni", name: "Cámara Nacional de Industrias", sector: { es: "Gremial", en: "Trade association" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/cni.svg" },
  { id: "cnc", name: "Cámara Nacional de Comercio", sector: { es: "Gremial", en: "Trade association" }, city: { es: "La Paz", en: "La Paz" }, logo: "/spc/logos/cnc.png" },
];

/* ————————————————————————————————————————————————
   Reseñas de clientes
   ⚠️ DRAFT: reemplazar por testimonios reales verificados.
———————————————————————————————————————————————— */
export interface Review {
  quote: L;
  name: string;
  role: L;
  company: L;
  sector: L;
  rating: number;
}

export const REVIEWS: Review[] = [
  {
    quote: {
      es: "Las cajas llegan impecables lote tras lote. El color es idéntico al que aprobamos en la prueba — eso, en farmacéutica, no tiene precio.",
      en: "The boxes arrive flawless batch after batch. The color is identical to the one we approved on the proof — in pharma, that is priceless.",
    },
    name: "Marcela R.",
    role: { es: "Jefe de Compras de Empaques", en: "Packaging Procurement Lead" },
    company: { es: "Laboratorio farmacéutico", en: "Pharmaceutical laboratory" },
    sector: { es: "Farmacéutica", en: "Pharma" },
    rating: 5,
  },
  {
    quote: {
      es: "Campaña de packaging estacional entregada con días de sobra. Puntualidad total y acabados que destacan en góndola frente a marcas importadas.",
      en: "Seasonal packaging campaign delivered with days to spare. Total punctuality and finishes that stand out on the shelf against imported brands.",
    },
    name: "Ricardo M.",
    role: { es: "Gerente de Marca", en: "Brand Manager" },
    company: { es: "Alimentos & Bebidas", en: "Food & Beverage" },
    sector: { es: "Alimentos", en: "Food" },
    rating: 5,
  },
  {
    quote: {
      es: "Nuestros catálogos salen con nivel internacional: papel, color y encuadernación de primer nivel. Los lectores lo notan en cada edición.",
      en: "Our catalogs come out with an international level: paper, color and first-class binding. Readers notice it in every edition.",
    },
    name: "Carolina V.",
    role: { es: "Directora Editorial", en: "Editorial Director" },
    company: { es: "Editorial boliviana", en: "Bolivian publisher" },
    sector: { es: "Editorial", en: "Publishing" },
    rating: 5,
  },
  {
    quote: {
      es: "El portal Web to Print nos ahorra horas cada semana: la papelería de nuestras sucursales se pide en minutos, con la marca siempre perfecta.",
      en: "The Web to Print portal saves us hours every week: our branches' stationery is ordered in minutes, with the brand always perfect.",
    },
    name: "Jorge A.",
    role: { es: "Coordinador de Marketing", en: "Marketing Coordinator" },
    company: { es: "Entidad financiera", en: "Financial institution" },
    sector: { es: "Banca", en: "Banking" },
    rating: 5,
  },
  {
    quote: {
      es: "Imprimieron una publicación institucional de gran formato con una exigencia altísima de calidad y plazos. Cumplieron con precisión de reloj.",
      en: "They printed a large-format institutional publication with extremely demanding quality and deadlines. They delivered with clockwork precision.",
    },
    name: "Unidad de Planificación",
    role: { es: "Coordinación de proyecto editorial", en: "Editorial project coordination" },
    company: { es: "Institución pública", en: "Public institution" },
    sector: { es: "Institucional", en: "Institutional" },
    rating: 5,
  },
];

/* ————————————————————————————————————————————————
   FAQ — base de conocimiento de SPC AI y la sección de preguntas
———————————————————————————————————————————————— */
export interface Faq {
  q: L;
  a: L;
}

export const FAQS: Faq[] = [
  {
    q: {
      es: "¿Cuál es el tiraje mínimo para imprimir?",
      en: "What is the minimum print run?",
    },
    a: {
      es: "Depende de la tecnología: en impresión digital imprimimos desde 1 unidad, ideal para tirajes cortos, pruebas y personalizados. En offset, el punto óptimo empieza alrededor de 500–1.000 unidades según el producto. Si dudas, cuéntanos tu proyecto por WhatsApp y te recomendamos la tecnología más económica para tu cantidad.",
      en: "It depends on the technology: in digital printing we print from 1 unit — ideal for short runs, proofs and personalized pieces. In offset, the sweet spot starts around 500–1,000 units depending on the product. If in doubt, tell us about your project on WhatsApp and we'll recommend the most economical technology for your quantity.",
    },
  },
  {
    q: {
      es: "¿Cuánto tarda la entrega de mi trabajo?",
      en: "How long does delivery take?",
    },
    a: {
      es: "Impresión digital: de 24 a 72 horas. Impresión offset y packaging: entre 7 y 15 días hábiles según acabados y validaciones. Los proyectos con encuadernación especial o troqueles nuevos pueden requerir más tiempo — siempre te confirmamos la fecha antes de iniciar.",
      en: "Digital printing: 24 to 72 hours. Offset and packaging: 7 to 15 business days depending on finishes and validations. Projects with special binding or new dies may take longer — we always confirm the date before starting.",
    },
  },
  {
    q: {
      es: "¿Puedo imprimir con mi propio diseño?",
      en: "Can I print my own design?",
    },
    a: {
      es: "¡Claro! Aceptamos tus archivos listos (PDF de alta resolución preferentemente) y también podemos ayudarte a prepararlos: sangrado, márgenes, perfil de color y líneas de corte. Si aún no tienes diseño, nuestro equipo te asesora para que tu impreso salga profesional.",
      en: "Of course! We accept print-ready files (high-resolution PDF preferably) and can also help you prepare them: bleed, margins, color profile and cut lines. If you don't have a design yet, our team advises you so your piece comes out professional.",
    },
  },
  {
    q: {
      es: "¿Cómo pido una cotización?",
      en: "How do I request a quote?",
    },
    a: {
      es: "Escríbenos por WhatsApp indicando: 1) el producto (caja, revista, bolsas, tarjetas…), 2) cantidad, 3) tamaño, 4) material o acabados que imaginas y 5) si cuentas con diseño. Con esos datos te enviamos una cotización clara, normalmente el mismo día.",
      en: "Message us on WhatsApp with: 1) the product (boxes, magazines, bags, cards…), 2) quantity, 3) size, 4) the materials or finishes you envision and 5) whether you have a design. With those details we send you a clear quote, usually the same day.",
    },
  },
  {
    q: {
      es: "¿Sus empaques son aptos para alimentos y medicamentos?",
      en: "Are your packs food-grade and pharma-safe?",
    },
    a: {
      es: "Sí. Trabajamos con cartones e insumos aptos para contacto con alimentos y producción de baja migración, junto a impresión de alta definición, series y trazabilidad por lote para la industria farmacéutica.",
      en: "Yes. We work with food-contact boards and low-migration production, along with high-definition printing, serial numbers and batch traceability for the pharmaceutical industry.",
    },
  },
  {
    q: {
      es: "¿Qué es el Web to Print?",
      en: "What is Web to Print?",
    },
    a: {
      es: "Es nuestro portal en línea para empresas: tu equipo pide papelería e impresos corporativos desde cualquier ciudad, con plantillas de marca aprobadas y precios preestablecidos. Elimina correos y errores de versión — todo se pide en minutos.",
      en: "It's our online portal for companies: your team orders corporate stationery and print from any city, with approved brand templates and preset prices. It eliminates emails and version errors — everything is ordered in minutes.",
    },
  },
  {
    q: {
      es: "¿Entregan en todo Bolivia?",
      en: "Do you deliver nationwide?",
    },
    a: {
      es: "Sí, despachamos a los nueve departamentos. Coordinamos la logística según tu ciudad y la urgencia del proyecto — muchas entregas salen de nuestra planta en La Paz el mismo día en que terminan.",
      en: "Yes, we ship to all nine departments. We coordinate logistics according to your city and the project's urgency — many deliveries leave our La Paz plant the same day they finish.",
    },
  },
  {
    q: {
      es: "¿Hacen diseño gráfico también?",
      en: "Do you offer graphic design too?",
    },
    a: {
      es: "Contamos con asesoría y desarrollo de diseño para packaging e impresos. Si llegas con la idea, nuestro equipo la convierte en un archivo listo para producción con los estándares técnicos de imprenta.",
      en: "We offer design advice and development for packaging and print. Bring the idea and our team turns it into a production-ready file with professional press standards.",
    },
  },
];
