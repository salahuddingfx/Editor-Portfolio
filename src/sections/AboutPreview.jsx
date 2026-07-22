import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function AboutPreview() {
  const containerRef = useRef(null);
  const isReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#080808] py-24 md:py-36 border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Left Visual */}
          <div className="lg:col-span-5 relative w-full aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 glass-card">
            <motion.img 
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80"
              alt="Creative editing workspace"
              loading="lazy"
              className="w-full h-[115%] object-cover absolute top-0 left-0"
              style={{ y: isReduced ? 0 : y }}
            />
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 items-start">
            <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
              // ABOUT THE EDITOR
            </span>
            
            <h2 className="font-space text-3xl md:text-5xl font-bold uppercase text-primary-text tracking-tight max-w-xl">
              Visuals That Hook & Retain.
            </h2>
            
            <p className="font-inter text-sm md:text-base text-secondary-text leading-relaxed max-w-xl">
              I'm Tasnimul Rahat. I turn raw footage into cinematic, high-retention video content for brands, creators, and agencies. Specialized in video editing, motion design, and color grading.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 font-space text-xs md:text-sm font-bold tracking-widest text-[#080808] bg-primary-text hover:bg-primary-accent px-6 py-3 rounded-full transition-all uppercase"
              >
                <span>Read Full Profile</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

