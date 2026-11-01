"use client";

import { ArrowUpRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { SpcLogo } from "./logo";
import { SPC } from "@/lib/spc";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/8 bg-[#080F1E]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <SpcLogo variant="light" className="h-12 w-auto" />
            <p className="mt-5 max-w-sm text-pretty text-[15px] leading-relaxed text-white/55">
              {SPC.slogan}. Líderes de la industria gráfica en Bolivia desde {SPC.founded} —
              calidad, puntualidad, capacidad y servicio.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[12.5px] font-medium text-white/60">
              <Clock className="h-3.5 w-3.5 text-[#8FB0E8]" />
              Lun – Vie · 8:00 a 18:00
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Enlaces del sitio">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
              Explora
            </p>
            <ul className="mt-5 space-y-3">
              {[
                ["#inicio", "Inicio"],
                ["#nosotros", "Nosotros"],
                ["#productos", "Productos"],
                ["#proceso", "Proceso"],
                ["#web-to-print", "Web to Print"],
                ["#contacto", "Contacto"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="btn-press group inline-flex items-center gap-1.5 text-[15px] font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
              Contacto directo
            </p>
            <ul className="mt-5 space-y-4 text-[15px]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#8FB0E8]" />
                <span className="text-white/70">{SPC.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#8FB0E8]" />
                <a href="tel:+5912211121" className="text-white/70 transition-colors hover:text-white">
                  {SPC.phone}
                </a>
                <span className="text-white/30">·</span>
                <a href="tel:+59122248260" className="text-white/70 transition-colors hover:text-white">
                  {SPC.phoneAlt}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#8FB0E8]" />
                <a
                  href={`mailto:${SPC.email}`}
                  className="break-all text-white/70 transition-colors hover:text-white"
                >
                  {SPC.email}
                </a>
              </li>
            </ul>
            <a
              href={SPC.webToPrintUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-[13.5px] font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/[0.1] hover:text-white"
            >
              Portal Web to Print
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Línea legal */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-7 text-[13px] text-white/40 sm:flex-row">
          <p>
            © {year} {SPC.name} · {SPC.brand}. Todos los derechos reservados.
          </p>
          <p className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-1" aria-hidden>
              <i className="h-1.5 w-1.5 rounded-full bg-[#00AEEF]" />
              <i className="h-1.5 w-1.5 rounded-full bg-[#EC008C]" />
              <i className="h-1.5 w-1.5 rounded-full bg-[#FFCF00]" />
              <i className="h-1.5 w-1.5 rounded-full bg-[#39435C]" />
            </span>
            Hecho en Bolivia con precisión
          </p>
        </div>
      </div>
    </footer>
  );
}
