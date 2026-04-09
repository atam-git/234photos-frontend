I'll create a comprehensive, production-ready Frontend Engineering PRD that incorporates all the gaps identified and delivers a complete specification for your engineering team.

---

# 234photos — Frontend Engineering PRD (Complete Edition)

### Version 1.0 | Series A Ready

---

## TL;DR

This is the definitive frontend engineering product requirements document for 234photos: Africa's next-generation stock media marketplace. It provides complete specifications for the Next.js 14 App Router architecture, all user interface components, major page flows, real-time systems, accessibility requirements, testing strategies, and state management. Derived from master PRD v5 and enhanced with production-grade specifications for visual search, boards collaboration, notification systems, image optimization, error boundaries, and enterprise features.

This document ensures 234photos delivers a best-in-class, SEO-optimized, and conversion-focused experience that performs flawlessly across African mobile networks, meets WCAG 2.1 AA accessibility standards, and achieves the business metrics required for Series A success.

---

## Table of Contents

1. Executive Summary
2. Goals & Success Metrics
3. User Stories
4. Technical Architecture
5. Design System & Component Library
6. Core Page Specifications
7. Feature Deep-Dives
8. State Management
9. API Integration Layer
10. PWA & Offline Strategy
11. Performance Strategy
12. Image & Video Optimization
13. Accessibility Implementation
14. Testing Strategy
15. Analytics & Tracking
16. Security & Privacy
17. Error Handling & Resilience
18. Localization & Internationalization
19. Enterprise Features
20. Admin Interfaces
21. Milestones & Timeline
22. Risk Register
23. Appendices

---

## 1. Executive Summary

The 234photos frontend delivers a mobile-first, culturally intelligent stock media marketplace optimized for African users and global buyers. Built on Next.js 14 with App Router, the frontend implements four strategic pillars:

**AI-Augmented Discovery:** Search experience combining text, visual, and semantic search with real-time autocomplete, trending queries, and zero-result state that triggers content requests.

**Contributor-First Experience:** Drag-and-drop upload wizard supporting 100+ files with resumable uploads (tus.io), bulk metadata editing, real-time earnings dashboard, and gamification elements (leaderboards, badges, upload streaks).

**Enterprise Collaboration:** Board-based workflows with approval systems, SSO integration, team management interfaces, and pooled quota visualization.

**Offline-First Resilience:** PWA with service worker caching recent searches and assets, offline upload queue, and graceful degradation on unreliable networks—critical for African markets.

The frontend targets LCP <2.5s on 4G, <40% bounce rate, <30% checkout abandonment, and contributor dashboard DAU/MAU >40%, with full WCAG 2.1 AA compliance.

---

## 2. Goals & Success Metrics

### 2.1 Business Goals

| Metric | Target | Measurement |
|--------|--------|-------------|
| Largest Contentful Paint (4G mobile) | <2.5s | RUM (PostHog) |
| Homepage bounce rate | <40% | PostHog |
| Checkout abandonment | <30% | PostHog |
| Contributor dashboard DAU/MAU | >40% | PostHog |
| Buyer conversion (registered → first purchase, 30d) | >8% | PostHog |
| Zero-result search rate | <5% | Backend analytics |
| Search-to-Download ratio | >6% | PostHog |
| NPS (buyers) | >45 | Quarterly survey |
| Accessibility violations | Zero critical | axe-core CI |

### 2.2 Technical Goals

| Metric | Target |
|--------|--------|
| Initial JS bundle | ≤200KB (gzipped) |
| Time to Interactive | <3.5s |
| Core Web Vitals | All green (LCP, FID, CLS) |
| Lighthouse score (mobile) | ≥90 |
| Playwright E2E pass rate | >99% |
| API error rate (frontend) | <0.5% |
| Service worker cache hit rate | >80% for static assets |
| Uptime (frontend) | 99.9% |

### 2.3 User Experience Goals

- Ultra-fast search with <300ms perceived latency
- Frictionless purchase flow (<3 clicks from search to download)
- Upload success rate >95% for files <100MB
- Offline functionality for core tasks (search, browse, upload queue)
- Consistent cross-device experience (mobile, tablet, desktop)
- Accessibility for all users regardless of ability or assistive technology

---

## 3. User Stories

### 3.1 Buyers

**Adaeze (Art Director, Lagos)**
- *Search:* "As a buyer, I want to instantly find authentic Nigerian fintech images with filters for orientation, license, and skin tone, so my campaign feels local and real."
- *Boards:* "As a buyer, I want to save images to shared boards with approval workflows, so my team can review and approve assets collaboratively."
- *Payment:* "As a buyer, I want to pay in Naira via Flutterwave, so my finance team can process receipts locally without currency conversion."
- *Download:* "As a buyer, I want to download assets in multiple resolutions with license certificates, so I have proof of licensing for audits."

**Kwame (Blogger, Accra)**
- *Speed:* "As a blogger, I want search results to load quickly even on slow networks, so I can meet my publishing deadlines."
- *Free Content:* "As a blogger, I want to know which assets are free or available with credits, so I can manage my budget."
- *Trending:* "As a blogger, I want to see trending and recommended images, so my content stays fresh and relevant."

**Zanele (Enterprise Buyer, Johannesburg)**
- *Team Management:* "As an enterprise buyer, I want to manage a team account with pooled credits and usage reports, so my company can purchase images collaboratively."
- *SSO:* "As an enterprise buyer, I want SAML SSO login, so our IT team can manage access securely."
- *Bulk Download:* "As an enterprise buyer, I want to bulk-download licensed assets with metadata, so our designers can work offline."
- *Approval Workflow:* "As a team lead, I want to approve or reject team member downloads before credits are deducted, so we control spending."

### 3.2 Contributors

**Fatima (Photographer, Nairobi)**
- *Upload:* "As a contributor, I want a drag-and-drop upload experience that works offline and resumes on reconnection, so I can batch upload 100+ images without friction."
- *Earnings:* "As a contributor, I want to see real-time earnings in KES with breakdowns by asset, so I know what’s selling."
- *Feedback:* "As a contributor, I want notifications when my assets are downloaded or rejected with specific reasons, so I can improve my portfolio."
- *Gamification:* "As a contributor, I want to see my rank on the leaderboard and earn badges, so I feel motivated and recognized."

**Chidi (Illustrator, Enugu)**
- *Protection:* "As an illustrator, I want my artwork displayed with proper watermarks and clear licensing terms, so my creative rights are protected."
- *Campaigns:* "As an illustrator, I want to participate in seasonal upload campaigns with bonus royalties, so I can earn more during peak demand."

**Simi (Videographer, Lagos)**
- *Large Files:* "As a videographer, I want to preview my videos inline and upload large files with progress indicators, so I avoid failed uploads."
- *Analytics:* "As a videographer, I want a dashboard showing earnings per video and download sources, so I can track what content performs best."

### 3.3 Trust & Safety

**Moderator (Internal)**
- *Queue:* "As a moderator, I want a queue with keyboard shortcuts and batch approval, so I can process 200+ assets per hour."
- *Context:* "As a moderator, I want to see AI confidence scores and contributor history, so I can make informed decisions."
- *Resubmissions:* "As a moderator, I want to compare resubmissions with previous versions, so I can verify fixes."

### 3.4 Developers

**Tunde (API User)**
- *Docs:* "As a developer, I want to explore interactive API docs with code samples, so I can integrate 234photos assets into my products."
- *Keys:* "As a developer, I want an API key with usage limits clearly displayed, so I can track costs and quota."

---

## 4. Technical Architecture

### 4.1 Technology Stack

