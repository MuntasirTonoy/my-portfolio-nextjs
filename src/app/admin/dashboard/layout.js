"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import {
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiLayers,
  FiMessageSquare,
  FiLogOut,
  FiMenu,
  FiX,
  FiShield,
  FiFolder,
  FiSettings,
  FiStar,
} from "react-icons/fi";
import Link from "next/link";
import { useAdmin } from "@/components/providers/AdminProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import Switch from "@/components/ui/Switch";
import Button from "@/components/ui/Button";

const navLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <FiHome /> },
  { to: "/admin/dashboard/hero", label: "Hero Section", icon: <FiUser /> },
  { to: "/admin/dashboard/intro", label: "Introduction", icon: <FiLayers /> },
  { to: "/admin/dashboard/about", label: "About", icon: <FiUser /> },
  { to: "/admin/dashboard/skills", label: "Skills", icon: <FiCode /> },
  { to: "/admin/dashboard/services", label: "Services", icon: <FiBriefcase /> },
  { to: "/admin/dashboard/projects", label: "Projects", icon: <FiFolder /> },
  { to: "/admin/dashboard/contact", label: "Contact", icon: <FiMessageSquare /> },
  { to: "/admin/dashboard/reviews", label: "Reviews", icon: <FiStar /> },
  { to: "/admin/dashboard/settings", label: "Settings", icon: <FiSettings /> },
];

export default function AdminDashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { saveStatus } = useAdmin();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth guard
  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth !== "true") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-base-200 flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-base-100 border-r border-base-300 z-30 flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-base-300 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(2,182,119,0.2)" }}
          >
            <FiShield style={{ color: "#02b677" }} />
          </div>
          <div>
            <p className="font-bold text-sm">Admin Panel</p>
            <p className="text-xs text-base-content/40">Portfolio Manager</p>
          </div>
          <button
            className="ml-auto lg:hidden cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX className="text-base-content/50" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navLinks.map(({ to, label, icon }) => {
            // Match exact path for dashboard home, prefix path for others
            const isActive = to === "/admin/dashboard" 
              ? pathname === to 
              : pathname.startsWith(to);

            return (
              <Link
                key={to}
                href={to}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "text-white shadow-md font-bold"
                      : "text-base-content/60 hover:text-base-content hover:bg-base-200"
                  }
                `}
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg,#02b677,#00955f)",
                        boxShadow: "0 4px 15px rgba(2,182,119,0.3)",
                      }
                    : {}
                }
              >
                <span className="text-lg">{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Save status + Logout */}
        <div className="p-4 border-t border-base-300 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-base-100 border-b border-base-300 px-6 py-4 flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-base-200 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-base">Portfolio Dashboard</h1>
            <p className="text-xs text-base-content/40">
              Manage your portfolio content
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Switch theme={theme} toggleTheme={toggleTheme} />
            <Button onClick={() => window.open("/", "_blank")}>
              <span className="text-xs">View Site ↗</span>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
