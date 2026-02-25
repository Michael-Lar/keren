"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { siteConfig, type Shoot, type Group } from "@/content/portfolio.config";

type FilterId = "all" | "analog" | "digital";

/**
 * Large full-width shoot tile — stacked vertically like marionbergin.com.
 * Cover image with shoot title overlaid bottom-left.
 */
function ShootTile({ shoot, index }: { shoot: Shoot; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link
        href={`/shoot/${shoot.id}`}
        className="block"
        style={{ cursor: "none" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            aspectRatio: "16 / 9",
            backgroundColor: "var(--charcoal)",
          }}
        >
          <Image
            src={shoot.coverImage}
            alt={shoot.title}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              transition: "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
              transform: hovered ? "scale(1.04)" : "scale(1.0)",
            }}
            quality={75}
          />

          {/* Bottom gradient for text legibility — strong for B&W images */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
              background:
                "linear-gradient(to top, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.4) 50%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Title overlaid bottom-left */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(1.5rem, 3vw, 3rem)",
              left: "clamp(1.5rem, 3vw, 3rem)",
              pointerEvents: "none",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                letterSpacing: "0.04em",
                color: "var(--white)",
                lineHeight: 1.1,
                textShadow:
                  "0 2px 12px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.5)",
              }}
            >
              {shoot.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Renders one group (Analog or Digital) as a section heading + stacked shoot tiles.
 */
function GroupSection({ group, startIndex }: { group: Group; startIndex: number }) {
  return (
    <div style={{ marginBottom: "4rem" }}>
      {/* Group heading */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(1rem, 2vw, 1.3rem)",
          fontWeight: 400,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--silver)",
          marginBottom: "2rem",
          paddingLeft: "clamp(1.5rem, 3vw, 3rem)",
        }}
      >
        {group.title}
      </motion.h2>

      {/* Stacked shoot tiles */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        {group.shoots.map((shoot, i) => (
          <ShootTile key={shoot.id} shoot={shoot} index={startIndex + i} />
        ))}
      </div>
    </div>
  );
}

export default function GalleryGrid() {
  const [filter, setFilter] = useState<FilterId>("all");

  const tabs: { id: FilterId; label: string }[] = [
    { id: "all", label: "All" },
    { id: "analog", label: "Analog" },
    { id: "digital", label: "Digital" },
  ];

  const visibleGroups =
    filter === "all"
      ? siteConfig.groups
      : siteConfig.groups.filter((g) => g.id === filter);

  let runningIndex = 0;

  return (
    <section
      id="work"
      className="gallery-container"
      style={{ backgroundColor: "var(--black)" }}
    >
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          marginBottom: "3.5rem",
          paddingLeft: "clamp(1.5rem, 3vw, 3rem)",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: filter === tab.id ? "var(--white)" : "var(--silver)",
              background: "none",
              border: "none",
              padding: "0 0 4px",
              borderBottom:
                filter === tab.id
                  ? "1px solid var(--white)"
                  : "1px solid transparent",
              cursor: "none",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (filter !== tab.id) {
                e.currentTarget.style.color = "var(--light)";
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== tab.id) {
                e.currentTarget.style.color = "var(--silver)";
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Group sections with stacked tiles */}
      {visibleGroups.map((group) => {
        const section = (
          <GroupSection
            key={group.id}
            group={group}
            startIndex={runningIndex}
          />
        );
        runningIndex += group.shoots.length;
        return section;
      })}
    </section>
  );
}
