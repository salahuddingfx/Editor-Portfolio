import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function MagneticButton({ children, className = "", onClick, ...props }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!isDesktop || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Compute offset
    const offsetX = clientX - centerX;
    const offsetY = clientY - centerY;

    // Pull factor (button follows cursor within 40% of standard offset)
    x.set(offsetX * 0.4);
    y.set(offsetY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-shadow ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
