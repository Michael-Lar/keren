# Film Portfolio

A world-class film photography portfolio. Three-level architecture: landing → section → shoot. Fully static, deployable to Vercel for free.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Managing Your Content

**Everything lives in one file: `content/portfolio.config.ts`**

You never need to touch any other file to manage your portfolio.

### Change your name, tagline, or bio

Open `content/portfolio.config.ts` and edit the top-level fields:

```ts
name: "Your Name",
tagline: "Film Photography",
bio: {
  paragraphs: ["First paragraph...", "Second paragraph..."],
  image: "/photos/bio/portrait.jpg",
},
contact: {
  email: "you@email.com",
  instagram: "yourhandle", // without the @
},
```

---

## Photo Folder Structure

```
public/photos/
├── hero/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ...
├── bio/
│   └── portrait.jpg
├── live-music/
│   ├── cover.jpg
│   ├── gov-ball-2024/
│   │   ├── cover.jpg
│   │   ├── 01.jpg
│   │   └── 02.jpg
│   └── late-night-club/
│       ├── cover.jpg
│       └── 01.jpg
├── street/
│   ├── cover.jpg
│   └── new-york/
│       ├── cover.jpg
│       └── 01.jpg
├── portraits/
│   ├── cover.jpg
│   └── ...
└── nature/
    ├── cover.jpg
    └── ...
```

See `public/photos/README.md` for full details.

---

## Add a New Section

1. Create the folder: `public/photos/my-new-section/cover.jpg`
2. Add to `portfolio.config.ts`:

```ts
{
  id: "my-new-section",      // becomes the URL slug
  title: "My New Section",
  coverImage: "/photos/my-new-section/cover.jpg",
  description: "One line description.",
  shoots: []
}
```

---

## Add a New Shoot Within a Section

1. Create: `public/photos/[section-id]/[shoot-id]/cover.jpg`
2. Add your photos: `01.jpg`, `02.jpg`, etc.
3. Add to the section's `shoots` array in config:

```ts
{
  id: "my-shoot",
  title: "My Shoot",
  coverImage: "/photos/live-music/my-shoot/cover.jpg",
  photos: [
    { src: "/photos/live-music/my-shoot/01.jpg", caption: "Location, date" },
    { src: "/photos/live-music/my-shoot/02.jpg", caption: "" }, // empty = no caption
  ]
}
```

---

## Add Photos to an Existing Shoot

Drop the file in the shoot's folder, then add to `photos`:

```ts
{ src: "/photos/live-music/gov-ball-2024/06.jpg", caption: "Your caption" }
```

---

## Add a Hero Video

When you have a showreel, set `heroVideo` in config:

```ts
heroVideo: "/videos/reel.mp4",
```

Drop `reel.mp4` in `public/videos/`. The video replaces the image slideshow automatically. Set back to `null` to return to images.

---

## Image Guidelines

- **Format:** JPG or WebP (not PNG — too large)
- **Hero images:** 1920px wide, under 2MB each
- **Section/shoot cover tiles:** 800–1200px wide, under 1MB
- **Shoot photos:** 1400–1800px on the long edge, under 3MB
- **Bio portrait:** 800px wide, under 1MB

---

## Deploy to Vercel

```bash
npx vercel
```

Follow the prompts. Your site will be live at a `.vercel.app` URL instantly.

### Connect a Custom Domain

1. In the Vercel dashboard → your project → Settings → Domains
2. Add your domain (e.g. `callowayfilm.com`)
3. Update your DNS records as instructed by Vercel
4. SSL is automatic

---

## Site Architecture

```
Level 1: /                          — Landing: hero + 4 section tiles
Level 2: /section/[id]              — Section: shoot/album grid
Level 3: /section/[id]/[shoot-id]   — Shoot: photo scroll + lightbox
```

Additional pages:
- `/bio` — Portrait + bio paragraphs + contact
- `/contact` — Simple centered contact page
