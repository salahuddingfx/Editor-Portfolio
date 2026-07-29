import React from "react";
import { siteConfig } from "../config/siteConfig";

export default function AboutPreview({ onOpenModal }) {
  const aboutVideoId = siteConfig.aboutVideoId || "0fzcFPkl_18";

  return (
    <section className="section about" id="about">
      <div className="about-grid">
        <div className="about-visual" onClick={() => onOpenModal(aboutVideoId)}>
          <img
            src={`https://i.ytimg.com/vi/${aboutVideoId}/hqdefault.jpg`}
            alt="About Filmerguy video"
            className="about-thumb"
          />
          <div className="about-glow"></div>
          <div className="about-play">►</div>
        </div>

        <div className="about-copy">
          <p className="eyebrow">About Me</p>
          <h2>
            Crafting Emotions
            <br />
            Through Visuals
          </h2>
          <p className="about-text">
            I'm a passionate cinematic editor and motion designer with a dedication to storytelling. I've worked across shorts and long-form content to bring raw footage to life through powerful edits and motion design.
          </p>

          <div className="software-row">
            <span className="soft-badge">Premiere Pro</span>
            <span className="soft-badge">After Effects</span>
            <span className="soft-badge">DaVinci Resolve</span>
            <span className="soft-badge">Photoshop</span>
          </div>

          <a href="#contact" className="btn btn-accent">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
}
