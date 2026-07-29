import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";

export default function FeaturedProjects({ onOpenModal }) {
  const [filter, setFilter] = useState("all");

  const filteredPortfolio = siteConfig.portfolio.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <section className="section" id="work">
      <div className="section-head">
        <h2>
          <span className="spark">✦</span> Featured Works
        </h2>
        <div className="filter-tabs">
          <button
            className={`tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`tab ${filter === "short" ? "active" : ""}`}
            onClick={() => setFilter("short")}
          >
            Shorts
          </button>
          <button
            className={`tab ${filter === "long" ? "active" : ""}`}
            onClick={() => setFilter("long")}
          >
            Long-Form
          </button>
        </div>
      </div>

      <div className="work-grid">
        {filteredPortfolio.map((item) => (
          <div
            className="work-card"
            key={item.id}
            onClick={() => onOpenModal(item.id)}
          >
            <span className="work-tag">
              {item.type === "short" ? "Short" : "Long-Form"}
            </span>
            <img
              src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
              alt={item.title}
              loading="lazy"
            />
            <span className="work-play">►</span>
          </div>
        ))}
      </div>
    </section>
  );
}
