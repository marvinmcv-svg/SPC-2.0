"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Send, Sparkles, Bot, User } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-button";
import { SpcMark } from "./logo";
import { useLang } from "./lang";
import { waLink, WA_MESSAGES, FAQS, pick } from "@/lib/spc";
import { cn } from "@/lib/utils";

interface ChatMsg {
  role: "user" | "ai";
  text: string;
  cta?: { label: string; waMessage: string };
}

const WELCOME = {
  es: "¡Hola! 👋 Soy SPenCer, la recepcionista virtual de SPC Impresores. Te acompaño de la idea a la cotización: pregúntame por servicios, tirajes, plazos, materiales — o dime qué necesitas imprimir y te guío paso a paso.",
  en: "Hi! 👋 I'm SPenCer, the virtual receptionist of SPC Impresores. I'll walk you from idea to quote: ask me about services, run sizes, lead times, materials — or tell me what you need printed and I'll guide you step by step.",
} as const;

/**
 * SPenCer — recepcionista virtual con IA (backend: /api/spc-ai).
 * Panel glossy estilo Apple con typing indicator, chips de FAQ y
 * sales funnel conversacional que termina en WhatsApp.
 */
export function SpcAi() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([{ role: "ai", text: WELCOME.es }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<string>("");
  const reduce = useReducedMotion();
  const { lang } = useLang();

  /* Reinicia el saludo cuando cambia el idioma (solo si aún no hay conversación) */
  useEffect(() => {
    setMessages((m) => (m.length <= 1 ? [{ role: "ai", text: WELCOME[lang] }] : m));
  }, [lang]);

  /* sesión anónima por visita */
  useEffect(() => {
    sessionRef.current =
      globalThis.crypto?.randomUUID?.() ?? `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }, []);

  /* apertura externa (hero / FAQ) + exclusión mutua con el widget de WhatsApp */
  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setHint(false);
      window.dispatchEvent(new CustomEvent("widget:opened", { detail: "ai" }));
    };
    const onSibling = (e: Event) => {
      if ((e as CustomEvent).detail !== "ai") setOpen(false);
    };
    window.addEventListener("spc-ai:open", onOpen);
    window.addEventListener("widget:opened", onSibling);
    return () => {
      window.removeEventListener("spc-ai:open", onOpen);
      window.removeEventListener("widget:opened", onSibling);
    };
  }, []);

  /* pulso de atención único */
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => {
      setHint(true);
      setTimeout(() => setHint(false), 7000);
    }, 14000);
    return () => clearTimeout(t);
  }, [reduce]);

  /* auto-scroll + focus */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, busy, open, reduce]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 380);
  }, [open]);

  /* Escape cierra */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = useCallback(async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/spc-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionRef.current, message: q, lang }),
      });
      const data = await res.json();
      if (!res.ok || !data?.reply) throw new Error(data?.error ?? "Respuesta inválida");
      setMessages((m) => [
        ...m,
        { role: "ai", text: data.reply, cta: data.cta ?? undefined },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text:
            lang === "es"
              ? "Uy, tuve una interferencia técnica 😅 Mientras la resuelvo, mi colega humano te atiende al instante:"
              : "Oops, I hit a technical glitch 😅 While I fix it, my human colleague will help you right away:",
          cta: {
            label: lang === "es" ? "Hablar con un asesor" : "Talk to an advisor",
            waMessage: WA_MESSAGES.general,
          },
        },
      ]);
    } finally {
      setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [busy, lang]);

  const quickChips = FAQS.slice(0, 4).map((f) => pick(f.q, lang));

  return (
    <>
      {/* ——— Panel de chat ——— */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="spc-ai-panel"
            initial={{ opacity: 0, scale: 0.88, y: 28, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 28, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            style={{ transformOrigin: "bottom right" }}
            role="dialog"
            aria-label={lang === "es" ? "Chat con SPenCer, recepcionista virtual" : "Chat with SPenCer, virtual receptionist"}
            className="fixed bottom-[8.75rem] right-3 z-[60] flex max-h-[min(66vh,560px)] w-[min(92vw,388px)] flex-col overflow-hidden rounded-[26px] border border-[#27519B]/15 bg-[#F6F9FE] shadow-[0_44px_90px_-22px_rgba(10,20,40,0.55)] sm:bottom-[9.25rem] sm:right-6"
          >
            {/* Header — identidad SPenCer */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#2E5AA8] via-[#27519B] to-[#16233F] px-4 py-3.5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_15%_-10%,rgba(160,195,255,0.35),transparent_60%)]" />
              <div className="relative flex items-center gap-3">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/50 bg-gradient-to-br from-[#6F9AE8] to-[#1D4184] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.45)]">
                  <Sparkles className="h-5 w-5 text-white" />
                  <motion.span
                    className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#27519B] bg-[#25D366]"
                    animate={reduce ? undefined : { scale: [1, 1.3, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-[15px] font-bold leading-tight text-white">
                    SPenCer
                    <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/85">
                      AI
                    </span>
                  </p>
                  <p className="text-[11.5px] font-medium text-white/70">
                    {lang === "es" ? "Recepcionista virtual · te guía a tu cotización · 24/7" : "Virtual receptionist · guides you to your quote · 24/7"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={lang === "es" ? "Cerrar chat de SPenCer" : "Close SPenCer chat"}
                  className="btn-press flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Mensajes */}
            <div
              ref={scrollRef}
              className="scroll-area flex flex-col gap-3 px-4 py-5"
              style={{ backgroundImage: "radial-gradient(rgba(39,81,155,0.05) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
              aria-live="polite"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={cn("flex max-w-[88%] gap-2", m.role === "user" ? "self-end flex-row-reverse" : "self-start")}
                >
                  <span
                    className={cn(
                      "mt-1 flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full text-white",
                      m.role === "ai"
                        ? "bg-gradient-to-br from-[#6F9AE8] to-[#27519B]"
                        : "bg-gradient-to-br from-[#8A94A6] to-[#57678A]"
                    )}
                    aria-hidden
                  >
                    {m.role === "ai" ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                  </span>
                  <div>
                    <div
                      className={cn(
                        "rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed shadow-sm",
                        m.role === "ai"
                          ? "rounded-tl-md border border-[#27519B]/10 bg-white text-[#1B2B4E]"
                          : "rounded-tr-md bg-gradient-to-br from-[#3F6CC0] to-[#27519B] text-white"
                      )}
                    >
                      <p className="whitespace-pre-line">{m.text}</p>
                    </div>
                    {/* CTA de handoff a WhatsApp */}
                    {m.cta && (
                      <a
                        href={waLink(m.cta.waMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-press group/cta mt-2 inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-b from-[#2FE074] to-[#1FBE5B] px-4 text-[13px] font-semibold text-white shadow-[0_10px_22px_-8px_rgba(18,140,126,0.65)] transition-all duration-300 hover:brightness-105"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        {m.cta.label}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Indicador de escritura */}
              {busy && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 self-start"
                >
                  <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-gradient-to-br from-[#6F9AE8] to-[#27519B]" aria-hidden>
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </span>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-[#27519B]/10 bg-white px-4 py-3 shadow-sm">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-[#3F6CC0]"
                        animate={reduce ? undefined : { y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Chips de preguntas frecuentes */}
              {!busy && messages.length <= 1 && (
                <div className="mt-1 flex flex-col gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A94A6]">
                    {lang === "es" ? "Preguntas frecuentes" : "Frequent questions"}
                  </p>
                  {quickChips.map((q, i) => (
                    <motion.button
                      key={q}
                      type="button"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 240, damping: 22 }}
                      onClick={() => ask(q)}
                      className="btn-press rounded-2xl border border-[#3F6CC0]/25 bg-white px-4 py-2.5 text-left text-[13px] font-medium text-[#27519B] shadow-sm transition-all duration-200 hover:border-[#3F6CC0]/55 hover:bg-[#3F6CC0]/[0.06]"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Entrada */}
            <form
              className="flex items-center gap-2 border-t border-[#27519B]/10 bg-white px-3.5 py-3"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                inputMode="text"
                autoComplete="off"
                maxLength={500}
                disabled={busy}
                placeholder={lang === "es" ? "Escribe tu pregunta…" : "Type your question…"}
                aria-label={lang === "es" ? "Escribe tu pregunta para SPenCer" : "Type your question for SPenCer"}
                className="h-11 min-w-0 flex-1 rounded-full bg-[#EFF3FA] px-4.5 text-[14px] text-[#0C1526] outline-none ring-[#3F6CC0]/50 transition-shadow placeholder:text-[#8A94A6] focus:ring-2 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label={lang === "es" ? "Enviar pregunta" : "Send question"}
                className="btn-press flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#3F6CC0] to-[#27519B] text-white shadow-[0_8px_18px_-6px_rgba(39,81,155,0.7)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                <Send className="h-4.5 w-4.5 -translate-x-[1px]" />
              </button>
            </form>

            <p className="bg-white pb-2.5 text-center text-[10.5px] text-[#8A94A6]">
              {lang === "es"
                ? "SPenCer puede equivocarse. Para información oficial, contacta a un asesor."
                : "SPenCer can make mistakes. For official information, contact an advisor."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ——— Burbuja flotante de SPC AI (encima de la de WhatsApp) ——— */}
      <motion.button
        type="button"
        onClick={() => {
          const next = !open;
          setOpen(next);
          setHint(false);
          if (next) window.dispatchEvent(new CustomEvent("widget:opened", { detail: "ai" }));
        }}
        aria-label={open ? (lang === "es" ? "Cerrar chat de SPenCer" : "Close SPenCer chat") : lang === "es" ? "Abrir chat de SPenCer, recepcionista virtual" : "Open SPenCer chat, virtual receptionist"}
        aria-expanded={open}
        initial={{ scale: 0, rotate: 30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 2.2 }}
        whileHover={!reduce ? { scale: 1.07 } : undefined}
        whileTap={!reduce ? { scale: 0.92 } : undefined}
        className="group fixed bottom-[5.75rem] right-3 z-[60] flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-br from-[#6F9AE8] via-[#3F6CC0] to-[#27519B] text-white shadow-[0_14px_34px_-8px_rgba(39,81,155,0.8),0_2px_8px_rgba(39,81,155,0.4),inset_0_1px_0_rgba(255,255,255,0.45)] sm:bottom-[6.25rem] sm:right-6 sm:h-14 sm:w-14"
        style={{ touchAction: "manipulation" }}
      >
        {/* anillo de atención */}
        {!open && hint && !reduce && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-[#3F6CC0]"
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
              <X className="h-5.5 w-5.5" />
            </motion.span>
          ) : (
            <motion.span
              key="spark"
              initial={{ rotate: 60, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -60, opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <Sparkles className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Tooltip flotante */}
        {!open && hint && (
          <motion.span
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8 }}
            className="glass-dark absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2 text-[12.5px] font-semibold text-white"
          >
            {lang === "es" ? "✨ Hola, soy SPenCer — ¿dudas?" : "✨ Hi, I'm SPenCer — questions?"}
          </motion.span>
        )}
      </motion.button>
    </>
  );
}
