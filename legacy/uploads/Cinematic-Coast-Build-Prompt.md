# MASTER BUILD PROMPT — "CINEMATIC COAST"
### Dewald Visser · Entrepreneur · Marketing · Graphic Design · Web Design

> Paste this whole file as your build prompt. Best run in **Claude Code** with the skill repos below installed, but it also works in a claude.ai build session. Fill the `<<FILL>>` spots with your latest info before final build.

---

## 0. ROLE & MISSION (read first)

You are the lead designer-developer at a studio known for award-tier interactive sites. Build a **single-page, scroll-driven, motion-rich personal site** for Dewald Visser that positions him across **four pillars** and proves each one:

1. **ENTREPRENEUR** — a founder/operator who builds brands *and* the businesses and systems behind them. Director-level ownership, initiative, results. Not just a hire.
2. **MARKETING** — digital strategist: SEO, paid social, lead generation, email automation, brand strategy, campaign planning — tied to measurable growth.
3. **GRAPHIC DESIGN** — brand identity, logos, print, social creative, motion graphics across the full Adobe suite.
4. **WEB DESIGN / FRONT-END** — WordPress, Shopify, custom HTML/CSS/JS. The site itself is the headline proof.

The site does three jobs at once: **position** Dewald across those four pillars, **present** a credible CV with beautiful photography of him (every role tied to a result), and **be** a portfolio piece in its own right — the craft of the site IS the proof of his design + web skill. Show off.

It's a **free-forever showcase** linked from LinkedIn. No lead capture, no contact form backend, no payments, no analytics, no database. Pure experience. Many visitors arrive on **mobile**, so it must feel premium AND fast there. Bar: good enough to screen-record for TikTok / Awwwards — motion-heavy and cinematic, but every effect earns its place.

---

## 1. DESIGN DIRECTION — "CINEMATIC COAST" (locked)

A fusion of **Cinematic Dark** + **Glass / Soft-Futurism**, grounded in Dewald's own coastal-editorial aesthetic so it never reads as generic AI output.

**Mood:** deep oceanic atmosphere — midnight slate-teal (NOT pure black), drifting fog gradients, frosted glass panels catching cool light, a fine film grain over everything, and one warm coastal-sunset accent used sparingly against all the cool tones. Relaxed luxury, editorial, cinematic.

### Color tokens
```
--base        #0C1B24   /* deep slate-teal, the canvas (never #000) */
--fog         #16313D   /* mid-tone for depth layers/gradients */
--glass       rgba(233,241,243,0.08-0.12)   /* frosted panels */
--accent-cool #8FC4CE   /* seafoam — primary accent, lines, highlights */
--accent-warm #E8A07A   /* coastal sunset — the ONE bold hit, used rarely */
--text        #E9F1F3   /* cool off-white (never pure #fff) */
--text-dim    #9DB3BC   /* muted captions / labels */
```

### Typography
- **Display:** a characterful editorial face. **DO NOT use Inter, Roboto, Arial, Space Grotesk** (banned AI defaults). Lean toward a high-contrast modern serif or distinctive grotesk (Fraunces, PP Editorial New, Clash Display, or similar).
- **Body:** a clean technical sans (Satoshi, Geist, General Sans).
- **Mono:** a monospace for CV dates, role tags, section numbers (JetBrains Mono) — nods to the dev side, adds editorial structure.
- Deliberate type scale, intentional weights. Type is a memorable part of the design, not a neutral delivery vehicle.

### Discipline cues (so the four pillars read visually)
Give each pillar a subtle, consistent marker — a mono eyebrow label + a distinct icon (Lucide) — so a visitor instantly clocks "this is the marketing bit / the design bit / the build bit / the founder bit" without it feeling like four different sites.

### Signature element (spend the boldness here)
**The CV as a cinematic scroll journey.** A single drawn line travels down the page connecting each role. Each role = a **frosted-glass card that expands with detail as it enters the viewport** (iOS card-stack feel). The motion carries real content — his career literally unfolds. This is the one thing the site is remembered by.

### Anti-generic rules
No generic purple gradient. No neon-on-pure-black. No stacked-identical-card SaaS grid as the hero. Asymmetric, intentional layouts. Grain + atmosphere on every section. Motion only where it adds hierarchy or narrative.

---

## 2. TECH STACK & SKILLS

### Claude Code skill repos to install first
```
# Anti-generic design brain (install FIRST)
anthropics/skills                          → frontend-design skill
Leonxlnx/taste-skill                       → premium, anti-slop, motion-first

# Animation + 3D library knowledge
freshtechbro/claudedesignskills            → bundles:
   /plugin install core-3d-animation       (Three.js, GSAP, R3F, Motion, Babylon)
   /plugin install extended-3d-scroll      (Lenis, Locomotive, Barba, Vanta, PixiJS)
   /plugin install animation-components    (React Spring, Magic UI, AOS, anime.js, Lottie)
wilwaldon/Claude-Code-Frontend-Design-Toolkit   → motion audit + library skills
```

