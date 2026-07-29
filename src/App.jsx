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
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Developer = lazy(() => import("./pages/Developer"));
const NotFound = lazy(() => import("./pages/NotFound"));

import VideoModal from "./components/VideoModal";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { siteConfig } from "./config/siteConfig";

function PageLoader() {
  return (
    <div className="w-full min-h-[60vh] bg-[#FFFCFA] flex flex-col items-center justify-center gap-4 select-none">
      <div className="w-8 h-8 border-2 border-[#FF781E] border-t-transparent rounded-full animate-spin" />
      <span className="font-mono text-[10px] text-[#83837A] tracking-widest uppercase animate-pulse">
        LOADING PORTFOLIO...
      </span>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (videoId) => {
    setActiveVideoId(videoId || siteConfig.aboutVideoId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveVideoId(null);
  };

  useEffect(() => {
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
      <ScrollToTopButton />
      <ScrollToTop />

      <div className="min-h-screen flex flex-col justify-between">
        <Navbar onPlayShowreel={() => handleOpenModal(siteConfig.aboutVideoId)} />

        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={<Home onOpenModal={handleOpenModal} />}
              />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<ProjectDetails />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/developer" element={<Developer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>

        <Footer />
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoId={activeVideoId}
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
