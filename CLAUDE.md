# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page React 18 + Vite 5 birthday site ("20 ans, 20 cadeaux"): hero, a short note, a Polaroid photo gallery, wishes, a grid of 20 gifts opened one by one, and a closing letter. All user-facing text is in French; keep new copy and code comments in French to match.

## Commands

```bash
npm install
npm run dev       # dev server, usually http://localhost:5173
npm run build     # production build into dist/ (deployable as-is to Netlify/Vercel/GitHub Pages)
npm run preview   # serve the built dist/
```

There are no tests, linter, or formatter configured.

## Architecture

- **`src/data.js` is the single source of content**: `PRENOM`, `SIGNATURE`, `PHOTOS`, `MOT`, `VOEUX`, `CADEAUX`, `LETTRE`. Components import from it directly; content changes should go here, not into components. The gift count shown in the UI is derived from `CADEAUX.length`.
- **`src/App.jsx`** defines section order. It owns a ref to `Confetti` (which exposes `burst(x, y, n)` via `forwardRef`/`useImperativeHandle`) and passes a `burst` callback down to `Cadeaux`.
- **`Cadeaux.jsx`** holds the opened-gift state as a `Set` of indices, persisted to `localStorage` under key `cadeaux20-ouverts` (wrapped in try/catch). Opening a new gift fires confetti from the clicked element; the last one triggers a bigger burst. `GiftModal` shows the gift's `why` text and navigates between gifts via `onGo`.
- **`Loader.jsx`** is a full-screen overlay (0→20 counter that preloads `PHOTOS`, then shows a "Découvrir" button). `App.jsx` renders it on top of the site until `onDone`, so the page underneath is already mounted. It locks `body` scrolling while visible. Its `.loader-btn` hide rule has to beat `.btn:disabled`'s opacity.
- **Scroll reveals**: any element with a `data-reveal` attribute (value picks the animation: none/`fade`/`left`/`zoom`/`drop`/`pop`) starts hidden and gets a `data-vu` attribute from the IntersectionObserver in `src/useReveal.js`. It must be an attribute, not a class: React rewrites `className` on re-render (e.g. `.gift` toggling `is-open`), which would wipe it and hide the element again. Stagger with `style={delai(i, pas)}` (sets `--d`). The observer only starts when the loader's button is clicked (`onDepart`), so the hero animates as the loader fades. The keyframes use the individual `translate`/`scale`/`rotate` properties so they don't clash with the existing `transform`s on `.gift` hover and `.polaroid` tilt.
- **`src/styles.css`** is one global stylesheet; theme colors and font stacks are CSS variables in `:root` at the top. Fonts (Instrument Serif, Caveat, Figtree) load from Google Fonts in `index.html`. Animations respect `prefers-reduced-motion`.

## Photos

Images live in `public/photos/` and are referenced in `data.js` as `/photos/<file>`. Don't put them anywhere else (e.g. a root-level `photos/` with `../photos/...` paths): the Vite dev server would still serve them, but they aren't copied into `dist/`, so the gallery breaks once deployed (this happened on Vercel).

Deployed on Vercel from `github.com/marcyannick1/reine20birthday`; Vercel builds the pushed commit, so local changes only show up after a push.
