"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Tarjeta 3D glossy estilo Apple:
 * · Tilt 1:1 con el puntero (respetando el offset de captura)
 * · Springs independientes X/Y (damping 1.0 — sin rebote en UI quieta)
 * · Brillo especular que sigue al cursor (.sheen con --mx/--my)
 * · Respeta prefers-reduced-motion
 * El radio se hereda: aplica `rounded-*` al TiltCard y la capa interna.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 9,
  hoverScale = 1.02,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  hoverScale?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const s = useMotionValue(1);
  const sheenO = useMotionValue(0);

  // Springs críticos (damping ≈ 1.0, response ~0.35) — interrumpibles
  const rotateX = useSpring(rx, { stiffness: 260, damping: 26, mass: 0.6 });
  const rotateY = useSpring(ry, { stiffness: 260, damping: 26, mass: 0.6 });
  const smoothScale = useSpring(s, { stiffness: 320, damping: 24, mass: 0.6 });
  const sheenOpacity = useSpring(sheenO, { stiffness: 200, damping: 30 });

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    ry.set((px - 0.5) * 2 * maxTilt); // horizontal → rotY
    rx.set(-(py - 0.5) * 2 * maxTilt); // vertical → rotX
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);
    sheenO.set(1);
  }

  function onPointerEnter() {
    if (reduce) return;
    s.set(hoverScale);
  }

  function onPointerLeave() {
    rx.set(0);
    ry.set(0);
    s.set(1);
    sheenO.set(0);
  }

  function onPointerDown() {
    if (reduce) return;
    s.set(hoverScale * 0.985); // feedback instantáneo al presionar
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={() => s.set(hoverScale)}
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              scale: smoothScale,
              transformPerspective: 1100,
            }
      }
      className={cn("relative [transform-style:preserve-3d]", className)}
    >
      {children}
      {glare && (
        <motion.div
          className="sheen rounded-[inherit]"
          aria-hidden
          style={{ opacity: sheenOpacity }}
        />
      )}
    </motion.div>
  );
}
