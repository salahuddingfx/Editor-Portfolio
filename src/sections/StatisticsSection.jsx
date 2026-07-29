import React from "react";
import { siteConfig } from "../config/siteConfig";

export default function StatisticsSection() {
  return (
    <section className="stats-bar">
      <div className="stats-inner">
        {siteConfig.stats.map((stat, idx) => (
          <div className="stat" key={idx}>
            <span className="stat-num">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
