"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { usePortfolio } from "@/components/providers/PortfolioProvider";

const FeaturedProjects = () => {
  const { projects = [] } = usePortfolio();
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section className="px-4 md:px-6 lg:px-8 py-20">
      <h2 className="text-5xl text-center font-extrabold mb-10">
        <span className="text-spotify">Featured</span> Projects
      </h2>

      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project._id} project={project} delay={i * 0.15} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Button href="/projects">
          All Projects <HiOutlineArrowNarrowRight />
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProjects;
