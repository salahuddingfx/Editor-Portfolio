import React from "react";
import { siteConfig } from "../config/siteConfig";
import { FolderCheck, ExternalLink, Play } from "lucide-react";

export default function AboutPreview({ onOpenModal }) {
  const aboutVideoId = siteConfig.aboutVideoId || "0fzcFPkl_18";

  return (
    <section className="section about" id="about">
      <div className="about-grid">
        <div className="about-visual cursor-pointer group relative overflow-hidden rounded-3xl shadow-xl" onClick={() => onOpenModal(aboutVideoId)}>
          <img
            src={`https://i.ytimg.com/vi/${aboutVideoId}/hqdefault.jpg`}
            alt="About Tasnimul Rahat video"
            className="about-thumb w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="about-glow"></div>
          <div className="about-play flex items-center justify-center bg-[var(--accent)] text-[#0B0B0B] rounded-full p-4 shadow-2xl transition-transform duration-300 group-hover:scale-110">
            <Play size={24} fill="currentColor" />
          </div>
        </div>

        <div className="about-copy">
          <p className="eyebrow">About Me — Tasnimul Rahat</p>
          <h2>
            Crafting Emotions
            <br />
            Through Visual Storytelling
          </h2>
          <p className="about-text">
            Hi, I'm <strong>Tasnimul Rahat</strong>, founder of <strong>EditHub Creations</strong> based in Dhaka, Bangladesh. I specialize in turning raw footage into high-engagement cinematic videos, motion graphics, and short-form reels for creators and global brands.
          </p>

          <div className="software-row flex flex-wrap gap-2 my-4">
            <span className="soft-badge">Premiere Pro</span>
            <span className="soft-badge">After Effects</span>
            <span className="soft-badge">DaVinci Resolve</span>
            <span className="soft-badge">Photoshop</span>
            <span className="soft-badge">Audition</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <a href="#contact" className="btn btn-accent">
              Let's Talk
            </a>

            <a
              href={siteConfig.driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline inline-flex items-center gap-2"
            >
              <FolderCheck size={16} />
              <span>Drive Portfolio</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
