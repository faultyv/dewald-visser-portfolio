# Editing your site content (the "CMS")

Your site is **content-driven**: all the words, projects, companies and credentials
live in plain files in this `content/` folder. There is **no login and no separate
admin website** — the files _are_ the CMS. You edit a file, save, and the live site
updates automatically (Vercel rebuilds on every push to GitHub).

> Why no login? A git-based CMS is free, has zero moving parts, can't be hacked or
> go down, and every change is versioned (you can always undo). If you'd prefer a
> form-based admin screen you log into instead, that can be added later (see the
> bottom of this file).

## The three ways to edit

1. **Easiest — on GitHub (in the browser):**
   - Go to https://github.com/faultyv/dewald-visser-portfolio
   - Open the file under `content/` you want to change (e.g. `content/site.json`).
   - Click the **pencil (Edit) icon**, make your change, then **Commit changes**.
   - Vercel redeploys in ~1 minute. That's it.

2. **On your computer:** edit the file in any text editor, then
   `git add . && git commit -m "update copy" && git push`.

3. **Ask Claude / your developer** to make the change for you.

## What each file controls

| File | Controls |
|------|----------|
| `site.json` | Your name, role line, hero & about copy, stats, socials, **WhatsApp number**, email. |
| `cv.json` | The Career timeline — each role, its tags, and the rotating "role evidence". |
| `companies.json` | The brand-map cards — name, website, and optional Instagram/Facebook. |
| `skills.json` | The skills/fluency grid. |
| `method.json` | The four-step "operating system" cards. |
| `marquee.json` | The scrolling tools ticker. |
| `certs.json` | Certificates (featured + the additional list). |
| `projects/*.mdx` | One file per project. The top part (between the `---` lines) is the data; below it is the write-up. |

## Adding or editing a project

Each project is one file in `content/projects/`. Copy an existing one to start.
The top block (frontmatter) controls the card and header:

```yaml
---
title: "Project name"
org: "Client / employer"
period: "2024 · City"
categories: ["web", "brand"]   # used by the Work filters: marketing | web | brand
label: "Web & Brand"            # the chip on the card
tools: "WordPress · SEO"
outcome: "One-line result shown on the card and at the top of the page."
seed: "primary"   # colour: primary, secondary, tertiary, success, warning, info, accent, highlight
cover: "/images/work/<slug>/cover.png"   # or null for a coloured placeholder
coverFit: "contain"   # use "contain" for logos, omit for full-bleed photos
order: 1               # lower = shown first
metrics:              # the three stat chips
  - value: "↑ Rentals"
    label: "Bookings increased"
stack: ["Illustrator", "Photoshop"]   # tool chips
brands: ["Pick n Pay", "Game"]        # optional — "Brands worked on" chips
gallery:              # image slots; add src to fill, leave off for a placeholder
  - id: "g1"
    label: "Caption"
    src: "/images/work/<slug>/gallery-1.jpg"
video: null           # or a YouTube URL
links:                # optional buttons under the intro
  - label: "Visit the live site"
    url: "https://example.com/"
---

## A heading

Body paragraph. Write as much as you like in normal Markdown.
```

**Images:** drop files into `public/images/work/<slug>/` and reference them as
`/images/work/<slug>/filename.jpg`. Logos look best with `coverFit: "contain"`.

## Want a login-based admin screen instead?

A form-based editor (log in, fill in fields, no code) can be added with **Decap CMS**
— it still saves to this same GitHub repo behind the scenes, so nothing else changes.
It needs a one-time GitHub login connection set up. Ask and it can be wired in.
