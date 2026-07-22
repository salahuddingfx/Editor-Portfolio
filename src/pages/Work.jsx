import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import ProjectCard from "../components/ProjectCard";
import VideoModal from "../components/VideoModal";
import { projects } from "../data/projects";

const FILTERS = [
  { label: "ALL WORK", value: "ALL" },
  { label: "VIDEO EDITING", value: "Video Editing" },
  { label: "REELS & SHORTS", value: "Reels & Shorts" },
  { label: "YOUTUBE", value: "YouTube" },
  { label: "MOTION GRAPHICS", value: "Motion Graphics" },
  { label: "SOCIAL MEDIA DESIGN", value: "Social Media Design" },
  { label: "BRANDING", value: "Brand Identity" }
];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  // Filter project list
  const filteredProjects = activeFilter === "ALL"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleQuickPlay = (project) => {
    const videoUrl = project.heroMedia || project.finalVideo || project.previewVideo;
    if (videoUrl) {
      setSelectedVideoUrl(videoUrl);
    }
  };

  return (
    <PageTransition>
      <div className="w-full bg-[#080808] pt-32 pb-32 flex-grow">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-12 md:gap-16">
          
          {/* Minimal Header */}
          <div className="flex flex-col gap-3 max-w-2xl text-left border-b border-white/5 pb-8">
            <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
              // ARCHIVE & SHOWCASE
            </span>
            <h1 className="font-space text-4xl md:text-6xl font-bold uppercase text-primary-text tracking-tight">
              Selected Work
            </h1>
            <p className="font-inter text-xs md:text-sm text-secondary-text leading-relaxed">
              Explore visual edits, motion graphics, and high-retention vertical content. Click Quick Play to watch cuts instantly.
            </p>
          </div>

          {/* Minimal Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 md:gap-3">
            {FILTERS.map((filter) => {
              const count = filter.value === "ALL"
                ? projects.length
                : projects.filter((p) => p.category === filter.value).length;

              if (count === 0 && filter.value !== "ALL") return null;

              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.label}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`font-space text-xs font-semibold tracking-wider px-5 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive 
                      ? "bg-primary-accent border-primary-accent text-[#080808] shadow-lg shadow-primary-accent/20" 
                      : "bg-[#121214]/60 border-white/10 text-secondary-text hover:text-primary-text hover:border-white/20"
                  }`}
                >
                  <span>{filter.label}</span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-[#080808]/20 text-[#080808]" : "bg-white/5 text-muted-text"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Portfolio Grid Layout */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                activeFilter === "ALL" ? (
                  <div className="flex flex-col gap-16 md:gap-24">
                    {/* 1. Cinematic & Landscape Work Section */}
                    <div className="flex flex-col gap-8">
                      <div className="border-b border-white/5 pb-4">
                        <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
                          // CINEMATIC & COMMERCIAL CUTS
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 items-start">
                        {filteredProjects.filter(p => !p.isVertical).map((project) => (
                          <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.35 }}
                            className="w-full"
                          >
                            <ProjectCard project={project} onQuickPlay={handleQuickPlay} />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* 2. Vertical Reels & Shorts Section */}
                    <div className="flex flex-col gap-8">
                      <div className="border-b border-white/5 pb-4">
                        <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
                          // SHORT-FORM, REELS & TIKTOK
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 items-start">
                        {filteredProjects.filter(p => p.isVertical).map((project) => (
                          <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.35 }}
                            className="w-full"
                          >
                            <ProjectCard project={project} onQuickPlay={handleQuickPlay} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 items-start"
                  >
                    {filteredProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35 }}
                        className="w-full"
                      >
                        <ProjectCard project={project} onQuickPlay={handleQuickPlay} />
                      </motion.div>
                    ))}
                  </motion.div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-2xl p-12">
                  <span className="font-mono text-xs text-muted-text uppercase tracking-widest mb-2">
                    [ NO CLIPS FOUND ]
                  </span>
                  <h3 className="font-space text-lg font-bold text-secondary-text uppercase">
                    No Matching Projects
                  </h3>
                  <p className="font-inter text-xs text-muted-text max-w-xs mt-1">
                    Try selecting another category above.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Instant Video Play Modal */}
      <VideoModal
        isOpen={Boolean(selectedVideoUrl)}
        onClose={() => setSelectedVideoUrl(null)}
        videoUrl={selectedVideoUrl || ""}
      />
    </PageTransition>
  );
}

