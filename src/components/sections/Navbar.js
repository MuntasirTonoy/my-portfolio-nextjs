"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiDownload } from "react-icons/fi";
import whiteLogo from "@/assets/logo/white-logo.png";
import blackLogo from "@/assets/logo/black-logo.png";
import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import { useTheme } from "@/components/providers/ThemeProvider";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const FALLBACK_RESUME =
  "https://drive.google.com/uc?export=download&id=1S7hX9xfMWYdf6S6A-IeB4MwEugaRTraG";

function NavLinks({ pathname }) {
  return NAV_ITEMS.map(({ name, path }) => (
    <li key={path}>
      <Link
        href={path}
        aria-current={pathname === path ? "page" : undefined}
        className={pathname === path ? "active" : ""}
      >
        {name}
      </Link>
    </li>
  ));
}

const Navbar = ({ resumeLink = FALLBACK_RESUME }) => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar bg-transparent backdrop-blur-2xl shadow-xs fixed z-50 top-0 w-full lg:px-10">
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <button type="button" tabIndex={0} aria-label="Open menu" className="btn btn-ghost lg:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 max-w-[80vw] z-50"
          >
            <NavLinks pathname={pathname} />
          </ul>
        </div>

        {/* Both logos are rendered and CSS picks one, so there's no flash before hydration. */}
        <Link className="ml-2" href="/" aria-label="Home">
          <Image src={blackLogo} alt="" className="h-8 w-auto object-contain dark:hidden" priority />
          <Image src={whiteLogo} alt="" className="h-8 w-auto object-contain hidden dark:block" priority />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLinks pathname={pathname} />
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <div className="hidden md:block">
          <Button href={resumeLink} external>
            Resume <FiDownload />
          </Button>
        </div>
        <Switch theme={theme} toggleTheme={toggleTheme} />
      </div>
    </nav>
  );
};

export default Navbar;
