import React from "react";
import PageTransition from "../components/PageTransition";
import HeroSection from "../sections/HeroSection";
import FeaturedProjects from "../sections/FeaturedProjects";
import AboutPreview from "../sections/AboutPreview";
import StatisticsSection from "../sections/StatisticsSection";
import ServicesPreview from "../sections/ServicesPreview";
import PricingSection from "../sections/PricingSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import FinalCTA from "../sections/FinalCTA";
import { siteConfig } from "../config/siteConfig";

export default function Home({ onOpenModal }) {
  const showreelId = siteConfig.aboutVideoId || "0fzcFPkl_18";

  return (
    <PageTransition>
      <div className="flex-grow flex flex-col">
        <HeroSection onPlayShowreel={() => onOpenModal(showreelId)} />
        <FeaturedProjects onOpenModal={onOpenModal} />
        <AboutPreview onOpenModal={onOpenModal} />
        <StatisticsSection />
        <ServicesPreview />
        <PricingSection />
        <TestimonialsSection />
        <FinalCTA />
      </div>
    </PageTransition>
  );
}
