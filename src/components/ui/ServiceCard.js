"use client";

import React from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay }}
      className="bg-base-200 p-5 rounded-md min-h-20 overflow-hidden"
    >
      <article className="flex gap-4 flex-col">
        <div>{icon}</div>
        <div>
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-base-content text-sm">{description}</p>
        </div>
      </article>
    </motion.div>
  );
};

export default ServiceCard;
