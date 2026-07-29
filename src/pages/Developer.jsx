import React from "react";
import { Globe, Mail, MessageSquare, Laptop, Code } from "lucide-react";
import PageTransition from "../components/PageTransition";

export default function Developer() {
  return (
    <PageTransition>
      <div className="w-full bg-[var(--bg)] pt-28 pb-24 flex-grow text-left">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex flex-col gap-3 max-w-3xl mb-12">
            <span className="eyebrow">
              <span className="dot"></span> Creators &amp; Partners
            </span>
            <h1 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold uppercase text-[var(--ink)] tracking-tight">
              Behind The Code
            </h1>
            <p className="font-[var(--font-body)] text-sm text-[var(--ink-soft)] leading-relaxed">
              This portfolio was crafted with high-performance web architecture and bespoke aesthetic styling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Developer Card */}
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-lg)] p-8 shadow-sm flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="eyebrow">
                    <Code size={12} /> CHIEF WEB ARCHITECT
                  </span>
                  <div className="p-2.5 bg-[var(--surface-2)] rounded-full text-[var(--ink)]">
                    <Laptop size={18} />
                  </div>
                </div>

                <h2 className="font-[var(--font-display)] text-2xl font-bold text-[var(--ink)]">
                  Salah Uddin Kader
                </h2>

                <p className="font-[var(--font-body)] text-xs md:text-sm text-[var(--ink-soft)] leading-relaxed">
                  Salah Uddin is a web developer specializing in high-performance React application engineering, smooth animations, and tailored UI systems.
                </p>

                <div className="flex flex-col gap-2 font-mono text-xs text-[var(--ink-soft)] border-t border-[var(--line)] pt-4 mt-2">
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-[var(--accent-deep)]" />
                    <span>Website:</span>
                    <a href="https://salahuddin.codes" target="_blank" rel="noopener noreferrer" className="text-[var(--ink)] font-semibold hover:underline">
                      salahuddin.codes
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[var(--accent-deep)]" />
                    <span>Email:</span>
                    <a href="mailto:salauddinkaderappy@gmail.com" className="text-[var(--ink)] font-semibold hover:underline">
                      salauddinkaderappy@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={14} className="text-[var(--accent-deep)]" />
                    <span>WhatsApp:</span>
                    <a href="https://wa.me/8801851075537" target="_blank" rel="noopener noreferrer" className="text-[var(--ink)] font-semibold hover:underline">
                      +880 1851-075537
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Agency Card */}
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-lg)] p-8 shadow-sm flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="eyebrow">
                    <Globe size={12} /> CREATIVE STUDIO
                  </span>
                  <div className="p-2.5 bg-[var(--surface-2)] rounded-full text-[var(--ink)]">
                    <Globe size={18} />
                  </div>
                </div>

                <h2 className="font-[var(--font-display)] text-2xl font-bold text-[var(--ink)]">
                  Nextora Studio
                </h2>

                <p className="font-[var(--font-body)] text-xs md:text-sm text-[var(--ink-soft)] leading-relaxed">
                  Nextora Studio is a digital studio engineering user experiences, custom web applications, and brand identities for creators worldwide.
                </p>

                <div className="flex flex-col gap-2 font-mono text-xs text-[var(--ink-soft)] border-t border-[var(--line)] pt-4 mt-2">
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-[var(--accent-deep)]" />
                    <span>Website:</span>
                    <a href="https://nextorastudio.tech" target="_blank" rel="noopener noreferrer" className="text-[var(--ink)] font-semibold hover:underline">
                      nextorastudio.tech
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[var(--accent-deep)]" />
                    <span>Inquiries:</span>
                    <span className="text-[var(--ink)] font-semibold">hello@nextorastudio.tech</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href="/" className="btn btn-accent">
              RETURN TO WORKSPACE →
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
