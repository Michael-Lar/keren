"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/content/portfolio.config";

/**
 * Hero — Full-viewport landing hero.
 *
 * If siteConfig.heroVideo is set: autoplay muted looped video.
 * Otherwise: crossfading slideshow of heroImages with Ken Burns effect.
 *
 * Each image is shown for 5 seconds with a 1.5s crossfade.
 * Ken Burns: subtle scale 1.00 → 1.04 over the full display duration.
 *
 * Overlaid: photographer name (bottom-left) + tagline + scroll indicator.
 */
export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = siteConfig.heroImages;
  const DISPLAY_DURATION = 5000; // ms each image shows
  const FADE_DURATION = 1.5;     // seconds for crossfade

  useEffect(() => {
    if (siteConfig.heroVideo || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, DISPLAY_DURATION);
    return () => clearInterval(timer);
  }, [images.length]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "60vh",
        minHeight: "380px",
        overflow: "hidden",
        backgroundColor: "var(--black)",
      }}
    >
      {/* ─── Media Layer ──────────────────────────────────────── */}
      {siteConfig.heroVideo ? (
        /* Video hero */
        <video
          src={siteConfig.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        /* Crossfading image slideshow */
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
            }}
          >
            {/* Ken Burns: subtle scale animation */}
            <motion.div
              initial={{ scale: 1.0 }}
              animate={{ scale: 1.04 }}
              transition={{
                duration: DISPLAY_DURATION / 1000 + FADE_DURATION,
                ease: "linear",
              }}
              style={{ position: "absolute", inset: "-2%" }}
            >
              <Image
                src={images[currentIndex]}
                alt=""
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority={currentIndex === 0}
                quality={75}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* ─── Dark gradient at bottom for text legibility ─────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "45%",
          background:
            "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.15) 75%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ─── Photographer Name + Tagline (bottom-left) ────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "2rem",
          zIndex: 10,
        }}
        className="md:left-10 md:bottom-12"
      >
        {/* Name — split into two styled spans for visual interest */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.8rem, 6vw, 6rem)",
              lineHeight: 0.95,
              letterSpacing: "0.04em",
              color: "var(--white)",
              fontWeight: 300,
              textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.4)",
            }}
          >
            <span style={{ fontStyle: "italic" }}>
              {siteConfig.name.split(" ")[0]}
            </span>
            {siteConfig.name.split(" ").length > 1 && (
              <>
                {" "}
                <span style={{ fontWeight: 400, fontStyle: "normal" }}>
                  {siteConfig.name.split(" ").slice(1).join(" ")}
                </span>
              </>
            )}
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--white)",
            marginTop: "0.6rem",
            textShadow: "0 1px 8px rgba(0,0,0,0.9)",
          }}
        >
          {siteConfig.tagline}
        </motion.p>
      </div>

      {/* ─── Scroll Indicator (bottom-center) ────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 0.5 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "36px",
            backgroundColor: "var(--white)",
            opacity: 0.6,
          }}
        />
      </motion.div>
    </section>
  );
}
