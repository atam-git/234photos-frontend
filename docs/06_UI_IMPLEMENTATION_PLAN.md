# 234photos — UI Build Plan

Design system: see `DESIGN_SYSTEM.md`
PRD reference: see `234photos _ Frontend Engineering PRD.md`

---

## Build Order

Pages are ordered by user impact and dependency. Each page lists its components, which ones are new vs reused.

---

## Page 1 — Search Results `/search`

**Why first:** Highest-traffic page after homepage. No auth dependency. Reuses Header + Footer.

### Components

| Component | Location | Status |
|-----------|----------|--------|
| `Header` | `shared/Header` | ✅ exists |
| `SearchBar` (sticky, standalone) | `shared/SearchBar` | 🆕 extract from Hero |
| `FilterSidebar` | `features/search/FilterSidebar` | 🆕 |
| `ActiveFilterChips` | `features/search/ActiveFilterChips` | 🆕 |
| `SortDropdown` | `features/search/SortDropdown` | 🆕 |
| `AssetCard` | `features/search/AssetCard` | 🆕 |
| `MasonryGrid` | `features/search/MasonryGrid` | 🆕 |
| `ZeroResultState` | `features/search/ZeroResultState` | 🆕 |
| `SearchSkeleton` | `features/search/SearchSkeleton` | 🆕 |
| `Footer` | `shared/Footer` | ✅ exists |

### Layout
```
[Header — sticky]
[SearchBar — sticky below header]
[ActiveFilterChips + SortDropdown row]
─────────────────────────────────────
[FilterSidebar] | [MasonryGrid]
  (desktop left)   (3 col desktop,
                    2 col tablet,
                    1 col mobile)
                  [SearchSkeleton / ZeroResultState]
[Footer]
```

### FilterSidebar panels
- Media Type (Photos / Videos / Vectors / Illustrations)
- Orientation (Horizontal / Vertical / Square)
- License (Standard / Enhanced / Editorial)
- Price (Free / Paid / Subscription)
- Date Added (Last 24h / Week / Month / Year)
- AI Content (All / Human only / AI only)

### AssetCard
- Watermarked image thumbnail
- Hover: dark overlay + contributor name + resolution badge
- Hover actions: Save to board icon, Download icon
- AI Generated badge (conditional)
- Editorial badge (conditional)

---

## Page 2 — Asset Detail `/asset/[id]`

**Why second:** Directly linked from search. No auth for viewing (auth only for download).

### Components

| Component | Location | Status |
|-----------|----------|--------|
| `Header` | `shared/Header` | ✅ exists |
| `Breadcrumb` | `shared/Breadcrumb` | 🆕 |
| `AssetPreview` | `features/asset/AssetPreview` | 🆕 |
| `LicenseSelector` | `features/asset/LicenseSelector` | 🆕 |
| `DownloadButton` | `features/asset/DownloadButton` | 🆕 |
| `AssetMetadata` | `features/asset/AssetMetadata` | 🆕 |
| `ContributorCard` | `features/asset/ContributorCard` | 🆕 |
| `AssetBadges` | `features/asset/AssetBadges` | 🆕 |
| `SimilarAssets` | `features/asset/SimilarAssets` | 🆕 (reuses AssetCard) |
| `MoreFromContributor` | `features/asset/MoreFromContributor` | 🆕 (reuses AssetCard) |
| `DownloadModal` | `features/checkout/DownloadModal` | 🆕 |
| `Footer` | `shared/Footer` | ✅ exists |

### Layout
```
[Header]
[Breadcrumb]
──────────────────────────────────────────
[AssetPreview (left, 60%)] | [Right panel (40%)]
  - Watermarked image        - Title + Tags
  - Zoom controls            - LicenseSelector
                             - DownloadButton
                             - ContributorCard
                             - AssetMetadata
                             - AssetBadges
──────────────────────────────────────────
[SimilarAssets — horizontal scroll]
[MoreFromContributor — horizontal scroll]
[Footer]
```

