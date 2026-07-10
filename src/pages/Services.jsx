import React from "react";
import { Link } from "react-router-dom";
import { Video, Smartphone, Layers, Palette, Sparkles, Check } from "lucide-react";
import PageTransition from "../components/PageTransition";
import MagneticButton from "../components/MagneticButton";
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

// Icon mapping helper
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
      <div className="w-full bg-[#080808] pt-32 pb-20 flex-grow">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-16">
          
          {/* Hero segment */}
          <div className="flex flex-col gap-3 max-w-2xl text-left">
            <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">
              CREATIVE CAPABILITIES
            </span>
            <h1 className="font-space text-4xl md:text-6xl font-bold uppercase text-[#F5F3EE] tracking-tight">
              Creative Services
            </h1>
            <p className="font-inter text-sm md:text-base text-secondary-text leading-relaxed">
              Visual solutions designed to capture attention, communicate clearly, and create impact. Bringing cinematic precision and dynamic editing templates to every project.
            </p>
          </div>

          {/* Detailed list blocks */}
          <div className="flex flex-col gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group w-full bg-[#111111] border border-default-border/60 hover:border-primary-accent/40 p-8 md:p-12 transition-all duration-300 flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-start"
              >
                {/* ID & Title */}
                <div className="flex gap-4 items-start lg:w-1/3 text-left">
                  <span className="font-mono text-xs text-primary-accent font-bold mt-1">
                    {service.id}
                  </span>
                  <div className="flex flex-col gap-2">
                    <div className="text-secondary-text group-hover:text-primary-accent transition-colors duration-300">
                      <IconComponent name={service.iconName} size={28} strokeWidth={1.2} />
                    </div>
                    <h3 className="font-space text-xl md:text-2xl font-bold uppercase text-[#F5F3EE] tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:w-1/3 text-left">
                  <p className="font-inter text-xs md:text-sm text-secondary-text leading-relaxed mt-1">
                    {service.description}
                  </p>
                </div>

                {/* Specific features checklist */}
                <div className="lg:w-1/3 w-full border-t lg:border-t-0 lg:border-l border-default-border/50 pt-6 lg:pt-0 lg:pl-12 text-left flex flex-col gap-2.5">
                  <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest mb-1.5">INCLUDES</span>
                  {service.details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check size={12} className="text-primary-accent flex-shrink-0" />
                      <span className="font-inter text-xs text-primary-text font-medium">{detail}</span>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

          {/* Footer Callout */}
          <div className="bg-[#111111] border border-default-border p-8 md:p-16 flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden">
            {/* Visual grid backing */}
            <div className="absolute inset-0 grid-lines opacity-[0.05] pointer-events-none" />
            
            <h3 className="font-space text-2xl md:text-4xl font-bold text-primary-text uppercase max-w-xl z-10 leading-tight">
              Ready to elevate your visual content?
            </h3>
            <p className="font-inter text-xs md:text-sm text-secondary-text max-w-md z-10">
              Let’s schedule a brief creative brief consultation to review editing objectives and timeline deadlines.
            </p>
            <Link to="/contact" className="z-10 mt-2">
              <MagneticButton className="px-8 py-3 bg-primary-accent hover:bg-accent-hover text-[#080808] font-inter text-xs font-bold tracking-widest uppercase transition-colors">
                DISCUSS YOUR PROJECT
              </MagneticButton>
            </Link>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
