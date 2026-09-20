# Anwar Creative Studio Portfolio

Artha and the upcoming Corres lead the studio portfolio. Doorsong, Jotfield, Tether, and Stub make up the wider collection. Corres and Ranna are in development.

## Running locally

```sh
npm install
npm run dev
npm run build
npm run lint
node --test tests/reveal.test.cjs
```

React, TypeScript, Vite, and Tailwind CSS. The hero and ambient field use Canvas 2D. Fonts and artwork are self-hosted. GitHub Actions deploys the production build when main is updated.

## Content

- `src/content/projects.ts`: released projects and build notes.
- `src/content/corres.ts`: Corres positioning and current progress.
- `src/content/roadmap.ts`: work in development, with Corres first.
- `src/pages/NowPage.tsx`: current work and update date.
- `src/components/sections/Flagships.tsx`: Artha and Corres features.
- `src/components/CommandPalette.tsx`: searchable navigation.

Corres links to its home-page section until a dedicated product page exists. Its artwork comes from the native Corres design system. The app currently uses sample mail; Gmail is planned for the first release.

Each reveal target is observed independently at threshold zero. Keyboard focus reveals its containing item. Reduced motion disables reveal transitions and card tilt. Search supports arrows, Enter, Escape, and contained Tab navigation.

Research and verification: `docs/portfolio-update.md`.

Built by Anwar Creative Studio.
