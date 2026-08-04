# Anwar Creative Studio Portfolio

The portfolio site for Anwar Creative Studio: the front door to the studio, and home for everything it ships, from Doorsong and Artha to what's next.

The hero is a drifting particle constellation rendered live on Canvas 2D, with ambient motion and depth that responds to scroll.

[Live site →](https://tamkin-anwar.github.io/anwar-creative-studio-portfolio/)

## What's here

- A hero built from a network of drifting particles connected by fine lines, with simple vanilla Canvas 2D physics (no WebGL, no material pipeline)
- Particles swirl around the cursor and nearby links brighten like a circuit lighting up, with a rotating HUD reticle tracking the pointer
- A sitewide ambient particle field drifting behind every section, not just the hero, built with React Three Fiber and drei's `Sparkles`
- Scroll-linked parallax: the hero and headline drift apart at different depths as you scroll past
- Project cards that tilt in 3D toward the cursor with a glow that follows it
- A custom lerped cursor with magnetic pull on links and buttons
- Full support for `prefers-reduced-motion`: every animated layer, from the particle field to the parallax, is disabled when the setting is on

## Tech stack

- React + TypeScript + Vite
- Vanilla Canvas 2D for the hero's particle field
- React Three Fiber and drei for the sitewide ambient sparkle layer
- Tailwind v4 for layout, with the type scale, spacing scale, and motion easing driven by CSS custom properties

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. `npm run build` produces a static `dist/`, no backend, no server.

## Credits

Design language carried forward from Doorsong and Artha. Built by **Anwar Creative Studio**.
