"use client";

import { motion } from "framer-motion";
import { Apple, Pill, ShoppingBag, BookOpen, Landmark, ArrowUpRight, Lightbulb } from "lucide-react";
import { TiltCard } from "./tilt-card";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { WhatsAppIcon } from "./whatsapp-button";
import { INDUSTRIES, waLink } from "@/lib/spc";

const ICONS = {
  food: Apple,
  pharma: Pill,
  retail: ShoppingBag,
  editorial: BookOpen,
  gov: Landmark,
} as const;

/**
 * Industrias servidas — educa sobre cada sector y guía al CTA.
 */
export function Industries() {
  return (
    <section
      id="industrias"
      className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FD] via-[#F1F5FB] to-[#EDF1F9] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#27519B]/25 to-transparent" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[380px] w-[380px] rounded-full bg-[#3F6CC0]/[0.06] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#27519B]/15 bg-white/70 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#27519B] backdrop-blur-sm">
              Industrias que servimos
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-tight text-balance text-4xl font-extrabold tracking-tight text-[#0C1526] sm:text-5xl lg:text-[3.4rem]">
              Conocemos tu sector,{" "}
              <span className="font-serif font-normal italic text-[#27519B]">hablamos tu idioma</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-[#57678A]">
              Cada industria exige algo distinto de la impresión: resistencia, trazabilidad,
              presencia en góndola o fecha de entrega. Dos décadas imprimiendo para los sectores
              que mueven Bolivia.
            </p>
          </Reveal>
        </div>

        {/* Tarjetas 3D glossy por industria */}
        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {INDUSTRIES.map((ind) => {
            const Icon = ICONS[ind.icon];
            return (
              <StaggerItem key={ind.id} className={ind.id === "instituciones" ? "sm:col-span-2 lg:col-span-1" : ""}>
                <TiltCard className="h-full rounded-[26px]" maxTilt={7}>
                  <article className="gloss-card group flex h-full flex-col gap-5 rounded-[26px] p-7">
                    <div className="flex items-start justify-between">
                      <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3F6CC0] to-[#27519B] shadow-[0_12px_26px_-10px_rgba(39,81,155,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-rotate-6 group-hover:scale-105">
                        <Icon className="h-6 w-6 text-white" />
                      </span>
                      <span className="rounded-full border border-[#27519B]/12 bg-white/70 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#3B4E77]">
                        {ind.name.split(" ")[0]}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-[#0C1526]">{ind.name}</h3>
                      <p className="mt-0.5 text-[13px] font-medium italic text-[#3F6CC0]">
                        {ind.tagline}
                      </p>
                      <p className="mt-3 text-pretty text-[14.5px] leading-relaxed text-[#57678A]">
                        {ind.description}
                      </p>
                    </div>

                    <ul className="flex flex-wrap gap-1.5">
                      {ind.products.map((p) => (
                        <li
                          key={p}
                          className="rounded-full border border-[#27519B]/10 bg-[#27519B]/[0.05] px-2.5 py-1 text-[11.5px] font-medium text-[#3B4E77]"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>

                    {/* Insight educativo */}
                    <div className="mt-auto flex items-start gap-2.5 rounded-2xl border border-[#FFCF00]/35 bg-[#FFCF00]/[0.07] p-3.5">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#C79A00]" />
                      <p className="text-[12.5px] leading-snug text-[#4A4426]">{ind.insight}</p>
                    </div>

                    <a
                      href={waLink(ind.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press group/cta inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#128C7E]/25 bg-gradient-to-b from-[#25D366]/[0.08] to-[#128C7E]/[0.09] text-[13.5px] font-semibold text-[#0E7A67] transition-all duration-300 hover:border-[#25D366]/50 hover:from-[#25D366]/[0.15] hover:to-[#128C7E]/[0.16] hover:text-[#0A6B5A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                      aria-label={`Cotizar para la industria ${ind.name} por WhatsApp`}
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Cotizar para {ind.name.toLowerCase()}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-40 transition-all duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 group-hover/cta:opacity-90" />
                    </a>
                  </article>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
