"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  Camera,
  Boxes,
  Palette,
  Ruler,
  ChevronRight,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { TiltCard } from "./tilt-card";
import { CountUp } from "./count-up";
import { WhatsAppButton, WhatsAppIcon } from "./whatsapp-button";
import { QuoteForm } from "./quote-form";
import { SERVICES, waLink, type Service } from "@/lib/spc";
import { useRouter } from "./site-router";
import { cn } from "@/lib/utils";

/* Extrae el número inicial de "Offset desde ≈ 1.000 uds …" para el contador */
function parseQty(spec: string): number | null {
  const m = spec.replace(/\./g, "").match(/(\d{2,})/);
  return m ? parseInt(m[1], 10) : null;
}

/**
 * ServicePage — página completa de detalle para cada línea de producto.
 * Educa con profundidad y guía al cotizador de WhatsApp.
 */
export function ServicePage({ service }: { service: Service }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  const related = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);
  const qtyHint = parseQty(service.details.specs[0]?.value ?? "");

  return (
    <article aria-label={`Servicio: ${service.title}`}>
      {/* ——— Hero del servicio con parallax ——— */}
      <div
        ref={heroRef}
        className="grain relative flex min-h-[72svh] items-end overflow-hidden bg-[#0A1428]"
      >
        <motion.div style={reduce ? undefined : { y: imgY, scale: imgScale }} className="absolute inset-0">
          <Image
            src={service.image}
            alt={`${service.title} — producción premium de SPC`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-[#0A1428]/60 to-[#0A1428]/25" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_20%,rgba(63,108,192,0.25),transparent_55%)]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-36 sm:px-8">
          <motion.button
            type="button"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => router.navigate({ name: "home" }, "productos")}
            className="btn-press mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-5 py-2.5 text-[13.5px] font-semibold text-white/85 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/[0.14] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a productos
          </motion.button>

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, type: "spring", stiffness: 120, damping: 18 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md"
          >
            <Layers className="h-3.5 w-3.5" />
            {service.categoryLabel} · Línea SPC
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3, type: "spring", stiffness: 90, damping: 17 }}
            className="display-tight max-w-3xl text-balance text-4xl font-extrabold text-white sm:text-6xl lg:text-[4rem]"
          >
            {service.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, type: "spring", stiffness: 100, damping: 19 }}
            className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            {service.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <WhatsAppButton message={service.message} size="lg">
              Cotizar {service.title.toLowerCase()}
            </WhatsAppButton>
            <a
              href="#cotizar"
              className="btn-press inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/[0.08] px-8 text-base font-semibold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/[0.14]"
            >
              <Sparkles className="h-5 w-5" />
              Armar cotización guiada
            </a>
          </motion.div>
        </div>
      </div>

      {/* ——— Intro + foto real de producción ——— */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F7FC] via-[#EDF1F9] to-[#F7F9FD] py-20 sm:py-28">
        <div className="pointer-events-none absolute -left-32 top-24 h-[360px] w-[360px] rounded-full bg-[#00AEEF]/[0.05] blur-[110px]" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#27519B]/15 bg-white/70 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#27519B] backdrop-blur-sm">
                  <Boxes className="h-3.5 w-3.5" />
                  Conoce esta línea
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-tight text-balance text-3xl font-extrabold tracking-tight text-[#0C1526] sm:text-4xl">
                  El detalle que hace la{" "}
                  <span className="font-serif font-normal italic text-[#27519B]">diferencia</span>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 text-pretty text-[17px] leading-relaxed text-[#3B4E77]">
                  {service.details.intro}
                </p>
              </Reveal>
              <StaggerGroup className="mt-8 flex flex-wrap gap-2.5" stagger={0.07}>
                {service.highlights.map((h) => (
                  <StaggerItem key={h}>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#27519B]/15 bg-white/80 px-4 py-2 text-[13px] font-semibold text-[#27519B] shadow-sm">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {h}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            {/* Foto real de producción con marco premium */}
            <Reveal delay={0.12}>
              <TiltCard className="rounded-[28px]" maxTilt={7}>
                <figure className="gloss-card relative overflow-hidden rounded-[28px] p-3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                    <Image
                      src={service.realPhoto}
                      alt={`Fotografía real de producción — ${service.title}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-[#0A1428]/55 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                      <Camera className="h-3 w-3" />
                      Foto real · planta SPC
                    </span>
                  </div>
                  <figcaption className="flex items-center justify-between px-3.5 py-3">
                    <span className="text-[12.5px] font-medium text-[#57678A]">
                      Producción de {service.title.toLowerCase()} en nuestra planta de La Paz
                    </span>
                  </figcaption>
                </figure>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Materiales · Acabados · Specs ——— */}
      <section className="relative overflow-hidden bg-[#F7F9FD] py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#27519B]/25 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="display-tight text-balance text-3xl font-extrabold tracking-tight text-[#0C1526] sm:text-4xl">
              Todo lo que puedes{" "}
              <span className="font-serif font-normal italic text-[#27519B]">elegir</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Materiales */}
            <Reveal delay={0.06}>
              <TiltCard className="h-full rounded-[26px]" maxTilt={5}>
                <div className="gloss-card h-full rounded-[26px] p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3F6CC0] to-[#27519B] shadow-[0_10px_22px_-8px_rgba(39,81,155,0.6)]">
                      <Layers className="h-5 w-5 text-white" />
                    </span>
                    <h3 className="text-xl font-bold text-[#0C1526]">Materiales</h3>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {service.details.materials.map((m, i) => (
                      <motion.li
                        key={m}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.08 }}
                        className="flex items-start gap-3 rounded-xl border border-[#27519B]/8 bg-white/70 px-4 py-3 text-[14.5px] leading-relaxed text-[#2B3B5E]"
                      >
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#3F6CC0] to-[#27519B]" />
                        {m}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>

            {/* Acabados */}
            <Reveal delay={0.12}>
              <TiltCard className="h-full rounded-[26px]" maxTilt={5}>
                <div className="gloss-card h-full rounded-[26px] p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EC008C] to-[#8E0055] shadow-[0_10px_22px_-8px_rgba(142,0,85,0.55)]">
                      <Palette className="h-5 w-5 text-white" />
                    </span>
                    <h3 className="text-xl font-bold text-[#0C1526]">Acabados & técnicas</h3>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {service.details.finishes.map((f, i) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.08 }}
                        className="flex items-start gap-3 rounded-xl border border-[#EC008C]/8 bg-white/70 px-4 py-3 text-[14.5px] leading-relaxed text-[#2B3B5E]"
                      >
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#EC008C] to-[#8E0055]" />
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          </div>

          {/* Specs — tabla técnica */}
          <Reveal delay={0.1}>
            <div className="gloss-card mt-6 overflow-hidden rounded-[26px]">
              <div className="flex items-center gap-3 border-b border-[#0C1526]/6 px-7 py-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00AEEF] to-[#0072B0]">
                  <Ruler className="h-4.5 w-4.5 text-white" />
                </span>
                <h3 className="text-lg font-bold text-[#0C1526]">Ficha técnica rápida</h3>
                {qtyHint && (
                  <span className="ml-auto hidden items-baseline gap-1.5 rounded-full border border-[#27519B]/12 bg-[#27519B]/[0.05] px-4 py-1.5 sm:flex">
                    <CountUp to={qtyHint} className="text-2xl font-extrabold text-silver-blue" />
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-[#57678A]">
                      uds·tiraje inicial*
                    </span>
                  </span>
                )}
              </div>
              <dl className="grid gap-px bg-[#0C1526]/6 sm:grid-cols-2">
                {service.details.specs.map((sp) => (
                  <div key={sp.label} className="flex flex-col gap-1 bg-white/85 px-7 py-4.5">
                    <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8A94A6]">
                      {sp.label}
                    </dt>
                    <dd className="text-[14.5px] font-medium text-[#2B3B5E]">{sp.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="px-7 py-3 text-[11.5px] text-[#8A94A6]">
                *Tiraje de referencia para {service.title.toLowerCase()} — el asesor confirma el
                óptimo según tu proyecto.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Casos de uso + tip de experto ——— */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EDF1F9] to-[#F4F7FC] py-20 sm:py-28">
        <div className="pointer-events-none absolute -right-32 top-24 h-[380px] w-[380px] rounded-full bg-[#EC008C]/[0.05] blur-[110px]" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Casos de uso */}
            <div>
              <Reveal>
                <h2 className="display-tight text-balance text-3xl font-extrabold tracking-tight text-[#0C1526]">
                  ¿Para qué lo{" "}
                  <span className="font-serif font-normal italic text-[#27519B]">usan nuestros clientes?</span>
                </h2>
              </Reveal>
              <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2" stagger={0.08}>
                {service.details.useCases.map((u) => (
                  <StaggerItem key={u}>
                    <TiltCard className="h-full rounded-[20px]" maxTilt={6}>
                      <div className="gloss-card flex h-full items-start gap-3.5 rounded-[20px] p-5">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#27519B]/[0.09] text-[#27519B]">
                          <CheckCircle2 className="h-4.5 w-4.5" />
                        </span>
                        <p className="text-[14px] leading-relaxed text-[#2B3B5E]">{u}</p>
                      </div>
                    </TiltCard>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            {/* Tip de experto */}
            <Reveal delay={0.14}>
              <TiltCard className="h-full rounded-[26px]" maxTilt={6}>
                <div className="gloss-card relative h-full overflow-hidden rounded-[26px] bg-gradient-to-br from-[#FFCF00]/[0.08] via-white to-white p-8">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#FFCF00]/20 blur-[46px]" />
                  <div className="flex items-center gap-3.5">
                    <motion.span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFD84D] to-[#E8A800] shadow-[0_12px_26px_-8px_rgba(200,150,0,0.6)]"
                      animate={reduce ? undefined : { rotate: [0, -6, 6, 0] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Lightbulb className="h-5.5 w-5.5 text-white" />
                    </motion.span>
                    <h3 className="text-xl font-bold text-[#0C1526]">Tip de nuestro experto</h3>
                  </div>
                  <p className="mt-5 text-pretty text-[15.5px] leading-relaxed text-[#2B3B5E]">
                    “{service.details.tip}”
                  </p>
                  <p className="mt-6 border-t border-[#0C1526]/8 pt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8A94A6]">
                    +20 años imprimiendo lo mejor de Bolivia
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Cotizador con el servicio preseleccionado ——— */}
      <section id="cotizar" className="grain relative overflow-hidden bg-[#0A1428] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_80%_-10%,rgba(63,108,192,0.3),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_20%_120%,rgba(17,9,91,0.75),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Reveal>
              <h2 className="display-tight text-balance text-3xl font-extrabold text-white sm:text-4xl">
                Cotiza tu{" "}
                <span className="font-serif font-normal italic text-silver">
                  {service.title.toLowerCase()}
                </span>{" "}
                ahora
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[15.5px] leading-relaxed text-white/55">
                Ya preseleccionamos el producto — ajusta cantidad y ciudad, y envía por WhatsApp.
              </p>
            </Reveal>
          </div>
          <QuoteForm preselect={service.id} />
        </div>
      </section>

      {/* ——— Servicios relacionados ——— */}
      <section className="bg-[#F7F9FD] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <h2 className="display-tight text-3xl font-extrabold tracking-tight text-[#0C1526]">
                También podría{" "}
                <span className="font-serif font-normal italic text-[#27519B]">interesarte</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <button
                type="button"
                onClick={() => router.navigate({ name: "home" }, "productos")}
                className="btn-press hidden items-center gap-1.5 rounded-full border border-[#27519B]/20 bg-white/70 px-5 py-2.5 text-[13.5px] font-semibold text-[#27519B] transition-all hover:border-[#27519B]/45 hover:bg-[#27519B]/[0.06] sm:inline-flex"
              >
                Ver los 9 servicios
                <ChevronRight className="h-4 w-4" />
              </button>
            </Reveal>
          </div>

          <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.09}>
            {related.map((s) => (
              <StaggerItem key={s.id}>
                <TiltCard className="h-full rounded-[24px]" maxTilt={7}>
                  <button
                    type="button"
                    onClick={() => {
                      router.navigate({ name: "service", id: s.id });
                      window.scrollTo({ top: 0, behavior: "auto" });
                    }}
                    className="gloss-card group flex h-full w-full flex-col overflow-hidden rounded-[24px] text-left"
                    aria-label={`Ver ${s.title}`}
                  >
                    <span className="relative block aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={s.image}
                        alt={`${s.title} — SPC`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-[#0C1526]/45 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/25 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                        {s.categoryLabel}
                      </span>
                    </span>
                    <span className="flex flex-1 flex-col gap-2.5 p-5">
                      <span className="text-[17px] font-bold tracking-tight text-[#0C1526]">
                        {s.title}
                      </span>
                      <span className="line-clamp-2 text-[13.5px] leading-relaxed text-[#57678A]">
                        {s.description}
                      </span>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[13px] font-semibold text-[#27519B]">
                        Explorar
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </span>
                  </button>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center gap-4 text-center">
              <p className="max-w-xl text-[15px] leading-relaxed text-[#57678A]">
                ¿Combinando varias líneas? Los proyectos mixtos son nuestra especialidad — cuéntanos
                la idea completa y armamos una propuesta integral.
              </p>
              <a
                href={waLink(`Hola SPC 👋 Me interesa un proyecto que combina ${service.title.toLowerCase()} con otros productos. ¿Me asesoran?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex h-12 items-center gap-2.5 rounded-full border border-[#128C7E]/25 bg-gradient-to-b from-[#25D366]/[0.09] to-[#128C7E]/[0.1] px-7 text-[14.5px] font-semibold text-[#0E7A67] transition-all hover:border-[#25D366]/50 hover:from-[#25D366]/[0.16] hover:to-[#128C7E]/[0.18]"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
                Proyecto combinado por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
