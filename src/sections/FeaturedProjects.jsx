import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { FolderCheck, ExternalLink, Play } from "lucide-react";

export default function FeaturedProjects({ onOpenModal }) {
  const [filter, setFilter] = useState("all");

  const filteredPortfolio = siteConfig.portfolio.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <section className="section" id="work">
      <div className="section-head flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2>
            <span className="spark">✦</span> Featured Works
          </h2>
          <p className="text-sm text-[var(--ink-soft)] mt-1">
            Curated cinematic edits, motion graphics, and high-retention cuts by Tasnimul Rahat
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
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

          <a
            href={siteConfig.driveFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--ink)] text-[#EBE7E0] hover:bg-[var(--accent)] hover:text-[#0B0B0B] text-xs font-mono font-bold uppercase rounded-full transition-all duration-300 shadow-sm"
          >
            <FolderCheck size={14} />
            <span>Open Google Drive</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="work-grid">
        {filteredPortfolio.map((item) => (
          <div
            className="work-card group relative cursor-pointer overflow-hidden rounded-2xl border border-black/10 bg-black/5"
            key={item.id}
            onClick={() => {
              if (item.id) {
                onOpenModal(item.id);
              } else {
                window.open(siteConfig.driveFolderUrl, "_blank");
              }
            }}
          >
            <span className="work-tag absolute top-3 left-3 z-10 px-3 py-1 bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-full">
              {item.type === "short" ? "Short Reel" : "Long-Form"}
            </span>

            <img
              src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-5">
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-white tracking-tight leading-snug group-hover:text-[var(--accent)] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-white/70 font-mono mt-0.5 flex items-center gap-1">
                <span>EditHub Creations</span>
                <span>•</span>
                <span>Tasnimul Rahat</span>
              </p>
            </div>

            <div className="work-play absolute inset-0 m-auto w-12 h-12 rounded-full bg-[var(--accent)] text-[#0B0B0B] flex items-center justify-center shadow-lg transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
              <Play size={20} fill="currentColor" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
