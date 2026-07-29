import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import { projects } from "../data/projects";
import { getDriveEmbedUrl, getDriveImageUrl } from "../utils/driveUtils";

export default function ProjectDetails() {
  const { slug } = useParams();
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="eyebrow mb-4">
            <span className="dot"></span> FILE NOT FOUND
          </div>
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-[var(--ink)] mb-6 uppercase">
            PROJECT NOT FOUND
          </h1>
          <Link to="/work" className="btn btn-accent">
            BACK TO PORTFOLIO
          </Link>
        </div>
      </PageTransition>
    );
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  return (
    <PageTransition>
      <div className="w-full bg-[var(--bg)] pt-28 pb-20 text-left">
        {/* Project Header Hero */}
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col gap-6 pt-6">
          <Link
            to="/work"
            className="flex items-center gap-2 font-mono text-xs text-[var(--muted)] hover:text-[var(--accent-deep)] transition-colors uppercase w-fit"
          >
            <ArrowLeft size={14} />
            <span>BACK TO ARCHIVE</span>
          </Link>

          <div className="flex flex-col gap-2 max-w-4xl">
            <span className="eyebrow">
              <span className="dot"></span> {project.category} // {project.year}
            </span>
            <h1 className="font-[var(--font-display)] text-4xl md:text-6xl font-bold uppercase text-[var(--ink)] tracking-tight leading-none">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Media Player Showcase */}
        <div className="max-w-[1240px] mx-auto px-6 mt-8">
          <div className="relative w-full aspect-video border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface-2)] shadow-[var(--shadow)]">
            <iframe
              src={getDriveEmbedUrl(project.finalVideo)}
              title={`${project.title} Final Edit`}
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Metadata & Description */}
        <div className="max-w-[1240px] mx-auto px-6 mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 flex flex-col gap-6 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-lg)] p-6 md:p-8 h-fit shadow-sm">
            <h3 className="font-[var(--font-display)] text-sm font-bold uppercase text-[var(--ink)] tracking-wider border-b border-[var(--line)] pb-4">
              PROJECT SPECIFICATIONS
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">CLIENT</span>
                <span className="font-inter text-sm text-[var(--ink)] font-medium">{project.client}</span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">SERVICE TYPE</span>
                <span className="font-inter text-sm text-[var(--ink)] font-medium">{project.service}</span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">TIMELINE</span>
                <span className="font-inter text-sm text-[var(--ink)] font-medium">{project.timeline}</span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">SOFTWARE UTILITIES</span>
                <span className="font-mono text-xs text-[var(--accent-deep)] tracking-wider font-semibold">
                  {project.tools.join(" / ")}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--ink)] uppercase">
                01 / OVERVIEW
              </h3>
              <p className="font-inter text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                {project.overview}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--ink)] uppercase">
                02 / THE CHALLENGE &amp; GOAL
              </h3>
              <p className="font-inter text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                {project.challenge} {project.goal}
              </p>
            </div>
          </div>
        </div>

        {/* Color Grading Comparison */}
        {project.beforeImage && project.afterImage && (
          <div className="max-w-[1240px] mx-auto px-6 mt-16">
            <div className="flex flex-col gap-4 mb-6">
              <span className="eyebrow">
                <span className="dot"></span> COLOR WORK
              </span>
              <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-bold uppercase text-[var(--ink)]">
                Before &amp; After Grading Analysis
              </h3>
            </div>
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
            />
          </div>
        )}

        {/* Route Navigation */}
        <div className="max-w-[1240px] mx-auto px-6 mt-20 border-t border-[var(--line)] pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              to={`/work/${prevProject.slug}`}
              className="btn btn-outline"
            >
              ← PREVIOUS: {prevProject.title}
            </Link>

            <Link
              to={`/work/${nextProject.slug}`}
              className="btn btn-accent"
            >
              NEXT: {nextProject.title} →
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
