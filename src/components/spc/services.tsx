"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, ArrowRight } from "lucide-react";
import { TiltCard } from "./tilt-card";
import { Reveal } from "./reveal";
import { WhatsAppIcon } from "./whatsapp-button";
import { useRouter } from "./site-router";
import { SERVICES, waLink, type ServiceCategory } from "@/lib/spc";
import { cn } from "@/lib/utils";

type Filter = "todos" | ServiceCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "packaging", label: "Packaging" },
  { id: "comercial", label: "Impresión comercial" },
  { id: "digital", label: "Digital" },
];

export function Services() {
  const [filter, setFilter] = useState<Filter>("todos");
  const router = useRouter();
  const visible = SERVICES.filter((s) => filter === "todos" || s.category === filter);

  function openService(id: string) {
    router.navigate({ name: "service", id });
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <section
      id="productos"
      className="relative overflow-hidden bg-gradient-to-b from-[#F4F7FC] via-[#EDF1F9] to-[#F7F9FD] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#27519B]/25 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#27519B]/15 bg-white/70 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#27519B] backdrop-blur-sm">
                Productos & servicios
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-tight text-balance text-4xl font-extrabold tracking-tight text-[#0C1526] sm:text-5xl lg:text-[3.4rem]">
                Soluciones integrales,{" "}
                <span className="font-serif font-normal italic text-[#27519B]">hechas a tu medida</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-[#57678A]">
                Packaging especializado en alimentos, industria farmacéutica y líneas
                comercial/promocional; impresión editorial y comercial; e impresión digital bajo
                demanda. Todo bajo un mismo techo, con la calidad SPC.
              </p>
            </Reveal>
          </div>

          {/* Filtros por categoría */}
          <Reveal delay={0.2}>
            <div
              className="gloss-card inline-flex rounded-full p-1.5"
              role="tablist"
              aria-label="Filtrar productos por categoría"
            >
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      "btn-press relative rounded-full px-4 py-2 text-[13.5px] font-semibold transition-colors duration-200",
                      active ? "text-white" : "text-[#57678A] hover:text-[#0C1526]"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-b from-[#3F6CC0] to-[#27519B] shadow-[0_8px_20px_-6px_rgba(39,81,155,0.6)]"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Grid de tarjetas 3D glossy */}
        <motion.div layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((s, i) => (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
                transition={{
                  type: "spring",
                  stiffness: 130,
                  damping: 20,
                  delay: Math.min(i * 0.05, 0.3),
                }}
              >
                <TiltCard className="h-full rounded-[26px]" maxTilt={8}>
                  <article
                    className="gloss-card group flex h-full flex-col overflow-hidden rounded-[26px]"
                    aria-label={`${s.title} — ver página del servicio`}
                  >
                    {/* Imagen del producto — clic abre la página completa */}
                    <button
                      type="button"
                      onClick={() => openService(s.id)}
                      className="relative block aspect-[16/11] w-full cursor-pointer overflow-hidden text-left"
                      aria-label={`Ver página de ${s.title}`}
                    >
                      <Image
                        src={s.image}
                        alt={`${s.title} — producción real de SPC`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.07]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1526]/45 via-transparent to-white/10" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/25 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                        {s.categoryLabel}
                      </span>
                      <span
                        className="absolute right-4 top-4 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full border border-white/40 bg-white/25 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                        aria-hidden
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </button>

                    {/* Contenido con profundidad Z */}
                    <div className="relative z-[5] flex flex-1 flex-col gap-4 p-6 [transform:translateZ(24px)]">
                      <h3 className="text-xl font-bold tracking-tight text-[#0C1526]">
                        {s.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-[#57678A]">{s.description}</p>

                      <ul className="mt-auto flex flex-wrap gap-2 pt-1">
                        {s.highlights.map((h) => (
                          <li
                            key={h}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#27519B]/12 bg-white/80 px-3 py-1.5 text-[12px] font-medium text-[#3B4E77]"
                          >
                            <Check className="h-3 w-3 text-[#27519B]" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* CTA del funnel: página del servicio + WhatsApp con contexto */}
                      <div className="mt-2 grid grid-cols-[1fr_auto] gap-2">
                        <a
                          href={waLink(s.message)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-press inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-[#128C7E]/25 bg-gradient-to-b from-[#25D366]/[0.09] to-[#128C7E]/[0.1] px-4 text-[14px] font-semibold text-[#0E7A67] transition-all duration-300 hover:border-[#25D366]/50 hover:from-[#25D366]/[0.16] hover:to-[#128C7E]/[0.18] hover:text-[#0A6B5A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                          aria-label={`Cotizar ${s.title} por WhatsApp`}
                        >
                          <WhatsAppIcon className="h-4.5 w-4.5" />
                          Cotizar
                        </a>
                        <button
                          type="button"
                          onClick={() => openService(s.id)}
                          className="btn-press group/explore inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#27519B]/20 bg-white/70 px-4 text-[14px] font-semibold text-[#27519B] transition-all duration-300 hover:border-[#27519B]/45 hover:bg-[#27519B]/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27519B]/60"
                          aria-label={`Explorar página de ${s.title}`}
                        >
                          Explorar
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/explore:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-[15px] text-[#57678A]">
            ¿No encuentras exactamente lo que buscas?{" "}
            <a
              href={waLink("Hola SPC 👋 Tengo un proyecto especial de impresión, ¿pueden asesorarme?")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#27519B] underline decoration-[#27519B]/30 underline-offset-4 transition-colors hover:decoration-[#27519B]"
            >
              Cuéntanos tu proyecto
            </a>{" "}
            — imprimimos casi todo lo que imagine.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
