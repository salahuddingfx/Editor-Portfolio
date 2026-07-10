import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Standard scroll reset
    window.scrollTo(0, 0);
    
    // Also dispatch event for Lenis instances if any
    const event = new CustomEvent("route-change");
    window.dispatchEvent(event);
  }, [pathname]);

  return null;
}
