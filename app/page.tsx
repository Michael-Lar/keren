import Hero from "@/components/Hero";
import GalleryGrid from "@/components/GalleryGrid";

/**
 * Landing Page — /
 *
 * Hero: ~60vh crossfading slideshow (or video if configured)
 * Below: gallery grid of shoot tiles with Analog/Digital/All tabs
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <GalleryGrid />
    </main>
  );
}
