"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = [
  "JavaScript",
  "Tailwind",
  "React.js",
  "Node.js",
  "Expres.js",
  "MongoDB",
  "Firebase",
  "REST API",
];

const WordFlip = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl p-1 hidden lg:block text-white font-poppins text-2xl w-fit">
      <div className="flex items-center gap-2">
        <span className="text-gray-400 whitespace-nowrap">An expert in</span>
        <div className="relative h-8 overflow-hidden text-spotify w-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              {words[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WordFlip;
