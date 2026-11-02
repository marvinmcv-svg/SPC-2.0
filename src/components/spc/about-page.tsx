"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  ArrowLeft,
  Target,
  Eye,
  Award,
  Clock,
  Users,
  Factory,
  HeartHandshake,
  ShieldCheck,
  Truck,
  ChevronRight,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { TiltCard } from "./tilt-card";
import { CountUp } from "./count-up";
import { WhatsAppButton } from "./whatsapp-button";
import { useLang } from "./lang";
import { SPC, WA_MESSAGES, pick } from "@/lib/spc";
import { useRouter } from "./site-router";

/**
 * AboutPage — página corporativa “Nosotros”: historia, misión, visión,
 * valores y cifras. Educa sobre la empresa y converge al CTA.
 */
export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const router = useRouter();
  const { lang } = useLang();

  const VALUES = [
    {
      icon: Award,
      title: { es: "Calidad", en: "Quality" },
      text: {
        es: "Cada pieza que sale de nuestra planta lleva el estándar que nos hizo líderes: control de color, materiales de primera y acabados impecables.",
        en: "Every piece leaving our plant carries the standard that made us leaders: color control, first-class materials and impeccable finishes.",
      },
    },
    {
      icon: Clock,
      title: { es: "Puntualidad", en: "Punctuality" },
      text: {
        es: "Una fecha de entrega es un compromiso. Programamos cada proyecto para que tu campaña, lanzamiento o edición llegue exactamente cuando la necesitas.",
        en: "A delivery date is a commitment. We schedule every project so your campaign, launch or edition arrives exactly when you need it.",
      },
    },
    {
      icon: Factory,
      title: { es: "Capacidad", en: "Capacity" },
      text: {
        es: "Tecnología offset, digital y encuadernación industrial bajo un mismo techo: desde 1 pieza personalizada hasta tirajes de millones.",
        en: "Offset, digital and industrial binding technology under one roof: from 1 personalized piece to runs in the millions.",
      },
    },
    {
      icon: HeartHandshake,
      title: { es: "Servicio", en: "Service" },
      text: {
        es: "El factor humano marca la diferencia. Asesores que entienden tu negocio y acompañan el proyecto desde la idea hasta la entrega.",
        en: "The human factor makes the difference. Advisors who understand your business and accompany the project from idea to delivery.",
      },
    },
  ];

  const MILESTONES = [
    {
      year: "2001",
      title: { es: "Nace SPC Impresores S.A.", en: "SPC Impresores S.A. is born" },
      text: {
        es: "Fundada en La Paz con la visión de elevar el estándar de la industria gráfica boliviana.",
        en: "Founded in La Paz with the vision of raising the standard of Bolivia's graphics industry.",
      },
    },
    {
      year: { es: "Crecimiento", en: "Growth" }[lang],
      title: { es: "Gráfica industrial integral", en: "Integral industrial graphics" },
      text: {
        es: "Offset, digital y encuadernación Hotmelt/PUR bajo un mismo techo, sirviendo a los sectores más exigentes del país.",
        en: "Offset, digital and Hotmelt/PUR binding under one roof, serving the country's most demanding sectors.",
      },
    },
    {
      year: { es: "Hoy", en: "Today" }[lang],
      title: { es: "Líderes nacionales", en: "National leaders" },
      text: {
        es: "Laboratorios, industrias de alimentos, bancos, medios e instituciones confían en SPC su imagen impresa.",
        en: "Laboratories, food companies, banks, media and institutions trust SPC with their printed image.",
      },
    },
  ];

  const T = {
    back: { es: "Volver al inicio", en: "Back to home" },
    badge: { es: "Quiénes somos", en: "Who we are" },
    heroAlt: { es: "Planta de producción de SPC Impresores en La Paz", en: "SPC Impresores' production plant in La Paz" },
    heroA: { es: "El factor humano", en: "The human factor" },
    heroB: { es: "marca la diferencia", en: "makes the difference" },
    heroIntro: {
      es: (<>— {SPC.brand}. Líderes de la industria gráfica en Bolivia desde {SPC.founded}, enfocados en satisfacer las necesidades de impresión de nuestros clientes con tecnología de punta e insumos de primera calidad.</>),
      en: (<>— {SPC.brand}. Leaders of Bolivia's graphics industry since {SPC.founded}, focused on meeting our clients' printing needs with cutting-edge technology and first-class supplies.</>),
    },
    stats: {
      es: [
        { v: 24, suffix: "+", label: "años de trayectoria", icon: Award },
        { v: 9, suffix: "", label: "líneas de producto", icon: Factory },
        { v: 3, suffix: "", label: "grandes tecnologías", icon: ShieldCheck },
        { v: 9, suffix: "", label: "departamentos con entrega", icon: Truck },
      ],
      en: [
        { v: 24, suffix: "+", label: "years of track record", icon: Award },
        { v: 9, suffix: "", label: "product lines", icon: Factory },
        { v: 3, suffix: "", label: "core technologies", icon: ShieldCheck },
        { v: 9, suffix: "", label: "departments with delivery", icon: Truck },
      ],
    },
    mission: { es: "Nuestra misión", en: "Our mission" },
    vision: { es: "Nuestra visión", en: "Our vision" },
    valuesA: { es: "CALIDAD · PUNTUALIDAD ·", en: "QUALITY · PUNCTUALITY ·" },
    valuesB: { es: "CAPACIDAD · SERVICIO", en: "CAPACITY · SERVICE" },
    valuesIntro: {
      es: "Los cuatro pilares con los que trabajamos cada orden, cada lote y cada entrega.",
      en: "The four pillars we bring to every order, every batch and every delivery.",
    },
    historyA: { es: "Más de dos décadas", en: "More than two decades" },
    historyB: { es: "imprimiendo historia", en: "printing history" },
    ctaA: { es: "Conversemos sobre", en: "Let's talk about" },
    ctaB: { es: "tu próximo proyecto", en: "your next project" },
    ctaIntro: {
      es: "Conócenos en persona o por WhatsApp: recorridos de planta, asesoría técnica y cotizaciones claras para tu empresa.",
      en: "Get to know us in person or on WhatsApp: plant tours, technical advice and clear quotes for your company.",
    },
    ctaAdvisor: { es: "Hablar con un asesor", en: "Talk to an advisor" },
    ctaExplore: { es: "Explorar productos", en: "Explore products" },
    aria: { es: "Nosotros — SPC Impresores", en: "About us — SPC Impresores" },
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.2]);

  return (
    <article aria-label={T.aria[lang]}>
      {/* ——— Hero ——— */}
      <div
        ref={heroRef}
        className="grain relative flex min-h-[64svh] items-end overflow-hidden bg-[#0A1428]"
      >
        <motion.div style={reduce ? undefined : { y: imgY, scale: imgScale }} className="absolute inset-0">
          <Image
            src="/spc/planta.png"
            alt={T.heroAlt[lang]}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-[#0A1428]/65 to-[#0A1428]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_60%_at_25%_15%,rgba(63,108,192,0.3),transparent_55%)]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-36 sm:px-8">
          <motion.button
            type="button"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => router.navigate({ name: "home" }, "nosotros")}
            className="btn-press mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-5 py-2.5 text-[13.5px] font-semibold text-white/85 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/[0.14] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {T.back[lang]}
          </motion.button>

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md"
          >
            <Factory className="h-3.5 w-3.5" />
            {T.badge[lang]}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3, type: "spring", stiffness: 90, damping: 17 }}
            className="display-tight max-w-3xl text-balance text-4xl font-extrabold text-white sm:text-6xl lg:text-[4rem]"
          >
            {T.heroA[lang]}{" "}
            <span className="font-serif font-normal italic text-silver">{T.heroB[lang]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/70"
          >
            {SPC.name} {T.heroIntro[lang]}
          </motion.p>
        </div>
      </div>

      {/* ——— Cifras animadas ——— */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1428] to-[#0D1B33] pb-20 pt-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(63,108,192,0.22),transparent_60%)]" />
        <StaggerGroup className="relative mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 sm:grid-cols-4 sm:px-8" stagger={0.1}>
          {T.stats[lang].map((s) => (
            <StaggerItem key={s.label}>
              <div className="glass-dark flex h-full flex-col items-center gap-2 rounded-2xl px-4 py-6 text-center">
                <s.icon className="h-5 w-5 text-[#8FB0E8]" aria-hidden />
                <CountUp
                  to={s.v}
                  suffix={s.suffix}
                  className="display-tight text-4xl font-extrabold text-white sm:text-[2.6rem]"
                />
                <span className="text-[12px] leading-tight text-white/55">{s.label}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* ——— Misión & Visión ——— */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F7FC] via-[#EDF1F9] to-[#F7F9FD] py-20 sm:py-28">
        <div className="pointer-events-none absolute -left-32 top-24 h-[380px] w-[380px] rounded-full bg-[#00AEEF]/[0.06] blur-[110px]" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <TiltCard className="h-full rounded-[28px]" maxTilt={6}>
                <div className="gloss-card h-full rounded-[28px] p-8 sm:p-10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3F6CC0] to-[#27519B] shadow-[0_14px_30px_-10px_rgba(39,81,155,0.65)]">
                      <Target className="h-6 w-6 text-white" />
                    </span>
                    <h2 className="display-tight text-2xl font-extrabold text-[#0C1526] sm:text-3xl">
                      {T.mission[lang]}
                    </h2>
                  </div>
                  <p className="text-pretty text-[16.5px] leading-relaxed text-[#3B4E77]">
                    “{pick(SPC.mission, lang)}”
                  </p>
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.12}>
              <TiltCard className="h-full rounded-[28px]" maxTilt={6}>
                <div className="gloss-card h-full rounded-[28px] p-8 sm:p-10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6F9AE8] to-[#16233F] shadow-[0_14px_30px_-10px_rgba(22,35,63,0.65)]">
                      <Eye className="h-6 w-6 text-white" />
                    </span>
                    <h2 className="display-tight text-2xl font-extrabold text-[#0C1526] sm:text-3xl">
                      {T.vision[lang]}
                    </h2>
                  </div>
                  <p className="text-pretty text-[16.5px] leading-relaxed text-[#3B4E77]">
                    “{pick(SPC.vision, lang)}”
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Valores ——— */}
      <section className="bg-[#F7F9FD] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="display-tight text-balance text-3xl font-extrabold tracking-tight text-[#0C1526] sm:text-4xl">
              {T.valuesA[lang]}{" "}
              <span className="font-serif font-normal italic text-[#27519B]">
                {T.valuesB[lang]}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-[#57678A]">
              {T.valuesIntro[lang]}
            </p>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2" stagger={0.09}>
            {VALUES.map((v) => (
              <StaggerItem key={v.title.es}>
                <TiltCard className="h-full rounded-[26px]" maxTilt={6}>
                  <div className="gloss-card flex h-full gap-5 rounded-[26px] p-7">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3F6CC0] to-[#27519B] shadow-[0_12px_26px_-8px_rgba(39,81,155,0.6)]">
                      <v.icon className="h-5.5 w-5.5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-[#0C1526]">{v.title[lang]}</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-[#57678A]">{v.text[lang]}</p>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ——— Historia ——— */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EDF1F9] to-[#F4F7FC] py-20 sm:py-28">
        <div className="pointer-events-none absolute -right-32 bottom-24 h-[380px] w-[380px] rounded-full bg-[#EC008C]/[0.05] blur-[110px]" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <h2 className="display-tight text-balance text-3xl font-extrabold tracking-tight text-[#0C1526] sm:text-4xl">
              {T.historyA[lang]}{" "}
              <span className="font-serif font-normal italic text-[#27519B]">
                {T.historyB[lang]}
              </span>
            </h2>
          </Reveal>

          <div className="relative mt-12">
            {/* línea vertical */}
            <div className="absolute bottom-2 left-[27px] top-2 w-px bg-gradient-to-b from-[#27519B]/40 via-[#27519B]/20 to-transparent" aria-hidden />
            <div className="flex flex-col gap-8">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.title.es} delay={i * 0.1}>
                  <div className="flex gap-5">
                    <motion.span
                      className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#27519B]/20 bg-white text-[12px] font-extrabold text-[#27519B] shadow-[0_10px_24px_-8px_rgba(39,81,155,0.45)]"
                      whileHover={reduce ? undefined : { scale: 1.08, rotate: -3 }}
                    >
                      {m.year === (lang === "es" ? "Hoy" : "Today") ? <Users className="h-5 w-5" /> : m.year}
                    </motion.span>
                    <TiltCard className="flex-1 rounded-[22px]" maxTilt={4}>
                      <div className="gloss-card rounded-[22px] p-6">
                        <h3 className="text-[17px] font-bold text-[#0C1526]">{m.title[lang]}</h3>
                        <p className="mt-2 text-[14.5px] leading-relaxed text-[#57678A]">{m.text[lang]}</p>
                      </div>
                    </TiltCard>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— CTA ——— */}
      <section className="grain relative overflow-hidden bg-[#0A1428] py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(37,211,102,0.18),transparent_55%)]" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="display-tight text-balance text-3xl font-extrabold text-white sm:text-4xl">
              {T.ctaA[lang]}{" "}
              <span className="font-serif font-normal italic text-silver">{T.ctaB[lang]}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-white/55">
              {T.ctaIntro[lang]}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton message={WA_MESSAGES.start} size="lg">
                {T.ctaAdvisor[lang]}
              </WhatsAppButton>
              <button
                type="button"
                onClick={() => router.navigate({ name: "home" }, "productos")}
                className="btn-press inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-8 text-base font-semibold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/[0.14]"
              >
                {T.ctaExplore[lang]}
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-6 text-[13px] font-medium text-white/40">
              {SPC.address} · {SPC.phone} · {lang === "es" ? "Lun–Vie 8:00–18:00" : "Mon–Fri 8:00–18:00"}
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
