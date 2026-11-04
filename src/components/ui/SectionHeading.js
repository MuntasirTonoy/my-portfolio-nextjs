"use client";

import { motion } from "framer-motion";
import { EASE, VIEWPORT, fadeUp } from "@/lib/motion";

/**
 * Section title used across the landing page:
 * optional eyebrow, heading (accent word in green), and a short line that draws in.
 */
export default function SectionHeading({ eyebrow, accent, title, subtitle, align = "center", className = "" }) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "text-center" : "text-center lg:text-start"} ${className}`}>
      {eyebrow && (
        <motion.p
          {...fadeUp(0)}
          className="text-[#02b677] font-bold text-sm sm:text-base uppercase tracking-widest mb-2"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2 {...fadeUp(0.08)} className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
        {accent && <><span className="text-spotify">{accent}</span> </>}
        {title}
      </motion.h2>

      <motion.span
        aria-hidden="true"
        className={`block h-0.5 w-16 bg-[#02b677] mt-5 ${centered ? "mx-auto origin-center" : "mx-auto lg:mx-0 origin-left"}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
      />

      {subtitle && (
        <motion.p {...fadeUp(0.3)} className="mt-5 text-base-content/60 max-w-xl text-sm sm:text-base mx-auto">
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
