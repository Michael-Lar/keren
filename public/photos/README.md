# Photo Folder Structure

This folder holds all your portfolio images. Organize them exactly as shown below.

## Folder Tree

```
public/photos/
├── hero/
│   ├── 1.jpg          ← Hero slideshow image 1
│   ├── 2.jpg          ← Hero slideshow image 2
│   ├── 3.jpg          ← ... and so on
│   └── 4.jpg
│
├── bio/
│   └── portrait.jpg   ← Your bio page portrait
│
├── live-music/
│   ├── cover.jpg      ← Section cover tile on landing page
│   ├── gov-ball-2024/
│   │   ├── cover.jpg  ← Shoot cover tile in the section grid
│   │   ├── 01.jpg
│   │   ├── 02.jpg
│   │   └── 03.jpg
│   └── late-night-club/
│       ├── cover.jpg
│       ├── 01.jpg
│       └── 02.jpg
│
├── street/
│   ├── cover.jpg
│   └── new-york/
│       ├── cover.jpg
│       └── 01.jpg
│
├── portraits/
│   ├── cover.jpg
│   └── studio-2024/
│       ├── cover.jpg
│       └── 01.jpg
│
└── nature/
    ├── cover.jpg
    └── upstate-fall/
        ├── cover.jpg
        └── 01.jpg
```

## Rules

1. **Folder names must match the `id` fields** in `portfolio.config.ts`.
   If your section id is `"live-music"`, the folder must be `live-music/`.
   If your shoot id is `"gov-ball-2024"`, the folder must be `gov-ball-2024/`.

2. **Image paths in config must start with `/photos/`**
   Example: `/photos/live-music/gov-ball-2024/01.jpg`

3. **Recommended formats:** JPG or WebP.
   Keep files under 3MB each for fast load times.
   For hero images: aim for 1920px wide.
   For shoot photos: 1400–1800px on the long edge is ideal.
   For cover tiles: 800–1200px wide.

4. **File names:** anything works, but numbered sequences (`01.jpg`, `02.jpg`)
   keep things clean and predictable.

5. **Cover images:** Every section AND every shoot needs a `cover.jpg`.
   This is the tile image shown in the grids. It can be the same as one
   of your shoot photos — just copy it.

## Adding a New Section

1. Create a folder: `public/photos/[your-section-id]/cover.jpg`
2. Add your section object to the `sections` array in `portfolio.config.ts`

## Adding a New Shoot

1. Create: `public/photos/[section-id]/[shoot-id]/cover.jpg`
2. Add your photos: `public/photos/[section-id]/[shoot-id]/01.jpg`, `02.jpg`, etc.
3. Add a shoot object to the section's `shoots` array in `portfolio.config.ts`

## Adding Photos to a Shoot

1. Drop the image into the shoot folder
2. Add an entry to the shoot's `photos` array in config:
   ```ts
   { src: "/photos/live-music/gov-ball-2024/05.jpg", caption: "Your caption here" }
   ```
   Leave caption as `""` for no caption.
