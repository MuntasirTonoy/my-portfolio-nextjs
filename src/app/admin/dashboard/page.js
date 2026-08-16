"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiUser, FiCode, FiBriefcase, FiFolder, FiMessageSquare, FiArrowRight, FiGlobe, FiLayers, FiStar } from "react-icons/fi";
import { useAdmin } from "@/components/providers/AdminProvider";
import Skeleton from "@/components/ui/Skeleton";

const sections = [
  { to: "/admin/dashboard/hero", label: "Hero Section", icon: <FiUser />, desc: "Name, greeting, CTA buttons, bio text", color: "#02b677" },
  { to: "/admin/dashboard/intro", label: "Introduction", icon: <FiLayers />, desc: "Main introduction text and story", color: "#3b82f6" },
  { to: "/admin/dashboard/about", label: "About Page", icon: <FiUser />, desc: "Profile photo, bio, education, journey", color: "#4f46e5" },
  { to: "/admin/dashboard/skills", label: "Skills / Tech Stack", icon: <FiCode />, desc: "Add, remove, reorder skill categories", color: "#f59e0b" },
  { to: "/admin/dashboard/services", label: "Services", icon: <FiBriefcase />, desc: "Service cards title and descriptions", color: "#ec4899" },
  { to: "/admin/dashboard/projects", label: "Projects", icon: <FiFolder />, desc: "Add/edit projects, set featured status", color: "#8b5cf6" },
  { to: "/admin/dashboard/contact", label: "Contact Info", icon: <FiMessageSquare />, desc: "Email, phone, location details", color: "#06b6d4" },
  { to: "/admin/dashboard/reviews", label: "Testimonials", icon: <FiStar />, desc: "Approve, unpublish, or delete reviews", color: "#10b981" },
];

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } }),
};

const AdminDashboardHome = () => {
  const { portfolioData, saveStatus, loading } = useAdmin();

  if (loading || !portfolioData?.hero) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-40 w-full" rounded="rounded-2xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 flex items-center gap-4"
        style={{ background: "linear-gradient(135deg, rgba(2,182,119,0.12), rgba(79,70,229,0.08))", border: "1px solid rgba(2,182,119,0.2)" }}
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(2,182,119,0.2)", color: "#02b677" }}>
          <FiGlobe />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-extrabold">Welcome back, Admin 👋</h2>
          <p className="text-sm text-base-content/50 mt-0.5">
            Managing portfolio for <span className="text-[#02b677] font-semibold">{portfolioData.hero?.name || "User"}</span>
            {" · "}
            <a href="/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#02b677] transition-colors">View live site ↗</a>
          </p>
        </div>
        {saveStatus && (
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${saveStatus === "saved" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
            {saveStatus === "saving" ? "Saving..." : "✓ Saved"}
          </span>
        )}
      </motion.div>

      {/* Section cards */}
      <div>
        <h3 className="text-sm font-semibold text-base-content/50 uppercase tracking-widest mb-4">Edit Sections</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {sections.map(({ to, label, icon, desc, color }, i) => (
            <motion.div key={to} custom={i} variants={card} initial="hidden" animate="visible">
              <Link href={to} className="group block bg-base-100 rounded-2xl p-5 border border-base-300 hover:border-transparent transition-all duration-300 hover:shadow-xl"
                style={{ "--hover-color": color }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 8px 30px ${color}25`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = ""; }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${color}20`, color }}>
                    {icon}
                  </div>
                  <FiArrowRight className="text-base-content/20 group-hover:text-base-content/60 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-bold mb-1">{label}</h4>
                <p className="text-xs text-base-content/50 leading-relaxed">{desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick info */}
      <div className="bg-base-100 rounded-2xl p-5 border border-base-300">
        <h3 className="font-bold mb-3 text-sm">Quick Info</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "Name", value: portfolioData.hero?.name },
            { label: "Location", value: portfolioData.about?.location },
            { label: "Skills", value: (portfolioData.skills?.reduce((a, c) => a + (c.items?.length || 0), 0) || 0) + " items" },
            { label: "Services", value: (portfolioData.services?.items?.length || 0) + " cards" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-base-200 rounded-xl p-3">
              <p className="text-xs text-base-content/40 mb-1">{label}</p>
              <p className="font-bold text-sm">{value || "N/A"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
