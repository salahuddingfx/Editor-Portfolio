import React from "react";
import PageTransition from "../components/PageTransition";
import ServicesPreview from "../sections/ServicesPreview";
import PricingSection from "../sections/PricingSection";

export default function Services() {
  return (
    <PageTransition>
      <div className="w-full bg-[var(--bg)] pt-28 pb-32 flex-grow">
        <ServicesPreview />
        <PricingSection />
      </div>
    </PageTransition>
  );
}
