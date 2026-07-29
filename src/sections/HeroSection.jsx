import React, { useEffect, useRef } from "react";
import { siteConfig } from "../config/siteConfig";

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const DESKTOP_RADIUS = 235;
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
          <circle cx="1040" cy="430" r="330" stroke="#FFFCFA" strokeOpacity=".22" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <circle cx="1040" cy="430" r="2.5" fill="#FFFCFA" fillOpacity=".4" />
          <path d="M40,66 L40,40 L66,40" stroke="#FFFCFA" strokeOpacity=".35" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d="M1534,40 L1560,40 L1560,66" stroke="#FFFCFA" strokeOpacity=".35" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d="M40,834 L40,860 L66,860" stroke="#FFFCFA" strokeOpacity=".35" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d="M1534,860 L1560,860 L1560,834" stroke="#FFFCFA" strokeOpacity=".35" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <text x="1040" y="86" textAnchor="middle" className="gh-grid-label" fontSize="11" letterSpacing="2" opacity=".45">FIG. 01 — REVEAL</text>
          <text x="1040" y="784" textAnchor="middle" className="gh-grid-label" fontSize="11" letterSpacing="2" opacity=".45">APERTURE 235PX</text>
        </svg>
      </div>

      {/* Layer 4: headline & intro content */}
      <div className="gh-content">
        <h1 className="gh-title">
          <span className="gh-line gh-line-1"><span>Foysal</span></span>
          <span className="gh-line gh-line-2"><span>Mahamud</span></span>
          <span className="gh-line gh-line-3"><span>Nahid</span></span>
        </h1>

        <div className="gh-intro">
          <p>{siteConfig.description}</p>
          <a href="#work" className="btn btn-accent gh-btn">
            Explore my work <span className="arrow">→</span>
          </a>
        </div>

        <div className="gh-manifesto">
          <p>Building the</p>
          <p>Next version</p>
          <p>In public</p>
        </div>
      </div>
    </section>
  );
}
