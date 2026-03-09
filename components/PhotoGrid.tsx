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

  // If every photo is the same aspect (e.g. all 4:3 concert shots), spanning
  // makes no sense — a span-2 item in a 3-col grid would leave col 3 empty
  // every row. Use a uniform 2-col grid for all-landscape, 3-col otherwise.
  const allSameAspect = photos.every((p) => p.aspect === photos[0]?.aspect);
  const isUniformLandscape = allSameAspect && photos[0]?.aspect === "4:3";
  const gridClass = isUniformLandscape ? "photo-grid-uniform" : "photo-grid";

  return (
    <>
      <div className={gridClass} style={{ padding: "2rem 0 6rem" }}>
        {photos.map((photo, index) => {
          const isWide = !isUniformLandscape && photo.aspect === "4:3";
          return (
            <div
              key={index}
              className={`photo-grid-item${isWide ? " wide" : ""}`}
              onClick={() => setLightboxIndex(index)}
              data-cursor-hover="true"
              style={{
                cursor: "pointer",
                overflow: "hidden",
                animationDelay: `${Math.min(index * 0.04, 0.4)}s`,
                // Landscape items get a forced aspect-ratio container so
                // their height matches portrait neighbours — zero gap.
                ...(isWide ? { aspectRatio: "4/3" } : {}),
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.caption || `Photo ${index + 1}`}
                loading={index < 5 ? "eager" : "lazy"}
                style={{
                  width: "100%",
                  display: "block",
                  // Landscape images fill their fixed-ratio container (cover).
                  // Portrait/square images render at natural height (no crop).
                  ...(isWide
                    ? { height: "100%", objectFit: "cover" }
                    : { height: "auto" }),
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
