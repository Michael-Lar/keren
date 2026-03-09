"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/portfolio.config";
import SquareTile from "./SquareTile";

export default function AnalogPageContent() {
  const group = siteConfig.groups.find((g) => g.id === "analog")!;

  const street = group.shoots.find((s) => s.id === "street")!;
  const portraits = group.shoots.find((s) => s.id === "portraits-film")!;
  const stillConstructed = group.shoots.find((s) => s.id === "still-constructed")!;
  const spacesCover =
    group.shoots.find((s) => s.id === "architecture")?.coverImage ||
    "/photos/spaces/01.jpg";

  const tiles = [
    { title: "Street", href: "/shoot/street", coverImage: street.coverImage },
    { title: "Portraits", href: "/shoot/portraits-film", coverImage: portraits.coverImage },
    { title: "Spaces", href: "/spaces", coverImage: spacesCover },
    { title: "Still / Constructed", href: "/shoot/still-constructed", coverImage: stillConstructed.coverImage },
  ];

  return (
    <main
      style={{
        backgroundColor: "var(--black)",
        minHeight: "100vh",
        paddingTop: "5rem",
        paddingBottom: "4rem",
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
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: "var(--white)",
            lineHeight: 0.95,
            marginBottom: "1.5rem",
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
