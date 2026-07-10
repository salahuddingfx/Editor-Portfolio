import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Developer = lazy(() => import("./pages/Developer"));
const NotFound = lazy(() => import("./pages/NotFound"));

import CustomCursor from "./components/CustomCursor";
import IntroLoader from "./components/IntroLoader";
import VideoModal from "./components/VideoModal";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { siteConfig } from "./config/siteConfig";

// Premium loader fallback matching editing track theme
function PageLoader() {
  return (
    <div className="w-full min-h-[60vh] bg-[#080808] flex flex-col items-center justify-center gap-4 select-none">
      <div className="w-8 h-8 border-2 border-primary-accent border-t-transparent rounded-full animate-spin" />
      <span className="font-mono text-[10px] text-muted-text tracking-widest uppercase animate-pulse">
        LOADING TRACK...
      </span>
    </div>
  );
}

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
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home onPlayShowreel={() => setIsShowreelOpen(true)} />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<ProjectDetails />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/developer" element={<Developer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
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