| Category | Technology | Justification |
|----------|------------|---------------|
| Framework | Next.js 14 (App Router) | SSR for SEO, ISR for scale, React Server Components |
| Language | TypeScript 5+ | Type safety, developer experience |
| Styling | Tailwind CSS + CSS Modules | Utility-first with component encapsulation |
| UI Components | shadcn/ui + Radix UI | Accessible, customizable, unstyled primitives |
| State Management | Zustand (client) + TanStack Query (server) | Simple client state, robust server caching |
| API Integration | tRPC | End-to-end type safety, automatic inference |
| Forms | React Hook Form + Zod | Performant forms with schema validation |
| Image Handling | next/image + sharp | Automatic optimization, WebP/AVIF |
| Upload | tus.io + Uppy | Resumable file uploads, progress tracking |
| Real-time | Server-Sent Events (SSE) + WebSockets fallback | Lightweight notifications, board updates |
| PWA | next-pwa + Workbox | Offline caching, installability |
| Analytics | PostHog | Product analytics, feature flags, session replay |
| Monitoring | Sentry | Error tracking, performance monitoring |
| Testing | Jest + RTL + Playwright | Unit, integration, E2E, accessibility |
| CI/CD | GitHub Actions | Automated testing, deployment previews |

### 4.2 Folder Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (marketing)/         # Marketing routes (public)
│   │   ├── page.tsx         # Homepage
│   │   ├── about/
│   │   ├── pricing/
│   │   └── contact/
│   ├── (buyer)/             # Authenticated buyer routes
│   │   ├── search/
│   │   ├── assets/
│   │   ├── boards/
│   │   └── account/
│   ├── (contributor)/       # Contributor routes
│   │   ├── dashboard/
│   │   ├── upload/
│   │   └── portfolio/
│   ├── (enterprise)/        # Enterprise routes
│   │   ├── team/
│   │   ├── billing/
│   │   └── reports/
│   ├── (admin)/             # Admin routes
│   │   ├── moderation/
│   │   ├── liquidity/
│   │   └── users/
│   ├── api/                 # API routes (tRPC, webhooks)
│   │   └── trpc/
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── shared/              # Shared components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── SearchBar/
│   │   └── Modals/
│   ├── features/            # Feature-specific components
│   │   ├── search/
│   │   ├── upload/
│   │   ├── boards/
│   │   └── checkout/
│   └── layouts/             # Layout components
├── lib/
│   ├── trpc/                # tRPC client/server
│   ├── api/                 # API client utilities
│   ├── auth/                # Authentication utilities
│   ├── utils/               # Utility functions
│   └── constants/           # App constants
├── hooks/                   # Custom React hooks
├── stores/                  # Zustand stores
├── types/                   # TypeScript types
├── styles/                  # Global styles, CSS variables
├── config/                  # App configuration
├── middleware.ts            # Next.js middleware (auth, i18n)
└── service-worker.ts        # Custom service worker
```

### 4.3 Rendering Strategy

| Page Type | Strategy | Justification |
|-----------|----------|---------------|
| Homepage | Static (ISR, 1h) | Content rarely changes, SEO critical |
| Search results | SSR with caching (60s) | Real-time results, SEO for filters |
| Asset detail | SSR with ISR (24h) | SEO critical, frequent updates (downloads) |
| Contributor dashboard | CSR (authenticated) | Interactive, real-time data |
| Boards | CSR with optimistic updates | Real-time collaboration |
| Admin interfaces | CSR (authenticated) | Internal tools, no SEO needed |
| Static pages (about, pricing) | Static | Content rarely changes |
| Collections/editorial | ISR (1h) | Curated content, periodic updates |

### 4.4 Caching Strategy

```
Layer 1: Browser Cache (Cache-Control headers)
├── Static assets (fonts, images): 1 year, immutable
├── Thumbnails: 30 days
├── Preview assets: 7 days, stale-while-revalidate
└── API responses: 60s (search), 5s (real-time data)

Layer 2: CDN Edge Cache (Vercel Edge Network)
├── HTML pages: 60s-24h depending on content type
├── API responses: 60s (search, collections)
└── Images: 30 days

Layer 3: Service Worker Cache
├── Static assets: CacheFirst
├── API responses: NetworkFirst with fallback
├── User data: NetworkFirst (no offline write)
└── Upload queue: IndexedDB persistence
```

---

## 5. Design System & Component Library

### 5.1 Design Tokens

```css
:root {
  /* Colors */
  --primary: #E8572A;
  --primary-dark: #D1431A;
  --primary-light: #F07A4F;
  --secondary: #1A1A2E;
  --accent: #F5A623;
  --success: #22C55E;
  --error: #EF4444;
  --warning: #F59E0B;
  --info: #3B82F6;
  
  /* Neutral */
  --gray-50: #FAFAFA;
  --gray-100: #F4F4F5;
  --gray-200: #E4E4E7;
  --gray-300: #D4D4D8;
  --gray-400: #A1A1AA;
  --gray-500: #71717A;
  --gray-600: #52525B;
  --gray-700: #3F3F46;
  --gray-800: #27272A;
  --gray-900: #18181B;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-mono: 'Fira Code', monospace;
  
  /* Spacing (8px baseline) */
  --spacing-1: 0.125rem;  /* 2px */
  --spacing-2: 0.25rem;   /* 4px */
  --spacing-3: 0.5rem;    /* 8px */
  --spacing-4: 0.75rem;   /* 12px */
  --spacing-5: 1rem;      /* 16px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
  
  /* Border Radius */
  --radius-sm: 0.25rem;    /* 4px */
  --radius-md: 0.5rem;     /* 8px */
  --radius-lg: 0.75rem;    /* 12px */
  --radius-xl: 1rem;       /* 16px */
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  --shadow-hover: 0 20px 25px -5px rgb(0 0 0 / 0.15);
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Z-index Scale */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-toast: 1070;
  --z-tooltip: 1080;
}

