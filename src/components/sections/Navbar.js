"use client";

import React, { useState } from "react";
import whiteLogo from "@/assets/logo/white-logo.png";
import blackLogo from "@/assets/logo/black-logo.png";
import { FiDownload } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "about", path: "/about" },
    { name: "projects", path: "/projects" },
    { name: "contact", path: "/contact" },
  ];

  return (
    <div
      className={`navbar bg-transparent backdrop-blur-2xl shadow-xs fixed z-50 top-0 w-full lg:px-10 transition-transform duration-300`}
    >
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 max-w-[80vw] z-50"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`capitalize cursor-pointer ${isActive ? "active" : ""}`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logo */}
        <Link className="ml-2 cursor-pointer" href="/">
          <Image
            src={theme === "light" ? blackLogo : whiteLogo}
            alt="home logo"
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* Desktop nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`capitalize cursor-pointer ${isActive ? "active" : ""}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Theme Toggle */}
      <div className="navbar-end gap-2">
        <div className="hidden md:block">
          <a href="https://drive.google.com/uc?export=download&id=1S7hX9xfMWYdf6S6A-IeB4MwEugaRTraG">
            <Button>
              <span className="flex items-center gap-2">
                Resume <FiDownload />
              </span>
            </Button>
          </a>
        </div>

        <Switch theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};

export default Navbar;
