"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";
import { TiltCard } from "./tilt-card";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { CLIENTS, REVIEWS, waLink, WA_MESSAGES, type Client } from "@/lib/spc";
import { WhatsAppIcon } from "./whatsapp-button";
import { cn } from "@/lib/utils";

/* ——— Logotipo real del cliente (png / jpg / svg) ——— */
function ClientLogo({ client }: { client: Client }) {
  const wide = ["entel", "deber", "inti"].includes(client.id);
  return (
    <span
      className="flex h-full w-full items-center justify-center px-5"
      title={`${client.name} · ${client.sector}`}
    >
      <Image
        src={client.logo}
        alt={`Logotipo de ${client.name}`}
        width={wide ? 150 : 92}
        height={wide ? 46 : 92}
        sizes="(max-width: 640px) 130px, 160px"
        className={cn(
          "w-auto object-contain transition-all duration-500",
          wide ? "max-h-[46px]" : client.chip ? "max-h-[64px] rounded-xl" : "max-h-[64px]"
        )}
        style={{ width: "auto", height: "auto", maxWidth: wide ? 150 : 92, maxHeight: wide ? 46 : 64 }}
        unoptimized={client.logo.endsWith(".svg")}
      />
    </span>
  );
}

/** Tile de logo: gris elegante → color de marca al pasar el cursor */
function LogoTile({ client }: { client: Client }) {
  return (
    <motion.div
      className="gloss-card flex h-[86px] w-[250px] shrink-0 items-center justify-center"
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <span className="grayscale-[0.85] opacity-70 transition-all duration-500 hover:grayscale-0 hover:opacity-100 [&:hover]:grayscale-0">
        <ClientLogo client={client} />
      </span>
    </motion.div>
  );
}

/** Fila de marquesina con la pared de logos */
function LogoRow({ clients, reverse = false }: { clients: Client[]; reverse?: boolean }) {
  const items = [...clients, ...clients];
  return (
    <div className="scroll-fade-x relative overflow-hidden py-2.5">
      <div
        className="marquee-track flex w-max gap-4"
        style={{ ["--marquee-d" as string]: reverse ? "46s" : "56s", animationDirection: reverse ? "reverse" : "normal" }}
      >
        {items.map((c, i) => (
          <LogoTile key={`${c.id}-${i}`} client={c} />
        ))}
      </div>
    </div>
  );
}

/** Estrellas de reseña */
function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-1" aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < n ? "fill-[#FFB800] text-[#FFB800]" : "fill-[#D7DDE8] text-[#D7DDE8]"}`}
        />
      ))}
    </span>
  );
}

/**
 * Clientes nacionales — pared de logotipos reales + reseñas.
 */
export function Clients() {
  const half = Math.ceil(CLIENTS.length / 2);
  const rowA = CLIENTS.slice(0, half);
  const rowB = CLIENTS.slice(half);

  return (
    <section
      id="clientes"
      className="relative overflow-hidden bg-gradient-to-b from-[#EDF1F9] via-[#F4F7FC] to-[#F7F9FD] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#27519B]/25 to-transparent" />
      <div className="pointer-events-none absolute -right-32 top-40 h-[380px] w-[380px] rounded-full bg-[#EC008C]/[0.05] blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#27519B]/15 bg-white/70 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#27519B] backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5" />
              Portafolio nacional
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-tight text-balance text-4xl font-extrabold tracking-tight text-[#0C1526] sm:text-5xl lg:text-[3.4rem]">
              Las grandes marcas de Bolivia{" "}
              <span className="font-serif font-normal italic text-[#27519B]">imprimen con SPC</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-[#57678A]">
              Laboratorios, industrias de alimentos, bancos, medios, editoriales e instituciones
              públicas — de La Paz a Santa Cruz, confían su imagen impresa en la planta de SPC.
            </p>
          </Reveal>
        </div>

        {/* Pared de logos reales en doble marquesina */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-[28px] border border-white/60 bg-white/45 p-4 shadow-[0_20px_50px_-24px_rgba(10,20,40,0.15)] backdrop-blur-xl sm:p-6">
            <LogoRow clients={rowA} />
            <LogoRow clients={rowB} reverse />
            <p className="mt-1 text-center text-[11.5px] font-medium text-[#8A94A6]">
              Una selección de empresas e instituciones de los sectores que atendemos en todo el país
            </p>
          </div>
        </Reveal>

        {/* Reseñas */}
        <div className="mt-20">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <Reveal>
                <h3 className="display-tight text-3xl font-extrabold tracking-tight text-[#0C1526] sm:text-4xl">
                  Lo que dicen quienes ya{" "}
                  <span className="font-serif font-normal italic text-[#27519B]">imprimen con nosotros</span>
                </h3>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <div className="gloss-card flex items-center gap-4 rounded-3xl px-6 py-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold tracking-tight text-silver-blue">5.0</span>
                  <Stars n={5} />
                </div>
                <div className="border-l border-[#0C1526]/8 pl-4 text-[12px] leading-tight text-[#57678A]">
                  Satisfacción promedio
                  <br />
                  de nuestros clientes
                </div>
              </div>
            </Reveal>
          </div>

          <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
            {REVIEWS.map((r, i) => (
              <StaggerItem key={r.name + r.role} className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}>
                <TiltCard className="h-full rounded-[26px]" maxTilt={6}>
                  <motion.figure className="gloss-card relative flex h-full flex-col gap-4 rounded-[26px] p-7">
                    <Quote className="absolute right-6 top-6 h-8 w-8 text-[#27519B]/10" aria-hidden />
                    <Stars n={r.rating} />
                    <blockquote className="text-pretty text-[15px] leading-relaxed text-[#2B3B5E]">
                      “{r.quote}”
                    </blockquote>
                    <figcaption className="mt-auto flex items-center gap-3.5 border-t border-[#0C1526]/8 pt-4">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3F6CC0] to-[#27519B] text-[13px] font-bold text-white shadow-[0_8px_18px_-8px_rgba(39,81,155,0.6)]"
                        aria-hidden
                      >
                        {r.name.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-bold text-[#0C1526]">{r.name}</p>
                        <p className="truncate text-[12px] text-[#57678A]">
                          {r.role} · {r.company}
                        </p>
                      </div>
                      <span className="ml-auto shrink-0 rounded-full border border-[#27519B]/12 bg-white/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#3B4E77]">
                        {r.sector}
                      </span>
                    </figcaption>
                  </motion.figure>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* CTA */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-4 text-center">
            <p className="text-pretty text-[15px] leading-relaxed text-[#57678A]">
              ¿Tu marca será la próxima en nuestra pared? Únete a las empresas que ya imprimen
              con los líderes de la industria gráfica boliviana.
            </p>
            <a
              href={waLink(WA_MESSAGES.start)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-[#128C7E]/25 bg-gradient-to-b from-[#25D366]/[0.09] to-[#128C7E]/[0.1] px-7 text-[14.5px] font-semibold text-[#0E7A67] transition-all duration-300 hover:border-[#25D366]/50 hover:from-[#25D366]/[0.16] hover:to-[#128C7E]/[0.18] hover:text-[#0A6B5A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
            >
              <WhatsAppIcon className="h-4.5 w-4.5" />
              Unirme a los clientes SPC
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
