"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { siteConfig, type Shoot } from "@/content/portfolio.config";

const tileAspect: Record<string, string> = {
  "live-music": "3 / 2",
  "portraits-digital": "2 / 3",
  nature: "3 / 2",
  projects: "3 / 2",
};

function DigitalTile({ shoot, index }: { shoot: Shoot; index: number }) {
  const [hovered, setHovered] = useState(false);
  const aspect = tileAspect[shoot.id] || "3 / 2";

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
            aspectRatio: aspect,
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
              transition:
                "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
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

export default function DigitalPageContent() {
  const group = siteConfig.groups.find((g) => g.id === "digital")!;

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
            marginBottom: "4rem",
            textTransform: "uppercase",
          }}
        >
          Digital
        </motion.h1>

        <div className="digital-grid">
          {group.shoots.map((shoot, i) => (
            <DigitalTile key={shoot.id} shoot={shoot} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
