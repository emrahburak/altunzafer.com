# AGENTS.md — altunzafer.com

Compact guide for future OpenCode sessions working in this repo.

## Stack

- **Vite 7** + **React 19** + **TypeScript 5.9** SPA.
- **Tailwind CSS v4** via `@tailwindcss/vite`; theme tokens live in `src/index.css` using `@theme`.
- **React Router v7** (`BrowserRouter`). Routes are declared in `src/App.tsx` inside `MainLayout`.
- **i18next** with `tr` (default) and `en` translations in `src/locales/*.json`.
- **GSAP + ScrollTrigger** for animations; plugins are registered in the consuming entry components.
- Deployed to **Vercel** as a single-page app (`vercel.json` rewrites all paths to `index.html`).

## Everyday commands

```bash
# Install dependencies (legacy peer deps are required — see .npmrc)
npm install

# Dev server
npm run dev

# Production build — TypeScript must pass before Vite builds
npm run build

# Preview production build locally
npm run preview

# Lint only (no tests are configured)
npm run lint
```

## Project structure

```
src/
  App.tsx              # Route definitions
  main.tsx             # App bootstrap: StrictMode, HelmetProvider, BrowserRouter
  i18n.ts              # i18next init, default lang = tr
  index.css            # Tailwind v4 entry + fonts + theme tokens
  layouts/MainLayout.tsx
  pages/               # Home, Privacy, NotFound
  components/          # Page sections (Hero, Biography, Awards, etc.)
  data/                # Static data modules (awards, career, sinema, etc.)
  locales/             # tr.json, en.json
  utils/               # Shared helpers, e.g. cdnImage()
public/                # Static deploy assets (favicons, OG image, sitemap, PDFs)
```

## Conventions an agent would miss

- **Path alias**: `@/*` maps to `src/*`. Use it for imports; configured in both `tsconfig.app.json` and `vite.config.ts`.
- **No tests**: there is no test runner. Verification is `npm run lint` + `npm run build`.
- **TypeScript is strict**: unused locals/parameters are errors, `verbatimModuleSyntax` is on, and `erasableSyntaxOnly` is enabled.
- **Build order matters**: `npm run build` = `tsc -b && vite build`. Do not run `vite build` alone and assume type safety.
- **`.npmrc`**: `legacy-peer-deps=true` is required; installs may fail without it.

## Images / assets workflow

Photos and video posters are served from the **Cloudflare R2 CDN**, not from the repo.

- Base CDN URL is read from the `VITE_CDN_URL` environment variable (fallback: `https://cdn.altunzafer.com`).
- Set `VITE_CDN_URL` in Vercel under Project Settings > Environment Variables for Production/Preview/Development.
- For local development, copy `.env.example` to `.env` and adjust if needed.
- Use the helper to reference an image:
  ```ts
  import { cdnImage } from "@/utils/cdn";
  const img = cdnImage("altun-hero-01.webp");
  ```
- The final URL is: `<VITE_CDN_URL>/images/<filename>.webp`.
- Upload new images to the R2 `images/` folder; do not add them to `src/assets/`.
- The local image optimizer and `src/assets/images/` directory were removed; images are no longer bundled with the app.

## Build / deploy notes

- `vite.config.ts` has **manual chunking**: `vendor-gsap`, `vendor-lightbox`, `vendor-core`, and a generic `vendor` chunk.
- `vite-plugin-compression` emits `.gz` and `.br` files during build.
- `rollup-plugin-visualizer` writes `stats.html` at repo root after build.
- `dist/` is the build output and is gitignored.
- Vercel handles SPA routing; every path falls back to `index.html`.

## Verification checklist before finishing

1. `npm run lint` passes.
2. `npm run build` passes (this is the real gate; `vite build` alone is not enough).
3. If images were added/removed, they were uploaded to the R2 `images/` folder and referenced via `cdnImage("<filename>.webp")`.
4. Translations: if new copy was added, both `src/locales/tr.json` and `src/locales/en.json` were updated.
