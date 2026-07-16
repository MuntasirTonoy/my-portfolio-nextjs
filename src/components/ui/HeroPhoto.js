"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiJavascript,
  SiTypescript,
} from "react-icons/si";

const photo =
  "https://i.ibb.co.com/kss7vSR8/486576202-1787487388480587-6687481655588993159-n.jpg";

/*
  Badge config
  ─────────────────────────────────────────────────────────────────
  angle   : position on the orbit circle (degrees, 0 = top)
  size    : icon container size in px  (desktop)
  iconSz  : icon font-size in px       (desktop)
  color   : brand color for icon + glow
  label   : tooltip / aria-label
*/
const BADGES = [
  {
    Icon: SiReact,
    angle: 0,
    size: 42,
    iconSz: 28,
    color: "#61DAFB",
    label: "React",
  },
  {
    Icon: SiNextdotjs,
    angle: 60,
    size: 38,
    iconSz: 22,
    color: "#ffffff",
    label: "Next.js",
  },
  {
    Icon: SiJavascript,
    angle: 120,
    size: 48,
    iconSz: 26,
    color: "#F7DF1E",
    label: "JavaScript",
  },
  {
    Icon: SiMongodb,
    angle: 180,
    size: 32,
    iconSz: 28,
    color: "#4DB33D",
    label: "MongoDB",
  },
  {
    Icon: SiTypescript,
    angle: 240,
    size: 46,
    iconSz: 22,
    color: "#3178C6",
    label: "TypeScript",
  },
  {
    Icon: SiExpress,
    angle: 300,
    size: 33,
    iconSz: 22,
    color: "#cccccc",
    label: "Express.js",
  },
];

/** Convert polar (angle, radius) → { x, y } cartesian offsets from center */
const polarToXY = (angleDeg, r) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
};

