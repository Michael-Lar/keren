/**
 * gen-photo-meta.ts
 *
 * Scans public/photos/ recursively, reads every image's pixel dimensions
 * via sharp, and writes content/photo-meta.json.
 *
 * Run after adding new photos:
 *   npm run gen-meta
 *
 * The output is imported by portfolio.config.ts so aspect ratios are
 * never manually typed — they're derived from the actual image files.
 */

import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "fs";
import { join, relative } from "path";

const PHOTOS_DIR = join(process.cwd(), "public", "photos");
const OUTPUT_FILE = join(process.cwd(), "content", "photo-meta.json");

type PhotoAspect = "3:4" | "4:3" | "1:1";

interface PhotoMeta {
  src: string;
  width: number;
  height: number;
  aspect: PhotoAspect;
}

function classifyAspect(width: number, height: number): PhotoAspect {
  const ratio = width / height;
  if (ratio > 1.1) return "4:3";   // landscape
  if (ratio < 0.91) return "3:4";  // portrait
  return "1:1";                     // square
}

function walkDir(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkDir(full));
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const files = walkDir(PHOTOS_DIR);
  console.log(`Found ${files.length} images in public/photos/`);

  const results: PhotoMeta[] = [];

  for (const file of files) {
    try {
      const { width, height } = await sharp(file).metadata();
      if (!width || !height) {
        console.warn(`  Skipping (no dimensions): ${file}`);
        continue;
      }
      // Convert absolute path to web path: /photos/...
      const rel = "/" + relative(join(process.cwd(), "public"), file).replace(/\\/g, "/");
      results.push({
        src: rel,
        width,
        height,
        aspect: classifyAspect(width, height),
      });
    } catch (err) {
      console.warn(`  Error reading ${file}:`, err);
    }
  }

  // Sort by src path for stable diffs
  results.sort((a, b) => a.src.localeCompare(b.src));

  writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2) + "\n");
  console.log(`\nWrote ${results.length} entries to content/photo-meta.json`);

  // Summary
  const counts = { "4:3": 0, "3:4": 0, "1:1": 0 };
  for (const r of results) counts[r.aspect]++;
  console.log(`  Landscape 4:3 → ${counts["4:3"]}`);
  console.log(`  Portrait  3:4 → ${counts["3:4"]}`);
  console.log(`  Square    1:1 → ${counts["1:1"]}`);
}

main();