### npm libraries (the engine)
```
Framework   next  react  typescript  tailwindcss
Scroll      lenis                       # buttery momentum scroll, syncs everything
3D          three  @react-three/fiber  @react-three/drei
Motion      gsap (ScrollTrigger + SplitText — now 100% free)  framer-motion
UI          shadcn/ui  lucide-react
Optional    @splinetool/react-spline    # browser-authored 3D hero
            vanta / ogl                 # animated atmospheric background
            lottie-react                # micro-animations
```

**Architecture:** Lenis drives one requestAnimationFrame loop. GSAP ScrollTrigger + R3F + Framer Motion all sync to it. 3D lives in a fixed `<Canvas>` behind the HTML; content scrolls over it.

---

## 3. TRENDING MOTION TECHNIQUES TO USE (the TikTok arsenal)

Apply the full toolkit — gated behind performance + reduced-motion (§6):

- **Momentum smooth scroll** (Lenis) across the whole page.
- **Scroll-scrubbed 3D** — camera/object motion tied to scroll progress (GSAP ScrollTrigger + R3F).
- **Pinned sections** — content animates while a section stays fixed.
- **Line-by-line + word-by-word text reveals** (GSAP SplitText), cinematic stagger.
- **Film-roll header flip** — hero text rotateX flips away as you scroll past.
- **Clip-path / mask image reveals** — photos and work unmask as they enter view.
- **Multi-layer parallax depth** — foreground/mid/background at different speeds.
- **Magnetic cursor buttons + custom cursor** reacting near interactive elements.
- **iOS-style card-stack expansion** — for CV timeline + capability cards.
- **Particle field / floating glass geometry** in the hero, reactive to cursor.
- **Glassmorphism panels** with backdrop-blur and cool light edges.
- **Sticky split-screen mask reveals** — fixed image stack vs flowing text.
- **Infinite marquee strips** — tools/skills scrolling band.
- **Page-section transitions** (Barba-style) between major blocks.
- **Film grain overlay** — subtle, global.

---

## 4. PAGE STRUCTURE & PER-SECTION SPEC

### 1 — HERO (the opener / wow)
- Fixed 3D atmospheric canvas: drifting fog + floating frosted-glass geometry, reactive to cursor.
- Name **"Dewald Visser"** reveals line-by-line (SplitText). Tagline: *Entrepreneur · Marketing · Graphic Design · Web Design.*
- One-line positioning: *I build brands — and the businesses and systems behind them.*
- Magnetic primary button "View work" → smooth-scrolls. Secondary: LinkedIn.
- On scroll, hero text does the film-roll flip as the next section rises.

### 2 — ABOUT / FOUNDER POSITIONING
- Short bio in his voice, **entrepreneur-forward** — a multidisciplinary creative who founds and runs ventures, not just executes briefs.
- Mention current ventures (Director, clicklocal.co.za; multimedia + design leadership roles). Frame as range and ownership, not clutter.
- Photo of him revealed via clip-path mask, film-grain coastal grade. Pinned text + parallax.

### 3 — CAPABILITIES / THE FOUR PILLARS (informational, NO pricing)
Four glass cards (card-stack expansion), one per pillar, each with a mono eyebrow + Lucide icon and 2–3 outcome-led lines:
- **Entrepreneurship & Strategy** — founding ventures, building systems, brand + business strategy, leadership.
- **Marketing** — SEO, paid social (Meta / Google / YouTube), email automation, lead gen, campaign + budget planning, brand strategy.
- **Graphic Design** — brand identity, logo design, print, social creative, motion graphics (full Adobe suite).
- **Web Design / Front-End** — WordPress, Shopify, custom HTML/CSS/JS, e-commerce, booking/automation systems.

### 4 — CV TIMELINE (the signature)
- Drawn line animates down the page connecting roles; each role = frosted-glass card that expands with detail on entry.
- Mono labels for dates + role tags. Tag each role with its pillar(s) — Marketing / Design / Web / Founder — so the four-pillar story threads through the history.
- Asymmetric layout, not a plain list. Real content in §5.

### 5 — WORK / PORTFOLIO (multi-discipline, categorized)
Filterable/grouped into three discipline lanes so all four pillars show up as tangible work:
- **Brand & Graphic** — logos, identities, print, social creative, animated adverts.
- **Web & E-commerce** — Shopify stores, WordPress builds, booking/automation systems, this site.
- **Marketing Campaigns** — campaign work with the results attached.
- Expanding grid: thumbnails zoom from card to full (Framer Motion layout). Each item: image (coastal grain grade), title, role, tools (Lucide), and the outcome. Leave clearly-labelled image slots.

### 6 — SKILLS & TOOLS
- Infinite marquee of software/tools, plus a clustered skill display grouped by pillar.

