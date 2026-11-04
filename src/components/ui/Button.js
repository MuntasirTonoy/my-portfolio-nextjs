"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const baseClass =
  "relative overflow-hidden z-10 border-[#02b677] text-[#02b677] transition-colors duration-500 hover:text-white hover:shadow-none btn btn-soft btn-success disabled:opacity-60";

/**
 * Brand button with the green "fill" hover effect.
 * - `href` renders a Next.js link (internal) or, with `external`, a new-tab anchor.
 * - Otherwise renders a <button> and forwards type/disabled/onClick.
 */
export default function Button({ children, href, external, className = "", type = "button", ...props }) {
  const [hovered, setHovered] = useState(false);

  const fill = (
    <motion.span
      aria-hidden="true"
      initial={{ top: "100%", left: "100%" }}
      animate={hovered ? { top: "-30px", left: "-30px" } : { top: "100%", left: "100%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute w-[250px] h-[150px] bg-[#02b677] rounded-full -z-10"
    />
  );

  const shared = {
    className: `${baseClass} ${className}`,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...shared} {...props}>
        {fill}
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} {...shared} {...props}>
        {fill}
        {children}
      </Link>
    );
  }
  return (
    <button type={type} {...shared} {...props}>
      {fill}
      {children}
    </button>
  );
}
