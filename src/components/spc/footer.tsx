"use client";

import { ArrowUpRight, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { SpcLogo } from "./logo";
import { useLang } from "./lang";
import { SERVICES, SPC, waLink, WA_MESSAGES, pick } from "@/lib/spc";
import { SHARED } from "@/lib/i18n";
import { useRouter, type Route } from "./site-router";

export function Footer() {
  const year = new Date().getFullYear();
  const { navigate } = useRouter();
  const { lang } = useLang();

  function go(next: Route, section?: string) {
    navigate(next, section);
  }

  const T = {
    about: {
      es: `${SPC.slogan.es}. Líderes de la industria gráfica en Bolivia desde ${SPC.founded} — calidad, puntualidad, capacidad y servicio.`,
      en: `${SPC.slogan.en}. Leaders of Bolivia's graphics industry since ${SPC.founded} — quality, punctuality, capacity and service.`,
    },
    hours: { es: "Lun – Vie · 8:00 a 18:00", en: "Mon – Fri · 8:00 to 18:00" },
    directWa: { es: "WhatsApp directo", en: "Direct WhatsApp" },
    explore: { es: "Explora", en: "Explore" },
    services: { es: "Los 9 servicios", en: "The 9 product lines" },
    contactDirect: { es: "Contacto directo", en: "Direct contact" },
    portal: { es: "Portal Web to Print", en: "Web to Print portal" },
    links: {
      es: [
        { label: "Inicio", onClick: () => go({ name: "home" }) },
        { label: "Nosotros", onClick: () => go({ name: "about" }) },
        { label: "Productos", onClick: () => go({ name: "home" }, "productos") },
        { label: "Industrias", onClick: () => go({ name: "home" }, "industrias") },
        { label: "Clientes", onClick: () => go({ name: "home" }, "clientes") },
        { label: "Tecnología", onClick: () => go({ name: "home" }, "tecnologia") },
        { label: "Proceso", onClick: () => go({ name: "home" }, "proceso") },
        { label: "Web to Print", onClick: () => go({ name: "home" }, "web-to-print") },
        { label: "Preguntas frecuentes", onClick: () => go({ name: "home" }, "faq") },
        { label: "Contacto", onClick: () => go({ name: "home" }, "contacto") },
      ],
      en: [
        { label: "Home", onClick: () => go({ name: "home" }) },
        { label: "About us", onClick: () => go({ name: "about" }) },
        { label: "Products", onClick: () => go({ name: "home" }, "productos") },
        { label: "Industries", onClick: () => go({ name: "home" }, "industrias") },
        { label: "Clients", onClick: () => go({ name: "home" }, "clientes") },
        { label: "Technology", onClick: () => go({ name: "home" }, "tecnologia") },
        { label: "Process", onClick: () => go({ name: "home" }, "proceso") },
        { label: "Web to Print", onClick: () => go({ name: "home" }, "web-to-print") },
        { label: "FAQ", onClick: () => go({ name: "home" }, "faq") },
        { label: "Contact", onClick: () => go({ name: "home" }, "contacto") },
      ],
    },
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
    madeIn: { es: "Hecho en Bolivia con precisión", en: "Made in Bolivia with precision" },
    siteLinks: { es: "Enlaces del sitio", en: "Site links" },
  };

  return (
    <footer className="relative border-t border-white/8 bg-[#080F1E]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <SpcLogo variant="light" className="h-12 w-auto" />
            <p className="mt-5 max-w-sm text-pretty text-[15px] leading-relaxed text-white/55">
              {T.about[lang]}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[12.5px] font-medium text-white/60">
              <Clock className="h-3.5 w-3.5 text-[#8FB0E8]" />
              {T.hours[lang]}
            </p>
            <a
              href={waLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press mt-4 flex items-center gap-2.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/[0.08] px-4 py-2.5 text-[13.5px] font-semibold text-[#4BE38A] transition-all duration-300 hover:border-[#25D366]/60 hover:bg-[#25D366]/[0.15] hover:text-[#6BEB9A]"
            >
              <MessageCircle className="h-4 w-4" />
              {T.directWa[lang]} · {SPC.whatsapp.display}
            </a>
          </div>

          {/* Navegación */}
          <nav aria-label={T.siteLinks[lang]}>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
              {T.explore[lang]}
            </p>
            <ul className="mt-5 space-y-3">
              {T.links[lang].map((l) => (
                <li key={l.label}>
                  <button
                    type="button"
                    onClick={l.onClick}
                    className="btn-press group inline-flex items-center gap-1.5 text-[15px] font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios + contacto */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
              {T.services[lang]}
            </p>
            <ul className="mt-5 max-h-[300px] space-y-2.5 overflow-y-auto pr-1">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => go({ name: "service", id: s.id })}
                    className="btn-press text-left text-[13.5px] font-medium text-white/60 transition-colors hover:text-white"
                  >
                    {pick(s.title, lang)}
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
              {T.contactDirect[lang]}
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
              {T.portal[lang]}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Línea legal */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-7 text-[13px] text-white/40 sm:flex-row">
          <p>
            © {year} {SPC.name} · {SPC.brand}. {T.rights[lang]}
          </p>
          <p className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-1" aria-hidden>
              <i className="h-1.5 w-1.5 rounded-full bg-[#00AEEF]" />
              <i className="h-1.5 w-1.5 rounded-full bg-[#EC008C]" />
              <i className="h-1.5 w-1.5 rounded-full bg-[#FFCF00]" />
              <i className="h-1.5 w-1.5 rounded-full bg-[#39435C]" />
            </span>
            {T.madeIn[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}
