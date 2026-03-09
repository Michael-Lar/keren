"use client";

import { useEffect, useRef, useState } from "react";
import { Z } from "@/lib/constants";

/**
 * CustomCursor — Small circle that follows the mouse on desktop.
 *
 * Only renders on screens wider than 768px (hover-capable devices).
 * Expands slightly when hovering over links, images, and interactive elements.
 * Uses lerp interpolation for smooth trailing motion.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Only run on non-touch desktop
    if (window.innerWidth <= 768) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function animate() {
      current.current.x = lerp(current.current.x, pos.current.x, 0.12);
      current.current.y = lerp(current.current.y, pos.current.y, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    }

    function onMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as Element;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.tagName === "IMG"
      ) {
        setIsHovering(true);
      }
    }

    function onMouseOut(e: MouseEvent) {
      const target = e.target as Element;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.tagName === "IMG"
      ) {
        setIsHovering(false);
      }
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth <= 768) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: Z.cursor,
        pointerEvents: "none",
        width: isHovering ? 28 : 16,
        height: isHovering ? 28 : 16,
        borderRadius: "50%",
        border: "1px solid rgba(245, 241, 235, 0.6)",
        backgroundColor: isHovering
          ? "rgba(245, 241, 235, 0.1)"
          : "transparent",
        opacity: isVisible ? 1 : 0,
        transition:
          "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.3s ease",
        willChange: "transform",
      }}
    />
  );
}
