import React from "react";
import AnimatedCounter from "../components/AnimatedCounter";
import { siteConfig } from "../config/siteConfig";

export default function StatisticsSection() {
  return (
    <section className="stats-bar">
      <div className="stats-inner">
        {siteConfig.stats.map((stat, idx) => (
          <div className="stat" key={idx}>
            <span className="stat-num">
              <AnimatedCounter value={stat.value} duration={2} />
            </span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
