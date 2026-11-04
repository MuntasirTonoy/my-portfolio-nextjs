"use client";

import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaLaptopCode  } from "react-icons/fa";
import ServiceCard from "@/components/ui/ServiceCard";
import { usePortfolio } from "@/components/providers/PortfolioProvider";

const defaultIcons = [
  <FaCode size={40} className="text-spotify" key="code" />,
  <FaServer size={40} className="text-spotify" key="server" />,
  <FaDatabase size={40} className="text-spotify" key="db" />,
  <FaLaptopCode size={40} className="text-spotify" key="laptop" />,
];

const Services = () => {
  const { services } = usePortfolio();
  if (!services) return null;

  return (
    <section className="bg-base-100 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Intro with animation */}
          <motion.div
            className="mx-3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <h4 className="text-spotify font-bold text-lg mb-2">{services.sectionTitle || "SERVICES"}</h4>
            <h2 className="text-4xl font-extrabold  mb-4">
              {services.heading || "How I Help You To Build Your Product"}
            </h2>
            <p className="text-base-content leading-relaxed">
              {services.description}
            </p>
          </motion.div>

          {/* Right: Services */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5 lg:gap-10">
            {(services.items || []).map((item, index) => (
              <ServiceCard
                delay={index * 0.2}
                key={index}
                icon={defaultIcons[index % defaultIcons.length]}
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
