import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import VideoModal from "../components/VideoModal";
import { projects } from "../data/projects";

export default function FeaturedProjects() {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  // Featured projects
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  const handleQuickPlay = (project) => {
    const videoUrl = project.heroMedia || project.finalVideo || project.previewVideo;
    if (videoUrl) {
      setSelectedVideoUrl(videoUrl);
    }
  };

  return (
    <section className="w-full bg-[#080808] py-24 md:py-36 border-t border-white/5 relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-14 md:gap-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
              // SELECTED WORK
            </span>
            <h2 className="font-space text-3xl md:text-5xl font-bold uppercase text-primary-text tracking-tight">
              Featured Cuts
            </h2>
          </div>
          <p className="font-inter text-xs md:text-sm text-secondary-text max-w-sm leading-relaxed">
            High-impact edits, motion graphics, and creative direction crafted for top brands and creators.
          </p>
        </div>

        {/* Grid Container with Spacious Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-14 items-start">
          {featured.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onQuickPlay={handleQuickPlay}
            />
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="flex justify-center pt-6">
          <Link 
            to="/work" 
            className="group inline-flex items-center gap-3 font-space text-xs md:text-sm font-bold tracking-widest text-primary-text hover:text-primary-accent px-6 py-3 rounded-full border border-white/10 hover:border-primary-accent/50 glass-card transition-all uppercase"
          >
            <span>Explore All Projects</span>
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

