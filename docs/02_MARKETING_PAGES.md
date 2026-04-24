# 234photos Frontend - Marketing Pages

Public marketing pages for SEO and user acquisition.

---

## Homepage (`/`)

**Hero Section:**
- Full-width background with gradient overlay
- Centered search bar with autocomplete
- Tagline: "Discover Authentic African Stock Media"
- CTA buttons: "Explore Assets" and "Become a Contributor"

**Sections:**
1. **Category Grid** - 8 main categories with images
2. **Trending Content** - Horizontal scroll of popular assets
3. **Collections** - Featured curated collections (2x2 photo collage)
4. **Blog Section** - Latest articles and resources
5. **Contributor Spotlight** - Featured photographers
6. **Trust Signals** - Stats (assets, contributors, downloads)

---

## About Page (`/about`)

- Mission statement
- Team section
- Values and culture
- Statistics

---

## Collections (`/collections`)

- Grid of curated collections
- Each collection shows 2x2 photo collage
- Collection detail page with full asset grid

---

## Editorial (`/editorial`)

- Featured editorial content with hero image
- Story-driven photography
- Article cards with:
  - Cover image
  - Category badge with color coding
  - Source attribution
  - Title and excerpt
  - Date and read time
  - Featured badge for hero article
- Editorial detail pages (`/editorial/[slug]`)
- Uses centralized Article type with full metadata:
  - id, slug, title, excerpt, content
  - coverImage (not image)
  - author object with name and avatar
  - tags array
  - publishedAt and updatedAt timestamps
  - readTime
- Related articles section

---

## Pricing (`/pricing`)

- Credit packages
- Subscription plans
- Feature comparison
- FAQ section

---

## Contribute (`/contribute`)

- Benefits of becoming a contributor
- Earnings potential
- Upload process overview
- CTA to apply
- Protected: Opens contributor modal if logged in as customer

---

## How It Works (`/how-it-works`)

- Step-by-step guide for buyers
- Step-by-step guide for contributors
- FAQ section

---

## Contact (`/contact`)

- Contact form
- Support email
- Social media links

---

## Legal Pages

- Terms of Service (`/terms`)
- Privacy Policy (`/privacy`)
- Cookie Policy (`/cookies`)
- License Information (`/licence`)

---

## Next Steps

- **Browse Experience:** See [03_BROWSE_EXPERIENCE.md](./03_BROWSE_EXPERIENCE.md)
- **Design System:** See [06_DESIGN_SYSTEM.md](./06_DESIGN_SYSTEM.md)
