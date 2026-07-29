import React from "react";
import PageTransition from "../components/PageTransition";
import PricingSection from "../sections/PricingSection";
import FinalCTA from "../sections/FinalCTA";

export default function Pricing() {
  return (
    <PageTransition>
      <div className="w-full bg-[var(--bg)] pt-28 pb-32 flex-grow">
        <PricingSection />
        <FinalCTA />
      </div>
    </PageTransition>
  );
}
