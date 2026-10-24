# Anwar Creative Studio Portfolio

Live at [anwarcreativestudio.com](https://anwarcreativestudio.com). The company website of Anwar Creative Studio LLC, an independent software company. Corres and Artha are the flagships; Tether, Jotfield and Doorsong sit in "From the workshop".

Contact: contact@anwarcreativestudio.com

## Running locally

```sh
npm install
npm run dev
npm run build
npm run lint
node --test tests/reveal.test.cjs
```

React, TypeScript, Vite, and Tailwind CSS. The hero and ambient field use Canvas 2D. Fonts and artwork are self-hosted. GitHub Actions deploys the production build to GitHub Pages when main is updated, served on the custom domain anwarcreativestudio.com (set in the repo's Pages settings, DNS at Namecheap).

## Content

- `src/content/projects.ts`: released projects and build notes.
- `src/content/corres.ts`: Corres positioning and current progress.
- `src/content/roadmap.ts`: work in development.
- `src/pages/NowPage.tsx`: current work and update date.
- `src/components/sections/Flagships.tsx`: Artha and Corres features.
- `src/components/CommandPalette.tsx`: searchable navigation.

Corres has its own page at anwarcreativestudio.com/corres/ (static, `public/corres/index.html`), with terms at `/corres/terms/`. Its artwork comes from the native Corres design system. Its privacy policy is served from `public/corres/privacy/` at anwarcreativestudio.com/corres/privacy/.

Each reveal target is observed independently at threshold zero. Keyboard focus reveals its containing item. Reduced motion disables reveal transitions and card tilt. Search supports arrows, Enter, Escape, and contained Tab navigation.

Research and verification: `docs/portfolio-update.md`.

Built by Anwar Creative Studio.
