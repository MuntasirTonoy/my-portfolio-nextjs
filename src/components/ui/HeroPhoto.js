"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { SiReact, SiNextdotjs, SiMongodb, SiTypescript } from "react-icons/si";
import photo from "../../../public/tonoy.webp";

const EASE = [0.22, 1, 0.36, 1];

/*
  Floating tech chips, placed around the photo edges.
  `pos` is Tailwind positioning; `color` null → follows the theme text color.
*/
const CHIPS = [
  { Icon: SiReact, label: "React", color: "#61DAFB", pos: "-top-4 -right-6 lg:-right-10" },
  { Icon: SiNextdotjs, label: "Next.js", color: null, pos: "top-[38%] -left-8 lg:-left-14" },
  { Icon: SiMongodb, label: "MongoDB", color: "#47A248", pos: "bottom-[18%] -right-8 lg:-right-14" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6", pos: "-bottom-5 left-4 lg:left-8" },
];

const Chip = ({ Icon, label, color, pos, index, reduceMotion }) => (
  <motion.div
    className={`absolute z-30 ${pos}`}
    initial={{ opacity: 0, scale: 0.6, y: 12 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: 1 + index * 0.12, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
  >
    <motion.div
      className="flex items-center gap-2 rounded-full px-3 py-1.5 lg:px-3.5 lg:py-2 bg-base-100/90 backdrop-blur text-base-content text-xs lg:text-sm font-medium shadow-lg shadow-black/10 select-none"
      animate={reduceMotion ? {} : { y: [0, -(6 + (index % 2) * 4), 0] }}
      transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
      whileHover={{ scale: 1.08 }}
    >
      <Icon className="text-base lg:text-lg shrink-0" style={color ? { color } : undefined} />
      {label}
    </motion.div>
  </motion.div>
);

const HeroPhoto = () => {
  const reduceMotion = useReducedMotion();

  // Pointer-driven tilt (-0.5..0.5 across the card), smoothed with springs.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  // Backdrop layers drift the opposite way for parallax depth.
  const backX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const backY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const dotsX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const dotsY = useTransform(sy, [-0.5, 0.5], [-14, 14]);

  const onMove = (e) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      className="flex items-center justify-center w-full py-8"
      style={{ perspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        className="relative w-[240px] lg:w-[340px] aspect-[900/982]"
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* ── Dot grid, top-left ── */}
        <motion.div
          aria-hidden="true"
          className="absolute -top-8 -left-8 w-32 h-32 lg:w-40 lg:h-40 text-[#02b677] pointer-events-none"
          style={{
            x: dotsX,
            y: dotsY,
            backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
            backgroundSize: "14px 14px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />

        {/* ── Offset accent block ── */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ x: backX, y: backY }}
        >
          <motion.div
            className="w-full h-full rounded-[2rem]"
            style={{ background: "linear-gradient(135deg, #02b677 0%, #4f46e5 100%)" }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 0.9, x: 18, y: 18 }}
            transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          />
        </motion.div>

        {/* ── Photo with wipe-up reveal ── */}
        <motion.div
          className="relative z-10 w-full h-full overflow-hidden rounded-[2rem] bg-base-300 shadow-2xl shadow-black/20"
          initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
          animate={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduceMotion ? 1 : 1.18 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          >
            <Image
              src={photo}
              alt="Md Muntasir Mahmud – Full-Stack Developer"
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 340px, 240px"
              className="object-cover object-top"
            />
          </motion.div>

          {/* bottom fade for depth */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent)" }}
          />
        </motion.div>

        {/* ── Tech chips ── */}
        {CHIPS.map((c, i) => (
          <Chip key={c.label} {...c} index={i} reduceMotion={reduceMotion} />
        ))}
      </motion.div>
    </div>
  );
};

export default HeroPhoto;
