/**
 * SPC Impresores S.A. — Central brand configuration
 * Single source of truth for contact info, WhatsApp funnel, product data,
 * clients, reviews, FAQs and the SPC AI knowledge base.
 *
 * ⚙️ Para cambiar el número de WhatsApp, edita SOLO `whatsapp.number` aquí.
 * ⚙️ Para actualizar clientes/reseñas reales, edita CLIENTS / REVIEWS aquí.
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
    number: "59177165787",
    display: "+591 77165787",
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
  brief:
    "Hola SPC 👋 Quiero una cotización. Mi proyecto:\n• Producto: \n• Cantidad: \n• Tamaño: \n• Material/acabado: \n• ¿Tengo diseño?: ",
  webToPrint:
    "Hola SPC 👋 Quiero información sobre el *portal Web to Print* para mi empresa.",
} as const;

/* ————————————————————————————————————————————————
   Las 9 líneas de producto de SPC (datos reales de su catálogo)
   + información profunda para las páginas de detalle
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
  title: string;
  description: string;
  image: string;
  /** Fotografía real de producción del sitio original de SPC */
  realPhoto: string;
  category: ServiceCategory;
  categoryLabel: string;
  highlights: string[];
  message: string;
  details: ServiceDetails;
}

export const SERVICES: Service[] = [
  {
    id: "packaging-alimentos",
    title: "Packaging de Alimentos",
    description:
      "Envases y cajas food-grade que protegen tu producto y elevan tu marca en góndola.",
    image: "/spc/packaging-alimentos.jpg",
    realPhoto: "/spc/real-packaging-alimentos.jpg",
    category: "packaging",
    categoryLabel: "Packaging",
    highlights: ["Cartón food-grade", "Impresión offset premium", "Bordes y troquel fino"],
    message: WA_MESSAGES.alimentos,
    details: {
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
  },
  {
    id: "packaging-farmaceutico",
    title: "Packaging Farmacéutico",
    description:
      "Cajas y estuches con la precisión, trazabilidad y estándares que exige la industria.",
    image: "/spc/packaging-farmaceutico.jpg",
    realPhoto: "/spc/real-packaging-farmaceutico.jpg",
    category: "packaging",
    categoryLabel: "Packaging",
    highlights: ["Precisión farmacéutica", "Series y códigos", "Calidad certificada"],
    message: WA_MESSAGES.farmaceutico,
    details: {
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
  },
  {
    id: "packaging-comercial",
    title: "Packaging Comercial y Promocional",
    description:
      "Estuches rígidos, packaging promocional y presentaciones que enamoran al cliente.",
    image: "/spc/packaging-comercial.jpg",
    realPhoto: "/spc/real-packaging-comercial.jpg",
    category: "packaging",
    categoryLabel: "Packaging",
    highlights: ["Estuches rígidos", "Acabados premium", "Laminación y UV"],
    message: WA_MESSAGES.packaging,
    details: {
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
  },
  {
    id: "paper-bags",
    title: "Paper Bags",
    description:
      "Bolsas de papel con asa, en todos los colores y tamaños, que convierten tu marca en experiencia.",
    image: "/spc/paper-bags.jpg",
    realPhoto: "/spc/real-paper-bags.jpg",
    category: "packaging",
    categoryLabel: "Packaging",
    highlights: ["Asas resistentes", "Papeles de color", "Gran volumen"],
    message: WA_MESSAGES.packaging,
    details: {
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
  },
  {
    id: "impresos-comerciales",
    title: "Impresos Comerciales",
    description:
      "Papelería comercial e identidad corporativa con acabados impecables: hojas membretadas, tarjetas y más.",
    image: "/spc/impresos-comerciales.jpg",
    realPhoto: "/spc/real-impresos-comerciales.jpg",
    category: "comercial",
    categoryLabel: "Comercial",
    highlights: ["Identidad corporativa", "Papeles premium", "Definición de color"],
    message: WA_MESSAGES.comercial,
    details: {
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
  },
  {
    id: "libros",
    title: "Libros Emblocados Hotmelt/PUR",
    description:
      "Encuadernación Hotmelt y PUR de alta resistencia para libros que duran generaciones.",
    image: "/spc/libros.jpg",
    realPhoto: "/spc/real-libros.jpg",
    category: "comercial",
    categoryLabel: "Comercial",
    highlights: ["Encuadernación PUR", "Lomos cuadrados", "Tirajes largos"],
    message: WA_MESSAGES.books,
    details: {
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
  },
  {
    id: "revistas",
    title: "Revistas y Catálogos",
    description:
      "Publicaciones periódicas y catálogos con papel, color y encuadernación de primer nivel.",
    image: "/spc/revistas.jpg",
    realPhoto: "/spc/real-revistas.jpg",
    category: "comercial",
    categoryLabel: "Comercial",
    highlights: ["Calidad editorial", "Cosido y encolado", "Distribución nacional"],
    message: WA_MESSAGES.comercial,
    details: {
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
  },
  {
    id: "calendarios",
    title: "Calendarios",
    description:
      "Calendarios de escritorio y pared que ponen tu marca frente a tu cliente los 365 días del año.",
    image: "/spc/calendarios.jpg",
    realPhoto: "/spc/real-calendarios.jpg",
    category: "comercial",
    categoryLabel: "Comercial",
    highlights: ["Diseños personalizados", "Espiral y taco", "Campaña anual"],
    message: WA_MESSAGES.comercial,
    details: {
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
  },
  {
    id: "impresion-digital",
    title: "Impresión Digital",
    description:
      "Impresión digital bajo demanda: tirajes cortos, entregas rápidas y personalización variable.",
    image: "/spc/impresion-digital.jpg",
    realPhoto: "/spc/real-impresion-digital.jpg",
    category: "digital",
    categoryLabel: "Digital",
    highlights: ["Bajo demanda", "Datos variables", "Entrega express"],
    message: WA_MESSAGES.digital,
    details: {
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
  },
];

/* ————————————————————————————————————————————————
   Industrias servidas (sección educativa)
———————————————————————————————————————————————— */
export interface Industry {
  id: string;
  name: string;
  icon: "food" | "pharma" | "retail" | "editorial" | "gov";
  tagline: string;
  description: string;
  products: string[];
  insight: string;
  message: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "alimentos",
    name: "Alimentos & Bebidas",
    icon: "food",
    tagline: "Tu producto, imparable en góndola",
    description:
      "Cajas, bandejas y envolturas food-grade para marcas que compiten por atención en el punto de venta, con la seguridad de insumos aptos para contacto con alimentos.",
    products: ["Cajas plegadizas", "Bandejas", "Envolturas", "Sleeves promocionales"],
    insight:
      "En góndola tienes 2,6 segundos de atención: el color y el acabado de tu caja deciden si el cliente te elige o elige al de al lado.",
    message: WA_MESSAGES.alimentos,
  },
  {
    id: "farmaceutica",
    name: "Farmacéutica & Salud",
    icon: "pharma",
    tagline: "Precisión que prescribe confianza",
    description:
      "Estuches e insertos con trazabilidad lote a lote, series y acabados listos para líneas de envase automatizadas de laboratorios e instituciones de salud.",
    products: ["Estuches de medicamentos", "Insertos y prospectos", "Estuches para dispositivos", "Series y códigos"],
    insight:
      "Un estuche farmacéutico no solo informa: debe correr limpio a alta velocidad en la línea de envase. Calibramos cada desarrollo para que tu producción no se detenga.",
    message: WA_MESSAGES.farmaceutico,
  },
  {
    id: "retail",
    name: "Retail & Promoción",
    icon: "retail",
    tagline: "Marcas que se regalan solas",
    description:
      "Bolsas de papel, estuches rígidos y exhibidores que convierten cada compra en una experiencia de marca y cada campaña en una conversación.",
    products: ["Paper bags", "Estuches rígidos", "Displays y exhibidores", "Kits corporativos"],
    insight:
      "La bolsa de papel es publicidad ambulante: cada cliente que camina con tu bolsa por la ciudad te regala impresiones gratis.",
    message: WA_MESSAGES.packaging,
  },
  {
    id: "editorial",
    name: "Editorial & Publicaciones",
    icon: "editorial",
    tagline: "Historias bien encuadernadas",
    description:
      "Libros, revistas y catálogos con encuadernación Hotmelt/PUR, cosido editorial y selección de papel por secciones para editoriales, universidades y empresas.",
    products: ["Libros emblocados", "Revistas y catálogos", "Anuarios", "Memorias institucionales"],
    insight:
      "El papel de una portada dice tanto como su título: un 250 g laminado mate se percibe como libro de colección antes de leer la primera página.",
    message: WA_MESSAGES.books,
  },
  {
    id: "instituciones",
    name: "Instituciones & Gobierno",
    icon: "gov",
    tagline: "Proyectos que quedan en la historia",
    description:
      "Publicaciones oficiales, atlas, informes y campañas institucionales con la puntualidad y confidencialidad que exigen los proyectos públicos.",
    products: ["Publicaciones oficiales", "Atlas e informes", "Campañas institucionales", "Papelería fiscal"],
    insight:
      "Los proyectos institucionales se miden en hitos: entrega puntual, depósito legal y calidad constante — compromisos que cumplimos lote a lote.",
    message: WA_MESSAGES.general,
  },
];

/* ————————————————————————————————————————————————
   Clientes — empresas e instituciones del portfolio nacional
   Logotipos reales en /spc/logos/ (sitios oficiales y páginas
   verificadas de cada marca).
———————————————————————————————————————————————— */
export interface Client {
  id: string;
  name: string;
  sector: string;
  city: string;
  /** Ruta del logotipo (png/jpg/svg) dentro de /public */
  logo: string;
  /** true = logo cuadrado con fondo de color (chip de marca) */
  chip?: boolean;
}

export const CLIENTS: Client[] = [
  { id: "inti", name: "Laboratorios INTI", sector: "Farmacéutica", city: "La Paz", logo: "/spc/logos/inti.png" },
  { id: "bago", name: "Laboratorios Bagó", sector: "Farmacéutica", city: "La Paz", logo: "/spc/logos/bago.svg" },
  { id: "vita", name: "Laboratorios VITA", sector: "Farmacéutica", city: "La Paz", logo: "/spc/logos/vita.svg" },
  { id: "cbn", name: "Cervecería Boliviana Nacional", sector: "Alimentos & Bebidas", city: "La Paz", logo: "/spc/logos/cbn.svg" },
  { id: "pil", name: "PIL Andina", sector: "Alimentos & Bebidas", city: "La Paz", logo: "/spc/logos/pil.jpg" },
  { id: "fancesa", name: "FANCESA", sector: "Industria", city: "Sucre", logo: "/spc/logos/fancesa.jpg", chip: true },
  { id: "bisa", name: "Banco BISA", sector: "Banca", city: "La Paz", logo: "/spc/logos/bisa.jpg", chip: true },
  { id: "ganadero", name: "Banco Ganadero", sector: "Banca", city: "Santa Cruz", logo: "/spc/logos/ganadero.svg" },
  { id: "entel", name: "Entel S.A.", sector: "Telecomunicaciones", city: "La Paz", logo: "/spc/logos/entel.png" },
  { id: "tigo", name: "Tigo Bolivia", sector: "Telecomunicaciones", city: "Santa Cruz", logo: "/spc/logos/tigo.svg" },
  { id: "deber", name: "El Deber", sector: "Medios", city: "Santa Cruz", logo: "/spc/logos/deber.png" },
  { id: "santillana", name: "Santillana Bolivia", sector: "Editorial", city: "La Paz", logo: "/spc/logos/santillana.svg" },
  { id: "hoguera", name: "Editorial La Hoguera", sector: "Editorial", city: "Santa Cruz", logo: "/spc/logos/hoguera.jpg" },
  { id: "gamlp", name: "Gobierno Autónomo Municipal de La Paz", sector: "Institucional", city: "La Paz", logo: "/spc/logos/gamlp.png" },
  { id: "cni", name: "Cámara Nacional de Industrias", sector: "Gremial", city: "La Paz", logo: "/spc/logos/cni.svg" },
];

/* ————————————————————————————————————————————————
   Reseñas de clientes
   ⚠️ DRAFT: reemplazar por testimonios reales verificados.
———————————————————————————————————————————————— */
export interface Review {
  quote: string;
  name: string;
  role: string;
  company: string;
  sector: string;
  rating: number;
}

export const REVIEWS: Review[] = [
  {
    quote:
      "Las cajas llegan impecables lote tras lote. El color es idéntico al que aprobamos en la prueba — eso, en farmacéutica, no tiene precio.",
    name: "Marcela R.",
    role: "Jefe de Compras de Empaques",
    company: "Laboratorio farmacéutico",
    sector: "Farmacéutica",
    rating: 5,
  },
  {
    quote:
      "Campaña de packaging estacional entregada con días de sobra. Puntualidad total y acabados que destacan en góndola frente a marcas importadas.",
    name: "Ricardo M.",
    role: "Gerente de Marca",
    company: "Alimentos & Bebidas",
    sector: "Alimentos",
    rating: 5,
  },
  {
    quote:
      "Nuestros catálogos salen con nivel internacional: papel, color y encuadernación de primer nivel. Los lectores lo notan en cada edición.",
    name: "Carolina V.",
    role: "Directora Editorial",
    company: "Editorial boliviana",
    sector: "Editorial",
    rating: 5,
  },
  {
    quote:
      "El portal Web to Print nos ahorra horas cada semana: la papelería de nuestras sucursales se pide en minutos, con la marca siempre perfecta.",
    name: "Jorge A.",
    role: "Coordinador de Marketing",
    company: "Entidad financiera",
    sector: "Banca",
    rating: 5,
  },
  {
    quote:
      "Imprimieron una publicación institucional de gran formato con una exigencia altísima de calidad y plazos. Cumplieron con precisión de reloj.",
    name: "Unidad de Planificación",
    role: "Coordinación de proyecto editorial",
    company: "Institución pública",
    sector: "Institucional",
    rating: 5,
  },
];

/* ————————————————————————————————————————————————
   FAQ — base de conocimiento de SPC AI y la sección de preguntas
———————————————————————————————————————————————— */
export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "¿Cuál es el tiraje mínimo para imprimir?",
    a: "Depende de la tecnología: en impresión digital imprimimos desde 1 unidad, ideal para tirajes cortos, pruebas y personalizados. En offset, el punto óptimo empieza alrededor de 500–1.000 unidades según el producto. Si dudas, cuéntanos tu proyecto por WhatsApp y te recomendamos la tecnología más económica para tu cantidad.",
  },
  {
    q: "¿Cuánto tarda la entrega de mi trabajo?",
    a: "Impresión digital: de 24 a 72 horas. Impresión offset y packaging: entre 7 y 15 días hábiles según acabados y validaciones. Los proyectos con encuadernación especial o troqueles nuevos pueden requerir más tiempo — siempre te confirmamos la fecha antes de iniciar.",
  },
  {
    q: "¿Puedo imprimir con mi propio diseño?",
    a: "¡Claro! Aceptamos tus archivos listos (PDF de alta resolución preferentemente) y también podemos ayudarte a prepararlos: sangrado, márgenes, perfil de color y líneas de corte. Si aún no tienes diseño, nuestro equipo te asesora para que tu impreso salga profesional.",
  },
  {
    q: "¿Cómo pido una cotización?",
    a: "Escríbenos por WhatsApp indicando: 1) el producto (caja, revista, bolsas, tarjetas…), 2) cantidad, 3) tamaño, 4) material o acabados que imaginas y 5) si cuentas con diseño. Con esos datos te enviamos una cotización clara, normalmente el mismo día.",
  },
  {
    q: "¿Sus empaques son aptos para alimentos y medicamentos?",
    a: "Sí. Trabajamos con cartones e insumos aptos para contacto con alimentos y producción de baja migración, junto a impresión de alta definición, series y trazabilidad por lote para la industria farmacéutica.",
  },
  {
    q: "¿Qué es el Web to Print?",
    a: "Es nuestro portal en línea para empresas: tu equipo pide papelería e impresos corporativos desde cualquier ciudad, con plantillas de marca aprobadas y precios preestablecidos. Elimina correos y errores de versión — todo se pide en minutos.",
  },
  {
    q: "¿Entregan en todo Bolivia?",
    a: "Sí, despachamos a los nueve departamentos. Coordinamos la logística según tu ciudad y la urgencia del proyecto — muchas entregas salen de nuestra planta en La Paz el mismo día en que terminan.",
  },
  {
    q: "¿Hacen diseño gráfico también?",
    a: "Contamos con asesoría y desarrollo de diseño para packaging e impresos. Si llegas con la idea, nuestro equipo la convierte en un archivo listo para producción con los estándares técnicos de imprenta.",
  },
];
