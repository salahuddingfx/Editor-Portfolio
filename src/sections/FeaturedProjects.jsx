import React from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function FeaturedProjects() {
  // Get only featured projects
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="w-full bg-[#080808] py-20 md:py-32 border-t border-default-border/60">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-12 md:gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">
              SELECTED WORKS
            </span>
            <h2 className="font-space text-3xl md:text-5xl font-bold uppercase text-[#F5F3EE]">
              Stories Beyond Frames
            </h2>
          </div>
          <p className="font-inter text-xs md:text-sm text-secondary-text max-w-sm leading-relaxed">
            A curated showcase of video editing, motion design, and branding projects crafted for high-impact visual campaigns.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="flex flex-col gap-10 md:gap-16">
          
          {/* Item 01: Full-width Landscape */}
          {featured[0] && (
            <div className="w-full">
              <ProjectCard 
                project={featured[0]} 
                className="aspect-video md:aspect-[21/9]" 
              />
            </div>
          )}

          {/* Items 02 & 03: Two-Column Side-by-Side Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {featured[1] && (
              <ProjectCard 
                project={featured[1]} 
                className="aspect-video md:aspect-[4/3]" 
              />
            )}
            {featured[2] && (
              <ProjectCard 
                project={featured[2]} 
                className="aspect-video md:aspect-[4/3]" 
              />
            )}
          </div>

          {/* Item 04: Full-width Landscape */}
          {featured[3] && (
            <div className="w-full">
              <ProjectCard 
                project={featured[3]} 
                className="aspect-video md:aspect-[21/9]" 
              />
            </div>
          )}

        </div>

        {/* Bottom Callout link */}
        <div className="flex justify-center mt-6">
          <Link 
            to="/work" 
            className="font-mono text-xs tracking-widest text-[#F5F3EE] hover:text-primary-accent border-b border-[#F5F3EE] hover:border-primary-accent pb-1 transition-colors uppercase"
          >
            VIEW ALL SELECTED WORK [→]
          </Link>
        </div>

      </div>
    </section>
  );
}
