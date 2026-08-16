"use client";

import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ProjectDetailsSkeleton } from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";
import { usePortfolio } from "@/components/providers/AdminProvider";
import { GoDotFill } from "react-icons/go";

const ProjectDetails = () => {
  const params = useParams();
  const id = params.id;
  const { portfolioData, loading } = usePortfolio();

  // Find project in the global projects array
  const projects = portfolioData?.projects || [];
  const project = projects.find((p) => p._id === id || p.id?.toString() === id);

  if (loading) return <ProjectDetailsSkeleton />;
  if (!project)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-2xl font-bold">Project not found</p>
        <Link href="/projects">
          <Button>Back to Projects</Button>
        </Link>
      </div>
    );

  const {
    image,
    title,
    description,
    tech,
    status,
    featured,
    links,
    keyFeature,
    challenges,
    improvements,
  } = project;

  return (
    <div className="relative max-w-6xl mx-auto my-20 p-6 bg-base-300 rounded-xl min-h-[70vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section */}
        <div>
          {/* Project Image */}
          <div className="overflow-hidden rounded-xl border border-base-100 mb-6">
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Project Name */}
          <h1 className="text-3xl font-extrabold mb-5">{title}</h1>

          {/* Status & Featured inline */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                status === "completed"
                  ? "bg-spotify text-white"
                  : "bg-yellow-500 text-black"
              }`}
            >
              {status}
            </span>

            {featured && (
              <span className="px-4 py-1 bg-green-500/20 text-spotify border border-spotify/20 rounded-full text-xs font-bold uppercase tracking-wider">
                🌟 Featured Project
              </span>
            )}
          </div>

          {/* Tech Stack Grouped */}
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-bold">Tech Stack</h2>

            {tech?.frontend?.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm mb-2 text-base-content/60">
                  Frontend:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tech.frontend.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {tech?.backend?.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm mb-2 text-base-content/60">
                  Backend:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tech.backend.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {tech?.other?.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm mb-2 text-base-content/60">
                  Tools & Infrastructure:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tech.other.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg text-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 mt-8">
            {links?.liveDemo && (
              <a href={links.liveDemo} target="_blank" rel="noopener noreferrer">
                <Button>
                  <span className="flex items-center gap-2">
                    Live Demo <FaExternalLinkAlt size={14} />
                  </span>
                </Button>
              </a>
            )}
            {links?.clientSide && (
              <a href={links.clientSide} target="_blank" rel="noopener noreferrer">
                <Button>
                  <span className="flex items-center gap-2">
                    Client Repo <FaGithub size={14} />
                  </span>
                </Button>
              </a>
            )}
            {links?.serverSide && (
              <a href={links.serverSide} target="_blank" rel="noopener noreferrer">
                <Button>
                  <span className="flex items-center gap-2">
                    Server Repo <FaGithub size={14} />
                  </span>
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-8 lg:border-l lg:border-base-100 lg:pl-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Brief Description</h2>
            <p className="text-base-content/80 leading-relaxed ">
              {description}
            </p>
          </div>

          {keyFeature?.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Key Features</h2>
              <ul className="grid grid-cols-1 gap-2">
                {keyFeature.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded-lg"
                  >
                    <span className="text-spotify mt-1">
                      <GoDotFill />
                    </span>
                    <span className="text-sm text-base-content/80">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {challenges && (
            <div>
              <h2 className="text-xl font-bold mb-4">Challenges Faced</h2>
              <p className="text-base-content/80 leading-relaxed italic">
                {challenges}
              </p>
            </div>
          )}

          {improvements && (
            <div>
              <h2 className="text-xl font-bold mb-4">Future Roadmap</h2>
              <p className="text-base-content/80 leading-relaxed">
                {improvements}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
