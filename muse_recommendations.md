# COGS Website Recommendations

## SEO / Metadata
- `index.html` already contains JSON-LD schema and canonical tag, but `seo_tasks.md` still marks these as pending. Update the task list to reflect completed work.
- `robots.txt` exists and points to the sitemap. Keep it.
- `sitemap.xml` lists all public pages but has no `<lastmod>` dates. Add `<lastmod>` using git commit dates or build date and validate against the sitemap schema.
- Canonical URLs are present on all 8 HTML pages. Verified via grep.

## Performance / Images
- Responsive images are inconsistently applied. `events.html` / `find-us.html` use `<picture>` + `srcset` for the slider, but `index.html` slider still uses plain `<img src="images/Altar.jpg">` without `srcset`/`picture`. Make the homepage consistent with the other pages.
- Width/height attributes to prevent layout shifts are not implemented. Add `width` and `height` attributes to all `<img>` and `<picture>` fallbacks.
- `loading="lazy"` is used, first slide is eager. Good. Several large `.jpg` originals still ship alongside WebP/AVIF versions. Ensure the fallback `src` points to the modern format or remove unused JPEGs.
- `events.html` has a stray duplicate `</picture>` on line 47.
- CSS/JS minification is unchecked in `performance_ideas.md`. `styles/style.css` is unminified and `scripts/main.js` is unminified. Minify both and consider inlining critical CSS for the above-the-fold header.
- `package.json` is empty while `node_modules/` exists with only `google-analytics-js`. Audit and remove unused deps; add build scripts for lint/minify.

## Code quality
- Slider buttons are marked `aria-hidden="true"` with `role="presentation"`. This removes them from assistive tech. Keep them operable or provide proper controls.
- `scripts/analytics.js` pushes a `page_view` event before GTM loads. Verify it fires correctly.
- Update `seo_tasks.md` and `performance_ideas.md` checkmarks to match reality so future work is accurate.
