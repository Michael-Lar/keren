/**
 * ============================================================
 * PORTFOLIO CONFIG — THE ONLY FILE YOU NEED TO EDIT
 * ============================================================
 *
 * This is your entire portfolio in one file. Change your name,
 * swap images, add shoots, reorder groups — all here.
 *
 * Aspect ratios are auto-detected from image files.
 * Run `npm run gen-meta` after adding new photos.
 * ============================================================
 */

import photoMetaRaw from "./photo-meta.json";

// ============================================================
// Internal: aspect-ratio lookup from generated metadata
// ============================================================

export type PhotoAspect = "3:4" | "4:3" | "1:1";

const _metaMap = new Map<string, PhotoAspect>(
  (photoMetaRaw as { src: string; aspect: PhotoAspect }[]).map((m) => [
    m.src,
    m.aspect,
  ])
);

/** Returns the auto-detected aspect ratio for a photo src path. */
function a(src: string): PhotoAspect {
  return _metaMap.get(src) ?? "4:3";
}

/** Build a photo array from src paths and optional captions. */
function photos(
  srcs: string[],
  captions: (string | undefined)[] = []
): { src: string; caption: string; aspect: PhotoAspect }[] {
  return srcs.map((src, i) => ({ src, caption: captions[i] ?? "", aspect: a(src) }));
}

// ============================================================
// Site config
// ============================================================

export const siteConfig = {
  /**
   * Your full name. Displayed in the nav (top-left) on every
   * page and large in the hero. The nav name always links home.
   */
  name: "Keren Lifschitz",

  /**
   * Short descriptor shown below your name in the hero,
   * in tiny monospaced font at ~40% opacity.
   */
  tagline: "Film & Digital Photography",

  /**
   * Bio page content.
   */
  bio: {
    paragraphs: [
      "Third year student in a 5 year dual degree program at The New School and Parsons School of Design, studying Psychology (BA) and Photography (BFA).",
      "I work across film and digital — from street and portraits to live music and constructed stills. My work lives in the space between the decisive moment and the one you almost missed.",
    ],
    image: "/photos/film-24-25/01.jpg",
  },

  /**
   * Contact info shown on the /contact page and /bio page.
   * Instagram handle without the @.
   */
  contact: {
    email: "keren.lifschitz3@gmail.com",
    instagram: "k.sdrkl",
  },

  /**
   * Hero slideshow images. Order matters — they cycle in sequence.
   */
  heroImages: [
    "/photos/spaces/01.jpg",
    "/photos/film-24-25/01.jpg",
    "/photos/spaces/10.jpg",
    "/photos/film-24-25/15.jpg",
    "/photos/spaces/20.jpg",
  ],

  heroVideo: null as string | null,

  /**
   * ============================================================
   * GROUPS — Analog / Digital. Each group contains shoots (galleries).
   * ============================================================
   */
  groups: [
    {
      id: "analog",
      title: "Analog",
      shoots: [
        {
          id: "street",
          title: "Street",
          coverImage: "/photos/film-24-25/02.jpg",
          photos: photos(
            [2, 3, 4, 5, 6, 7, 8].map(
              (n) => `/photos/film-24-25/${String(n).padStart(2, "0")}.jpg`
            ),
            ["New York, NY", "35mm — Kodak Tri-X 400", "Manhattan", "", "Brooklyn", "35mm — Ilford HP5", "Chinatown"]
          ),
        },
        {
          id: "portraits-film",
          title: "Portraits",
          coverImage: "/photos/film-24-25/10.jpg",
          photos: photos(
            [10, 11, 12, 13, 14, 15].map(
              (n) => `/photos/film-24-25/${String(n).padStart(2, "0")}.jpg`
            )
          ),
        },
        {
          id: "architecture",
          title: "Architecture",
          parent: "Spaces",
          coverImage: "/photos/spaces/01.jpg",
          photos: photos(
            Array.from({ length: 81 }, (_, i) =>
              `/photos/spaces/${String(i + 1).padStart(2, "0")}.jpg`
            )
          ),
        },
        {
          id: "nature-film",
          title: "Nature",
          parent: "Spaces",
          coverImage: "/photos/spaces/15.jpg",
          photos: photos(
            [15, 25, 35, 45, 55, 65, 75].map(
              (n) => `/photos/spaces/${String(n).padStart(2, "0")}.jpg`
            )
          ),
        },
        {
          id: "still-constructed",
          title: "Still / Constructed",
          coverImage: "/photos/film-24-25/20.jpg",
          photos: photos(
            [20, 21, 22, 23, 24, 25].map(
              (n) => `/photos/film-24-25/${String(n).padStart(2, "0")}.jpg`
            )
          ),
        },
      ],
    },
    {
      id: "digital",
      title: "Digital",
      shoots: [
        {
          id: "live-music",
          title: "Live Music",
          coverImage: "/photos/live-music/whitewater-11-29-24/01.jpg",
          photos: photos(
            Array.from({ length: 39 }, (_, i) =>
              `/photos/live-music/whitewater-11-29-24/${String(i + 1).padStart(2, "0")}.jpg`
            )
          ),
        },
        {
          id: "portraits-digital",
          title: "Portraits",
          coverImage: "/photos/portraits-digital/01.jpg",
          photos: photos(
            Array.from({ length: 14 }, (_, i) =>
              `/photos/portraits-digital/${String(i + 1).padStart(2, "0")}.jpg`
            )
          ),
        },
        {
          id: "nature",
          title: "Nature",
          coverImage: "/photos/spaces/15.jpg",
          photos: photos(
            [15, 25, 35, 45, 55].map(
              (n) => `/photos/spaces/${String(n).padStart(2, "0")}.jpg`
            )
          ),
        },
        {
          id: "projects",
          title: "Projects",
          coverImage: "/photos/spaces/50.jpg",
          photos: photos(
            [50, 60, 70].map(
              (n) => `/photos/spaces/${String(n).padStart(2, "0")}.jpg`
            )
          ),
        },
      ],
    },
  ],
};

// ============================================================
// TypeScript types — exported for use in components
// ============================================================

export type Photo = {
  src: string;
  caption: string;
  aspect: PhotoAspect;
};

export type Shoot = {
  id: string;
  title: string;
  coverImage: string;
  photos: Photo[];
  /** Optional parent category name — used for subheadings (e.g. "Spaces"). */
  parent?: string;
};

export type Group = {
  id: string;
  title: string;
  shoots: Shoot[];
};

export type SiteConfig = typeof siteConfig;

/** Get all shoots across groups. */
export function getAllShoots(): Shoot[] {
  return siteConfig.groups.flatMap((g) => g.shoots);
}

/** Find a shoot by id. */
export function getShootById(shootId: string): Shoot | undefined {
  return getAllShoots().find((s) => s.id === shootId);
}

/** Find the group that contains a shoot. */
export function getGroupForShoot(shootId: string): Group | undefined {
  return siteConfig.groups.find((g) => g.shoots.some((s) => s.id === shootId));
}
