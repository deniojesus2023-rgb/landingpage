"use client";

import React from "react";
import { motion } from "framer-motion";

interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      initial={{ opacity: 0.8, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
      }}
      className={`relative overflow-hidden font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out ${className || ""}`}
      {...props}
    >
      <span className="relative block size-full tracking-wide">
        {children}
      </span>
      <motion.span
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          ease: "linear",
          repeatDelay: 1,
        }}
        className="absolute inset-0 z-10 block bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </motion.button>
  );
};

export default ShinyButton;
