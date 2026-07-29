import React from "react";

export default function TestimonialsSection() {
  const reviews = [
    {
      stars: "★★★★★",
      author: "Creator Studio",
      text: "Tasnimul Rahat transformed our raw footage into viral short reels that garnered over 1M+ views. Exceptional pacing and cinematic color work!"
    },
    {
      stars: "★★★★★",
      author: "Brand Director",
      text: "Working with Rahat was effortless. He delivers frame-accurate cuts, crisp sound FX, and high-CTR thumbnails on tight deadlines."
    },
    {
      stars: "★★★★★",
      author: "Media Producer",
      text: "The motion graphics and kinetic typography Rahat produced brought our documentary promo to life. Highly recommended editor!"
    }
  ];

  return (
    <section className="section" id="reviews">
      <div className="section-head">
        <h2>
          <span className="spark">✦</span> What Clients Say
        </h2>
      </div>

      <div className="reviews-grid">
        {reviews.map((rev, idx) => (
          <div className="review-card flex flex-col justify-between gap-4" key={idx}>
            <div>
              <span className="quote-mark">"</span>
              <div className="stars">{rev.stars}</div>
              <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{rev.text}</p>
            </div>
            <span className="font-mono text-xs font-bold text-[var(--accent-deep)] uppercase tracking-wider">
              — {rev.author}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
