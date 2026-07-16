"use client";

import React from "react";
import { motion } from "framer-motion";

const SkillCard = ({ category, items, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: false }}
      className="relative bg-base-200 rounded-2xl p-7 z-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(2,182,119,0.12)] border border-[#02b67700] hover:border-[#02b67755]"
      style={{
        boxShadow: "inset 0 0 0 1px oklch(var(--b3))",
      }}
    >
      <h3 className="text-[1.15rem] font-bold text-[#02b677] mb-5 pb-2.5 border-b border-base-300 tracking-wide">
        {category}
      </h3>
      <div className="grid grid-cols-2 min-[400px]:grid-cols-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {items.map((skill, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center justify-center gap-2.5 p-3 aspect-square rounded-[0.85rem] bg-base-100 border border-base-300 cursor-default transition-all duration-300"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.35,
              delay: delay + i * 0.06,
              ease: "easeOut",
            }}
            viewport={{ once: false }}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-8 h-8 shrink-0 object-contain"
            />
            <span className="text-xs font-medium text-base-content text-center leading-tight">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;
