import Image from "next/image";
import { OPTIMIZED_IMAGE_HOSTS } from "@/lib/images.mjs";

const canOptimize = (src) => {
  if (typeof src !== "string") return true; // static import
  if (src.startsWith("/")) return true; // local file
  try {
    const { hostname, pathname } = new URL(src);
    return OPTIMIZED_IMAGE_HOSTS.includes(hostname) && !pathname.endsWith(".svg");
  } catch {
    return false;
  }
};

/**
 * next/image for content that comes from the database. Images on known hosts
 * (Cloudinary, ImgBB) are resized and converted to modern formats; anything
 * else is passed through unoptimized so an unexpected host never breaks the page.
 */
export default function RemoteImage({ src, alt = "", ...props }) {
  if (!src) return null;
  return <Image src={src} alt={alt} unoptimized={!canOptimize(src)} {...props} />;
}
