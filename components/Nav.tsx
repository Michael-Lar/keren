"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/content/portfolio.config";

/**
 * Nav — Fixed transparent navigation on every page.
 *
 * Left: Name → links home
 * Right: ANALOG · DIGITAL · BIO · CONTACT
 * Mobile: hamburger → full-screen overlay
 */
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/analog", label: "ANALOG" },
    { href: "/digital", label: "DIGITAL" },
    { href: "/bio", label: "BIO" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background:
            "linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.25) 70%, transparent 100%)",
        }}
        className="flex items-start justify-between px-6 py-5 md:px-10 md:py-7"
      >
        <Link
          href="/"
          className="text-[11px] tracking-[0.22em] uppercase text-[var(--white)] opacity-90 hover:opacity-100 transition-opacity duration-200"
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            textShadow: "0 1px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)",
          }}
          onClick={() => setMenuOpen(false)}
        >
          {siteConfig.name}
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.22em] uppercase text-[var(--white)] opacity-80 hover:opacity-100 transition-opacity duration-200"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                textShadow: "0 1px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{ cursor: "none" }}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-px bg-[var(--white)]"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="block w-5 h-px bg-[var(--white)]"
          />
          <motion.span
            animate={
              menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.25 }}
            className="block w-5 h-px bg-[var(--white)]"
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] flex flex-col"
            style={{ backgroundColor: "var(--black)" }}
          >
            <div className="flex justify-between items-start px-6 py-5">
              <Link
                href="/"
                className="text-[11px] tracking-[0.22em] uppercase text-[var(--white)] opacity-90"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                onClick={() => setMenuOpen(false)}
              >
                {siteConfig.name}
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[var(--silver)] text-2xl leading-none"
                aria-label="Close menu"
                style={{ cursor: "none" }}
              >
                ×
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="text-5xl text-[var(--white)] hover:text-[var(--paper)] transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontWeight: 300,
                      letterSpacing: "0.05em",
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