/* Dark mode */
.dark {
  --gray-50: #18181B;
  --gray-100: #27272A;
  --gray-200: #3F3F46;
  --gray-300: #52525B;
  --gray-400: #71717A;
  --gray-500: #A1A1AA;
  --gray-600: #D4D4D8;
  --gray-700: #E4E4E7;
  --gray-800: #F4F4F5;
  --gray-900: #FAFAFA;
}
```

### 5.2 Component Library (shadcn/ui Extensions)

| Component | Customizations |
|-----------|----------------|
| Button | Variants: primary, secondary, ghost, destructive, outline. Sizes: sm, md, lg. Loading state with spinner |
| Card | Hover state with shadow-lg, interactive card variant for clickable cards |
| Modal | Size variants: sm, md, lg, fullscreen. Focus trap, close on overlay click, ESC key |
| Dropdown | Portal rendering, keyboard navigation, group headers |
| Tabs | Underline variant, pill variant, full-width responsive |
| Input | Error states with message, loading state, prefix/suffix icons |
| Select | Searchable, async options, multi-select |
| Checkbox | Indeterminate state, card selection |
| Badge | Variants: success, warning, error, info, brand, AI (with icon) |
| Toast | Action buttons, auto-dismiss, swipe to dismiss, stackable |
| Skeleton | Shimmer animation, aspect ratio variants |
| Tooltip | Delay config, placement, max-width |
| Popover | Custom trigger, close on click outside |
| Alert Dialog | Destructive variant, confirm/cancel |
| Progress | Animated, label, size variants |
| Switch | Label with description |
| Textarea | Auto-resize, character count |
| Avatar | Fallback initials, online/offline indicator |
| Breadcrumb | Collapsible on mobile, separator custom |
| Pagination | Compact mobile variant, show/hide controls |
| Table | Sortable columns, selectable rows, sticky header, virtual scrolling for large datasets |
| Toggle Group | Single/multi select, size variants |
| Command (Cmd+k) | Global search palette, recent searches, keyboard shortcuts |

### 5.3 Typography Scale

| Variant | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| Heading 1 | 2.5rem (40px) | 700 | 1.2 | Page titles |
| Heading 2 | 2rem (32px) | 600 | 1.25 | Section headers |
| Heading 3 | 1.5rem (24px) | 600 | 1.3 | Card titles |
| Heading 4 | 1.25rem (20px) | 600 | 1.4 | Subheadings |
| Body Large | 1.125rem (18px) | 400 | 1.5 | Lead paragraphs |
| Body | 1rem (16px) | 400 | 1.5 | Default text |
| Body Small | 0.875rem (14px) | 400 | 1.5 | Secondary text |
| Caption | 0.75rem (12px) | 400 | 1.5 | Metadata, timestamps |
| Button | 0.875rem (14px) | 500 | 1 | Button text |
| Label | 0.875rem (14px) | 500 | 1 | Form labels |

---

## 6. Core Page Specifications

### 6.1 Homepage

**Layout:**
- Full-bleed hero with gradient overlay
- Central search bar with autocomplete
- Trending searches section (dynamic)
- Featured collections (3-5, horizontal scroll)
- Campaign hero (admin-driven, seasonal)
- Contributor leaderboard preview
- Testimonials (carousel)
- Trust signals (stats: assets, contributors, buyers)
- Footer with links and newsletter signup

**Search Bar Features:**
- Autocomplete (300ms debounce)
- Trending searches (fire emoji)
- Search history (localStorage, last 5)
- Visual search icon (camera)
- Recent searches with clear button
- Keyboard shortcuts: `/` to focus

**Mobile Considerations:**
- Hero reduced height
- Bottom navigation bar fixed
- Collections as horizontal scroll
- Search bar sticky on scroll

**State Variations:**
- Authenticated: personalized recommendations, credit balance display
- Unauthenticated: CTA to sign up for free credits

### 6.2 Search Results Page

**URL Structure:** `/search?q={query}&filters={filters}`

**Layout Components:**

```
┌─────────────────────────────────────────────────────────┐
│  Search Bar (sticky)                                    │
├─────────────┬───────────────────────────────────────────┤
│             │  Active Filters: [Chip] [Chip] [Clear]   │
│  Filters    │  Sort: [Relevance ▼]                     │
│  (Desktop   ├───────────────────────────────────────────┤
│   sidebar,  │  Masonry Grid (3 columns desktop)        │
│   mobile    │  ┌─────┐ ┌─────┐ ┌─────┐                │
│   bottom    │  │     │ │     │ │     │                │
│   sheet)    │  └─────┘ └─────┘ └─────┘                │
│             │  Infinite Scroll Loader                  │
└─────────────┴───────────────────────────────────────────┘
```

**Filter Panel (Desktop Sidebar):**

| Filter Category | Options |
|-----------------|---------|
| Media Type | Photos, Videos, Vectors, Illustrations |
| Orientation | Horizontal, Vertical, Square |
| License | Standard, Enhanced, Editorial |
| Color | Color picker with hex input |
| Price | Free, Paid, Subscription only |
| Contributors | Searchable multi-select |
| AI Content | Show all, Human only, AI only |
| Date Added | Last 24h, Last week, Last month, Last year |
| Resolution | SD, HD, 4K (video), Vector |
| Location | Country/region (Africa-focused) |
| Model Release | Released, Not required |
| Property Release | Released, Not required |

**Masonry Grid Specifications:**
- Dynamic column count: 1 (mobile), 2 (tablet), 3 (desktop)
- Aspect ratios preserved
- Lazy loading with IntersectionObserver
- Hover preview: image enlarges 5%, shows metadata (contributor, downloads, resolution)
- Click to asset detail
- Right-click menu: Save to board, Copy link, Report

**Zero-Result State:**
```
┌─────────────────────────────────────┐
│  🔍 No results found for "{query}"  │
│                                     │
│  Suggestions:                       │
│  • Check spelling                   │
│  • Try different keywords           │
│  • Use fewer filters                │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📷 Request this content     │   │
│  │    We'll notify contributors │   │
│  └─────────────────────────────┘   │
│                                     │
│  Trending searches this week:       │
│  [African fintech] [Lagos skyline]  │
└─────────────────────────────────────┘
```

**Infinite Scroll:**
- Trigger at 300px from bottom
- Loading skeleton (3 cards)
- Error state with retry button
- End of results indicator

### 6.3 Asset Detail Page

**URL Structure:** `/asset/{id}/{slug}`

**Layout:**

```
┌───────────────────────────────────────────────────────┐
│  Breadcrumb: Home / Search / Category                 │
├───────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌──────────────────────────┐│
│  │                     │  │ Asset Info:              ││
│  │  Watermarked        │  │ Title, Description       ││
│  │  Preview            │  │ Tags                     ││
│  │  (Full width        │  │ ─────────────────────────││
│  │   on mobile)        │  │ License Selector:        ││
│  │                     │  │ ○ Standard ($XX)         ││
│  │  Zoom controls      │  │ ○ Enhanced ($XX)         ││
│  │  (tap/double-tap)   │  │ ○ Editorial ($XX)        ││
│  │                     │  │                          ││
│  └─────────────────────┘  │ Download Button          ││
│                           │ Add to Board             ││
│                           │ ─────────────────────────││
│                           │ Contributor:             ││
│                           │ Avatar, Name, Stats      ││
│                           │ Follow button            ││
│                           │ ─────────────────────────││
│                           │ Metadata:                ││
│                           │ Dimensions, Size,        ││
│                           │ File type, Date added    ││
│                           │ ─────────────────────────││
│                           │ AI Generated Badge (if)  ││
│                           │ Editorial Badge (if)     ││
│                           │ Campaign Badge (if)      ││
│                           └──────────────────────────┘│
├───────────────────────────────────────────────────────┤
│  Similar Assets (horizontal scroll)                   │
├───────────────────────────────────────────────────────┤
│  More from this contributor                           │
├───────────────────────────────────────────────────────┤
│  Comments & Reviews (Phase 2)                         │
└───────────────────────────────────────────────────────┘
```

**Image Preview Features:**
- Zoom: pinch on mobile, click/drag on desktop
- Zoom indicator: "Click to zoom" tooltip first visit
- Double-tap to zoom (mobile)
- Keyboard: +, - to zoom, arrow keys to navigate similar assets
- Watermark overlay (position: center, opacity: 30%)

**License Selector:**
- Toggle between Standard/Enhanced/Editorial
- Price updates dynamically
- Feature comparison tooltip
- Subscription indicator: "Included in Pro plan"

**Download Flow Modal:**

```
┌─────────────────────────────────────┐
│  Download Asset                     │
├─────────────────────────────────────┤
│  Select Format:                     │
│  ○ JPG (Original)                   │
│  ○ PNG (Transparent)                │
│  ○ WebP (Optimized)                 │
│  ○ SVG (Vector)                     │
│                                     │
│  Select Size:                       │
│  ○ Small (640px)  ✓ Included        │
│  ○ Medium (1920px) ✓ Included       │
│  ○ Original (5760px) +$5            │
│                                     │
│  License Type: Standard             │
│  (View full license terms)          │
│                                     │
│  Your credits: 12 remaining         │
│  This download: 1 credit            │
│                                     │
│  [Download] [Cancel]                │
└─────────────────────────────────────┘
```

**JSON-LD Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://234photos.com/asset/123",
  "name": "Lagos Fintech Professional",
  "description": "Businesswoman in modern Lagos office",
  "author": {
    "@type": "Person",
    "name": "Oluwaseun Adebayo",
    "url": "https://234photos.com/contributor/olu"
  },
  "license": "https://234photos.com/license/standard",
  "acquireLicensePage": "https://234photos.com/asset/123/license",
  "keywords": "fintech, lagos, nigeria, business, technology",
  "dateCreated": "2024-01-15",
  "uploadDate": "2024-01-20",
  "contentSize": "5.2 MB",
  "height": 3840,
  "width": 5760
}
```

### 6.4 Contributor Dashboard

**Layout:** (CSR with real-time updates)

