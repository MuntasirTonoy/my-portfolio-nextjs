"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const statusColors = {
  completed: "bg-green-100 text-green-700",
  working: "bg-yellow-100 text-yellow-700",
};

const ProjectCard = ({ project, delay = 0 }) => {
  const { _id, id, image, title, description, status } = project;
  const projectId = _id || id;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay }}
      className="relative group w-full max-w-md mx-auto bg-base-300 rounded-lg border border-base-300 overflow-hidden z-10 flex flex-col"
      style={{ minHeight: "420px" }} // enforce min height for uniformity
    >
      {/* Animated Circle Background - Desktop only */}
      <motion.div
        initial={{ top: "100%", left: "100%" }}
        animate={
          isHovered
            ? { top: "200px", left: "200px" }
            : { top: "100%", left: "100%" }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden lg:block absolute w-96 h-96 bg-[#02b677] opacity-90 rounded-full z-10"
      />

      {/* Top tool section */}
      <div className="flex items-center p-2">
        <span className="w-3 h-3 bg-red-500 rounded-full mx-1"></span>
        <span className="w-3 h-3 bg-yellow-400 rounded-full mx-1"></span>
        <span className="w-3 h-3 bg-green-500 rounded-full mx-1"></span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-md flex-shrink-0"
        />

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-base-content">{title}</h2>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>

        <p className="text-sm text-base-content line-clamp-2 flex-grow">
          {description}
        </p>
        <div className="flex gap-2">
          {project.tags && project.tags.map((tag) => (
            <span
              className="px-3 py-1 bg-accent text-black rounded-full text-xs"
              key={tag}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Mobile View Button inside padding with margin-top auto to push it down */}
        <div className="lg:hidden mt-auto pt-4">
          <Link href={`/project/${projectId}`}>
            <button className="btn btn-sm rounded-full btn-soft btn-success text-spotify w-full flex items-center justify-center gap-2">
              View <FiArrowRight size={20} />
            </button>
          </Link>
        </div>
      </div>

      {/* Animated Arrow Link - Desktop only */}
      <Link
        href={`/project/${projectId}`}
        className="hidden lg:flex absolute bottom-15 right-15 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white text-spotify p-2 rounded-full shadow-md z-20"
      >
        <FiArrowRight size={20} />
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
