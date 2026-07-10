import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function CreativeProcess() {
  const containerRef = useRef(null);
  const isReduced = useReducedMotion();

  // Scroll Progress calculations for timeline indicator height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Scale height between 0% and 100%
  const scaleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      num: "01",
      title: "DISCOVER",
      desc: "Understanding the brand, target audience, project specifications, and strategic conversion goals."
    },
    {
      num: "02",
      title: "CONCEPT",
      desc: "Brainstorming narrative structures, drafting scripts, storyboarding visual frames, and compiling references."
    },
    {
      num: "03",
      title: "CREATE",
      desc: "Arranging raw clips, mixing premium audio beds, rendering hud motion designs, and locking initial visual edits."
    },
    {
      num: "04",
      title: "REFINE",
      desc: "Reviewing revisions, applying exact color maps, editing secondary noise, and polishing transitions."
    },
    {
      num: "05",
      title: "DELIVER",
      desc: "Rendering highly optimized files across web formats (MP4, WebM) tailored to multiple aspect ratios."
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#080808] py-20 md:py-32 border-t border-default-border/60"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-12 md:gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">
            CREATIVE WORKFLOW
          </span>
          <h2 className="font-space text-3xl md:text-5xl font-bold uppercase text-[#F5F3EE]">
            From Raw Idea to Final Render
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-16 md:gap-24 pl-8 md:pl-16">
          
          {/* Vertical Track Line (Gray Backing) */}
          <div className="absolute top-0 bottom-0 left-[1px] md:left-[9px] w-[1px] bg-default-border" />

          {/* Active Progress Line (Orange Overlay) */}
          {!isReduced && (
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute top-0 bottom-0 left-[1px] md:left-[9px] w-[1.5px] bg-primary-accent"
            />
          )}

          {/* Steps */}
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40, x: -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: false, margin: "-15%" }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="relative flex flex-col gap-2 text-left group"
            >
              {/* Outer Indicator Circle */}
              <div 
                className="absolute left-[-39px] md:left-[-63px] top-1.5 w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#080808] border border-default-border group-hover:border-primary-accent flex items-center justify-center transition-colors duration-300 z-10"
              >
                {/* Active Inner Dot */}
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-default-border group-hover:bg-primary-accent transition-colors duration-300" />
              </div>

              {/* Number Label (JetBrains Mono) */}
              <div className="font-mono text-[10px] text-primary-accent uppercase tracking-widest font-bold">
                PHASE {step.num}
              </div>

              {/* Step Title (Space Grotesk) */}
              <h3 className="font-space text-xl md:text-2xl font-bold uppercase text-[#F5F3EE] tracking-tight group-hover:text-primary-accent transition-colors duration-300">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-inter text-xs md:text-sm text-secondary-text leading-relaxed max-w-2xl mt-1">
                {step.desc}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
