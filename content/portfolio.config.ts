/**
 * ============================================================
 * PORTFOLIO CONFIG — THE ONLY FILE YOU NEED TO EDIT
 * ============================================================
 *
 * This is your entire portfolio in one file. Change your name,
 * swap images, add shoots, reorder groups — all here.
 *
 * See /public/photos/README.md for photo folder instructions.
 * ============================================================
 */

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
   *
   * paragraphs: Array of strings, each becomes its own <p> tag.
   * image: Path to your portrait photo in /public/photos/bio/
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
   * Hero slideshow images (used on the landing page).
   * Order matters — they cycle in sequence.
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
   *
   * Shoots appear as tiles on the homepage gallery grid.
   * Each shoot is one photo collection at /shoot/[shootId].
   *
   * Photo aspect: "3:4" (portrait), "4:3" (landscape), "1:1" (square).
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
          photos: (() => {
            const nums = [2, 3, 4, 5, 6, 7, 8];
            const captions = [
              "New York, NY",
              "35mm — Kodak Tri-X 400",
              "Manhattan",
              "",
              "Brooklyn",
              "35mm — Ilford HP5",
              "Chinatown",
            ];
            const aspects = ["3:4", "4:3", "1:1", "3:4", "4:3", "1:1", "3:4"] as const;
            return nums.map((n, i) => ({
              src: `/photos/film-24-25/${String(n).padStart(2, "0")}.jpg`,
              caption: captions[i],
              aspect: aspects[i],
            }));
          })(),
        },
        {
          id: "portraits-film",
          title: "Portraits",
          coverImage: "/photos/film-24-25/10.jpg",
          photos: [10, 11, 12, 13, 14, 15].map((n, i) => ({
            src: `/photos/film-24-25/${String(n).padStart(2, "0")}.jpg`,
            caption: "",
            aspect: (["3:4", "1:1", "4:3", "3:4", "1:1", "4:3"] as const)[i],
          })),
        },
        {
          id: "architecture",
          title: "Architecture",
          parent: "Spaces",
          coverImage: "/photos/spaces/01.jpg",
          photos: Array.from({ length: 81 }, (_, i) => ({
            src: `/photos/spaces/${String(i + 1).padStart(2, "0")}.jpg`,
            caption: "",
            aspect: "4:3" as const,
          })),
        },
        {
          id: "nature-film",
          title: "Nature",
          parent: "Spaces",
          coverImage: "/photos/spaces/15.jpg",
          photos: [15, 25, 35, 45, 55, 65, 75].map((n) => ({
            src: `/photos/spaces/${String(n).padStart(2, "0")}.jpg`,
            caption: "",
            aspect: "4:3" as const,
          })),
        },
        {
          id: "still-constructed",
          title: "Still / Constructed",
          coverImage: "/photos/film-24-25/20.jpg",
          photos: [20, 21, 22, 23, 24, 25].map((n, i) => ({
            src: `/photos/film-24-25/${String(n).padStart(2, "0")}.jpg`,
            caption: "",
            aspect: (["1:1", "4:3", "3:4", "1:1", "4:3", "3:4"] as const)[i],
          })),
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
          photos: Array.from({ length: 39 }, (_, i) => ({
            src: `/photos/live-music/whitewater-11-29-24/${String(i + 1).padStart(2, "0")}.jpg`,
            caption: "",
            aspect: "4:3" as const,
          })),
        },
        {
          id: "portraits-digital",
          title: "Portraits",
          coverImage: "/photos/film-24-25/40.jpg",
          photos: [40, 41, 42, 43, 44].map((n) => ({
            src: `/photos/film-24-25/${String(n).padStart(2, "0")}.jpg`,
            caption: "",
            aspect: "3:4" as const,
          })),
        },
        {
          id: "nature",
          title: "Nature",
          coverImage: "/photos/spaces/15.jpg",
          photos: [15, 25, 35, 45, 55].map((n) => ({
            src: `/photos/spaces/${String(n).padStart(2, "0")}.jpg`,
            caption: "",
            aspect: "3:4" as const,
          })),
        },
        {
          id: "projects",
          title: "Projects",
          coverImage: "/photos/spaces/50.jpg",
          photos: [50, 60, 70].map((n) => ({
            src: `/photos/spaces/${String(n).padStart(2, "0")}.jpg`,
            caption: "",
            aspect: "4:3" as const,
          })),
        },
      ],
    },
  ],
};

// ============================================================
// TypeScript types — exported for use in components
// ============================================================

export type PhotoAspect = "3:4" | "4:3" | "1:1";

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

/** Get all shoots across groups (for homepage grid and lookup by id). */
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
