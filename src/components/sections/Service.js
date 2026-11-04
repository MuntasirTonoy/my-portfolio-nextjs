"use client";

import { FaCode, FaServer, FaDatabase, FaLaptopCode } from "react-icons/fa";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { usePortfolio } from "@/components/providers/PortfolioProvider";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const defaultIcons = [FaCode, FaServer, FaDatabase, FaLaptopCode];

const Services = () => {
  const { services } = usePortfolio();
  if (!services) return null;

  return (
    <section className="bg-base-100 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Left: intro */}
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeading
              align="start"
              eyebrow={services.sectionTitle || "Services"}
              title={services.heading || "How I Help You To Build Your Product"}
            />
            {services.description && (
              <motion.p
                {...fadeUp(0.3)}
                className="mt-5 text-base-content/75 leading-relaxed text-center lg:text-start"
              >
                {services.description}
              </motion.p>
            )}
          </div>

          {/* Right: cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5 lg:gap-6">
            {(services.items || []).map((item, index) => (
              <ServiceCard
                key={index}
                index={index}
                delay={index * 0.1}
                Icon={defaultIcons[index % defaultIcons.length]}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
