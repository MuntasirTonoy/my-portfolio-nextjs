"use client";

import { motion } from "framer-motion";
import {
  SiAnthropic,
  SiClaude,
  SiDeepseek,
  SiGithubcopilot,
  SiGooglegemini,
  SiMistralai,
} from "react-icons/si";

const ChatGPTIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.535-3.0137l.142.0852 4.783 2.7582a.7948.7948 0 0 0 .7854 0l5.833-3.3692v2.3326a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3422 7.8732a4.466 4.466 0 0 1 2.3413-1.9729V11.48a.7854.7854 0 0 0 .3927.6813l5.833 3.3693-2.02 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7913A4.4944 4.4944 0 0 1 2.3422 7.8732zm16.5963 3.8558L13.1055 8.3597l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.3927-.6813zm2.0107-3.0231l-.1419-.0852-4.7735-2.7582a.7948.7948 0 0 0-.7854 0L9.409 9.2297V6.8971a.0804.0804 0 0 1 .0332-.0615l4.835-2.796a4.4992 4.4992 0 0 1 6.6758 4.6596zm-8.4716-4.9947a4.4755 4.4755 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V8.2432a4.504 4.504 0 0 1 4.4945-4.4944z" />
  </svg>
);

const aiTools = [
  { name: "ChatGPT", icon: ChatGPTIcon, brandColor: "#10A37F" },
  { name: "Claude", icon: SiClaude, brandColor: "#D97757" },
  { name: "Gemini", icon: SiGooglegemini, brandColor: "#8E75FF" },
  { name: "DeepSeek", icon: SiDeepseek, brandColor: "#4D6BFE" },
  { name: "Copilot", icon: SiGithubcopilot, brandColor: "#6E40C9" },
];

