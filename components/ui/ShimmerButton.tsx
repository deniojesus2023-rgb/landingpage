"use client";

import { motion } from "framer-motion";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold";

type ShimmerButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg" | "xl";
  icon?: ReactNode;
  as?: "button" | "a";
  href?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.5),0_0_60px_rgba(16,185,129,0.25)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6),0_0_80px_rgba(16,185,129,0.3)]",
  gold: "bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.5),0_0_60px_rgba(16,185,129,0.25)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6),0_0_80px_rgba(16,185,129,0.3)]",
  secondary:
    "bg-white/5 border border-white/15 text-white backdrop-blur-xl hover:bg-white/10",
  ghost: "bg-transparent text-white/80 hover:text-white",
};

const sizeClasses = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-[15px]",
  xl: "h-16 px-10 text-base",
};

export const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  function ShimmerButton(
    {
      children,
      variant = "primary",
      size = "lg",
      icon,
      as = "button",
      href,
      className = "",
      ...rest
    },
    ref
  ) {
    const classes = `btn-shimmer relative inline-flex items-center justify-center gap-2.5 rounded-[7px] font-bold tracking-tight transition-all duration-300 ease-out will-change-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-400/60 focus:ring-offset-2 focus:ring-offset-ink-950 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    const inner = (
      <>
        {/* Glow aura */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-[1px] rounded-[7px] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
          style={{
            background:
              variant === "gold" || variant === "primary"
                ? "radial-gradient(60% 60% at 50% 50%, rgba(16,185,129,0.75), transparent 70%)"
                : "radial-gradient(60% 60% at 50% 50%, rgba(124,92,255,0.6), transparent 70%)",
          }}
        />
        <span className="relative z-10 flex items-center gap-2.5">
          {icon}
          {children}
        </span>
      </>
    );

    if (as === "a") {
      return (
        <motion.a
          href={href}
          className={`group ${classes}`}
          whileTap={{ scale: 0.97 }}
        >
          {inner}
        </motion.a>
      );
    }
    return (
      <motion.button
        ref={ref}
        className={`group ${classes}`}
        whileTap={{ scale: 0.97 }}
        {...(rest as object)}
      >
        {inner}
      </motion.button>
    );
  }
);
