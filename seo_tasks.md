# SEO Tasks — High Impact

## 1. Add JSON-LD Schema to `index.html`
- [ ] Read the existing schema markup in `events.html` as a reference pattern
- [ ] Read the existing schema markup in `find-us.html` for additional fields
- [ ] Build a combined Church/LocalBusiness schema block for the homepage
- [ ] Insert `<script type="application/ld+json">` into the `<head>` of `index.html`
- [ ] Verify with Google's Rich Results Test

## 2. Create `robots.txt` + `sitemap.xml`
### robots.txt
- [ ] Create `robots.txt` at project root with sitemap reference and universal allow rules

### sitemap.xml
- [ ] Read the open `sitemap.xml` file to check current state/progress
- [ ] Ensure all public HTML pages are listed (`index.html`, `events.html`, `find-us.html`, etc.)
- [ ] Add `<lastmod>` dates (use build date or git commit dates)
- [ ] Validate sitemap against schema validator

## 3. Add Canonical URLs to Every Page
- [ ] Read each page's `<head>` section (`index.html`, `events.html`, `find-us.html`)
- [ ] Determine the canonical base URL for the site (e.g., from existing meta tags or domain)
- [ ] Insert `<link rel="canonical" href="...">` into every page's `<head>`
- [ ] Verify no duplicate pages are missing a canonical tag
