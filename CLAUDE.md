# StephenSolves - Math Tutoring Website

## About
Math tutoring website for Stephen Schools offering tutoring from high school to graduate-level mathematics.
- **Owner**: Stephen Schools
- **Credentials**: M.S. Mathematics (The Citadel), B.A. Mathematics (UNC Chapel Hill)
- **Services**: High school through graduate-level math tutoring

## Quick Reference

**Stack**: Next.js 15 + React 19 + TypeScript + Tailwind CSS 4
**Package Manager**: npm
**Content**: Markdown/MDX with gray-matter frontmatter

## Project Structure

```
src/
├── app/                    # Next.js App Router (pages/routes)
├── config/                 # JSON configs (site, theme, menu, social)
├── content/                # Markdown content (blog, pages, sections)
├── layouts/
│   ├── components/         # Reusable UI (BlogCard, Logo, Pagination)
│   ├── partials/           # Page sections (Header, Footer, Features)
│   ├── shortcodes/         # MDX components (Accordion, Tabs, Video)
│   └── helpers/            # Utilities (DynamicIcon, MDXContent)
├── lib/                    # Utilities (contentParser, dateFormat)
├── styles/                 # CSS files (main.css imports all)
├── tailwind-plugin/        # Custom Tailwind plugins
└── types/                  # TypeScript definitions

public/images/              # Static assets (blog, brands, features, shapes)
```

## Key Files

| File | Purpose |
|------|---------|
| `src/config/config.json` | Site settings (URL, logo, pagination) |
| `src/config/theme.json` | Colors, fonts, design tokens |
| `src/config/menu.json` | Navigation structure |
| `src/app/layout.tsx` | Root layout wrapper |
| `src/app/page.tsx` | Homepage |
| `src/styles/main.css` | Main stylesheet entry |

## Routes

- `/` - Homepage (`src/app/page.tsx`)
- `/blog` - Blog listing (`src/app/blog/page.tsx`)
- `/blog/[single]` - Blog post (`src/app/blog/[single]/page.tsx`)
- `/features` - Services page (tutoring offerings)
- `/pricing` - Pricing page (tutoring packages)
- `/contact` - Contact page (booking)
- `/reviews` - Student reviews page
- `/[regular]` - Dynamic pages from `content/pages/`

## Content Locations

- **Blog posts**: `src/content/blog/*.md`
- **Homepage sections**: `src/content/sections/*.md`
- **Regular pages**: `src/content/pages/*.md`
- **Page configs**: `src/content/{features,pricing,contact,reviews}/_index.md`

## Pricing Structure

| Level | Per Hour | 5-Session Package |
|-------|----------|-------------------|
| High School | $45 | $200 |
| Undergraduate | $60 | $275 |
| Graduate | $80 | $375 |

## Component Patterns

**Partials** (src/layouts/partials/): Full page sections
- HomeBanner, Features, FeatureCarousel, Pricing, Testimonial, FAQ, Footer

**Components** (src/layouts/components/): Reusable UI
- BlogCard, ReviewCard, Pagination, StarRatings, Logo, Social

**Shortcodes** (src/layouts/shortcodes/): MDX embeddable
- Accordion, Tabs, Tab, Button, Video, Youtube, Notice

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
npm run format   # Prettier format
```

## Styling

- Tailwind CSS 4 with custom plugins in `src/tailwind-plugin/`
- Theme colors defined in `src/config/theme.json`
- CSS organized in `src/styles/` (base, components, animations, buttons, navigation)

## Content Frontmatter

```yaml
---
title: "Post Title"
date: "2025-04-04T05:00:00.000Z"
image: "/images/blog/image.png"
draft: false
---
```

## When Modifying

1. **Add page**: Create route in `src/app/` + content in `src/content/`
2. **Edit section**: Modify markdown in `src/content/sections/`
3. **Change colors**: Edit `src/config/theme.json`
4. **Update nav**: Edit `src/config/menu.json`
5. **Add component**: Create in `src/layouts/components/`
6. **Add page section**: Create in `src/layouts/partials/`
7. **Update pricing**: Edit `src/content/sections/pricing.md`
8. **Update testimonials**: Edit `src/content/sections/testimonial.md`
