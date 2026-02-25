"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { type Group, type Shoot } from "@/content/portfolio.config";

/**
 * Shoot tile for the group page — 2-col layout like marionbergin.com/photography.
 * Large images, hover zoom, title overlaid bottom-left.
 */
function ShootTile({ shoot, index }: { shoot: Shoot; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: "easeOut" }}
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
            aspectRatio: "4 / 5",
            backgroundColor: "var(--charcoal)",
          }}
        >
          <Image
            src={shoot.coverImage}
            alt={shoot.title}
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
                "linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.3) 60%, transparent 100%)",
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
              {shoot.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * GroupPageContent — used by /analog and /digital.
 *
 * Big heading (like "ANALOG") + description + 2-col grid of shoot tiles.
 * Each tile is big enough that you see 2-3 at a time on screen.
 */
export default function GroupPageContent({ group }: { group: Group }) {
  return (
    <main
      style={{
        backgroundColor: "var(--black)",
        minHeight: "100vh",
        paddingTop: "8rem",
        paddingBottom: "6rem",
      }}
    >
      <div
        style={{ maxWidth: "1400px", margin: "0 auto" }}
        className="px-6 md:px-10"
      >
        {/* Big heading */}
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
            marginBottom: "1.5rem",
            textTransform: "uppercase",
          }}
        >
          {group.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-lora), Georgia, serif",
            fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
            lineHeight: 1.7,
            color: "var(--light)",
            maxWidth: "480px",
            marginBottom: "4rem",
          }}
        >
          {group.id === "analog"
            ? "Shot on film — 35mm and medium format. Street, portraits, architecture, nature, and constructed stills."
            : "Shot digitally. Live music, portraits, nature, and ongoing projects."}
        </motion.p>

        {/* Shoot tiles, grouped by parent subheading when present */}
        {renderShootSections(group.shoots)}
      </div>
    </main>
  );
}

/**
 * Groups shoots: standalone shoots render directly, shoots sharing a
 * `parent` get a subheading above their cluster (e.g. "Spaces" →
 * Architecture + Nature).
 */
function renderShootSections(shoots: Shoot[]) {
  const sections: { key: string; label: string | null; items: Shoot[] }[] = [];
  let idx = 0;

  for (const shoot of shoots) {
    const parentName = (shoot as { parent?: string }).parent ?? null;
    if (parentName) {
      const existing = sections.find((s) => s.label === parentName);
      if (existing) {
        existing.items.push(shoot);
      } else {
        sections.push({ key: parentName, label: parentName, items: [shoot] });
      }
    } else {
      sections.push({ key: shoot.id, label: null, items: [shoot] });
    }
  }

  return sections.map((section) => (
    <div key={section.key} style={{ marginBottom: "3rem" }}>
      {section.label && (
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
            fontWeight: 400,
            fontStyle: "italic",
            letterSpacing: "0.08em",
            color: "var(--silver)",
            marginBottom: "1.5rem",
          }}
        >
          {section.label}
        </motion.h2>
      )}
      <div className="group-shoots-grid">
        {section.items.map((shoot) => {
          const i = idx++;
          return <ShootTile key={shoot.id} shoot={shoot} index={i} />;
        })}
      </div>
    </div>
  ));
}
