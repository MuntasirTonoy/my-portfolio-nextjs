"use client";

import { motion } from "framer-motion";
import RemoteImage from "@/components/ui/RemoteImage";
import { EASE, VIEWPORT, fadeUp } from "@/lib/motion";

const SkillCard = ({ category, items, delay = 0 }) => {
  return (
    <motion.div
      {...fadeUp(delay)}
      className="bg-base-200 rounded-2xl p-7 border border-base-300 transition-[border-color,box-shadow] duration-300 hover:border-[#02b677]/40 hover:shadow-[0_12px_32px_-12px_rgba(2,182,119,0.25)]"
    >
      <h3 className="text-[1.15rem] font-bold text-[#02b677] mb-5 pb-2.5 border-b border-base-300 tracking-wide">
        {category}
      </h3>

      <div className="grid grid-cols-2 min-[400px]:grid-cols-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {items.map((skill, i) => (
          <motion.div
            key={i}
            className="group flex flex-col items-center justify-center gap-2.5 p-3 aspect-square rounded-xl bg-base-100 border border-base-300 cursor-default transition-colors duration-300 hover:border-[#02b677]/50 hover:bg-[#02b677]/5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.4, ease: EASE, delay: delay + 0.15 + i * 0.04 }}
          >
            {/* hover: icon lifts and grows slightly */}
            <RemoteImage
              src={skill.icon}
              alt={skill.name}
              width={32}
              height={32}
              className="w-8 h-8 shrink-0 object-contain transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110"
            />
            <span className="text-xs font-medium text-base-content text-center leading-tight transition-colors duration-300 group-hover:text-[#02b677]">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;
