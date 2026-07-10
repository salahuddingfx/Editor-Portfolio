import React from "react";
import { Link } from "react-router-dom";
import { Clapperboard, Layers, Palette, Image, PenTool, LayoutGrid, Download, Briefcase, Calendar } from "lucide-react";
import PageTransition from "../components/PageTransition";
import MagneticButton from "../components/MagneticButton";
import { siteConfig } from "../config/siteConfig";
import { skills } from "../data/skills";
import { experience } from "../data/experience";

// Dynamic Icon Component mapping
const SkillIcon = ({ name, ...props }) => {
  switch (name) {
    case "Clapperboard": return <Clapperboard {...props} />;
    case "Layers": return <Layers {...props} />;
    case "Palette": return <Palette {...props} />;
    case "Image": return <Image {...props} />;
    case "PenTool": return <PenTool {...props} />;
    case "Framer": return <LayoutGrid {...props} />;
    default: return <Layers {...props} />;
  }
};


export default function About() {
  // Configured local resume URL check (renders only if configured)
  const resumeConfigured = siteConfig.resumeUrl || "/resume-placeholder.pdf";

  return (
    <PageTransition>
      <div className="w-full bg-[#080808] pt-32 pb-20 flex-grow text-left">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-16 md:gap-24">
          
          {/* Section Hero & Bio Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
            
            {/* Left Big Typography */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">
                THE STORYTELLER
              </span>
              <h1 className="font-space text-4xl md:text-6xl font-bold uppercase text-[#F5F3EE] tracking-tight leading-none">
                Alexander Vance
              </h1>
              <span className="font-mono text-xs text-muted-text uppercase tracking-widest mt-1">
                Video Editor // Designer // Storyteller
              </span>
              
              {/* Optional Portrait Frame */}
              <div className="w-full aspect-[4/3] md:aspect-video border border-default-border overflow-hidden bg-secondary-bg mt-6">
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80" 
                  alt="Alexander Vance studio workstation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Biography */}
            <div className="lg:col-span-7 flex flex-col gap-6 pt-4 lg:pt-8">
              <h2 className="font-space text-2xl md:text-3xl font-bold uppercase text-primary-text">
                Crafting narratives through precision cuts & kinetic design.
              </h2>
              
              <div className="flex flex-col gap-4 text-secondary-text font-inter text-sm md:text-base leading-relaxed">
                <p>
                  I am a passionate Video Editor & Motion Graphics Designer committed to helping brands translate complex ideas into visually spectacular digital experiences. My editing practice centers on narrative structure, pacing rhythm, clean visual composition, and cinematic grading profiles.
                </p>
                <p>
                  Over my career, I’ve had the privilege of collaborating with creative agencies, luxury fashion houses, automotive brands, and fast-growing YouTube channels. I treat every project as a unique creative challenge, tailoring the pacing structure to maximize retention and drive client conversions.
                </p>
                <p>
                  Outside of client commissions, I actively research vintage film emulation models, compile ambient sound libraries, and design custom broadcast motion graphics assets.
                </p>
              </div>

              {/* Resume download button if configured */}
              {resumeConfigured && (
                <div className="mt-4">
                  <a href={resumeConfigured} download="Alexander_Vance_Resume.pdf">
                    <MagneticButton className="px-6 py-3 border border-default-border hover:border-primary-accent hover:text-primary-accent font-inter text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2">
                      <Download size={14} />
                      DOWNLOAD RÉSUMÉ
                    </MagneticButton>
                  </a>
                </div>
              )}
            </div>

          </div>

          {/* Interactive Software Cards Panel */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">TECHNICAL TOOLKIT</span>
              <h2 className="font-space text-2xl md:text-4xl font-bold uppercase text-primary-text tracking-tight">
                Software Stack & Expertise
              </h2>
              <p className="font-inter text-xs md:text-sm text-secondary-text leading-relaxed mt-1">
                High-end post production demands native proficiency with key tools. No generic progress bar indicators—just professional execution parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="group relative bg-[#111111] border border-default-border/60 hover:border-primary-accent/40 p-6 md:p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300"
                >
                  {/* Top line with Icon & Category info */}
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-[#080808] border border-default-border/40 text-secondary-text group-hover:text-primary-accent group-hover:rotate-6 transition-all duration-300">
                      <SkillIcon name={skill.iconName} size={20} strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-[9px] text-primary-accent tracking-wider font-semibold bg-primary-accent/5 border border-primary-accent/10 px-2.5 py-0.5">
                      {skill.experience}
                    </span>
                  </div>

                  {/* Body details */}
                  <div className="flex flex-col gap-2 mt-8">
                    <h3 className="font-space text-lg font-bold text-primary-text group-hover:text-primary-accent transition-colors duration-300 uppercase">
                      {skill.name}
                    </h3>
                    <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest">
                      PRIMARY USE: {skill.category}
                    </span>
                    <p className="font-inter text-xs text-secondary-text leading-relaxed mt-1">
                      {skill.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career History Experience Timeline */}
          <div className="flex flex-col gap-8 max-w-4xl">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">CAREER PATHWAY</span>
              <h2 className="font-space text-2xl md:text-4xl font-bold uppercase text-primary-text tracking-tight">
                Work Experience & Timeline
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {experience.map((job) => (
                <div
                  key={job.id}
                  className="group bg-[#111111] border border-default-border/60 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 justify-between items-start hover:border-default-border transition-colors duration-300"
                >
                  {/* Left Column Year & Role */}
                  <div className="flex flex-col gap-1.5 md:w-1/3">
                    <div className="flex items-center gap-2 text-primary-accent font-mono text-[10px] tracking-wider font-bold">
                      <Calendar size={12} />
                      <span>{job.year}</span>
                    </div>
                    <h3 className="font-space text-lg font-bold text-primary-text uppercase tracking-tight">
                      {job.role}
                    </h3>
                    <span className="font-mono text-[10px] text-muted-text uppercase tracking-widest">
                      {job.company}
                    </span>
                  </div>

                  {/* Right Column Description */}
                  <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-default-border/40 pt-4 md:pt-0 md:pl-8 text-left">
                    <p className="font-inter text-xs md:text-sm text-secondary-text leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="flex flex-col gap-8 max-w-4xl">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">HONORS & MILESTONES</span>
              <h2 className="font-space text-2xl md:text-4xl font-bold uppercase text-primary-text tracking-tight">
                Key Achievements
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111111] border border-default-border/60 p-6 flex flex-col gap-3">
                <span className="font-mono text-[10px] text-primary-accent font-bold">// FESTIVAL HONOR</span>
                <h3 className="font-space text-base font-bold text-[#F5F3EE] uppercase">
                  Best Commercial Edit (2025)
                </h3>
                <p className="font-inter text-xs text-secondary-text leading-relaxed">
                  Awarded by the NYC Design Film Festival for the edit and visual pacing on the Aurora Haute Couture Campaign.
                </p>
              </div>

              <div className="bg-[#111111] border border-default-border/60 p-6 flex flex-col gap-3">
                <span className="font-mono text-[10px] text-primary-accent font-bold">// RETENTION RECORD</span>
                <h3 className="font-space text-base font-bold text-[#F5F3EE] uppercase">
                  10 Million+ Viewer Engagement
                </h3>
                <p className="font-inter text-xs text-secondary-text leading-relaxed">
                  Generated across TikTok, Reels, and YT Shorts platforms for independent creators and commercial digital channels in 2025.
                </p>
              </div>

              <div className="bg-[#111111] border border-default-border/60 p-6 flex flex-col gap-3">
                <span className="font-mono text-[10px] text-primary-accent font-bold">// BRAND DESIGN COLLAB</span>
                <h3 className="font-space text-base font-bold text-[#F5F3EE] uppercase">
                  Vanguard Car Launch Visuals
                </h3>
                <p className="font-inter text-xs text-secondary-text leading-relaxed">
                  Crafted custom 3D telemetry panels and telemetry motion designs for the Vanguard Electric Supercar world debut in Munich.
                </p>
              </div>

              <div className="bg-[#111111] border border-default-border/60 p-6 flex flex-col gap-3">
                <span className="font-mono text-[10px] text-primary-accent font-bold">// EXPERT ACCREDITATION</span>
                <h3 className="font-space text-base font-bold text-[#F5F3EE] uppercase">
                  Certified DaVinci Color Specialist
                </h3>
                <p className="font-inter text-xs text-secondary-text leading-relaxed">
                  Accredited colorist specializing in HDR grading, raw log matching, film-grain composition, and Kodak film emulations.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
