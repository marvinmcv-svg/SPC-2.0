"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion, animate, useMotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * CountUp — contador animado al entrar en viewport.
 * Usa MotionValue (sin setState → sin re-renders en cascada);
 * respeta prefers-reduced-motion.
 */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  const count = useMotionValue(0);
  const text = useTransform(count, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce, count]);

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {text}
    </motion.span>
  );
}
