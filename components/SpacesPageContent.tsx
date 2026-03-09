"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/portfolio.config";
import SquareTile from "./SquareTile";
import BackLink from "./BackLink";

export default function SpacesPageContent() {
  const group = siteConfig.groups.find((g) => g.id === "analog")!;
  const spaceShoots = group.shoots.filter(
    (s) => (s as { parent?: string }).parent === "Spaces"
  );

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
        <BackLink href="/analog" label="Analog" />

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
          Spaces
        </motion.h1>

        <div className="analog-grid">
          {spaceShoots.map((shoot, i) => (
            <SquareTile
              key={shoot.id}
              title={shoot.title}
              href={`/shoot/${shoot.id}`}
              coverImage={shoot.coverImage}
              index={i}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
