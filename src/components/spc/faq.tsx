"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageCircleQuestion, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { openSpcAi } from "./hero";
import { WhatsAppButton } from "./whatsapp-button";
import { useLang } from "./lang";
import { WA_MESSAGES, FAQS, pick } from "@/lib/spc";

/**
 * FAQ educativa + promo de SPenCer (recepcionista virtual con IA).
 */
export function Faq() {
  const { lang } = useLang();

  const T = {
    badge: { es: "Preguntas frecuentes", en: "Frequent questions" },
    headingA: { es: "Todo lo que necesitas saber", en: "Everything you need to know" },
    headingB: { es: "antes de imprimir", en: "before you print" },
    intro: {
      es: "Tirajes, plazos, archivos y cotizaciones — respuestas claras para decidir con seguridad. ¿Algo más específico? Pregunta abajo.",
      en: "Run sizes, lead times, files and quotes — clear answers to decide with confidence. Something more specific? Ask below.",
    },
    aiBadge: { es: "Recepcionista virtual con IA", en: "AI virtual receptionist" },
    meet: { es: "Conoce a", en: "Meet" },
    spencerIntro: {
      es: "SPenCer te guía de la idea a la cotización: responde al instante tus dudas de tirajes, plazos, materiales y precios orientativos — y cuando estás listo, te conecta por WhatsApp con un asesor. Disponible 24/7.",
      en: "SPenCer guides you from idea to quote: instantly answers your questions about run sizes, lead times, materials and indicative prices — and when you're ready, connects you with an advisor on WhatsApp. Available 24/7.",
    },
    chat: { es: "Chatear con SPenCer", en: "Chat with SPenCer" },
    chips: {
      es: ["¿Cuánto cuesta imprimir 500 revistas?", "¿Hacen bolsas de papel?", "¿Cuál es el tiraje mínimo?"],
      en: ["How much does it cost to print 500 magazines?", "Do you make paper bags?", "What's the minimum run?"],
    },
    openAi: {
      es: "Abrir chat de SPenCer, la recepcionista virtual con IA",
      en: "Open SPenCer chat, the AI virtual receptionist",
    },
    humanTitle: { es: "¿Prefieres una persona?", en: "Prefer a person?" },
    humanSub: { es: "Un asesor real, en minutos", en: "A real advisor, in minutes" },
    humanCta: { es: "Hablar con un asesor", en: "Talk to an advisor" },
  };

  return (
    <section id="faq" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 bottom-24 h-[420px] w-[420px] rounded-full bg-[#27519B]/[0.06] blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Columna izquierda: encabezado + FAQ */}
          <div>
            <Reveal>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#27519B]/15 bg-[#27519B]/[0.06] px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#27519B]">
                <MessageCircleQuestion className="h-3.5 w-3.5" />
                {T.badge[lang]}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-tight text-balance text-4xl font-extrabold tracking-tight text-[#0C1526] sm:text-5xl">
                {T.headingA[lang]}{" "}
                <span className="font-serif font-normal italic text-[#27519B]">{T.headingB[lang]}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-[#57678A]">
                {T.intro[lang]}
              </p>
            </Reveal>

            <StaggerGroup className="mt-10" stagger={0.06}>
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((f, i) => (
                  <StaggerItem key={i}>
                    <AccordionItem
                      value={`faq-${i}-${lang}`}
                      className="rounded-2xl border-none px-0 [&:last-child]:border-b-0"
                    >
                      <AccordionTrigger className="group rounded-2xl px-5 py-4 text-left text-[16px] font-semibold text-[#0C1526] transition-colors hover:bg-[#27519B]/[0.045] hover:no-underline data-[state=open]:bg-[#27519B]/[0.06] [&[data-state=open]>svg]:rotate-180">
                        <span className="flex items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#27519B]/[0.09] text-[12px] font-extrabold text-[#27519B]">
                            {i + 1}
                          </span>
                          {pick(f.q, lang)}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-5 pt-1 text-[14.5px] leading-relaxed text-[#57678A]">
                        {pick(f.a, lang)}
                      </AccordionContent>
                    </AccordionItem>
                  </StaggerItem>
                ))}
              </Accordion>
            </StaggerGroup>
          </div>

          {/* Columna derecha: SPC AI + ayuda humana */}
          <div className="flex flex-col gap-6 lg:pt-24">
            {/* Promo SPC AI */}
            <Reveal delay={0.12}>
              <motion.button
                type="button"
                onClick={openSpcAi}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="gloss-card group relative w-full overflow-hidden rounded-[28px] p-8 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27519B]/60"
                aria-label={T.openAi[lang]}
              >
                {/* halo animado */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#3F6CC0]/[0.14] blur-[50px] transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-start gap-5">
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6F9AE8] to-[#27519B] shadow-[0_14px_30px_-10px_rgba(39,81,155,0.7)]">
                    <Sparkles className="h-6.5 w-6.5 text-white" />
                    <motion.span
                      className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-[#25D366]"
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      aria-hidden
                    />
                  </span>
                  <div>
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#3F6CC0]">
                      {T.aiBadge[lang]}
                    </p>
                    <h3 className="display-tight mt-1.5 text-[1.7rem] font-extrabold tracking-tight text-[#0C1526]">
                      {T.meet[lang]} <span className="text-silver-blue">SPenCer</span>
                    </h3>
                    <p className="mt-2.5 text-pretty text-[14px] leading-relaxed text-[#57678A]">
                      {T.spencerIntro[lang]}
                    </p>
                    <span className="btn-press mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#3F6CC0] to-[#27519B] px-5 text-[14px] font-semibold text-white shadow-[0_12px_26px_-10px_rgba(39,81,155,0.65)]">
                      {T.chat[lang]}
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>

                {/* chips de ejemplo */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {T.chips[lang].map((q) => (
                    <span
                      key={q}
                      className="rounded-full border border-[#27519B]/12 bg-white/75 px-3 py-1.5 text-[11.5px] font-medium text-[#3B4E77]"
                    >
                      “{q}”
                    </span>
                  ))}
                </div>
              </motion.button>
            </Reveal>

            {/* Ayuda humana */}
            <Reveal delay={0.2}>
              <div className="gloss-card flex flex-col gap-4 rounded-[28px] p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2FE074] to-[#128C7E] shadow-[0_10px_22px_-8px_rgba(18,140,126,0.6)]">
                    <svg viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5 text-white" aria-hidden>
                      <path d="M23.92 18.16c-.16-.08-1.897-.935-2.19-1.042-.293-.106-.507-.16-.72.16-.213.32-.826 1.042-1.013 1.256-.187.214-.373.24-.693.08-.32-.16-1.35-.498-2.57-1.585-.95-.847-1.592-1.893-1.778-2.213-.187-.32-.02-.494.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.053-.56-.107-.16-.96-2.314-1.314-3.17-.346-.832-.698-.72-.96-.732-.248-.012-.532-.014-.816-.014-.283 0-.744.107-1.134.532-.39.426-1.487 1.452-1.487 3.54 0 2.086 1.52 4.103 1.733 4.389.213.286 2.99 4.568 7.24 6.403 1.011.436 1.802.696 2.417.892.948.301 1.81.258 2.494.157.761-.114 2.345-.958 2.676-1.884.33-.926.33-1.72.23-1.884-.099-.163-.356-.257-.75-.443z" />
                      <path d="M16.045 2.4C8.61 2.4 2.583 8.427 2.583 15.862c0 2.372.62 4.695 1.795 6.744L2.4 29.6l7.135-1.94a13.39 13.39 0 0 0 6.51 1.672h.005c7.434 0 13.462-6.027 13.462-13.462 0-3.597-1.4-6.975-3.943-9.51a13.355 13.355 0 0 0-9.51-3.96h-.004zm0 24.583h-.004a11.13 11.13 0 0 1-5.669-1.552l-.406-.24-4.212 1.15 1.125-4.108-.264-.42a11.108 11.108 0 0 1-1.702-5.95c0-6.148 5.003-11.15 11.155-11.15 2.98 0 5.778 1.162 7.883 3.27a11.093 11.093 0 0 1 3.267 7.888c0 6.148-5.004 11.152-11.153 11.152z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-[#0C1526]">{T.humanTitle[lang]}</p>
                    <p className="text-[12.5px] text-[#57678A]">{T.humanSub[lang]}</p>
                  </div>
                </div>
                <WhatsAppButton message={WA_MESSAGES.general} size="md" className="w-full">
                  {T.humanCta[lang]}
                </WhatsAppButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