```
┌─────────────────────────────────────────────────────────┐
│  Welcome back, Fatima!  [Upload New] [Portfolio]       │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │ Earnings    │ │ Downloads   │ │ Views       │       │
│  │ $1,240      │ │ 847         │ │ 12.4K       │       │
│  │ This month  │ │ This month  │ │ This month  │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
├─────────────────────────────────────────────────────────┤
│  Leaderboard Position: #12 in Kenya (↑3 this week)     │
│  [View Full Leaderboard]                               │
├─────────────────────────────────────────────────────────┤
│  Recent Activity                                        │
│  ┌─────────────────────────────────────────────────────┐│
│  │ 🔽 5 downloads of "Lagos Skyline" today            ││
│  │ 👍 12 likes on "Nairobi Tech Hub" yesterday        ││
│  │ 💰 $45 earned from "Accra Market" this week        ││
│  │ 📈 "Lagos Fintech" trending in Business category   ││
│  └─────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────┤
│  Top Performing Assets                                  │
│  ┌─────┐ ┌─────┐ ┌─────┐                              │
│  │     │ │     │ │     │                              │
│  │$120 │ │$98  │ │$76  │                              │
│  │847 DL│ │632 DL│ │445 DL│                              │
│  └─────┘ └─────┘ └─────┘                              │
├─────────────────────────────────────────────────────────┤
│  Gamification                                           │
│  Badges: 🏆 Top 10 Kenya, 🔥 30-day streak,            │
│          🎯 Gap filler x3, 👑 1000 downloads           │
│  Next badge: 5000 downloads (58% complete)             │
├─────────────────────────────────────────────────────────┤
│  Pending Uploads: 12 images processing                  │
│  Rejected: 2 images (view feedback)                     │
└─────────────────────────────────────────────────────────┘
```

### 6.5 Upload Wizard

**Multi-step Flow:**

```
Step 1: File Selection
┌─────────────────────────────────────────────────────────┐
│  Drag & drop files here or click to browse              │
│                                                         │
│  Supported: JPG, PNG, SVG, MP4, MOV (max 4GB)          │
│  Up to 100 files per batch                              │
│                                                         │
│  Resumable upload (tus.io) - pause/resume               │
│  Uploads persist across page reloads                    │
└─────────────────────────────────────────────────────────┘

Step 2: Upload Progress
┌─────────────────────────────────────────────────────────┐
│  Uploading 45/100 files                                 │
│  ████████████░░░░░░░░ 45%                              │
│                                                         │
│  ✅ lagos_skyline_01.jpg - complete                    │
│  ✅ nairobi_office_02.jpg - complete                    │
│  🔄 accra_market_03.jpg - 67% (2.4 MB/s)               │
│  ⏳ kigali_street_04.jpg - queued                       │
│                                                         │
│  [Pause All] [Cancel]                                   │
└─────────────────────────────────────────────────────────┘

Step 3: AI Tag Suggestions
┌─────────────────────────────────────────────────────────┐
│  lagos_skyline_01.jpg                                   │
│                                                         │
│  AI suggested tags:                                     │
│  [lagos] [nigeria] [skyline] [cityscape] [urban]       │
│  [sunset] [business district] [architecture]           │
│                                                         │
│  ✏️ Add custom tags: [____________] [Add]               │
│                                                         │
│  Category: [Business ▼]                                 │
│  Release: [Model release required? ▼]                   │
│                                                         │
│  [Apply to all] [Next]                                  │
└─────────────────────────────────────────────────────────┘

Step 4: Bulk Metadata
┌─────────────────────────────────────────────────────────┐
│  Apply metadata to selected files: 45 selected          │
│                                                         │
│  Title prefix: [Lagos Business Scene - ___]             │
│  Description: [Professional business photography...]    │
│  Tags: [business, nigeria, lagos, corporate] + add     │
│  Category: Business                                     │
│  Model release: Not required                            │
│                                                         │
│  [Previous] [Submit for Review]                         │
└─────────────────────────────────────────────────────────┘

Step 5: Submission Complete
┌─────────────────────────────────────────────────────────┐
│  ✅ 45 assets submitted for review!                     │
│                                                         │
│  Estimated review time: 24-48 hours                    │
│  You'll receive notifications when approved.            │
│                                                         │
│  [Upload More] [Go to Dashboard]                        │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Feature Deep-Dives

### 7.1 Visual Search

**Entry Points:**
- Camera icon in search bar
- Upload button in search input
- Long-press on images in search results

**User Flow:**

```
1. User taps camera icon
   ↓
2. Bottom sheet opens:
   ┌─────────────────────────────┐
   │  📸 Take a photo            │
   │  🖼️ Upload from gallery     │
   │  🔗 Paste image URL         │
   │  [Cancel]                   │
   └─────────────────────────────┘
   ↓
3. Image capture/upload
   ↓
4. Loading state:
   "Analyzing image with AI..."
   (skeleton UI, progress indicator)
   ↓
5. Results page:
   "Showing images visually similar to your upload"
   Standard search results grid
   Visual indicator: 🔍 with camera icon
   ↓
6. Zero-match state:
   "No exact matches found"
   "Try these related searches: [tags]"
   "Or request similar content"
```

**Technical Implementation:**
- Upload image to backend for CLIP embedding
- Backend returns similar asset IDs
- Frontend renders standard search results
- Cache recent visual searches (last 5)

### 7.2 Boards & Collaboration

**Board Types:**

| Type | Features |
|------|----------|
| Private | Personal collections, no sharing |
| Shared | Invite-only, view/edit permissions |
| Team | Enterprise, approval workflows, brand kits |

**Board Interface:**

```
┌─────────────────────────────────────────────────────────┐
│  ← Back to Boards  |  Campaign Q3 2024                  │
│  Created by You · Last updated 2h ago                  │
├─────────────────────────────────────────────────────────┤
│  Members: 5 collaborators (3 online)                    │
│  [Invite] [Settings] [Export CSV]                      │
├─────────────────────────────────────────────────────────┤
│  Tabs: [Assets] [Comments] [Activity] [Settings]       │
├─────────────────────────────────────────────────────────┤
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌──────────────┐            │
│  │     │ │     │ │     │ │ + Add asset  │            │
│  │✓    │ │✓    │ │⏳   │ │   or drag    │            │
│  │Approved│ │Approved│ │Pending │ │   here       │            │
│  └─────┘ └─────┘ └─────┘ └──────────────┘            │
│                                                         │
│  Comment thread (right sidebar):                        │
│  ┌─────────────────────────────────────────────────────┐│
│  │ @Zanele: Can we use the first image?                ││
│  │   @Adaeze: Approved, license purchased              ││
│  │   ✅ Mark as resolved                               ││
│  │                                                     ││
│  │ [@] Write a comment... [Send]                      ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

**Approval Workflow:**

```
Contributor adds asset to board
         ↓
Asset status: "Pending Review"
         ↓
Approver receives notification
         ↓
Approver reviews asset
    ├── Approve → Status: "Approved"
    │            Credits deducted from team quota
    │            Notification to contributor
    └── Reject → Status: "Rejected"
                 Comment required
                 Notification to contributor
```

**Real-time Features:**
- SSE for member presence (online/offline)
- Live cursor positions (Phase 2)
- Instant comment updates
- Conflict resolution (last write wins with notification)

### 7.3 Notification System

**Notification Types:**

| Type | Icon | Action |
|------|------|--------|
| Download | 🔽 | View asset, contributor earnings |
| Approval | ✅ | View asset, board |
| Rejection | ❌ | View feedback, edit/resubmit |
| Comment | 💬 | View board, reply |
| Campaign | 🎯 | View campaign, upload now |
| Earnings | 💰 | View earnings, withdraw |
| System | ℹ️ | View details |

**Notification Center:**

```
┌─────────────────────────────────────────────────────────┐
│  Notifications                          [Mark all read] │
├─────────────────────────────────────────────────────────┤
│  Today                                                  │
│  ┌─────────────────────────────────────────────────────┐│
│  │ 🔽 5 people downloaded "Lagos Skyline"              ││
│  │    Earned: $12.50 · 2 hours ago                     ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │ ✅ 12 assets approved for upload                     ││
│  │    Now live in search · 4 hours ago                 ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  Yesterday                                              │
│  ┌─────────────────────────────────────────────────────┐│
│  │ 💬 @Zanele commented on "Campaign Q3" board         ││
│  │    "Can we use a brighter version?"                 ││
│  │    [Reply] [View board]                             ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  [Load more]                                            │
└─────────────────────────────────────────────────────────┘
```

**SSE Connection Management:**
```typescript
// Connection lifecycle
1. User authenticated → establish SSE connection
2. Heartbeat every 30s to keep connection alive
3. On disconnect: exponential backoff reconnect (1s, 2s, 4s, 8s, max 30s)
4. Connection status indicator in header
5. Failed reconnects after 5 attempts → show "Reconnect" button
```

