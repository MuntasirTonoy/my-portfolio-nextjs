"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { usePortfolio } from "@/components/providers/PortfolioProvider";
import { fadeUp } from "@/lib/motion";

const FeaturedProjects = () => {
  const { projects = [] } = usePortfolio();
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section className="px-4 md:px-6 lg:px-8 py-20">
      <SectionHeading accent="Featured" title="Projects" className="mb-14" />

      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project._id} project={project} delay={(i % 3) * 0.1} />
        ))}
      </div>

      <motion.div {...fadeUp(0.2)} className="text-center mt-12">
        <Button href="/projects">
          All Projects <HiOutlineArrowNarrowRight />
        </Button>
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;
