import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function IntroLoader({ onComplete }) {
  const isReduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if loader was already displayed in this session
    const hasSeen = sessionStorage.getItem("has-seen-intro");
    if (hasSeen || isReduced) {
      setProgress(100);
      setIsVisible(false);
      onComplete();
      return;
    }

    const intervalTime = 12; // Complete loading in roughly 1.2 seconds
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("has-seen-intro", "true");
            onComplete();
          }, 300); // Shutter delay
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, isReduced]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-[#080808] z-[10000] flex flex-col justify-between p-6 md:p-12 select-none"
        exit={{
          y: "-100%",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }}
      >
        {/* Top bar metadata */}
        <div className="flex justify-between items-start w-full font-mono text-[10px] text-muted-text">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-accent animate-pulse" />
            <span>RENDER PREVIEW</span>
          </div>
          <div>00:01:24:18</div>
        </div>

        {/* Counter Display with Viewfinder and Masked Background Text */}
        <div className="relative flex flex-col items-center justify-center flex-grow w-full overflow-hidden">
          
          {/* Large masked name text in the background */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
            <motion.h1 
              initial={{ y: -40, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 0.05, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-space text-[12vw] font-black tracking-tighter leading-none text-[#F5F3EE]"
            >
              TASNIMUL
            </motion.h1>
            <motion.h1 
              initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 0.05, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-space text-[12vw] font-black tracking-tighter leading-none text-[#F5F3EE] mt-2"
            >
              RAHAT
            </motion.h1>
          </div>

          {/* Centered view-finder frame with portrait */}
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-44 h-56 md:w-56 md:h-72 border border-default-border/60 bg-[#111111]/80 backdrop-blur-sm overflow-hidden z-10 flex items-center justify-center"
          >
            {/* Viewfinder corner lines */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-primary-accent" />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-primary-accent" />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-primary-accent" />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-primary-accent" />
            
            {/* Blinking REC dot */}
            <div className="absolute top-3 left-4 flex items-center gap-1.5 z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span className="font-mono text-[8px] text-[#F5F3EE] tracking-wider uppercase font-semibold">REC</span>
            </div>

            {/* Viewfinder crosshair */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none z-20">
              <div className="w-4 h-[1px] bg-primary-accent" />
              <div className="h-4 w-[1px] bg-primary-accent" />
            </div>

            {/* Shutter Reveal Portrait Image */}
            <motion.img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" 
              alt="Tasnimul Rahat"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="w-full h-full object-cover filter grayscale contrast-[1.1]"
            />
          </motion.div>

          {/* Loader Progress Counter underneath the frame */}
          <div className="flex flex-col items-center mt-6 z-20">
            <div className="font-space text-4xl md:text-5xl font-bold text-primary-text leading-none tracking-tighter">
              {progress.toString().padStart(3, "0")}%
            </div>
            <div className="font-mono text-[8px] md:text-[9px] text-muted-text mt-2 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary-accent animate-ping" />
              compiling_timeline_final_mix.mp4
            </div>
          </div>

        </div>

        {/* Timeline Slider Progress */}
        <div className="w-full flex flex-col gap-2">
          <div className="relative w-full h-[2px] bg-default-border">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-primary-accent"
              style={{ width: `${progress}%` }}
            />
            {/* Playhead vertical marker */}
            <motion.div
              className="absolute top-[-3px] w-2 h-2 rounded-full bg-primary-accent border border-[#080808]"
              style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
            />
          </div>
          <div className="flex justify-between items-center w-full font-mono text-[9px] text-muted-text">
            <span>IN: 00:00:00:00</span>
            <span className="text-primary-accent">EXPORTING BINARY SEQUENCES</span>
            <span>OUT: 00:01:24:18</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
