"use client";

import SkillCard from "@/components/ui/SkillCard";
import { usePortfolio } from "@/components/providers/PortfolioProvider";

const Skills = () => {
  const { skills = [] } = usePortfolio();

  return (
    <div className="px-4 md:px-8 lg:px-20 bg-base-100 text-base-content py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold mb-4">
            <span className="text-spotify">Tech</span> Stack
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Tools & technologies I use to craft full-stack web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((group, index) => (
            <SkillCard
              key={group._id || index}
              category={group.category}
              items={group.items || []}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
