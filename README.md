# Ratna 💎

The studio site for Anwar Creative Studio — a faceted glass crystal rendered live in WebGL, with drag physics, ambient particles, and depth that responds to scroll.

Ratna is Sanskrit for "gem." It's the front door to the studio: what it is, what it's shipped (Doorsong, Artha), and what's next.

## What's here

- A hand-tuned crystal — a faceted icosahedron with real glass transmission (chromatic aberration, distortion, an inner glowing core), built with React Three Fiber and drei's `MeshTransmissionMaterial`
- Drag it and it spins with momentum; leave it alone and it drifts back to an idle rotation
- A sitewide ambient particle field drifting behind every section, not just the hero
- Scroll-linked parallax: the crystal and headline drift apart at different depths as you scroll past
- Project cards that tilt in 3D toward the cursor with a glow that follows it
- A custom lerped cursor with magnetic pull on links and buttons
- No build-blocking network calls — the environment lighting is fully procedural, so the preloader never stalls on a remote asset

## Tech stack

- React + TypeScript + Vite
- React Three Fiber, drei, and `@react-three/postprocessing` (bloom, grain, vignette, chromatic aberration) for the 3D layer
- Tailwind v4 for layout, with the type scale, spacing scale, and motion easing driven by CSS custom properties

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. `npm run build` produces a static `dist/` — no backend, no server.

## Credits

Design language carried forward from Doorsong and Artha. Built by **Anwar Creative Studio**.
