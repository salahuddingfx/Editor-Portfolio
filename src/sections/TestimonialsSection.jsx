import React from "react";

export default function TestimonialsSection() {
  const reviews = [
    {
      stars: "★★★★★",
      text: "Add a real client quote here once you collect testimonials from your first bookings."
    },
    {
      stars: "★★★★★",
      text: "Swap this placeholder with feedback from a creator or brand you've edited for."
    },
    {
      stars: "★★★★★",
      text: "A third short testimonial slot — keep it specific and results-focused."
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
          <div className="review-card" key={idx}>
            <span className="quote-mark">"</span>
            <div className="stars">{rev.stars}</div>
            <p>{rev.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
