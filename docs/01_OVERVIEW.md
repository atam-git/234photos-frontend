# 234photos Frontend - Overview

## Executive Summary

234photos is Africa's premier stock media marketplace connecting African creators with global buyers. This document outlines the complete frontend implementation built with Next.js 15, TypeScript, and Tailwind CSS.

---

## Technology Stack

- **Framework:** Next.js 15.1.0 (App Router)
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS + Custom CSS
- **State Management:** Zustand
- **Icons:** Lucide React
- **Font:** Plus Jakarta Sans (Google Fonts)
- **Deployment:** Vercel-ready

---

## Architecture

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
│   │   ├── boards/           # Boards (saved assets)
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
│   └── shared/               # Shared components
├── lib/
│   └── mock/                 # Mock data (24 files)
├── stores/
│   └── authStore.ts          # Zustand auth store
├── types/                    # TypeScript types (22 files, 81+ types)
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

## Implementation Status

**Version:** 2.2 - Production Ready  
**Status:** All Features Implemented ✅

### Completed Features
- ✅ Complete authentication flow with username support
- ✅ Customer and contributor experiences fully implemented
- ✅ Dashboard with all features including application status tracking
- ✅ Upload wizard with centralized UploadFile type
- ✅ Asset management with rejection reason display
- ✅ Boards and collections with collaborator management
- ✅ Earnings tracking with withdrawal history
- ✅ Notification system with preferences page
- ✅ Account settings with all user fields
- ✅ Asset detail page with color palette and release badges
- ✅ Download history with expiration dates and license URLs
- ✅ Centralized type system (22 files, 81+ types)
- ✅ Comprehensive mock data (24 files)
- ✅ 100% type consistency across codebase
- ✅ Responsive design
- ✅ Production-ready build (zero TypeScript errors)

### Next Steps
1. Backend API integration
2. Payment processing
3. Real-time features
4. Advanced search
5. Mobile app

---

## Next Steps

- **Marketing Pages:** See [02_MARKETING_PAGES.md](./02_MARKETING_PAGES.md)
- **Browse Experience:** See [03_BROWSE_EXPERIENCE.md](./03_BROWSE_EXPERIENCE.md)
- **Contributor Experience:** See [04_CONTRIBUTOR_EXPERIENCE.md](./04_CONTRIBUTOR_EXPERIENCE.md)
- **Dashboard:** See [05_DASHBOARD.md](./05_DASHBOARD.md)
- **Design System:** See [06_DESIGN_SYSTEM.md](./06_DESIGN_SYSTEM.md)
