import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import MagneticButton from "../components/MagneticButton";

export default function AboutPreview() {
  const containerRef = useRef(null);
  const isReduced = useReducedMotion();

  // Scroll Parallax Hooks (disabled in reduced motion)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // Cinematic clip path reveal animation
  const clipPathVariants = {
    hidden: { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
    visible: { 
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#111111] py-20 md:py-32 border-t border-default-border/60 relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Split screen container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Left Visual (Parallax + Mask Reveal) */}
          <div className="lg:col-span-5 relative w-full aspect-[4/5] overflow-hidden border border-default-border/40">
            <motion.div 
              className="w-full h-full"
              initial={isReduced ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={clipPathVariants}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80"
                alt="Creative editing workspace"
                loading="lazy"
                className="w-full h-[120%] object-cover absolute top-0 left-0"
                style={{ y: isReduced ? 0 : y }}
              />
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 items-start">
            <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">
              ABOUT THE CREATOR
            </span>
            
            <h2 className="font-space text-3xl md:text-5xl font-bold uppercase text-[#F5F3EE] tracking-tight leading-none max-w-xl">
              I Create Visuals People Remember.
            </h2>
            
            <div className="flex flex-col gap-4 text-secondary-text max-w-xl font-inter text-sm md:text-base leading-relaxed">
              <p>
                My name is Tasnimul Rahat. Over the last three years, I’ve worked with commercial agencies, production studios, and digital content creators to translate complex narratives into seamless kinetic sequences.
              </p>
              <p>
                Whether it's editing a cinematic high-fashion promo video, designing 3D motion hud graphics, or cutting high-retention short-form content, I bridge the gap between creative storytelling and technical execution.
              </p>
            </div>

            <div className="mt-4">
              <Link to="/about">
                <MagneticButton className="px-8 py-3 bg-[#F5F3EE] hover:bg-[#F5F3EE]/90 text-[#080808] font-inter text-xs font-bold tracking-widest uppercase transition-colors">
                  MORE ABOUT ME
                </MagneticButton>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
