import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function PageTransition({ children }) {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return <>{children}</>;
  }

  // Cinematic black shutter wipe panel
  const wipeVariants = {
    initial: {
      top: "100%",
    },
    animate: {
      top: ["100%", "0%", "0%", "-100%"],
      transition: {
        duration: 1.2,
        times: [0, 0.4, 0.6, 1],
        ease: [0.76, 0, 0.24, 1],
      }
    },
    exit: {
      top: ["100%", "0%"],
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: [0, 1, 1, 0],
      y: [30, 0, 0, -30],
      transition: {
        duration: 1.2,
        times: [0, 0.3, 0.7, 1],
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 h-screen w-full bg-[#080808] z-[9999] pointer-events-none flex items-center justify-center"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={wipeVariants}
      >
        <motion.h2 
          className="font-space text-4xl md:text-7xl font-bold tracking-widest text-[#F5F3EE]"
          variants={textVariants}
        >
          STORIES
        </motion.h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
