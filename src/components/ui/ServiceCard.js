"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const ServiceCard = ({ Icon, title, description, index = 0, delay = 0 }) => {
  return (
    <motion.article
      {...fadeUp(delay)}
      className="group relative bg-base-200 p-6 rounded-2xl overflow-hidden border border-base-300 transition-[border-color,box-shadow] duration-300 hover:border-[#02b677]/40 hover:shadow-[0_12px_32px_-12px_rgba(2,182,119,0.25)]"
    >
      {/* hover: green line sweeps across the top */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-[#02b677] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between mb-5">
        {/* hover: icon tile fills green */}
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#02b677]/10 text-[#02b677] transition-all duration-300 group-hover:bg-[#02b677] group-hover:text-white group-hover:-rotate-6">
          {Icon && <Icon size={26} />}
        </div>
        <span className="font-mono text-sm font-semibold text-base-content/20 transition-colors duration-300 group-hover:text-[#02b677]/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-lg font-bold mb-1.5">{title}</h3>
      <p className="text-base-content/70 text-sm leading-relaxed">{description}</p>
    </motion.article>
  );
};

export default ServiceCard;
