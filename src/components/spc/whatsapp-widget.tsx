"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Send, ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-button";
import { SpcMark } from "./logo";
import { SPC, waLink, WA_MESSAGES } from "@/lib/spc";

/**
 * Widget flotante estilo oficial de WhatsApp:
 * burbuja verde → tarjeta de chat anclada al disparador (consistencia espacial),
 * con mensaje de bienvenida, respuestas rápidas y entrada de texto que abre wa.me.
 */
export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [text, setText] = useState("");
  const [bubbles, setBubbles] = useState<{ role: "user" | "spc"; text: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  // Pulso de atención suave a los 7s (una sola vez, respeta reduced-motion)
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setHint(true), 7000);
    return () => clearTimeout(t);
  }, [reduce]);

  // Enfoca el input al abrir
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  function send(message: string) {
    const clean = message.trim();
    if (!clean) return;
    setBubbles((b) => [...b, { role: "user", text: clean }]);
    setTimeout(() => {
      setBubbles((b) => [
        ...b,
        {
          role: "spc",
          text: "¡Perfecto! Te llevamos a WhatsApp para continuar con un asesor 👇",
        },
      ]);
    }, 550);
    // abre WhatsApp con el mensaje del usuario
    window.open(waLink(clean), "_blank", "noopener,noreferrer");
    setText("");
  }

  const quickReplies = [
    { label: "Quiero cotizar packaging", msg: WA_MESSAGES.packaging },
    { label: "Impresión digital", msg: WA_MESSAGES.digital },
    { label: "Hablar con un asesor", msg: WA_MESSAGES.general },
  ];

  return (
    <>
      {/* ——— Tarjeta de chat (anclada al botón, misma vía de entrada/salida) ——— */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="wa-chat"
            initial={{ opacity: 0, scale: 0.86, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.88, y: 24, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-24 right-3 z-[60] flex w-[min(92vw,380px)] flex-col overflow-hidden rounded-[26px] border border-black/8 bg-white shadow-[0_40px_90px_-20px_rgba(10,20,40,0.5)] sm:bottom-26 sm:right-6"
            role="dialog"
            aria-label="Chat de WhatsApp con SPC"
          >
            {/* Header verde oficial */}
            <div className="relative flex items-center gap-3 bg-gradient-to-b from-[#1DAB61] to-[#128C7E] px-4 py-3.5">
              <span className="absolute inset-x-0 top-0 h-[3px] bg-white/25" />
              <div className="relative">
                <SpcMark className="h-11 w-11 rounded-full ring-2 ring-white/60" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#128C7E] bg-[#25D366]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold text-white">{SPC.whatsapp.displayName}</p>
                <p className="text-[12px] font-medium text-white/85">
                  En línea · típicamente responde en minutos
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar chat"
                className="btn-press flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cuerpo del chat con fondo estilo WhatsApp */}
            <div
              className="relative flex max-h-[46vh] min-h-[240px] flex-col gap-2.5 overflow-y-auto px-4 py-5"
              style={{
                backgroundColor: "#E7E1D9",
                backgroundImage:
                  "radial-gradient(rgba(18,60,50,0.06) 1px, transparent 1px), radial-gradient(rgba(18,60,50,0.05) 1px, transparent 1px)",
                backgroundSize: "22px 22px, 22px 22px",
                backgroundPosition: "0 0, 11px 11px",
              }}
            >
              {/* mensaje de bienvenida */}
              <div className="mx-auto mb-1 max-w-[85%] rounded-xl bg-[#FFF3C4] px-3.5 py-2 text-center text-[11.5px] font-medium text-[#5C5326] shadow-sm">
                🔒 Conversación protegida · continúa en WhatsApp
              </div>
              <Bubble role="spc">
                ¡Hola! 👋 Somos <strong>SPC Gráfica Industrial</strong>. ¿En qué podemos ayudarte
                hoy? Cuéntanos tu proyecto de impresión o packaging.
              </Bubble>

              {/* historial de la sesión */}
              <AnimatePresence initial={false}>
                {bubbles.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  >
                    <Bubble role={b.role}>{b.text}</Bubble>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* respuestas rápidas */}
              {bubbles.length === 0 && (
                <div className="mt-2 flex flex-col gap-2">
                  {quickReplies.map((q, i) => (
                    <motion.button
                      key={q.label}
                      type="button"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.12, type: "spring", stiffness: 240, damping: 22 }}
                      onClick={() => send(q.msg)}
                      className="btn-press group inline-flex items-center justify-between self-end rounded-2xl border border-[#128C7E]/30 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-[#0E7A67] shadow-sm transition-all duration-200 hover:border-[#25D366]/60 hover:bg-[#25D366]/[0.07]"
                    >
                      {q.label}
                      <ChevronRight className="h-4 w-4 opacity-50 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Entrada de texto → abre wa.me */}
            <form
              className="flex items-center gap-2 border-t border-black/8 bg-white px-3.5 py-3"
              onSubmit={(e) => {
                e.preventDefault();
                send(text);
              }}
            >
              <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                inputMode="text"
                autoComplete="off"
                placeholder="Escribe tu mensaje…"
                aria-label="Escribe tu mensaje para SPC"
                className="h-11 min-w-0 flex-1 rounded-full bg-[#F0F2F5] px-4.5 text-[14.5px] text-[#0C1526] outline-none ring-[#25D366]/50 transition-shadow placeholder:text-[#8A94A6] focus:ring-2"
              />
              <button
                type="submit"
                aria-label="Enviar por WhatsApp"
                className="btn-press flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-[0_6px_16px_-4px_rgba(18,140,126,0.5)] transition-colors hover:bg-[#25D366]"
              >
                <Send className="h-4.5 w-4.5 -translate-x-[1px]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ——— Burbuja flotante oficial ——— */}
      <motion.button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setHint(false);
        }}
        aria-label={open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
        aria-expanded={open}
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.8 }}
        whileHover={!reduce ? { scale: 1.07 } : undefined}
        whileTap={!reduce ? { scale: 0.92 } : undefined}
        className="fixed bottom-4 right-3 z-[60] flex h-15 w-15 items-center justify-center rounded-full bg-gradient-to-b from-[#2FE074] to-[#1FBE5B] text-white shadow-[0_14px_34px_-8px_rgba(18,140,126,0.75),0_2px_8px_rgba(18,140,126,0.4)] sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
        style={{ touchAction: "manipulation" }}
      >
        {/* anillo de pulso de atención */}
        {!open && hint && !reduce && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-[#25D366]"
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{ opacity: 0, scale: 1.55 }}
            transition={{ duration: 1.6, repeat: 3, ease: "easeOut" }}
            onAnimationComplete={() => setHint(false)}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <X className="h-6 w-6 sm:h-7 sm:w-7" />
            </motion.span>
          ) : (
            <motion.span
              key="wa"
              initial={{ rotate: 60, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -60, opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

/** Burbuja de chat estilo WhatsApp (cola incluida) */
function Bubble({ role, children }: { role: "user" | "spc"; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <div
      className={`relative max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13.5px] leading-relaxed shadow-sm ${
        isUser
          ? "self-end bg-[#D9FDD3] text-[#1B2B4E] after:absolute after:-right-1.5 after:top-0 after:h-3 after:w-3 after:bg-gradient-to-br after:from-transparent after:to-[#b9ecc9ac]"
          : "self-start bg-white text-[#1B2B4E] after:absolute after:-left-1.5 after:top-0 after:h-3 after:w-3 after:bg-gradient-to-br after:from-transparent after:to-[#d5d9de]"
      }`}
    >
      {children}
    </div>
  );
}
