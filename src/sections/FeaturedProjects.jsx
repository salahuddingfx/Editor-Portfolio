import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import VideoModal from "../components/VideoModal";
import { projects } from "../data/projects";

export default function FeaturedProjects() {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  // Filter into separate landscape and vertical pools
  const landscapeProjects = projects.filter((p) => !p.isVertical).slice(0, 3);
  const verticalProjects = projects.filter((p) => p.isVertical).slice(0, 3);

  const handleQuickPlay = (project) => {
    const videoUrl = project.heroMedia || project.finalVideo || project.previewVideo;
    if (videoUrl) {
      setSelectedVideoUrl(videoUrl);
    }
  };

  return (
    <section className="w-full bg-[#080808] py-24 md:py-36 border-t border-white/5 relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-16 md:gap-24">
        
        {/* SECTION 1: Cinematic & Commercial Cuts (16:9 Landscape Grid) */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
                // CINEMATIC & COMMERCIAL
              </span>
              <h2 className="font-space text-3xl md:text-5xl font-bold uppercase text-primary-text tracking-tight">
                Featured Edits
              </h2>
            </div>
            <p className="font-inter text-xs md:text-sm text-secondary-text max-w-sm leading-relaxed">
              High-impact commercials, brand intros, and motion graphics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {landscapeProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onQuickPlay={handleQuickPlay}
              />
            ))}
          </div>
        </div>

        {/* SECTION 2: Dedicated Shorts & Vertical Reels Showcase (9:16 Portrait Grid) */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
                // HIGH-RETENTION SHORT-FORM
              </span>
              <h2 className="font-space text-3xl md:text-5xl font-bold uppercase text-primary-text tracking-tight">
                Reels & TikTok Cuts
              </h2>
            </div>
            <p className="font-inter text-xs md:text-sm text-secondary-text max-w-sm leading-relaxed">
              Vertical 9:16 cuts designed for maximum watch time, kinetic captions, and viral hooks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {verticalProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onQuickPlay={handleQuickPlay}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="flex justify-center pt-4">
          <Link 
            to="/work" 
            className="group inline-flex items-center gap-3 font-space text-xs md:text-sm font-bold tracking-widest text-primary-text hover:text-primary-accent px-8 py-4 rounded-full border border-white/10 hover:border-primary-accent/50 glass-card transition-all uppercase"
          >
            <span>Explore Complete Archive</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

      </div>

      {/* Instant Video Play Modal */}
      <VideoModal
        isOpen={Boolean(selectedVideoUrl)}
        onClose={() => setSelectedVideoUrl(null)}
        videoUrl={selectedVideoUrl || ""}
      />
    </section>
  );
}


