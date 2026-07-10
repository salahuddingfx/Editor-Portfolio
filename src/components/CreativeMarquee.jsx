import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function CreativeMarquee() {
  const isReduced = useReducedMotion();
  const [scrollDirection, setScrollDirection] = useState("left");
  const lastScroll = useRef(0);

  useEffect(() => {
    if (isReduced) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll.current) {
        setScrollDirection("left"); // scrolling down -> move left
      } else {
        setScrollDirection("right"); // scrolling up -> move right
      }
      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReduced]);

  const marqueeItems = [
    "VIDEO EDITING",
    "MOTION DESIGN",
    "VISUAL STORYTELLING",
    "BRAND IDENTITY",
    "SOCIAL MEDIA DESIGN",
    "CREATIVE DIRECTION"
  ];

  // Triplicating lists ensures continuous layout fills regardless of width
  const renderItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="w-full bg-secondary-bg border-y border-default-border py-6 md:py-8 overflow-hidden select-none">
      <div 
        className={`flex whitespace-nowrap gap-12 items-center w-max ${
          isReduced 
            ? "" 
            : scrollDirection === "left" 
              ? "animate-[marquee_20s_linear_infinite]" 
              : "animate-[marquee-reverse_20s_linear_infinite]"
        }`}
      >
        {renderItems.map((text, idx) => (
          <div key={idx} className="flex items-center gap-12">
            <span className="font-space text-lg md:text-3xl font-bold tracking-widest text-[#F5F3EE] uppercase">
              {text}
            </span>
            <span className="text-primary-accent text-lg md:text-2xl">✦</span>
          </div>
        ))}
      </div>

      {/* Inline styles for marquee movement */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marquee-reverse {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </div>
  );
}
