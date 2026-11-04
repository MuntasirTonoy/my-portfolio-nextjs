import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import Skills from "@/components/sections/Skills";
import Service from "@/components/sections/Service";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Testimonials from "@/components/ui/Testimonial";
import HeroCodeSection from "@/components/ui/HeroCodeSection";
import { getPublishedReviews } from "@/lib/portfolio";

export const metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const reviews = await getPublishedReviews();

  return (
    <div className="space-y-40 my-10">
      <Hero />
      <Introduction />
      <Skills />
      <Service />
      <HeroCodeSection />
      <FeaturedProjects />
      <Testimonials reviews={reviews} />
    </div>
  );
}
