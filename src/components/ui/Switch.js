"use client";

import React from "react";

const Switch = ({ theme, toggleTheme }) => {
  const checked = theme === "dark";

  return (
    <label
      htmlFor="themeToggle"
      className="relative inline-block mx-2 w-8 aspect-square cursor-pointer z-50"
    >
      <input
        type="checkbox"
        id="themeToggle"
        className="appearance-none absolute inset-0 w-full h-full cursor-pointer"
        checked={checked}
        onChange={toggleTheme}
      />
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        stroke="none"
        className={`absolute left-0 w-full h-full transition-transform duration-400 ease-in-out ${
          checked ? "rotate-[90deg]" : "rotate-[40deg]"
        }`}
      >
        <mask id="moon-mask">
          <rect x={0} y={0} width={20} height={20} fill="white" />
          <circle
            cx={11}
            cy={3}
            r={8}
            fill="black"
            style={{
              transform: checked
                ? "translate(16px, -3px)"
                : "translate(0px, 0px)",
              transition:
                "transform 0.64s cubic-bezier(0.41, 0.64, 0.32, 1.575)",
            }}
          />
        </mask>
        {/* Sun/Moon main circle */}
        <circle
          cx={10}
          cy={10}
          r={8}
          mask="url(#moon-mask)"
          className={`transform origin-center transition-transform duration-400 ease-in-out ${
            checked ? "scale-[0.55]" : "scale-100"
          }`}
          fill={checked ? "gray" : "#facc15"}
          stroke={checked ? "none" : "#fde68a"}
          strokeWidth={checked ? 0 : 2}
        />
        {/* Sun rays */}
        <g>
          {[
            { cx: 18, cy: 10, delay: "0s" },
            { cx: 14, cy: 16.928, delay: "0.05s" },
            { cx: 6, cy: 16.928, delay: "0.1s" },
            { cx: 2, cy: 10, delay: "0.17s" },
            { cx: 6, cy: 3.1718, delay: "0.25s" },
            { cx: 14, cy: 3.1718, delay: "0.29s" },
          ].map(({ cx, cy, delay }, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={1.5}
              fill="#fbbf24"
              className="transform origin-center"
              style={{
                transform: checked ? "scale(1)" : "scale(0.4)",
                transition: "transform 0.4s ease",
                animation: checked
                  ? `showRay 0.4s ease ${delay} forwards`
                  : "none",
              }}
            />
          ))}
        </g>
      </svg>

      <style>{`
        @keyframes showRay {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
      `}</style>
    </label>
  );
};

export default Switch;
