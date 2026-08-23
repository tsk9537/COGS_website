# COGS Website Recommendations

## SEO / Metadata
- [x] `index.html` contains JSON-LD schema and a canonical tag (verified). No action needed; mark the corresponding items in `seo_tasks.md` as complete.
- [x] Canonical URLs are present on all 8 HTML pages (verified via grep). No action needed.
- [ ] `sitemap.xml` lists all public pages but has no `<lastmod>` dates. Add `<lastmod>` using git commit dates or build date and validate against the sitemap schema.

## Performance / Images
- [x] Homepage is now consistent with the other pages: `index.html` ships `.avif`/`.webp` images with `width`/`height`, preload, and `srcset` on the slider slides (slides 1–6). No action needed; this item was previously inaccurate.
- [ ] Add explicit `width`/`height` attributes to the two remaining images that lack them: `images/architecture/COGS_Arch.avif` (`nav-logo`, `link-card-img`) and `images/shepherds/Jesus_drawing.avif` (`full-image`). CSS already sizes these, but img attributes are best practice.
- [x] Original `.jpg` files have been removed; all HTML references now point to modern formats (`.avif`/`.webp`). The only leftover original (`Jesus_drawing.jpg`) was deleted. No action needed.
- [ ] `events.html` `<picture>` blocks were mis-indented and had an extra stray `</picture>`. Indentation is now normalized across all six pages and tag counts are balanced (verified). No action needed; this item was previously inaccurate.
- [ ] CSS/JS minification is unchecked in `performance_ideas.md`. Minify both files and consider inlining critical CSS for the above-the-fold header.
- [x] `package.json` is no longer empty: it declares `cssnano` and `terser` as devDependencies. However, `node_modules/` contains a full PostCSS toolchain (~70 packages) including an undeclared `postcss` core plus transitive deps. Add the missing declarations to `package.json` so dependencies are tracked.

## Code quality
- [x] Slider buttons are accessible `<button>` elements (some with `aria-label`). They were never marked `aria-hidden="true"`/`role="presentation"`, so no change is needed; this item was previously inaccurate.
- [x] `scripts/analytics.js` was migrated from the unsupported GTM-snippet-with-G-ID setup to the native Google tag (gtag.js) snippet (`gtag('config', 'G-LFRD038HHF')`, loading `gtag/js?id=G-LFRD038HHF`) per Google's recommendation. Verified in production.
