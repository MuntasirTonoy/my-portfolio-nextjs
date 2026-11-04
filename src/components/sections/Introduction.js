"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { usePortfolio } from "@/components/providers/PortfolioProvider";
import { fadeUp } from "@/lib/motion";

import image1 from "@/assets/images/img1.jpg";
import image2 from "@/assets/images/img2.jpg";
import image3 from "@/assets/images/img3.jpg";
import image4 from "@/assets/images/img4.jpg";

const images = [image1, image2, image3, image4];

const Introduction = () => {
  const { introduction } = usePortfolio();
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setImageIndex((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, []);

  if (!introduction) return null;

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* ── Photo (hover: gentle zoom) ── */}
        <motion.div
          {...fadeUp()}
          className="group relative w-full max-w-xs sm:max-w-sm md:max-w-md shrink-0 aspect-[4/5] rounded-[2rem] overflow-hidden bg-base-300 transition-shadow duration-500 hover:shadow-[0_20px_50px_-20px_rgba(2,182,119,0.45)]"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={imageIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Image
                src={images[imageIndex]}
                alt="Md Muntasir Mahmud at work"
                fill
                sizes="(min-width: 768px) 448px, 90vw"
                placeholder="blur"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Text ── */}
        <div className="flex-1">
          <SectionHeading align="start" accent="My" title={introduction.heading || "Introduction"} />

          <motion.p
            {...fadeUp(0.35)}
            className="mt-6 text-sm sm:text-base leading-relaxed text-base-content/75 text-justify lg:text-start"
          >
            {introduction.description}
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="mt-8 text-center lg:text-start">
            <Button href="/about">
              More about me <BsArrowRight />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
