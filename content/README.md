# Editing your site content

Your site now has a browser CMS at:

`/admin/`

It is powered by Sveltia CMS, a Git-based editor. It saves changes directly back
to this GitHub repository, then Vercel redeploys the site automatically.

## CMS login

There is no website-owned username/password stored in the codebase. Login is
handled by GitHub, because GitHub is where the content files live.

Use the CMS like this:

1. Open `https://YOUR-LIVE-SITE/admin/`.
2. Click **Sign in with Token**.
3. Generate a GitHub personal access token when prompted.
4. Give the token access only to this repository:
   `faultyv/dewald-visser-portfolio`.
5. Paste the token into the CMS.
6. Edit content and save.

The browser remembers the token locally. Treat it like a password; do not share it
in chat or commit it to the repo.

For the smoothest future login experience, a GitHub OAuth worker can be added
later so the screen says **Sign in with GitHub** instead of asking for a token.
The CMS itself is already installed now.

## Other ways to edit

1. **On GitHub (in the browser):**
   - Go to https://github.com/faultyv/dewald-visser-portfolio
   - Open the file under `content/` you want to change.
   - Click the pencil icon, make your change, then commit.
   - Vercel redeploys in about a minute.

2. **On your computer:** edit the file in any text editor, then
   `git add . && git commit -m "update copy" && git push`.

3. **Ask Codex / Claude / your developer** to make the change.

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

## Admin config

The admin app lives in:

- `public/admin/index.html`
- `public/admin/config.yml`

The current setup uses Sveltia CMS with the GitHub backend. The admin is hidden
from search engines via `noindex` and `robots.txt`, but security comes from
GitHub write access: only someone with a valid token for the repo can save.
