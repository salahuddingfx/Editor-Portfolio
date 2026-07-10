import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function CustomCursor() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isReduced = useReducedMotion();
  const [cursorType, setCursorType] = useState(""); // "", "view", "play", "drag", "open"

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!isDesktop || isReduced) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        setCursorType(target.getAttribute("data-cursor"));
      } else {
        setCursorType("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isDesktop, isReduced, mouseX, mouseY]);

  if (!isDesktop || isReduced) return null;

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: mouseX, y: mouseY, xPercent: -50, yPercent: -50 }}
      />
      {/* Outer Circle Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-primary-accent/40 rounded-full pointer-events-none z-[9998] flex items-center justify-center overflow-hidden font-mono font-bold text-[9px] uppercase tracking-wider text-primary-accent"
        style={{
          x: cursorX,
          y: cursorY,
          xPercent: -50,
          yPercent: -50,
          width: cursorType ? 80 : 36,
          height: cursorType ? 80 : 36,
          backgroundColor: cursorType ? "rgba(255, 77, 36, 0.1)" : "rgba(255, 77, 36, 0)",
          borderColor: cursorType ? "rgba(255, 77, 36, 1)" : "rgba(255, 77, 36, 0.3)",
        }}
      >
        {cursorType && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            {cursorType}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
