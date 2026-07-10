import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export default function Footer() {
  return (
    <footer className="w-full bg-[#080808] border-t border-default-border/60 py-16 md:py-24 relative overflow-hidden">
      {/* Editorial Backdrop Accent Grid Line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-default-border to-transparent" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-16 md:gap-20">
        
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          
          {/* Logo & Subtitle */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <Link to="/" className="font-space text-2xl font-bold tracking-widest text-[#F5F3EE] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-accent" />
              VANCE
            </Link>
            <p className="font-inter text-xs text-secondary-text tracking-widest uppercase max-w-xs leading-relaxed">
              Video Editor & Visual Designer
            </p>
            {siteConfig.availableForWork && (
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-status-success" />
                <span className="font-mono text-[10px] text-secondary-text tracking-wider uppercase">AVAILABLE FOR SELECT PROJECTS</span>
              </div>
            )}
          </div>

          {/* Navigation links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-mono text-[10px] text-muted-text tracking-widest uppercase">NAVIGATION</span>
            <div className="flex flex-col gap-2.5">
              <Link to="/about" className="font-inter text-xs tracking-wider font-semibold text-secondary-text hover:text-primary-accent transition-colors w-fit">ABOUT THE CREATOR</Link>
              <Link to="/work" className="font-inter text-xs tracking-wider font-semibold text-secondary-text hover:text-primary-accent transition-colors w-fit">SELECTED WORK</Link>
              <Link to="/services" className="font-inter text-xs tracking-wider font-semibold text-secondary-text hover:text-primary-accent transition-colors w-fit">CREATIVE SERVICES</Link>
              <Link to="/contact" className="font-inter text-xs tracking-wider font-semibold text-secondary-text hover:text-primary-accent transition-colors w-fit">START A PROJECT</Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-mono text-[10px] text-muted-text tracking-widest uppercase">SOCIAL PLUGS</span>
            <div className="flex flex-col gap-2.5">
              {Object.entries(siteConfig.socials).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-xs tracking-wider font-semibold text-secondary-text hover:text-primary-accent uppercase transition-colors w-fit"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Big Decorative text */}
        <div className="w-full text-center py-6 select-none opacity-[0.03]">
          <h1 className="font-space text-[12vw] font-bold leading-none tracking-tighter text-[#F5F3EE]">
            CREATE
          </h1>
        </div>

        {/* Footer Bottom Metadata */}
        <div className="border-t border-default-border/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="font-mono text-[10px] text-muted-text">
            © {new Date().getFullYear()} ALEXANDER VANCE. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[10px] text-muted-text tracking-wider">
            CINEMATIC POST PRODUCTION AGENT
          </p>
        </div>

      </div>
    </footer>
  );
}
