import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "../components/MagneticButton";
import { siteConfig } from "../config/siteConfig";

export default function HeroSection({ onPlayShowreel }) {
  const [timecode, setTimecode] = useState("00:01:24:18");
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 24 FPS Timecode Ticker
  useEffect(() => {
    let frames = 18;
    let seconds = 24;
    let minutes = 1;
    let hours = 0;

    const interval = setInterval(() => {
      frames++;
      if (frames >= 24) {
        frames = 0;
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
            minutes = 0;
            hours++;
          }
        }
      }
      const pad = (num) => num.toString().padStart(2, "0");
      setTimecode(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, []);

  // Subtle Mouse Parallax
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { width, height } = heroRef.current.getBoundingClientRect();
    const x = (clientX - width / 2) / (width / 2); // range -1 to 1
    const y = (clientY - height / 2) / (height / 2); // range -1 to 1
    setMousePos({ x, y });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#080808] flex flex-col justify-between pt-32 pb-16 overflow-hidden select-none"
    >
      {/* Cinematic Looping Video Backdrop (Grayscale, low opacity) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.14] pointer-events-none filter grayscale contrast-[1.1] mix-blend-screen z-0"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-neon-light-from-a-building-in-a-city-43183-large.mp4" type="video/mp4" />
      </video>

      {/* Editorial Editing Grid Lines Backdrop */}
      <div 
        className="absolute inset-0 grid-lines pointer-events-none opacity-[0.22] transition-transform duration-300 ease-out z-0" 
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`
        }}
      />
      
      {/* Decorative Shutter/Viewfinder Frame Lines */}
      <div className="absolute top-12 left-6 right-6 h-[1px] bg-default-border/30 pointer-events-none" />
      <div className="absolute bottom-12 left-6 right-6 h-[1px] bg-default-border/30 pointer-events-none" />
      
      {/* Camera Viewfinder Corners (Bespoke Cinema Look) */}
      <div className="absolute top-16 left-10 w-4 h-4 border-t border-l border-default-border/55 pointer-events-none" />
      <div className="absolute top-16 right-10 w-4 h-4 border-t border-r border-default-border/55 pointer-events-none" />
      <div className="absolute bottom-16 left-10 w-4 h-4 border-b border-l border-default-border/55 pointer-events-none" />
      <div className="absolute bottom-16 right-10 w-4 h-4 border-b border-r border-default-border/55 pointer-events-none" />

      {/* Top Details Column */}
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-start z-10">
        {/* Availability label */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success"></span>
          </span>
          <span className="font-mono text-[9px] tracking-widest text-[#5BE38C] uppercase font-medium">
            AVAILABLE FOR HIRE
          </span>
        </div>

        {/* Cinematic camera metadata readout */}
        <div className="hidden sm:flex gap-6 font-mono text-[9px] text-muted-text tracking-widest uppercase">
          <span>ISO 800</span>
          <span>F/2.8</span>
          <span>1/48s</span>
          <span>5600K</span>
        </div>

        {/* Timecode display */}
        <div className="font-mono text-[9px] tracking-widest text-muted-text">
          TC {timecode}
        </div>
      </div>

      {/* Center Hero Heading Section */}
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-8 md:gap-10 z-10 my-auto">
        <h1 className="font-space font-bold leading-[0.9] tracking-tighter text-[#F5F3EE] uppercase max-w-5xl flex flex-col gap-1">
          <div className="overflow-hidden py-1">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[11vw] md:text-[8vw] lg:text-[7vw]"
            >
              VIDEO EDITOR
            </motion.span>
          </div>
          <div className="overflow-hidden py-1">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[11vw] md:text-[8vw] lg:text-[7vw] text-transparent stroke-text" 
              style={{ WebkitTextStroke: "1px #F5F3EE" }}
            >
              &amp; VISUAL DESIGNER
            </motion.span>
          </div>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end max-w-6xl">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-6 font-inter text-sm md:text-base text-secondary-text leading-relaxed"
          >
            Transforming raw footage and creative briefs into high-aesthetic, cinematic visual stories that hook attention, capture emotion, and deliver engagement.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="md:col-span-6 flex flex-wrap gap-4 md:justify-end"
          >
            <Link to="/work">
              <MagneticButton className="px-8 py-3 bg-[#F5F3EE] hover:bg-[#F5F3EE]/90 text-[#080808] font-inter text-xs font-bold tracking-widest uppercase transition-colors">
                VIEW MY WORK
              </MagneticButton>
            </Link>

            <MagneticButton
              onClick={onPlayShowreel}
              data-cursor="play"
              className="px-8 py-3 border border-default-border hover:border-primary-accent hover:text-primary-accent font-inter text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2"
            >
              <Play size={10} fill="currentColor" />
              PLAY SHOWREEL
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center z-10">
        {/* Aspect Ratio Guide */}
        <div className="font-mono text-[9px] text-muted-text uppercase tracking-widest">
          ASPECT 16:9 / FRAME 24FPS / 4K DCI
        </div>
        
        {/* Scroll down prompt */}
        <div className="flex items-center gap-2 font-mono text-[9px] text-muted-text uppercase tracking-widest animate-bounce">
          <span>SCROLL FOR TRACK</span>
          <ArrowDown size={10} />
        </div>
      </div>
    </section>
  );
}
