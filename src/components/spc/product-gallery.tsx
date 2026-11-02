"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { TiltCard } from "./tilt-card";
import { GALLERY, PHOTO_CREDITS, pick } from "@/lib/spc";
import { useLang } from "./lang";
import { cn } from "@/lib/utils";

/**
 * ProductGallery — muro de productos reales impresos.
 * Prueba social visual: fotografías de piezas de producción y marca
 * reales, con masonry animado estilo Apple.
 */
export function ProductGallery() {
  const { lang } = useLang();
  const reduce = useReducedMotion();

  const T = {
    badge: { es: "Productos reales", en: "Real products" },
    headingA: { es: "Así se ve", en: "This is what" },
    headingB: { es: "la impresión de verdad", en: "real printing" },
    headingC: { es: "", en: "looks like" },
    intro: {
      es: "Nada de renders: cajas, libros, bolsas, revistas y prensa corriendo a todo color. Estas son las piezas que salen de imprentas como la nuestra todos los días.",
      en: "No renders here: boxes, books, bags, magazines and presses running full color. These are the pieces that come out of print shops like ours every day.",
    },
    credit: {
      es: "Fotografías de producción bajo licencias Creative Commons (Wikimedia Commons). Créditos:",
      en: "Production photographs under Creative Commons licenses (Wikimedia Commons). Credits:",
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#0A1428] py-24 sm:py-32">
      {/* Fondos premium */}
      <div className="absolute inset-0 bg-[radial-gradient(75%_55%_at_15%_0%,rgba(63,108,192,0.20),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_90%_100%,rgba(17,9,91,0.55),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8FB0E8] backdrop-blur-md">
              <Camera className="h-3.5 w-3.5" />
              {T.badge[lang]}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-tight text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              {lang === "es" ? (
                <>
                  Así se ve{" "}
                  <span className="font-serif font-normal italic text-silver">la impresión de verdad</span>
                </>
              ) : (
                <>
                  This is what{" "}
                  <span className="font-serif font-normal italic text-silver">real printing</span> looks
                  like
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/60">{T.intro[lang]}</p>
          </Reveal>
        </div>

        {/* Masonry de productos reales */}
        <StaggerGroup
          className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
          stagger={0.08}
        >
          {GALLERY.map((g, i) => (
            <StaggerItem
              key={g.image}
              className={cn(
                g.span === "wide" && "col-span-2",
                g.span === "tall" && "row-span-2"
              )}
            >
              <TiltCard className="h-full rounded-[22px]" maxTilt={6}>
                <motion.figure
                  className="gloss-card gloss-dark group relative flex h-full flex-col overflow-hidden rounded-[22px]"
                  whileHover={reduce ? undefined : { y: -5 }}
                  transition={{ type: "spring", stiffness: 240, damping: 20 }}
                >
                  <div
                    className={cn(
                      "relative w-full overflow-hidden",
                      g.span === "tall" ? "aspect-[3/4] lg:aspect-auto lg:h-full" : "aspect-[4/3]"
                    )}
                  >
                    <Image
                      src={g.image}
                      alt={`${pick(g.title, lang)} — ${pick(g.caption, lang)}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428]/85 via-transparent to-transparent" />
                    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                    <figcaption className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-[14px] font-bold leading-tight text-white">
                        {pick(g.title, lang)}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[11.5px] leading-snug text-white/65">
                        {pick(g.caption, lang)}
                      </p>
                    </figcaption>
                  </div>
                </motion.figure>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Créditos de fotografía (licencias CC) */}
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-3xl text-center text-[11px] leading-relaxed text-white/30">
            {T.credit[lang]}{" "}
            {PHOTO_CREDITS.map((c) => `${c.author} (${c.license})`).join(" · ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
