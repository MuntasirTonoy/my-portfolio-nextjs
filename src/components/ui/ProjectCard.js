"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import RemoteImage from "@/components/ui/RemoteImage";
import { fadeUp } from "@/lib/motion";

const statusColors = {
  completed: "bg-green-100 text-green-700",
  working: "bg-yellow-100 text-yellow-700",
  planned: "bg-blue-100 text-blue-700",
};

const ProjectCard = ({ project, delay = 0 }) => {
  const { _id: projectId, image, title, description, status, tags } = project;

  return (
    <motion.article
      {...fadeUp(delay)}
      className="group relative w-full max-w-md mx-auto h-full min-h-[420px] flex flex-col bg-base-200 rounded-2xl border border-base-300 overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[#02b677]/40 hover:shadow-[0_16px_40px_-16px_rgba(2,182,119,0.35)]"
    >
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3">
        <span className="w-3 h-3 bg-red-500 rounded-full" />
        <span className="w-3 h-3 bg-yellow-400 rounded-full" />
        <span className="w-3 h-3 bg-green-500 rounded-full" />
      </div>

      <div className="px-4 pb-5 flex flex-col grow gap-3">
        {/* hover: screenshot slowly zooms */}
        <div className="relative w-full h-44 shrink-0 overflow-hidden rounded-xl bg-base-300">
          <RemoteImage
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        <div className="flex justify-between items-center gap-3 mt-1">
          <h3 className="text-xl font-bold text-base-content transition-colors duration-300 group-hover:text-[#02b677]">
            {title}
          </h3>
          {status && (
            <span className={`shrink-0 text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[status] || ""}`}>
              {status}
            </span>
          )}
        </div>

        <p className="text-sm text-base-content/70 line-clamp-2">{description}</p>

        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-accent text-black rounded-full text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Whole card is clickable via the stretched link; arrow nudges on hover */}
        <Link
          href={`/project/${projectId}`}
          className="mt-auto pt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#02b677] after:absolute after:inset-0 after:content-['']"
        >
          View project
          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
