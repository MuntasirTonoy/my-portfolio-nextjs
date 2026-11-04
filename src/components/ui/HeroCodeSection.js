"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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

/*
  Scroll choreography (p = smoothed progress, 0 → 1, from the section's top
  entering the viewport until its center reaches the viewport center):
    0.00 – 0.55  code window tilts up from 3D and scales into place
    0.05 – 0.60  AI logos fly in from scattered positions
    0.20 – 0.92  code bars "type" one after another; footer progress fills
    0.92 – 1.00  status flips to "Generated"
*/
const TYPE_START = 0.2;
const TYPE_END = 0.92;

// Flatten segments so each one gets its own slice of the typing window.
const allSegments = abstractCodeLines.flatMap((line, lineIdx) =>
  line.segments.map((seg, segIdx) => ({ ...seg, lineIdx, segIdx }))
);
const SLICE = (TYPE_END - TYPE_START) / allSegments.length;
const segmentRange = (globalIdx) => {
  const start = TYPE_START + globalIdx * SLICE;
  return [start, start + SLICE * 1.4];
};
// Scroll point at which each line starts / finishes typing.
const lineRanges = abstractCodeLines.map((_, lineIdx) => {
  const idxs = allSegments.map((s, i) => (s.lineIdx === lineIdx ? i : -1)).filter((i) => i >= 0);
  return [segmentRange(idxs[0])[0], segmentRange(idxs[idxs.length - 1])[1]];
});

// Deterministic "scatter" start positions for the AI logos.
const scatter = [
  { x: -120, y: 60, r: -40 },
  { x: 80, y: 110, r: 30 },
  { x: -40, y: -90, r: 25 },
  { x: 140, y: -50, r: -35 },
  { x: 30, y: 140, r: 45 },
];

const CodeSegment = ({ seg, progress, range }) => {
  const scaleX = useTransform(progress, range, [0, 1]);
  const opacity = useTransform(progress, [range[0], range[0] + 0.01], [0, 1]);
  return (
    <motion.span
      style={{ scaleX, opacity, originX: 0 }}
      className={`h-1.5 sm:h-2 rounded-full shrink-0 ${seg.width} ${seg.color} transition-[filter] duration-300 hover:brightness-125`}
    />
  );
};

const CodeLine = ({ line, idx, progress }) => {
  const [start, end] = lineRanges[idx];
  // Line number lights up while its line is being typed / once done.
  const numOpacity = useTransform(progress, [start - 0.02, start], [0.25, 0.7]);
  // Cursor is visible only while this line is typing.
  const cursorOpacity = useTransform(progress, [start - 0.001, start, end, end + 0.001], [0, 1, 1, 0]);

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <motion.span
        style={{ opacity: numOpacity }}
        className="select-none text-[10px] sm:text-xs font-mono w-4 sm:w-5 text-right text-base-content font-semibold shrink-0"
      >
        {String(idx + 1).padStart(2, "0")}
      </motion.span>
      <div
        className="flex items-center gap-1.5 sm:gap-2.5 flex-1 min-w-0"
        style={{ paddingLeft: `calc(${line.indent} * clamp(0.75rem, 3vw, 1.5rem))` }}
      >
        {line.segments.map((seg, sIdx) => {
          const globalIdx = allSegments.findIndex((s) => s.lineIdx === idx && s.segIdx === sIdx);
          return <CodeSegment key={sIdx} seg={seg} progress={progress} range={segmentRange(globalIdx)} />;
        })}
        <motion.span
          aria-hidden="true"
          style={{ opacity: cursorOpacity }}
          className="w-0.5 h-3.5 sm:h-4 bg-[#02b677] animate-pulse"
        />
      </div>
    </div>
  );
};

