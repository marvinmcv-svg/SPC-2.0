"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { Reveal } from "./reveal";
import { WhatsAppButton, WhatsAppIcon } from "./whatsapp-button";
import { SPC, WA_MESSAGES } from "@/lib/spc";

/** CTA final — el embudo converge en WhatsApp */
export function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section id="contacto" className="grain relative overflow-hidden bg-[#0A1428] py-24 sm:py-32">
      {/* Fondo premium: glow azul + retícula de marcas de registro */}
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgba(63,108,192,0.35),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,rgba(17,9,91,0.8),transparent_55%)]" />

      {/* marcas de registro decorativas */}
      <svg className="absolute left-[6%] top-[14%] hidden h-9 w-9 text-white/12 lg:block" viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
        <path d="M20 2v36M2 20h36" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <svg className="absolute bottom-[16%] right-[7%] hidden h-12 w-12 text-white/12 lg:block" viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
        <path d="M20 2v36M2 20h36" stroke="currentColor" strokeWidth="1.4" />
      </svg>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#4BE38A] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
            </span>
            Estamos en línea ahora
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="display-tight mt-7 text-balance text-4xl font-extrabold text-white sm:text-6xl lg:text-[4.2rem]">
            Tu próximo proyecto{" "}
            <span className="font-serif font-normal italic text-silver">empieza con un</span>{" "}
            <span className="text-glow-blue text-[#7FA8EC]">“Hola”</span>
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/65">
            Cuéntanos qué necesitas imprimir y recibe una cotización clara, con asesoría experta y
            la calidad de los líderes de la industria gráfica en Bolivia. Sin compromiso.
          </p>
        </Reveal>

        {/* Botón gigante de WhatsApp */}
        <Reveal delay={0.26}>
          <div className="relative mt-11">
            {!reduce && (
              <motion.div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-[#25D366]/40 blur-[46px]"
                animate={{ opacity: [0.5, 0.95, 0.5], scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <WhatsAppButton
              message={WA_MESSAGES.start}
              size="lg"
              className="h-16 px-10 text-lg sm:h-[68px] sm:px-12 sm:text-xl"
            >
              <WhatsAppIcon className="h-7 w-7" />
              Escribir por WhatsApp
            </WhatsAppButton>
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <p className="mt-5 text-[13.5px] font-medium text-white/50">
            Respuesta típica en minutos · Lun a Vie 8:00–18:00
          </p>
        </Reveal>

        {/* Datos de contacto */}
        <Reveal delay={0.4}>
          <div className="mt-14 grid w-full gap-4 sm:grid-cols-3">
            {[
              { icon: Phone, label: "Teléfonos", value: `${SPC.phone} · ${SPC.phoneAlt}` },
              { icon: Mail, label: "Correo", value: SPC.email },
              { icon: MapPin, label: "Planta", value: SPC.address },
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
