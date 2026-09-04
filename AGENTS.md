# Church of the Great Shepherd — Website Project Context

## Project Overview

This is the static website for the **Church of the Great Shepherd (COGS)**, an Anglican parish located in Wheaton, IL. The site is published at [greatshepherd.org](https://greatshepherd.org/).

The church is part of the **Anglican Diocese of Pittsburgh** within **The Anglican Church in North America (ACNA)**, which itself is part of the worldwide Anglican Communion. The church was founded in 1997 and has Rev. George Kacena as Rector since 2007.

## Church Identity

- **Values**: Relational, Liturgical, Traditional, Prayerful, Missional
- **Services**: Sunday worship 10am–11:30am, followed by potluck lunch at 12pm
- **Affiliation**: Anglican tradition with liturgical worship structure (Book of Common Prayer)
- **Mission**: Welcoming community focused on Orthodox Christian doctrine, with special attention to those who feel lonely and isolated

## Site Information

- **Domain**: `https://greatshepherd.org`
- **Address**: 903 West Liberty Drive, Wheaton, IL 60187
- **Phone**: (630) 681-0776
- **Email**: office@greatshepherd.org
- **Google Analytics**: G-LFRD038HHF (in `scripts/analytics.js`)

## Page Structure

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Landing page with slider, welcome, and navigation links |
| About Us | `about.html` | Church values, leadership profiles, diocese info |
| I'm New | `new.html` | FAQ for first-time visitors (service times, parking, lunch, children's programs) |
| Events | `events.html` | Dynamic event list rendered from `events/events.json` |
| Find Us | `find-us.html` | Location, contact details, Google Maps embed, transportation tips |
| Transportation | `transportation.html` | Detailed transit info (Metra UP West, Pace Bus, driving, rideshare) |
| Liturgical Preview | `liturgical-preview.html` | Developer tool page showing liturgical calendar nav/footer previews per season |

Each page shares a common layout:
- **Header**: Full-width image slider with 9 slides, previous/next buttons, dot indicators
- **Navigation**: Logo (church arch image), mobile hamburger toggle, nav links
- **Footer**: Contact info + Sunday service times
- CSS class naming convention: `.header-slider`, `.main-nav`, `.main-footer`, `.page-content`, `.content-section`

## Architecture

### Static site with client-side JS rendering

- Plain HTML files (no framework or build system)
- Shared CSS (`styles/style.css`) and JS (`scripts/main.js`) across all pages
- Events data lives in `events/events.json` and is consumed by `scripts/main.js` to render event cards dynamically on `events.html`
- The events page dynamically updates the "Events" card title on the homepage with the next upcoming event date

### Liturgical calendar

- `scripts/main.js` contains `updateLiturgicalColors()` which changes the nav bar and footer background colors based on the current Anglican liturgical season (Advent, Christmas, Ordinary Time, Lent, Holy Week, Easter, etc.)
- The colors correspond to traditional Anglican vestment colors: dark blue (Advent prep), rose (Gaudete), white/gold (Christmas/Easter), green (Ordinary Time), purple (Lent), red (Holy Week)
- `liturgical-preview.html` is a dev-only page that previews each season's nav/footer colors in card form (not linked in site navigation)

### Images

- All images use modern formats (`.avif` primary, `.webp` fallback via `<picture>` + `<source>`)
- Responsive srcset variants: 640px, 1024px, 1920px
- Slider/gallery: `images/image[1-6]_*`, `images/Altar_*`, `images/2_Crosses_*`
- Portraits: `images/George.avif`, `images/Phil.avif`, `images/Jen1.avif`
- Architecture/logo: `images/architecture/COGS_Arch.avif`
- Artwork: `images/shepherds/Jesus_drawing.avif` (note: the `images/` folder itself is gitignored, so only subdirectories are tracked)

### SEO & Discovery

- JSON-LD structured data (Schema.org `Church` + `Event` types) in page `<head>`
- Open Graph and Twitter Card meta tags on every page
- Canonical URLs on every page (`<link rel="canonical">`)
- `robots.txt` and `sitemap.xml` at project root
- sitemap lists all 8 HTML pages

## Build & Tooling

### Dependencies (dev only)

| Tool | Purpose |
|------|---------|
| `cssnano` + PostCSS plugins minify `styles/style.css` → `styles/style.min.css` |
| `terser` minifies `scripts/main.js` → `scripts/main.js.min.js` and `scripts/analytics.js` → `scripts/analytics.js.min.js` |

### Build command

```bash
node build.js
```

Run this after editing CSS or JS to produce the minified outputs. The original source files are never modified.

Note: `node_modules/` and `package.json`/`package-lock.json` are gitignored (the `.gitignore` is also gitignored). Dependencies must be reinstalled with `npm install` after checkout.

## Events System

Events are stored as JSON in `events/events.json` and rendered client-side by `main.js`. Each event object has:

```json
{
  "date": "2026-09-06",
  "category": "service",
  "title": "Sunday Worship Service",
  "time": "10:00 AM - 11:30 AM",
  "location": "Main Sanctuary",
  "description": "..."
}
```

Categories: `service`, `program`, `community`

The events list supports: search filtering, category filtering, "show past events" toggle. Event cards render as HTML inserted into `#events-list`.

## Coding Conventions

- No frameworks; vanilla HTML/CSS/JS only
- CSS class names use kebab-case
- JS is minified to `.min.js` files (generated by build)
- All pages share common structure — changes to header/nav/footer should be consistent across all HTML files
- Images use `loading="lazy"` except for the first slider slide (eager)
- External links use `target="_blank"` with `rel` not explicitly set
- Events data file `events/events.json` is the single source of truth for the events system

## Relevant Files

- `build.js` — Build script (CSS+JS minification)
- `scripts/main.js` — Main JavaScript (slider, nav toggle, events rendering, liturgical colors)
- `scripts/analytics.js` — Google Analytics tracking script
- `styles/style.css` — Source CSS stylesheet
- `events/events.json` — Event calendar data
- `sitemap.xml`, `robots.txt` — SEO discovery files
- `performance_ideas.md`, `seo_tasks.md`, `muse_recommendations.md` — Previous improvement notes and task tracking
