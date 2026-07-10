import React from "react";
import { 
  Github, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Globe, 
  Mail, 
  MessageSquare, 
  Sparkles, 
  ExternalLink,
  Laptop,
  Code
} from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import MagneticButton from "../components/MagneticButton";

export default function Developer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const developerSocials = [
    { name: "GitHub", url: "https://github.com/salahuddingfx", icon: <Github size={16} /> },
    { name: "LinkedIn", url: "https://linkedin.com/in/salahuddingfx", icon: <Linkedin size={16} /> },
    { name: "Instagram", url: "https://instagram.com/salahuddingfx", icon: <Instagram size={16} /> },
    { name: "Facebook", url: "https://facebook.com/salahuddingfx", icon: <Facebook size={16} /> },
  ];

  const agencySocials = [
    { name: "Instagram", url: "https://instagram.com/nextorastudio", icon: <Instagram size={16} /> },
    { name: "LinkedIn", url: "https://linkedin.com/company/nextorastudio", icon: <Linkedin size={16} /> },
    { name: "Facebook", url: "https://facebook.com/nextorastudio", icon: <Facebook size={16} /> },
    { name: "GitHub", url: "https://github.com/nextorastudio", icon: <Github size={16} /> },
  ];

  return (
    <PageTransition>
      <div className="w-full bg-[#080808] pt-32 pb-24 flex-grow text-left relative overflow-hidden select-none">
        {/* Editorial Background Grid Lines */}
        <div className="absolute inset-0 grid-lines opacity-[0.06] pointer-events-none" />
        
        {/* Subtle decorative radial lights */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-primary-accent/5 filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-primary-accent/3 filter blur-[120px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          
          {/* Header Introduction */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 max-w-4xl mb-16 md:mb-24"
          >
            <span className="font-mono text-xs text-primary-accent uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={12} className="animate-pulse" />
              [ PORTFOLIO CREATORS & CREATIVE PARTNERS ]
            </span>
            <h1 className="font-space text-4xl sm:text-6xl md:text-8xl font-bold uppercase text-[#F5F3EE] tracking-tight leading-none">
              BEHIND THE CODE
            </h1>
            <p className="font-inter text-sm md:text-base text-secondary-text max-w-2xl mt-4 leading-relaxed">
              This cinematic digital workspace was crafted with premium engineering and meticulous aesthetics.
              Meet the developer and creative agency driving the technology.
            </p>
          </motion.div>

          {/* Developers Profile Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12"
          >
            
            {/* Developer Card - Salah Uddin Kader */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-6 bg-secondary-bg/40 border border-default-border/60 backdrop-blur-md p-8 md:p-10 flex flex-col justify-between hover:border-primary-accent/55 transition-all duration-500 rounded-lg group relative overflow-hidden"
            >
              {/* Highlight bar hover effect */}
              <div className="absolute left-0 top-0 w-[2px] h-0 bg-primary-accent group-hover:h-full transition-all duration-500" />
              
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-primary-accent uppercase tracking-wider flex items-center gap-1.5">
                      <Code size={10} />
                      CHIEF WEB ARCHITECT
                    </span>
                    <h2 className="font-space text-3xl font-bold text-[#F5F3EE] uppercase tracking-tight group-hover:text-primary-accent transition-colors duration-300">
                      Salah Uddin Kader
                    </h2>
                  </div>
                  <div className="p-3 bg-elevated-surface border border-default-border rounded-full text-secondary-text group-hover:text-[#080808] group-hover:bg-[#F5F3EE] transition-all duration-300">
                    <Laptop size={18} />
                  </div>
                </div>

                <p className="font-inter text-xs md:text-sm text-secondary-text leading-relaxed">
                  Salah Uddin is an expert web designer & development specialist. Focused on building highly optimized React environments, fluid WebGL graphics, framer-motion structures, and high-performance editorial portfolios.
                </p>

                <div className="flex flex-col gap-3 font-mono text-xs text-secondary-text border-t border-default-border/50 pt-6 mt-4">
                  <div className="flex items-center gap-3">
                    <Globe size={14} className="text-muted-text" />
                    <span>Website:</span>
                    <a 
                      href="https://salahuddin.codes" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-text hover:text-primary-accent transition-colors font-medium flex items-center gap-1"
                    >
                      salahuddin.codes <ExternalLink size={10} />
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="text-muted-text" />
                    <span>Email:</span>
                    <a 
                      href="mailto:salauddinkaderappy@gmail.com" 
                      className="text-primary-text hover:text-primary-accent transition-colors font-medium"
                    >
                      salauddinkaderappy@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare size={14} className="text-muted-text" />
                    <span>WhatsApp:</span>
                    <a 
                      href="https://wa.me/8801851075537" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-text hover:text-primary-accent transition-colors font-medium"
                    >
                      +880 1851-075537
                    </a>
                  </div>
                </div>
              </div>

              {/* Developer Social Links */}
              <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-default-border/30">
                {developerSocials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#080808] border border-default-border/60 hover:border-primary-accent text-secondary-text hover:text-[#F5F3EE] font-mono text-[10px] uppercase tracking-wider rounded transition-all duration-300"
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Agency Card - Nextora Studio */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-6 bg-secondary-bg/40 border border-default-border/60 backdrop-blur-md p-8 md:p-10 flex flex-col justify-between hover:border-primary-accent/55 transition-all duration-500 rounded-lg group relative overflow-hidden"
            >
              {/* Highlight bar hover effect */}
              <div className="absolute left-0 top-0 w-[2px] h-0 bg-primary-accent group-hover:h-full transition-all duration-500" />

              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-primary-accent uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={10} />
                      CREATIVE DIGITAL STUDIO
                    </span>
                    <h2 className="font-space text-3xl font-bold text-[#F5F3EE] uppercase tracking-tight group-hover:text-primary-accent transition-colors duration-300">
                      Nextora Studio
                    </h2>
                  </div>
                  <div className="p-3 bg-elevated-surface border border-default-border rounded-full text-secondary-text group-hover:text-[#080808] group-hover:bg-[#F5F3EE] transition-all duration-300">
                    <Globe size={18} />
                  </div>
                </div>

                <p className="font-inter text-xs md:text-sm text-secondary-text leading-relaxed">
                  Nextora Studio is a bespoke digital design agency specializing in ultra-premium user interfaces, state-of-the-art interactive graphics, branding guidelines, and flawless application engineering for international studios.
                </p>

                <div className="flex flex-col gap-3 font-mono text-xs text-secondary-text border-t border-default-border/50 pt-6 mt-4">
                  <div className="flex items-center gap-3">
                    <Globe size={14} className="text-muted-text" />
                    <span>Website:</span>
                    <a 
                      href="https://nextorastudio.tech" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-text hover:text-primary-accent transition-colors font-medium flex items-center gap-1"
                    >
                      nextorastudio.tech <ExternalLink size={10} />
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="text-muted-text" />
                    <span>Inquiries:</span>
                    <span className="text-primary-text font-medium">
                      hello@nextorastudio.tech
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles size={14} className="text-muted-text" />
                    <span>Focus:</span>
                    <span className="text-primary-text font-medium">
                      UI/UX Design // Front-end Architecture
                    </span>
                  </div>
                </div>
              </div>

              {/* Agency Social Links */}
              <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-default-border/30">
                {agencySocials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#080808] border border-default-border/60 hover:border-primary-accent text-secondary-text hover:text-[#F5F3EE] font-mono text-[10px] uppercase tracking-wider rounded transition-all duration-300"
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* Quick Action Button to return Home */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-16 text-center"
          >
            <a href="/">
              <MagneticButton className="px-8 py-3.5 bg-[#F5F3EE] hover:bg-[#F5F3EE]/90 text-[#080808] font-inter text-xs font-bold tracking-widest uppercase transition-colors">
                RETURN TO WORKSPACE
              </MagneticButton>
            </a>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}
