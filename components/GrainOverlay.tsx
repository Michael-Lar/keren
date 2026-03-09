"use client";

import { useEffect, useRef } from "react";
import { Z } from "@/lib/constants";

/**
 * GrainOverlay — Animated SVG film grain that covers every page.
 *
 * Fixed position, pointer-events none, z-index 9998 (below lightbox at 9999).
 * Uses SVG feTurbulence with animated seed to simulate real analog film grain.
 * Updates at ~8fps for a subtle, living texture — not a static pattern.
 */
export default function GrainOverlay() {
  const filterRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    let seed = 0;
    let lastTime = 0;
    const fps = 8;
    const interval = 1000 / fps;
    let rafId: number;

    function tick(time: number) {
      if (time - lastTime > interval) {
        lastTime = time;
        seed = (seed + 1) % 1000;
        filterRef.current?.setAttribute("seed", String(seed));
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      {/* Hidden SVG with the filter definition */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", width: 0, height: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              ref={filterRef}
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="grayNoise"
            />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" />
          </filter>
        </defs>
      </svg>

      {/* The overlay div that applies the filter */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: Z.grain,
          opacity: 0.07,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </>
  );
}
