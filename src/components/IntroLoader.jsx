import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function IntroLoader({ onComplete }) {
  const isReduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("has-seen-intro");
    if (hasSeen || isReduced) {
      setProgress(100);
      setIsVisible(false);
      onComplete();
      return;
    }

    const intervalTime = 12;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("has-seen-intro", "true");
            onComplete();
          }, 300);
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
        className="fixed inset-0 bg-[#FFFCFA] z-[10000] flex flex-col justify-between p-6 md:p-12 select-none"
        exit={{
          y: "-100%",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }}
      >
        {/* Top bar metadata */}
        <div className="flex justify-between items-start w-full font-mono text-[10px] text-[#83837A]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF781E] animate-pulse" />
            <span className="font-semibold text-[#0B0B0B]">RENDER PREVIEW</span>
          </div>
          <div className="text-[#0B0B0B] font-bold">00:01:24:18</div>
        </div>

        {/* Counter Display with Viewfinder */}
        <div className="relative flex flex-col items-center justify-center flex-grow w-full overflow-hidden">
          {/* Large background watermark text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
            <motion.h1 
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 0.04 }}
              transition={{ duration: 1 }}
              className="font-['Space_Grotesk'] text-[13vw] font-bold tracking-tighter leading-none text-[#0B0B0B]"
            >
              TASNIMUL
            </motion.h1>
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 0.04 }}
              transition={{ duration: 1 }}
              className="font-['Space_Grotesk'] text-[13vw] font-bold tracking-tighter leading-none text-[#0B0B0B]"
            >
              RAHAT
            </motion.h1>
          </div>

          {/* Centered view-finder frame */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-44 h-56 md:w-56 md:h-72 border border-[rgba(255,120,30,0.3)] bg-white/80 backdrop-blur-md rounded-[24px] shadow-2xl overflow-hidden z-10 flex items-center justify-center"
          >
            {/* Viewfinder corner lines */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#FF781E]" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#FF781E]" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#FF781E]" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#FF781E]" />
            
            {/* Blinking REC dot */}
            <div className="absolute top-3 left-4 flex items-center gap-1.5 z-20">
              <span className="w-2 h-2 rounded-full bg-[#FF781E] animate-pulse" />
              <span className="font-mono text-[9px] text-[#0B0B0B] tracking-wider uppercase font-bold">REC</span>
            </div>

            {/* Shutter Reveal Image */}
            <motion.img 
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80" 
              alt="Tasnimul Rahat"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Loader Progress Counter */}
          <div className="flex flex-col items-center mt-6 z-20">
            <div className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-[#0B0B0B] leading-none tracking-tight">
              {progress.toString().padStart(3, "0")}%
            </div>
            <div className="font-mono text-[9px] md:text-[10px] text-[#83837A] mt-2 uppercase tracking-widest flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF781E] animate-ping" />
              compiling_timeline_tasnimul_rahat.mp4
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full flex flex-col gap-2">
          <div className="relative w-full h-1.5 bg-[#F5EEE7] rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#FF9C52] to-[#E85D00] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center w-full font-mono text-[9px] text-[#83837A]">
            <span>IN: 00:00:00:00</span>
            <span className="text-[#E85D00] font-bold">TASNIMUL RAHAT PORTFOLIO</span>
            <span>OUT: 00:01:24:18</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