const HeroPhoto = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex items-center justify-center w-full overflow-visible shrink-0 lg:scale-[1.1]">
      {/* 
        Responsive container: 
        Mobile: 280x280 box
        Desktop: 420x420 box 
      */}
      <div className="relative flex items-center justify-center overflow-visible shrink-0 w-[280px] h-[280px] lg:w-[420px] lg:h-[420px]">
        {/* ── Ambient green glow ── */}
        <motion.div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: "60%",
            height: "60%",
            background: "radial-gradient(circle, #02b677 0%, transparent 10%)",
            opacity: 0.22,
          }}
          animate={
            reduceMotion
              ? {}
              : { scale: [1, 1.28, 1], opacity: [0.18, 0.32, 0.18] }
          }
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Ambient indigo glow ── */}
        <motion.div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: "40%",
            height: "40%",
            background: "radial-gradient(circle, #4f46e5 0%, transparent 70%)",
            opacity: 0.15,
            top: "25%",
            left: "62%",
          }}
          animate={
            reduceMotion
              ? {}
              : { scale: [1, 1.45, 1], opacity: [0.1, 0.25, 0.1] }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        {/* ── Dashed slow-rotating orbit ring ── */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "115%",
            aspectRatio: "1 / 1",
            border: "1.5px dashed rgba(2,182,119,0.25)",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
          }}
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />

        {/* ── Spinning neon arc (green) ── */}
        <motion.svg
          className="absolute pointer-events-none"
          style={{
            width: "115%",
            height: "115%",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            overflow: "visible",
          }}
          viewBox="0 0 420 420"
          fill="none"
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id="arcG1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#02b677" stopOpacity="1" />
              <stop offset="100%" stopColor="#02b677" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="210"
            cy="210"
            r="194"
            stroke="url(#arcG1)"
            strokeWidth="3"
            strokeDasharray="180 1000"
            strokeLinecap="round"
          />
        </motion.svg>

        {/* ── Counter-spinning arc (indigo) ── */}
        <motion.svg
          className="absolute pointer-events-none"
          style={{
            width: "115%",
            height: "115%",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            overflow: "visible",
          }}
          viewBox="0 0 420 420"
          fill="none"
          animate={reduceMotion ? {} : { rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id="arcG2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="1" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <circle
            cx="210"
            cy="210"
            r="204"
            stroke="url(#arcG2)"
            strokeWidth="2.5"
            strokeDasharray="120 1100"
            strokeLinecap="round"
          />
        </motion.svg>

        {/* ── Floating tech logo badges ── */}
        {BADGES.map((b, i) => {
          const desktopRadius = 182; // Distance for PC
          const mobileRadius = 135; // Distance for Mobile

          const { x: dx, y: dy } = polarToXY(b.angle, desktopRadius);
          const { x: mx, y: my } = polarToXY(b.angle, mobileRadius);
          const mSz = Math.round(b.size * 0.75);
          const mIconSz = Math.round(b.iconSz * 0.75);

          const floatDistance = 6 + (i % 3) * 3;
          const floatDuration = 2.8 + i * 0.4;

          return (
            <React.Fragment key={b.label}>
              {/* Mobile badge */}
              <motion.div
                aria-label={b.label}
                title={b.label}
                className="lg:hidden absolute z-20 flex items-center justify-center rounded-full cursor-default select-none"
                style={{
                  width: mSz,
                  height: mSz,
                  background: "#0d1117",
                  border: `1.5px solid ${b.color}55`,
                  boxShadow: `0 0 10px ${b.color}44`,
                  top: `calc(50% + ${my}px - ${mSz / 2}px)`,
                  left: `calc(50% + ${mx}px - ${mSz / 2}px)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: reduceMotion ? 0 : [0, -floatDistance, 0],
                }}
                transition={{
                  opacity: { delay: 0.5 + i * 0.1, duration: 0.5 },
                  scale: {
                    delay: 0.5 + i * 0.1,
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                  },
                  y: {
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  },
                }}
                whileHover={{ scale: 1.3, boxShadow: `0 0 20px ${b.color}88` }}
              >
                <b.Icon color={b.color} size={mIconSz} />
              </motion.div>

              {/* Desktop badge */}
              <motion.div
                aria-label={b.label}
                title={b.label}
                className="hidden lg:flex absolute z-20 items-center justify-center rounded-full cursor-default select-none"
                style={{
                  width: b.size,
                  height: b.size,
                  background: "#0d1117",
                  border: `1.5px solid ${b.color}55`,
                  boxShadow: `0 0 14px ${b.color}44`,
                  top: `calc(50% + ${dy}px - ${b.size / 2}px)`,
                  left: `calc(50% + ${dx}px - ${b.size / 2}px)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: reduceMotion ? 0 : [0, -floatDistance, 0],
                }}
                transition={{
                  opacity: { delay: 0.5 + i * 0.1, duration: 0.55 },
                  scale: {
                    delay: 0.5 + i * 0.1,
                    duration: 0.55,
                    ease: [0.34, 1.56, 0.64, 1],
                  },
                  y: {
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  },
                }}
                whileHover={{ scale: 1.3, boxShadow: `0 0 28px ${b.color}99` }}
              >
                <b.Icon color={b.color} size={b.iconSz} />
              </motion.div>
            </React.Fragment>
          );
        })}

        {/* ── Photo frame ── */}
        <motion.div
          className="relative z-10 w-[200px] h-[200px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden flex-shrink-0"
          style={{
            boxShadow:
              "0 0 0 3px #02b67733, 0 0 30px #02b67740, 0 0 70px #02b67718",
          }}
          initial={{ opacity: 0, scale: 0.72, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          whileHover={{ scale: 1.04 }}
        >
          {/* inner glow overlay */}
          <div
            className="absolute inset-0 z-10 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(2,182,119,0.18) 0%, transparent 60%)",
            }}
          />
          <img
            src={photo}
            alt="Muntasir – Full Stack Developer"
            loading="eager"
            className="w-full h-full object-cover rounded-full block"
          />
        </motion.div>

        {/* ── Load-in shine sweep ── */}
        <motion.div
          className="absolute z-30 rounded-full pointer-events-none"
          style={{
            width: "58%",
            height: "58%",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.32) 0%, transparent 55%)",
          }}
          initial={{ opacity: 0.9, rotate: -30 }}
          animate={{ opacity: 0, rotate: 30 }}
          transition={{ duration: 1.3, delay: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default HeroPhoto;
