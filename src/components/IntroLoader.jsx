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

        {/* Counter Display */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="font-space text-8xl md:text-[12rem] font-bold text-primary-text leading-none tracking-tighter">
            {progress.toString().padStart(3, "0")}%
          </div>
          <div className="font-mono text-xs text-secondary-text mt-4 uppercase tracking-widest">
            compiling_timeline_final_mix.mp4
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
