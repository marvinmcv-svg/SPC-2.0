"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Info, Lightbulb, Package, Clock, Layers3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WhatsAppButton } from "./whatsapp-button";
import { SPC } from "@/lib/spc";
import type { Service } from "@/lib/spc";

/** Ficha profunda del servicio — educativa y con CTA a WhatsApp */
export function ServiceDialog({
  service,
  open,
  onOpenChange,
}: {
  service: Service | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!service) return null;
  const d = service.details;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="gloss-card max-h-[88vh] w-[min(94vw,900px)] overflow-y-auto rounded-[28px] border-none p-0 sm:rounded-[32px]"
        aria-describedby={undefined}
      >
        {/* Encabezado visual */}
        <div className="relative h-[240px] overflow-hidden rounded-t-[28px] sm:h-[280px] sm:rounded-t-[32px]">
          <Image
            src={service.image}
            alt={`${service.title} — producción de SPC`}
            fill
            sizes="(max-width: 940px) 94vw, 900px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1526]/95 via-[#0C1526]/45 to-[#0C1526]/10" />
          <DialogHeader className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="mb-2.5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/35 bg-white/20 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                {service.categoryLabel}
              </span>
              {service.highlights.map((h) => (
                <span
                  key={h}
                  className="hidden rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md sm:inline-block"
                >
                  {h}
                </span>
              ))}
            </div>
            <DialogTitle className="display-tight text-left text-3xl font-extrabold text-white sm:text-4xl">
              {service.title}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 py-7 sm:px-8 sm:py-8">
          <DialogDescription asChild>
            <div className="space-y-8">
            {/* Intro educativa */}
            <p className="text-pretty text-[15.5px] leading-relaxed text-[#3B4E77]">{d.intro}</p>

            {/* Specs rápidos */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {d.specs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[#27519B]/10 bg-white/75 p-3.5 backdrop-blur-sm"
                >
                  <p className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#57678A]">
                    {s.label === "Tiraje recomendado" ? (
                      <Layers3 className="h-3 w-3" />
                    ) : s.label === "Tiempo de entrega" ? (
                      <Clock className="h-3 w-3" />
                    ) : (
                      <Package className="h-3 w-3" />
                    )}
                    {s.label}
                  </p>
                  <p className="mt-1 text-[12.5px] font-semibold leading-snug text-[#0C1526]">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Materiales / Acabados / Usos */}
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: "Materiales", items: d.materials, icon: Layers3 },
                { title: "Acabados", items: d.finishes, icon: Check },
                { title: "Usos típicos", items: d.useCases, icon: Info },
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#27519B]">
                    {col.title}
                  </h4>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13.5px] leading-snug text-[#3B4E77]">
                        <col.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3F6CC0]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Tip de experto */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-start gap-3.5 rounded-2xl border border-[#FFCF00]/40 bg-[#FFCF00]/[0.08] p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFCF00] to-[#E8A800] shadow-[0_8px_18px_-6px_rgba(255,207,0,0.6)]">
                <Lightbulb className="h-4.5 w-4.5 text-white" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8A6D00]">
                  Tip de experto SPC
                </p>
                <p className="mt-1 text-pretty text-[14px] leading-relaxed text-[#4A4426]">{d.tip}</p>
              </div>
            </motion.div>

            {/* CTA final del embudo */}
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-br from-[#0C1526] to-[#16233F] p-6 text-center">
              <p className="max-w-md text-pretty text-[14.5px] leading-relaxed text-white/70">
                ¿Listo para imprimir <strong className="font-semibold text-white">{service.title.toLowerCase()}</strong>?
                Cuéntanos tu proyecto y recibe una cotización clara hoy mismo.
              </p>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <WhatsAppButton message={service.message} size="md">
                  Cotizar por WhatsApp
                </WhatsAppButton>
                <a
                  href={SPC.webToPrintUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] px-6 text-[14px] font-semibold text-white/85 transition-all duration-300 hover:border-white/40 hover:bg-white/[0.14] hover:text-white"
                >
                  Pedir por Web to Print
                </a>
              </div>
            </div>
            </div>
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
