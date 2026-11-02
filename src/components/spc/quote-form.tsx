"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Minus, Plus, CalendarDays, MapPin, User, Package, MessageSquareText } from "lucide-react";
import { Reveal } from "./reveal";
import { Magnetic } from "./magnetic";
import { WhatsAppIcon } from "./whatsapp-button";
import { SpcMark } from "./logo";
import { useLang } from "./lang";
import { SERVICES, SPC, waLink, pick } from "@/lib/spc";
import { cn } from "@/lib/utils";

/* ——— Ciudades de entrega (los 9 departamentos + El Alto) ——— */
const CITIES = [
  "La Paz",
  "El Alto",
  "Santa Cruz",
  "Cochabamba",
  "Sucre",
  "Oruro",
  "Potosí",
  "Tarija",
  "Trinidad",
  "Cobija",
];

/* ——— Paso inteligente según la cantidad ——— */
function stepFor(q: number) {
  if (q < 100) return 25;
  if (q < 1000) return 100;
  return 500;
}

/**
 * QuoteForm — CTA de cotización estilo “reserva” con vista previa
 * en vivo del mensaje de WhatsApp. El embudo termina en wa.me con
 * los datos estructurados del proyecto.
 */
export function QuoteForm({ preselect }: { preselect?: string }) {
  const [product, setProduct] = useState(preselect ?? SERVICES[0].id);
  const [qty, setQty] = useState(1000);
  const [date, setDate] = useState("");
  const [city, setCity] = useState("La Paz");
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const reduce = useReducedMotion();
  const { lang } = useLang();

  const service = SERVICES.find((s) => s.id === product) ?? SERVICES[0];

  const T = {
    product: { es: "Producto", en: "Product" },
    other: { es: "Otro proyecto (lo describo abajo)", en: "Other project (I describe it below)" },
    qty: { es: "Cantidad aproximada", en: "Approximate quantity" },
    qtyHint: {
      es: "¿Cuántas unidades? Aproximado está perfecto — el asesor ajusta el tiraje óptimo.",
      en: "How many units? An approximation is fine — the advisor fine-tunes the optimal run.",
    },
    qtyAria: { es: "Cantidad en unidades", en: "Quantity in units" },
    minus: { es: "Reducir cantidad", en: "Decrease quantity" },
    plus: { es: "Aumentar cantidad", en: "Increase quantity" },
    date: { es: "Fecha ideal (opcional)", en: "Ideal date (optional)" },
    city: { es: "Ciudad de entrega", en: "Delivery city" },
    name: { es: "Nombre / Empresa (opcional)", en: "Name / Company (optional)" },
    namePh: { es: "¿Cómo te llamas?", en: "What's your name?" },
    comments: { es: "Comentarios (opcional)", en: "Comments (optional)" },
    commentsPh: {
      es: "Tamaño, material, acabados, si tienes diseño…",
      en: "Size, material, finishes, whether you have a design…",
    },
    submit: { es: "CONTINUAR EN WHATSAPP", en: "CONTINUE ON WHATSAPP" },
    submitAria: { es: "Continuar la cotización en WhatsApp", en: "Continue the quote on WhatsApp" },
    footnote: {
      es: "Tu cotización avanza cuando nuestro equipo te responde por WhatsApp.",
      en: "Your quote moves forward the moment our team replies on WhatsApp.",
    },
    online: { es: "En línea", en: "Online" },
    preview: {
      es: "Vista previa en vivo · así llegará tu mensaje",
      en: "Live preview · this is how your message will arrive",
    },
    replyBubble: {
      es: (cat: string) => (<>¡Hola! 🙌 Recibimos tu proyecto de <strong className="text-white">{cat}</strong>. Un asesor te responde en minutos con la cotización.</>),
      en: (cat: string) => (<>Hi there! 🙌 We received your <strong className="text-white">{cat}</strong> project. An advisor will reply within minutes with your quote.</>),
    },
    realPhoto: { es: "Fotografía real de producción SPC", en: "Real SPC production photo" },
    suggestedRun: { es: "tiraje sugerido desde", en: "suggested run from" },
  };

  /* Mensaje estructurado (formato estable, enviado al equipo en español) */
  const message = useMemo(() => {
    const lines = [
      "Hola SPC 👋 Quiero cotizar un proyecto:",
      "",
      `Producto: ${pick(service.title, lang)}`,
      `Cantidad: ${qty.toLocaleString("es-BO")}`,
      date ? `Fecha ideal de entrega: ${date.split("-").reverse().join("/")}` : null,
      `Ciudad de entrega: ${city}`,
      name ? `Nombre / Empresa: ${name}` : null,
      comments ? `Comentarios: ${comments}` : null,
      "",
      "¡Gracias!",
    ].filter((l): l is string => l !== null);
    return lines.join("\n");
  }, [service, lang, qty, date, city, name, comments]);

  const step = stepFor(qty);

  const fieldCls =
    "h-12 w-full rounded-xl border border-white/12 bg-white/[0.055] px-4 text-[15px] font-medium text-white outline-none transition-all duration-200 placeholder:text-white/35 hover:border-white/25 focus:border-[#3F6CC0]/70 focus:bg-white/[0.08] focus:ring-2 focus:ring-[#3F6CC0]/30 [color-scheme:dark]";
  const labelCls =
    "mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/50";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr] lg:gap-8">
      {/* ——— Columna izquierda: formulario ——— */}
      <Reveal>
        <form
          className="flex flex-col gap-5"
          key={lang}
          onSubmit={(e) => {
            e.preventDefault();
            window.open(waLink(message), "_blank", "noopener,noreferrer");
          }}
        >
          {/* Producto */}
          <div>
            <label htmlFor="qf-product" className={labelCls}>
              <Package className="h-3.5 w-3.5 text-[#8FB0E8]" />
              {T.product[lang]}
            </label>
            <select
              id="qf-product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className={cn(fieldCls, "cursor-pointer appearance-none")}
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#0A1428]">
                  {pick(s.title, lang)}
                </option>
              ))}
              <option value="otro" className="bg-[#0A1428]">
                {T.other[lang]}
              </option>
            </select>
          </div>

          {/* Cantidad con stepper */}
          <div>
            <span className={labelCls}>
              <Package className="h-3.5 w-3.5 text-[#8FB0E8]" />
              {T.qty[lang]}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={T.minus[lang]}
                onClick={() => setQty((q) => Math.max(1, q - step))}
                className="btn-press flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/[0.055] text-white/80 transition-all hover:border-white/30 hover:bg-white/[0.1] hover:text-white"
              >
                <Minus className="h-4.5 w-4.5" />
              </button>
              <input
                type="text"
                inputMode="numeric"
                aria-label={T.qtyAria[lang]}
                value={qty.toLocaleString(lang === "es" ? "es-BO" : "en-US")}
                onChange={(e) => {
                  const n = parseInt(e.target.value.replace(/[^\d]/g, ""), 10);
                  setQty(Number.isFinite(n) && n > 0 ? Math.min(n, 10_000_000) : 1);
                }}
                className={cn(fieldCls, "text-center text-lg font-bold tabular-nums")}
              />
              <button
                type="button"
                aria-label={T.plus[lang]}
                onClick={() => setQty((q) => Math.min(q + step, 10_000_000))}
                className="btn-press flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/[0.055] text-white/80 transition-all hover:border-white/30 hover:bg-white/[0.1] hover:text-white"
              >
                <Plus className="h-4.5 w-4.5" />
              </button>
            </div>
            <p className="mt-2 text-[12px] text-white/40">{T.qtyHint[lang]}</p>
          </div>

          {/* Fecha + Ciudad */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="qf-date" className={labelCls}>
                <CalendarDays className="h-3.5 w-3.5 text-[#8FB0E8]" />
                {T.date[lang]}
              </label>
              <input
                id="qf-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={fieldCls}
              />
            </div>
            <div>
              <label htmlFor="qf-city" className={labelCls}>
                <MapPin className="h-3.5 w-3.5 text-[#8FB0E8]" />
                {T.city[lang]}
              </label>
              <select
                id="qf-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={cn(fieldCls, "cursor-pointer appearance-none")}
              >
                {CITIES.map((c) => (
                  <option key={c} value={c} className="bg-[#0A1428]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Nombre */}
          <div>
            <label htmlFor="qf-name" className={labelCls}>
              <User className="h-3.5 w-3.5 text-[#8FB0E8]" />
              {T.name[lang]}
            </label>
            <input
              id="qf-name"
              type="text"
              value={name}
              maxLength={80}
              autoComplete="name"
              placeholder={T.namePh[lang]}
              onChange={(e) => setName(e.target.value)}
              className={fieldCls}
            />
          </div>

          {/* Comentarios */}
          <div>
            <label htmlFor="qf-comments" className={labelCls}>
              <MessageSquareText className="h-3.5 w-3.5 text-[#8FB0E8]" />
              {T.comments[lang]}
            </label>
            <textarea
              id="qf-comments"
              value={comments}
              maxLength={400}
              rows={3}
              placeholder={T.commentsPh[lang]}
              onChange={(e) => setComments(e.target.value)}
              className={cn(fieldCls, "h-auto resize-none py-3.5 leading-relaxed")}
            />
          </div>

          {/* CTA principal */}
          <Magnetic strength={0.18} className="mt-1 w-full">
            <button
              type="submit"
              className="wa-btn btn-press group flex h-16 w-full items-center justify-center gap-3 rounded-full text-lg font-bold text-white"
              aria-label={T.submitAria[lang]}
            >
              <WhatsAppIcon className="h-6.5 w-6.5 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
              {T.submit[lang]}
            </button>
          </Magnetic>
          <p className="text-center text-[13px] text-white/45">{T.footnote[lang]}</p>
        </form>
      </Reveal>

      {/* ——— Columna derecha: vista previa en vivo del mensaje ——— */}
      <Reveal delay={0.15}>
        <motion.div
          className="gloss-dark relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10"
          whileHover={reduce ? undefined : { y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Header del chat */}
          <div className="relative flex items-center gap-3 border-b border-white/8 bg-[#0D1B33]/80 px-5 py-4">
            <SpcMark className="h-11 w-11 rounded-full ring-2 ring-white/15" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-bold text-white">{SPC.whatsapp.displayName}</p>
              <p className="text-[12px] font-medium text-[#8FB0E8]">
                {lang === "es" ? "La Paz" : "La Paz"} · {SPC.whatsapp.display}
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-[#25D366]/25 bg-[#25D366]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#4BE38A]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#25D366]" />
              {T.online[lang]}
            </span>
          </div>

          {/* Cuerpo con fondo estilo WhatsApp */}
          <div
            className="flex flex-1 flex-col gap-2.5 px-5 py-6"
            style={{
              backgroundColor: "#0B1420",
              backgroundImage:
                "radial-gradient(rgba(63,108,192,0.08) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          >
            <p className="mx-auto mb-1 max-w-[90%] rounded-lg bg-white/[0.06] px-3 py-1.5 text-center text-[11px] font-medium text-white/50">
              {T.preview[lang]}
            </p>

            {/* Burbuja del usuario (verde WhatsApp) */}
            <div className="relative ml-auto max-w-[92%] rounded-2xl rounded-tr-md bg-gradient-to-br from-[#1FA855] to-[#128C7E] px-4 py-3 shadow-[0_10px_24px_-10px_rgba(18,140,126,0.6)]">
              <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-white">
                {message}
              </p>
              <span className="mt-1.5 flex items-center justify-end gap-1 text-[10.5px] text-white/70">
                {new Date().toLocaleTimeString(lang === "es" ? "es-BO" : "en-US", { hour: "2-digit", minute: "2-digit" })}
                <svg viewBox="0 0 16 12" className="h-3 w-4 fill-current" aria-hidden>
                  <path d="M12 6l-1.5 3L2 4l8.5-1z" opacity=".9" />
                  <path d="M11.2 3.4l1.3.3L14 7l-1.2 2.6-2.1-1z" />
                </svg>
              </span>
            </div>

            {/* Burbuja de respuesta del asesor */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mr-auto max-w-[86%] rounded-2xl rounded-tl-md border border-white/8 bg-white/[0.07] px-4 py-2.5 text-[13px] leading-relaxed text-white/80"
            >
              {T.replyBubble[lang](pick(service.categoryLabel, lang).toLowerCase())}
            </motion.div>
          </div>

          {/* Pie con mini-imagen del producto elegido */}
          <div className="flex items-center gap-3.5 border-t border-white/8 bg-[#0D1B33]/80 px-5 py-3.5">
            <span className="relative h-11 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10">
              <Image
                src={service.realPhoto}
                alt={`${T.realPhoto[lang]}: ${pick(service.title, lang)}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-semibold text-white/85">
                {pick(service.title, lang)}
              </p>
              <p className="text-[11px] text-white/45">
                {T.realPhoto[lang]} · {T.suggestedRun[lang]}{" "}
                {pick(service.details, lang).specs[0]?.value.split("·")[0] ?? "—"}
              </p>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </div>
  );
}
