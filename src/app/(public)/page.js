"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import Skills from "@/components/sections/Skills";
import Service from "@/components/sections/Service";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Testimonials from "@/components/ui/Testimonial";

export default function Home() {
  return (
    <div className="space-y-40 my-10">
      <Hero />
      <Introduction />
      <Skills />
      <Service />
      <FeaturedProjects />
      <Testimonials />
    </div>
  );
}
