import React, { useState } from "react";
import { Package, Sparkles, Check, ArrowRight } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export default function PricingSection() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [duration, setDuration] = useState(1);

  const toggleItem = (name) => {
    if (selectedItems.includes(name)) {
      setSelectedItems(selectedItems.filter((i) => i !== name));
    } else {
      setSelectedItems([...selectedItems, name]);
    }
  };

  const calculateCustomTotal = () => {
    const itemSum = siteConfig.customOptions
      .filter((opt) => selectedItems.includes(opt.name))
      .reduce((sum, opt) => sum + opt.price, 0);
    return itemSum * duration;
  };

  const sendToWhatsApp = (message) => {
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleBookTier = (tierName, tierPrice) => {
    const message = `Hi ${siteConfig.name}! I'd like to book the *${tierName}* package (৳${tierPrice.toLocaleString()}/min). Please share the next steps.`;
    sendToWhatsApp(message);
  };

  const handleBookCustom = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one service!");
      return;
    }
    const total = calculateCustomTotal();
    const itemsList = selectedItems.join(", ");
    const message = `Hi ${siteConfig.name}! I'd like a custom package with: ${itemsList} for ${duration} minute(s). Estimated total: ৳${total.toLocaleString()}. Please share next steps.`;
    sendToWhatsApp(message);
  };

  return (
    <section className="section" id="pricing">
      <div className="section-head">
        <h2>
          <Sparkles size={24} className="spark inline-block" /> Pricing &amp; Packages
        </h2>
      </div>

      <div className="pricing-grid">
        {siteConfig.pricingTiers.map((tier, idx) => (
          <div className={`price-card ${tier.tierClass}`} key={idx}>
            <span className="price-tag">{tier.tag}</span>
            <h3>{tier.name}</h3>
            <div className="price-amount">
              ৳{tier.price.toLocaleString()}
              <span>{tier.unit}</span>
            </div>
            <p className="price-note">{tier.note}</p>
            <ul className="price-list">
              {tier.features.map((feat, fIdx) => (
                <li key={fIdx}>{feat}</li>
              ))}
            </ul>
            <button
              className="btn btn-book"
              onClick={() => handleBookTier(tier.name, tier.price)}
            >
              Book Now <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="custom-package">
        <div className="custom-head">
          <h3 className="flex items-center justify-center gap-2">
            <Package size={22} className="inline-block text-[#0B0B0B]" /> Custom Package
          </h3>
          <p>Mix &amp; match services and choose your duration</p>
        </div>

        <div className="custom-items">
          {siteConfig.customOptions.map((opt, idx) => {
            const isChecked = selectedItems.includes(opt.name);
            return (
              <label
                className={`custom-item ${isChecked ? "checked" : ""}`}
                key={idx}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleItem(opt.name)}
                />
                <span className="custom-item-label">
                  <span className="custom-item-name">{opt.name}</span>
                  <span className="custom-item-price">৳{opt.price}</span>
                </span>
              </label>
            );
          })}
        </div>

        <div className="duration-row">
          <div className="duration-top">
            <span>Duration</span>
            <span>{duration} min</span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>

        <div className="custom-total">
          <div className="custom-total-label">Estimated Total</div>
          <div className="custom-total-amount">
            ৳{calculateCustomTotal().toLocaleString()}
          </div>
        </div>

        <button className="btn-book" onClick={handleBookCustom}>
          Book Custom Package <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
