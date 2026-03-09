"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface BackLinkProps {
  href: string;
  label: string;
}

export default function BackLink({ href, label }: BackLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: "1rem" }}
    >
      <Link
        href={href}
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
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--silver)")}
      >
        ← {label}
      </Link>
    </motion.div>
  );
}
