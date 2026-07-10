import React, { useEffect, useState, useRef } from "react";

export default function AnimatedCounter({ value, duration = 1.2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  // Parse suffix ("+" or "M+") and target number (e.g. "50+" or "10M+")
  const numericString = value.replace(/[^0-9]/g, "");
  const target = parseInt(numericString, 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            
            // Easing: easeOutQuad
            const easedProgress = progress * (2 - progress);
            setCount(Math.floor(easedProgress * target));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <span ref={ref} className="font-space">
      {count}
      {suffix}
    </span>
  );
}
