import React from "react";
import PageTransition from "../components/PageTransition";
import { siteConfig } from "../config/siteConfig";
import { ShieldCheck, Lock, Eye, FileText, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <div className="flex-grow pt-28 pb-20 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b border-black/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent)]/15 text-[var(--accent-deep)] rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} />
            <span>Legal & Data Security</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B0B0B] uppercase">
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-[var(--ink-soft)] mt-2">
            Last Updated: July 2026 • EditHub Creations / Tasnimul Rahat
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm text-[var(--ink)] leading-relaxed">
          <section className="bg-black/5 p-6 rounded-2xl border border-black/10">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase mb-3 text-[#0B0B0B] flex items-center gap-2">
              <Lock size={18} className="text-[var(--accent-deep)]" />
              1. Overview & Commitment
            </h2>
            <p>
              At <strong>EditHub Creations</strong> (operated by <strong>Tasnimul Rahat</strong>), we value your trust and are strictly committed to protecting the privacy and confidentiality of your personal information and project assets. This Privacy Policy outlines how we handle data collected through our website, contact forms, and client project communications.
            </p>
          </section>

          <section>
            <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase mb-3 text-[#0B0B0B] flex items-center gap-2">
              <Eye size={18} className="text-[var(--accent-deep)]" />
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-[var(--ink-soft)]">
              <li>
                <strong>Contact Details:</strong> Your name, email address, phone number, or WhatsApp contact provided via booking forms.
              </li>
              <li>
                <strong>Project Media & Assets:</strong> Unedited video footage, audio recordings, brand guidelines, and scripts shared via Google Drive or file transfer services.
              </li>
              <li>
                <strong>Technical Analytics:</strong> Anonymized browser information, device type, and visit duration used strictly to optimize page loading performance.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase mb-3 text-[#0B0B0B] flex items-center gap-2">
              <FileText size={18} className="text-[var(--accent-deep)]" />
              3. Confidentiality & Non-Disclosure (NDA)
            </h2>
            <p className="text-[var(--ink-soft)]">
              All raw footage, unreleased project media, audio files, and scripts uploaded or transferred to <strong>Tasnimul Rahat</strong> are treated as strictly confidential. We do not sell, rent, or distribute client footage to third parties. Pre-release marketing materials remain private under mutual confidentiality guidelines.
            </p>
          </section>

          <section>
            <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase mb-3 text-[#0B0B0B] flex items-center gap-2">
              <ShieldCheck size={18} className="text-[var(--accent-deep)]" />
              4. Media Rights & Portfolio Usage
            </h2>
            <p className="text-[var(--ink-soft)]">
              Upon final delivery and full payment of a project, EditHub Creations reserves the right to feature short highlights or excerpt thumbnails of published edits in our professional portfolio showcase, unless a Non-Disclosure Agreement (NDA) is explicitly requested prior to project execution.
            </p>
          </section>

          <section className="border-t border-black/10 pt-8 mt-10">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase mb-3 text-[#0B0B0B] flex items-center gap-2">
              <Mail size={18} className="text-[var(--accent-deep)]" />
              5. Contact Us
            </h2>
            <p className="text-[var(--ink-soft)]">
              If you have any questions regarding this Privacy Policy or wish to request data deletion, please contact us directly:
            </p>
            <div className="mt-4 p-4 bg-[var(--accent)]/10 rounded-xl font-mono text-xs text-[#0B0B0B] space-y-1">
              <p><strong>Owner:</strong> Tasnimul Rahat (EditHub Creations)</p>
              <p><strong>Email:</strong> {siteConfig.email}</p>
              <p><strong>WhatsApp:</strong> {siteConfig.phone}</p>
              <p><strong>Location:</strong> Dhaka, Bangladesh</p>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
