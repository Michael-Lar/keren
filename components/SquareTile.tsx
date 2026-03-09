"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface SquareTileProps {
  title: string;
  href: string;
  coverImage: string;
  index: number;
}

export default function SquareTile({ title, href, coverImage, index }: SquareTileProps) {
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
