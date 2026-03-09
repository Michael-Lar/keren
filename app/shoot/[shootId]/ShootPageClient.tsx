"use client";

import { motion } from "framer-motion";
import { type Group, type Shoot } from "@/content/portfolio.config";
import PhotoGrid from "@/components/PhotoGrid";
import BackLink from "@/components/BackLink";

interface Props {
  group: Group;
  shoot: Shoot;
}

export default function ShootPageClient({ group, shoot }: Props) {
  const isSpaces = (shoot as { parent?: string }).parent === "Spaces";

  const backHref = isSpaces ? "/spaces" : `/${group.id}`;
  const backLabel = isSpaces ? "Spaces" : group.title;
  const breadcrumb = isSpaces
    ? `Analog / Spaces / ${shoot.title}`
    : `${group.title} / ${shoot.title}`;

  return (
    <main
      style={{
        backgroundColor: "var(--black)",
        minHeight: "100vh",
        paddingTop: "5rem",
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto" }}
        className="px-6 md:px-10"
      >
        <BackLink href={backHref} label={backLabel} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ marginBottom: "1.5rem" }}
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
            {breadcrumb}
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
            {shoot.photos.length}{" "}
            {shoot.photos.length === 1 ? "photo" : "photos"}
          </p>
        </motion.div>

        <PhotoGrid photos={shoot.photos} />
      </div>
    </main>
  );
}
