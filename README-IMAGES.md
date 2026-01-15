# DiscoverUz Image Optimization Guide

## Overview

This document explains the image optimization strategy implemented for the DiscoverUz website and how to manage images going forward.

## Optimization Results

### Before vs After

| Image Type | Original Size | Optimized Size | Savings |
|------------|--------------|----------------|---------|
| background2k.jpg | 509 KB | 398 KB (WebP) | 21.8% |
| background4k.jpg | 1,369 KB | 896 KB (WebP) | 34.5% |
| PNG images (7 total) | ~6.5 MB | ~1.5 MB (WebP) | ~77% |
| discoveruzlogo.svg | 244 KB | 94 KB | 61.3% |
| **Total** | **~8.6 MB** | **~2.9 MB** | **~66% reduction** |

### Generated Responsive Images

For each image, multiple sizes were created:
- 640w - Mobile portrait
- 750w - Mobile landscape
- 828w - Tablet portrait
- 1080w - Tablet landscape / Small desktop
- 1200w - Desktop
- 1920w - Large desktop / Retina displays

## Directory Structure

```
public/
├── images/
│   ├── optimized/           # WebP optimized images
│   │   ├── background2k.webp
│   │   ├── background2k-640w.webp
│   │   ├── background2k-750w.webp
│   │   ├── background2k-828w.webp
│   │   ├── background2k-1080w.webp
│   │   ├── background2k-1200w.webp
│   │   ├── background2k-1920w.webp
│   │   └── ... (other optimized images)
│   ├── background2k.jpg     # Original images (kept as fallback)
│   ├── background4k.jpg
│   └── ... (other originals)
├── discoveruzlogo.optimized.svg
└── logo.optimized.svg
```

## How to Use Optimized Images

### For Background Images

```tsx
import Image from "next/image";

<div className="relative">
  <Image
    src="/images/optimized/background2k.webp"
    alt="Description"
    fill
    priority  // Use for above-the-fold images
    quality={90}
    className="object-cover"
    sizes="100vw"
  />
</div>
```

### For Content Images

```tsx
<Image
  src="/images/optimized/samarkand.webp"
  alt="Samarkand"
  width={1024}
  height={1024}
  quality={85}
  loading="lazy"  // Use for below-the-fold images
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## Adding New Images

When adding new images to the site, follow these steps:

### 1. Add Original Image

Place your original image in `public/images/`:

```bash
# Example: Adding a new city image
public/images/fergana.jpg
```

### 2. Run Optimization Script

```bash
node scripts/convert-images.mjs
```

This will automatically:
- Convert the image to WebP format
- Generate responsive sizes
- Save optimized versions to `public/images/optimized/`

### 3. Use in Your Code

```tsx
<Image
  src="/images/optimized/fergana.webp"
  alt="Fergana Valley"
  width={1024}
  height={768}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## Optimizing SVG Files

For SVG logos and icons:

```bash
node scripts/optimize-svg.mjs
```

Review the optimized versions in the public directory, then replace originals if satisfied.

## Best Practices

### 1. Image Sizes

- **Hero backgrounds**: 1920px - 2048px width, WebP format
- **Content images**: 1024px - 1200px width, WebP format
- **Thumbnails**: 640px - 828px width, WebP format

### 2. Quality Settings

- **Hero images**: 85-90 quality
- **Content images**: 80-85 quality
- **Thumbnails**: 75-80 quality

### 3. Loading Strategy

- **Above-the-fold**: Use `priority` prop
- **Below-the-fold**: Use `loading="lazy"`
- **Background images**: Use `priority` for hero, lazy for others

### 4. Sizes Attribute

Always specify the `sizes` attribute to help the browser choose the right image:

```tsx
// Full width on mobile, 50% on desktop
sizes="(max-width: 768px) 100vw, 50vw"

// Full width always
sizes="100vw"

// Fixed size
sizes="300px"
```

## Performance Metrics

### Expected Improvements

- **Page Load Time**: 30-40% faster
- **First Contentful Paint (FCP)**: 20-30% improvement
- **Largest Contentful Paint (LCP)**: 25-35% improvement
- **Total Page Weight**: 66% reduction (~5.7 MB saved)

### Testing

Run Lighthouse audit to verify improvements:

```bash
npm run build
npm run start
# Then run Lighthouse in Chrome DevTools
```

## Troubleshooting

### Images Not Loading

1. Check the file path is correct
2. Ensure the image exists in `public/images/optimized/`
3. Verify Next.js is serving static files correctly

### Quality Issues

If WebP quality is not satisfactory:
1. Increase quality in the conversion script (line: `webp({ quality: 85 })`)
2. Re-run the conversion script
3. Consider using the original format for that specific image

### Browser Compatibility

WebP is supported in all modern browsers (Chrome, Firefox, Safari 14+, Edge). Next.js automatically handles fallbacks.

## Scripts Reference

### Convert Images to WebP

```bash
node scripts/convert-images.mjs
```

Converts all PNG/JPG images in `public/images/` to WebP format with responsive sizes.

### Optimize SVG Files

```bash
node scripts/optimize-svg.mjs
```

Optimizes SVG files by removing unnecessary data and minifying the code.

## Maintenance

### Monthly Tasks

- [ ] Review and optimize new images added
- [ ] Check for unused images in the public directory
- [ ] Monitor Lighthouse scores
- [ ] Update this guide with new learnings

### When to Re-optimize

- When adding 5+ new images
- After major design changes
- When Lighthouse performance score drops below 90

## Questions?

For questions or issues with image optimization, check:
1. This documentation
2. Next.js Image Optimization docs: https://nextjs.org/docs/app/building-your-application/optimizing/images
3. Sharp documentation: https://sharp.pixelplumbing.com/

---

*Last updated: January 13, 2026*
