import React from "react";

export default function ServicesPreview() {
  const services = [
    {
      icon: "🎬",
      title: "Video Editing",
      desc: "Professional video editing for shorts, long-form and brand content."
    },
    {
      icon: "🎞️",
      title: "Motion Graphics",
      desc: "Engaging motion graphics and titles that bring ideas to life."
    },
    {
      icon: "🎨",
      title: "Color Grading",
      desc: "Cinematic color grading for a consistent, professional look."
    },
    {
      icon: "🖼️",
      title: "Thumbnail Design",
      desc: "Eye-catching thumbnails engineered to earn more clicks."
    },
    {
      icon: "📈",
      title: "YouTube Optimization",
      desc: "SEO, titles, tags & optimization built for maximum reach."
    }
  ];

  return (
    <section className="section" id="services">
      <div className="section-head">
        <h2>
          <span className="spark">✦</span> My Services
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
