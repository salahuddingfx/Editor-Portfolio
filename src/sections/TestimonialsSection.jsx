import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "../data/testimonials";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Autoplay intervals (paused on hover)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full bg-[#111111] py-20 md:py-32 border-t border-default-border/60 select-none overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-12 md:gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">
            CLIENT FEEDBACK
          </span>
          <h2 className="font-space text-3xl md:text-5xl font-bold uppercase text-[#F5F3EE]">
            Trusted by Creative Directors
          </h2>
        </div>

        {/* Carousel Visual Frame */}
        <div className="relative min-h-[380px] md:min-h-[300px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="w-full max-w-4xl bg-secondary-bg border border-default-border/60 p-8 md:p-12 flex flex-col justify-between gap-6"
            >
              {/* Rating stars & Quote Icon */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-primary-accent text-primary-accent" />
                  ))}
                </div>
                
                {/* Big decorative quote */}
                <span className="font-space text-6xl text-default-border/40 font-bold leading-none select-none">
                  “
                </span>
              </div>

              {/* Review Text */}
              <blockquote className="font-space text-lg md:text-2xl font-medium italic text-primary-text leading-relaxed tracking-tight text-left">
                {current.review}
              </blockquote>

              {/* Client Info Grid */}
              <div className="flex items-center gap-4 border-t border-default-border/40 pt-6">
                {current.image && (
                  <img 
                    src={current.image} 
                    alt={current.name} 
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover border border-default-border/60"
                  />
                )}
                <div className="text-left">
                  <div className="font-space text-sm font-bold uppercase text-primary-text">
                    {current.name}
                  </div>
                  <div className="font-mono text-[9px] md:text-[10px] text-muted-text uppercase tracking-wider mt-0.5">
                    {current.role} at <span className="text-primary-accent">{current.company}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Navigation Indicator row */}
        <div className="flex justify-between items-center max-w-4xl mx-auto w-full pt-4">
          {/* Tracker dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 transition-all duration-300 ${
                  i === index ? "w-6 bg-primary-accent" : "w-1.5 bg-default-border"
                }`}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Action arrows */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="p-2 border border-default-border/60 text-secondary-text hover:text-primary-accent hover:border-primary-accent transition-colors"
              aria-label="Previous Review"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 border border-default-border/60 text-secondary-text hover:text-primary-accent hover:border-primary-accent transition-colors"
              aria-label="Next Review"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
