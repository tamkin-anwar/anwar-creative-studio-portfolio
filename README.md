# Anwar Creative Studio Portfolio 💎

The studio site for Anwar Creative Studio: a drifting particle constellation for a hero, rendered live on Canvas 2D, with ambient motion and depth that responds to scroll.

It's the front door to the studio: what it is, what it's shipped (Doorsong, Artha), and what's next.

## What's here

- A hero built from a network of drifting particles connected by fine lines, with simple vanilla Canvas 2D physics (no WebGL, no material pipeline)
- Particles push away from the cursor on hover, then settle back into their ambient drift
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