### 7.4 Contributor Leaderboard

**URL:** `/contributors/leaderboard`

**Features:**
- Tabs: Top Downloads, Top Earnings
- Filters: Country, Category, Media Type, Time Period (This Month, All Time)
- Ranks 1-100 with pagination
- Highlight top 3 with podium styling
- User's rank displayed if in top 100
- Badge on contributor profiles for top 10 positions
- Real-time updates (hourly cache, periodic refresh)

**Visual:**
```
┌─────────────────────────────────────────────────────────┐
│  🏆 Contributor Leaderboard                             │
│  [Top Downloads] [Top Earnings]                         │
├─────────────────────────────────────────────────────────┤
│  Filters: [All Countries ▼] [All Categories ▼]         │
├─────────────────────────────────────────────────────────┤
│  #1  🥇  Fatima Okonkwo      🇳🇬 Nigeria                 │
│       Downloads: 12,847     Earnings: $4,231            │
│       🔥 Top 1 for 3 weeks                              │
├─────────────────────────────────────────────────────────┤
│  #2  🥈  Kwame Asare         🇬🇭 Ghana                   │
│       Downloads: 10,234     Earnings: $3,892            │
│       📈 Up 2 spots this week                           │
├─────────────────────────────────────────────────────────┤
│  #3  🥉  Zanele Dlamini      🇿🇦 South Africa            │
│       Downloads: 8,921      Earnings: $3,124            │
│       🎯 Gap filler badge x5                            │
├─────────────────────────────────────────────────────────┤
│  ...                                                    │
│                                                         │
│  Your rank: #42 (↑5 this week)                          │
│  Next milestone: Top 40 (58 downloads away)             │
└─────────────────────────────────────────────────────────┘
```

### 7.5 Checkout Flow

**Goal:** <3 clicks from cart to download, <30% abandonment

**Flow:**

```
1. User clicks "Download" on asset
   ↓
2. Check if user has credits/subscription
   ├── Has credits → Download modal → Download
   └── No credits → Checkout
       ↓
3. Checkout Options:
   ┌─────────────────────────────────────────────┐
   │  Choose payment method:                     │
   │  ○ Pay with credits (0 remaining)           │
   │  ○ Buy credits                              │
   │  ○ Subscribe to Pro (unlimited downloads)   │
   │  ○ Pay per asset (one-time)                 │
   │                                             │
   │  Selected: Standard License - $12           │
   │                                             │
   │  [Continue]                                 │
   └─────────────────────────────────────────────┘
   ↓
4. Payment modal (Stripe or Flutterwave inline)
   ↓
5. Success state:
   ┌─────────────────────────────────────────────┐
   │  ✅ Purchase successful!                     │
   │                                             │
   │  Your download will start automatically     │
   │  License certificate emailed to you@email   │
   │                                             │
   │  [Download Now] [View License] [Done]       │
   └─────────────────────────────────────────────┘
   ↓
6. Download starts automatically
```

**Currency Handling:**
- Display in local currency (NGN, GHS, KES, ZAR, USD)
- Real-time exchange rate via API (updated daily)
- Show USD equivalent for transparency
- VAT calculation based on buyer location

**Abandonment Recovery:**
- Exit intent detection
- Modal: "Wait! Complete your purchase to download"
- Email reminder after 2 hours (if email provided)
- Cart persists across sessions

---

## 8. State Management

### 8.1 Zustand Stores

**Auth Store:**
```typescript
interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  setUser: (user: User) => void;
}
```

**Search Store:**
```typescript
interface SearchState {
  query: string;
  filters: SearchFilters;
  sortBy: SortOption;
  results: Asset[];
  isLoading: boolean;
  hasMore: boolean;
  
  setQuery: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  resetFilters: () => void;
  loadMore: () => Promise<void>;
}
```

**Upload Store (IndexedDB persistence):**
```typescript
interface UploadState {
  files: UploadFile[];
  status: 'idle' | 'uploading' | 'paused' | 'complete' | 'error';
  progress: number;
  
  addFiles: (files: File[]) => void;
  startUpload: () => Promise<void>;
  pauseUpload: () => void;
  resumeUpload: () => Promise<void>;
  cancelUpload: () => void;
  retryFailed: (fileId: string) => Promise<void>;
}
```

**Notification Store:**
```typescript
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isConnected: boolean;
  
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  addNotification: (notification: Notification) => void;
  connectSSE: () => void;
  disconnectSSE: () => void;
}
```

### 8.2 TanStack Query Configuration

```typescript
// Query client configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Key factories
export const queryKeys = {
  search: (params: SearchParams) => ['search', params],
  asset: (id: string) => ['asset', id],
  contributor: (id: string) => ['contributor', id],
  boards: (userId: string) => ['boards', userId],
  notifications: (userId: string) => ['notifications', userId],
  earnings: (contributorId: string, period: Period) => ['earnings', contributorId, period],
};
```

---

## 9. API Integration Layer

### 9.1 tRPC Configuration

```typescript
// src/lib/trpc/client.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/trpc/router';

export const trpc = createTRPCReact<AppRouter>();

// src/lib/trpc/provider.tsx
export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/trpc`,
          headers() {
            return {
              authorization: `Bearer ${getToken()}`,
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
```

### 9.2 API Error Handling

```typescript
// src/lib/api/errors.ts
export class APIError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Error mapping for UI
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof APIError) {
    switch (error.code) {
      case 'UNAUTHORIZED':
        return 'Please log in to continue';
      case 'RATE_LIMITED':
        return 'Too many requests. Please try again later';
      case 'INSUFFICIENT_CREDITS':
        return 'You need more credits to download this asset';
      case 'ASSET_NOT_FOUND':
        return 'This asset is no longer available';
      default:
        return error.message;
    }
  }
  return 'Something went wrong. Please try again';
};
```

---

## 10. PWA & Offline Strategy

### 10.1 Service Worker Implementation

```typescript
// service-worker.ts
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache static assets
precacheAndRoute(self.__WB_MANIFEST);

// Static assets: CacheFirst
registerRoute(
  ({ request }) => request.destination === 'style' || 
                   request.destination === 'script' ||
                   request.destination === 'font',
  new CacheFirst({
    cacheName: 'static-assets',
    plugins: [
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 }),
    ],
  })
);

// API responses: NetworkFirst with fallback
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/') && 
               !url.pathname.includes('/upload'),
  new NetworkFirst({
    cacheName: 'api-responses',
    networkTimeoutSeconds: 5,
    plugins: [
      new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 7 * 24 * 60 * 60 }),
    ],
  })
);

// Asset thumbnails: StaleWhileRevalidate
registerRoute(
  ({ request }) => request.destination === 'image' &&
                   request.url.includes('/thumbnails/'),
  new StaleWhileRevalidate({
    cacheName: 'thumbnails',
    plugins: [
      new ExpirationPlugin({ maxEntries: 500, maxAgeSeconds: 30 * 24 * 60 * 60 }),
    ],
  })
);

// Offline fallback page
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
      {
        handlerDidError: async () => {
          return caches.match('/offline.html');
        },
      },
    ],
  })
);
```

### 10.2 Offline Capabilities

**Supported Offline Actions:**
- Browse cached search results (last 3 searches)
- View cached asset pages (last 10 assets)
- Queue uploads for when online
- View cached leaderboard (stale data)
- Access app shell (navigation, basic UI)

**Not Supported Offline:**
- New searches (network required)
- Downloads (license verification)
- Real-time notifications
- Checkout/purchases

**Offline UI:**
```
┌─────────────────────────────────────────────────────────┐
│  ⚠️ You're offline                                      │
│                                                         │
│  You can still:                                         │
│  • Browse your recent searches                          │
│  • View cached assets                                   │
│  • Queue uploads (will resume when online)              │
│                                                         │
│  [View recent searches] [Queue uploads]                 │
└─────────────────────────────────────────────────────────┘
```

---

## 11. Performance Strategy

### 11.1 Performance Budgets

| Category | Budget | Enforcement |
|----------|--------|-------------|
| Initial JS bundle (gzipped) | ≤200KB | Lighthouse CI, bundle analyzer |
| Total JS (all pages) | ≤500KB | Lighthouse CI |
| CSS (critical) | ≤50KB | PurgeCSS, CSS minification |
| First-party images | ≤100KB per image | next/image optimization |
| LCP | <2.5s (4G) | RUM monitoring, performance budgets |
| FCP | <1.8s | RUM monitoring |
| TTI | <3.5s | RUM monitoring |
| CLS | <0.1 | Layout shift monitoring |

### 11.2 Image Optimization Pipeline

```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.234photos.com',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
};

