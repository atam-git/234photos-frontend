# 234photos — Frontend Engineering PRD

**Version 2.2 - Production Implementation**  
**Last Updated:** April 23, 2026  
**Status:** Production Ready - All Features Implemented

---

## Executive Summary

234photos is Africa's premier stock media marketplace connecting African creators with global buyers. This document outlines the complete frontend implementation built with Next.js 15, TypeScript, and Tailwind CSS.

### Technology Stack

- **Framework:** Next.js 15.1.0 (App Router)
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS + Custom CSS
- **State Management:** Zustand
- **Icons:** Lucide React
- **Font:** Plus Jakarta Sans (Google Fonts)
- **Deployment:** Vercel-ready

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [User Roles & Authentication](#user-roles--authentication)
3. [Marketing Pages](#marketing-pages)
4. [Browse Experience](#browse-experience)
5. [Contributor Experience](#contributor-experience)
6. [Dashboard Features](#dashboard-features)
7. [Design System](#design-system)
8. [Component Library](#component-library)
9. [State Management](#state-management)
10. [Mock Data](#mock-data)
11. [Future Enhancements](#future-enhancements)

---

## Architecture Overview

### Folder Structure

```
src/
├── app/
│   ├── (marketing)/          # Public marketing pages
│   │   ├── page.tsx          # Homepage
│   │   ├── about/
│   │   ├── collections/
│   │   ├── editorial/
│   │   ├── pricing/
│   │   ├── contact/
│   │   ├── contribute/
│   │   ├── how-it-works/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── terms/
│   │   ├── privacy/
│   │   ├── cookies/
│   │   └── licence/
│   ├── (browse)/            # Public browsing routes (no auth)
│   │   ├── search/
│   │   ├── assets/[id]/
│   │   └── profile/[username]/
│   ├── (dashboard)/          # Authenticated dashboard routes
│   │   ├── home/             # Redirect page
│   │   ├── discover/         # Feed page
│   │   ├── dashboard/        # Contributor dashboard
│   │   ├── my-assets/        # Asset management
│   │   │   ├── upload/
│   │   │   └── collections/[id]/
│   │   ├── boards/           # Boards (saved assets)
│   │   │   └── [id]/
│   │   ├── downloads/        # Download history
│   │   ├── liked/            # Liked assets
│   │   ├── earnings/         # Contributor earnings
│   │   ├── account/          # Account settings
│   │   ├── billing/          # Billing & credits
│   │   ├── notifications/    # Notifications center
│   │   ├── support/          # Help & support
│   │   └── layout.tsx        # Dashboard layout with sidebar
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── features/             # Feature-specific components
│   │   ├── asset/
│   │   ├── dashboard/
│   │   └── search/
│   └── shared/               # Shared components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── Hero.tsx
│       ├── CategoryGrid.tsx
│       ├── Collections.tsx
│       ├── TrendingContent.tsx
│       ├── BlogSection.tsx
│       ├── ContributorSection.tsx
│       └── Modals/
├── lib/
│   └── mock/                 # Mock data
│       ├── searchAssets.ts
│       └── contributors.ts
├── stores/
│   └── authStore.ts          # Zustand auth store
└── public/
    ├── logo/                 # Brand assets
    └── hero-background.svg
```

### Rendering Strategy

| Route Type | Strategy | Reason |
|------------|----------|--------|
| Marketing pages | Static | SEO optimization, fast loading |
| Browse pages (search, assets, profiles) | SSR | SEO critical, public content |
| Dashboard | CSR | Authenticated, interactive |

---

## User Roles & Authentication

### User Types

1. **Customer** (Default)
   - Browse and search assets
   - Download with credits
   - Create boards
   - Like and save assets
   - View download history

2. **Contributor** (Approved)
   - All customer features
   - Upload assets
   - View earnings dashboard
   - Manage collections
   - Track asset performance

### Authentication Flow

**Mock Authentication System:**
- Two test users: `customer@example.com` and `contributor@example.com`
- Password: `password123` (pre-filled for testing)
- Zustand store persists auth state to localStorage
- Protected routes redirect to login if not authenticated

**Login Page** (`/login`)
- Email/password form
- Social login buttons (Google, Facebook)
- Intent parameter support: `/login?intent=contributor`
- Background image with dark blur overlay
- Responsive design (560px max width)

**Signup Page** (`/signup`)
- Two-step process:
  1. Account creation (name, username, email, password)
  2. Contributor application (bio, specialties, social links)
- Username field added to signup form
- Intent parameter: `/signup?intent=contributor`
- Social signup options (Google, Facebook)
- Background image with dark blur overlay
- Responsive design

**Contributor Application:**
- Available from `/contribute` page or account settings
- Modal-based application form
- Fields: Bio, specialties (multi-select), Instagram, portfolio URL
- Auto-approval for demo purposes

---

## Marketing Pages

### Homepage (`/`)

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

### About Page (`/about`)
- Mission statement
- Team section
- Values and culture
- Statistics

### Collections (`/collections`)
- Grid of curated collections
- Each collection shows 2x2 photo collage
- Collection detail page with full asset grid

### Editorial (`/editorial`)
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

### Pricing (`/pricing`)
- Credit packages
- Subscription plans
- Feature comparison
- FAQ section

### Contribute (`/contribute`)
- Benefits of becoming a contributor
- Earnings potential
- Upload process overview
- CTA to apply
- Protected: Opens contributor modal if logged in as customer

### How It Works (`/how-it-works`)
- Step-by-step guide for buyers
- Step-by-step guide for contributors
- FAQ section

### Contact (`/contact`)
- Contact form
- Support email
- Social media links

### Legal Pages
- Terms of Service (`/terms`)
- Privacy Policy (`/privacy`)
- Cookie Policy (`/cookies`)
- License Information (`/licence`)

---

## Browse Experience

Public pages accessible without authentication.

### Search Page (`/search`)

**Features:**
- Real-time search with query parameter
- Filter sidebar (desktop) / bottom sheet (mobile)
- Masonry grid layout (responsive columns)
- Asset cards with hover effects
- Infinite scroll
- Sort options
- Active filter chips

**Filters:**
- Media type (Photos, Videos, Vectors)
- Orientation (Landscape, Portrait, Square)
- License type
- Color
- Price range
- Contributors
- Date added
- Resolution

**Asset Card:**
- Thumbnail with aspect ratio preservation
- Hover overlay with actions:
  - Download button
  - Add to board
  - Like button
  - Contributor avatar (clickable)
- Asset metadata (resolution, type)
- Free/AI/Editorial badges

### Asset Detail Page (`/assets/[id]`)

**Layout:**
- Large preview image (watermarked)
- Asset information sidebar:
  - Title and description
  - Tags (clickable for search)
  - Color palette (5 swatches with hex codes, clickable for color search)
  - License selector (Standard/Enhanced/Editorial with prices)
  - Download button
  - Add to board button
  - Contributor card with follow button
  - Metadata section:
    - Dimensions
    - File size
    - File type
    - Resolution
    - Aspect ratio (e.g., "1.5:1")
    - Duration and FPS (for videos)
    - Upload date
  - Badges:
    - AI-generated (if applicable)
    - Editorial use only (if applicable)
    - Free (if applicable)
    - Model release (green badge)
    - Property release (blue badge)
- Similar assets section
- More from contributor section

**Download Modal:**
- License selection (Standard, Enhanced, Editorial)
- Format selection (JPG, PNG, WebP)
- Size selection (Small, Medium, Original)
- Credit cost display
- Download button

### Boards (`/boards`)

Authenticated feature for saving and organizing assets.

**Features:**
- Create new boards button
- Board cards with 2x2 photo collage
- Board types: Private, Shared, Team (with icons)
- Board description display
- More menu (Edit, Share, Manage Collaborators, Delete)
- Empty state with CTA

**Board Detail** (`/boards/[id]`)
- Board header with name and description
- Action buttons:
  - Share modal with link copying and email invite
  - Manage collaborators modal
  - Edit board modal
- Asset grid with selection mode
- Remove assets functionality
- Preview modal for quick view

**Share Board Modal:**
- Share link display
- Copy link button with success state
- Email invite option
- Social sharing buttons (future)

**Manage Collaborators Modal:**
- Invite form with email input and role selection (Editor/Viewer)
- Collaborator list showing:
  - Avatar and name
  - Email address
  - Role dropdown (Admin/Editor/Viewer)
  - Remove button (except for admins)
- Role descriptions:
  - Admin: Full access, can manage collaborators
  - Editor: Can add and remove assets
  - Viewer: Can only view assets
- Uses centralized BoardCollaborator type with nested user object

### Downloads (`/downloads`)

Authenticated feature showing download history.

**Features:**
- Download history with search
- Filter by license type (All/Standard/Enhanced)
- Asset cards showing:
  - Thumbnail
  - Title and contributor
  - License type badge
  - Download date
  - Expiration date (if applicable)
  - License certificate URL
- Re-download button
- Asset preview modal
- Empty state with CTA

### Liked Assets (`/liked`)

Authenticated feature for managing liked assets.

**Features:**
- Grid of liked assets
- Unlike functionality
- Preview modal
- Search functionality
- Empty state

---

## Contributor Experience

### Contributor Dashboard (`/dashboard`)

**Application Status Banners:**
- **Pending Application:**
  - Yellow banner with timeline
  - Application steps: Submitted → Under Review → Decision
  - Current step highlighted
  - Estimated review time (2-3 business days)
  
- **Rejected Application:**
  - Red banner with rejection reason
  - Guidance on how to improve
  - Reapply button
  - Support contact link

**Stats Cards:**
- Total earnings (with trend percentage)
- Total downloads (with trend)
- Total views (with trend)
- Leaderboard rank (with position change)

**Sections:**
1. **Quick Actions** - Upload, View Portfolio, Analytics
2. **Top Performing Assets** - Grid with earnings and download stats
3. **Recent Activity** - Timeline of downloads, likes, comments
4. **Earnings Chart** - Monthly earnings visualization
5. **Achievement Badges** - Gamification elements

### Upload Page (`/my-assets/upload`)

**Features:**
- Drag and drop file upload
- Multiple file support (up to 100 files, max 4GB each)
- Upload progress tracking with status indicators
- Per-file metadata using centralized UploadFile type:
  - Title (auto-generated from filename, editable)
  - Description (textarea)
  - Category dropdown (10 categories)
  - Model release toggle (Yes/No)
  - Tags (add/remove chips)
  - AI-generated checkbox
  - Editorial use checkbox
- Auto-detected metadata (read-only):
  - Dimensions (width × height in pixels)
  - File size (in MB)
  - File type (from MIME type)
- File list sidebar with thumbnails
- Active file highlighting
- "Apply to all files" functionality (copies metadata except title)
- Upload status tracking (uploading → complete)
- Success screen with asset count
- Uses centralized UploadFile type with proper field names:
  - fileName (not name)
  - preview (not src)
  - fileSize as number (not string)
  - mimeType (not fileType)
  - dimensions as object (not string)
  - modelRelease and propertyRelease booleans

### My Assets (`/my-assets`)

**Tabs:**
1. **All Assets** - Table view with:
   - Thumbnail
   - Title
   - Status badges:
     - Live (green)
     - Pending review (yellow)
     - Rejected (red with rejection reason alert)
   - Views, Downloads, Earnings
   - Upload date
   - Actions menu
   - Clickable rows showing AssetStatsModal
   - Rejection reason display (red alert box below rejected assets)

2. **Collections** - Grid of collections with:
   - 2x2 photo collage
   - Collection name, description, and asset count
   - Visibility toggle (Public/Private)
   - Create new collection button

**Asset Stats Modal:**
- Large asset preview
- Status badge
- Total earnings (gradient display)
- Performance metrics:
  - Downloads
  - Views
  - Likes
- Performance insights:
  - Conversion rate
  - Avg earnings per download
  - Engagement rate
- Link to public asset page

**Collection Detail** (`/my-assets/collections/[id]`)
- Collection header with edit/delete options
- Toggle visibility (Public/Private)
- Asset grid with selection mode
- Remove assets functionality
- Preview modal
- Edit collection modal (name, description, visibility)
- Clickable assets showing stats

### Earnings Page (`/earnings`)

**Features:**
- Balance cards:
  - Available balance (ready to withdraw) with green badge
  - Pending balance (30-day hold) with yellow badge
- Summary cards:
  - This month earnings with trend
  - Total earned (all time)
  - Total downloads with trend
- Earnings chart (6-month bar chart)
- Withdraw button (opens modal)
- Withdrawal history section:
  - Past withdrawal requests
  - Amount, date, method (Bank/PayPal/Mobile Money)
  - Status badges (completed/processing/pending/failed)
  - Processing dates for completed withdrawals
  - Failure reasons for failed withdrawals
- Transaction history:
  - Clickable transactions showing asset stats modal
  - Date, asset thumbnail, license type
  - Amount with green color
  - Status indicators (pending/available/paid)
  - Available date for pending earnings
  - Paid date for completed earnings
  - Filter and search

**Withdraw Modal:**
- Method selection (Bank Transfer, PayPal, Mobile Money)
- Amount input with MAX button
- Minimum withdrawal: ₦80,000
- Processing time info (3-5 business days)
- Confirm button

---

## Dashboard Features

### Discover Feed (`/discover`)

**Features:**
- Filter tabs: Latest, Popular, Featured, For You
- Category filter chips
- Feed of recent uploads from followed contributors
- Asset grid with contributor info
- Load more functionality
- Search bar
- Empty state for new users

### Account Settings (`/account`)

**Sections:**
1. **Profile Information**
   - Avatar upload
   - Name, username (read-only), email
   - Bio, location
   - Website, Instagram, Twitter, Facebook
   - Country selection

2. **Customer Information** (if customer role)
   - Subscription plan display
   - Subscription status
   - Total downloads count
   - Total spent amount

3. **Contributor Settings** (if contributor)
   - Application status display with timeline
   - Rejection reason (if rejected) with guidance
   - Portfolio URL
   - Specialties (multi-select)
   - Payout method selection (Bank/PayPal/Mobile Money)
   - Available balance display
   - Pending balance display

4. **Password & Security**
   - Change password form
   - Two-factor authentication toggle
   - Active sessions list

5. **Preferences**
   - Email notifications toggle
   - Language selection
   - Timezone selection

### Billing & Credits (`/billing`)

**Tabs:**
1. **Credits**
   - Current balance
   - Credit packages (10, 25, 50, 100, 250 credits)
   - Purchase with credit card
   - Credit history

2. **Transaction History**
   - Date, description, amount, status
   - Filter by type
   - Export functionality

3. **Subscription** (Future)
   - Current plan
   - Upgrade options
   - Billing cycle
   - Payment method

### Notifications (`/notifications`)

**Features:**
- Notification list with icons and emojis
- Mark as read/unread
- Mark all as read button
- Preferences button (links to preferences page)
- Notification types:
  - Downloads (green icon)
  - Uploads (blue icon)
  - Credits (purple emoji)
  - Board shares (orange icon)
  - System messages (emoji)
- Unread indicator (red dot)
- Click to navigate to related page
- Empty state with checkmark icon

**Notification Preferences** (`/notifications/preferences`)
- Back to notifications link
- Comprehensive table with:
  - Notification types (Downloads, Likes, Comments, Follows, Earnings, System)
  - Email channel toggle
  - Push notification toggle
  - In-app notification toggle
- Toggle buttons with checkmarks
- Channel descriptions (Email, Push, In-App)
- Save preferences button with success state

### Support (`/support`)

**Sections:**
1. **FAQ Accordion**
   - Common questions
   - Expandable answers
   - Search functionality

2. **Contact Form**
   - Subject, message
   - File attachment
   - Priority selection
   - Submit ticket

3. **Help Articles**
   - Getting started
   - Upload guidelines
   - Licensing info
   - Payment help

---

## Design System

### Color Palette

```css
/* Primary */
--primary: #EE2B24;        /* Red */
--primary-hover: #d42520;

/* Neutral */
--gray-50: #F8F8F8;
--gray-100: #F5F5F7;
--gray-200: #EBEBEB;
--gray-300: #E0E0E0;
--gray-400: #D0D0D0;
--gray-500: #999;
--gray-600: #888;
--gray-700: #666;
--gray-800: #444;
--gray-900: #111;

/* Semantic */
--success: #22C55E;
--error: #EF4444;
--warning: #F59E0B;
--info: #3B82F6;
```

### Typography

**Font Family:** Plus Jakarta Sans (Google Fonts)

**Scale:**
- Heading 1: 32px / 2rem, Bold
- Heading 2: 24px / 1.5rem, Bold
- Heading 3: 20px / 1.25rem, Semibold
- Body: 14px / 0.875rem, Regular
- Small: 13px / 0.8125rem, Regular
- Tiny: 12px / 0.75rem, Regular
- Button: 14px / 0.875rem, Semibold

### Spacing

8px baseline grid:
- 2px, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

### Border Radius

- Small: 4px
- Medium: 8px
- Large: 12px
- XL: 16px
- Full: 9999px

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
```

---

## Component Library

### Shared Components

**Header** (`components/shared/Header.tsx`)
- Logo
- Navigation menu
- Search bar (on search variant)
- Browse dropdown
- User menu / Auth buttons
- Mobile menu
- Sticky on scroll

**Footer** (`components/shared/Footer.tsx`)
- Logo and tagline
- Link columns (Company, Resources, Legal, Community)
- Social media links
- Newsletter signup
- Copyright

**Hero** (`components/shared/Hero.tsx`)
- Full-width background
- Centered content
- Search bar
- CTA buttons
- Responsive design

**CategoryGrid** (`components/shared/CategoryGrid.tsx`)
- 8 category cards
- Image backgrounds
- Hover effects
- Responsive grid (2/4/4 columns)

**Collections** (`components/shared/Collections.tsx`)
- Collection cards with 2x2 photo collage
- Hover effects
- Responsive grid

**TrendingContent** (`components/shared/TrendingContent.tsx`)
- Horizontal scroll
- Asset cards
- Navigation arrows

**BlogSection** (`components/shared/BlogSection.tsx`)
- Blog post cards
- Featured post
- Read more links

**ContributorSection** (`components/shared/ContributorSection.tsx`)
- Contributor cards
- Avatar, name, stats
- Follow button

**Additional Shared Components:**

**Breadcrumb** (`components/shared/Breadcrumb.tsx`)
- Navigation breadcrumbs
- Clickable path items
- Current page indicator

**PricingSection** (`components/shared/PricingSection.tsx`)
- Pricing cards
- Feature lists
- CTA buttons

**StatsBar** (`components/shared/StatsBar.tsx`)
- Platform statistics
- Animated counters
- Icon display

**CreativeTools** (`components/shared/CreativeTools.tsx`)
- Tool showcase
- Feature highlights
- Integration info

### Feature Components

**AssetCard** (`components/features/search/AssetCard.tsx`)
- Thumbnail
- Hover overlay with actions
- Contributor info
- Badges
- Responsive

**AssetPreview** (`components/features/asset/AssetPreview.tsx`)
- Large image display
- Zoom functionality
- Watermark overlay

**AssetMetadata** (`components/features/asset/AssetMetadata.tsx`)
- Metadata display
- Icons for each field
- Responsive layout

**AssetTags** (`components/features/asset/AssetTags.tsx`)
- Tag chips
- Clickable tags
- Add/remove functionality

**ContributorCard** (`components/features/asset/ContributorCard.tsx`)
- Avatar
- Name and username
- Stats (assets, downloads)
- Follow button
- Link to profile

**LicenseSelector** (`components/features/asset/LicenseSelector.tsx`)
- Radio buttons for license types
- Price display
- Feature comparison

**HorizontalAssetRow** (`components/features/asset/HorizontalAssetRow.tsx`)
- Horizontal scroll
- Asset thumbnails
- Navigation arrows

**DashboardSidebar** (`components/features/dashboard/DashboardSidebar.tsx`)
- Logo
- Navigation links with icons
- Active state
- User profile section
- Credits display
- Logout button
- Mobile drawer

**FilterSidebar** (`components/features/search/FilterSidebar.tsx`)
- Filter groups
- Checkboxes, radio buttons
- Range sliders
- Color picker
- Clear filters button

**FilterBottomSheet** (`components/features/search/FilterBottomSheet.tsx`)
- Mobile filter panel
- Slide up animation
- Apply/Clear buttons

**ActiveFilterChips** (`components/features/search/ActiveFilterChips.tsx`)
- Filter chips
- Remove button
- Clear all button

**Additional Search Components:**

**MasonryGrid** (`components/features/search/MasonryGrid.tsx`)
- Responsive masonry layout
- Asset card grid
- Infinite scroll support

**SearchBar** (`components/features/search/SearchBar.tsx`)
- Search input
- Autocomplete
- Search suggestions

**SearchSkeleton** (`components/features/search/SearchSkeleton.tsx`)
- Loading state
- Skeleton cards
- Shimmer effect

**SortDropdown** (`components/features/search/SortDropdown.tsx`)
- Sort options
- Dropdown menu
- Active sort indicator

**ZeroResultState** (`components/features/search/ZeroResultState.tsx`)
- Empty state message
- Search suggestions
- CTA to browse

### Modal Components

**DownloadModal** (`components/shared/Modals/DownloadModal.tsx`)
- License selection
- Format selection
- Size selection
- Credit cost
- Download button

**SaveToBoardModal** (`components/shared/Modals/SaveToBoardModal.tsx`)
- Board list
- Create new board
- Select board
- Save button

**QuickPreviewModal** (`components/shared/Modals/QuickPreviewModal.tsx`)
- Large image preview
- Asset info
- Download button
- Add to board button
- Close button

**CreateBoardModal** (`components/shared/Modals/CreateBoardModal.tsx`)
- Board name input
- Description textarea
- Visibility toggle
- Create button

**ShareBoardModal** (`components/shared/Modals/ShareBoardModal.tsx`)
- Share link display
- Copy link button with success state
- Email invite option
- Social sharing buttons (future)

**ManageCollaboratorsModal** (`components/shared/Modals/ManageCollaboratorsModal.tsx`)
- Invite form with email input and role selection
- Collaborator list with avatars
- Role dropdown (Admin/Editor/Viewer)
- Remove collaborator button
- Role permission descriptions
- Uses centralized BoardCollaborator type

**AuthModal** (`components/shared/Modals/AuthModal.tsx`)
- Tab switcher (Login/Signup)
- Email and password inputs
- Show/hide password toggle
- Social login buttons (Google, Facebook)
- Remember me checkbox
- Forgot password link
- Switch between login and signup

**ContributorApplicationModal** (`components/shared/Modals/ContributorApplicationModal.tsx`)
- Bio textarea
- Specialties multi-select
- Social links
- Submit button
- Success state

**CreateCollectionModal** (`components/shared/Modals/CreateCollectionModal.tsx`)
- Collection name
- Description
- Visibility toggle
- Create button

**EditCollectionModal** (`components/shared/Modals/EditCollectionModal.tsx`)
- Edit name and description
- Visibility toggle
- Save button

**AssetStatsModal** (`components/shared/Modals/AssetStatsModal.tsx`)
- Asset preview
- Status badge
- Earnings display (gradient)
- Performance metrics
- Insights
- View public page link

**WithdrawEarningsModal** (`components/shared/Modals/WithdrawEarningsModal.tsx`)
- Method selection
- Amount input
- Minimum validation
- Processing info
- Confirm button

**ModalBackdrop** (`components/shared/Modals/ModalBackdrop.tsx`)
- Reusable backdrop
- Click outside to close
- Fade animation

**Additional Modals:**

**AddPaymentMethodModal** (`components/shared/Modals/AddPaymentMethodModal.tsx`)
- Payment method form
- Card details input
- Save button

**BadgeDetailsModal** (`components/shared/Modals/BadgeDetailsModal.tsx`)
- Badge information
- Achievement details
- Earned date

**DeleteAccountModal** (`components/shared/Modals/DeleteAccountModal.tsx`)
- Confirmation dialog
- Warning message
- Delete button

**LeaderboardModal** (`components/shared/Modals/LeaderboardModal.tsx`)
- Full leaderboard view
- Ranking list
- Filter options

**LiveChatModal** (`components/shared/Modals/LiveChatModal.tsx`)
- Live chat interface
- Message history
- Send message

**PurchaseCreditsModal** (`components/shared/Modals/PurchaseCreditsModal.tsx`)
- Credit package selection
- Payment method
- Purchase button

**TransactionDetailsModal** (`components/shared/Modals/TransactionDetailsModal.tsx`)
- Transaction information
- Receipt details
- Download receipt

**UpgradeSubscriptionModal** (`components/shared/Modals/UpgradeSubscriptionModal.tsx`)
- Subscription plans
- Feature comparison
- Upgrade button

**UploadAvatarModal** (`components/shared/Modals/UploadAvatarModal.tsx`)
- Image upload
- Crop functionality
- Save button

**WithdrawalDetailsModal** (`components/shared/Modals/WithdrawalDetailsModal.tsx`)
- Withdrawal information
- Status tracking
- Transaction details

---

## State Management

### Auth Store (`stores/authStore.ts`)

**Zustand store with localStorage persistence**

```typescript
interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'customer' | 'contributor'
  isContributorApproved: boolean
  credits: number
  joinedDate: string
  location?: string
  bio?: string
  website?: string
  instagram?: string
  specialties?: string[]
}

interface AuthState {
  user: User | null
  isLoggedIn: boolean
  login: (isContributor: boolean) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  applyAsContributor: () => void
}
```

**Features:**
- Persistent auth state
- Mock user data
- Role-based access
- Credit management
- Profile updates

---

## Mock Data

### Centralized Type System (`src/types/`)

**22 type definition files with 81+ types:**
1. `user.ts` - User, UserProfile, CustomerProfile, ContributorProfile, Badge, PayoutMethod, AuthTokens, Contributor
2. `asset.ts` - Asset, AssetPrices, AssetStats, Category, License, AssetUpload, AssetDetail
3. `collection.ts` - Collection, Board, BoardCollaborator
4. `transaction.ts` - Download, Transaction, CreditPackage, SubscriptionPlan, PaymentMethod, Earning, Withdrawal
5. `notification.ts` - Notification, NotificationPreferences, NotificationChannelPrefs
6. `search.ts` - SearchFilters, SearchResult, SearchFacets, AutocompleteSuggestion, FilterOption, FilterGroup, ActiveFilters
7. `content.ts` - Article, ArticleAuthor, EditorialStory, FeaturedCollection, Campaign
8. `support.ts` - SupportTicket, FAQItem, FAQCategory, ContactOption
9. `api.ts` - PaginatedResponse, APIError, APIResponse, UploadProgress
10. `ui.ts` - ModalState, SortOption, BreadcrumbItem, Toast, DownloadOptions, PaymentMethodOption, BillingPeriod, SignupStep, ApplicationStep, UploadStep, StatusFilter, MyAssetsTab, ProfileTab, LicenseFilter, FeedFilter
11. `analytics.ts` - AnalyticsEvent, AssetAnalytics, ContributorAnalytics, DashboardStat
12. `activity.ts` - Activity, FeedItem, ActivityType
13. `upload.ts` - UploadSession, UploadFile, UploadFileStatus
14. `social.ts` - Comment, Review, Follow
15. `pricing.ts` - PricingPlan, PricingFeature, PricingLimits, PricingFAQ
16. `billing.ts` - Invoice, InvoiceItem
17. `team.ts` - Team, TeamMember
18. `share.ts` - ShareLink
19. `leaderboard.ts` - ContributorLeaderboard, LeaderboardEntry
20. `stats.ts` - DashboardStats, PlatformStats
21. `dashboard.ts` - Dashboard-specific types
22. `index.ts` - Re-exports all types
12. `activity.ts` - Activity, FeedItem, ActivityType
13. `upload.ts` - UploadSession, UploadFile, UploadFileStatus
14. `social.ts` - Comment, Review, Follow
15. `pricing.ts` - PricingPlan, PricingFeature, PricingLimits, PricingFAQ
16. `billing.ts` - Invoice, InvoiceItem
17. `team.ts` - Team, TeamMember
18. `share.ts` - ShareLink
19. `leaderboard.ts` - ContributorLeaderboard, LeaderboardEntry
20. `stats.ts` - DashboardStats, PlatformStats

**All types exported from `src/types/index.ts`**

### Mock Data Files (`src/lib/mock/`)

**24 comprehensive mock data files:**
1. `users.ts` - Customer and contributor users, contributor summaries
2. `assets.ts` - 15 detailed assets with full metadata, colors, releases
3. `assetDetail.ts` - Extended asset details
4. `collections.ts` - Collection mock data
5. `boards.ts` - Board mock data with collaborators
6. `transactions.ts` - Transaction history, downloads, earnings
7. `notifications.ts` - Notification data and preferences
8. `content.ts` - Articles (with full Article type), editorial stories, featured collections, campaigns
9. `analytics.ts` - Dashboard stats, platform stats, analytics data
10. `leaderboard.ts` - Contributor leaderboards by period/region
11. `contributors.ts` - Contributor lookup utilities
12. `editorial.ts` - Editorial articles (uses full Article type)
13. `user.ts` - Single user exports
14. `searchAssets.ts` - Search-specific assets (100+ assets)
15. `index.ts` - Centralized exports with backward compatibility
16. `billing.ts` - Credit packages, payment methods, transactions
17. `blog.ts` - Blog articles and category colors
18. `dashboard.ts` - Dashboard-specific mock data
19. `discover.ts` - Feed items and discovery data
20. `earnings.ts` - Earnings transactions and withdrawals
21. `legal.ts` - Legal page content
22. `marketing.ts` - Marketing page data
23. `myAssets.ts` - My assets with stats, collections, downloads, liked assets
24. `ui.ts` - UI-specific mock data (categories, stats, trending, pricing features)

**All mock data uses centralized types from `@/types`**

**Helper Functions:**
- `getContributorByUsername()`
- `getContributorAssets()`
- `getArticleBySlug()`
- `getContributorAvatar()`
- `getContributorUsername()`

---

## Future Enhancements

### Phase 2 Features

1. **Real API Integration**
   - Replace mock data with actual API calls
   - Implement tRPC or REST API client
   - Add loading states and error handling
   - Implement optimistic updates

2. **Advanced Search**
   - Visual search (upload image to find similar)
   - AI-powered recommendations
   - Search history
   - Saved searches
   - Advanced filters (color, mood, style)

3. **Social Features**
   - Follow/unfollow contributors
   - Comments on assets
   - Likes and favorites
   - Share to social media
   - User profiles with activity feed

4. **Real-time Features**
   - Live notifications
   - Real-time collaboration on boards
   - Live chat support
   - WebSocket integration

5. **Payment Integration**
   - Stripe/Flutterwave integration
   - Credit purchase flow
   - Subscription management
   - Invoice generation
   - Payout system for contributors

6. **Upload Enhancements**
   - Resumable uploads (tus.io)
   - Bulk upload with progress
   - AI tag suggestions
   - Duplicate detection
   - Image optimization

7. **Analytics**
   - Contributor analytics dashboard
   - Asset performance tracking
   - Revenue reports
   - Download analytics
   - User behavior tracking

8. **Enterprise Features**
   - Team accounts
   - SSO integration
   - Approval workflows
   - Usage reports
   - Bulk licensing

9. **Accessibility**
   - WCAG 2.1 AA compliance
   - Screen reader optimization
   - Keyboard navigation
   - High contrast mode
   - Focus management

10. **Performance**
    - Image lazy loading
    - Virtual scrolling for large lists
    - Code splitting
    - Service worker caching
    - CDN integration

11. **Internationalization**
    - Multi-language support
    - Currency conversion
    - Localized content
    - RTL support

12. **Mobile App**
    - React Native app
    - Offline mode
    - Push notifications
    - Camera integration

---

## Development Guidelines

### Code Style

- TypeScript strict mode
- ESLint + Prettier
- Functional components with hooks
- Tailwind CSS for styling
- Component composition over inheritance
- Custom hooks for reusable logic

### File Naming

- Components: PascalCase (e.g., `AssetCard.tsx`)
- Utilities: camelCase (e.g., `formatPrice.ts`)
- Pages: lowercase with hyphens (e.g., `my-assets/`)
- Constants: UPPER_SNAKE_CASE

### Component Structure

```typescript
// Imports
import { useState } from 'react'
import { Icon } from 'lucide-react'

// Types
interface ComponentProps {
  prop: string
}

// Component
export function Component({ prop }: ComponentProps) {
  // Hooks
  const [state, setState] = useState()
  
  // Handlers
  const handleClick = () => {}
  
  // Render
  return <div>...</div>
}
```

### Testing

- Unit tests for utilities
- Component tests with React Testing Library
- E2E tests with Playwright
- Accessibility tests with axe-core

### Git Workflow

- Feature branches from `main`
- Conventional commits
- Pull request reviews
- CI/CD with GitHub Actions

---

## Deployment

### Vercel Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_SENTRY_DSN=
```

### Build Optimization

- Static page generation where possible
- Image optimization with next/image
- Font optimization with next/font
- Bundle analysis
- Tree shaking

---

## Conclusion

This PRD documents the complete frontend implementation of 234photos as built. The application provides a solid foundation for a stock media marketplace with room for growth and enhancement. All core features are functional with mock data, ready for backend integration.

**Key Achievements:**
- ✅ Complete authentication flow with username support
- ✅ Customer and contributor experiences fully implemented
- ✅ Dashboard with all features including application status tracking
- ✅ Upload wizard with centralized UploadFile type
- ✅ Asset management with rejection reason display
- ✅ Boards and collections with collaborator management
- ✅ Earnings tracking with withdrawal history
- ✅ Notification system with preferences page
- ✅ Account settings with all user fields (location, social links, payout method)
- ✅ Asset detail page with color palette and release badges
- ✅ Download history with expiration dates and license URLs
- ✅ Centralized type system (20 files, 81+ types)
- ✅ Comprehensive mock data (15 files)
- ✅ 100% type consistency across codebase
- ✅ Responsive design
- ✅ Clean, maintainable code
- ✅ Production-ready build (zero TypeScript errors)

**Next Steps:**
1. Backend API integration
2. Payment processing
3. Real-time features
4. Advanced search
5. Mobile app

---

**Document Version:** 2.1  
**Last Updated:** April 23, 2026  
**Maintained By:** Engineering Team
