import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function VideoModal({ isOpen, onClose, videoUrl }) {
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      if (modalRef.current) {
        const closeBtn = modalRef.current.querySelector(".close-btn");
        if (closeBtn) closeBtn.focus();
      }
    } else {
      document.body.style.overflow = "";
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab") {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button, iframe, video, [tabindex="0"]'
        );
        if (focusableElements.length === 0) return;
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEmbed = videoUrl.includes("youtube.com") || videoUrl.includes("vimeo.com") || videoUrl.includes("embed") || videoUrl.includes("player.vimeo");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4">
        {/* Backdrop background blur */}
        <motion.div
          className="absolute inset-0 bg-[#080808]/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window Wrapper */}
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-5xl aspect-video bg-secondary-bg border border-default-border overflow-hidden z-10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 250 }}
        >
          {/* Close trigger button */}
          <button
            onClick={onClose}
            className="close-btn absolute top-4 right-4 z-20 p-2 bg-[#080808]/80 hover:bg-primary-accent border border-default-border hover:border-primary-accent text-primary-text rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2 focus:ring-offset-[#080808]"
            aria-label="Close video player"
          >
            <X size={18} />
          </button>

          {/* Media Player Container */}
          <div className="w-full h-full flex items-center justify-center">
            {isEmbed ? (
              <iframe
                src={`${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1`}
                title="Cinematic Player"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
                aria-label="Cinematic Video Content"
              />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
