"use client";

import { useState } from "react";
import { type Photo } from "@/content/portfolio.config";
import Lightbox from "./Lightbox";

interface PhotoGridProps {
  photos: Photo[];
  wideGap?: boolean;
}

/**
 * PhotoGrid — Responsive grid of photos on the shoot page.
 *
 * Each photo renders at its real aspect ratio (3:4, 4:3, 1:1) without
 * cropping. Uses CSS columns for a masonry-like flow where mixed sizes
 * pack naturally. Click opens lightbox.
 */
export default function PhotoGrid({ photos, wideGap }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className={`photo-grid-masonry${wideGap ? " wide-gap" : ""}`} style={{ padding: "2rem 0 6rem" }}>
        {photos.map((photo, index) => (
          <div
            key={index}
            className="photo-grid-item"
            onClick={() => setLightboxIndex(index)}
            data-cursor-hover="true"
            style={{
              cursor: "none",
              marginBottom: "3px",
              breakInside: "avoid",
              backgroundColor: "var(--charcoal)",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.caption || `Photo ${index + 1}`}
              loading={index < 6 ? "eager" : "lazy"}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
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