// Image component
<Image
  src={asset.url}
  alt={asset.title}
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isAboveTheFold}
  placeholder="blur"
  blurDataURL={asset.blurHash}
  loading={lazy ? 'lazy' : 'eager'}
/>
```

### 11.3 Code Splitting Strategy

```typescript
// Dynamic imports
const UploadWizard = dynamic(() => import('@/components/features/upload/UploadWizard'), {
  loading: () => <Skeleton height="600px" />,
  ssr: false,
});

const CheckoutModal = dynamic(() => import('@/components/features/checkout/CheckoutModal'), {
  loading: () => <Skeleton height="400px" />,
});

// Route-based splitting (Next.js automatic)
// Groups: marketing, buyer, contributor, admin
```

---

## 12. Image & Video Optimization

### 12.1 Image Formats & Quality

| Asset Type | Format | Quality | Justification |
|------------|--------|---------|---------------|
| Thumbnails (grid) | WebP | 85% | Balance quality/size |
| Previews (detail) | WebP | 90% | Higher quality for evaluation |
| Thumbnails (mobile) | WebP | 80% | Smaller for slower networks |
| Full resolution | Original (JPG/PNG) | 100% | Preserve contributor quality |
| Vector previews | SVG | - | Lossless, scalable |
| Video previews | H.264 MP4 | 70% | Streaming optimized |

### 12.2 BlurHash Implementation

```typescript
// Generate BlurHash on upload (server-side)
import { encode } from 'blurhash';

// Frontend component
function AssetImage({ asset }: { asset: Asset }) {
  return (
    <div className="relative">
      <Image
        src={asset.url}
        alt={asset.title}
        width={800}
        height={600}
        placeholder="blur"
        blurDataURL={`data:image/jpeg;base64,${asset.blurHash}`}
      />
      {asset.aiGenerated && (
        <Badge variant="ai" className="absolute top-2 right-2">
          AI Generated
        </Badge>
      )}
    </div>
  );
}
```

### 12.3 Video Optimization

- Use H.264 codec for broad compatibility
- Generate multiple resolutions (360p, 720p, 1080p)
- Implement lazy loading with IntersectionObserver
- Autoplay muted on hover (desktop)
- Thumbnail generation at 0%, 25%, 50%, 75% of duration

---

## 13. Accessibility Implementation

### 13.1 WCAG 2.1 AA Compliance Checklist

| Category | Requirements | Implementation |
|----------|--------------|----------------|
| Perceivable | Text alternatives | All images have alt text, decorative images have alt="" |
| Perceivable | Captions (video) | Phase 2: auto-captions for previews |
| Perceivable | Color contrast | 4.5:1 minimum, tested with Colour Contrast Analyser |
| Perceivable | Resize text | No loss of functionality at 200% zoom |
| Operable | Keyboard navigation | Full keyboard support, focus indicators |
| Operable | Enough time | No time limits; extendable if present |
| Operable | Seizures | No flashing >3 times/second |
| Operable | Navigable | Skip navigation link, descriptive page titles, breadcrumbs |
| Understandable | Readable | Language attribute, clear language |
| Understandable | Predictable | Consistent navigation, consistent component behavior |
| Understandable | Input assistance | Error suggestions, labels, instructions |
| Robust | Compatible | Semantic HTML, ARIA where needed |

### 13.2 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus search bar |
| `ESC` | Close modal, clear search |
| `←` / `→` | Navigate search results (asset detail) |
| `g` + `h` | Go to homepage |
| `g` + `s` | Go to search |
| `g` + `d` | Go to dashboard (contributor) |
| `?` | Open keyboard shortcuts help |

### 13.3 ARIA Implementation

```tsx
// Modal example
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Download Asset</h2>
  <p id="modal-description">Select resolution and license type</p>
</div>

// Form error announcement
<div aria-live="polite" role="status">
  {errors.map(error => (
    <p key={error} role="alert">{error}</p>
  ))}
</div>

// Skip navigation
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

---

## 14. Testing Strategy

### 14.1 Testing Pyramid

```
        ┌─────────────┐
        │    E2E      │  5% (Playwright)
        │  (Critical  │  Critical user journeys
        │   paths)    │
     ┌──┴─────────────┴──┐
     │   Integration     │ 20% (React Testing Library)
     │  (User flows)     │  Component integration
   ┌─┴───────────────────┴─┐
   │      Unit Tests        │ 75% (Jest)
   │   (Components, hooks)  │  Fast, isolated
   └────────────────────────┘
```

### 14.2 Unit Testing (Jest + React Testing Library)

```typescript
// SearchBar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('handles user input', () => {
    render(<SearchBar onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'lagos' } });
    expect(input).toHaveValue('lagos');
  });

  it('calls onSearch with debounce', async () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'lagos' } });
    await waitFor(() => expect(onSearch).toHaveBeenCalledWith('lagos'), { timeout: 400 });
  });
});
```

### 14.3 Integration Testing (React Testing Library)

```typescript
// SearchFlow.test.tsx
describe('Search Flow', () => {
  it('searches and navigates to asset detail', async () => {
    render(<SearchPage />);
    
    // Type search
    await user.type(screen.getByRole('searchbox'), 'lagos skyline');
    await user.click(screen.getByRole('button', { name: /search/i }));
    
    // Wait for results
    await waitFor(() => {
      expect(screen.getByTestId('results-grid')).toBeInTheDocument();
    });
    
    // Click first result
    await user.click(screen.getAllByRole('article')[0]);
    
    // Verify navigation
    expect(window.location.pathname).toMatch(/\/asset\/\d+/);
  });
});
```

### 14.4 E2E Testing (Playwright)

```typescript
// checkout.spec.ts
import { test, expect } from '@playwright/test';

test('complete checkout flow', async ({ page }) => {
  await page.goto('/');
  await page.fill('[data-testid="search-input"]', 'business');
  await page.click('[data-testid="search-button"]');
  await page.click('[data-testid="asset-card"]:first-child');
  await page.click('[data-testid="download-button"]');
  await page.click('[data-testid="checkout-credits"]');
  await page.fill('[data-testid="card-number"]', '4242424242424242');
  await page.fill('[data-testid="card-expiry"]', '12/25');
  await page.fill('[data-testid="card-cvc"]', '123');
  await page.click('[data-testid="pay-button"]');
  
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  await expect(page.locator('[data-testid="download-start"]')).toBeVisible();
});
```

### 14.5 Visual Regression Testing (Chromatic)

```typescript
// storybook/AssetCard.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { AssetCard } from '@/components/features/search/AssetCard';

const meta: Meta<typeof AssetCard> = {
  title: 'Search/AssetCard',
  component: AssetCard,
  parameters: {
    chromatic: { viewports: [320, 768, 1024] },
  },
};

export const Default: StoryObj = {
  args: {
    asset: mockAsset,
  },
};

export const WithAIBadge: StoryObj = {
  args: {
    asset: { ...mockAsset, aiGenerated: true },
  },
};
```

### 14.6 Accessibility Testing

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';
import { axe } from '@axe-core/playwright';

export default defineConfig({
  use: {
    // Add axe to each test
    trace: 'on-first-retry',
  },
});

// accessibility.spec.ts
test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

---

## 15. Analytics & Tracking

### 15.1 PostHog Implementation

