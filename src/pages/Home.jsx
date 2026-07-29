import React from "react";
import PageTransition from "../components/PageTransition";
import HeroSection from "../sections/HeroSection";
import StatisticsSection from "../sections/StatisticsSection";
import FeaturedProjects from "../sections/FeaturedProjects";
import ServicesPreview from "../sections/ServicesPreview";
import PricingSection from "../sections/PricingSection";
import AboutPreview from "../sections/AboutPreview";
import TestimonialsSection from "../sections/TestimonialsSection";
import FinalCTA from "../sections/FinalCTA";

export default function Home({ onOpenModal }) {
  return (
    <PageTransition>
      <div className="flex-grow flex flex-col">
        <HeroSection />
        <StatisticsSection />
        <FeaturedProjects onOpenModal={onOpenModal} />
        <ServicesPreview />
        <PricingSection />
        <AboutPreview onOpenModal={onOpenModal} />
        <TestimonialsSection />
        <FinalCTA />
      </div>
    </PageTransition>
  );
}
