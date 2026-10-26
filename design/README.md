# Design record

The record of how anwarcreativestudio.com and the studio's identity came to look the way they do,
kept so the decisions survive the code changing. Nothing in this folder is served by the site;
GitHub Actions deploys `dist/` only.

```
design/
  concepts/            the homepage concepts, in order, each a single page you can open in a browser
    concept-1.html     first pass: the old dark homepage with six changes
    concept-2.html     the slogan as the headline, app screenshots in frames
    concept-3.html     live HTML app screens and motion, the direction that stuck
    concept-4.html     real Apple bezels, the hanging a, light and dark
    concept-5-built.html   tours that show why each app is different. This is what shipped.
    logo-study.html    the mark studies (A to E) that led to the hanging a
    assets/            images the early concepts used; bezels and icons link to public/
  source/              the hand-written parts concept 5 was assembled from
```

Open the concepts straight from disk. They link their images from `../../public/`, so keep the
folder where it is. The live site is the React code in `src/`; these files are reference, not
something the build reads.

## The identity

**The lockup** is the hanging a followed by "Anwar." with a gold point. It names the studio in the
header, the footer, documents and the press kit.

- The a is a lowercase a hanging from a headline: the bar is the top line, the stem drops to the
  baseline, and the bowl hangs off it with a gold point inside.
- It is drawn at the capital height of Fraunces (0.70 em, measured), so its bar sits on the cap line
  and its foot on the baseline, the same lines as "Anwar".
- The gap between the a and the name is 0.243 em, two stems wide.
- The gold point is a circle 0.11 em across, the size of a Fraunces full stop.
- Components: `src/components/identity/Lockup.tsx` (`Symbol`, `Lockup`, `EndMark`). CSS:
  `.lockup` in `src/styles/site.css`.

**The hanging a on its own** is for small square spaces only: the favicon, app icons, social
avatars. Everywhere else it appears inside the lockup.

**The gold point** is the studio's one recurring mark: a full stop made of light.

| | Light | Dark |
|---|---|---|
| `--gold-pt` | `#b9822f` | `#e2ac5f` |

It ends the wordmark and sits inside the a. In page content it appears **once per view**, where a
sentence ends: the full stop of the hero's "Built it." and of the closing note. It is never a bullet,
a divider or decoration.

**"a."** is the a with its gold point, set in Fraunces. Research on studio marks said a second
logo would compete with the lockup, so "a." isn't a logo. It is the studio's sign-off:

- the end mark of long-form writing: the last line of About and of the Journal intro;
- the 404 page, set large above "Looked for it. Didn't find it.";
- never near the hanging a. It doesn't appear in the header or footer.

It is easy to remove: delete the `<EndMark />` uses in `AboutPage.tsx` and `JournalPage.tsx`, and
the big one in `NotFoundPage.tsx`.

**"from Anwar."** endorses the products on their own sites. The product leads and the studio signs
quietly, with no symbol beside the app's own icon. Live on corres.app's footer. Planned for
arthaapp.com.

Files for press: `public/press/identity/` (PNG lockups for light and dark grounds, SVG symbols, and
`USING-THE-LOGO.txt`), also inside the press kit zip.

**The share card** (`public/og-image.png`, 1200 x 630) is what iMessage, WhatsApp, Slack, X and
LinkedIn show when someone shares a link to the site: the lockup large and centered on paper, with
"Looked for it. Didn't love it. Built it." beneath. It is centered so that WhatsApp's square crop
still shows the whole logo. When it changes, bump `?v=` on `og:image` and `twitter:image` in every
HTML entry so apps fetch the new one.

## Color and type

- Paper `#fbf9f4` and ink `#1a1916` in light; `#0b0b0e` and `#f2ede2` in dark. The site follows the
  device's setting, with no toggle. All tokens are in `src/styles/theme.css`.
- Fraunces for headings and the wordmark, Inter for text, JetBrains Mono for small labels, all
  self-hosted (latin). Fraunces is the variable font (optical size, weight and SOFT axes), so the
  headings get the light, high-contrast display cut the concepts were designed with. Inter is
  variable over 400 to 700.
- Display headings use large optical sizes (hero 144, section titles 120) at desktop sizes. Below
  1100 px and again below 720 px, `home.css` steps the optical size and tracking down, because the
  display cut at phone sizes closes up the spaces between words.

## The devices

- The iPhone 18 Pro and MacBook Pro 14 frames are Apple Product Bezels, used under the Apple Design
  Resources terms: drawn as images over live HTML screens, never redrawn, tilted, animated or
  recolored. Only web-sized copies are in this repo (`public/devices/`); the full-size originals are
  not redistributed.
- The iPhone is silver in light mode and black in dark. Frames are WebP (about 14 KB per iPhone,
  57 KB for the MacBook) inside `<picture>` (`src/components/devices/Bezels.tsx`), so a visitor
  downloads only the iPhone their mode shows, and phones skip the MacBook frame, which the phone
  layout hides. The PNGs stay in `public/devices/` for the archived concepts.
- The iPhone is 300 px wide, or the screen width minus 56 px on very small phones. Everything
  on its screen is sized in points (`--pt`), so it scales as one piece.
- iPhone 18 Pro: image 1350 x 2760; screen 1206 x 2622 at (72, 69), so left 5.3333%, top 2.5%,
  width 89.3333%, height 95%, corner radius 15.42% / 7.09%. One iOS point is
  `--ip-w * 0.893333 / 402`.
- MacBook Pro 14: image 3860 x 2540; display 3024 x 1964 at (418, 288), so left 10.829%, top
  11.339%, width 78.342%, height 77.323%. The macOS screen is laid out at 1352 x 878 points (the
  "Larger Text" setting) and scaled to fit with `--mac-s`, so mail never reflows or blows out at
  smaller sizes.
- Apple Watch is left off the homepage. Things, Fantastical, Spark and Overcast all keep the Watch
  out of their main visuals: next to a Mac and an iPhone it's too small to read. It is named in
  the platform line instead. Its place is a section of its own on corres.app, shown large.

## The tours

The homepage shows why each app is different instead of what it looks like. Code:
`src/lib/tours.ts`.

- **Corres on Mac**, four chapters: Sort (Needs You fills from the inbox), Ask (a question answered
  from mail), Reply (a draft written in your voice), Private (it all happens on the device).
- **Corres on iPhone**: a notification arrives and the email lands in Due soon with its reason.
- **Artha on iPhone**, four chapters: Today (the safe-to-spend number), Assistant (an expense
  proposed, confirmed, added), Plan, Import (a statement reviewed before saving).

Rules: a tour starts when its device scrolls into view, pauses when it leaves, plays once and
stops. Tabs jump to any chapter; Pause holds it. With Reduce Motion each chapter shows its end
state. All mail and money in them is sample data with made-up people.

## Every screen size

Checked at 320, 375, 430, 768, 1024 and 1440 px on every page: no sideways scrolling, no text
under 12 px outside the device screens. On touch screens, every link and button outside running
text has a hit area of at least 44 pt (Apple's minimum); the footer's link lists get real
spacing, and the smaller controls get an invisible larger hit area so nothing looks different.

## Copy

- No em dashes in anything a visitor reads.
- Corres is an email app, never "a Gmail client".
- Nothing personal on public pages: no home address, personal phone or personal email.
- The LLC is being formed in California and isn't filed yet. Until it is, say "Anwar Creative
  Studio", run by Tamkin Nurul Anwar, and never "LLC". `src/content/company.ts` holds the wording.