---

## Page 3 — Auth Modals (Login / Signup)

**Why third:** Needed before any authenticated page. Modal-based, not a full page.

### Components

| Component | Location | Status |
|-----------|----------|--------|
| `AuthModal` | `shared/Modals/AuthModal` | 🆕 |
| `LoginForm` | `features/auth/LoginForm` | 🆕 |
| `SignupForm` | `features/auth/SignupForm` | 🆕 |
| `SocialAuthButtons` | `features/auth/SocialAuthButtons` | 🆕 |

### Layout (modal overlay)
```
[Backdrop blur overlay]
[Modal card — rounded-2xl bg-white p-8 max-w-[440px]]
  - Logo
  - Heading: "Welcome back" / "Create your account"
  - SocialAuthButtons (Google, Apple)
  - Divider "or"
  - LoginForm / SignupForm
  - Switch: "Don't have an account? Sign up"
```

---

## Page 4 — Contributor Dashboard `/dashboard`

**Why fourth:** High PRD priority. Auth-gated. Real-time feel even with static data.

### Components

| Component | Location | Status |
|-----------|----------|--------|
| `DashboardLayout` | `layouts/DashboardLayout` | 🆕 |
| `DashboardSidebar` | `layouts/DashboardSidebar` | 🆕 |
| `StatsCards` | `features/dashboard/StatsCards` | 🆕 |
| `EarningsChart` | `features/dashboard/EarningsChart` | 🆕 |
| `TopAssets` | `features/dashboard/TopAssets` | 🆕 |
| `ActivityFeed` | `features/dashboard/ActivityFeed` | 🆕 |
| `GamificationBadges` | `features/dashboard/GamificationBadges` | 🆕 |
| `PendingUploads` | `features/dashboard/PendingUploads` | 🆕 |
| `LeaderboardPreview` | `features/dashboard/LeaderboardPreview` | 🆕 |

### Layout
```
[DashboardSidebar (left, fixed)] | [Main content]
                                    - Welcome bar + Upload CTA
                                    - StatsCards (Earnings / Downloads / Views)
                                    - LeaderboardPreview
                                    - ActivityFeed
                                    - TopAssets grid
                                    - GamificationBadges
                                    - PendingUploads
```

---

## Page 5 — Upload Wizard `/upload`

**Why fifth:** Core contributor flow. Multi-step, no complex API needed for UI.

### Components

| Component | Location | Status |
|-----------|----------|--------|
| `UploadDropzone` | `features/upload/UploadDropzone` | 🆕 |
| `UploadProgressList` | `features/upload/UploadProgressList` | 🆕 |
| `TagEditor` | `features/upload/TagEditor` | 🆕 |
| `BulkMetadataForm` | `features/upload/BulkMetadataForm` | 🆕 |
| `UploadStepIndicator` | `features/upload/UploadStepIndicator` | 🆕 |
| `UploadSuccessState` | `features/upload/UploadSuccessState` | 🆕 |

### Steps
```
Step 1: Dropzone (drag & drop, file picker)
Step 2: Upload progress list (per-file status)
Step 3: AI tag suggestions + custom tags per file
Step 4: Bulk metadata (title prefix, description, category)
Step 5: Success confirmation
```

---

## Shared Components to Build (used across pages)

| Component | Used by |
|-----------|---------|
| `SearchBar` (standalone) | Search page, Header (future) |
| `Breadcrumb` | Asset detail, Dashboard |
| `NotificationBell` | Header (authenticated state) |
| `UserAvatar` | Header, ContributorCard, ActivityFeed |
| `DownloadModal` | Asset detail |
| `Toast` | Global |
| `Skeleton` | Search, Dashboard |

---

## What we are NOT building yet

- Boards & collaboration
- Enterprise team management
- Admin moderation queue
- Checkout / payment flow (Stripe/Flutterwave)
- PWA / service worker
- i18n
- Real API integration (all pages use static/mock data for now)
