"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { siteConfig } from "@/content/portfolio.config";

interface TileProps {
  title: string;
  href: string;
  coverImage: string;
  index: number;
  /** Flex-grow value — controls proportional height within the column. */
  flexValue: number;
}

/**
 * Tile — fills its flex container completely (no fixed aspect ratio).
 * Height is controlled by the parent column's flex proportions.
 */
function Tile({ title, href, coverImage, index, flexValue }: TileProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.12,
        ease: "easeOut",
      }}
      style={{ flex: flexValue, minHeight: 0, position: "relative" }}
    >
      <Link
        href={href}
        style={{ display: "block", height: "100%" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "100%",
            backgroundColor: "var(--charcoal)",
          }}
        >
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              objectFit: "cover",
              transition: "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
              transform: hovered ? "scale(1.04)" : "scale(1.0)",
            }}
            quality={75}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(to top, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.3) 60%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "clamp(1.2rem, 2.5vw, 2rem)",
              left: "clamp(1.2rem, 2.5vw, 2rem)",
              pointerEvents: "none",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
                fontWeight: 300,
                fontStyle: "italic",
                letterSpacing: "0.04em",
                color: "var(--white)",
                lineHeight: 1.1,
                textShadow:
                  "0 2px 12px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.5)",
              }}
            >
              {title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function DigitalPageContent() {
  const group = siteConfig.groups.find((g) => g.id === "digital")!;

  const liveMusic = group.shoots.find((s) => s.id === "live-music")!;
  const portraits = group.shoots.find((s) => s.id === "portraits-digital")!;
  const nature = group.shoots.find((s) => s.id === "nature")!;
  const projects = group.shoots.find((s) => s.id === "projects")!;

  return (
    /*
     * On desktop: the page is exactly one viewport tall.
     * The heading takes a fixed slice; the puzzle fills the rest.
     * On mobile: natural scroll (stacked columns are too small to constrain).
     *
     * Flex proportions match the intended aspect ratios:
     *   3:2 tile → flex 4   (shorter)
     *   2:3 tile → flex 9   (taller, ~2.25× as tall as the 3:2 tile)
     * Both columns sum to flex 13, so left and right heights are equal.
     */
    <main className="digital-page">
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
        className="px-6 md:px-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: "var(--white)",
            lineHeight: 0.95,
            marginBottom: "clamp(1rem, 2.5vh, 2.5rem)",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          Digital
        </motion.h1>

        {/* Puzzle grid — fills all remaining height */}
        <div className="digital-puzzle">
          {/* Left: Live Music (3:2 → flex 4) over Nature (2:3 → flex 9) */}
          <div className="digital-col">
            <Tile
              title={liveMusic.title}
              href={`/shoot/${liveMusic.id}`}
              coverImage={liveMusic.coverImage}
              index={0}
              flexValue={4}
            />
            <Tile
              title={nature.title}
              href={`/shoot/${nature.id}`}
              coverImage={nature.coverImage}
              index={2}
              flexValue={9}
            />
          </div>

          {/* Right: Portraits (2:3 → flex 9) over Projects (3:2 → flex 4) */}
          <div className="digital-col">
            <Tile
              title={portraits.title}
              href={`/shoot/${portraits.id}`}
              coverImage={portraits.coverImage}
              index={1}
              flexValue={9}
            />
            <Tile
              title={projects.title}
              href={`/shoot/${projects.id}`}
              coverImage={projects.coverImage}
              index={3}
              flexValue={4}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
