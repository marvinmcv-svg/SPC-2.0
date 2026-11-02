"use client";

import { CmykDots } from "./hero";
import { useLang } from "./lang";

/** Banda metálica con marquesina infinita — valores de SPC */
export function Marquee() {
  const { lang } = useLang();
  const ITEMS = {
    es: ["CALIDAD", "PUNTUALIDAD", "CAPACIDAD", "SERVICIO", "EL FACTOR HUMANO MARCA LA DIFERENCIA"],
    en: ["QUALITY", "PUNCTUALITY", "CAPACITY", "SERVICE", "THE HUMAN FACTOR MAKES THE DIFFERENCE"],
  }[lang];
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className="metal-band relative z-20 overflow-hidden border-y border-[#0c1526]/10 py-4 shadow-[0_10px_40px_-18px_rgba(10,20,40,0.4)]"
      aria-label={lang === "es" ? "Valores de SPC" : "SPC values"}
    >
      <div className="marquee-track flex w-max items-center" key={lang}>
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="whitespace-nowrap px-6 text-sm font-bold uppercase tracking-[0.18em] text-[#2a3447]/85">
              {item}
            </span>
            {i === ITEMS.length - 1 || i === row.length - 1 ? null : (
              <CmykDots className="mx-1 opacity-70" />
            )}
          </span>
        ))}
      </div>
      {/* Degradados suaves en los bordes en lugar de cortes duros */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#e9edf4] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#e9edf4] to-transparent" />
    </div>
  );
}
