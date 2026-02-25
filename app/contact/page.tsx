"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/portfolio.config";

/**
 * Contact Page — /contact
 *
 * Simple, centered, elegant.
 * Name + email link + instagram link.
 */
export default function ContactPage() {
  return (
    <main
      style={{
        backgroundColor: "var(--black)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          textAlign: "center",
          maxWidth: "480px",
        }}
      >
        {/* Name */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 300,
            letterSpacing: "0.06em",
            color: "var(--white)",
            marginBottom: "0.5rem",
            lineHeight: 1,
          }}
        >
          <em>{siteConfig.name.split(" ")[0]}</em>{" "}
          {siteConfig.name.split(" ").slice(1).join(" ")}
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--silver)",
            marginBottom: "3rem",
          }}
        >
          {siteConfig.tagline}
        </p>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--mid)",
            width: "60px",
            margin: "0 auto 3rem",
          }}
        />

        {/* Contact links */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            alignItems: "center",
          }}
        >
          <a
            href={`mailto:${siteConfig.contact.email}`}
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "13px",
              letterSpacing: "0.1em",
              color: "var(--light)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--white)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--light)")
            }
          >
            {siteConfig.contact.email}
          </a>

          <a
            href={`https://instagram.com/${siteConfig.contact.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "13px",
              letterSpacing: "0.1em",
              color: "var(--light)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--white)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--light)")
            }
          >
            @{siteConfig.contact.instagram}
          </a>
        </div>
      </motion.div>
    </main>
  );
}
