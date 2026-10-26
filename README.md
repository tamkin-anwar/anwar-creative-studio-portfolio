# Anwar Creative Studio

Live at [anwarcreativestudio.com](https://anwarcreativestudio.com). The company website of Anwar Creative Studio, an independent software company. Corres and Artha are the flagships; Tether, Jotfield and Doorsong sit in "From the workshop".

Contact: contact@anwarcreativestudio.com

## Running locally

```sh
npm install
npm run dev
npm run build
npm run lint
```

React 19, TypeScript, Vite and Tailwind CSS v4. Every page is prerendered to HTML at build time (`src/entry-server.tsx`, `scripts/prerender.mjs`), then React hydrates it. Fonts are self-hosted. GitHub Actions deploys `dist/` to GitHub Pages when main is updated, on the custom domain anwarcreativestudio.com (set in the repo's Pages settings, DNS at Namecheap).

## Where things live

- `src/components/sections/`: the homepage, from the hero to the footer.
- `src/lib/tours.ts`: the Corres and Artha tours on the homepage.
- `src/components/identity/Lockup.tsx`: the hanging a, the "Anwar." lockup and the "a." end mark.
- `src/components/devices/Bezels.tsx`: Apple's Product Bezels around the live screens.
- `src/styles/site.css`: shared design (header, footer, inner pages). `src/styles/home.css`: the homepage only, loaded by `src/main.tsx`. Tokens for light and dark are in `src/styles/theme.css`.
- `src/content/`: company facts, the journal and links.
- `src/pages/`: About, Journal, Now, Press, Contact, Colophon, Privacy, Terms and the 404 page.
- `src/components/CommandPalette.tsx`: the Menu button and ⌘K navigation.
- `public/og-image.png`: the card shown when a link to the site is shared.
- `design/`: the design record, every homepage concept and the logo study. Not deployed.

Corres also has a copy of its site at anwarcreativestudio.com/corres/ (static, `public/corres/`), with privacy and terms. `scripts/publish-corres-app.sh` publishes the same files to corres.app.

Built by Anwar Creative Studio.
