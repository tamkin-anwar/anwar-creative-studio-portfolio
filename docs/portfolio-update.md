# Portfolio update, September 19, 2026

Reviewed live GitHub metadata for tamkin-anwar/artha, jotfield, doorsong, tether, stub, and anwar-creative-studio-portfolio, plus local READMEs and the Corres foundation. Copy uses concrete product behavior. Corres is in development with sample mail. Artha's current GitHub homepage and README identify https://arthaapp.com.

## References

- https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API: observe individual targets at threshold zero, including items taller than the viewport.
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/: contained focus, Escape dismissal, and focus restoration.

Principles describe review before saving, local notes with optional encrypted sync, and everyday use. Technical evidence remains in build disclosures and the colophon. No unverified test-count claims were added.

## Verification

- Production build and lint passed in a local verification copy using the unchanged lockfile.
- Six reveal regression checks pass: independent items, reduced motion at startup, changing motion preference, keyboard focus, missing observer support, and cleanup. Run `node --test tests/reveal.test.cjs`.
- Browser reviewed at desktop size and 390 x 700: all four collection cards revealed after scrolling; no horizontal overflow. Flagship artwork and typography visually reviewed.
- Search for Brief returned Corres; Enter navigated to its section. Shift+Tab and Tab wrapped inside search. Escape closed it and restored trigger focus.
- Follow the build opened Now with the September 19 date; return link opened Corres. No broken home-page anchors or loaded images detected.
- Reduced-motion hook behavior is regression-tested and CSS/card-tilt guards inspected. OS-level reduced-motion rendering and a physical phone were not tested.
- External addresses were compared with GitHub metadata. Remote availability could not be established through the web retrieval tool; no claim of a complete external-link uptime audit.
- Changes are local and have not been pushed or deployed.
