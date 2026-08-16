"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { FiDownload } from "react-icons/fi";
import WordFlip from "@/components/ui/WordFlip";
import { IoChatbubblesOutline } from "react-icons/io5";
import HeroPhoto from "@/components/ui/HeroPhoto";
import { motion } from "framer-motion";
import { usePortfolio } from "@/components/providers/AdminProvider";
import { HeroSkeleton } from "@/components/ui/Skeleton";

/* Stagger container – children animate in sequence */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Floating particle dots */
const Particle = ({ style }) => (
  <motion.span
    className="absolute rounded-full bg-[#02b677] opacity-20"
    style={style}
    animate={{
      y: [0, -18, 0],
      opacity: [0.15, 0.35, 0.15],
    }}
    transition={{
      duration: style.duration ?? 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: style.delay ?? 0,
    }}
  />
);

const particles = [
  { width: 8, height: 8, top: "15%", left: "5%", duration: 3.5, delay: 0 },
  { width: 12, height: 12, top: "65%", left: "2%", duration: 4.2, delay: 0.8 },
  { width: 6, height: 6, top: "80%", left: "12%", duration: 3.8, delay: 1.5 },
  { width: 10, height: 10, top: "30%", left: "90%", duration: 4.5, delay: 0.3 },
  { width: 7, height: 7, top: "70%", left: "88%", duration: 3.2, delay: 1.1 },
  { width: 9, height: 9, top: "10%", left: "75%", duration: 4, delay: 0.6 },
];

const Hero = () => {
  const { portfolioData, loading } = usePortfolio();
  
  if (loading || !portfolioData?.hero) return <HeroSkeleton />;

  const { hero } = portfolioData;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-base-200 px-4 lg:px-20"
    >
      {/* ── Decorative background glows ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "#02b677" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl"
        style={{ background: "#4f46e5" }}
      />

      {/* ── Floating particles ── */}
      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      {/* ── Subtle grid overlay ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#02b677 1px, transparent 1px), linear-gradient(90deg, #02b677 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 py-20 lg:py-0">
        {/* ── Text side ── */}
        <motion.div
          className="flex-1 text-center lg:text-left order-2 lg:order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#02b677] relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#02b677] opacity-75" />
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#02b677] opacity-80">
              {hero.badge || "Available for work"}
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg font-medium text-base-content/60 tracking-widest uppercase mb-1"
          >
            {hero.greeting || "Hello, I'm"}
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
          >
            <span className="relative inline-block">
              <span className="text-spotify">{hero.name || "Muntasir"}</span>
            </span>
          </motion.h1>

          {/* Word-flip row */}
          <motion.div variants={itemVariants}>
            <WordFlip />
          </motion.div>

          {/* Mobile role tag */}
          <motion.p
            variants={itemVariants}
            className="lg:hidden text-lg font-semibold text-spotify mt-1 mb-2"
          >
            {hero.roleTags?.[0] || "Full-Stack Developer"}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-4 text-base md:text-lg leading-relaxed text-base-content/70 max-w-lg mx-auto lg:mx-0"
          >
            {hero.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex gap-3 flex-wrap justify-center lg:justify-start mt-6"
          >
            <a href={hero.cvLink} target="_blank" rel="noopener noreferrer">
              <Button>
                <span className="flex items-center gap-2">
                  {hero.ctaBtn1Text || "Download CV"} <FiDownload />
                </span>
              </Button>
            </a>
            <a
              href={hero.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <span className="flex items-center gap-2">
                  {hero.ctaBtn2Text || "Let's Talk"} <IoChatbubblesOutline />
                </span>
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* ── Photo side ── */}
        <motion.div
          className="flex-1 flex items-center justify-center order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <HeroPhoto />
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-widest text-base-content/50">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-8 bg-base-content/30 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
