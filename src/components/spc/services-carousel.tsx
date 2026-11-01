"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICES } from "@/lib/spc";
import { WhatsAppButton } from "./whatsapp-button";
import { cn } from "@/lib/utils";

const N = SERVICES.length;
const STEP = 360 / N; // 40° entre servicios
const AUTO_MS = 4200;

/** Distancia angular más corta entre dos índices (-180°…180°) */
function angDist(i: number, active: number) {
  return (((i - active) * STEP + 540) % 360) - 180;
}

/**
 * Carrusel 3D cilíndrico — todos los servicios de SPC girando en el hero.
 * Estilo keynote: tarjeta frontal nítida, laterales atenuadas, arrastre + auto-play.
 */
export function ServicesCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dims, setDims] = useState({ w: 320, card: 250, radius: 330 });
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; t: number } | null>(null);
  const reduce = useReducedMotion();

  const go = useCallback((dir: 1 | -1) => {
    setActive((a) => (a + dir + N) % N);
  }, []);

  /* Medida responsiva → radio del cilindro */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      const card = Math.min(Math.max(w * 0.52, 200), 296);
      const radius = Math.min(Math.max(card * 1.3, 240), 400);
      setDims({ w, card, radius });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Auto-play (pausa en hover/focus/drag; respeta reduced-motion) */
  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => go(1), AUTO_MS);
    return () => clearInterval(t);
  }, [paused, reduce, go]);

  /* Arrastre / swipe horizontal */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = { x: e.clientX, t: Date.now() };
    setPaused(true);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = dragRef.current;
    dragRef.current = null;
    window.setTimeout(() => setPaused(false), 400);
    if (!d) return;
    const dx = e.clientX - d.x;
    const dt = Date.now() - d.t;
    if (Math.abs(dx) > 36 || (Math.abs(dx) > 12 && dt < 260)) {
      go(dx < 0 ? 1 : -1);
    }
  };

  const service = SERVICES[active];

  /* Tinte del glow según categoría */
  const glow = useMemo(
    () =>
      service.category === "packaging"
        ? "rgba(255,207,0,0.20)"
        : service.category === "digital"
          ? "rgba(0,174,239,0.22)"
          : "rgba(63,108,192,0.28)",
    [service.category]
  );

  return (
    <div
      className="relative select-none"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* ——— Escenario 3D ——— */}
      <div
        ref={stageRef}
        className="relative mx-auto h-[290px] w-full touch-pan-y sm:h-[330px] lg:h-[350px] [mask-image:linear-gradient(90deg,transparent_0%,#000_14%,#000_86%,transparent_100%)]"
        style={{ perspective: "1500px" }}
        role="group"
        aria-roledescription="carrusel"
        aria-label="Servicios de SPC"
      >
        <div
          className="absolute inset-0 cursor-grab [transform-style:preserve-3d] [transform:rotateX(-3deg)] [active:cursor-grabbing]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {SERVICES.map((s, i) => {
            const d = angDist(i, active);
            const abs = Math.abs(d);
            const hidden = abs > 85;
            const front = abs < STEP / 2;
            const op = hidden ? 0 : Math.max(0.1, 1 - abs / 118);
            return (
              <article
                key={s.id}
                aria-hidden={!front}
                aria-label={`${s.title} (${i + 1} de ${N})`}
                className="gloss-card gloss-dark absolute left-1/2 top-1/2 overflow-hidden rounded-[24px]"
                style={{
                  width: dims.card,
                  height: dims.card * 0.78,
                  transform: `translate(-50%, -50%) rotateY(${d}deg) translateZ(${dims.radius}px)`,
                  transition: reduce
                    ? "opacity 0.2s ease"
                    : "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease, filter 0.55s ease",
                  opacity: op,
                  filter: front
                    ? "brightness(1) blur(0px)"
                    : `brightness(${Math.max(0.5, 1 - abs / 180)}) blur(${Math.min(abs / 80, 3)}px)`,
                  zIndex: front ? 10 : Math.round(100 - abs),
                  pointerEvents: front ? "auto" : "none",
                  willChange: "transform",
                }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes={`${dims.card}px`}
                    className="object-cover"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428]/92 via-[#0A1428]/25 to-transparent" />
                  {/* etiqueta de categoría */}
                  <span
                    className={cn(
                      "absolute left-4 top-4 rounded-full border border-white/35 bg-white/20 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md"
                    )}
                  >
                    {s.categoryLabel}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[15px] font-bold leading-tight text-white">{s.title}</p>
                    <p className="mt-1 line-clamp-2 text-[11.5px] leading-snug text-white/65">
                      {s.highlights.join(" · ")}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* glow ambiental que cambia con la categoría */}
        <div
          className="pointer-events-none absolute -bottom-8 left-1/2 h-40 w-[78%] -translate-x-1/2 rounded-full blur-[80px] transition-colors duration-700"
          style={{ background: glow }}
        />
        {/* reflejo del escenario */}
        <div className="pointer-events-none absolute inset-x-[12%] bottom-[-54px] h-14 rounded-[100%] bg-[radial-gradient(50%_100%_at_50%_0%,rgba(10,20,40,0.55),transparent_70%)] blur-[6px]" />
      </div>

      {/* ——— Info del servicio activo (sincronizada) ——— */}
      <div className="relative mt-8 min-h-[168px] sm:min-h-[150px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 140, damping: 20 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75 backdrop-blur-md">
                <i
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: glow.replace(/0\.\d+\)/, "1)") }}
                />
                Servicio {active + 1} de {N} · {service.categoryLabel}
              </span>
            </div>
            <h3 className="display-tight mt-3 text-2xl font-extrabold text-white sm:text-[1.7rem]">
              {service.title}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-pretty text-[14px] leading-relaxed text-white/60">
              {service.description}
            </p>
            <div className="mt-5 flex flex-col items-center gap-2.5 sm:flex-row">
              <WhatsAppButton message={service.message} size="sm">
                Cotizar {service.title.toLowerCase()}
              </WhatsAppButton>
              <a
                href="#productos"
                className="btn-press inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] px-5 text-[13px] font-semibold text-white/85 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/[0.14] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              >
                Ver los 9 servicios
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ——— Controles: flechas + puntos ——— */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Servicio anterior"
          className="btn-press glass-dark flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Ir a servicio">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={s.title}
              onClick={() => setActive(i)}
              className="group relative h-2.5 py-2"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  i === active
                    ? "w-7 bg-gradient-to-r from-white/90 to-white/50"
                    : "w-1.5 bg-white/25 group-hover:bg-white/50"
                )}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Servicio siguiente"
          className="btn-press glass-dark flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
