import React, { useState } from "react";
import { Mail, Phone, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";
import PageTransition from "../components/PageTransition";
import MagneticButton from "../components/MagneticButton";
import { siteConfig } from "../config/siteConfig";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "Video Editing",
    budget: siteConfig.budgets[0]?.value || "",
    timeline: siteConfig.timelines[0]?.value || "",
    description: "",
    botcheck: "" // Honeypot spam protection
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("IDLE"); // "IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Your Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please provide a valid email address.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Please tell me a little about your project.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check honeypot
    if (formData.botcheck) {
      console.warn("Honeypot triggered, submission ignored.");
      setStatus("SUCCESS");
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setStatus("SUBMITTING");

    // Check if a valid Web3Forms access key is configured
    // If not, we will simulate a successful send for offline development purposes
    const accessKey = siteConfig.web3FormsKey || "YOUR_ACCESS_KEY_HERE";

    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      // Simulate network request delays
      setTimeout(() => {
        setStatus("SUCCESS");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "Video Editing",
          budget: siteConfig.budgets[0]?.value || "",
          timeline: siteConfig.timelines[0]?.value || "",
          description: "",
          botcheck: ""
        });
      }, 1500);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Project Request from ${formData.name}`,
          ...formData
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus("SUCCESS");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "Video Editing",
          budget: siteConfig.budgets[0]?.value || "",
          timeline: siteConfig.timelines[0]?.value || "",
          description: "",
          botcheck: ""
        });
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      console.error("Web3Forms submission failed: ", error);
      setStatus("ERROR");
    }
  };

  return (
    <PageTransition>
      <div className="w-full bg-[#080808] pt-32 pb-20 flex-grow text-left">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column Description details */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase">
                INQUIRY FORM
              </span>
              <h1 className="font-space text-4xl md:text-6xl font-bold uppercase text-[#F5F3EE] tracking-tight">
                Let’s Create Together.
              </h1>
              <p className="font-inter text-sm md:text-base text-secondary-text leading-relaxed mt-2">
                Tell me about your idea, project objectives, timeline deadlines, and custom budget constraints.
              </p>
            </div>

            {/* Quick Contacts details */}
            <div className="flex flex-col gap-6 pt-4 border-t border-default-border/60">
              <span className="font-mono text-[10px] text-muted-text tracking-widest uppercase">DIRECT CONTACTS</span>
              
              <div className="flex flex-col gap-4">
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-secondary-text hover:text-primary-accent transition-colors group">
                  <div className="p-2.5 bg-[#111111] border border-default-border text-secondary-text group-hover:text-primary-accent transition-all">
                    <Mail size={16} />
                  </div>
                  <span className="font-inter text-sm font-medium">{siteConfig.email}</span>
                </a>

                {siteConfig.phone && (
                  <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-secondary-text hover:text-primary-accent transition-colors group">
                    <div className="p-2.5 bg-[#111111] border border-default-border text-secondary-text group-hover:text-primary-accent transition-all">
                      <Phone size={16} />
                    </div>
                    <span className="font-inter text-sm font-medium">{siteConfig.phone}</span>
                  </a>
                )}

                {siteConfig.whatsapp && (
                  <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-secondary-text hover:text-primary-accent transition-colors group">
                    <div className="p-2.5 bg-[#111111] border border-default-border text-secondary-text group-hover:text-primary-accent transition-all">
                      <MessageSquare size={16} />
                    </div>
                    <span className="font-inter text-sm font-medium">CHAT ON WHATSAPP</span>
                  </a>
                )}
              </div>
            </div>

            {/* Social channels */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] text-muted-text tracking-widest uppercase">SOCIAL PLATES</span>
              <div className="flex flex-wrap gap-4">
                {Object.entries(siteConfig.socials).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-secondary-text hover:text-primary-accent transition-colors uppercase border border-default-border/60 hover:border-primary-accent px-3.5 py-1.5 bg-[#111111]"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Form (col-span 7) */}
          <div className="lg:col-span-7 bg-[#111111] border border-default-border p-8 md:p-12 relative overflow-hidden">
            
            {status === "SUCCESS" ? (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                <CheckCircle2 size={56} className="text-status-success animate-pulse" />
                <h3 className="font-space text-2xl font-bold uppercase text-[#F5F3EE] mt-2">
                  PROJECT REQUEST RECEIVED
                </h3>
                <p className="font-inter text-sm text-secondary-text max-w-sm leading-relaxed">
                  Thank you for submitting your brief! I will review your project parameters and contact you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("IDLE")}
                  className="mt-6 font-mono text-xs text-primary-accent border-b border-primary-accent pb-0.5 hover:text-accent-hover transition-colors"
                >
                  SEND ANOTHER BRIEF
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="botcheck"
                  value={formData.botcheck}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-mono text-[10px] text-muted-text uppercase tracking-widest">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-[#080808] border p-3 font-inter text-xs text-[#F5F3EE] focus:outline-none focus:border-primary-accent transition-colors ${
                        errors.name ? "border-primary-accent" : "border-default-border"
                      }`}
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && (
                      <span className="font-inter text-[10px] text-primary-accent mt-0.5">{errors.name}</span>
                    )}
                  </div>

                  {/* Email address field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-mono text-[10px] text-muted-text uppercase tracking-widest">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-[#080808] border p-3 font-inter text-xs text-[#F5F3EE] focus:outline-none focus:border-primary-accent transition-colors ${
                        errors.email ? "border-primary-accent" : "border-default-border"
                      }`}
                      placeholder="e.g. john@brand.com"
                    />
                    {errors.email && (
                      <span className="font-inter text-[10px] text-primary-accent mt-0.5">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone number field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="font-mono text-[10px] text-muted-text uppercase tracking-widest">
                      PHONE NUMBER (OPTIONAL)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#080808] border border-default-border p-3 font-inter text-xs text-[#F5F3EE] focus:outline-none focus:border-primary-accent transition-colors"
                      placeholder="e.g. +1 555-019-3829"
                    />
                  </div>

                  {/* Company name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="font-mono text-[10px] text-muted-text uppercase tracking-widest">
                      COMPANY OR BRAND (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-[#080808] border border-default-border p-3 font-inter text-xs text-[#F5F3EE] focus:outline-none focus:border-primary-accent transition-colors"
                      placeholder="e.g. Apple Inc."
                    />
                  </div>
                </div>

                {/* Project type select */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="projectType" className="font-mono text-[10px] text-muted-text uppercase tracking-widest">
                    PROJECT TYPE
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-[#080808] border border-default-border p-3 font-inter text-xs text-[#F5F3EE] focus:outline-none focus:border-primary-accent transition-colors cursor-pointer"
                  >
                    <option value="Video Editing">VIDEO EDITING</option>
                    <option value="Reels & Shorts">REELS & SHORTS (SHORT-FORM)</option>
                    <option value="YouTube Editing">YOUTUBE CONTENT EDITING</option>
                    <option value="Motion Graphics">MOTION GRAPHICS & VFX</option>
                    <option value="Graphic Design">GRAPHIC DESIGN / THUMBNAILS</option>
                    <option value="Brand Identity">BRAND VISUAL IDENTITY</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Estimated budget select */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="budget" className="font-mono text-[10px] text-muted-text uppercase tracking-widest">
                      ESTIMATED BUDGET
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-[#080808] border border-default-border p-3 font-inter text-xs text-[#F5F3EE] focus:outline-none focus:border-primary-accent transition-colors cursor-pointer"
                    >
                      {siteConfig.budgets.map((b) => (
                        <option key={b.value} value={b.value}>{b.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Project timeline select */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="timeline" className="font-mono text-[10px] text-muted-text uppercase tracking-widest">
                      PROJECT TIMELINE
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full bg-[#080808] border border-default-border p-3 font-inter text-xs text-[#F5F3EE] focus:outline-none focus:border-primary-accent transition-colors cursor-pointer"
                    >
                      {siteConfig.timelines.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project description field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="description" className="font-mono text-[10px] text-muted-text uppercase tracking-widest">
                    PROJECT DESCRIPTION *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full bg-[#080808] border p-3 font-inter text-xs text-[#F5F3EE] focus:outline-none focus:border-primary-accent resize-none transition-colors ${
                      errors.description ? "border-primary-accent" : "border-default-border"
                    }`}
                    placeholder="Tell me about your footage, aesthetic ideas, conversion goals, and deliverables list..."
                  />
                  {errors.description && (
                    <span className="font-inter text-[10px] text-primary-accent mt-0.5">{errors.description}</span>
                  )}
                </div>

                {/* Error status panel */}
                {status === "ERROR" && (
                  <div className="p-3 bg-primary-accent/10 border border-primary-accent/30 flex items-center gap-2 text-primary-accent text-xs">
                    <AlertCircle size={14} />
                    <span>Submission failed. Please check internet connection and try again.</span>
                  </div>
                )}

                {/* Submit button */}
                <div className="mt-2 w-full">
                  <MagneticButton
                    type="submit"
                    disabled={status === "SUBMITTING"}
                    className="w-full px-8 py-3 bg-primary-accent hover:bg-accent-hover text-[#080808] font-inter text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send size={12} />
                    <span>{status === "SUBMITTING" ? "SENDING BRIEF..." : "SEND PROJECT REQUEST"}</span>
                  </MagneticButton>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>
    </PageTransition>
  );
}
