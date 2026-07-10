import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

const FILTERS = [
  { label: "ALL", value: "ALL" },
  { label: "VIDEO EDITING", value: "Video Editing" },
  { label: "REELS & SHORTS", value: "Reels & Shorts" },
  { label: "YOUTUBE", value: "YouTube" },
  { label: "MOTION GRAPHICS", value: "Motion Graphics" },
  { label: "SOCIAL MEDIA DESIGN", value: "Social Media Design" },
  { label: "BRANDING", value: "Brand Identity" }
];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Filter project list
  const filteredProjects = activeFilter === "ALL"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <PageTransition>
      <div className="w-full bg-[#080808] pt-32 pb-20 flex-grow">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-12">
          
          {/* Header titles */}
          <div className="flex flex-col gap-3 max-w-2xl text-left">
            <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">
              PORTFOLIO
            </span>
            <h1 className="font-space text-4xl md:text-6xl font-bold uppercase text-[#F5F3EE] tracking-tight">
              Selected Work
            </h1>
            <p className="font-inter text-sm md:text-base text-secondary-text leading-relaxed">
              A comprehensive archive of video cuts, creative campaigns, motion panels, and identities. Filter by specialty to explore specific visual disciplines.
            </p>
          </div>

          {/* Filtering row */}
          <div className="flex flex-col gap-4 border-b border-default-border/60 pb-6">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {FILTERS.map((filter) => {
                const count = filter.value === "ALL"
                  ? projects.length
                  : projects.filter((p) => p.category === filter.value).length;

                // Don't render filter category if count is 0
                if (count === 0 && filter.value !== "ALL") return null;

                const isActive = activeFilter === filter.value;

                return (
                  <button
                    key={filter.label}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`font-inter text-[10px] md:text-xs font-semibold tracking-wider px-4 py-2 border transition-all duration-300 flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-primary-accent ${
                      isActive 
                        ? "bg-primary-accent border-primary-accent text-[#080808]" 
                        : "border-default-border text-secondary-text hover:text-primary-text hover:border-secondary-text"
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className={`font-mono text-[9px] ${isActive ? "text-[#080808]/75" : "text-muted-text"}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Portfolio Masonry-inspired Asymmetric Grid */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start"
                >
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.45 }}
                      className="w-full"
                    >
                      <ProjectCard project={project} className="aspect-video" />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-default-border p-8">
                  <span className="font-mono text-[10px] text-muted-text uppercase tracking-widest mb-2">
                    [ EMPTY CONTAINER ]
                  </span>
                  <h3 className="font-space text-lg font-bold text-secondary-text uppercase">
                    No Matching Clips Found
                  </h3>
                  <p className="font-inter text-xs text-muted-text max-w-xs mt-1 leading-relaxed">
                    Try switching filters or resetting category choices to explore other selections.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