```typescript
// src/lib/analytics.ts
import posthog from 'posthog-js';

export const initAnalytics = () => {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    autocapture: true,
    capture_pageview: true,
    persistence: 'localStorage',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    },
  });
};

// Custom events
export const trackEvent = (event: string, properties?: Record<string, any>) => {
  posthog.capture(event, properties);
};

// Identify user
export const identifyUser = (user: User) => {
  posthog.identify(user.id, {
    email: user.email,
    name: user.name,
    userType: user.type,
    country: user.country,
    plan: user.plan,
  });
};
```

### 15.2 Event Tracking Schema

| Category | Event | Properties |
|----------|-------|------------|
| Search | `search_performed` | query, result_count, filters_applied, response_time |
| Search | `search_zero_result` | query, filters |
| Search | `search_filter_applied` | filter_type, filter_value |
| Asset | `asset_viewed` | asset_id, contributor_id, category, source (search/recommendation) |
| Asset | `asset_download` | asset_id, license_type, resolution, price, purchase_method |
| Checkout | `checkout_started` | cart_value, items_count |
| Checkout | `checkout_completed` | total_amount, currency, payment_method, duration_seconds |
| Checkout | `checkout_abandoned` | step, cart_value, reason (if exit intent) |
| Contributor | `upload_started` | file_count, total_size |
| Contributor | `upload_completed` | file_count, duration_seconds |
| Contributor | `upload_failed` | error_type, file_count |
| Boards | `board_created` | board_type, collaborator_count |
| Boards | `asset_added_to_board` | board_id, asset_id |
| Onboarding | `onboarding_interest_selected` | interests_selected |
| Onboarding | `onboarding_tour_completed` | tour_step |
| PWA | `pwa_install_prompted` | - |
| PWA | `pwa_install_accepted` | - |
| Performance | `lcp_measured` | lcp_value, page_url, device_type |
| Performance | `cls_measured` | cls_value, page_url |

---

## 16. Security & Privacy

### 16.1 Security Headers

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.234photos.com; font-src 'self'; connect-src 'self' https://api.posthog.com https://*.stripe.com; frame-src https://js.stripe.com https://hooks.stripe.com;",
  },
];
```

### 16.2 Authentication State

```typescript
// JWT stored in httpOnly cookie (not accessible via JavaScript)
// Refresh token rotation on every request

// Session timeout
- Idle timeout: 30 minutes
- Warning modal at 25 minutes
- Auto-logout at 30 minutes

// Session persistence
- "Remember me": 30 days
- Default: session cookie (expires on browser close)
```

### 16.3 CSRF Protection

```typescript
// All mutating API requests require CSRF token
// Token generated server-side, set in cookie
// Frontend reads token from meta tag

<meta name="csrf-token" content="{{ csrf_token }}" />

// Include in requests
fetch('/api/upload', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
  },
});
```

---

## 17. Error Handling & Resilience

### 17.1 Error Boundary

```tsx
// components/shared/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to Sentry
    Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 17.2 API Error Handling

```typescript
// lib/api/useMutation.ts
export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await mutationFn(variables);
        return result;
      } catch (err) {
        const message = getErrorMessage(err);
        setError(new Error(message));
        
        // Show toast notification
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        });
        
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn]
  );

  return { mutate, isLoading, error };
}
```

### 17.3 Offline Queue

```typescript
// stores/uploadStore.ts
import { persist } from 'zustand/middleware';

export const useUploadStore = create<UploadState>()(
  persist(
    (set, get) => ({
      files: [],
      status: 'idle',
      
      addFiles: (files) => {
        set((state) => ({
          files: [...state.files, ...files.map(f => ({
            id: uuid(),
            file: f,
            status: 'queued',
            progress: 0,
          }))],
        }));
        
        // Attempt upload if online
        if (navigator.onLine) {
          get().startUpload();
        }
      },
      
      startUpload: async () => {
        set({ status: 'uploading' });
        
        const { files } = get();
        for (const file of files) {
          if (file.status === 'queued') {
            try {
              await uploadFile(file);
              set((state) => ({
                files: state.files.map(f =>
                  f.id === file.id ? { ...f, status: 'complete' } : f
                ),
              }));
            } catch (error) {
              set((state) => ({
                files: state.files.map(f =>
                  f.id === file.id ? { ...f, status: 'failed', error } : f
                ),
              }));
            }
          }
        }
        
        set({ status: 'complete' });
      },
    }),
    {
      name: 'upload-queue',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Listen for online events
window.addEventListener('online', () => {
  const store = useUploadStore.getState();
  if (store.files.some(f => f.status === 'queued' || f.status === 'failed')) {
    store.startUpload();
  }
});
```

---

## 18. Localization & Internationalization

### 18.1 Supported Languages

| Language | Locale | RTL | Launch Phase |
|----------|--------|-----|--------------|
| English | en | No | Phase 1 |
| French | fr | No | Phase 2 |
| Arabic | ar | Yes | Phase 2 |
| Swahili | sw | No | Phase 3 |
| Hausa | ha | No | Phase 3 |
| Yoruba | yo | No | Phase 3 |
| Igbo | ig | No | Phase 3 |
| Portuguese | pt | No | Phase 3 |

### 18.2 Implementation (next-intl)

```typescript
// app/[locale]/layout.tsx
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = await getMessages(locale);
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// components/shared/LanguageSwitcher.tsx
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const switchLanguage = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <Select value={locale} onValueChange={switchLanguage}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
        <SelectItem value="ar">العربية</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### 18.3 Currency & Number Formatting

```typescript
// lib/i18n/format.ts
export const formatCurrency = (amount: number, currency: string, locale: string) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (number: number, locale: string) => {
  return new Intl.NumberFormat(locale).format(number);
};

