"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { SpcLogo } from "./logo";
import { WhatsAppButton } from "./whatsapp-button";
import { WA_MESSAGES } from "@/lib/spc";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#productos", label: "Productos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#web-to-print", label: "Web to Print" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Bloquea el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
        <a href="#inicio" className="relative z-10 flex items-center" aria-label="SPC — Inicio">
          <SpcLogo variant="light" showTagline={false} className="h-8 w-auto sm:h-9" />
        </a>

        {/* Links desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="btn-press relative rounded-full px-3.5 py-2 text-[13.5px] font-medium text-white/75 transition-colors duration-200 hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </a>
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

      {/* Menú móvil — sheet desde arriba, misma vía de entrada/salida */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="glass-dark absolute inset-x-3 top-[76px] rounded-3xl border-white/10 p-4 shadow-2xl sm:inset-x-5 sm:top-[84px] lg:hidden"
          >
            <ul className="flex flex-col">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, type: "spring", stiffness: 200, damping: 24 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="btn-press group flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-white/85 transition-colors hover:bg-white/10 active:bg-white/15"
                  >
                    {l.label}
                    <ArrowUpRight className="h-4.5 w-4.5 text-white/35 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </a>
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
