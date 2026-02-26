"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { siteConfig } from "@/content/portfolio.config";

function SquareTile({
  title,
  href,
  coverImage,
  index,
}: {
  title: string;
  href: string;
  coverImage: string;
  index: number;
}) {
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
    >
      <Link
        href={href}
        className="block"

        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            aspectRatio: "1 / 1",
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

export default function AnalogPageContent() {
  const group = siteConfig.groups.find((g) => g.id === "analog")!;

  const street = group.shoots.find((s) => s.id === "street")!;
  const portraits = group.shoots.find((s) => s.id === "portraits-film")!;
  const stillConstructed = group.shoots.find(
    (s) => s.id === "still-constructed"
  )!;
  const spacesCover =
    group.shoots.find((s) => s.id === "architecture")?.coverImage ||
    "/photos/spaces/01.jpg";

  const tiles = [
    {
      title: "Street",
      href: "/shoot/street",
      coverImage: street.coverImage,
    },
    {
      title: "Portraits",
      href: "/shoot/portraits-film",
      coverImage: portraits.coverImage,
    },
    {
      title: "Spaces",
      href: "/spaces",
      coverImage: spacesCover,
    },
    {
      title: "Still / Constructed",
      href: "/shoot/still-constructed",
      coverImage: stillConstructed.coverImage,
    },
  ];

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
          Analog
        </motion.h1>

        <div className="analog-grid">
          {tiles.map((tile, i) => (
            <SquareTile key={tile.title} {...tile} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