const AiToolIcon = ({ tool, index, progress }) => {
  const s = scatter[index % scatter.length];
  const range = [0.05 + index * 0.04, 0.45 + index * 0.04];
  const x = useTransform(progress, range, [s.x, 0]);
  const y = useTransform(progress, range, [s.y, 0]);
  const rotate = useTransform(progress, range, [s.r, 0]);
  const opacity = useTransform(progress, [range[0], range[0] + 0.12], [0, 1]);
  const scale = useTransform(progress, range, [0.4, 1]);

  return (
    <motion.div style={{ x, y, rotate, opacity, scale }}>
      <motion.div
        whileHover={{ scale: 1.12, y: -4, boxShadow: `0 12px 24px -6px ${tool.brandColor}55` }}
        whileTap={{ scale: 0.9 }}
        className="relative group flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full backdrop-blur-md border shadow-md cursor-pointer"
        style={{ borderColor: `${tool.brandColor}45`, backgroundColor: `${tool.brandColor}12` }}
        title={tool.name}
      >
        <tool.icon
          className="text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110"
          style={{ color: tool.brandColor }}
        />
        <span className="absolute -bottom-10 px-3 py-1 text-xs font-semibold text-white bg-slate-900/95 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 pointer-events-none whitespace-nowrap z-20 shadow-xl">
          {tool.name}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default function HeroCodeSection() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  // Reduced motion: pin everything to its finished state.
  const done = useMotionValue(1);
  const progress = reduceMotion ? done : smooth;

  // Code window: 3D tilt-up entrance.
  const rotateX = useTransform(progress, [0, 0.55], [28, 0]);
  const winScale = useTransform(progress, [0, 0.55], [0.82, 1]);
  const winY = useTransform(progress, [0, 0.55], [80, 0]);
  const winOpacity = useTransform(progress, [0, 0.25], [0, 1]);
  const glowOpacity = useTransform(progress, [0.3, 1], [0.2, 0.8]);

  // Footer telemetry.
  const genProgress = useTransform(progress, [TYPE_START, TYPE_END], [0, 1]);
  const percent = useTransform(genProgress, (v) => `${Math.round(v * 100)}%`);
  const speedup = useTransform(genProgress, (v) => `${(1 + v * 9).toFixed(1)}x`);
  const [typedAll, setTypedAll] = useState(false);
  useMotionValueEvent(genProgress, "change", (v) => setTypedAll(v >= 0.999));
  const generated = Boolean(reduceMotion) || typedAll;

  // Heading: "Workflow" fills with a gradient as you scroll.
  const fill = useTransform(progress, [0.1, 0.7], ["0%", "100%"]);
  const textY = useTransform(progress, [0, 0.5], [40, 0]);
  const textOpacity = useTransform(progress, [0, 0.35], [0, 1]);

  return (
    <div ref={ref} className="hero min-h-screen bg-base-200 text-base-content px-4 py-12 sm:py-16 overflow-hidden">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8 sm:gap-10 max-w-6xl w-full">
        {/* ── Code window ── */}
        <div className="w-full lg:w-1/2" style={{ perspective: 1200 }}>
          <motion.div
            style={{ rotateX, scale: winScale, y: winY, opacity: winOpacity, transformOrigin: "50% 100%" }}
            className="relative group"
          >
            <motion.div
              style={{ opacity: glowOpacity }}
              className="absolute -inset-1.5 rounded-2xl bg-linear-to-r from-[#02b677]/40 via-cyan-500/25 to-purple-500/40 blur-xl"
            />

            <div className="relative rounded-2xl border border-base-300 bg-base-100 text-base-content overflow-hidden transition-transform duration-500 ease-out group-hover:-translate-y-1">
              {/* Top bar */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-base-300/80 border-b border-base-300 select-none">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs font-mono text-base-content/70 flex items-center gap-1.5 font-medium truncate">
                    <span>🤖</span> ai-pipeline.ts
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold bg-[#02b677]/15 text-[#02b677] border border-[#02b677]/30 shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full bg-[#02b677] ${generated ? "" : "animate-ping"}`} />
                  {generated ? "Done" : "AI Active"}
                </span>
              </div>

              {/* Code body */}
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm min-h-72 sm:min-h-87.5 flex flex-col justify-center space-y-4 sm:space-y-5 bg-base-100">
                {abstractCodeLines.map((line, idx) => (
                  <CodeLine key={line.id} line={line} idx={idx} progress={progress} />
                ))}

                {/* Telemetry */}
                <div className="pt-3 sm:pt-4 mt-2 sm:mt-3 border-t border-base-300 text-[10px] sm:text-[11px] font-mono space-y-2">
                  <div className="h-1 w-full rounded-full bg-base-300 overflow-hidden">
                    <motion.div
                      style={{ scaleX: genProgress, originX: 0 }}
                      className="h-full bg-linear-to-r from-[#02b677] to-cyan-400"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-base-content/60">
                    <span className="flex items-center gap-1.5 text-[#02b677] font-medium">
                      {generated ? (
                        <>✓ Generated</>
                      ) : (
                        <>
                          Generating… <motion.span>{percent}</motion.span>
                        </>
                      )}
                    </span>
                    <span className="font-medium">
                      Speedup: <motion.span className="text-base-content">{speedup}</motion.span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Text + AI tools ── */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            AI-Powered <br />
            <span className="relative inline-block">
              <span className="text-base-content/20">Workflow</span>
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden whitespace-nowrap bg-linear-to-r from-[#02b677] to-cyan-400 bg-clip-text text-transparent"
                style={{ width: fill }}
              >
                Workflow
              </motion.span>
            </span>
          </h2>

          <p className="text-base-content/70 text-lg leading-relaxed">
            I integrate AI into my development process to automate repetitive
            work, accelerate problem-solving, and build better products in less
            time.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            {aiTools.map((tool, i) => (
              <AiToolIcon key={tool.name} tool={tool} index={i} progress={progress} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
