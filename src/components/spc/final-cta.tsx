"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircleHeart } from "lucide-react";
import { Reveal } from "./reveal";
import { QuoteForm } from "./quote-form";
import { useLang } from "./lang";
import { SPC } from "@/lib/spc";

/** CTA final — cotizador con vista previa de WhatsApp (el embudo converge aquí) */
export function FinalCta() {
  const reduce = useReducedMotion();
  const { lang } = useLang();

  const T = {
    online: { es: "Estamos en línea ahora", en: "We're online right now" },
    headingA: { es: "Arma tu cotización", en: "Build your quote" },
    headingB: { es: "en 30 segundos", en: "in 30 seconds" },
    headingC: { es: "— y envíala por WhatsApp", en: "— and send it on WhatsApp" },
    intro: {
      es: "Elige el producto, define la cantidad y mira cómo se arma tu mensaje en vivo. Un asesor experto te responde con la cotización — normalmente en minutos.",
      en: "Pick the product, set the quantity and watch your message build live. An expert advisor replies with the quote — usually within minutes.",
    },
    hours: { es: "Lun a Vie 8:00–18:00 · entrega a los 9 departamentos", en: "Mon–Fri 8:00–18:00 · delivery to all 9 departments" },
    phones: { es: "Teléfonos", en: "Phones" },
    email: { es: "Correo", en: "Email" },
    plant: { es: "Planta", en: "Plant" },
  };

  return (
    <section id="contacto" className="grain relative overflow-hidden bg-[#0A1428] py-24 sm:py-32">
      {/* Fondo premium: glow azul + viñeta */}
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_18%_-10%,rgba(63,108,192,0.32),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,rgba(17,9,91,0.8),transparent_55%)]" />
      {/* marcas de registro decorativas */}
      <svg className="absolute left-[5%] top-[10%] hidden h-9 w-9 text-white/10 lg:block" viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
        <path d="M20 2v36M2 20h36" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <svg className="absolute bottom-[14%] right-[6%] hidden h-12 w-12 text-white/10 lg:block" viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
        <path d="M20 2v36M2 20h36" stroke="currentColor" strokeWidth="1.4" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#4BE38A] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
              </span>
              {T.online[lang]}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="display-tight mt-7 text-balance text-4xl font-extrabold text-white sm:text-5xl lg:text-[3.6rem]">
              {T.headingA[lang]}{" "}
              <span className="font-serif font-normal italic text-silver">{T.headingB[lang]}</span>{" "}
              <span className="text-glow-blue text-[#7FA8EC]">{T.headingC[lang]}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/60">
              {T.intro[lang]}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <motion.p
              className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-medium text-white/45"
              animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <MessageCircleHeart className="h-3.5 w-3.5 text-[#4BE38A]" />
                {SPC.whatsapp.display} · WhatsApp Business
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" aria-hidden />
              <span>{T.hours[lang]}</span>
            </motion.p>
          </Reveal>
        </div>

        {/* Formulario + vista previa en vivo */}
        <QuoteForm />

        {/* Datos de contacto */}
        <Reveal delay={0.2}>
          <div className="mt-16 grid w-full gap-4 sm:grid-cols-3">
            {[
              { icon: Phone, label: T.phones[lang], value: `${SPC.phone} · ${SPC.phoneAlt}` },
              { icon: Mail, label: T.email[lang], value: SPC.email },
              { icon: MapPin, label: T.plant[lang], value: SPC.address },
            ].map((c) => (
              <div key={c.label} className="glass-dark flex items-center gap-4 rounded-2xl px-5 py-4 text-left">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.08]">
                  <c.icon className="h-4.5 w-4.5 text-[#8FB0E8]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">
                    {c.label}
                  </p>
                  <p className="truncate text-[13.5px] font-medium text-white/85">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
