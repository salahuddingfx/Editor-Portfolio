import React from "react";
import { Link } from "react-router-dom";
import { Video, Smartphone, Layers, Palette, Sparkles, Check, ArrowUpRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { services } from "../data/services";

// Custom SVG Youtube component
const Youtube = (props) => (
  <svg
    viewBox="0 0 24 24"
    width={props.size || "24"}
    height={props.size || "24"}
    stroke="currentColor"
    strokeWidth={props.strokeWidth || "2"}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
  </svg>
);

const IconComponent = ({ name, ...props }) => {
  switch (name) {
    case "Video": return <Video {...props} />;
    case "Smartphone": return <Smartphone {...props} />;
    case "Youtube": return <Youtube {...props} />;
    case "Layers": return <Layers {...props} />;
    case "Palette": return <Palette {...props} />;
    case "Sparkles": return <Sparkles {...props} />;
    default: return <Video {...props} />;
  }
};

export default function Services() {
  return (
    <PageTransition>
      <div className="w-full bg-[#080808] pt-32 pb-32 flex-grow">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-14 md:gap-20">
          
          {/* Header segment */}
          <div className="flex flex-col gap-3 max-w-2xl text-left border-b border-white/5 pb-8">
            <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
              // CREATIVE CAPABILITIES
            </span>
            <h1 className="font-space text-4xl md:text-6xl font-bold uppercase text-primary-text tracking-tight">
              Services & Specialties
            </h1>
            <p className="font-inter text-xs md:text-sm text-secondary-text leading-relaxed">
              Tailored visual solutions built for high watch time, brand impact, and cinematic storytelling.
            </p>
          </div>

          {/* Grid of Glass Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group glass-card glass-card-hover rounded-2xl p-8 md:p-10 flex flex-col justify-between gap-8 border border-white/10"
              >
                {/* Top Section */}
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs text-primary-accent font-bold">
                      {service.id}
                    </span>
                    <div className="text-secondary-text group-hover:text-primary-accent group-hover:scale-110 transition-all duration-300">
                      <IconComponent name={service.iconName} size={30} strokeWidth={1.2} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-space text-xl font-bold uppercase text-primary-text group-hover:text-primary-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-inter text-xs md:text-sm text-secondary-text leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Checklist Features */}
                <div className="border-t border-white/5 pt-6 flex flex-col gap-2.5">
                  <span className="font-mono text-[10px] text-muted-text uppercase tracking-widest mb-1">WHAT'S INCLUDED</span>
                  {service.details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2.5">
                      <Check size={14} className="text-primary-accent flex-shrink-0" />
                      <span className="font-inter text-xs text-primary-text">{detail}</span>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

          {/* Footer Callout Card */}
          <div className="glass-card rounded-2xl p-8 md:p-16 flex flex-col items-center justify-center text-center gap-6 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-accent/5 via-transparent to-primary-accent/5 pointer-events-none" />
            
            <h3 className="font-space text-2xl md:text-4xl font-bold text-primary-text uppercase max-w-xl leading-tight">
              Ready to elevate your next project?
            </h3>
            <p className="font-inter text-xs md:text-sm text-secondary-text max-w-md">
              Let’s discuss your project goals, timelines, and creative vision.
            </p>
            
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 font-space text-xs md:text-sm font-bold tracking-widest text-[#080808] bg-primary-accent hover:bg-accent-hover px-8 py-4 rounded-full transition-all uppercase shadow-lg shadow-primary-accent/20"
            >
              <span>DISCUSS YOUR PROJECT</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}

