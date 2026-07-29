import React from "react";
import PageTransition from "../components/PageTransition";
import { siteConfig } from "../config/siteConfig";
import { FileText, CheckCircle2, Clock, RefreshCw, Mail } from "lucide-react";

export default function TermsOfService() {
  return (
    <PageTransition>
      <div className="flex-grow pt-28 pb-20 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b border-black/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent)]/15 text-[var(--accent-deep)] rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <FileText size={14} />
            <span>Service Terms & Client Agreement</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B0B0B] uppercase">
            Terms of Service
          </h1>
          <p className="text-sm font-mono text-[var(--ink-soft)] mt-2">
            Effective Date: July 2026 • EditHub Creations / Tasnimul Rahat
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm text-[var(--ink)] leading-relaxed">
          <section className="bg-black/5 p-6 rounded-2xl border border-black/10">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase mb-3 text-[#0B0B0B] flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[var(--accent-deep)]" />
              1. Acceptance of Terms
            </h2>
            <p>
              By commissioning video editing, motion graphics, or post-production services from <strong>EditHub Creations</strong> (operated by <strong>Tasnimul Rahat</strong>), you agree to be bound by the terms outlined below. These terms ensure a smooth workflow and mutual clarity.
            </p>
          </section>

          <section>
            <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase mb-3 text-[#0B0B0B] flex items-center gap-2">
              <Clock size={18} className="text-[var(--accent-deep)]" />
              2. Turnaround & Deadlines
            </h2>
            <p className="text-[var(--ink-soft)]">
              Project deadlines are established prior to project launch upon receiving raw assets and brief specifications. Standard turnaround times range from 24 to 72 hours depending on video length and complexity. Rapid 24-hour expedited cuts are available upon request.
            </p>
          </section>

          <section>
            <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase mb-3 text-[#0B0B0B] flex items-center gap-2">
              <RefreshCw size={18} className="text-[var(--accent-deep)]" />
              3. Revision Policy
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-[var(--ink-soft)]">
              <li>
                <strong>Included Revisions:</strong> Every standard project package includes up to 2 rounds of minor revisions (e.g., text corrections, timing tweaks, or audio adjustments).
              </li>
              <li>
                <strong>Major Scope Changes:</strong> Fundamental script rewrites or complete footage replacements after project sign-off are billed at our standard rate per minute.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase mb-3 text-[#0B0B0B] flex items-center gap-2">
              <FileText size={18} className="text-[var(--accent-deep)]" />
              4. Payment & Delivery
            </h2>
            <p className="text-[var(--ink-soft)]">
              Final high-resolution master video files (1080p / 4K ProRes / MP4) are delivered upon receipt of full payment. Payment options include BDT bank transfer, Mobile Banking (bKash/Nagad), or international transfers as agreed upon.
            </p>
          </section>

          <section className="border-t border-black/10 pt-8 mt-10">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase mb-3 text-[#0B0B0B] flex items-center gap-2">
              <Mail size={18} className="text-[var(--accent-deep)]" />
              5. Support & Contact
            </h2>
            <p className="text-[var(--ink-soft)]">
              For any questions regarding project terms or contract modifications, reach out anytime:
            </p>
            <div className="mt-4 p-4 bg-[var(--accent)]/10 rounded-xl font-mono text-xs text-[#0B0B0B] space-y-1">
              <p><strong>Owner:</strong> Tasnimul Rahat (EditHub Creations)</p>
              <p><strong>Email:</strong> {siteConfig.email}</p>
              <p><strong>WhatsApp:</strong> {siteConfig.phone}</p>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
