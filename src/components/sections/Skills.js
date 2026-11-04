"use client";

import SkillCard from "@/components/ui/SkillCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { usePortfolio } from "@/components/providers/PortfolioProvider";

const Skills = () => {
  const { skills = [] } = usePortfolio();

  return (
    <section className="px-4 md:px-8 lg:px-20 bg-base-100 text-base-content py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          accent="Tech"
          title="Stack"
          subtitle="Tools & technologies I use to craft full-stack web applications."
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((group, index) => (
            <SkillCard
              key={group._id || index}
              category={group.category}
              items={group.items || []}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
