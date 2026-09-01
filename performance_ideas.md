# Performance Ideas

## Images
- [x] Implement responsive images using `srcset` for all slider/gallery images (6 of 8 pages use `<picture>` + `srcset`; `index.html` uses `srcset` on its slides). No action needed.
- [ ] Ensure all images have `width` and `height` attributes to prevent layout shifts. Two images still lack them: `images/architecture/COGS_Arch.avif` and `images/shepherds/Jesus_drawing.avif`.
- [x] Use `loading="lazy"` for non-critical images below the fold (first slide is eager). No action needed.
- [x] Convert remaining `.jpg`/`.png` files to `.webp`/`.avif`. All originals have been removed; only modern formats remain in `images/`.

## Assets & Scripts
- [x] Minify `styles/style.css` → `styles/style.min.css` via cssnano. Output ~identical size (source was already minified).
- [x] Minify `scripts/main.js` → `scripts/main.js.min.js` and `scripts/analytics.js` → `scripts/analytics.js.min.js` via terser. `analytics.js` shrank ~24% (387→295 bytes).
- [ ] Audit dependencies. `package.json` declares only `cssnano` and `terser`, but `node_modules/` contains a full PostCSS toolchain (~70 packages) including an undeclared `postcss` core plus transitive deps. Declare the missing packages in `package.json`; then remove any genuinely unused dependencies.

## Delivery
- [ ] Implement Gzip or Brotli compression for text assets (server-side).
- [ ] Add a Content Delivery Network (CDN) for static assets (infra/server-side).
- [ ] Set up Cache-Control headers for static files (server-side).

## HTML/CSS
- [ ] Identify and remove unused CSS rules.
- [ ] Optimize the critical rendering path by inlining critical CSS.
- [ ] Reduce the number of HTTP requests by combining small files where appropriate.
