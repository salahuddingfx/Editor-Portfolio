import React from "react";
import { Video, Film, Palette, Image as ImageIcon, TrendingUp, Sparkles } from "lucide-react";

export default function ServicesPreview() {
  const services = [
    {
      icon: <Video size={22} className="text-[#E85D00]" />,
      title: "Video Editing",
      desc: "Professional video editing for shorts, long-form and brand content."
    },
    {
      icon: <Film size={22} className="text-[#E85D00]" />,
      title: "Motion Graphics",
      desc: "Engaging motion graphics and titles that bring ideas to life."
    },
    {
      icon: <Palette size={22} className="text-[#E85D00]" />,
      title: "Color Grading",
      desc: "Cinematic color grading for a consistent, professional look."
    },
    {
      icon: <ImageIcon size={22} className="text-[#E85D00]" />,
      title: "Thumbnail Design",
      desc: "Eye-catching thumbnails engineered to earn more clicks."
    },
    {
      icon: <TrendingUp size={22} className="text-[#E85D00]" />,
      title: "YouTube Optimization",
      desc: "SEO, titles, tags & optimization built for maximum reach."
    }
  ];

  return (
    <section className="section" id="services">
      <div className="section-head">
        <h2>
          <Sparkles size={24} className="spark inline-block" /> My Services
        </h2>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
