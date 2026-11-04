"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import Button from "@/components/ui/Button";
import { usePortfolio } from "@/components/providers/PortfolioProvider";

import image1 from "@/assets/images/img1.jpg";
import image2 from "@/assets/images/img2.jpg";
import image3 from "@/assets/images/img3.jpg";
import image4 from "@/assets/images/img4.jpg";

const images = [image1, image2, image3, image4];

const blobVariants = {
  animate: {
    x: [0, 20, 30, 20, 0, -20, -30, -20, 0],
    y: [0, -15, 0, 15, 30, 15, 0, -15, 0],
    scale: [1, 1.1, 1, 1.05, 1, 1.08, 1, 1.1, 1],
    opacity: [0.6, 0.75, 0.65, 0.7, 0.6, 0.75, 0.65, 0.7, 0.6],
    transition: { duration: 12, ease: "easeInOut", repeat: Infinity },
  },
};

const Introduction = () => {
  const { introduction } = usePortfolio();
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setImageIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(interval);
  }, []);

  if (!introduction) return null;

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 sm:gap-12">
        {/* Image carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0 flex-shrink-0 h-[300px] sm:h-[400px] lg:h-[450px]"
        >
          <motion.div
            variants={blobVariants}
            animate="animate"
            className="absolute top-0 left-0 w-24 h-24 sm:w-36 sm:h-36 rounded-full filter blur-3xl"
            style={{
              backgroundColor: "#02b677",
              zIndex: 0,
              boxShadow: "0 0 150px 60px rgba(2, 182, 119, 0.3)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full blur-[100px] opacity-20 sm:opacity-25"
            style={{ backgroundColor: "#02b677", zIndex: 0 }}
          />

          <div className="relative w-full h-full rounded-xl z-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={imageIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src={images[imageIndex]}
                  alt="Md Muntasir Mahmud at work"
                  fill
                  sizes="(min-width: 768px) 448px, 90vw"
                  placeholder="blur"
                  className="object-cover rounded-lg shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex-1 space-y-4 sm:space-y-6 flex flex-col justify-start"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-center lg:text-start font-extrabold mb-4">
            <span className="text-spotify">My</span> {introduction.heading || "Introduction"}
          </h2>
          <p className="text-base-content text-justify text-sm sm:text-base leading-relaxed opacity-80">
            {introduction.description}
          </p>
          <div className="text-center lg:text-start">
            <Button href="/about">
              More about me <BsArrowRight />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Introduction;