### 7 — SOCIAL / FOOTER
- Large editorial closing line. Links: LinkedIn, Behance, Instagram, X, email (click-to-copy with "copied" feedback — no backend), portfolio site. Final atmospheric footer reveal.

---

## 5. CONTENT (real data — fill the `<<FILL>>` gaps)

**Identity**
- Name: Dewald Visser
- Pillars/tagline: Entrepreneur · Marketing · Graphic Design · Web Design
- Location: Hillcrest, Durban, KwaZulu-Natal, South Africa
- Bio seed: "Multidisciplinary founder and creative — I build brands, run the marketing that grows them, and design and ship the web experiences that carry them." <<refine in your voice>>

**Ventures / entrepreneurship**
- Director — clicklocal.co.za — `<<dates>>` — `<<what it does + a result>>`
- Founder mindset proof: built an e-commerce store during hard lockdown to keep cash flowing and avoid job cuts (Contours/Faux Flora). `<<add any other ventures you want public>>`

**Current roles** (add start dates + 2–3 metric-backed achievements each — `<<FILL>>`)
- Graphic Design Specialist — Mediatrade — `<<dates>>` — `<<achievements>>`
- Multimedia Specialist — Joseph Business School Africa — `<<dates>>` — `<<achievements>>`
- Director — clicklocal.co.za — `<<dates>>` — `<<achievements>>`

**Earlier history — with real proof points (from CV)**
- **Marketing Designer — Kirstenhof Car Hire (2021)** — drove organic + sponsored search, social, and email marketing that **increased car rentals**; created animated video + image adverts; built a WordPress appointment system tracking clients, payments, fines and maintenance; ran email campaigns with budget planning. *(Marketing + Web + Design)*
- **Front-End Web Designer — Autodoc Diagnostics (2021)** — built an online store, wrote copy, sourced suppliers; redesigned the company logo in Illustrator/InDesign. *(Web + Design)*
- **Logo Designer — Cambridge University (Mar–Jul 2021)** — designed a logo + mockups for an international sustainable-development initiative. *(Design)*
- **Design / Sales — Contours Design Studio · Faux Flora (Feb–Dec 2020)** — bespoke design + installation; **built a Shopify store + drop-ship model during lockdown to protect cash flow and jobs**; product design; reporting. *(Founder mindset + Web + Design)*
- **Programme Advisor — Educor Holdings (Nov 2016–Dec 2019)** — designed templates, booklets, animated video adverts and email campaign creative; sales, advising, data analytics. *(Marketing + Design)*
- **The Unlimited (2016)** · **Old Mutual (2014–15)** · **Investors Choice (2014)** — sales, lead gen, web dev support, training.

**Tools/Software:** Adobe Photoshop, Illustrator, InDesign, After Effects, XD, Figma · WordPress, Elementor, Shopify, HTML/CSS/JS · CorelDraw, SketchUp, Canva · Sage Pastel, CRM systems · Google Ads, Meta/Instagram Ads, YouTube Ads, Google My Business, Mailchimp, SEO.

**Languages:** English, Zulu, Afrikaans, German.
**Education:** National Senior Certificate — Hillcrest High School (2013); Digital Marketing Certification — Google (2021); Google Ads Certification.
**Links:** LinkedIn linkedin.com/in/dewaldvisser · Behance behance.net/dewaldvisser · Instagram @dewaldv84 · X @TheBBQhunter · Portfolio dewaldvisser.co.za · Email dewaldvisser94@gmail.com

**Photography:** apply Dewald's signature grade to every photo — soft cinematic coastal mood, muted cool tones, airy/foggy, natural film-like grain, clean editorial composition, realistic skin texture. `<<add image files>>`

---

## 6. QUALITY FLOOR (non-negotiable — this is what makes it trend instead of lag)

- **Performance:** lazy-load 3D, compress assets, code-split. Fast first paint, high Lighthouse score. A janky show-reel kills the flex.
- **Mobile:** full responsive; heavy 3D/parallax gets lighter mobile fallbacks; never break layout.
- **Reduced motion:** respect `prefers-reduced-motion` with calm fallbacks for every animation.
- **Accessibility:** visible keyboard focus, semantic structure, alt text, sufficient contrast.
- **Copy:** plain, active-voice, outcome-led — every claim backed by a result where possible.

---

## 7. BUILD PROCESS (in order)

1. Lock the token system from §1; confirm it isn't a generic default.
2. Scaffold Next.js + Tailwind + Lenis; global smooth scroll working.
3. Build the fixed 3D atmospheric hero canvas (R3F + drei).
4. Wire GSAP ScrollTrigger + SplitText, synced to Lenis.
5. Build sections 1→7 in order; add motion per §4; thread the four-pillar cues throughout.
6. Layer film grain + glassmorphism globally.
7. Self-critique with screenshots; cut one effect per section that doesn't earn its place.
8. Pass the §6 quality floor before calling it done.

**Deliver:** a deployable Next.js project, ready for Vercel.
