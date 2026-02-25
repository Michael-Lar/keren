"use client";

import { useEffect, useRef } from "react";

interface InstagramEmbedProps {
  postUrls: string[];
}

/**
 * Renders real Instagram post embeds in a responsive grid.
 * Loads Instagram's embed.js once, then processes all blockquotes.
 */
export default function InstagramEmbed({ postUrls }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const processEmbeds = () => {
      const win = window as unknown as { instgrm?: { Embeds: { process: () => void } } };
      if (win.instgrm) {
        win.instgrm.Embeds.process();
      }
    };

    if (!scriptLoaded.current) {
      const existing = document.querySelector('script[src*="instagram.com/embed.js"]');
      if (existing) {
        scriptLoaded.current = true;
        setTimeout(processEmbeds, 100);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        scriptLoaded.current = true;
        setTimeout(processEmbeds, 100);
      };
      document.body.appendChild(script);
    } else {
      setTimeout(processEmbeds, 100);
    }
  }, [postUrls]);

  return (
    <div ref={containerRef} className="ig-embed-grid">
      {postUrls.map((url, i) => (
        <div key={i} className="ig-embed-item">
          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
            data-instgrm-version="14"
            style={{
              background: "#000",
              border: 0,
              borderRadius: "3px",
              margin: 0,
              maxWidth: "540px",
              minWidth: "280px",
              padding: 0,
              width: "100%",
            }}
          />
        </div>
      ))}
    </div>
  );
}
