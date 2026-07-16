"use client";

import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const ReviewCard = ({ name, role, review, avatar, rating }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col p-8 bg-base-300/50 backdrop-blur-sm rounded-3xl h-full min-h-[380px] w-full max-w-sm mx-auto text-left border border-base-content/5 hover:border-spotify/20 transition-all duration-500 group"
    >
      {/* Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-spotify/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Header: Avatar + Stars */}
      <div className="flex justify-between items-start mb-6">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-14 h-14 rounded-2xl object-cover ring-4 ring-base-100 shadow-xl group-hover:ring-spotify/20 transition-all duration-500"
          />
          <div className="absolute -bottom-2 -right-2 bg-spotify p-1.5 rounded-lg shadow-lg">
            <FaQuoteLeft className="text-white text-[10px]" />
          </div>
        </div>
        <div className="flex gap-1 text-yellow-500/80">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              size={12} 
              className={i < (rating || 5) ? "text-yellow-500" : "text-base-content/10"} 
            />
          ))}
        </div>
      </div>

      {/* Review text with Line Clamp */}
      <div className="flex-1">
        <p className="text-base-content/70 text-sm sm:text-base leading-relaxed italic line-clamp-4 group-hover:text-base-content transition-colors duration-300">
          "{review}"
        </p>
      </div>

      {/* Footer: User Info */}
      <div className="mt-8 pt-6 border-t border-base-content/5">
        <h4 className="font-bold text-base tracking-tight group-hover:text-spotify transition-colors duration-300">
          {name}
        </h4>
        <p className="text-xs font-medium text-base-content/40 uppercase tracking-widest mt-0.5">
          {role}
        </p>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
