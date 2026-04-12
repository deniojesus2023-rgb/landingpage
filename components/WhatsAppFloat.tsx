"use client";

import { motion } from "framer-motion";

export function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/5511999999999?text=Oi!%20Quero%20pedir%20um%20v%C3%ADdeo%20personalizado!"
      target="_blank"
      rel="noopener"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_40px_rgba(37,211,102,0.5)]"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 blur-xl transition group-hover:opacity-60" />
      <svg
        width="26"
        height="26"
        viewBox="0 0 30 30"
        fill="none"
        className="relative"
      >
        <path
          d="M15 2C7.82 2 2 7.82 2 15c0 2.26.6 4.38 1.64 6.22L2 28l6.95-1.6A12.94 12.94 0 0015 28c7.18 0 13-5.82 13-13S22.18 2 15 2z"
          fill="white"
        />
        <path
          d="M21.5 18.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.06 3.15 4.99 4.41.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.11.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"
          fill="#25D366"
        />
      </svg>
      <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-white/10 bg-ink-900/90 px-3 py-2 text-[11px] font-semibold text-white backdrop-blur-xl group-hover:block">
        Fale com a gente
      </span>
    </motion.a>
  );
}
