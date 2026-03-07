"use client";

import { useState } from "react";
import { type Photo } from "@/content/portfolio.config";
import Lightbox from "./Lightbox";

interface PhotoGridProps {
  photos: Photo[];
}

/**
 * PhotoGrid — 3-column CSS grid with intelligent spanning.
 *
 * Layout rules (per Keren's spec):
 *   Landscape (4:3) → span 2 columns  — fills 2/3 of the row width
 *   Portrait  (3:4) → span 1 column   — fills 1/3 of the row width
 *   Square    (1:1) → span 1 column   — fills 1/3 of the row width
 *
 * On tablet (2-col): landscape still spans 2 (full width).
 * On mobile (1-col): all photos are full width regardless.
 *
 * Photos render at their natural aspect ratio — no cropping.
 * Clicking any photo opens the Vivian Maier-style lightbox.
 */
export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="photo-grid" style={{ padding: "2rem 0 6rem" }}>
        {photos.map((photo, index) => {
          const isWide = photo.aspect === "4:3";
          return (
            <div
              key={index}
              className={`photo-grid-item${isWide ? " wide" : ""}`}
              onClick={() => setLightboxIndex(index)}
              data-cursor-hover="true"
              style={{
                cursor: "pointer",
                backgroundColor: "var(--charcoal)",
                overflow: "hidden",
                animationDelay: `${Math.min(index * 0.04, 0.4)}s`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.caption || `Photo ${index + 1}`}
                loading={index < 5 ? "eager" : "lazy"}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          );
        })}
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
