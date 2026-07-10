import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { siteConfig } from "../config/siteConfig";

export default function Navbar({ onPlayShowreel }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Transparent at top, dark after scrolling
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide navbar when scrolling down, reveal when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menu when location route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "WORK", path: "/work" },
    { name: "SERVICES", path: "/services" },
    { name: "CONTACT", path: "/contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-secondary-bg/90 backdrop-blur-md border-b border-default-border/50 py-3 md:py-4" 
            : "bg-transparent py-5 md:py-8"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-space text-lg font-bold tracking-widest text-[#F5F3EE] hover:text-primary-accent transition-colors flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-accent" />
            VANCE
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-inter text-xs tracking-widest font-semibold py-1 transition-colors ${
                    isActive ? "text-primary-text" : "text-secondary-text hover:text-primary-text"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-primary-accent"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Showreel & Menu Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <MagneticButton
                onClick={onPlayShowreel}
                data-cursor="play"
                className="px-5 py-2 bg-primary-accent hover:bg-accent-hover text-[#080808] font-inter text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-colors duration-200"
              >
                <Play size={10} fill="currentColor" />
                PLAY SHOWREEL
              </MagneticButton>
            </div>

            {/* Mobile Burger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-primary-text hover:text-primary-accent transition-colors focus:outline-none flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-5 h-4 relative flex items-center justify-center">
                <span className={`absolute w-5 h-[1.5px] bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
                }`} />
                <span className={`absolute w-5 h-[1.5px] bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
                }`} />
                <span className={`absolute w-5 h-[1.5px] bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
                }`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#080808] flex flex-col justify-between p-6 md:p-12 select-none"
          >
            {/* Top gap for physical spacer */}
            <div className="h-16" />

            {/* Big list links */}
            <nav className="flex flex-col gap-6 justify-center my-auto">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <div key={link.name} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
                      className="flex items-baseline gap-4"
                    >
                      <span className="font-mono text-xs text-muted-text">0{index + 1}</span>
                      <Link
                        to={link.path}
                        className={`font-space text-4xl md:text-7xl font-bold tracking-tight uppercase hover:text-primary-accent transition-colors ${
                          isActive ? "text-primary-accent" : "text-[#F5F3EE]"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            {/* Bottom details */}
            <div className="border-t border-default-border pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] text-muted-text tracking-widest uppercase">HIRE ME</span>
                <a href={`mailto:${siteConfig.email}`} className="font-inter text-sm text-[#F5F3EE] hover:text-primary-accent transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex gap-5">
                {Object.entries(siteConfig.socials).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-secondary-text hover:text-[#F5F3EE] uppercase transition-colors"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
