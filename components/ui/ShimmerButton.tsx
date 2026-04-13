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
    "bg-gradient-to-br from-crimson-500 via-crimson-600 to-[#b31520] text-white shadow-[0_10px_40px_-10px_rgba(255,59,71,0.7)] hover:shadow-[0_20px_60px_-10px_rgba(255,59,71,0.9)]",
  gold: "bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 text-ink-950 shadow-[0_10px_40px_-10px_rgba(30,157,241,0.7)] hover:shadow-[0_20px_60px_-10px_rgba(30,157,241,0.9)]",
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
              variant === "gold"
                ? "radial-gradient(60% 60% at 50% 50%, rgba(30,157,241,0.75), transparent 70%)"
                : variant === "primary"
                  ? "radial-gradient(60% 60% at 50% 50%, rgba(255,59,71,0.75), transparent 70%)"
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
