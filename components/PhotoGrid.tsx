"use client";

import { useState } from "react";
import { type Photo } from "@/content/portfolio.config";
import Lightbox from "./Lightbox";

interface PhotoGridProps {
  photos: Photo[];
}

type Aspect = Photo["aspect"];

function numericRatio(aspect: Aspect): number {
  if (aspect === "4:3") return 4 / 3;
  if (aspect === "3:4") return 3 / 4;
  return 1;
}

/**
 * Row-packing algorithm:
 * - Landscape always pairs with the next photo → 2-image row
 * - 2+ consecutive non-landscape photos → 3-image row
 * - Solo photo at end → full-width row
 */
function buildRows(photos: Photo[]): Photo[][] {
  const rows: Photo[][] = [];
  let i = 0;

  while (i < photos.length) {
    const current = photos[i];

    if (current.aspect === "4:3") {
      // Landscape: pair with one more
      if (i + 1 < photos.length) {
        rows.push([current, photos[i + 1]]);
        i += 2;
      } else {
        rows.push([current]);
        i += 1;
      }
    } else {
      // Portrait/square: count consecutive non-landscape (up to 3)
      let count = 1;
      while (
        i + count < photos.length &&
        photos[i + count].aspect !== "4:3" &&
        count < 3
      ) {
        count++;
      }

      if (count >= 2) {
        rows.push(photos.slice(i, i + count));
        i += count;
      } else {
        // Only 1 non-landscape before a landscape or end
        if (i + 1 < photos.length) {
          rows.push([current, photos[i + 1]]);
          i += 2;
        } else {
          rows.push([current]);
          i += 1;
        }
      }
    }
  }

  return rows;
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allLandscape = photos.every((p) => p.aspect === "4:3");

  // All-landscape shoots use a simple 2-col uniform grid
  if (allLandscape) {
    return (
      <>
        <div className="photo-grid-uniform" style={{ padding: "0.5rem 0 3rem" }}>
          {photos.map((photo, index) => (
            <div
              key={index}
              className="photo-grid-item"
              onClick={() => setLightboxIndex(index)}
              style={{ cursor: "pointer", animationDelay: `${Math.min(index * 0.04, 0.4)}s` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.caption || `Photo ${index + 1}`}
                loading={index < 4 ? "eager" : "lazy"}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          ))}
        </div>
        {lightboxIndex !== null && (
          <Lightbox photos={photos} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </>
    );
  }

  // Mixed-aspect shoots use the row-packing algorithm
  const rows = buildRows(photos);

  // Build a flat index map so clicks open the correct lightbox index
  let globalIndex = 0;
  const indexedRows = rows.map((row) =>
    row.map((photo) => ({ photo, index: globalIndex++ }))
  );

  return (
    <>
      <div style={{ padding: "0.5rem 0 3rem" }}>
        {indexedRows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: "flex",
              height: "clamp(22vh, 32vw, 50vh)",
              marginBottom: 0,
            }}
          >
            {row.map(({ photo, index }) => (
              <div
                key={photo.src}
                onClick={() => setLightboxIndex(index)}
                style={{
                  flex: numericRatio(photo.aspect),
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.caption || `Photo ${index + 1}`}
                  loading={index < 6 ? "eager" : "lazy"}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox photos={photos} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}
