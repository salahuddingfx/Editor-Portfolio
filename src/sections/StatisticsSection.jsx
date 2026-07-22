import React from "react";
import AnimatedCounter from "../components/AnimatedCounter";
import { siteConfig } from "../config/siteConfig";

export default function StatisticsSection() {
  return (
    <section className="w-full bg-[#080808] py-20 md:py-28 border-y border-white/5 relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {siteConfig.stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="glass-card glass-card-hover p-6 md:p-8 rounded-2xl flex flex-col gap-3 items-center text-center group"
            >
              <div className="font-space text-4xl md:text-5xl lg:text-6xl font-bold text-primary-text group-hover:text-primary-accent transition-colors">
                <AnimatedCounter value={stat.value} duration={1.5} />
              </div>
              
              <div className="w-8 h-[2px] bg-primary-accent/40 group-hover:w-12 group-hover:bg-primary-accent transition-all" />
              
              <span className="font-mono text-xs text-muted-text uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

