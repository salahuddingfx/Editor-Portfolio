import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "../data/testimonials";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
      className="w-full bg-[#080808] py-24 md:py-36 border-t border-white/5 select-none overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-12 md:gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
            // CLIENT FEEDBACK
          </span>
          <h2 className="font-space text-3xl md:text-5xl font-bold uppercase text-primary-text tracking-tight">
            Client Words
          </h2>
        </div>

        {/* Carousel Frame */}
        <div className="relative min-h-[360px] md:min-h-[280px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl glass-card rounded-2xl p-8 md:p-12 flex flex-col justify-between gap-8 border border-white/10"
            >
              {/* Rating stars */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-primary-accent text-primary-accent" />
                  ))}
                </div>
                
                <span className="font-space text-5xl text-white/10 font-bold leading-none">
                  “
                </span>
              </div>

              {/* Review Text */}
              <blockquote className="font-space text-base md:text-2xl font-medium italic text-primary-text leading-relaxed tracking-tight text-left">
                {current.review}
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                {current.image && (
                  <img 
                    src={current.image} 
                    alt={current.name} 
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                  />
                )}
                <div className="text-left">
                  <div className="font-space text-sm font-bold uppercase text-primary-text">
                    {current.name}
                  </div>
                  <div className="font-mono text-[10px] text-muted-text uppercase tracking-wider mt-0.5">
                    {current.role} • <span className="text-primary-accent">{current.company}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Controls */}
        <div className="flex justify-between items-center max-w-4xl mx-auto w-full pt-2">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  i === index ? "w-8 bg-primary-accent" : "w-2 bg-white/10"
                }`}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/10 text-secondary-text hover:text-primary-accent hover:border-primary-accent transition-colors glass-card cursor-pointer"
              aria-label="Previous Review"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/10 text-secondary-text hover:text-primary-accent hover:border-primary-accent transition-colors glass-card cursor-pointer"
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

