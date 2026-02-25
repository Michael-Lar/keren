import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, Lora } from "next/font/google";
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import { siteConfig } from "@/content/portfolio.config";

// ─── Font Loading ─────────────────────────────────────────────
// All fonts via next/font/google for automatic optimization.

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  variable: "--font-dm-mono",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

// ─── Metadata ────────────────────────────────────────────────

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.bio.paragraphs[0],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.bio.paragraphs[0],
    images: [siteConfig.heroImages[0]],
  },
};

// ─── Root Layout ─────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmMono.variable} ${lora.variable}`}
    >
      <body>
        {/* Film grain — fixed overlay on every page, below lightbox z-index */}
        <GrainOverlay />

        {/* Custom cursor — desktop only, stays on top */}
        <CustomCursor />

        {/* Fixed navigation — present on every page */}
        <Nav />

        {/* Page content */}
        <div className="page-wrapper">{children}</div>
      </body>
    </html>
  );
}
