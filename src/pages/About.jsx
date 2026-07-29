import React, { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import VideoModal from "../components/VideoModal";
import { siteConfig } from "../config/siteConfig";

export default function About() {
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const aboutVideoId = siteConfig.aboutVideoId || "0fzcFPkl_18";

  const skills = [
    { name: "Premiere Pro", level: "Expert", desc: "Timeline editing, multi-cam sync, pacing" },
    { name: "After Effects", level: "Expert", desc: "Motion graphics, VFX, text animations" },
    { name: "DaVinci Resolve", level: "Advanced", desc: "Cinematic color grading & skin tone balancing" },
    { name: "Photoshop", level: "Advanced", desc: "High-CTR thumbnail design & asset manipulation" },
    { name: "Audition & Sound FX", level: "Intermediate", desc: "Audio noise reduction, risers, stereo mixing" }
  ];

  const workflowSteps = [
    { num: "01", title: "Media Audit & Narrative Strategy", desc: "Analyzing raw footage, selecting hero shots, and structuring a compelling narrative hook." },
    { num: "02", title: "Assembly & Pacing Cut", desc: "Trimming filler, syncing audio beats, and tuning frame-by-frame rhythm for high retention." },
    { num: "03", title: "Color, Motion & Sound Design", desc: "Applying cinematic color grades, adding motion graphics callouts, risers, and sound FX." },
    { num: "04", title: "Master Export & Polishing", desc: "Final render delivery optimized for YouTube, Instagram Reels, TikTok, or Broadcast." }
  ];

  return (
    <PageTransition>
      <div className="w-full bg-[var(--bg)] pt-28 pb-32 flex-grow text-left">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col gap-16">
          
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-3xl border-b border-[var(--line)] pb-8">
            <span className="eyebrow">
              <span className="dot"></span> About Tasnimul Rahat
            </span>
            <h1 className="font-[var(--font-display)] text-4xl md:text-6xl font-bold uppercase text-[var(--ink)] tracking-tight leading-tight">
              Crafting Emotions &amp; High-Retention Visual Storytelling
            </h1>
            <p className="font-[var(--font-body)] text-base text-[var(--ink-soft)] leading-relaxed mt-2">
              Hi! I'm <strong>Tasnimul Rahat</strong> — a dedicated Cinematic Video Editor &amp; Motion Designer. I help content creators, brands, and agencies transform raw video clips into visually striking, high-converting visual stories.
            </p>
          </div>

          {/* Featured Video Showcase */}
          <div className="about-grid">
            <div className="about-visual" onClick={() => setSelectedVideoId(aboutVideoId)}>
              <img
                src={`https://i.ytimg.com/vi/${aboutVideoId}/hqdefault.jpg`}
                alt="Tasnimul Rahat Editing Showreel"
                className="about-thumb"
              />
              <div className="about-glow"></div>
              <div className="about-play">►</div>
            </div>

            <div className="about-copy flex flex-col justify-center gap-4">
              <span className="eyebrow">
                <span className="dot"></span> Showreel &amp; Editing Style
              </span>
              <h2>Visual Rhythm &amp; Pacing Precision</h2>
              <p className="about-text">
                Every frame matters. Whether it's a 30-second viral short reel or a 20-minute long-form documentary, I focus on capturing viewer attention in the first 3 seconds, building emotional resonance through smooth transitions, color grading, and immersive soundscapes.
              </p>
              <div className="software-row">
                <span className="soft-badge">Premiere Pro</span>
                <span className="soft-badge">After Effects</span>
                <span className="soft-badge">DaVinci Resolve</span>
                <span className="soft-badge">Photoshop</span>
              </div>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent self-start">
                Book a Project →
              </a>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-bar margin-0">
            <div className="stats-inner">
              {siteConfig.stats.map((stat, idx) => (
                <div className="stat" key={idx}>
                  <span className="stat-num">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Biography */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[var(--surface)] border border-[var(--line)] p-8 md:p-12 rounded-[var(--radius-xl)] shadow-sm">
            <div className="flex flex-col gap-4">
              <span className="eyebrow">
                <span className="dot"></span> My Background
              </span>
              <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--ink)]">
                Behind the Editing Desk
              </h2>
              <p className="font-[var(--font-body)] text-sm text-[var(--ink-soft)] leading-relaxed">
                Over the past 3+ years, I have edited hundreds of short-form reels, commercial trailers, educational videos, and YouTube content. My obsession with post-production goes beyond simple cutting — I analyze viewer watch-time graphs, audio dynamics, color science, and graphical pacing to maximize retention and engagement.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--ink)]">
                Core Editing Principles
              </h3>
              <ul className="flex flex-col gap-3 font-inter text-sm text-[var(--ink-soft)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent-deep)] font-bold">✦</span>
                  <span><strong>The First 3 Seconds:</strong> Instant visual hook to prevent viewers from scrolling away.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent-deep)] font-bold">✦</span>
                  <span><strong>Sound FX &amp; Audio Pacing:</strong> Layered risers, impacts, and background music synced to visual cuts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent-deep)] font-bold">✦</span>
                  <span><strong>Color Grading:</strong> Custom LUTs and color correction for a rich, film-like aesthetic.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Software & Tooling Matrix */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="eyebrow">
                <span className="dot"></span> Toolkit &amp; Software
              </span>
              <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--ink)]">
                Professional Software Arsenal
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, idx) => (
                <div key={idx} className="service-card flex flex-col justify-between gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--ink)]">
                      {skill.name}
                    </h3>
                    <span className="price-tag">{skill.level}</span>
                  </div>
                  <p className="font-[var(--font-body)] text-xs text-[var(--muted)]">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow & Creative Process */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="eyebrow">
                <span className="dot"></span> How I Work
              </span>
              <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--ink)]">
                Step-by-Step Production Workflow
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((step, idx) => (
                <div key={idx} className="price-card price-card--tier1 flex flex-col justify-between">
                  <div>
                    <span className="price-tag">{step.num}</span>
                    <h3 className="font-[var(--font-display)] text-base font-bold text-[var(--ink)] mb-2">
                      {step.title}
                    </h3>
                    <p className="font-[var(--font-body)] text-xs text-[var(--ink-soft)] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="cta-band">
            <div>
              <h3>Have a Project in Mind for Tasnimul Rahat?</h3>
              <p>Let's collaborate and bring your visual vision to life.</p>
            </div>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
              Get In Touch <span className="btn-dot"></span>
            </a>
          </div>

        </div>

        {/* Video Modal */}
        <VideoModal
          isOpen={Boolean(selectedVideoId)}
          onClose={() => setSelectedVideoId(null)}
          videoId={selectedVideoId}
        />
      </div>
    </PageTransition>
  );
}
