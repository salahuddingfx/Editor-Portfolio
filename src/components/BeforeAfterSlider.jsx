import React, { useState, useRef } from "react";
import { getDriveImageUrl } from "../utils/driveUtils";

export default function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel = "LOG PROFILE", afterLabel = "FINAL COLOR" }) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full aspect-video md:aspect-[21/9] select-none overflow-hidden border border-default-border"
    >
      {/* Before Image (RAW - Underneath) */}
      <img
        src={getDriveImageUrl(beforeImage)}
        alt="Raw grading state"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />
      <div className="absolute bottom-4 right-4 bg-[#080808]/80 backdrop-blur-sm border border-default-border px-3 py-1 font-mono text-[9px] tracking-wider text-muted-text uppercase">
        {beforeLabel}
      </div>

      {/* After Image (GRADED - Clipped Overlay) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={getDriveImageUrl(afterImage)}
          alt="Graded cinematic state"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
        />
        <div className="absolute bottom-4 left-4 bg-primary-accent border border-primary-accent px-3 py-1 font-mono text-[9px] tracking-wider text-[#080808] font-bold uppercase">
          {afterLabel}
        </div>
      </div>

      {/* Slider separator handle line */}
      <div
        className="absolute inset-y-0 w-[2px] bg-primary-accent cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle circle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-primary-accent border-4 border-[#080808] rounded-full shadow-xl flex items-center justify-center pointer-events-none"
        >
          <div className="flex gap-0.5 text-[#080808] text-[8px] font-bold">
            <span>◀</span>
            <span>▶</span>
          </div>
        </div>
      </div>
    </div>
  );
}
