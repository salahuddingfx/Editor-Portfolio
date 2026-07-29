import React from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[70vh] bg-[var(--bg)] flex flex-col items-center justify-center p-6 text-center select-none relative">
        <div className="flex flex-col items-center gap-4">
          <span className="eyebrow">
            <span className="dot"></span> ERROR 404
          </span>
          <h1 className="font-[var(--font-display)] text-4xl md:text-6xl font-bold text-[var(--ink)] uppercase">
            FRAME NOT FOUND
          </h1>
          <p className="font-[var(--font-body)] text-sm text-[var(--ink-soft)] max-w-sm leading-relaxed mb-6">
            The page or clip you are looking for does not exist on this timeline.
          </p>
          <Link to="/" className="btn btn-accent">
            RETURN HOME →
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
