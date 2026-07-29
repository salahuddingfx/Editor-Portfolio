import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import VideoModal from "../components/VideoModal";
import { siteConfig } from "../config/siteConfig";

export default function Work() {
  const [filter, setFilter] = useState("all");
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const filteredPortfolio = siteConfig.portfolio.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <PageTransition>
      <div className="w-full bg-[var(--bg)] pt-28 pb-32 flex-grow">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-3 max-w-2xl border-b border-[var(--line)] pb-8">
            <span className="eyebrow">
              <span className="dot"></span> Archive &amp; Showcase
            </span>
            <h1 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold uppercase text-[var(--ink)] tracking-tight">
              Selected Work
            </h1>
            <p className="font-[var(--font-body)] text-sm text-[var(--ink-soft)] leading-relaxed">
              Explore visual edits, motion graphics, and high-retention content. Click any card to watch clips instantly.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs self-start">
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

          {/* Portfolio Grid Layout */}
          <div className="work-grid">
            {filteredPortfolio.map((item) => (
              <div
                className="work-card"
                key={item.id}
                onClick={() => setSelectedVideoId(item.id)}
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
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={Boolean(selectedVideoId)}
        onClose={() => setSelectedVideoId(null)}
        videoId={selectedVideoId}
      />
    </PageTransition>
  );
}
