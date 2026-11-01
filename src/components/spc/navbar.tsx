"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { SpcLogo } from "./logo";
import { WhatsAppButton } from "./whatsapp-button";
import { SERVICES, WA_MESSAGES } from "@/lib/spc";
import { useRouter, type Route } from "./site-router";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const { route, navigate } = useRouter();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const isHome = route.name === "home";

  /* Navegación con cierre de menús */
  function go(next: Route, section?: string) {
    setOpen(false);
    setSvcOpen(false);
    navigate(next, section);
  }

  /* Bloquea el scroll del body cuando el menú móvil está abierto */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const LINKS: { label: string; active: boolean; onClick: () => void }[] = [
    { label: "Inicio", active: isHome, onClick: () => go({ name: "home" }) },
    { label: "Nosotros", active: route.name === "about", onClick: () => go({ name: "about" }) },
    { label: "Clientes", active: false, onClick: () => go({ name: "home" }, "clientes") },
    { label: "Tecnología", active: false, onClick: () => go({ name: "home" }, "tecnologia") },
    { label: "FAQ", active: false, onClick: () => go({ name: "home" }, "faq") },
    { label: "Contacto", active: false, onClick: () => go({ name: "home" }, "contacto") },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <nav
        aria-label="Navegación principal"
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border px-4 py-2.5 transition-all duration-500 ease-out sm:px-5",
          scrolled || open
            ? "glass-dark border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]"
            : "border-transparent bg-transparent"
        )}
      >
        {/* Marca */}
        <button
          type="button"
          onClick={() => go({ name: "home" })}
          className="relative z-10 flex items-center"
          aria-label="SPC — Inicio"
        >
          <SpcLogo variant="light" showTagline={false} className="h-8 w-auto sm:h-9" />
        </button>

        {/* Links desktop */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {/* Servicios — dropdown */}
          <li className="relative">
            <button
              type="button"
              onClick={() => go({ name: "home" }, "productos")}
              onMouseEnter={() => setSvcOpen(true)}
              onMouseLeave={() => setSvcOpen(false)}
              aria-expanded={svcOpen}
              className="btn-press group flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13.5px] font-medium text-white/75 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              Servicios
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  svcOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence>
              {svcOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 8, scale: 0.97, filter: "blur(4px)" }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  onMouseEnter={() => setSvcOpen(true)}
                  onMouseLeave={() => setSvcOpen(false)}
                  className="glass-dark absolute left-1/2 top-full z-50 mt-3 w-[320px] -translate-x-1/2 rounded-3xl border-white/10 p-2.5 shadow-2xl"
                >
                  {SERVICES.map((s, i) => (
                    <motion.button
                      key={s.id}
                      type="button"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * i }}
                      onClick={() => go({ name: "service", id: s.id })}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition-colors",
                        route.name === "service" && route.id === s.id
                          ? "bg-white/12"
                          : "hover:bg-white/10"
                      )}
                    >
                      <span className="relative h-9 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10">
                        <Image
                          src={s.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-semibold text-white/90">
                          {s.title}
                        </span>
                        <span className="block text-[10.5px] uppercase tracking-wide text-white/40">
                          {s.categoryLabel}
                        </span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {LINKS.map((l) => (
            <li key={l.label}>
              <button
                type="button"
                onClick={l.onClick}
                className={cn(
                  "btn-press relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-200 hover:bg-white/10 hover:text-white",
                  l.active ? "text-white" : "text-white/75"
                )}
              >
                {l.label}
                {l.active && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#7FA8EC]"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA + toggle */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block">
            <WhatsAppButton message={WA_MESSAGES.general} size="sm" className="shadow-lg">
              <span className="hidden md:inline">Cotiza aquí</span>
              <span className="md:hidden">Cotizar</span>
            </WhatsAppButton>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="btn-press flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil — sheet desde arriba */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="glass-dark absolute inset-x-3 top-[76px] max-h-[76vh] overflow-y-auto rounded-3xl border-white/10 p-4 shadow-2xl sm:inset-x-5 sm:top-[84px] lg:hidden"
          >
            <ul className="flex flex-col">
              <li className="px-2 pb-2 pt-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/40">
                Navegación
              </li>
              {[
                { label: "Inicio", onClick: () => go({ name: "home" }) },
                { label: "Nosotros", onClick: () => go({ name: "about" }) },
                { label: "Clientes", onClick: () => go({ name: "home" }, "clientes") },
                { label: "Tecnología", onClick: () => go({ name: "home" }, "tecnologia") },
                { label: "FAQ", onClick: () => go({ name: "home" }, "faq") },
                { label: "Contacto", onClick: () => go({ name: "home" }, "contacto") },
              ].map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, type: "spring", stiffness: 200, damping: 24 }}
                >
                  <button
                    type="button"
                    onClick={l.onClick}
                    className="btn-press group flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-white/85 transition-colors hover:bg-white/10 active:bg-white/15"
                  >
                    {l.label}
                    <ArrowUpRight className="h-4.5 w-4.5 text-white/35 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </button>
                </motion.li>
              ))}

              <li className="mt-3 px-2 pb-2 pt-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/40">
                Los 9 servicios
              </li>
              {SERVICES.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28 + 0.035 * i, type: "spring", stiffness: 200, damping: 24 }}
                >
                  <button
                    type="button"
                    onClick={() => go({ name: "service", id: s.id })}
                    className="btn-press group flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-left transition-colors hover:bg-white/10"
                  >
                    <span className="relative h-8 w-11 shrink-0 overflow-hidden rounded-lg border border-white/10">
                      <Image src={s.image} alt="" fill sizes="44px" className="object-cover" />
                    </span>
                    <span className="flex-1 truncate text-[14px] font-medium text-white/85">
                      {s.title}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="mt-3 px-1 pb-1 sm:hidden">
              <WhatsAppButton message={WA_MESSAGES.general} size="md" className="w-full">
                Cotiza por WhatsApp
              </WhatsAppButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
