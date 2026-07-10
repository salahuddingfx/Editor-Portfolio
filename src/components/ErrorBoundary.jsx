import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-main-bg flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="font-mono text-[10px] text-primary-accent uppercase tracking-widest mb-4">
            [ SEGMENTATION FAULT ]
          </div>
          <h1 className="font-space text-4xl md:text-6xl font-bold text-primary-text mb-4 uppercase">
            RENDER CRASH
          </h1>
          <p className="font-inter text-sm text-secondary-text max-w-md mb-8">
            The preview canvas encountered an error rendering this component. Please reload the webpage.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-primary-accent hover:bg-accent-hover text-[#080808] font-inter text-xs font-bold tracking-widest uppercase transition-colors focus:outline-none"
          >
            REBUILD SEQUENCES
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
