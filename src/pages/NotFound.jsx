import React from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import MagneticButton from "../components/MagneticButton";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
        {/* Aesthetic background grid */}
        <div className="absolute inset-0 grid-lines opacity-[0.1] pointer-events-none" />
        
        {/* Background text decoration */}
        <div className="absolute font-space text-[25vw] font-bold text-default-border/10 leading-none select-none z-0">
          404
        </div>

        {/* Content panel */}
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="font-mono text-xs text-primary-accent uppercase tracking-widest">
            [ ERROR 404 ]
          </div>
          <h1 className="font-space text-4xl md:text-6xl font-bold text-[#F5F3EE] uppercase tracking-tight">
            FRAME NOT FOUND
          </h1>
          <p className="font-inter text-sm text-secondary-text max-w-sm leading-relaxed mb-6">
            The scene you are looking for does not exist on this editing track. It might have been trimmed or cut.
          </p>
          <Link to="/">
            <MagneticButton className="px-8 py-3 bg-[#F5F3EE] hover:bg-[#F5F3EE]/90 text-[#080808] font-inter text-xs font-bold tracking-widest uppercase transition-colors">
              RETURN HOME
            </MagneticButton>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
