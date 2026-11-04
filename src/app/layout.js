import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, themeInitScript } from "@/components/providers/ThemeProvider";
import { SITE_URL, SITE_NAME, AUTHOR_NAME } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${AUTHOR_NAME} | Full-Stack Web Developer Portfolio`,
    template: `%s | ${AUTHOR_NAME}`,
  },
  description:
    "Explore the portfolio of Md Muntasir Mahmud (Tonoy), a passionate Full-Stack Web Developer specializing in React, Next.js, Node.js, Express, and MongoDB. View featured projects, tech stack, and contact information.",
  keywords: [
    "Md Muntasir Mahmud",
    "Tonoy",
    "Full-Stack Developer",
    "Web Developer Portfolio",
    "React Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "Software Engineer Portfolio",
    "JavaScript Developer",
    "Bangladesh Web Developer",
  ],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${AUTHOR_NAME} | Full-Stack Web Developer`,
    description:
      "Explore my featured web development projects, custom services, tech stack, and professional journey.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${AUTHOR_NAME} Portfolio` }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
