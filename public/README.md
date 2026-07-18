# Public Assets

This portfolio uses `vite-plugin-singlefile`, which inlines everything into a single `index.html`.

## Resume

To add your resume:

1. **Option A: Host externally** (recommended for single-file builds)
   - Upload your PDF to GitHub, Google Drive, or a CDN
   - Update `src/config/portfolio.ts`:
     ```ts
     resume: {
       path: "https://your-cdn.com/resume.pdf", // external URL
       available: true,
     }
     ```

2. **Option B: Switch to multi-file build**
   - Remove `vite-plugin-singlefile` from `vite.config.ts`
   - Place your PDF at `public/resume/sagar-parab-resume.pdf`
   - Update `src/config/portfolio.ts`:
     ```ts
     resume: {
       path: "/resume/sagar-parab-resume.pdf",
       available: true,
     }
     ```

## Favicon

The favicon is already inlined as an SVG data URI in `index.html`. No action needed.

## OG Image (optional)

To add a custom Open Graph image for social sharing:

1. Create a 1200×630 image (PNG or JPG)
2. Host it externally or add to `public/` (if using multi-file build)
3. Update the `<meta property="og:image">` tag in `index.html`
