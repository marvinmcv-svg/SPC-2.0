"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, BookText, Zap, Palette, ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { WhatsAppButton } from "./whatsapp-button";
import { WA_MESSAGES } from "@/lib/spc";

const TECHS = [
  {
    icon: Gauge,
    name: "Offset de precisión",
    desc: "Impresión offset de alta rotación para tirajes medianos y grandes: color consistente lote a lote, tintas Pantone, barnices y acabados que el digital no alcanza.",
    tag: "Tiraje alto",
  },
  {
    icon: BookText,
    name: "Encuadernación Hotmelt / PUR",
    desc: "Líneas de emblocado con encolado PUR — el más resistente de la industria — para libros, revistas y catálogos con lomos cuadrados perfectos.",
    tag: "Editorial",
  },
  {
    icon: Zap,
    name: "Digital bajo demanda",
    desc: "Del archivo a la máquina sin planchas: tirajes cortos, entregas en 24–72 h y datos variables para personalizar cada pieza.",
    tag: "Tiraje corto",
  },
  {
    icon: Palette,
    name: "Control de color extremo a extremo",
    desc: "Calibración y pruebas de color estandarizadas para que tu marca se vea exactamente igual en la primera y en la millonésima caja.",
    tag: "Calidad",
  },
];

/** Umbral orientativo digital → offset */
const THRESHOLD = 350;

function fmt(n: number) {
  return n.toLocaleString("es-BO");
}

/**
 * Tecnología + educador interactivo "¿Offset o Digital?".
 */
export function Technology() {
  const [qty, setQty] = useState(600);

  const verdict = useMemo(() => {
    if (qty < THRESHOLD) {
      return {
        tech: "Impresión Digital",
        why: "Tiraje corto: sin planchas ni montajes, cada pieza sale directo del archivo. Entregas en 24–72 h y personalización pieza a pieza.",
        color: "#00AEEF",
      };
    }
    return {
      tech: "Impresión Offset",
      why: "A partir de cierto volumen, el costo por unidad cae: el costo fijo de planchas se diluye entre miles de piezas idénticas con color perfecto.",
      color: "#27519B",
    };
  }, [qty]);

  return (
    <section id="tecnologia" className="grain relative overflow-hidden bg-[#0A1428] py-24 sm:py-32">
      {/* Fondos premium */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_0%,rgba(63,108,192,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_100%,rgba(17,9,91,0.55),transparent_60%)]" />
      <svg
        className="absolute left-[5%] bottom-[18%] hidden h-9 w-9 text-white/10 lg:block"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
      >
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
        <path d="M20 2v36M2 20h36" stroke="currentColor" strokeWidth="1.4" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8FB0E8] backdrop-blur-md">
              Tecnología & calidad
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-tight text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Tres tecnologías,{" "}
              <span className="font-serif font-normal italic text-silver">una sola decisión correcta</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/65">
              No existe “la mejor” tecnología de impresión — existe la correcta para tu tiraje,
              tu plazo y tu presupuesto. Nuestra planta combina offset, encuadernación industrial
              y digital para elegir siempre la más conveniente para ti.
            </p>
          </Reveal>
        </div>

        {/* Tarjetas de tecnología */}
        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {TECHS.map((t) => (
            <StaggerItem key={t.name}>
              <article className="gloss-card gloss-dark group h-full rounded-[24px] p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.08] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-rotate-6 group-hover:scale-105">
                    <t.icon className="h-5 w-5 text-[#8FB0E8]" />
                  </span>
                  <span className="rounded-full border border-[#3F6CC0]/30 bg-[#3F6CC0]/[0.12] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#A9C3EE]">
                    {t.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-[16.5px] font-bold leading-tight text-white">{t.name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/55">{t.desc}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* ——— Educador interactivo: ¿Offset o Digital? ——— */}
        <Reveal delay={0.1}>
          <div className="mt-16 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] backdrop-blur-xl">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              {/* Slider */}
              <div className="p-7 sm:p-9">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8FB0E8]">
                  Educador interactivo
                </p>
                <h3 className="display-tight mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                  ¿Offset o digital para tu tiraje?
                </h3>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/60">
                  Mueve el control y descubre qué tecnología conviene a tu proyecto — y por qué.
                </p>

                <div className="mt-8">
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="qty-slider" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/50">
                      Cantidad de piezas
                    </label>
                    <motion.span
                      key={qty}
                      initial={{ scale: 1.08, color: "#ffffff" }}
                      animate={{ scale: 1, color: "#BFD4F5" }}
                      className="text-2xl font-extrabold tabular-nums text-white"
                    >
                      {fmt(qty)}
                    </motion.span>
                  </div>
                  <Slider
                    id="qty-slider"
                    value={[qty]}
                    onValueChange={([v]) => setQty(v)}
                    min={50}
                    max={20000}
                    step={50}
                    className="mt-4 [&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-[#00AEEF] [&_[data-slot=slider-range]]:to-[#3F6CC0] [&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-6 [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-[#3F6CC0] [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:shadow-[0_8px_20px_-6px_rgba(63,108,192,0.8)]"
                    aria-label="Cantidad de piezas a imprimir"
                  />
                  <div className="mt-2 flex justify-between text-[11px] font-medium tabular-nums text-white/35">
                    <span>50</span>
                    <span>10.000</span>
                    <span>20.000</span>
                  </div>
                </div>
              </div>

              {/* Veredicto */}
              <div className="relative flex flex-col justify-center border-t border-white/10 bg-[#0C1526]/60 p-7 sm:p-9 lg:border-l lg:border-t-0">
                <div
                  className="pointer-events-none absolute inset-0 transition-colors duration-500"
                  style={{ background: `radial-gradient(80% 90% at 50% 0%, ${verdict.color}26, transparent 70%)` }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={verdict.tech}
                    initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                    transition={{ type: "spring", stiffness: 160, damping: 20 }}
                    className="relative"
                  >
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/45">
                      Nuestra recomendación
                    </p>
                    <p className="display-tight mt-2 text-3xl font-extrabold text-white">
                      {verdict.tech}
                    </p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">{verdict.why}</p>
                  </motion.div>
                </AnimatePresence>
                <a
                  href={
                    verdict.tech === "Impresión Digital" ? "#productos" : "#productos"
                  }
                  className="btn-press group/cta relative mt-6 inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/[0.1] px-6 text-[14px] font-semibold text-[#4BE38A] backdrop-blur-md transition-all duration-300 hover:border-[#25D366]/60 hover:bg-[#25D366]/[0.18] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                  onClick={undefined}
                  aria-label="Explorar productos con esta recomendación"
                >
                  Explorar productos
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA de asesoría */}
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-white/55">
              La elección correcta puede ahorrarte hasta un 40% en tu proyecto.{" "}
              <strong className="font-semibold text-white/80">Te asesoramos gratis</strong> antes de
              imprimir una sola pieza.
            </p>
            <WhatsAppButton message={WA_MESSAGES.general} size="md">
              Pedir asesoría técnica gratis
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
