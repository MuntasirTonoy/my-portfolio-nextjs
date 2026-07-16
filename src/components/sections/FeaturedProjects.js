"use client";

import React from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";
import { usePortfolio } from "@/components/providers/AdminProvider";
import { ProjectSkeleton } from "@/components/ui/Skeleton";

const FeaturedProjects = () => {
  const { portfolioData, loading } = usePortfolio();

  // Filter featured projects from the backend data
  const featuredProjects = (portfolioData?.projects || []).filter((p) => p.featured);

  return (
    <section className="px-4 md:px-6 lg:px-8 py-20">
      <h2 className="text-5xl text-center font-extrabold mb-10">
        <span className="text-spotify">Featured</span> Projects
      </h2>

      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </>
        ) : (
          featuredProjects.map((project, i) => (
            <ProjectCard key={project._id || i} project={project} delay={i * 0.15} />
          ))
        )}
      </div>

      {!loading && (
        <div className="text-center mt-12">
          <Link href="/projects">
            <Button>
              All Projects <HiOutlineArrowNarrowRight />
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default FeaturedProjects;
