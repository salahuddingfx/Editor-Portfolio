import React from "react";
import { Link } from "react-router-dom";
import { Video, Smartphone, Layers, Palette, Sparkles, ArrowUpRight } from "lucide-react";
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

export default function ServicesPreview() {
  const gridSpans = [
    "lg:col-span-2",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-2",
    "lg:col-span-1",
    "lg:col-span-2",
  ];

  return (
    <section className="w-full bg-[#080808] py-24 md:py-36 border-t border-white/5 relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-14 md:gap-16">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
            // WHAT I DO
          </span>
          <h2 className="font-space text-3xl md:text-5xl font-bold uppercase text-primary-text tracking-tight">
            Services & Expertise
          </h2>
          <p className="font-inter text-xs md:text-sm text-secondary-text mt-1 leading-relaxed">
            Tailored visual editing, motion design, and color grading designed for modern brands and creators.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, idx) => {
            const spanClass = gridSpans[idx] || "lg:col-span-1";
            return (
              <Link
                key={service.id}
                to="/services"
                className={`group glass-card glass-card-hover p-8 md:p-10 rounded-2xl flex flex-col justify-between min-h-[260px] ${spanClass}`}
              >
                {/* Top row */}
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-muted-text">
                    {service.id}
                  </span>
                  <div className="text-secondary-text group-hover:text-primary-accent group-hover:scale-110 transition-all duration-300">
                    <IconComponent name={service.iconName} size={28} strokeWidth={1.2} />
                  </div>
                </div>

                {/* Bottom content info */}
                <div className="flex flex-col gap-2 mt-8">
                  <div className="flex justify-between items-center">
                    <h3 className="font-space text-lg md:text-xl font-bold uppercase text-primary-text group-hover:text-primary-accent transition-colors">
                      {service.title}
                    </h3>
                    
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-secondary-text group-hover:bg-primary-accent group-hover:border-primary-accent group-hover:text-[#080808] transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  <p className="font-inter text-xs md:text-sm text-secondary-text leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <Link
            to="/services"
            className="group inline-flex items-center gap-3 font-space text-xs md:text-sm font-bold tracking-widest text-primary-text hover:text-primary-accent px-6 py-3 rounded-full border border-white/10 hover:border-primary-accent/50 glass-card transition-all uppercase"
          >
            <span>View All Service Breakdown</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

