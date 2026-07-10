import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function ProjectCard({ project, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isDesktop && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay block by browser policies: ", err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isDesktop && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset playhead
    }
  };

  const getAspectClass = () => {
    if (project.aspectRatio) return project.aspectRatio;
    switch (project.category) {
      case "Reels & Shorts":
        return "aspect-[9/16] max-w-[320px] mx-auto";
      case "Brand Identity":
      case "Graphic Design":
        return "aspect-[3/4]";
      case "Social Media Design":
        return "aspect-square";
      case "Video Editing":
      case "YouTube":
      case "Motion Graphics":
      default:
        return "aspect-video";
    }
  };

  const cursorLabel = project.category === "Video Editing" || project.category === "Reels & Shorts" || project.category === "YouTube" ? "PLAY" : "VIEW";

  return (
    <Link
      to={`/work/${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={cursorLabel}
      className={`group block relative w-full overflow-hidden bg-[#111111] border border-default-border hover:border-primary-accent/40 transition-colors duration-500 ${className}`}
    >
      {/* Visual media wrapper */}
      <div className={`relative w-full overflow-hidden ${getAspectClass()}`}>
        
        {/* Placeholder image (lazy loaded) */}
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Hover preview video (loops, muted) */}
        {isDesktop && project.previewVideo && (
          <video
            ref={videoRef}
            src={project.previewVideo}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        )}

        {/* Darkening tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500" />

        {/* Floating Top Info Code (JetBrains Mono) */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
          <span className="font-mono text-[10px] text-muted-text bg-[#080808]/60 px-2 py-0.5 backdrop-blur-sm border border-default-border/40">
            {project.id}
          </span>
          <span className="font-mono text-[10px] text-muted-text bg-[#080808]/60 px-2 py-0.5 backdrop-blur-sm border border-default-border/40">
            {project.year}
          </span>
        </div>

        {/* Floating Bottom Project Metadata */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 pointer-events-none z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-end">
            <h3 className="font-space text-sm md:text-lg font-bold text-primary-text uppercase tracking-tight">
              {project.title}
            </h3>
            
            {/* Animated Diagonal Arrow */}
            <div className="w-8 h-8 rounded-full border border-default-border bg-[#080808]/80 flex items-center justify-center text-primary-text group-hover:bg-primary-accent group-hover:border-primary-accent group-hover:text-[#080808] transition-all duration-300 transform group-hover:rotate-45">
              <ArrowUpRight size={14} />
            </div>
          </div>

          {/* Tools & Category row */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-primary-accent">
              {project.category}
            </span>
            <span className="text-muted-text text-[9px] font-mono">•</span>
            <span className="font-mono text-[9px] text-secondary-text uppercase tracking-widest">
              {project.tools.slice(0, 2).join(" / ")}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
