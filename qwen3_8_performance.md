# Performance Improvement Ideas for Church of the Great Shepherd Website

This document outlines the performance optimizations implemented and recommended for the `COGS_website` project.

## 1. Completed Optimizations
The following changes have already been applied to the project:

- **Image Format Conversion**:
  - Converted all primary `.jpg` images to `.avif`/`.webp` (e.g., `George.avif`, `Phil.avif`). The last remaining original, `Jesus_drawing.jpg`, was removed. No non-modern image files remain in `images/`.
- **Responsive Images**:
  - Added `srcset` and `sizes` attributes to the main gallery/slider images (`image1` through `image6`) so users only download the resolution appropriate for their device.
  - Utilized existing 640px, 1024px, and 1920px variants to optimize mobile data usage.

## 2. Remaining Recommendations

### A. Asset Minification (completed)
- **Minify CSS**: Run with cssnano → produces `styles/style.min.css`. The source was already effectively minified, so the output is ~identical in size; originals are untouched and reversible.
- **Minify JavaScript**: Run with terser → produces `scripts/main.js.min.js` and `scripts/analytics.js.min.js`. `analytics.js` shrank ~24% (387→295 bytes); `main.js` was already compact so savings were minimal. Originals are untouched and reversible.

### B. Server Configuration (requires server changes)
- **Compression**: Enable **Brotli** or **Gzip** compression on the web server for HTML, CSS, and JS files.
- **Caching**: Add `Cache-Control` headers to static assets.
  - Images: `Cache-Control: public, max-age=31536000` (1 year)
  - CSS/JS: `Cache-Control: public, max-age=86400` (1 day)
- **Security**: Remove the `.git` directory from the production server to prevent repository exposure.

### C. Content & Structure
- **Optimize `events.html`**: This file is significantly larger than other pages (~30KB). Consider generating event cards dynamically via JavaScript from `events/events.json` (already partially implemented) to reduce the initial HTML payload.
- **Critical CSS**: Identify and inline the "above-the-fold" CSS in the `<head>` to improve First Contentful Paint (FCP).
- **Analytics loading (migrated)**: `scripts/analytics.js` now uses the native Google tag (gtag.js) snippet — loads `gtag/js?id=G-LFRD038HHF` and calls `gtag('config', 'G-LFRD038HHF')`. It no longer relies on a GTM container, so this item is resolved.

### D. Advanced Delivery (requires server changes)
- **CDN Integration**: Use a Content Delivery Network (e.g., Cloudflare) to serve static assets from edge locations closer to users.
- **Resource Hints**: `<link rel="preload">` is already present for the hero image (`images/Altar.avif`). Add preload hints only for resources not yet covered.
