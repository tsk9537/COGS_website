# Performance Ideas

## Images
- [x] Implement responsive images using `srcset` for all images in `images/`
- [ ] Ensure all images have `width` and `height` attributes to prevent layout shifts
- [x] Use `loading="lazy"` for non-critical images below the fold
- [ ] Convert any remaining `.jpg` or `.png` files to `.webp` or `.avif`

## Assets & Scripts
- [ ] Minify `styles/style.css`
- [ ] Minify `scripts/main.js` and `scripts/analytics.js`
- [ ] Audit `node_modules` to remove unused dependencies (currently only `google-analytics-js`)

## Delivery
- [ ] Implement Gzip or Brotli compression for text assets
- [ ] Add a Content Delivery Network (CDN) for static assets
- [ ] Set up Cache-Control headers for static files

## HTML/CSS
- [ ] Identify and remove unused CSS rules
- [ ] Optimize the critical rendering path by inlining critical CSS
- [ ] Reduce the number of HTTP requests by combining small files where appropriate
