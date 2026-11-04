import Link from "next/link";
import { AUTHOR_NAME } from "@/lib/site";

const Footer = () => (
  <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
    <aside>
      <p>
        Copyright © {new Date().getFullYear()} - All rights reserved by{" "}
        <Link href="/admin" prefetch={false} className="font-semibold">
          {AUTHOR_NAME}
        </Link>
      </p>
    </aside>
  </footer>
);

export default Footer;
