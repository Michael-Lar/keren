"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/portfolio.config";
const IG_HANDLE = siteConfig.contact.instagram;
const IG_URL = `https://instagram.com/${IG_HANDLE}`;

export default function BioPage() {
  return (
    <main
      style={{
        backgroundColor: "var(--black)",
        minHeight: "100vh",
        paddingTop: "7rem",
        paddingBottom: "6rem",
      }}
    >
      <div
        style={{ maxWidth: "1100px", margin: "0 auto" }}
        className="px-6 md:px-10"
      >
        <div className="bio-grid">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ position: "relative" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3/4",
                overflow: "hidden",
              }}
            >
              <Image
                src={siteConfig.bio.image}
                alt={siteConfig.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{
                  objectFit: "cover",
                  filter: "contrast(1.05) brightness(0.95)",
                }}
                quality={90}
              />
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "0.04em",
                color: "var(--white)",
                lineHeight: 1,
                marginBottom: "2rem",
              }}
            >
              <em>{siteConfig.name.split(" ")[0]}</em>{" "}
              {siteConfig.name.split(" ").slice(1).join(" ")}
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {siteConfig.bio.paragraphs.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--font-lora), Georgia, serif",
                    fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
                    lineHeight: 1.85,
                    color: "var(--light)",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            <div
              style={{
                height: "1px",
                backgroundColor: "var(--mid)",
                margin: "2.5rem 0",
              }}
            />

            {/* Contact */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <a
                href={`mailto:${siteConfig.contact.email}`}
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  color: "var(--silver)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--white)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--silver)")
                }
              >
                {siteConfig.contact.email}
              </a>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  color: "var(--silver)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--white)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--silver)")
                }
              >
                @{IG_HANDLE}
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </main>
  );
}
