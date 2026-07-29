import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";

export default function Navbar({ onPlayShowreel }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);

  const handleNavClick = (e, targetHash, pageRoute) => {
    closeNav();
    if (location.pathname === "/") {
      const el = document.querySelector(targetHash);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    if (pageRoute) {
      e.preventDefault();
      navigate(pageRoute);
    }
  };

  return (
    <header className={`nav-wrap ${isOpen ? "open" : ""}`}>
      <div className="nav">
        <Link
          to="/"
          className="logo"
          onClick={(e) => handleNavClick(e,  "/")}
        >
          <span className="logo-svg-mark">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600.000000 604.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,604.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                <path d="M2835 6027 c-65 -17 -89 -34 -155 -109 -30 -35 -116 -126 -191 -203 -74 -77 -241 -252 -370 -390 -306 -327 -691 -735 -903 -960 -94 -99 -197 -207 -228 -240 -31 -33 -112 -117 -180 -187 -108 -111 -190 -197 -400 -419 -164 -173 -317 -348 -349 -401 -74 -120 -78 -238 -12 -367 21 -40 54 -87 73 -104 19 -16 121 -114 226 -216 105 -102 251 -242 324 -311 171 -160 277 -258 475 -446 88 -82 320 -300 515 -484 195 -183 389 -366 430 -406 41 -39 129 -123 195 -185 66 -63 149 -143 185 -179 160 -159 382 -361 427 -387 44 -25 57 -28 143 -28 115 0 160 18 238 97 86 87 113 203 77 326 -15 49 -36 72 -308 341 -161 159 -314 306 -342 327 -60 45 -37 24 -232 214 -88 85 -242 234 -344 331 -101 97 -202 193 -224 215 -23 21 -52 62 -65 89 -21 43 -25 64 -25 145 0 82 4 100 24 135 35 58 98 114 161 144 74 35 191 37 264 3 46 -21 218 -175 452 -407 401 -397 1029 -980 1084 -1008 36 -18 62 -22 135 -22 128 0 175 25 291 153 49 53 134 144 189 202 94 99 309 329 369 395 45 49 297 316 351 371 27 28 81 85 119 125 39 41 144 151 236 244 91 94 192 201 225 239 33 38 72 81 86 95 100 101 171 218 190 314 13 61 4 132 -25 201 -8 20 -16 38 -16 41 -3 14 -99 110 -285 283 -115 108 -248 232 -295 277 -47 45 -119 113 -160 151 -41 38 -106 100 -145 137 -38 38 -88 79 -111 93 -58 34 -141 48 -219 35 -109 -17 -124 -27 -300 -216 -26 -27 -93 -97 -149 -155 -56 -58 -165 -172 -242 -255 -77 -82 -194 -206 -258 -275 -149 -158 -166 -186 -175 -291 -4 -44 -5 -82 -2 -84 2 -3 6 -17 7 -31 5 -42 43 -106 89 -151 56 -53 135 -83 219 -83 102 0 143 20 231 113 43 45 149 154 234 242 86 88 175 181 198 206 56 62 120 92 205 97 97 6 149 -15 230 -91 83 -80 101 -118 102 -222 1 -138 54 -75 -785 -940 -80 -82 -163 -169 -184 -193 -21 -23 -67 -57 -102 -74 -58 -28 -69 -30 -140 -26 -102 6 -133 23 -268 148 -400 371 -501 467 -687 655 -115 116 -218 228 -230 250 -29 53 -32 182 -5 236 19 39 298 351 458 514 54 55 120 123 146 151 26 27 104 108 173 180 69 71 204 215 301 319 97 105 220 235 273 290 103 107 126 150 126 240 0 86 -27 145 -96 213 -81 80 -128 102 -219 102 -85 0 -132 -12 -194 -50 -37 -23 -360 -352 -520 -529 -13 -14 -69 -73 -125 -131 -97 -100 -334 -351 -845 -895 -238 -253 -318 -338 -561 -591 -74 -77 -164 -171 -200 -208 -88 -92 -143 -120 -240 -120 -91 -1 -154 24 -218 87 -83 80 -114 183 -88 287 21 82 48 121 179 257 63 65 131 138 152 163 40 48 230 252 406 435 58 60 145 153 194 205 49 52 125 133 170 180 45 47 265 280 491 519 775 821 757 798 756 934 0 39 -3 85 -7 101 -16 76 -91 164 -173 206 -54 26 -158 34 -227 17z"/>
              </g>
            </svg>
          </span>
          {siteConfig.name}
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <a
            href="/about"
            onClick={(e) => handleNavClick(e, "/about")}
          >
            About
          </a>
          <a
            href="/work"
            onClick={(e) => handleNavClick(e, "/work")}
          >
            Work
          </a>
          <a
            href="/services"
            onClick={(e) => handleNavClick(e,  "/services")}
          >
            Services
          </a>
          <a
            href="/pricing"
            onClick={(e) => handleNavClick(e, "/services")}
          >
            Pricing
          </a>
          <a
            href="/contact"
            onClick={(e) => handleNavClick(e,  "/contact")}
          >
            Contact
          </a>
        </nav>

        <div className="nav-right">
          <a
            href="#contact"
            className="btn btn-accent btn-sm nav-cta"
            onClick={(e) => handleNavClick(e, "#contact", "/contact")}
          >
            Let's talk
          </a>
          <button
            className="nav-toggle"
            id="navToggle"
            onClick={toggleNav}
            aria-label="Toggle Navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
