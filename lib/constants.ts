/**
 * Design constants — single source of truth for values used in JSX inline styles.
 * CSS equivalents are defined as custom properties in styles/globals.css (:root).
 */

/** Z-index layer stack. Matches --z-* tokens in globals.css. */
export const Z = {
  nav: 1000,
  navOverlay: 999,
  grain: 9998,
  lightbox: 9999,
} as const;
