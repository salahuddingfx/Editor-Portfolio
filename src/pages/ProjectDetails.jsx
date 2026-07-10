import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Play, Eye, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import MagneticButton from "../components/MagneticButton";
import { projects } from "../data/projects";

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Find current, next, and previous projects
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  useEffect(() => {
    // Scroll to top on slug change
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="font-mono text-[10px] text-primary-accent uppercase tracking-widest mb-4">
            [ FILE NOT READABLE ]
          </div>
          <h1 className="font-space text-4xl md:text-6xl font-bold text-primary-text mb-4 uppercase">
            PROJECT NOT FOUND
          </h1>
          <Link to="/work">
            <MagneticButton className="px-6 py-2.5 bg-primary-accent hover:bg-accent-hover text-[#080808] font-inter text-xs font-bold tracking-widest uppercase transition-colors">
              BACK TO PORTFOLIO
            </MagneticButton>
          </Link>
        </div>
      </PageTransition>
    );
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  return (
    <PageTransition>
      <div className="w-full bg-[#080808] pt-28 pb-20 text-left">
        
        {/* Project Header Hero */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-6 pt-8 md:pt-12">
          {/* Breadcrumb back */}
          <Link 
            to="/work" 
            className="flex items-center gap-2 font-mono text-[10px] text-muted-text hover:text-primary-accent transition-colors uppercase w-fit"
          >
            <ArrowLeft size={10} />
            <span>BACK TO ARCHIVE</span>
          </Link>

          {/* Heading */}
          <div className="flex flex-col gap-2 max-w-4xl">
            <span className="font-mono text-xs text-primary-accent uppercase tracking-widest">
              {project.category} // {project.year}
            </span>
            <h1 className="font-space text-4xl md:text-7xl font-bold uppercase text-[#F5F3EE] tracking-tight leading-none">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Large Media Player Showcase */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 mt-8 md:mt-12">
          <div className="relative w-full aspect-video border border-default-border overflow-hidden bg-secondary-bg">
            <iframe
              src={project.finalVideo}
              title={`${project.title} Final Edit`}
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Project Metadata & Specifications Details */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Metadata list column (col-span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-8 bg-secondary-bg/50 border border-default-border p-8 h-fit">
            <h3 className="font-space text-sm font-bold uppercase text-primary-text tracking-wider border-b border-default-border pb-4">
              PROJECT SPECIFICATIONS
            </h3>
            
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest">CLIENT</span>
                <span className="font-inter text-sm text-primary-text font-medium">{project.client}</span>
              </div>
              
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest">SERVICE TYPE</span>
                <span className="font-inter text-sm text-primary-text font-medium">{project.service}</span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest">TIMELINE</span>
                <span className="font-inter text-sm text-primary-text font-medium">{project.timeline}</span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest">SOFTWARE UTILITIES</span>
                <span className="font-mono text-xs text-primary-accent tracking-wider font-semibold">
                  {project.tools.join(" / ")}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest">DELIVERABLE ASSETS</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.deliverables.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-[8px] tracking-wider font-bold bg-elevated-surface px-2 py-0.5 border border-default-border text-secondary-text"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Text summaries column (col-span 8) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            <div className="flex flex-col gap-3">
              <h3 className="font-space text-lg font-bold text-primary-text uppercase tracking-tight">
                01 / OVERVIEW
              </h3>
              <p className="font-inter text-sm md:text-base text-secondary-text leading-relaxed">
                {project.overview}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-space text-lg font-bold text-primary-text uppercase tracking-tight">
                02 / THE CHALLENGE
              </h3>
              <p className="font-inter text-sm md:text-base text-secondary-text leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-space text-lg font-bold text-primary-text uppercase tracking-tight">
                03 / THE GOAL
              </h3>
              <p className="font-inter text-sm md:text-base text-secondary-text leading-relaxed">
                {project.goal}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="flex flex-col gap-3">
                <h4 className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">
                  CREATIVE DIRECTION
                </h4>
                <p className="font-inter text-xs md:text-sm text-secondary-text leading-relaxed">
                  {project.creativeDirection}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">
                  CREATIVE PROCESS
                </h4>
                <p className="font-inter text-xs md:text-sm text-secondary-text leading-relaxed whitespace-pre-line">
                  {project.process}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Color Grading Comparison (Before and After Slider) */}
        {project.beforeImage && project.afterImage && (
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 mt-20 md:mt-28">
            <div className="flex flex-col gap-6 mb-8">
              <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">COLOR WORK</span>
              <h3 className="font-space text-2xl md:text-3xl font-bold uppercase text-primary-text tracking-tight">
                Before & After Grading Analysis
              </h3>
            </div>
            <BeforeAfterSlider 
              beforeImage={project.beforeImage} 
              afterImage={project.afterImage} 
            />
          </div>
        )}

        {/* Media / Design Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 mt-20 md:mt-28">
            <div className="flex flex-col gap-6 mb-8">
              <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">GALLERY DETAILS</span>
              <h3 className="font-space text-2xl md:text-3xl font-bold uppercase text-primary-text tracking-tight">
                Design Assets & Frames
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.gallery.map((imgUrl, idx) => (
                <div 
                  key={idx}
                  onClick={() => setFullscreenImage(imgUrl)}
                  className="relative group aspect-video cursor-zoom-in overflow-hidden border border-default-border bg-secondary-bg hover:border-primary-accent/40 transition-colors"
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} Asset Frame ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  {/* Hover indicator overlay */}
                  <div className="absolute inset-0 bg-[#080808]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-primary-accent text-[#080808] flex items-center justify-center">
                      <Maximize2 size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Metrics Panel */}
        {project.results && (
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 mt-20 md:mt-28">
            <div className="bg-[#111111] border border-default-border p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left flex flex-col gap-2">
                <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">CAMPAIGN IMPACT</span>
                <h3 className="font-space text-2xl md:text-3xl font-bold uppercase text-primary-text tracking-tight">
                  PROJECT METRICS & RESULTS
                </h3>
                <p className="font-inter text-sm text-secondary-text max-w-xl mt-1 leading-relaxed">
                  {project.results}
                </p>
              </div>
              <div className="flex flex-col gap-1 items-center bg-[#080808] border border-default-border/80 px-8 py-6 w-full md:w-auto">
                <span className="font-space text-4xl md:text-5xl font-bold text-primary-accent">100%</span>
                <span className="font-mono text-[9px] text-muted-text tracking-widest uppercase mt-1">CLIENT RETENTION</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Route Navigation (Looping links) */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 mt-28 md:mt-36 border-t border-default-border pt-12">
          <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 md:gap-0">
            
            {/* Prev project */}
            <Link 
              to={`/work/${prevProject.slug}`}
              className="flex-1 group flex flex-col gap-2 p-6 bg-[#111111]/40 hover:bg-[#111111] border border-default-border transition-all duration-300 text-left"
            >
              <span className="font-mono text-[9px] text-muted-text tracking-widest uppercase flex items-center gap-1 group-hover:text-primary-accent transition-colors">
                ← PREVIOUS CAMPAIGN
              </span>
              <span className="font-space text-lg font-bold uppercase text-primary-text group-hover:text-primary-accent transition-colors">
                {prevProject.title}
              </span>
            </Link>

            {/* Next project */}
            <Link 
              to={`/work/${nextProject.slug}`}
              className="flex-1 group flex flex-col gap-2 p-6 bg-[#111111]/40 hover:bg-[#111111] border border-default-border transition-all duration-300 md:border-l-0 text-right items-end"
            >
              <span className="font-mono text-[9px] text-muted-text tracking-widest uppercase flex items-center gap-1 group-hover:text-primary-accent transition-colors">
                NEXT CAMPAIGN →
              </span>
              <span className="font-space text-lg font-bold uppercase text-primary-text group-hover:text-primary-accent transition-colors">
                {nextProject.title}
              </span>
            </Link>

          </div>
        </div>

      </div>

      {/* Fullscreen Image Preview Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFullscreenImage(null)}
              className="absolute inset-0 bg-[#080808]/95 backdrop-blur-sm cursor-zoom-out"
            />
            {/* Image frame */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[90vh] overflow-hidden border border-default-border z-10"
            >
              <button
                onClick={() => setFullscreenImage(null)}
                className="absolute top-4 right-4 p-2 bg-[#080808]/80 hover:bg-primary-accent border border-default-border hover:border-primary-accent rounded-full text-primary-text hover:text-[#080808] transition-colors focus:outline-none"
              >
                <X size={16} />
              </button>
              <img 
                src={fullscreenImage} 
                alt="Fullscreen Preview Frame" 
                className="w-full h-full object-contain max-h-[85vh]"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
