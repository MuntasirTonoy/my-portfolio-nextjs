"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaLocationArrow,
} from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import Link from "next/link";
import { usePortfolio } from "@/components/providers/AdminProvider";
import Loading from "@/components/ui/Loading";

const AboutClient = () => {
  const { portfolioData, loading } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState(null);

  if (loading || !portfolioData?.about) return <Loading fullScreen />;

  const {
    name,
    designation,
    location,
    experience,
    availability,
    profileImage,
    socialLinks,
    professionalJourney,
    journey,
    education,
    certificates
  } = portfolioData.about;

  // common animation settings
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (customDelay) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: customDelay },
    }),
  };

  return (
    <>
      <section className="min-h-screen font-sans p-6 md:p-12 max-w-7xl mx-auto mt-20">
        {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
        {/* Left Card */}
        <motion.div
          className="bg-base-300 rounded-xl p-8 flex flex-col justify-center items-center md:items-start text-center md:text-left"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          custom={0} // delay 0s
        >
          <img
            src={profileImage || "https://i.ibb.co.com/rR6w9b10/image.jpg"}
            alt={name}
            className="w-40 h-40 rounded-full ring-4 ring-green-500 shadow-lg mb-6 object-cover"
          />
          <h2 className="text-3xl mb-2 font-bold">{name}</h2>
          <p className="text-spotify mb-4">{designation}</p>

          <div className="flex space-x-6 text-gray-400 mb-6 text-lg">
            <a
              href={socialLinks?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              <FaGithub />
            </a>
            <a
              href={socialLinks?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href={socialLinks?.email}
              className="hover:text-green-500 transition"
            >
              <FaEnvelope />
            </a>
            <a
              href={socialLinks?.whatsapp}
              className="hover:text-green-500 transition"
            >
              <FaWhatsapp />
            </a>
          </div>

          <ul className="space-y-3 mb-6">
            <li className="flex items-center space-x-3">
              <FaLocationArrow className="text-spotify" />
              <span>{location}</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaClock className="text-spotify" />
              <span>{experience}</span>
            </li>
            <li className="flex items-center space-x-3">
              <IoCheckmarkDoneCircle className="text-spotify" />
              <span>{availability}</span>
            </li>
          </ul>
        </motion.div>

        {/* Right Content - Professional Journey */}
        <div className="lg:col-span-2">
          <section className="bg-base-300 rounded-xl p-8 h-full">
            <h2 className="text-xl sm:text-3xl md:text-3xl pb-4 text-start border-b-1 border-b-green-500 font-extrabold mb-4">
              <span className="text-spotify">About</span> Me
            </h2>
            {(professionalJourney || []).map(({ heading, content }, i) => (
              <motion.div
                key={i}
                className="mb-6 last:mb-0"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                custom={i * 0.2 + 0.3} // stagger with delay
              >
                <h4 className="text-spotify font-semibold mb-1">{heading}</h4>
                <p className="leading-relaxed">{content}</p>
              </motion.div>
            ))}
            <p className="mt-6">
              <Link
                href="/projects"
                className="text-spotify hover:underline font-semibold"
              >
                Explore my projects →
              </Link>
            </p>
          </section>
        </div>
      </div>

      {/* Education Section */}
      <section className="bg-base-300 rounded-xl p-8 mb-16">
        <h2 className="text-xl sm:text-3xl md:text-3xl text-start border-b-1 pb-4 border-b-green-500 font-extrabold mb-8">
          <span className="text-spotify ">My </span>Education
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {(education || []).map((edu, index) => (
            <motion.div
              key={index}
              className="p-6 bg-base-100 rounded-xl space-y-3 transition"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              custom={index * 0.2 + 0.2}
            >
              <h3 className="font-bold text-xl">{edu.level}</h3>
              <p className="text-md text-gray-400">{edu.institution}</p>
              <span className="text-sm text-spotify block">{edu.year}</span>
              <p className="text-sm font-semibold">{edu.result}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certificates Section */}
      {certificates && certificates.length > 0 && (
        <section className="bg-base-300 rounded-xl p-8 mb-16">
          <h2 className="text-xl sm:text-3xl md:text-3xl text-start border-b-1 pb-4 border-b-green-500 font-extrabold mb-8">
            <span className="text-spotify ">My </span>Certificates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-base-100 rounded-xl overflow-hidden transition hover:shadow-lg ring-1 ring-base-100 hover:ring-green-500 flex flex-col"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                custom={index * 0.2 + 0.2}
              >
                <div 
                  className="h-48 overflow-hidden bg-base-200 cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  <img
                    src={cert.image || "https://via.placeholder.com/400x300?text=Certificate"}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2">{cert.title}</h3>
                  <p className="text-sm text-gray-400 mt-auto">{cert.institution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Full-width Journey Timeline */}
      <section className="bg-base-300 rounded-xl md:p-8 p-6 mb-16">
        <h2 className="text-xl sm:text-3xl md:text-3xl text-start border-b-1 pb-4 border-b-green-500 font-extrabold mb-4">
          <span className="text-spotify">My</span> Journey
        </h2>
        <ul className="space-y-8">
          {(journey || []).map(({ year, title, description, iconColor }, idx) => (
            <motion.li
              key={idx}
              className="flex items-start space-x-6"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              custom={idx * 0.2 + 0.1}
            >
              <div
                className={`${iconColor} flex-shrink-0 mt-1 text-2xl`}
                aria-hidden="true"
              >
                ●
              </div>
              <div>
                <p className="font-semibold text-lg">{title}</p>
                <span className="text-xs text-spotify block mb-1">{year}</span>
                <p className="leading-relaxed">{description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-base-100 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-base-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-200/50">
                <div>
                  <h3 className="font-bold text-xl">{selectedCert.title}</h3>
                  <p className="text-sm text-gray-400">{selectedCert.institution}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 hover:bg-base-300 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Image Container */}
              <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-base-300/30">
                <img
                  src={selectedCert.image || "https://via.placeholder.com/800x600?text=Certificate"}
                  alt={selectedCert.title}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutClient;
