import React, { useState } from "react";
import PageTransition from "../components/PageTransition";
import AboutPreview from "../sections/AboutPreview";
import VideoModal from "../components/VideoModal";

export default function About() {
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  return (
    <PageTransition>
      <div className="w-full bg-[var(--bg)] pt-28 pb-32 flex-grow">
        <AboutPreview onOpenModal={(id) => setSelectedVideoId(id)} />
        
        <VideoModal
          isOpen={Boolean(selectedVideoId)}
          onClose={() => setSelectedVideoId(null)}
          videoId={selectedVideoId}
        />
      </div>
    </PageTransition>
  );
}
