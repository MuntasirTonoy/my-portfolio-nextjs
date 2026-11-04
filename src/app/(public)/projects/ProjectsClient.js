"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { BiSearch } from "react-icons/bi";
import { usePortfolio } from "@/components/providers/PortfolioProvider";

const allTech = (project) => Object.values(project.tech || {}).flat();

const AllProjects = () => {
  const { projects = [] } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState("");
  const [techFilter, setTechFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const hasFilters = Boolean(searchQuery || techFilter || tagFilter || statusFilter);
  const resetFilters = () => {
    setSearchQuery("");
    setTechFilter("");
    setTagFilter("");
    setStatusFilter("");
  };

  const filterOptions = useMemo(() => {
    const techSet = new Set();
    const tagSet = new Set();
    const statusSet = new Set();

    projects.forEach((p) => {
      allTech(p).forEach((t) => techSet.add(t));
      (p.tags || []).forEach((tag) => tagSet.add(tag));
      if (p.status) statusSet.add(p.status);
    });

    return {
      techs: Array.from(techSet).sort(),
      tags: Array.from(tagSet).sort(),
      statuses: Array.from(statusSet).sort(),
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesSearch =
        !query ||
        (p.title || "").toLowerCase().includes(query) ||
        (p.description || "").toLowerCase().includes(query);

      const matchesTech = !techFilter || allTech(p).includes(techFilter);

      const matchesTag = !tagFilter || (p.tags || []).includes(tagFilter);

      const matchesStatus = !statusFilter || p.status === statusFilter;

      return matchesSearch && matchesTech && matchesTag && matchesStatus;
    });
  }, [projects, searchQuery, techFilter, tagFilter, statusFilter]);

  return (
    <div className="min-h-screen mt-20 bg-base-100">
      {/* Hero Section */}
      <section className="text-base-content mb-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-3">
            <span className="text-spotify">My</span> Projects
          </h1>
          <p className="text-lg opacity-90">
            Browse through my development projects
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-5">
          <div className="mb-6 flex">
            <label className="label" htmlFor="project-search">
              <span className="label-text mr-1">
                <BiSearch size={30} aria-hidden="true" />
                <span className="sr-only">Search projects</span>
              </span>
            </label>
            <input
              id="project-search"
              type="search"
              placeholder="Search Projects..."
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="select select-bordered flex-1 min-w-[150px]"
            value={techFilter}
            onChange={(e) => setTechFilter(e.target.value)}
          >
            <option value="">All Technologies</option>
            {filterOptions.techs.map((tech) => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>

          <select
            className="select select-bordered flex-1 min-w-[150px]"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          >
            <option value="">All Tags</option>
            {filterOptions.tags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          <select
            className="select select-bordered flex-1 min-w-[150px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            {filterOptions.statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold" aria-live="polite">
            {filteredProjects.length} {filteredProjects.length === 1 ? "Project" : "Projects"} Found
          </h2>
          {hasFilters && (
            <button type="button" onClick={resetFilters} className="btn btn-sm btn-outline">
              Reset All Filters
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {filteredProjects.length > 0 ? (
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} delay={index * 0.1} />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="col-span-full text-center py-16 bg-base-200 rounded-xl">
              <div className="text-5xl mb-4">🧐</div>
              <h3 className="text-xl font-medium mb-2">No projects match your filters</h3>
              <button type="button" onClick={resetFilters} className="btn btn-primary mt-4">
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllProjects;
