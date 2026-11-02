"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, FileText, Cog, PackageCheck, ArrowRight } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { WhatsAppButton } from "./whatsapp-button";
import { useLang } from "./lang";
import { WA_MESSAGES } from "@/lib/spc";

export function Process() {
  const imgRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { lang } = useLang();
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const STEPS = [
    {
      icon: MessageCircle,
      num: "01",
      title: { es: "Cuéntanos tu proyecto", en: "Tell us your project" },
      body: {
        es: "Escríbenos por WhatsApp con tu idea: cajas, revistas, libros, bolsas o tiraje digital. Cuéntanos cantidades, tamaños y fechas.",
        en: "Message us on WhatsApp with your idea: boxes, magazines, books, bags or a digital run. Tell us quantities, sizes and dates.",
      },
      tip: { es: "Responde en minutos en horario laboral", en: "We reply within minutes in business hours" },
    },
    {
      icon: FileText,
      num: "02",
      title: { es: "Recibe tu cotización", en: "Receive your quote" },
      body: {
        es: "Nuestro equipo técnico revisa tu archivo, te sugiere materiales y acabados, y te envía una propuesta clara y a tu medida.",
        en: "Our technical team reviews your file, suggests materials and finishes, and sends you a clear, tailored proposal.",
      },
      tip: { es: "Asesoría experta sin costo", en: "Expert advice at no cost" },
    },
    {
      icon: Cog,
      num: "03",
      title: { es: "Producción de precisión", en: "Precision production" },
      body: {
        es: "Tu proyecto entra a planta: preprensa, offset, encuadernación Hotmelt/PUR o digital, con control de color CMYK de extremo a extremo.",
        en: "Your project enters the plant: prepress, offset, Hotmelt/PUR binding or digital, with end-to-end CMYK color control.",
      },
      tip: { es: "Tecnología de punta e insumos de primera", en: "Cutting-edge tech and first-class supplies" },
    },
    {
      icon: PackageCheck,
      num: "04",
      title: { es: "Entrega puntual", en: "On-time delivery" },
      body: {
        es: "Controlamos cada fecha comprometida. Tu producto llega listo para vender, empacar o distribuir en todo Bolivia.",
        en: "We control every committed date. Your product arrives ready to sell, pack or distribute across Bolivia.",
      },
      tip: { es: "Puntualidad como estándar, no promesa", en: "Punctuality as a standard, not a promise" },
    },
  ];

  const T = {
    badge: { es: "Cómo trabajamos", en: "How we work" },
    headingA: { es: "De tu idea al papel,", en: "From your idea to paper," },
    headingB: { es: "en 4 pasos", en: "in 4 steps" },
    intro: {
      es: "Un proceso simple y transparente que empieza con una conversación. Así de fácil es poner a trabajar a los líderes de la industria gráfica en tu proyecto.",
      en: "A simple, transparent process that starts with a conversation. That's how easy it is to put the leaders of the graphics industry to work on your project.",
    },
    plantBadge: { es: "Planta & tecnología", en: "Plant & technology" },
    plantHeadingA: { es: "Capacidad industrial,", en: "Industrial capacity," },
    plantHeadingB: { es: "respaldo de líderes", en: "a leader's backing" },
    plantIntro: {
      es: "Prensas offset, encuadernación Hotmelt/PUR y digital bajo demanda en un solo flujo de producción. Calidad, puntualidad, capacidad y servicio.",
      en: "Offset presses, Hotmelt/PUR binding and on-demand digital in a single production flow. Quality, punctuality, capacity and service.",
    },
    plantAlt: {
      es: "Planta de producción de SPC con máquinas de impresión offset",
      en: "SPC's production plant with offset printing machines",
    },
    start: { es: "Empezar mi proyecto", en: "Start my project" },
    knowWtp: { es: "Conocer Web to Print", en: "Learn about Web to Print" },
  };

  return (
    <section id="proceso" className="grain relative overflow-hidden bg-[#0A1428] py-24 sm:py-32">
      {/* Fondo con profundidad */}
      <div className="absolute inset-0 bg-[radial-gradient(110%_70%_at_85%_0%,rgba(63,108,192,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_10%_100%,rgba(17,9,91,0.7),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
              {T.badge[lang]}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-tight text-balance text-4xl font-extrabold text-white sm:text-5xl lg:text-[3.4rem]">
              {T.headingA[lang]}{" "}
              <span className="font-serif font-normal italic text-silver">{T.headingB[lang]}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/65">
              {T.intro[lang]}
            </p>
          </Reveal>
        </div>

        {/* Pasos */}
        <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {STEPS.map((s, i) => (
            <StaggerItem key={s.num} className="h-full">
              <div className="gloss-card gloss-dark group relative flex h-full flex-col gap-5 rounded-[24px] p-7">
                {/* número de fondo */}
                <span
                  className="pointer-events-none absolute -right-2 -top-5 select-none text-[64px] font-extrabold leading-none tracking-tighter text-white/[0.07] transition-colors duration-500 group-hover:text-white/[0.13]"
                  aria-hidden
                >
                  {s.num}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-b from-white/15 to-white/5 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
                  <s.icon className="h-5.5 w-5.5 text-white" />
                </span>
                <div className="relative">
                  <h3 className="text-lg font-bold tracking-tight text-white">{s.title[lang]}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/62">{s.body[lang]}</p>
                </div>
                <p className="relative mt-auto inline-flex items-center gap-2 border-t border-white/10 pt-4 text-[12.5px] font-medium text-[#8FB0E8]">
                  <span className="h-1 w-1 rounded-full bg-[#8FB0E8]" />
                  {s.tip[lang]}
                </p>
                {/* conector al siguiente paso */}
                {i < STEPS.length - 1 && (
                  <ArrowRight
                    className="absolute -right-[22px] top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-white/25 lg:block"
                    aria-hidden
                  />
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Imagen de planta con parallax + CTA */}
        <Reveal delay={0.1}>
          <div className="relative mt-16 overflow-hidden rounded-[30px] border border-white/10">
            <div ref={imgRef} className="relative h-[340px] overflow-hidden sm:h-[420px]">
              <motion.div style={reduce ? undefined : { y: imgY }} className="absolute -inset-y-[10%] inset-x-0">
                <Image
                  src="/spc/planta.png"
                  alt={T.plantAlt[lang]}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1428]/94 via-[#0A1428]/55 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428]/85 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-center gap-6 p-8 sm:p-12">
                <div className="max-w-md">
                  <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                    {T.plantBadge[lang]}
                  </p>
                  <h3 className="display-tight text-3xl font-extrabold text-white sm:text-4xl">
                    {T.plantHeadingA[lang]}{" "}
                    <span className="font-serif font-normal italic text-silver">
                      {T.plantHeadingB[lang]}
                    </span>
                  </h3>
                  <p className="mt-4 text-pretty text-[15.5px] leading-relaxed text-white/70">
                    {T.plantIntro[lang]}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <WhatsAppButton message={WA_MESSAGES.start} size="md" className="w-full sm:w-auto">
                    {T.start[lang]}
                  </WhatsAppButton>
                  <a
                    href="#web-to-print"
                    className="btn-press inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.08] px-6 text-[15px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/[0.14]"
                  >
                    {T.knowWtp[lang]}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
