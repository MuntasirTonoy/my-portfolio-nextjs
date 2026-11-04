import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { PortfolioProvider } from "@/components/providers/PortfolioProvider";
import { getPortfolio } from "@/lib/portfolio";
import { SITE_URL, AUTHOR_NAME } from "@/lib/site";

function personJsonLd({ hero = {}, about = {}, contact = {} }) {
  const sameAs = [
    about.socialLinks?.github || contact.socialLinks?.github,
    about.socialLinks?.linkedin || contact.socialLinks?.linkedin,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: about.name || hero.name || AUTHOR_NAME,
    alternateName: "Tonoy",
    jobTitle: about.designation || "Full-Stack Web Developer",
    url: SITE_URL,
    ...(about.profileImage && { image: about.profileImage }),
    ...(about.location && { address: { "@type": "PostalAddress", addressLocality: about.location } }),
    ...(sameAs.length && { sameAs }),
  };
}

export default async function PublicLayout({ children }) {
  const portfolio = await getPortfolio();

  return (
    <PortfolioProvider data={portfolio}>
      <script
        type="application/ld+json"
        // Escape "<" so content from the database can't close the script tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd(portfolio)).replace(/</g, "\\u003c"),
        }}
      />
      <ScrollToTop />
      <Navbar resumeLink={portfolio.hero?.cvLink || portfolio.about?.socialLinks?.resume} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </PortfolioProvider>
  );
}
