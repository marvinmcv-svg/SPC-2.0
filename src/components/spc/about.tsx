"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, useMotionValue, useTransform, animate } from "framer-motion";
import { HeartHandshake, Target, Eye, MapPin, ArrowRight } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { SPC, pick } from "@/lib/spc";
import { useLang } from "./lang";
import { useRouter } from "./site-router";

/** Contador animado con spring — se activa al entrar en viewport */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  // MotionValue evita setState en el efecto (sin re-renders en cascada)
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, {
      type: "spring",
      stiffness: 55,
      damping: 16,
    });
    return () => controls.stop();
  }, [inView, to, reduce, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function About() {
  const years = new Date().getFullYear() - SPC.founded;
  const router = useRouter();
  const { lang } = useLang();

  const T = {
    badge: { es: "Quiénes somos", en: "Who we are" },
    heading: { es: "El factor humano marca la diferencia.", en: "The human factor makes the difference." },
    headingA: { es: "El", en: "The" },
    headingB: { es: "factor humano", en: "human factor" },
    headingC: { es: "marca la diferencia.", en: "makes the difference." },
    intro: {
      es: (<>fue fundada en la ciudad de La Paz el año <strong className="font-semibold text-[#0C1526]">{SPC.founded}</strong>. Somos una empresa <strong className="font-semibold text-[#0C1526]">líder en la industria gráfica de Bolivia</strong>, con personal altamente calificado, infraestructura de primer nivel y una convicción: nuestro equipo es el pilar de todo lo que imprimimos.</>),
      en: (<>was founded in the city of La Paz in <strong className="font-semibold text-[#0C1526]">{SPC.founded}</strong>. We are a company <strong className="font-semibold text-[#0C1526]">leading Bolivia's graphics industry</strong>, with highly qualified staff, first-class infrastructure and one conviction: our team is the pillar of everything we print.</>),
    },
    stats: {
      es: [
        { v: <Counter to={years} suffix="+" />, l: "años imprimiendo Bolivia" },
        { v: <Counter to={9} />, l: "líneas de producto" },
        { v: <Counter to={100} suffix="%" />, l: "personal calificado" },
        { v: <Counter to={1} />, l: "equipo, una sola misión" },
      ],
      en: [
        { v: <Counter to={years} suffix="+" />, l: "years printing Bolivia" },
        { v: <Counter to={9} />, l: "product lines" },
        { v: <Counter to={100} suffix="%" />, l: "qualified staff" },
        { v: <Counter to={1} />, l: "team, one mission" },
      ],
    },
    mission: { es: "Nuestra misión", en: "Our mission" },
    missionFoot: { es: "Servicios integrales, orientados a ti", en: "Comprehensive services, oriented to you" },
    vision: { es: "Nuestra visión", en: "Our vision" },
    bannerAlt: {
      es: "Muestra de impresión a todo color con imágenes de Bolivia y abanico de color",
      en: "Full-color print sample with images of Bolivia and a fan of color",
    },
    history: { es: "Conoce nuestra historia completa", en: "Read our full story" },
  };

  return (
    <section id="nosotros" className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Halo azul de marca */}
      <div className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-[#27519B]/[0.07] blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[380px] w-[380px] rounded-full bg-[#3F6CC0]/[0.08] blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Encabezado */}
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#27519B]/15 bg-[#27519B]/[0.06] px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#27519B]">
              <MapPin className="h-3.5 w-3.5" />
              {T.badge[lang]}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-tight text-balance text-4xl font-extrabold tracking-tight text-[#0C1526] sm:text-5xl lg:text-[3.4rem]">
              {T.headingA[lang]}{" "}
              <span className="font-serif font-normal italic text-[#27519B]">{T.headingB[lang]}</span>{" "}
              {T.headingC[lang]}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[#57678A]">
              <strong className="font-semibold text-[#0C1526]">{SPC.name}</strong>{" "}
              {T.intro[lang]}
            </p>
          </Reveal>
        </div>

        {/* Stats en banda glossy */}
        <StaggerGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4" stagger={0.09}>
          {T.stats[lang].map((s, i) => (
            <StaggerItem key={i}>
              <div className="gloss-card flex h-full flex-col items-start gap-1 rounded-3xl p-6">
                <p className="text-4xl font-extrabold tracking-tight text-silver-blue sm:text-[2.6rem]">
                  {s.v}
                </p>
                <p className="text-sm font-medium leading-snug text-[#57678A]">{s.l}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Misión / Visión + imagen */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="gloss-card flex h-full flex-col gap-5 rounded-[28px] p-8 sm:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3F6CC0] to-[#27519B] shadow-[0_10px_24px_-8px_rgba(39,81,155,0.55)]">
                <Target className="h-5.5 w-5.5 text-white" />
              </span>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-[#0C1526]">{T.mission[lang]}</h3>
                <p className="mt-3 text-pretty text-lg leading-relaxed text-[#57678A]">
                  “{pick(SPC.mission, lang)}”
                </p>
              </div>
              <div className="mt-auto flex items-center gap-2 border-t border-[#0C1526]/8 pt-5 text-[13px] font-medium text-[#27519B]">
                <HeartHandshake className="h-4 w-4" />
                {T.missionFoot[lang]}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-[28px]">
              <motion.div
                className="absolute inset-0"
                initial={false}
                whileHover={undefined}
              >
                <Image
                  src="/spc/banner-color.jpg"
                  alt={T.bannerAlt[lang]}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1526]/88 via-[#0C1526]/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white backdrop-blur-md">
                  <Eye className="h-3.5 w-3.5" />
                  {T.vision[lang]}
                </span>
                <p className="max-w-md text-pretty text-xl font-medium leading-relaxed text-white">
                  “{pick(SPC.vision, lang)}”
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Enlace a la página completa de empresa */}
        <Reveal delay={0.1}>
          <button
            type="button"
            onClick={() => router.navigate({ name: "about" })}
            className="btn-press group mx-auto mt-10 flex items-center gap-2.5 rounded-full border border-[#27519B]/20 bg-white/70 px-6 py-3 text-[14.5px] font-semibold text-[#27519B] transition-all duration-300 hover:border-[#27519B]/45 hover:bg-[#27519B]/[0.06]"
          >
            {T.history[lang]}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
