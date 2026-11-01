"use client";

import { Upload, MonitorSmartphone, Clock, ShieldCheck, ArrowUpRight, MessageCircle } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { WhatsAppIcon } from "./whatsapp-button";
import { SPC, waLink, WA_MESSAGES } from "@/lib/spc";

const FEATURES = [
  {
    icon: Upload,
    title: "Sube tus archivos",
    body: "Envía tus diseños listos para imprenta desde cualquier dispositivo, a la hora que sea.",
  },
  {
    icon: MonitorSmartphone,
    title: "Cotiza en línea",
    body: "Elige producto, papel y tiraje. El sistema calcula tu presupuesto al instante.",
  },
  {
    icon: Clock,
    title: "Síguelo en tiempo real",
    body: "Desde la orden hasta la entrega, conoce el estado exacto de tu producción.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad garantizada",
    body: "Mismo estándar SPC en cada pedido: preprensa profesional y control de color.",
  },
];

export function WebToPrint() {
  return (
    <section id="web-to-print" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-48 top-0 h-[520px] w-[520px] rounded-full bg-[#27519B]/[0.06] blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-10">
        {/* Mockup del portal */}
        <Reveal>
          <div className="relative mx-auto max-w-[520px]">
            {/* marco glossy estilo ventana */}
            <div className="gloss-card overflow-hidden rounded-[24px] p-2.5 shadow-[0_30px_70px_-24px_rgba(10,20,40,0.35)]">
              <div className="overflow-hidden rounded-[17px] bg-[#0E1930]">
                {/* barra de ventana */}
                <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                  <span className="ml-3 truncate rounded-md bg-white/8 px-3 py-1 text-[11px] font-medium text-white/55">
                    spc.net.bo/wtp2 · Portal Web to Print
                  </span>
                </div>
                {/* cuerpo */}
                <div className="grid gap-3 p-5 sm:grid-cols-2">
                  {[
                    { t: "Nuevo pedido", d: "Cotiza en 2 minutos", hot: true },
                    { t: "Mis archivos", d: "12 archivos listos" },
                    { t: "En producción", d: "Revistas Q3 · 60%" },
                    { t: "Historial", d: "38 pedidos entregados" },
                  ].map((c) => (
                    <div
                      key={c.t}
                      className={`rounded-xl border p-4 ${
                        c.hot
                          ? "border-[#3F6CC0]/60 bg-gradient-to-b from-[#3F6CC0]/25 to-[#27519B]/15"
                          : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <p className="text-[13.5px] font-bold text-white">{c.t}</p>
                      <p className="mt-1 text-[12px] text-white/55">{c.d}</p>
                      {c.hot && (
                        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/15 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-[#4BE38A]">
                          <MessageCircle className="h-3 w-3" />
                          Asesor en línea
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* chip flotante */}
            <div className="glass-dark absolute -bottom-5 -right-3 flex items-center gap-2.5 rounded-2xl px-4 py-3 sm:-right-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#25D366]" />
              </span>
              <p className="text-[12.5px] font-semibold text-white">Portal disponible 24/7</p>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#27519B]/15 bg-[#27519B]/[0.06] px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#27519B]">
              Web to Print
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-tight text-balance text-4xl font-extrabold tracking-tight text-[#0C1526] sm:text-5xl">
              Tu imprenta,{" "}
              <span className="font-serif font-normal italic text-[#27519B]">siempre abierta</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[#57678A]">
              Nuestro portal <strong className="font-semibold text-[#0C1526]">Web to Print</strong>{" "}
              digitaliza todo el ciclo del pedido: subes tu archivo, cotizas, apruebas y haces
              seguimiento — sin llamadas, sin esperas, sin fricción.
            </p>
          </Reveal>

          <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2" stagger={0.08}>
            {FEATURES.map((f) => (
              <StaggerItem key={f.title}>
                <div className="gloss-card group flex h-full gap-4 rounded-2xl p-5 transition-transform duration-300">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#3F6CC0] to-[#27519B] shadow-[0_8px_18px_-6px_rgba(39,81,155,0.5)] transition-transform duration-300 group-hover:scale-105">
                    <f.icon className="h-4.5 w-4.5 text-white" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0C1526]">{f.title}</h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-[#57678A]">{f.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* CTAs duales */}
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <a
                href={SPC.webToPrintUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-[#3F6CC0] to-[#27519B] px-7 text-[15.5px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(39,81,155,0.6)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_18px_38px_-10px_rgba(39,81,155,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27519B]"
              >
                Entrar al portal WTP
                <ArrowUpRight className="h-4.5 w-4.5" />
              </a>
              <a
                href={waLink(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex h-13 items-center justify-center gap-2.5 rounded-full border border-[#128C7E]/25 bg-white/70 px-7 text-[15.5px] font-semibold text-[#0E7A67] backdrop-blur-sm transition-all duration-300 hover:border-[#25D366]/50 hover:bg-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Prefiero que me asesoren
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
