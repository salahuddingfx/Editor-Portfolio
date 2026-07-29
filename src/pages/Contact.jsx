import React, { useState } from "react";
import { Mail, Phone, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { siteConfig } from "../config/siteConfig";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "Video Editing",
    budget: siteConfig.pricingTiers[1]?.name || "Gold",
    timeline: "1 week",
    description: "",
    botcheck: ""
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("IDLE");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.botcheck) {
      setStatus("SUCCESS");
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setStatus("SUBMITTING");

    setTimeout(() => {
      setStatus("SUCCESS");
      const message = `Hi ${siteConfig.name}! New Contact Request:\nName: ${formData.name}\nEmail: ${formData.email}\nProject: ${formData.projectType}\nDetails: ${formData.description}`;
      const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }, 800);
  };

  return (
    <PageTransition>
      <div className="w-full bg-[var(--bg)] pt-28 pb-20 flex-grow text-left">
        <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <span className="eyebrow">
                <span className="dot"></span> Contact &amp; Booking
              </span>
              <h1 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold uppercase text-[var(--ink)] tracking-tight">
                Let’s Create Together.
              </h1>
              <p className="font-[var(--font-body)] text-sm text-[var(--ink-soft)] leading-relaxed mt-2">
                Tell me about your video editing goals, target platforms, timelines, and requirements.
              </p>
            </div>

            <div className="flex flex-col gap-6 pt-4 border-t border-[var(--line)]">
              <span className="font-mono text-[10px] text-[var(--muted)] tracking-widest uppercase">DIRECT CONTACTS</span>

              <div className="flex flex-col gap-4">
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-[var(--ink-soft)] hover:text-[var(--accent-deep)] transition-colors">
                  <div className="p-2.5 bg-[var(--surface-2)] border border-[var(--line)] text-[var(--ink)]">
                    <Mail size={16} />
                  </div>
                  <span className="font-inter text-sm font-medium">{siteConfig.email}</span>
                </a>

                {siteConfig.phone && (
                  <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-[var(--ink-soft)] hover:text-[var(--accent-deep)] transition-colors">
                    <div className="p-2.5 bg-[var(--surface-2)] border border-[var(--line)] text-[var(--ink)]">
                      <Phone size={16} />
                    </div>
                    <span className="font-inter text-sm font-medium">{siteConfig.phone}</span>
                  </a>
                )}

                {siteConfig.socials.whatsapp && (
                  <a href={siteConfig.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[var(--ink-soft)] hover:text-[var(--accent-deep)] transition-colors">
                    <div className="p-2.5 bg-[var(--surface-2)] border border-[var(--line)] text-[var(--ink)]">
                      <MessageSquare size={16} />
                    </div>
                    <span className="font-inter text-sm font-medium">CHAT ON WHATSAPP</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7 bg-[var(--surface)] border border-[var(--line)] p-8 md:p-12 rounded-[var(--radius-lg)] shadow-[var(--shadow)] relative overflow-hidden">
            {status === "SUCCESS" ? (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                <CheckCircle2 size={56} className="text-[#FF781E] animate-pulse" />
                <h3 className="font-[var(--font-display)] text-2xl font-bold uppercase text-[var(--ink)] mt-2">
                  Project Request Received
                </h3>
                <p className="font-[var(--font-body)] text-sm text-[var(--ink-soft)] max-w-sm leading-relaxed">
                  Redirecting to WhatsApp to complete your booking brief!
                </p>
                <button
                  onClick={() => setStatus("IDLE")}
                  className="mt-6 font-mono text-xs text-[var(--accent-deep)] border-b border-[var(--accent-deep)] pb-0.5"
                >
                  SEND ANOTHER BRIEF
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
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
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-[var(--surface-2)] border p-3 font-inter text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors rounded-[var(--radius-sm)] ${
                        errors.name ? "border-red-500" : "border-[var(--line)]"
                      }`}
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && (
                      <span className="font-inter text-[10px] text-red-500 mt-0.5">{errors.name}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-[var(--surface-2)] border p-3 font-inter text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors rounded-[var(--radius-sm)] ${
                        errors.email ? "border-red-500" : "border-[var(--line)]"
                      }`}
                      placeholder="e.g. john@brand.com"
                    />
                    {errors.email && (
                      <span className="font-inter text-[10px] text-red-500 mt-0.5">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="projectType" className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">
                    PROJECT TYPE
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-[var(--surface-2)] border border-[var(--line)] p-3 font-inter text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] rounded-[var(--radius-sm)] cursor-pointer"
                  >
                    <option value="Video Editing">VIDEO EDITING</option>
                    <option value="Shorts & Reels">SHORTS &amp; REELS</option>
                    <option value="Motion Graphics">MOTION GRAPHICS</option>
                    <option value="Thumbnail Design">THUMBNAIL DESIGN</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="description" className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">
                    PROJECT DESCRIPTION *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full bg-[var(--surface-2)] border p-3 font-inter text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] resize-none rounded-[var(--radius-sm)] ${
                      errors.description ? "border-red-500" : "border-[var(--line)]"
                    }`}
                    placeholder="Tell me about your video footage, duration, aesthetic style..."
                  />
                  {errors.description && (
                    <span className="font-inter text-[10px] text-red-500 mt-0.5">{errors.description}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "SUBMITTING"}
                  className="btn btn-accent w-full justify-center mt-2"
                >
                  <Send size={14} />
                  <span>{status === "SUBMITTING" ? "SENDING BRIEF..." : "SEND PROJECT REQUEST →"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