export const formatDate = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};
```

---

## 19. Enterprise Features

### 19.1 Team Management UI

```tsx
// app/(enterprise)/team/page.tsx
export default function TeamManagement() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h1>Team Management</h1>
        <Button>Invite Member</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>Team Quota</CardHeader>
          <CardContent>
            <Progress value={65} />
            <p>650/1000 downloads used this month</p>
            <Button variant="outline">Purchase Additional Credits</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>Team Members</CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map(member => (
                <div key={member.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                  <Badge>{member.downloads} downloads</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>Billing</CardHeader>
          <CardContent>
            <p>Next invoice: June 30, 2024</p>
            <p>Plan: Enterprise Pro</p>
            <p>$500/month</p>
            <Button variant="outline">Manage Billing</Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>Usage Report</CardHeader>
        <CardContent>
          <DataTable columns={usageColumns} data={usageData} />
          <Button variant="outline" className="mt-4">
            Download CSV
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### 19.2 SSO Integration

```typescript
// lib/auth/sso.ts
export const initiateSSOLogin = (provider: 'okta' | 'auth0' | 'azure') => {
  window.location.href = `/api/auth/sso/${provider}?returnTo=${window.location.pathname}`;
};

// SSO error handling
const SSOErrorPage = ({ error }: { error: string }) => {
  switch (error) {
    case 'assertion_failed':
      return (
        <div className="text-center">
          <h2>Authentication Failed</h2>
          <p>The identity provider couldn't verify your account.</p>
          <Button onClick={() => initiateSSOLogin('okta')}>Try Again</Button>
          <Button variant="ghost">Contact IT Support</Button>
        </div>
      );
    case 'jit_conflict':
      return (
        <div className="text-center">
          <h2>Account Already Exists</h2>
          <p>This email is associated with an existing account.</p>
          <Button>Login with Email Instead</Button>
        </div>
      );
    default:
      return <div>An error occurred. Please contact support.</div>;
  }
};
```

---

## 20. Admin Interfaces

### 20.1 Moderation Queue

```tsx
// app/admin/moderation/page.tsx
export default function ModerationQueue() {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1>Moderation Queue</h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => handleBulkApprove(selectedAssets)}
            disabled={selectedAssets.length === 0}
          >
            Approve ({selectedAssets.length})
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleBulkReject(selectedAssets)}
            disabled={selectedAssets.length === 0}
          >
            Reject
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Media Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Media</SelectItem>
            <SelectItem value="photo">Photos</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="vector">Vectors</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={aiFilter} onValueChange={setAiFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="AI Content" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="ai">AI Generated</SelectItem>
            <SelectItem value="human">Human Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map(asset => (
          <ModerationCard
            key={asset.id}
            asset={asset}
            selected={selectedAssets.includes(asset.id)}
            onSelect={() => toggleSelect(asset.id)}
            onApprove={() => handleApprove(asset.id)}
            onReject={() => handleReject(asset.id)}
            onFlag={() => handleFlag(asset.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ModerationCard component
function ModerationCard({ asset, onApprove, onReject }: ModerationCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="relative">
          <img src={asset.thumbnail} alt="" className="w-full h-48 object-cover rounded" />
          {asset.aiConfidence > 0.8 && (
            <Badge variant="warning" className="absolute top-2 left-2">
              AI: {Math.round(asset.aiConfidence * 100)}%
            </Badge>
          )}
        </div>
        
        <div className="mt-4 space-y-2">
          <p className="font-medium">{asset.title}</p>
          <p className="text-sm text-gray-500">Contributor: {asset.contributor.name}</p>
          <p className="text-sm">Tags: {asset.tags.slice(0, 5).join(', ')}</p>
          
          <div className="flex gap-2 mt-4">
            <Button size="sm" onClick={onApprove}>Approve</Button>
            <Button size="sm" variant="destructive" onClick={onReject}>Reject</Button>
            <Button size="sm" variant="outline">Edit</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

### 20.2 Liquidity Dashboard

```tsx
// app/admin/liquidity/page.tsx
export default function LiquidityDashboard() {
  return (
    <div className="space-y-8">
      <h1>Marketplace Liquidity Engine</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>Content Coverage</CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Overall Coverage</span>
                  <span className="font-medium">65%</span>
                </div>
                <Progress value={65} />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Business Category</span>
                  <span>82%</span>
                </div>
                <Progress value={82} />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Culture Category</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="bg-yellow-200" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>Content Gaps</CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contentGaps.map(gap => (
                <div key={gap.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{gap.topic}</p>
                    <p className="text-sm text-gray-500">{gap.searchCount} searches</p>
                  </div>
                  <Button size="sm" onClick={() => createCampaign(gap)}>
                    Create Campaign
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>Active Campaigns</CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{campaign.topic}</h3>
                    <p className="text-sm">1.5x Royalty Bonus</p>
                  </div>
                  <Badge>{campaign.submissions} submissions</Badge>
                </div>
                <Progress value={campaign.progress} className="mt-2" />
                <p className="text-sm text-gray-500 mt-2">
                  Target: {campaign.target} assets
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 21. Milestones & Timeline

### Phase 1: Foundation & Core Search (Weeks 1-3)

| Week | Deliverables |
|------|--------------|
| 1 | Project setup, Tailwind config, shadcn/ui integration, design tokens, folder structure |
| 2 | Homepage, hero search bar, auth flows (email/password, OAuth), PWA manifest |
| 3 | Search results page, masonry grid, filter sidebar, asset detail page, basic SEO |

**Success Criteria:**
- Homepage loads with LCP <2.5s
- Search returns results in <500ms
- User can login/register
- PWA installable on mobile devices

### Phase 2: E-commerce & Contributor Onboarding (Weeks 4-6)

| Week | Deliverables |
|------|--------------|
| 4 | Checkout flow (Stripe, Flutterwave), download modal, license selector, credits system |
| 5 | Upload wizard (drag-drop, tus.io), contributor dashboard, earnings display |
| 6 | Buyer onboarding tour, interest selector, free credits banner, notification system (SSE) |

**Success Criteria:**
- User completes purchase in <3 clicks
- Contributor uploads 100 files successfully
- Notification delivery <2 seconds

### Phase 3: Collaboration & Engagement (Weeks 7-9)

| Week | Deliverables |
|------|--------------|
| 7 | Boards (create, share, collaborate), approval workflow, comment threads |
| 8 | Contributor leaderboard, gamification badges, campaign UI, seasonal themes |
| 9 | Visual search, similar assets, recommendation engine, zero-result CTA |

**Success Criteria:**
- >40% contributor DAU/MAU
- Board sharing and collaboration works in real-time
- Visual search returns results in <2 seconds

### Phase 4: Enterprise & Polish (Weeks 10-12)

| Week | Deliverables |
|------|--------------|
| 10 | Team management UI, SSO integration, pooled quotas, usage reports |
| 11 | Admin moderation queue, liquidity dashboard, bulk operations, keyboard shortcuts |
| 12 | Accessibility audit, performance optimization, full E2E testing, production deployment |

**Success Criteria:**
- WCAG 2.1 AA compliance (zero critical violations)
- Lighthouse score ≥90 on all pages
- Playwright E2E pass rate >99%

---

## 22. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Slow network speeds in target markets | High | High | PWA offline support, aggressive image optimization, CDN with edge nodes in Africa |
| Browser compatibility issues | Medium | Medium | Feature detection, polyfills, testing on real devices via BrowserStack |
| High bounce rate on first load | Medium | High | Optimize LCP, implement skeleton loading, progressive enhancement |
| Accessibility non-compliance | Medium | High | axe-core in CI, manual audits, accessibility training for developers |
| Upload failures on poor connections | High | Medium | Resumable uploads (tus.io), offline queue, retry logic |
| Real-time sync conflicts | Medium | Medium | CRDTs or last-write-wins with conflict resolution UI |
| Third-party API rate limits | Low | Medium | Implement caching, request queuing, graceful degradation |
| Security vulnerabilities | Low | High | Regular security audits, dependency updates, CSP headers |
| Internationalization bugs | Medium | Low | RTL testing, locale-specific formatting, translation validation |

---

## 23. Appendices

### Appendix A: Browser Support Matrix

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 90+ | Primary development target |
| Firefox | 88+ | Full support |
| Safari | 14+ | iOS support critical |
| Edge | 90+ | Chromium-based |
| Opera | 76+ | Full support |
| Samsung Internet | 15+ | Critical for African markets |

### Appendix B: Device Testing Matrix

| Device | OS | Screen Size | Priority |
|--------|-----|-------------|----------|
| iPhone 13 | iOS 15 | 390x844 | P0 |
| Samsung Galaxy S21 | Android 12 | 360x800 | P0 |
| Tecno Spark 8 | Android 11 | 720x1600 | P1 (Africa-focused) |
| Infinix Note 11 | Android 11 | 1080x2460 | P1 |
| iPad Pro | iPadOS 15 | 1024x1366 | P1 |
| Desktop (1920x1080) | Windows 10 | 1920x1080 | P0 |

### Appendix C: API Endpoints Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/search` | GET | Search assets |
| `/api/assets/{id}` | GET | Get asset details |
| `/api/assets/{id}/download` | POST | Download asset |
| `/api/upload` | POST | Upload asset (tus.io) |
| `/api/contributor/earnings` | GET | Get earnings |
| `/api/boards` | CRUD | Board operations |
| `/api/notifications` | GET | Get notifications |
| `/api/notifications/sse` | GET | SSE connection |

### Appendix D: Glossary

| Term | Definition |
|------|------------|
| CLIP | Contrastive Language-Image Pre-training (AI model for visual search) |
| LCP | Largest Contentful Paint (Core Web Vital) |
| PWA | Progressive Web App |
| SSE | Server-Sent Events (for real-time updates) |
| tus.io | Resumable file upload protocol |
| BlurHash | Compact representation of image placeholder |
| ISR | Incremental Static Regeneration (Next.js) |
| SSO | Single Sign-On |
| WCAG | Web Content Accessibility Guidelines |

---

## Document Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2024-01-15 | Initial complete document | Frontend Engineering Team |
| 1.1 | 2024-01-20 | Added visual search spec, board collaboration details | Frontend Engineering Team |
| 1.2 | 2024-01-25 | Enhanced error handling, offline queue, analytics schema | Frontend Engineering Team |
| 1.3 | 2024-02-01 | Added enterprise features, admin interfaces | Frontend Engineering Team |

---

**This document constitutes the complete frontend engineering specification for 234photos. All development work must adhere to the requirements, patterns, and standards defined herein. Questions or deviations should be raised with the technical lead for review.**