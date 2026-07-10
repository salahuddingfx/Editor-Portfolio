import { useEffect, useRef } from "react";

export function useVideoVisibility() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play video when visible and tab active
          if (!document.hidden) {
            video.play().catch(() => {});
          }
        } else {
          // Pause when offscreen
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    // Pause video when browser tab is inactive, resume if intersecting
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        // Simple re-check
        const rect = video.getBoundingClientRect();
        const inViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (inViewport) {
          video.play().catch(() => {});
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.unobserve(video);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return videoRef;
}
