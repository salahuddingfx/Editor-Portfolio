import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function PageTransition({ children }) {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return <>{children}</>;
  }

  const wipeVariants = {
    initial: {
      top: "100%",
    },
    animate: {
      top: ["100%", "0%", "0%", "-100%"],
      transition: {
        duration: 0.85,
        times: [0, 0.4, 0.6, 1],
        ease: [0.76, 0, 0.24, 1],
      }
    },
    exit: {
      top: ["100%", "0%"],
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1],
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0.95, 1, 1, 1.02],
      transition: {
        duration: 0.85,
        times: [0, 0.3, 0.7, 1],
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 h-screen w-full bg-[#0B0B0B] z-[9999] pointer-events-none flex flex-col items-center justify-center gap-4 select-none"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={wipeVariants}
      >
        <motion.div 
          className="flex flex-col items-center gap-2 text-center"
          variants={textVariants}
        >
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#FF781E] tracking-widest uppercase font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF781E] animate-ping" />
            <span>TASNIMUL RAHAT PORTFOLIO</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-6xl font-extrabold tracking-tight text-[#FF781E] uppercase text-shadow">
            CINEMATIC CUTS
          </h2>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
