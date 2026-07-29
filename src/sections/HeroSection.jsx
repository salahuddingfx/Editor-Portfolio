import React, { useEffect, useRef } from "react";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export default function HeroSection({ onPlayShowreel }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const DESKTOP_RADIUS = 240;
    const MOBILE_RADIUS = 150;
    const hero = heroRef.current;
    if (!hero) return;

    const raw = { x: -999, y: -999 };
    const smooth = { x: -999, y: -999 };
    let currentRadius = 0;
    let targetRadius = 0;
    let frameId = null;

    const tick = () => {
      const posFactor = 0.14;
      const radiusFactor = 0.12;

      smooth.x += (raw.x - smooth.x) * posFactor;
      smooth.y += (raw.y - smooth.y) * posFactor;
      currentRadius += (targetRadius - currentRadius) * radiusFactor;

      hero.style.setProperty("--reveal-x", `${smooth.x}px`);
      hero.style.setProperty("--reveal-y", `${smooth.y}px`);
      hero.style.setProperty("--reveal-radius", `${Math.max(currentRadius, 0)}px`);

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    const handlePointerEnter = (e) => {
      if (e.pointerType !== "mouse") return;
      const rect = hero.getBoundingClientRect();
      raw.x = e.clientX - rect.left;
      raw.y = e.clientY - rect.top;
      targetRadius = DESKTOP_RADIUS;
    };

    const handlePointerMove = (e) => {
      if (e.pointerType !== "mouse") return;
      const rect = hero.getBoundingClientRect();
      raw.x = e.clientX - rect.left;
      raw.y = e.clientY - rect.top;
    };

    const handlePointerLeave = (e) => {
      if (e.pointerType !== "mouse") return;
      targetRadius = 0;
    };

    const handleTouchStart = (e) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = hero.getBoundingClientRect();
      raw.x = t.clientX - rect.left;
      raw.y = t.clientY - rect.top;
      targetRadius = MOBILE_RADIUS;
    };

    const handleTouchMove = (e) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = hero.getBoundingClientRect();
      raw.x = t.clientX - rect.left;
      raw.y = t.clientY - rect.top;
    };

    const endTouch = () => {
      targetRadius = 0;
    };

    hero.addEventListener("pointerenter", handlePointerEnter);
    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", handlePointerLeave);
    hero.addEventListener("touchstart", handleTouchStart);
    hero.addEventListener("touchmove", handleTouchMove);
    hero.addEventListener("touchend", endTouch);
    hero.addEventListener("touchcancel", endTouch);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      hero.removeEventListener("pointerenter", handlePointerEnter);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      hero.removeEventListener("touchstart", handleTouchStart);
      hero.removeEventListener("touchmove", handleTouchMove);
      hero.removeEventListener("touchend", endTouch);
      hero.removeEventListener("touchcancel", endTouch);
    };
  }, []);

  return (
    <section className="glass-hero" id="home" ref={heroRef}>
      {/* Layer 1: base background image */}
      <div className="gh-layer gh-base" aria-hidden="true"></div>

      {/* Layer 2: reveal portrait image radial-masked to pointer */}
      <div className="gh-layer gh-reveal" aria-hidden="true"></div>

      {/* Layer 3: technical grid + aperture SVG */}
      <div className="gh-layer gh-grid" aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none">
          <line x1="90" y1="0" x2="90" y2="900" stroke="#FFFCFA" strokeOpacity=".14" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="306" x2="1600" y2="306" stroke="#FFFCFA" strokeOpacity=".14" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <circle cx="1040" cy="430" r="330" stroke="#FF781E" strokeOpacity=".28" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <circle cx="1040" cy="430" r="3.5" fill="#FF781E" fillOpacity=".8" />
          <path d="M40,66 L40,40 L66,40" stroke="#FF781E" strokeOpacity=".5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d="M1534,40 L1560,40 L1560,66" stroke="#FF781E" strokeOpacity=".5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d="M40,834 L40,860 L66,860" stroke="#FF781E" strokeOpacity=".5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d="M1534,860 L1560,860 L1560,834" stroke="#FF781E" strokeOpacity=".5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <text x="1040" y="86" textAnchor="middle" className="gh-grid-label" fontSize="11" letterSpacing="2" opacity=".6">FIG. 01 — REVEAL</text>
          <text x="1040" y="784" textAnchor="middle" className="gh-grid-label" fontSize="11" letterSpacing="2" opacity=".6">APERTURE 240PX</text>
        </svg>
      </div>

      {/* Layer 4: headline & intro content */}
      <div className="gh-content">
        <div className="hero-top-badge">
          <span className="eyebrow eyebrow-light text-[#FF781E] bg-[#FF781E]/10 border border-[#FF781E]/40 px-4 py-1.5 rounded-full font-mono text-[11px] font-semibold tracking-widest uppercase inline-flex items-center gap-2">
            <Sparkles size={12} className="text-[#FF781E] animate-pulse" />
            <span>CINEMATIC EDITOR &amp; VISUAL DESIGNER</span>
          </span>
        </div>

        <h1 className="gh-title">
          <span className="gh-line gh-line-1"><span>Tasnimul</span></span>
          <span className="gh-line gh-line-2"><span>Rahat</span></span>
        </h1>

        <div className="gh-intro">
          <p>{siteConfig.description}</p>
          <div className="flex items-center gap-3 flex-wrap mt-5">
            <a href="#work" className="btn btn-accent gh-btn">
              Explore my work <ArrowRight size={14} />
            </a>
            {onPlayShowreel && (
              <button
                onClick={onPlayShowreel}
                className="btn btn-outline gh-btn-showreel border border-white/30 text-white hover:bg-white/10"
              >
                <Play size={14} className="text-[#FF781E] fill-[#FF781E]" /> Watch Showreel
              </button>
            )}
          </div>
        </div>

        <div className="hero-badge">
          <div className="hero-badge-num">200+</div>
          <div className="hero-badge-label">PROJECTS DONE</div>
        </div>

        <div className="gh-manifesto">
          <p className="text-[#FF781E] font-bold">[ REVEAL LENS ]</p>
          <p>MOVE CURSOR</p>
          <p>TO UNLOCK</p>
        </div>
      </div>
    </section>
  );
}
