import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function CreativeProcess() {
  const containerRef = useRef(null);
  const isReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      num: "01",
      title: "DISCOVER & STRATEGY",
      desc: "Analyzing target audience, visual style references, and project goals."
    },
    {
      num: "02",
      title: "STORYBOARD & CONCEPT",
      desc: "Drafting narrative flow, pacing beats, and audio landscape."
    },
    {
      num: "03",
      title: "EDIT & MOTION DESIGN",
      desc: "Cutting footage, integrating motion graphics, and sound design."
    },
    {
      num: "04",
      title: "COLOR GRADE & POLISH",
      desc: "Applying film emulations, audio leveling, and visual polish."
    },
    {
      num: "05",
      title: "FINAL RENDER",
      desc: "Exporting high-bitrate deliverables optimized across all platforms."
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#080808] py-24 md:py-36 border-t border-white/5 relative"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-14 md:gap-20">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
            // WORKFLOW
          </span>
          <h2 className="font-space text-3xl md:text-5xl font-bold uppercase text-primary-text tracking-tight">
            Creative Process
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-12 md:gap-16 pl-8 md:pl-16">
          
          <div className="absolute top-0 bottom-0 left-[1px] md:left-[9px] w-[1px] bg-white/10" />

          {!isReduced && (
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute top-0 bottom-0 left-[1px] md:left-[9px] w-[2px] bg-primary-accent"
            />
          )}

          {/* Steps */}
          {steps.map((step) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-15%" }}
              transition={{ duration: 0.4 }}
              className="relative flex flex-col gap-2 glass-card p-6 md:p-8 rounded-2xl border border-white/10 group"
            >
              <div 
                className="absolute left-[-39px] md:left-[-63px] top-6 w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#080808] border border-white/20 group-hover:border-primary-accent flex items-center justify-center transition-colors z-10"
              >
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/20 group-hover:bg-primary-accent transition-colors" />
              </div>

              <div className="font-mono text-xs text-primary-accent font-bold">
                PHASE {step.num}
              </div>

              <h3 className="font-space text-lg md:text-xl font-bold uppercase text-primary-text group-hover:text-primary-accent transition-colors">
                {step.title}
              </h3>

              <p className="font-inter text-xs md:text-sm text-secondary-text leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

