# Anwar Creative Studio

Live at [anwarcreativestudio.com](https://anwarcreativestudio.com). The company website of Anwar Creative Studio, an independent software company. Artha and Corres are its two flagship apps, and the site presents the company the way Apple or Panic present theirs: in the company's own voice, with the founder named once, under Leadership on About.

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
- `src/lib/tours.ts`: the Artha and Corres tours on the homepage.
- `src/components/identity/Lockup.tsx`: the hanging a, the "Anwar." lockup and the "a." end mark.
- `src/components/devices/Bezels.tsx`: Apple's Product Bezels around the live screens.
- `src/styles/site.css`: shared design (header, footer, inner pages). `src/styles/home.css`: the homepage only, loaded by `src/main.tsx`. Tokens for light and dark are in `src/styles/theme.css`.
- `src/content/`: company facts, the Newsroom entries (`journal.ts`) and links.
- `src/pages/`: About, Newsroom (at /journal/), Press, Contact, About this site (at /colophon/), Privacy, Terms and the 404 page. /now/ forwards to the Newsroom (`public/now/index.html`). Experiments (`src/pages/ExperimentsPage.tsx`) lists small pieces that aren't products; Doorsong's hosted copy is `public/experiments/doorsong/` (from the Doorsong repo, with no em dashes, company links and its own preview image).
- `src/components/CommandPalette.tsx`: the Menu button and ⌘K navigation.
- `public/og-image.png`: the card shown when a link to the site is shared.
- `design/`: the design record, every homepage concept and the logo study. Not deployed.

Corres also has a copy of its site at anwarcreativestudio.com/corres/ (static, `public/corres/`), with its iPhone Duo section, support, terms and the privacy policy (what each service sees, how long each record is kept, and how to delete it). `scripts/publish-corres-app.sh` publishes the same files to corres.app; edit them here, never in corres-site. Keep `public/google3cee5c276a72f1e6.html`: it proves the domain to Google.

Built by Anwar Creative Studio.
