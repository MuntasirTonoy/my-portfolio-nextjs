"use client";

import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import Button from "@/components/ui/Button";
import RemoteImage from "@/components/ui/RemoteImage";

const TECH_GROUPS = [
  { key: "frontend", label: "Frontend:", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { key: "backend", label: "Backend:", className: "bg-green-500/10 text-green-400 border-green-500/20" },
  { key: "other", label: "Tools & Infrastructure:", className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
];

const LINKS = [
  { key: "liveDemo", label: "Live Demo", Icon: FaExternalLinkAlt },
  { key: "clientSide", label: "Client Repo", Icon: FaGithub },
  { key: "serverSide", label: "Server Repo", Icon: FaGithub },
];

const ProjectDetails = ({ project }) => {
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
          {image && (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-base-100 mb-6">
              <RemoteImage
                src={image}
                alt={title}
                fill
                priority
                sizes="(min-width: 1024px) 576px, 100vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

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

            {TECH_GROUPS.map(({ key, label, className }) =>
              tech?.[key]?.length > 0 ? (
                <div key={key}>
                  <h3 className="font-semibold text-sm mb-2 text-base-content/60">{label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {tech[key].map((t) => (
                      <span key={t} className={`px-3 py-1 border rounded-lg text-sm ${className}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 mt-8">
            {LINKS.map(({ key, label, Icon }) =>
              links?.[key] ? (
                <Button key={key} href={links[key]} external>
                  {label} <Icon size={14} />
                </Button>
              ) : null
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