const abstractCodeLines = [
  {
    id: 1,
    indent: 0,
    segments: [
      { color: "bg-purple-500", width: "w-10 sm:w-20" },
      { color: "bg-cyan-400", width: "w-16 sm:w-32" },
      { color: "bg-amber-400", width: "w-7 sm:w-14" },
    ],
  },
  {
    id: 2,
    indent: 0,
    segments: [
      { color: "bg-spotify", width: "w-12 sm:w-24" },
      { color: "bg-pink-500", width: "w-20 sm:w-40" },
    ],
  },
  {
    id: 3,
    indent: 1,
    segments: [
      { color: "bg-cyan-400", width: "w-8 sm:w-16" },
      { color: "bg-purple-500", width: "w-22 sm:w-44" },
      { color: "bg-amber-400", width: "w-6 sm:w-12" },
    ],
  },
  {
    id: 4,
    indent: 2,
    segments: [
      { color: "bg-pink-500", width: "w-14 sm:w-28" },
      { color: "bg-blue-500", width: "w-18 sm:w-36" },
    ],
  },
  {
    id: 5,
    indent: 2,
    segments: [
      { color: "bg-emerald-400", width: "w-24 sm:w-48" },
      { color: "bg-amber-400", width: "w-10 sm:w-20" },
    ],
  },
  {
    id: 6,
    indent: 1,
    segments: [
      { color: "bg-cyan-400", width: "w-16 sm:w-32" },
      { color: "bg-purple-500", width: "w-12 sm:w-24" },
    ],
  },
  {
    id: 7,
    indent: 1,
    segments: [
      { color: "bg-rose-400", width: "w-8 sm:w-16" },
      { color: "bg-spotify", width: "w-26 sm:w-52" },
    ],
  },
  {
    id: 8,
    indent: 0,
    segments: [
      { color: "bg-indigo-500", width: "w-12 sm:w-24" },
      { color: "bg-amber-400", width: "w-8 sm:w-16" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const toolVariants = {
  hidden: {
    opacity: 0,
    scale: 0.2,
    y: 20,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18,
    },
  },
};

const codeLineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const codeLineRowVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const segmentBarVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export default function HeroCodeSection() {
  return (
    <div className="hero min-h-screen bg-base-200 text-base-content px-4 py-12 sm:py-16">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8 sm:gap-10 max-w-6xl w-full">
        {/* Right Side: Futuristic AI Automation Code Window */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="w-full lg:w-1/2 relative group"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-1.5 rounded-2xl bg-linear-to-r from-spotify/30 via-cyan-500/20 to-purple-500/30 blur-xl opacity-70 group-hover:opacity-100 transition duration-500" />

          {/* Window Frame - Adapts dynamically to light & dark themes */}
          <div className="relative rounded-2xl border border-base-300 bg-base-100 text-base-content  overflow-hidden">
            {/* Window Top Bar */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-base-300/80 border-b border-base-300 select-none">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs font-mono text-base-content/70 flex items-center gap-1.5 font-medium truncate">
                  <span>🤖</span> ai-pipeline.ts
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold bg-spotify/15 text-spotify border border-spotify/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-spotify animate-ping" />
                  AI Active
                </span>
              </div>
            </div>

            {/* Code Window Body with Abstract Colorful Code Lines */}
            <motion.div
              variants={codeLineContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed min-h-72 sm:min-h-87.5 flex flex-col justify-center space-y-4 sm:space-y-5 relative overflow-hidden bg-base-100"
            >
              {abstractCodeLines.map((line, idx) => (
                <motion.div
                  key={line.id}
                  variants={codeLineRowVariants}
                  className="flex items-center gap-2 sm:gap-4 z-0"
                >
                  {/* Line Numbers */}
                  <span className="select-none opacity-40 text-[10px] sm:text-xs font-mono w-4 sm:w-5 text-right text-base-content/50 font-semibold shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Indented Code Segments */}
                  <div
                    className="flex items-center gap-1.5 sm:gap-2.5 flex-1 min-w-0"
                    style={{ paddingLeft: `calc(${line.indent} * clamp(0.75rem, 3vw, 1.5rem))` }}
                  >
                    {line.segments.map((seg, sIdx) => (
                      <motion.span
                        key={sIdx}
                        variants={segmentBarVariants}
                        style={{ originX: 0 }}
                        className={`h-1.5 sm:h-2 rounded-full shrink-0 ${seg.width} ${seg.color} transition-all duration-300 hover:brightness-125`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Window Footer Telemetry */}
              <div className="pt-3 sm:pt-4 mt-2 sm:mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-base-300 text-[10px] sm:text-[11px] text-base-content/60 font-mono">
                <span className="flex items-center gap-1.5 text-spotify font-medium">
                  <span>✓</span> Automated Generation Active
                </span>
                <span className="text-base-content/60 font-medium">Speedup: 10x</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Left Side: Hero Text & AI Tools */}
        <div className="w-full lg:w-1/2 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight"
          >
            AI-Powered <br /> <span className="text-spotify">Workflow</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
            className="text-base-content/70 text-lg leading-relaxed"
          >
            I integrate AI into my development process to automate repetitive
            work, accelerate problem-solving, and build better products in less
            time.
          </motion.p>

          {/* AI Tools Staggered Scroll Reveal */}
          <motion.div
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
          >
            {aiTools.map((tool) => (
              <motion.div
                key={tool.name}
                variants={toolVariants}
                whileHover={{
                  scale: 1.24,
                  y: -6,
                  rotate: 6,
                  boxShadow: `0 12px 24px -6px ${tool.brandColor}55`,
                }}
                whileTap={{ scale: 0.9 }}
                className="relative group flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-base-100/90 backdrop-blur-md border border-base-300 shadow-md cursor-pointer transition-all duration-300"
                style={{
                  borderColor: `${tool.brandColor}45`,
                  backgroundColor: `${tool.brandColor}12`,
                }}
                title={tool.name}
              >
                <tool.icon
                  className="text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-md"
                  style={{ color: tool.brandColor }}
                />
                {/* Tooltip on hover */}
                <span className="absolute -bottom-10 px-3 py-1 text-xs font-semibold text-white bg-slate-900/95 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 pointer-events-none whitespace-nowrap z-20 shadow-xl border border-white/10">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

