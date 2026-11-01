"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowDown, Sparkles, Factory, Layers } from "lucide-react";
import { WhatsAppButton } from "./whatsapp-button";
import { WA_MESSAGES, SPC } from "@/lib/spc";

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

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Parallax de scroll: fondo zoom, contenido sube, tarjetas se desplazan
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Parallax de puntero para el clúster 3D (springs suaves)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });
  const clusterX = useTransform(px, [-1, 1], [-16, 16]);
  const clusterY = useTransform(py, [-1, 1], [-10, 10]);

  useEffect(() => {
    if (reduce) return;
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
      my.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-[#0A1428]"
      aria-label="SPC — Imprimiendo lo mejor de Bolivia"
    >
      {/* Fondo cinematográfico */}
      <motion.div style={reduce ? undefined : { y: bgY, scale: bgScale }} className="absolute inset-0">
        <Image
          src="/spc/hero-roller.png"
          alt="Rodillos de impresión offset de precisión en la planta de SPC"
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
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-14 px-5 pb-28 pt-36 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:pt-40"
      >
        {/* ——— Columna de texto ——— */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 110, damping: 20, delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 backdrop-blur-md"
          >
            <CmykDots />
            <span className="text-[13px] font-medium tracking-wide text-white/85">
              Líderes de la industria gráfica en Bolivia · desde {SPC.founded}
            </span>
          </motion.div>

          <h1 className="display-tight text-[13.5vw] font-extrabold text-white sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]">
            <RevealWords text="Imprimiendo" />
            <br />
            <span className="font-serif font-normal italic tracking-[-0.02em]">
              <RevealWords text="lo mejor" />
            </span>{" "}
            <RevealWords text="de Bolivia" wordClassName="text-silver" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.85 }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            Packaging, impresión comercial y digital con tecnología de punta,
            insumos de primera calidad y el factor humano que marca la diferencia.
          </motion.p>

          {/* CTAs del funnel */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.0 }}
            className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <WhatsAppButton message={WA_MESSAGES.start} size="lg" className="w-full sm:w-auto">
              Cotiza tu proyecto por WhatsApp
            </WhatsAppButton>
            <a
              href="#productos"
              className="btn-press inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/[0.08] px-8 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/[0.14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            >
              <Layers className="h-5 w-5" />
              Explorar productos
            </a>
          </motion.div>

          {/* Micro-stats */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.15 }}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            {[
              { v: "20+", l: "años de trayectoria" },
              { v: "9", l: "líneas de producto" },
              { v: "3", l: "grandes tecnologías" },
            ].map((s) => (
              <div key={s.l} className="flex items-baseline gap-2.5">
                <dt className="sr-only">{s.l}</dt>
                <dd className="text-3xl font-bold tracking-tight text-white">{s.v}</dd>
                <dd className="max-w-[120px] text-[13px] leading-tight text-white/55">{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ——— Clúster 3D glossy (parallax con puntero + scroll) ——— */}
        <motion.div
          style={reduce ? undefined : { x: clusterX, y: clusterY }}
          className="relative mx-auto hidden h-[430px] w-full max-w-[440px] [perspective:1300px] sm:block lg:max-w-none"
          aria-hidden
        >
          <div className="absolute inset-0 [transform-style:preserve-3d]">
            {/* Tarjeta principal — rodillo */}
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 18, rotateZ: -4 }}
              animate={{ opacity: 1, y: 0, rotateX: 8, rotateZ: -2 }}
              transition={{ type: "spring", stiffness: 60, damping: 16, delay: 0.55, mass: 1.1 }}
              className="gloss-card gloss-dark absolute left-[4%] top-[6%] w-[82%] overflow-hidden rounded-[26px]"
              style={{ transform: "translateZ(70px) rotateY(-6deg)" }}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src="/spc/hero-roller.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 440px, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
                    <Factory className="h-4.5 w-4.5 text-white" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Offset de precisión</p>
                    <p className="text-xs text-white/60">Tecnología de punta, calidad constante</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tarjeta secundaria — packaging */}
            <motion.div
              initial={{ opacity: 0, y: 70, rotateX: 14 }}
              animate={{ opacity: 1, y: 0, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 60, damping: 16, delay: 0.75, mass: 1.1 }}
              className="gloss-card gloss-dark absolute bottom-[16%] right-[0%] w-[56%] overflow-hidden rounded-[22px]"
              style={{ transform: "translateZ(140px) rotateY(7deg)" }}
            >
              <div className="relative aspect-[4/3.4]">
                <Image
                  src="/spc/packaging-premium.png"
                  alt=""
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3.5 left-4 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-[#FFCF00]" />
                  <p className="text-[13px] font-semibold text-white">Packaging premium</p>
                </div>
              </div>
            </motion.div>

            {/* Chip flotante — CMYK */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 130, damping: 14, delay: 1.0 }}
              className="glass-dark absolute left-[0%] top-[42%] flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{ transform: "translateZ(190px)" }}
            >
              <CmykDots />
              <div className="text-[12px] leading-tight">
                <p className="font-semibold text-white">Color exacto</p>
                <p className="text-white/55">Control CMYK de extremo a extremo</p>
              </div>
            </motion.div>

            {/* Glow ambiental */}
            <div className="absolute -bottom-10 left-1/2 h-44 w-[80%] -translate-x-1/2 rounded-full bg-[#3F6CC0]/25 blur-[90px]" />
          </div>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.a
        href="#nosotros"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition-colors hover:text-white/90 sm:flex"
        aria-label="Bajar a la siguiente sección"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.22em]">Descubre SPC</span>
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
