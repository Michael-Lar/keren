"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { type Photo } from "@/content/portfolio.config";

interface LightboxProps {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}

const THUMB_SIZE = 60;

/**
 * Lightbox — Full-screen photo viewer with thumbnail strip (Vivian Maier style).
 *
 * - Left/right arrows, keyboard, swipe
 * - Caption below photo
 * - Horizontal thumbnail strip at bottom: click to jump, active has white border
 * - Auto-scroll strip to keep active thumbnail centered
 */
export default function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goNext, goPrev]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const el = thumbRefs.current[index];
    if (el) {
      el.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }
  }, [index]);

  const photo = photos[index];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(8, 8, 8, 0.97)",
        backdropFilter: "blur(4px)",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={onClose}
    >
      {/* Photo counter — top-right */}
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "4rem",
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--silver)",
          pointerEvents: "none",
        }}
      >
        {index + 1} / {photos.length}
      </div>

      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.5rem",
          background: "none",
          border: "none",
          color: "var(--silver)",
          fontSize: "1.5rem",
          lineHeight: 1,
          cursor: "none",
          padding: "0.25rem",
          transition: "color 0.2s",
          zIndex: 2,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--white)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--silver)")
        }
        aria-label="Close lightbox"
      >
        ×
      </button>

      {/* Left arrow */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          style={{
            position: "absolute",
            left: "1.25rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "var(--silver)",
            cursor: "none",
            padding: "1rem 0.75rem",
            transition: "color 0.2s",
            zIndex: 2,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--white)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--silver)")
          }
          aria-label="Previous photo"
        >
          <svg
            width="14"
            height="24"
            viewBox="0 0 14 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="11,2 3,12 11,22" />
          </svg>
        </button>
      )}

      {/* Right arrow */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          style={{
            position: "absolute",
            right: "1.25rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "var(--silver)",
            cursor: "none",
            padding: "1rem 0.75rem",
            transition: "color 0.2s",
            zIndex: 2,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--white)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--silver)")
          }
          aria-label="Next photo"
        >
          <svg
            width="14"
            height="24"
            viewBox="0 0 14 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3,2 11,12 3,22" />
          </svg>
        </button>
      )}

      {/* Main photo + caption — flex-1, centered */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 4rem 1rem",
          minHeight: 0,
        }}
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return;
          const diff = touchStart - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) {
            diff > 0 ? goNext() : goPrev();
          }
          setTouchStart(null);
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              maxWidth: "88vw",
              maxHeight: "100%",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.caption || `Photo ${index + 1}`}
              style={{
                maxHeight: "calc(100vh - 220px)",
                maxWidth: "88vw",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
            {photo.caption && (
              <p
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "12px",
                  letterSpacing: "0.04em",
                  color: "var(--silver)",
                  marginTop: "0.7rem",
                  lineHeight: 1.5,
                  alignSelf: "flex-start",
                }}
              >
                {photo.caption}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip — Vivian Maier style */}
      {photos.length > 1 && (
        <div
          className="thumbnail-strip"
          onClick={(e) => e.stopPropagation()}
          style={{
            flexShrink: 0,
            padding: "1rem 2rem 1.5rem",
            borderTop: "1px solid var(--mid)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              overflowY: "hidden",
              justifyContent: "flex-start",
              paddingBottom: "4px",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="thumbnail-strip-scroll"
          >
            {photos.map((p, i) => (
              <button
                key={i}
                type="button"
                ref={(el) => {
                  thumbRefs.current[i] = el;
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                style={{
                  flexShrink: 0,
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  padding: 0,
                  border:
                    i === index
                      ? "2px solid var(--white)"
                      : "2px solid transparent",
                  borderRadius: "2px",
                  overflow: "hidden",
                  background: "var(--charcoal)",
                  cursor: "none",
                  opacity: i === index ? 1 : 0.4,
                  transition: "opacity 0.2s, border-color 0.2s",
                  scrollSnapAlign: "center",
                }}
                onMouseEnter={(e) => {
                  if (i !== index) e.currentTarget.style.opacity = "0.7";
                }}
                onMouseLeave={(e) => {
                  if (i !== index) e.currentTarget.style.opacity = "0.4";
                }}
                aria-label={`Go to photo ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt=""
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>,
    document.body
  );
}
