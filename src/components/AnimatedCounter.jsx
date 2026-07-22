import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function AnimatedCounter({ value, duration = 1.5 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [count, setCount] = useState(0);

  // Extract digits and suffix (e.g., "50+" -> target: 50, suffix: "+", "10M+" -> target: 10, suffix: "M+")
  const numericString = value.replace(/[^0-9]/g, "");
  const target = parseInt(numericString, 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    let frame = 0;
    const totalFrames = Math.round(duration * 60);

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Cubic ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.min(Math.round(eased * target), target);

      setCount(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(target);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-space font-bold inline-block">
      {count}{suffix}
    </span>
  );
}

