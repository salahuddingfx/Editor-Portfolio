import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowUpRight } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { getDriveEmbedUrl, getDriveImageUrl, isGoogleDriveLink } from "../utils/driveUtils";

export default function ProjectCard({ project, onQuickPlay, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isDesktop && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay block: ", err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isDesktop && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const getAspectClass = () => {
    if (project.aspectRatio) return project.aspectRatio;
    if (project.isVertical || project.category === "Reels & Shorts") {
      return "aspect-[9/16] max-h-[340px] md:max-h-[380px] w-full mx-auto";
    }
    switch (project.category) {
      case "Brand Identity":
      case "Graphic Design":
        return "aspect-[4/3]";
      case "Social Media Design":
        return "aspect-square";
      case "Video Editing":
      case "YouTube":
      case "Motion Graphics":
      default:
        return "aspect-video";
    }
  };

  const handlePlayClick = (e) => {
    if (onQuickPlay) {
      e.preventDefault();
      e.stopPropagation();
      onQuickPlay(project);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group flex flex-col gap-4 w-full glass-card p-4 md:p-5 rounded-2xl glass-card-hover ${className}`}
    >
      {/* 1. Un-obscured Media Thumbnail Box */}
      <div className={`relative w-full overflow-hidden rounded-xl bg-[#080808] border border-white/5 ${getAspectClass()}`}>
        
        {/* Main Thumbnail Image */}
        <img
          src={getDriveImageUrl(project.thumbnail)}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Hover preview video */}
        {isDesktop && project.previewVideo && (
          isGoogleDriveLink(project.previewVideo) ? (
            <iframe
              src={`${getDriveEmbedUrl(project.previewVideo)}?autoplay=1&mute=1&controls=0&loop=1`}
              title={`${project.title} Preview`}
              className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 border-none ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              allow="autoplay; encrypted-media"
            />
          ) : (
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
          )
        )}

        {/* Subtle Dark Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges (Category & Year) */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none z-10">
          <span className="font-mono text-[9px] uppercase tracking-wider text-primary-accent bg-[#080808]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {project.category}
          </span>
          <span className="font-mono text-[9px] text-secondary-text bg-[#080808]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {project.year}
          </span>
        </div>

        {/* Floating Quick Play Badge Button Center */}
        {onQuickPlay && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <button
              onClick={handlePlayClick}
              className="flex items-center gap-2 px-4 py-2 bg-primary-accent text-[#080808] font-space text-xs font-bold rounded-full shadow-xl hover:scale-105 transition-transform cursor-pointer"
            >
              <Play size={14} className="fill-[#080808]" />
              <span>QUICK PLAY</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Clean Metadata Section Below Thumbnail */}
      <div className="flex flex-col gap-2.5 pt-1 px-1">
        <div className="flex justify-between items-start gap-4">
          <Link to={`/work/${project.slug}`} className="group/title">
            <h3 className="font-space text-base md:text-lg font-bold text-primary-text group-hover/title:text-primary-accent transition-colors leading-tight">
              {project.title}
            </h3>
          </Link>

          <Link
            to={`/work/${project.slug}`}
            className="w-8 h-8 rounded-full border border-white/10 bg-[#18181b]/80 flex items-center justify-center text-secondary-text group-hover:border-primary-accent group-hover:bg-primary-accent group-hover:text-[#080808] transition-all duration-300 flex-shrink-0"
            aria-label={`View ${project.title}`}
          >
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Minimal Client & Tools Info */}
        <div className="flex items-center justify-between text-xs text-muted-text font-mono border-t border-white/5 pt-2 mt-1">
          <span className="truncate max-w-[180px] text-secondary-text">
            {project.client}
          </span>
          <span className="text-[10px] text-primary-accent/80 bg-primary-accent/10 px-2 py-0.5 rounded">
            {project.tools.slice(0, 2).join(" • ")}
          </span>
        </div>
      </div>
    </div>
  );
}

