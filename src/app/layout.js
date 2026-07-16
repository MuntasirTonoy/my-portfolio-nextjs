import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AdminProvider } from "@/components/providers/AdminProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://muntasir-mahmud.web.app"),
  title: "Md Muntasir Mahmud (Tonoy) | Full-Stack Web Developer Portfolio",
  description: "Explore the portfolio of Md Muntasir Mahmud (Tonoy), a passionate Full-Stack Web Developer specializing in React, Next.js, Node.js, Express, and MongoDB. View featured projects, tech stack, and contact information.",
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
    "Bangladesh Web Developer"
  ],
  authors: [{ name: "Md Muntasir Mahmud (Tonoy)" }],
  creator: "Md Muntasir Mahmud (Tonoy)",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Md Muntasir Mahmud (Tonoy) | Full-Stack Web Developer",
    description: "Explore my featured web development projects, custom services, tech stack, and professional journey.",
    url: "https://muntasir-mahmud.web.app",
    siteName: "Md Muntasir Mahmud Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Md Muntasir Mahmud (Tonoy) Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <AdminProvider>
            <ThemeProvider>
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </AdminProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
