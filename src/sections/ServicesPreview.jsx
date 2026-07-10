import React from "react";
import { Link } from "react-router-dom";
import { Video, Smartphone, Layers, Palette, Sparkles, ArrowUpRight } from "lucide-react";
import { services } from "../data/services";

// Custom SVG Youtube component (since Lucide v0.470+ removed brand icons)
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

// Dynamic Icon Mapper
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
  // Configured grid span mappings for bento layout on desktop
  const gridSpans = [
    "lg:col-span-2", // Video Editing (wide)
    "lg:col-span-1", // Reels & Shorts (standard)
    "lg:col-span-1", // YouTube (standard)
    "lg:col-span-2", // Motion Graphics (wide)
    "lg:col-span-1", // Graphic Design (standard)
    "lg:col-span-2", // Brand Identity (wide)
  ];

  return (
    <section className="w-full bg-[#080808] py-20 md:py-32 border-t border-default-border/60">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-12 md:gap-16">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">
            CREATIVE SERVICES
          </span>
          <h2 className="font-space text-3xl md:text-5xl font-bold uppercase text-[#F5F3EE]">
            Bespoke Visual Solutions
          </h2>
          <p className="font-inter text-xs md:text-sm text-secondary-text mt-2 leading-relaxed">
            Delivering cinematic polish and motion design tailored to make brands memorable, increase watch time, and optimize engagement.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const spanClass = gridSpans[idx] || "lg:col-span-1";
            return (
              <Link
                key={service.id}
                to="/services"
                className={`group relative flex flex-col justify-between p-8 bg-[#111111] border border-default-border hover:border-primary-accent transition-all duration-500 overflow-hidden min-h-[280px] ${spanClass}`}
              >
                {/* Visual texture overlay - subtle grid reveal on hover */}
                <div className="absolute inset-0 grid-lines opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" />

                {/* Top row */}
                <div className="flex justify-between items-start z-10">
                  <span className="font-mono text-xs text-muted-text">
                    {service.id}
                  </span>
                  <div className="text-secondary-text group-hover:text-primary-accent group-hover:rotate-12 transition-transform duration-500">
                    <IconComponent name={service.iconName} size={28} strokeWidth={1.2} />
                  </div>
                </div>

                {/* Bottom content info */}
                <div className="flex flex-col gap-3 mt-12 z-10">
                  <div className="flex justify-between items-center">
                    <h3 className="font-space text-lg md:text-xl font-bold uppercase text-[#F5F3EE] group-hover:text-primary-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Bento arrow action */}
                    <div className="w-7 h-7 rounded-full border border-default-border flex items-center justify-center text-secondary-text group-hover:bg-primary-accent group-hover:border-primary-accent group-hover:text-[#080808] transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight size={12} />
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
        <div className="flex justify-center mt-4">
          <Link
            to="/services"
            className="font-mono text-xs tracking-widest text-[#F5F3EE] hover:text-primary-accent border-b border-[#F5F3EE] hover:border-primary-accent pb-1 transition-colors uppercase"
          >
            DISCOVER ALL DETAILS [→]
          </Link>
        </div>

      </div>
    </section>
  );
}
