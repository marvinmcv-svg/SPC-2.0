"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ————————————————————————————————————————————————
   Router de sitio (multi-página dentro de /)
   Rutas hash: #/ · #/servicio/{id} · #/nosotros
———————————————————————————————————————————————— */
export type Route =
  | { name: "home" }
  | { name: "service"; id: string }
  | { name: "about" };

interface RouterCtx {
  route: Route;
  /** Navega a una ruta del sitio */
  navigate: (route: Route, section?: string) => void;
}

const RouterContext = createContext<RouterCtx | null>(null);

function parseHash(hash: string): Route {
  const h = hash.replace(/^#\/?/, "").replace(/\/$/, "");
  if (h.startsWith("servicio/")) {
    const id = h.slice("servicio/".length);
    return id ? { name: "service", id } : { name: "home" };
  }
  if (h === "nosotros") return { name: "about" };
  return { name: "home" };
}

function routeToHash(route: Route): string {
  switch (route.name) {
    case "service":
      return `#/servicio/${route.id}`;
    case "about":
      return "#/nosotros";
    default:
      return "#/";
  }
}

export function SiteRouter({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined" ? { name: "home" } : parseHash(window.location.hash)
  );
  /** sección pendiente a la que hacer scroll tras llegar al home */
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  /* Sincroniza con el hash (back/forward, links nativos) */
  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((next: Route, section?: string) => {
    const target = routeToHash(next);
    if (window.location.hash === target || (next.name === "home" && !window.location.hash)) {
      // ya estamos en la ruta — solo scroll
      if (section) {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setRoute(next);
      return;
    }
    setPendingSection(section ?? null);
    setRoute(next);
    window.history.pushState(null, "", target);
    if (!section) window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  /* Tras cambiar de vista: scroll a sección pendiente (solo home) */
  useEffect(() => {
    if (pendingSection) {
      const t = setTimeout(() => {
        document.getElementById(pendingSection)?.scrollIntoView({ behavior: "smooth" });
        setPendingSection(null);
      }, 120);
      return () => clearTimeout(t);
    }
  }, [route, pendingSection]);

  const value = useMemo(() => ({ route, navigate }), [route, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterCtx {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter debe usarse dentro de <SiteRouter>");
  return ctx;
}

/* ——— Transición de página (blur + fade + slide) ——— */
export function PageTransition({ routeKey, children }: { routeKey: string; children: ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
        transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.9 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
