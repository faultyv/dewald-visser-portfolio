# Portfolio Website — Dewald Visser ("Cinematic Coast")

A single-page, scroll-driven personal site (monday.com-inspired bright aesthetic) with a
4-theme switcher, GSAP + Lenis motion, an animated atmospheric canvas, a drawn-line CV
timeline, filterable work, and drag-and-drop image slots the owner fills in.

---

## Files in this project

| File | What it is | Edit it? |
|------|------------|----------|
| `Cinematic Coast.dc.html` | **The entire site.** Markup + logic in one Design Component file. | ✅ Yes — this is the source of truth |
| `image-slot.js` | Web component for the drag-and-drop image placeholders (persists dropped images to `localStorage`). | Rarely |
| `support.js` | Runtime that renders the `.dc.html` Design Component. Auto-generated — **do not edit**. | ❌ No |
| `README.md` | This file. | — |

> The site is authored as a **Design Component** (`.dc.html`): a template + a
> `class Component extends DCLogic` logic block, rendered by `support.js`. It opens
> directly in a browser — just double-click `Cinematic Coast.dc.html`.

---

## Run it locally

Because the browser blocks `file://` module loads, serve the folder over HTTP:

```bash
# from the project folder
python3 -m http.server 8000
# then open:
#   http://localhost:8000/Cinematic%20Coast.dc.html
```

Any static server works (`npx serve`, VS Code Live Server, etc.).

---

## Deploy online (free)

It's a static site — host the **whole folder** as-is:

- **Netlify / Vercel / Cloudflare Pages** — drag the folder in, or connect the repo. No build step.
- **GitHub Pages** — push the folder, enable Pages.
- Set the published/index path to `Cinematic Coast.dc.html` (or rename it `index.html`
  if your host requires that name — keep the `.dc.html` content identical).

All three dependencies (GSAP, ScrollTrigger, Lenis) load from a CDN at runtime, and
`image-slot.js` + `support.js` are local — nothing else to bundle.

---

## For Codex / another AI agent continuing this

**Architecture**
- One file: `Cinematic Coast.dc.html`. Top half is the HTML template (between the
  `<x-dc>` tags); bottom half is `class Component extends DCLogic { ... }`.
- `renderVals()` returns values the template interpolates. Section content (CV roles,
  work items, skills, certs) lives in data methods: `cvData()`, `workData()`,
  `skillCols()`, `certData()`, `tags()`. **Edit those arrays to change content.**
- Motion is set up in `initMotion()` (GSAP ScrollTrigger + Lenis). The atmospheric
  canvas is `startAtmosphere()`. Themes are in `THEMES()` / `setTheme()`.
- Styling is **inline styles only** (no CSS classes/stylesheets), with CSS custom
  properties (`--blue`, `--surface`, `--text`, …) defined per theme in the `<helmet>`
  `<style>` block and swapped via `data-theme` on `<html>`.

**Known gotcha (already solved — keep it this way):** GSAP/Lenis are injected **once**
via JS in `waitForLibs()`, *not* through `<helmet>` script tags. Loading them through the
template caused a double-load that wiped `window.gsap` and orphaned the ScrollTriggers.

**If you want to port to the original Next.js + React Three Fiber stack** (see
`uploads/Cinematic-Coast-Build-Prompt.md` for the full brief): treat this file as the
finished visual + content reference. Recreate each `<section>` as a React component,
move the data methods into a `content.ts`, and rebuild `initMotion()` with
`@gsap/react` + `lenis/react`. The color tokens, copy, and CV data are all final here.

---

## What still needs the owner (Dewald)

- **Images:** every image area is a drop slot — open the site, drag HD photos onto the
  portrait, work thumbnails, and certificate cards. They persist automatically.
- **Project deep-dives:** work cards marked "Dive in →" open a full-screen case-study
  overlay (story, stat chips, image gallery, video). Edit `caseData()` to add/extend
  them — the key matches the work item's `id` (e.g. `w1`). Each gallery item and the
  cover are drop slots; each `videos` entry is a paste-a-YouTube-link slot that saves
  the link in `localStorage` and embeds it.
- **Current-role dates & achievements:** `cvData()` has the roles; fill in exact dates
  and 2–3 metric-backed bullets per current role.
- **Links** (LinkedIn, Behance, Instagram, X, portfolio, email) are already wired in the
  footer and nav.
