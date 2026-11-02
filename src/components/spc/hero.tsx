"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowDown, Layers, Sparkles } from "lucide-react";
import { WhatsAppButton } from "./whatsapp-button";
import { ServicesCarousel } from "./services-carousel";
import { CountUp } from "./count-up";
import { Magnetic } from "./magnetic";
import { WA_MESSAGES, SPC, pick } from "@/lib/spc";
import { useLang } from "./lang";

/** Revelado palabra por palabra — spring + blur, estilo keynote */
const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};
const wordItem: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(14px)", rotateX: -40 },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    rotateX: 0,
    transition: { type: "spring", stiffness: 90, damping: 16, mass: 1 },
  },
};

function RevealWords({
  text,
  className,
  wordClassName,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  return (
    <motion.span
      variants={wordContainer}
      initial="hidden"
      animate="show"
      className={className}
      style={{ perspective: 600 }}
    >
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          variants={wordItem}
          className={`inline-block will-change-transform ${wordClassName ?? ""}`}
        >
          {w}
          {i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

/** Puntos CMYK — firma visual de imprenta */
export function CmykDots({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-hidden>
      <i className="h-2 w-2 rounded-full bg-[#00AEEF] shadow-[0_0_8px_rgba(0,174,239,0.7)]" />
      <i className="h-2 w-2 rounded-full bg-[#EC008C] shadow-[0_0_8px_rgba(236,0,140,0.7)]" />
      <i className="h-2 w-2 rounded-full bg-[#FFCF00] shadow-[0_0_8px_rgba(255,207,0,0.7)]" />
      <i className="h-2 w-2 rounded-full bg-[#39435C] shadow-[0_0_8px_rgba(57,67,92,0.7)]" />
    </span>
  );
}

/** Abre el widget de SPC AI (evento custom global) */
export function openSpcAi() {
  window.dispatchEvent(new CustomEvent("spc-ai:open"));
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { lang } = useLang();

  const T = {
    badge: {
      es: `Líderes de la industria gráfica en Bolivia · desde ${SPC.founded}`,
      en: `Leaders of Bolivia's graphics industry · since ${SPC.founded}`,
    },
    h1a: { es: "Imprimiendo", en: "Printing" },
    h1b: { es: "lo mejor", en: "the best" },
    h1c: { es: "de Bolivia", en: "of Bolivia" },
    sub: {
      es: "Packaging, impresión comercial y digital con tecnología de punta, insumos de primera calidad y el factor humano que marca la diferencia.",
      en: "Packaging, commercial and digital printing with cutting-edge technology, first-class supplies and the human factor that makes the difference.",
    },
    ctaWa: { es: "Cotiza tu proyecto por WhatsApp", en: "Quote your project on WhatsApp" },
    ctaExplore: { es: "Explorar productos", en: "Explore products" },
    spencerAsk: { es: "¿Dudas? Pregunta a", en: "Questions? Ask" },
    new: { es: "nuevo", en: "new" },
    stats: {
      es: [
        { v: 24, suffix: "+", l: "años de trayectoria" },
        { v: 9, suffix: "", l: "líneas de producto" },
        { v: 3, suffix: "", l: "grandes tecnologías" },
      ],
      en: [
        { v: 24, suffix: "+", l: "years of track record" },
        { v: 9, suffix: "", l: "product lines" },
        { v: 3, suffix: "", l: "core technologies" },
      ],
    },
    scroll: { es: "Descubre SPC", en: "Discover SPC" },
    scrollAria: { es: "Bajar a la siguiente sección", en: "Scroll to the next section" },
  };

  // Parallax de scroll: fondo zoom, contenido sube
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-[#0A1428]"
      aria-label={pick(SPC.slogan, lang)}
    >
      {/* Fondo cinematográfico */}
      <motion.div style={reduce ? undefined : { y: bgY, scale: bgScale }} className="absolute inset-0">
        <Image
          src="/spc/hero-roller.png"
          alt={
            lang === "es"
              ? "Rodillos de impresión offset de precisión en la planta de SPC"
              : "Precision offset printing rollers at SPC's plant"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      {/* Capas de material: gradiente navy + viñeta */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1428]/92 via-[#11095B]/72 to-[#0A1428]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_18%_10%,rgba(63,108,192,0.28),transparent_55%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A1428] to-transparent" />

      {/* Marca de registro (decoración de imprenta) */}
      <svg
        className="absolute right-[7%] top-[16%] hidden h-10 w-10 text-white/20 lg:block"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
      >
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
        <path d="M20 2v36M2 20h36" stroke="currentColor" strokeWidth="1.4" />
      </svg>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-6 lg:pt-36"
      >
        {/* ——— Columna de texto (re-anima al cambiar idioma) ——— */}
        <div className="lg:pr-4" key={lang}>
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 110, damping: 20, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 backdrop-blur-md"
          >
            <CmykDots />
            <span className="text-[13px] font-medium tracking-wide text-white/85">{T.badge[lang]}</span>
          </motion.div>

          <h1 className="display-tight text-[13vw] font-extrabold text-white sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]">
            <RevealWords text={T.h1a[lang]} />
            <br />
            <span className="font-serif font-normal italic tracking-[-0.02em]">
              <RevealWords text={T.h1b[lang]} />
            </span>{" "}
            <RevealWords text={T.h1c[lang]} wordClassName="text-silver" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.85 }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            {T.sub[lang]}
          </motion.p>

          {/* CTAs del funnel */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.0 }}
            className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <Magnetic strength={0.22}>
              <WhatsAppButton message={WA_MESSAGES.start} size="lg" className="w-full sm:w-auto">
                {T.ctaWa[lang]}
              </WhatsAppButton>
            </Magnetic>
            <a
              href="#productos"
              className="btn-press inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/[0.08] px-8 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/[0.14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            >
              <Layers className="h-5 w-5" />
              {T.ctaExplore[lang]}
            </a>
          </motion.div>

          {/* Entrada a SPC AI */}
          <motion.button
            type="button"
            onClick={openSpcAi}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.2 }}
            className="btn-press group mt-5 inline-flex items-center gap-2.5 rounded-full border border-[#7FA8EC]/25 bg-[#3F6CC0]/[0.12] py-1.5 pl-2 pr-5 text-[13px] font-semibold text-[#BFD4F5] backdrop-blur-md transition-all duration-300 hover:border-[#7FA8EC]/50 hover:bg-[#3F6CC0]/[0.2] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7FA8EC]/70"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#6F9AE8] to-[#27519B] shadow-[0_6px_16px_-6px_rgba(63,108,192,0.8)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="inline-flex items-center gap-1.5">
              {T.spencerAsk[lang]} <strong className="font-bold text-white">SPenCer</strong>
              <span className="rounded-full bg-[#25D366]/15 px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-[#4BE38A]">
                {T.new[lang]}
              </span>
            </span>
          </motion.button>

          {/* Micro-stats con contadores animados */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.3 }}
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            {T.stats[lang].map((s) => (
              <div key={s.l} className="flex items-baseline gap-2.5">
                <dt className="sr-only">{s.l}</dt>
                <dd className="text-3xl font-bold tracking-tight text-white">
                  <CountUp to={s.v} suffix={s.suffix} duration={2.2} />
                </dd>
                <dd className="max-w-[120px] text-[13px] leading-tight text-white/55">{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ——— Carrusel 3D de servicios (gira todos los productos) ——— */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.5, mass: 1 }}
          className="relative"
        >
          <ServicesCarousel />
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.a
        href="#nosotros"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition-colors hover:text-white/90 sm:flex"
        aria-label={T.scrollAria[lang]}
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.22em]">{T.scroll[lang]}</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
