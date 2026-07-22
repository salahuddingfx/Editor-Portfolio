import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { siteConfig } from "../config/siteConfig";

export default function FinalCTA() {
  const ctaRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 40, stiffness: 300 });
  const springY = useSpring(y, { damping: 40, stiffness: 300 });

  const handleMouseMove = (e) => {
    if (!isDesktop || !ctaRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const diffX = clientX - centerX;
    const diffY = clientY - centerY;

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
      className="relative w-full bg-[#080808] py-32 md:py-48 border-t border-white/5 overflow-hidden select-none flex flex-col items-center justify-center text-center"
    >
      <motion.div
        className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary-accent/10 rounded-full blur-[100px] md:blur-[140px] pointer-events-none z-0"
        style={{
          x: isDesktop ? springX : 0,
          y: isDesktop ? springY : 0,
        }}
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center gap-8 relative z-10">
        
        <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
          // LET'S COLLABORATE
        </span>

        <h2 className="font-space text-4xl md:text-7xl font-bold uppercase text-primary-text max-w-4xl tracking-tight leading-none">
          Have a Vision in Mind?<br />Let’s Make It Real.
        </h2>

        <p className="font-inter text-xs md:text-sm text-secondary-text max-w-md leading-relaxed">
          Ready to elevate your visual content? Let's discuss your next project, promo, or campaign.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-3 font-space text-xs md:text-sm font-bold tracking-widest text-[#080808] bg-primary-accent hover:bg-accent-hover px-8 py-4 rounded-full transition-all uppercase shadow-lg shadow-primary-accent/20"
          >
            <span>START A PROJECT</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center justify-center gap-3 font-space text-xs md:text-sm font-bold tracking-widest text-primary-text bg-[#121214] hover:bg-white/10 px-8 py-4 rounded-full border border-white/10 transition-all uppercase"
          >
            <span>SEND AN EMAIL</span>
          </a>
        </div>

      </div>
    </section>
  );
}

