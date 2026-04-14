"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.2% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
};

// Azul da paleta do site
const highlight =
  "radial-gradient(75% 181.15942028985506% at 50% 50%, #3B82F6 0%, rgba(255, 255, 255, 0) 100%)";

type HoverBorderGradientProps = {
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
  radius?: string;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>;

/**
 * Wrapper com borda animada em gradiente radial que rotaciona pelas 4 direções
 * e intensifica no hover. Preserva o filho intacto — use pra envolver CTAs
 * principais sem quebrar o styling interno do botão.
 */
export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Element = "div",
  duration = 1,
  clockwise = true,
  radius = "rounded-[9px]",
  ...props
}: React.PropsWithChildren<HoverBorderGradientProps>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("BOTTOM");

  useEffect(() => {
    if (hovered) return;
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const interval = setInterval(() => {
      setDirection((prev) => {
        const idx = directions.indexOf(prev);
        const next = clockwise
          ? (idx - 1 + directions.length) % directions.length
          : (idx + 1) % directions.length;
        return directions[next];
      });
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [hovered, clockwise, duration]);

  return (
    <Element
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative inline-flex w-fit overflow-visible border border-white/15 bg-ink-950/40 p-[1.5px] backdrop-blur-sm transition duration-500",
        radius,
        containerClassName,
      )}
      {...props}
    >
      <div className={cn("relative z-10 w-full", radius, className)}>
        {children}
      </div>
      <motion.div
        className={cn("absolute inset-0 z-0 overflow-hidden", radius)}
        style={{ filter: "blur(2px)" }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />
    </Element>
  );
}
