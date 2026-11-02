"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/i18n";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<LangCtx | null>(null);

const STORAGE_KEY = "spc-lang";

/**
 * LangProvider — English/Spanish site-wide toggle with localStorage
 * persistence. Default is Spanish (SPC's home market).
 */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  /* Hydrate from storage once on mount (SSR-safe: avoids hydration mismatch) */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- canonical post-hydration sync from persistent storage
      if (saved === "es" || saved === "en") setLang(saved);
    } catch {
      /* private mode — keep default */
    }
  }, []);

  /* Persist + reflect on <html lang> */
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang === "es" ? "es" : "en";
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "es" ? "en" : "es")), []);

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, toggle]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangCtx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
