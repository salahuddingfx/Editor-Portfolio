import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectDetails from "./pages/ProjectDetails";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/CustomCursor";
import IntroLoader from "./components/IntroLoader";
import VideoModal from "./components/VideoModal";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { siteConfig } from "./config/siteConfig";

function AppContent() {
  const location = useLocation();
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Only run on desktop layout and when reduced motion is disabled
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDesktop || isReduced) return;

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.lenis = lenisInstance;

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Listen to custom route change event to reset Lenis position
    const handleScrollReset = () => {
      lenisInstance.scrollTo(0, { immediate: true });
    };

    window.addEventListener("route-change", handleScrollReset);

    return () => {
      lenisInstance.destroy();
      window.lenis = null;
      window.removeEventListener("route-change", handleScrollReset);
    };
  }, []);

  return (
    <ErrorBoundary>
      {/* Custom mouse dot follower */}
      <CustomCursor />

      {/* Floating scroll to top button */}
      <ScrollToTopButton />

      {/* Shutter sequence loading bar */}
      <IntroLoader onComplete={() => setIsLoaderComplete(true)} />

      {/* Global Scroll watcher */}
      <ScrollToTop />

      {/* Layout wrapper */}
      <div 
        className={`min-h-screen flex flex-col justify-between transition-opacity duration-700 ${
          isLoaderComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar onPlayShowreel={() => setIsShowreelOpen(true)} />
        
        {/* Route transition wrappers */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home onPlayShowreel={() => setIsShowreelOpen(true)} />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>

      {/* Showreel frame popup */}
      <VideoModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
        videoUrl={siteConfig.showreelUrl}
      />
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
