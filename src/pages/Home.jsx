import React from "react";
import PageTransition from "../components/PageTransition";
import HeroSection from "../sections/HeroSection";
import CreativeMarquee from "../components/CreativeMarquee";
import FeaturedProjects from "../sections/FeaturedProjects";
import StatisticsSection from "../sections/StatisticsSection";
import ServicesPreview from "../sections/ServicesPreview";
import AboutPreview from "../sections/AboutPreview";
import CreativeProcess from "../sections/CreativeProcess";
import TestimonialsSection from "../sections/TestimonialsSection";
import FinalCTA from "../sections/FinalCTA";

export default function Home({ onPlayShowreel }) {
  return (
    <PageTransition>
      <div className="flex-grow flex flex-col">
        <HeroSection onPlayShowreel={onPlayShowreel} />
        <CreativeMarquee />
        <FeaturedProjects />
        <StatisticsSection />
        <ServicesPreview />
        <AboutPreview />
        <CreativeProcess />
        <TestimonialsSection />
        <FinalCTA />
      </div>
    </PageTransition>
  );
}
