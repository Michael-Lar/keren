"use client";

import { useState } from "react";
import { type Photo } from "@/content/portfolio.config";
import Lightbox from "./Lightbox";

interface PhotoGridProps {
  photos: Photo[];
}

/**
 * PhotoGrid — CSS columns masonry layout.
 *
 * All photos stack in columns at natural aspect ratio, touching with zero gaps.
 * Mixed aspect ratios (portrait + landscape) work seamlessly.
 * All-landscape shoots use 2 columns (wider images).
 */
export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allLandscape = photos.every((p) => p.aspect === "4:3");
  const gridClass = allLandscape ? "photo-grid-uniform" : "photo-grid";

  return (
    <>
      <div className={gridClass} style={{ padding: "0.5rem 0 3rem" }}>
        {photos.map((photo, index) => (
          <div
            key={index}
            className="photo-grid-item"
            onClick={() => setLightboxIndex(index)}
            data-cursor-hover="true"
            style={{
              cursor: "pointer",
              animationDelay: `${Math.min(index * 0.04, 0.4)}s`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.caption || `Photo ${index + 1}`}
              loading={index < 5 ? "eager" : "lazy"}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
