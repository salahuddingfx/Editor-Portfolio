import React from "react";
import AnimatedCounter from "../components/AnimatedCounter";
import { siteConfig } from "../config/siteConfig";

export default function StatisticsSection() {
  return (
    <section className="w-full bg-[#111111] py-16 md:py-24 border-y border-default-border/60 relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {siteConfig.stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex flex-col gap-2 items-center text-center p-4 bg-secondary-bg hover:bg-elevated-surface border border-default-border/40 hover:border-primary-accent/20 transition-all duration-300 group"
            >
              {/* Count display (Space Grotesk) */}
              <div className="font-space text-4xl md:text-6xl font-bold text-primary-text group-hover:text-primary-accent transition-colors duration-300">
                <AnimatedCounter value={stat.value} duration={1.5} />
              </div>
              
              {/* Separator block */}
              <div className="w-6 h-[1px] bg-default-border group-hover:w-12 group-hover:bg-primary-accent transition-all duration-300" />
              
              {/* Label metadata (JetBrains Mono) */}
              <span className="font-mono text-[9px] md:text-[10px] text-muted-text uppercase tracking-widest leading-relaxed">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
