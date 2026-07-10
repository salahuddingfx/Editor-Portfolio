import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import MagneticButton from "../components/MagneticButton";
import { siteConfig } from "../config/siteConfig";

export default function FinalCTA() {
  const ctaRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Motion values for the background accent shape
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 40, stiffness: 300 });
  const springY = useSpring(y, { damping: 40, stiffness: 300 });

  const handleMouseMove = (e) => {
    if (!isDesktop || !ctaRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
    
    // Offset from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const diffX = clientX - centerX;
    const diffY = clientY - centerY;

    // Shift shape up to 10% toward cursor
    x.set(diffX * 0.1);
    y.set(diffY * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      ref={ctaRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#080808] py-28 md:py-40 border-t border-default-border/60 overflow-hidden select-none flex flex-col items-center justify-center text-center"
    >
      {/* Decorative Interactive Attraction Glow Shape */}
      <motion.div
        className="absolute w-[280px] md:w-[450px] h-[280px] md:h-[450px] bg-primary-accent/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-0"
        style={{
          x: isDesktop ? springX : 0,
          y: isDesktop ? springY : 0,
        }}
      />

      {/* Content wrapper */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center gap-8 relative z-10">
        
        {/* Header label */}
        <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">
          PROJECT INQUIRIES
        </span>

        {/* Dynamic Editorial Headline */}
        <h2 className="font-space text-4xl md:text-7xl font-bold uppercase text-[#F5F3EE] max-w-4xl tracking-tight leading-none">
          Have a Project in Mind?<br />Let’s Create Something Memorable.
        </h2>

        {/* Subtitle */}
        <p className="font-inter text-sm md:text-base text-secondary-text max-w-lg leading-relaxed">
          Reach out today to discuss editing parameters, project budgets, color grading styles, or custom motion graphic campaigns.
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <Link to="/contact" className="w-full sm:w-auto">
            <MagneticButton className="w-full sm:w-auto px-8 py-3 bg-primary-accent hover:bg-accent-hover text-[#080808] font-inter text-xs font-bold tracking-widest uppercase transition-colors">
              START A PROJECT
            </MagneticButton>
          </Link>
          
          <a href={`mailto:${siteConfig.email}`} className="w-full sm:w-auto">
            <MagneticButton className="w-full sm:w-auto px-8 py-3 border border-default-border hover:border-[#F5F3EE] text-[#F5F3EE] font-inter text-xs font-bold tracking-widest uppercase transition-colors">
              SEND AN EMAIL
            </MagneticButton>
          </a>
        </div>

      </div>
    </section>
  );
}
