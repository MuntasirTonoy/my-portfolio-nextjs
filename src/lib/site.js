// Single source of truth for the public site URL.
// Set NEXT_PUBLIC_SITE_URL in your environment to your real domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://muntasir-mahmud.web.app"
).replace(/\/$/, "");

export const SITE_NAME = "Md Muntasir Mahmud Portfolio";
export const AUTHOR_NAME = "Md Muntasir Mahmud (Tonoy)";
