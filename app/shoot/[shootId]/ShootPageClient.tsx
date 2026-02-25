"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type Group, type Shoot } from "@/content/portfolio.config";
import PhotoGrid from "@/components/PhotoGrid";

interface Props {
  group: Group;
  shoot: Shoot;
}

/**
 * Client component for the shoot page — header + PhotoGrid.
 */
export default function ShootPageClient({ group, shoot }: Props) {
  return (
    <main
      style={{
        backgroundColor: "var(--black)",
        minHeight: "100vh",
        paddingTop: "7rem",
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto" }}
        className="px-6 md:px-10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "3rem" }}
        >
          <Link
            href="/#work"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--silver)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--white)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--silver)")
            }
          >
            ← {group.title}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ marginBottom: "3rem" }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "0.75rem",
            }}
          >
            {group.title} / {shoot.title}
          </p>

          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
              fontWeight: 300,
              letterSpacing: "0.04em",
              color: "var(--white)",
              lineHeight: 1,
            }}
          >
            {shoot.title}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "var(--silver)",
              marginTop: "0.75rem",
            }}
          >
            {shoot.photos.length} {shoot.photos.length === 1 ? "photo" : "photos"}
          </p>
        </motion.div>

        <PhotoGrid photos={shoot.photos} />
      </div>
    </main>
  );
}
