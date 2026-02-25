"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/content/portfolio.config";

/**
 * Hero — Full-viewport landing hero (fills entire screen, no scroll).
 *
 * Crossfading slideshow with Ken Burns effect.
 * No overlaid name/tagline — those live in the Nav.
 */
export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = siteConfig.heroImages;
  const DISPLAY_DURATION = 5000;
  const FADE_DURATION = 1.5;

  useEffect(() => {
    if (siteConfig.heroVideo || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, DISPLAY_DURATION);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "500px",
        overflow: "hidden",
        backgroundColor: "var(--black)",
      }}
    >
      {siteConfig.heroVideo ? (
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
    </section>
  );
}
