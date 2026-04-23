# 234photos — Admin Dashboard PRD

**Version 1.0 - Admin Panel Specification**  
**Last Updated:** April 23, 2026  
**Status:** Planning Phase

---

## Executive Summary

This document outlines the complete admin dashboard for 234photos, providing platform administrators with comprehensive tools to manage content, users, finances, and platform operations. The admin panel is a separate authenticated interface with role-based access control.

### Technology Stack

- **Framework:** Next.js 15.1.0 (App Router)
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS + Shadcn UI components
- **State Management:** Zustand + React Query
- **Charts:** Recharts
- **Tables:** TanStack Table
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Deployment:** Vercel-ready

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Authentication & Access Control](#authentication--access-control)
3. [Dashboard Overview](#dashboard-overview)
4. [Content Moderation](#content-moderation)
5. [Contributor Management](#contributor-management)
6. [Financial Management](#financial-management)
7. [Editorial Management](#editorial-management)
8. [User Management](#user-management)
9. [Platform Settings](#platform-settings)
10. [Analytics & Reports](#analytics--reports)
11. [Support & Tickets](#support--tickets)
12. [System Monitoring](#system-monitoring)

---

## Architecture Overview

### Folder Structure

```
src/
├── app/
│   ├── (admin)/                    # Admin-only routes
│   │   ├── admin/
│   │   │   ├── page.tsx           # Admin dashboard home
│   │   │   ├── layout.tsx         # Admin layout with sidebar
│   │   │   ├── moderation/        # Content moderation
│   │   │   │   ├── page.tsx       # Moderation queue
│   │   │   │   ├── assets/[id]/   # Asset review detail
│   │   │   │   └── bulk/          # Bulk actions
│   │   │   ├── contributors/      # Contributor management
│   │   │   │   ├── page.tsx       # Contributors list
│   │   │   │   ├── [id]/          # Contributor detail
│   │   │   │   ├── applications/  # Pending applications
│   │   │   │   └── performance/   # Performance reports
│   │   │   ├── users/             # User management
│   │   │   │   ├── page.tsx       # Users list
│   │   │   │   ├── [id]/          # User detail
│   │   │   │   └── activity/      # Activity logs
│   │   │   ├── finance/           # Financial management
│   │   │   │   ├── page.tsx       # Finance overview
│   │   │   │   ├── pricing/       # Pricing controls
│   │   │   │   ├── payouts/       # Payout management
│   │   │   │   ├── transactions/  # Transaction history
│   │   │   │   └── revenue/       # Revenue reports
│   │   │   ├── editorial/         # Editorial content
│   │   │   │   ├── page.tsx       # Articles list
│   │   │   │   ├── new/           # Create article
│   │   │   │   ├── [id]/edit/     # Edit article
│   │   │   │   └── collections/   # Featured collections
│   │   │   ├── campaigns/         # Marketing campaigns
│   │   │   │   ├── page.tsx       # Campaigns list
│   │   │   │   ├── new/           # Create campaign
│   │   │   │   └── [id]/          # Campaign detail
│   │   │   ├── support/           # Support tickets
│   │   │   │   ├── page.tsx       # Tickets list
│   │   │   │   ├── [id]/          # Ticket detail
│   │   │   │   └── faq/           # FAQ management
│   │   │   ├── analytics/         # Analytics & reports
│   │   │   │   ├── page.tsx       # Analytics overview
│   │   │   │   ├── revenue/       # Revenue analytics
│   │   │   │   ├── users/         # User analytics
│   │   │   │   ├── content/       # Content analytics
│   │   │   │   └── search/        # Search analytics
│   │   │   ├── settings/          # Platform settings
│   │   │   │   ├── page.tsx       # General settings
│   │   │   │   ├── categories/    # Category management
│   │   │   │   ├── tags/          # Tag management
│   │   │   │   ├── limits/        # Upload/rate limits
│   │   │   │   └── legal/         # Legal pages
│   │   │   └── system/            # System monitoring
│   │   │       ├── page.tsx       # System health
│   │   │       ├── logs/          # Error logs
│   │   │       ├── jobs/          # Background jobs
│   │   │       └── cache/         # Cache management
│   │   └── admin-login/           # Separate admin login
├── components/
│   ├── admin/                      # Admin-specific components
│   │   ├── layout/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   └── AdminBreadcrumb.tsx
│   │   ├── moderation/
│   │   │   ├── AssetReviewCard.tsx
│   │   │   ├── ModerationQueue.tsx
│   │   │   ├── BulkActionBar.tsx
│   │   │   └── RejectionReasonForm.tsx
│   │   ├── contributors/
│   │   │   ├── ApplicationReviewCard.tsx
│   │   │   ├── ContributorStatsCard.tsx
│   │   │   └── PerformanceChart.tsx
│   │   ├── finance/
│   │   │   ├── PricingEditor.tsx
│   │   │   ├── PayoutReviewCard.tsx
│   │   │   ├── RevenueChart.tsx
│   │   │   └── TransactionTable.tsx
│   │   ├── editorial/
│   │   │   ├── ArticleEditor.tsx
│   │   │   ├── RichTextEditor.tsx
│   │   │   └── MediaUploader.tsx
│   │   ├── analytics/
│   │   │   ├── StatCard.tsx
│   │   │   ├── TrendChart.tsx
│   │   │   ├── DataTable.tsx
│   │   │   └── ExportButton.tsx
│   │   ├── support/
│   │   │   ├── TicketCard.tsx
│   │   │   ├── TicketThread.tsx
│   │   │   └── FAQEditor.tsx
│   │   └── system/
│   │       ├── HealthIndicator.tsx
│   │       ├── LogViewer.tsx
│   │       └── JobQueueMonitor.tsx
├── lib/
│   └── admin/                      # Admin utilities
│       ├── permissions.ts          # Permission checks
│       ├── validation.ts           # Form validation schemas
│       └── api.ts                  # Admin API client
└── types/
    └── admin.ts                    # Admin-specific types
```

### Rendering Strategy

| Route Type | Strategy | Reason |
|------------|----------|--------|
| Admin dashboard | CSR | Real-time data, authenticated |
| Admin reports | SSR | SEO not needed, data-heavy |
| Admin settings | CSR | Interactive forms |

---

## Authentication & Access Control

### Admin Roles

1. **Super Admin**
   - Full system access
   - Manage other admins
   - System settings
   - Financial controls

2. **Content Admin**
   - Content moderation
   - Editorial management
   - Collections curation
   - Campaign management

3. **Support Admin**
   - Support tickets
   - User management (limited)
   - FAQ management
   - Help articles

4. **Finance Admin**
   - Payout management
   - Pricing controls
   - Revenue reports
   - Transaction reviews

### Authentication Flow

**Admin Login** (`/admin-login`)
- Separate login page from user login
- Email/password with optional 2FA
- Admin-specific JWT tokens
- Session timeout: 2 hours (shorter than user sessions)
- IP whitelist support (optional)
- Login attempt tracking
- Audit log for all admin logins

**Access Control:**
- Role-based permissions
- Action-level permissions (view, edit, delete, approve)
- Audit trail for all admin actions
- Session management with Redis
- Automatic logout on inactivity

**Security Features:**
- 2FA optional (can be enabled per admin)
- IP whitelist for sensitive actions
- Rate limiting on admin endpoints
- Audit logs for all changes
- Encrypted admin sessions

---

## Dashboard Overview

### Admin Home (`/admin`)

**Key Metrics (Top Row):**
1. **Platform Health**
   - Status indicator (green/yellow/red)
   - Uptime percentage
   - Active users count
   - API response time

2. **Pending Actions**
   - Assets awaiting moderation (count with alert)
   - Contributor applications (count)
   - Pending payouts (count + total amount)
   - Open support tickets (count)

3. **Revenue Today**
   - Today's revenue (₦)
   - Comparison to yesterday (% change)
   - Mini trend chart (7 days)

4. **Active Users**
   - Users online now
   - 24h active users
   - 7d active users

**Quick Actions (Cards):**
- Review Assets (→ moderation queue)
- Review Applications (→ contributor applications)
- Process Payouts (→ payout management)
- View Tickets (→ support tickets)
- Create Campaign (→ new campaign)
- Publish Article (→ new article)

**Recent Activity Feed:**
- Last 20 platform events
- Asset approvals/rejections
- New user signups
- Contributor applications
- Payouts processed
- Support tickets resolved
- System alerts

**Charts Section:**
1. **Revenue Trend** (30 days)
   - Line chart
   - Daily revenue
   - Hover tooltips

2. **User Growth** (30 days)
   - Area chart
   - New customers vs contributors
   - Stacked view

3. **Content Stats** (7 days)
   - Bar chart
   - Uploads, approvals, rejections
   - Grouped bars

4. **Top Contributors** (This month)
   - Leaderboard table
   - Avatar, name, earnings, downloads
   - Top 10

**Alerts Section:**
- System alerts (errors, warnings)
- Low balance warnings
- Failed payouts
- Abuse reports
- High-priority tickets



---

## Content Moderation

### Moderation Queue (`/admin/moderation`)

**Filter Bar:**
- Status: All / Pending / Approved / Rejected
- Type: All / Photos / Videos / Vectors
- Date range picker
- Contributor filter (search by name)
- Sort: Newest / Oldest / Most Views / AI Score

**Queue View Options:**
- Grid view (default) - thumbnails with quick actions
- List view - detailed table
- Bulk selection mode

**Asset Card (Grid View):**
- Large thumbnail (watermarked)
- Asset ID and upload date
- Contributor avatar and name
- AI quality score (0-100) with color coding
- NSFW detection flag (if applicable)
- Duplicate detection warning (if similar asset found)
- Quick actions:
  - ✓ Approve (green button)
  - ✗ Reject (red button)
  - 👁 Review (opens detail modal)
  - 🚩 Flag for review

**Asset Review Detail (`/admin/moderation/assets/[id]`):**

**Left Panel - Asset Preview:**
- Full-size image viewer
- Zoom controls
- Download original (for detailed review)
- Previous/Next asset navigation
- Keyboard shortcuts (A=approve, R=reject, N=next)

**Right Panel - Asset Information:**

1. **Basic Info:**
   - Title (editable)
   - Description (editable)
   - Category (editable dropdown)
   - Tags (editable chips)
   - Upload date and time

2. **Technical Details:**
   - Dimensions (width × height)
   - File size
   - File type
   - Resolution (DPI)
   - Color space
   - EXIF data (if any - should be removed)

3. **AI Analysis:**
   - Quality score (0-100)
   - Sharpness score
   - Noise level
   - Color balance
   - Composition score
   - NSFW probability (%)
   - Detected objects/tags
   - Similar assets (if duplicates found)

4. **Contributor Info:**
   - Avatar and name
   - Total uploads
   - Approval rate
   - Average quality score
   - Link to contributor profile

5. **Compliance Checks:**
   - ✓ EXIF removed
   - ✓ GPS data removed
   - ✓ Watermark applied
   - ✓ Thumbnails generated
   - ⚠ Model release (Yes/No/Unknown)
   - ⚠ Property release (Yes/No/Unknown)

**Action Buttons:**
- **Approve** (green, primary)
  - Publishes asset immediately
  - Sends notification to contributor
  - Indexes in search
  
- **Reject** (red, destructive)
  - Opens rejection reason modal
  - Sends notification with reason
  - Asset moved to rejected queue
  
- **Request Changes** (yellow)
  - Opens feedback form
  - Contributor can resubmit
  - Asset stays in pending

- **Flag for Review** (orange)
  - Escalates to senior admin
  - Adds to flagged queue
  - Requires second opinion

**Rejection Reason Modal:**
- Predefined reasons (checkboxes):
  - Poor quality (blurry, noisy, bad composition)
  - Inappropriate content
  - Copyright violation
  - Duplicate content
  - Incorrect metadata
  - Missing releases (model/property)
  - Technical issues
  - Other (custom text)
- Custom message field (optional)
- Guidance for resubmission
- Send notification toggle
- Confirm reject button

**Bulk Actions (`/admin/moderation/bulk`):**
- Select multiple assets (checkbox)
- Bulk approve (with confirmation)
- Bulk reject (with reason)
- Bulk assign category
- Bulk add tags
- Bulk flag
- Action confirmation modal
- Progress indicator for bulk operations

**Moderation Stats (Sidebar):**
- Today's moderation count
- Pending count
- Average review time
- Your approval rate
- Leaderboard (top moderators)



---

## Contributor Management

### Contributors List (`/admin/contributors`)

**Filter & Search:**
- Search by name, username, email
- Status: All / Active / Suspended / Pending Application
- Tier: All / Bronze / Silver / Gold / Platinum
- Country filter
- Sort: Name / Earnings / Uploads / Join Date / Performance Score

**Table Columns:**
- Avatar and name (clickable)
- Username
- Email
- Status badge (Active/Suspended/Pending)
- Tier badge with icon
- Total uploads
- Approval rate (%)
- Total earnings (₦)
- Downloads count
- Join date
- Actions menu (⋮)

**Actions Menu:**
- View Profile
- View Assets
- View Earnings
- Suspend/Unsuspend
- Change Tier
- Send Message
- View Activity Log

**Bulk Actions:**
- Send announcement
- Change tier
- Export data

### Contributor Applications (`/admin/contributors/applications`)

**Application Queue:**
- Pending applications count
- Filter: All / Pending / Approved / Rejected
- Sort: Newest / Oldest

**Application Card:**
- Applicant photo and name
- Email and country
- Application date
- Bio preview (first 100 chars)
- Specialties tags
- Portfolio link (clickable)
- Instagram link (if provided)
- Sample work thumbnails (if uploaded)
- Quick actions:
  - ✓ Approve
  - ✗ Reject
  - 👁 Review Details

**Application Detail Modal:**

**Applicant Information:**
- Full name and email
- Country and location
- Join date
- Current role (customer)

**Application Details:**
- Full bio
- Specialties (multi-select tags)
- Portfolio URL (with preview)
- Instagram handle (with link)
- Sample work gallery (if provided)
- Application date
- Days pending

**Review Section:**
- Quality assessment notes (admin only)
- Portfolio quality score (1-5 stars)
- Bio quality score (1-5 stars)
- Overall recommendation

**Action Buttons:**
- **Approve** (green)
  - Upgrades user to contributor
  - Sends welcome email
  - Grants upload permissions
  
- **Reject** (red)
  - Opens rejection reason modal
  - Sends email with feedback
  - User can reapply after 30 days
  
- **Request More Info** (yellow)
  - Opens feedback form
  - Sends email to applicant
  - Application stays pending

**Rejection Reason Modal:**
- Predefined reasons:
  - Portfolio quality insufficient
  - Bio needs improvement
  - Specialties unclear
  - Sample work not relevant
  - Duplicate application
  - Other (custom)
- Guidance for reapplication
- Reapply cooldown period (30 days default)
- Send notification toggle

### Contributor Detail (`/admin/contributors/[id]`)

**Header:**
- Large avatar
- Name and username
- Email (with copy button)
- Status badge
- Tier badge
- Country flag
- Action buttons:
  - Edit Profile
  - Suspend/Unsuspend
  - Send Message
  - View as User

**Stats Cards (Top Row):**
1. Total Earnings (₦)
   - All-time earnings
   - This month
   - Trend indicator

2. Total Uploads
   - Approved count
   - Pending count
   - Rejected count

3. Performance Score
   - Overall score (0-100)
   - Approval rate
   - Quality score

4. Downloads
   - Total downloads
   - This month
   - Average per asset

**Tabs:**

1. **Overview**
   - Bio and profile info
   - Specialties
   - Social links
   - Join date
   - Last active
   - Recent activity timeline

2. **Assets**
   - Grid of all assets
   - Filter by status
   - Sort options
   - Quick moderation actions

3. **Earnings**
   - Earnings chart (12 months)
   - Transaction history
   - Payout history
   - Pending balance
   - Available balance

4. **Performance**
   - Quality score trend
   - Approval rate trend
   - Upload frequency chart
   - Top performing assets
   - Category breakdown

5. **Activity Log**
   - All contributor actions
   - Uploads, edits, deletions
   - Login history
   - IP addresses
   - Device info

**Tier Management:**
- Current tier display
- Tier criteria checklist
- Manual tier override
- Tier history

**Suspension Modal:**
- Reason selection
- Duration (temporary/permanent)
- Custom message
- Notify contributor toggle
- Confirm button

### Contributor Performance (`/admin/contributors/performance`)

**Leaderboard:**
- Top contributors by earnings
- Top by downloads
- Top by quality score
- Top by upload count
- Filter by period (week/month/year)
- Filter by country

**Performance Metrics:**
- Average approval rate
- Average quality score
- Average earnings per asset
- Upload frequency
- Retention rate

**Tier Distribution:**
- Pie chart showing tier breakdown
- Bronze/Silver/Gold/Platinum counts
- Tier upgrade trends



---

## Financial Management

### Finance Overview (`/admin/finance`)

**Revenue Cards (Top Row):**
1. **Today's Revenue**
   - Total revenue today (₦)
   - Comparison to yesterday
   - Hourly trend mini-chart

2. **This Month**
   - Month-to-date revenue
   - Comparison to last month
   - Progress to monthly goal

3. **Pending Payouts**
   - Total amount pending (₦)
   - Number of contributors
   - Urgent count (>30 days)

4. **Platform Balance**
   - Available balance
   - Reserved for payouts
   - Net revenue

**Revenue Chart:**
- 12-month revenue trend
- Line chart with area fill
- Breakdown by source:
  - Credit purchases
  - Subscriptions
  - One-time downloads
- Hover tooltips with details

**Quick Actions:**
- Process Payouts
- Adjust Pricing
- View Transactions
- Export Reports
- Create Promotion

**Recent Transactions:**
- Last 50 transactions
- Date, user, type, amount, status
- Filter and search
- Export to CSV

### Pricing Controls (`/admin/finance/pricing`)

**Credit Packages:**

Table with columns:
- Package name (e.g., "Starter Pack")
- Credits amount
- Price (₦) - editable
- Price per credit (calculated)
- Discount % (editable)
- Popular badge toggle
- Status (Active/Inactive)
- Actions (Edit/Duplicate/Delete)

**Edit Package Modal:**
- Package name
- Credits amount
- Base price (₦)
- Discount percentage
- Popular badge toggle
- Description
- Save button

**License Pricing:**

Table with columns:
- License type (Standard/Enhanced/Editorial)
- Base price (₦) - editable
- Contributor royalty % - editable
- Platform commission % (calculated)
- Credits cost - editable
- Status (Active/Inactive)
- Actions (Edit/History)

**Edit License Modal:**
- License type (read-only)
- Base price (₦)
- Contributor royalty (%)
- Credits cost
- Description
- Effective date (for scheduled changes)
- Save button

**Subscription Plans:**

Table with columns:
- Plan name (Free/Pro/Business/Enterprise)
- Monthly price (₦) - editable
- Annual price (₦) - editable
- Credits per month
- Features list (editable)
- Status (Active/Inactive)
- Actions (Edit/Duplicate)

**Platform Settings:**
- Minimum payout threshold (₦) - editable
- Payout processing fee (%)
- Currency conversion rates
- Tax rates by country
- Refund policy settings

**Pricing History:**
- Timeline of all pricing changes
- Date, admin, change type, old/new values
- Audit trail

### Payout Management (`/admin/finance/payouts`)

**Payout Queue:**

**Filter Bar:**
- Status: All / Pending / Processing / Completed / Failed
- Date range
- Amount range
- Payment method: All / Bank / PayPal / Mobile Money
- Country filter
- Sort: Date / Amount / Contributor

**Payout Cards:**
- Contributor avatar and name
- Amount (₦)
- Payment method with icon
- Request date
- Days pending (with color coding)
- Status badge
- Actions:
  - ✓ Approve
  - ✗ Reject
  - 👁 Review Details
  - 🔄 Retry (for failed)

**Payout Detail Modal:**

**Contributor Info:**
- Name and email
- Total earnings
- Previous payouts count
- Account status

**Payout Details:**
- Amount requested (₦)
- Processing fee (₦)
- Net amount (₦)
- Payment method
- Bank details / PayPal email / Mobile number
- Request date
- Earnings breakdown (list of transactions)

**Verification Checks:**
- ✓ Minimum threshold met
- ✓ Account verified
- ✓ No pending disputes
- ✓ Tax info complete (if required)
- ⚠ First payout (flag for extra review)

**Action Buttons:**
- **Approve & Process** (green)
  - Initiates payment via Flutterwave
  - Updates status to processing
  - Sends confirmation email
  
- **Reject** (red)
  - Opens rejection reason modal
  - Refunds amount to pending balance
  - Sends notification
  
- **Hold** (yellow)
  - Pauses payout for review
  - Adds note for follow-up
  - Notifies contributor

**Rejection Reason Modal:**
- Predefined reasons:
  - Insufficient balance
  - Account verification needed
  - Suspicious activity
  - Incorrect bank details
  - Tax documentation required
  - Other (custom)
- Custom message
- Notify contributor toggle

**Bulk Payout Processing:**
- Select multiple payouts
- Batch approve (with confirmation)
- Total amount display
- Processing fee calculation
- Confirm and process button
- Progress indicator

**Payout History:**
- All completed payouts
- Filter by date, contributor, method
- Export to CSV/PDF
- Total paid amount

**Failed Payouts:**
- List of failed payouts
- Failure reason
- Retry button
- Contact contributor button

### Transaction History (`/admin/finance/transactions`)

**Transaction Table:**

**Columns:**
- Transaction ID (copyable)
- Date and time
- User (name + email)
- Type (Credit Purchase / Download / Subscription / Refund / Payout)
- Amount (₦)
- Payment method
- Status (Completed / Pending / Failed / Refunded)
- Actions (View Details / Refund / Export Receipt)

**Filters:**
- Date range picker
- Transaction type
- Status
- Amount range
- Payment method
- User search

**Transaction Detail Modal:**
- Full transaction details
- User information
- Payment method details
- Related assets (for downloads)
- Refund history (if any)
- Audit trail
- Actions: Issue Refund, Export Receipt

**Refund Modal:**
- Refund amount (₦) - editable (partial/full)
- Refund reason
- Notify user toggle
- Restore credits toggle
- Confirm refund button

**Export Options:**
- Date range selection
- Format: CSV / Excel / PDF
- Include filters toggle
- Email report toggle
- Download button

### Revenue Reports (`/admin/finance/revenue`)

**Report Dashboard:**

**Summary Cards:**
1. Total Revenue (All Time)
2. This Month Revenue
3. Average Transaction Value
4. Revenue Growth Rate (%)

**Revenue Breakdown Charts:**

1. **Revenue by Source** (Pie Chart)
   - Credit purchases
   - Subscriptions
   - One-time downloads
   - Percentage and amount

2. **Revenue Trend** (Line Chart)
   - Daily/Weekly/Monthly toggle
   - 12-month view
   - Comparison to previous period
   - Trend line

3. **Revenue by Country** (Bar Chart)
   - Top 10 countries
   - Amount and percentage
   - Sortable

4. **Payment Methods** (Donut Chart)
   - Card / Bank / PayPal / Mobile Money
   - Distribution percentage

**Top Performers:**
- Top earning assets (this month)
- Top spending customers
- Top earning contributors
- Top categories by revenue

**Export Reports:**
- Custom date range
- Report type selection
- Format (PDF/Excel/CSV)
- Schedule recurring reports
- Email recipients



---

## Editorial Management

### Articles List (`/admin/editorial`)

**Filter Bar:**
- Status: All / Draft / Published / Scheduled / Archived
- Category filter
- Author filter
- Date range
- Search by title
- Sort: Newest / Oldest / Most Views / Title A-Z

**View Options:**
- Grid view (with cover images)
- List view (table)

**Article Card (Grid View):**
- Cover image thumbnail
- Title
- Category badge
- Author avatar and name
- Status badge
- Published date (or scheduled date)
- View count
- Actions menu:
  - Edit
  - Duplicate
  - Preview
  - Publish/Unpublish
  - Delete

**Article Table (List View):**

**Columns:**
- Cover image (small)
- Title (clickable)
- Category
- Author
- Status
- Published date
- Views
- Actions

**Quick Actions:**
- Create New Article (primary button)
- Bulk actions (when items selected)
- Import from URL
- Export articles

### Create/Edit Article (`/admin/editorial/new` or `/admin/editorial/[id]/edit`)

**Article Editor Layout:**

**Left Panel - Content Editor:**

1. **Basic Info:**
   - Title (text input, required)
   - Slug (auto-generated, editable)
   - Excerpt (textarea, 160 chars max)
   - Category (dropdown, required)
   - Tags (multi-select chips)

2. **Cover Image:**
   - Image uploader
   - Drag & drop or browse
   - Crop tool
   - Alt text input
   - Image preview

3. **Content Editor:**
   - Rich text editor (WYSIWYG)
   - Formatting toolbar:
     - Bold, Italic, Underline
     - Headings (H2, H3, H4)
     - Lists (bullet, numbered)
     - Links
     - Images
     - Quotes
     - Code blocks
     - Dividers
   - Markdown support toggle
   - Full-screen mode
   - Word count display
   - Auto-save indicator

4. **Media Gallery:**
   - Insert images from library
   - Upload new images
   - Image alignment options
   - Caption and alt text

**Right Panel - Settings:**

1. **Publishing:**
   - Status dropdown (Draft/Published/Scheduled)
   - Publish date/time picker (for scheduled)
   - Featured article toggle
   - Allow comments toggle

2. **Author:**
   - Author selection (dropdown)
   - Author bio display
   - Co-authors (multi-select)

3. **SEO:**
   - Meta title (60 chars)
   - Meta description (160 chars)
   - Focus keyword
   - SEO score indicator

4. **Featured Image:**
   - Different from cover (optional)
   - Used for social sharing
   - Preview for Twitter/Facebook

5. **Related Content:**
   - Related articles (multi-select)
   - Related collections
   - Related assets

**Action Buttons:**
- Save Draft (secondary)
- Preview (opens in new tab)
- Publish / Schedule (primary)
- Delete (destructive, with confirmation)

**Preview Mode:**
- Full article preview
- Desktop/Mobile toggle
- Close preview button

### Collections Management (`/admin/editorial/collections`)

**Featured Collections:**

**Collection Cards:**
- 2x2 photo collage
- Collection name
- Description preview
- Asset count
- Featured badge toggle
- Visibility (Public/Private)
- Actions:
  - Edit
  - Add Assets
  - Remove from Featured
  - Delete

**Create/Edit Collection Modal:**
- Collection name
- Description (textarea)
- Slug (auto-generated)
- Visibility toggle
- Featured toggle
- Asset selector:
  - Search assets
  - Multi-select
  - Drag to reorder
  - Preview thumbnails
- Save button

**Asset Selector:**
- Search bar
- Filter by category
- Grid of assets with checkboxes
- Selected count indicator
- Add selected button

### Editorial Categories

**Category Management:**
- List of categories
- Add new category
- Edit category (name, slug, color, icon)
- Delete category (with asset reassignment)
- Reorder categories (drag & drop)

**Category Form:**
- Name (required)
- Slug (auto-generated)
- Description
- Color picker (for badges)
- Icon selector
- Parent category (for subcategories)
- Display order



---

## User Management

### Users List (`/admin/users`)

**Filter & Search:**
- Search by name, email, username
- Role: All / Customer / Contributor / Admin
- Status: All / Active / Suspended / Deleted
- Country filter
- Registration date range
- Sort: Name / Email / Join Date / Credits / Activity

**User Table:**

**Columns:**
- Avatar and name (clickable)
- Email
- Username
- Role badge
- Status badge
- Credits balance
- Total spent (₦)
- Join date
- Last active
- Actions menu (⋮)

**Actions Menu:**
- View Profile
- Edit User
- Adjust Credits
- View Activity
- Send Message
- Suspend/Unsuspend
- Delete Account

**Bulk Actions:**
- Send announcement
- Export users
- Bulk credit adjustment

**User Stats (Top Cards):**
1. Total Users
   - Count with trend
2. Active Users (30d)
   - Count with trend
3. New Users (This Month)
   - Count with trend
4. Suspended Users
   - Count

### User Detail (`/admin/users/[id]`)

**Header:**
- Avatar (large)
- Name and username
- Email (with copy button)
- Role badge
- Status badge
- Country flag
- Join date
- Last active
- Action buttons:
  - Edit Profile
  - Adjust Credits
  - Suspend/Unsuspend
  - Delete Account
  - Login as User (for debugging)

**Stats Cards:**
1. Credits Balance
   - Current balance
   - Total purchased
   - Total spent

2. Total Spent (₦)
   - All-time spending
   - This month
   - Average per transaction

3. Downloads
   - Total downloads
   - This month
   - Favorite categories

4. Boards
   - Total boards
   - Total saved assets
   - Shared boards

**Tabs:**

1. **Overview**
   - Profile information
   - Bio and location
   - Social links
   - Account settings
   - Subscription status (if any)
   - Notification preferences

2. **Activity**
   - Activity timeline
   - Logins
   - Downloads
   - Purchases
   - Board actions
   - Likes and follows
   - Filter by type and date

3. **Transactions**
   - Transaction history
   - Credit purchases
   - Downloads
   - Refunds
   - Total spent
   - Export option

4. **Downloads**
   - Download history
   - Asset thumbnails
   - Download dates
   - License types
   - Re-download count

5. **Boards**
   - List of boards
   - Asset count per board
   - Collaborators
   - View board contents

6. **Support**
   - Support tickets
   - Ticket status
   - Response time
   - Satisfaction rating

**Edit User Modal:**
- Name (editable)
- Email (editable)
- Username (editable)
- Role (dropdown)
- Status (dropdown)
- Country (dropdown)
- Avatar upload
- Save button

**Adjust Credits Modal:**
- Current balance display
- Adjustment type: Add / Remove / Set
- Amount input
- Reason (required)
- Notify user toggle
- Confirm button

**Suspend User Modal:**
- Reason selection
- Duration: Temporary (days) / Permanent
- Custom message
- Notify user toggle
- Confirm button

**Delete Account Modal:**
- Confirmation checkbox
- Data retention options:
  - Delete all data
  - Anonymize data
  - Keep transaction history
- Reason (required)
- Notify user toggle
- Confirm delete button

### Activity Logs (`/admin/users/activity`)

**Activity Feed:**
- Real-time activity stream
- Filter by:
  - User
  - Action type
  - Date range
  - IP address
- Actions tracked:
  - Logins
  - Logouts
  - Profile updates
  - Purchases
  - Downloads
  - Uploads (for contributors)
  - Board actions
  - Support tickets
  - Password changes

**Activity Detail:**
- Timestamp
- User info
- Action type
- IP address
- Device info
- Location (from IP)
- Details (JSON view)

**Export Options:**
- Date range
- User filter
- Action type filter
- Format (CSV/JSON)



---

## Platform Settings

### General Settings (`/admin/settings`)

**Platform Information:**
- Platform name
- Tagline
- Description
- Contact email
- Support email
- Social media links
- Logo upload (light/dark versions)
- Favicon upload

**Regional Settings:**
- Default currency (NGN)
- Supported currencies
- Default language
- Supported languages
- Timezone
- Date format
- Number format

**Email Settings:**
- SMTP configuration
- From name
- From email
- Reply-to email
- Email templates
- Test email button

**Notification Settings:**
- Enable/disable notification types
- Email notification defaults
- Push notification settings
- In-app notification settings
- Notification frequency limits

**Feature Flags:**
- Enable/disable features:
  - Video uploads
  - Vector uploads
  - Subscriptions
  - Enterprise features
  - API access
  - Social login
  - 2FA
- Feature rollout percentage

**Maintenance Mode:**
- Enable maintenance mode
- Maintenance message
- Allowed IP addresses (admin access)
- Estimated downtime

### Categories Management (`/admin/settings/categories`)

**Category List:**
- Drag & drop reordering
- Category name
- Slug
- Icon
- Asset count
- Status (Active/Inactive)
- Actions (Edit/Delete)

**Add/Edit Category Modal:**
- Name (required)
- Slug (auto-generated, editable)
- Description
- Icon selector (Lucide icons)
- Color picker
- Parent category (for subcategories)
- Display order
- Status toggle
- Save button

**Bulk Actions:**
- Merge categories
- Delete categories (with asset reassignment)
- Export category data

### Tags Management (`/admin/settings/tags`)

**Tag List:**
- Search tags
- Tag name
- Usage count (how many assets)
- Created date
- Actions (Edit/Merge/Delete)

**Tag Operations:**
- Merge tags (combine similar tags)
- Rename tag (updates all assets)
- Delete tag (removes from all assets)
- Bulk tag operations

**Tag Suggestions:**
- AI-suggested tags
- Popular tags
- Trending tags
- Unused tags (cleanup)

### Upload & Rate Limits (`/admin/settings/limits`)

**Upload Limits:**
- Max file size (GB) - editable
- Max files per batch - editable
- Max daily uploads per contributor - editable
- Supported file types (checkboxes)
- Max video duration (minutes)
- Max video resolution

**Rate Limits:**

Table with editable values:
- Auth endpoints (req/min per IP)
- Search (req/min per user)
- Upload (files/day per contributor)
- Download (downloads/hour per user)
- API calls (req/hour per key)

**Storage Limits:**
- Max storage per contributor (GB)
- Total platform storage limit
- Storage cleanup rules
- Archive old assets toggle

**Quality Requirements:**
- Minimum image resolution
- Minimum image quality score
- Maximum noise level
- Minimum sharpness score
- Auto-reject below threshold toggle

### Legal Pages (`/admin/settings/legal`)

**Legal Documents:**
- Terms of Service
- Privacy Policy
- Cookie Policy
- License Agreement
- DMCA Policy
- Contributor Agreement

**Document Editor:**
- Rich text editor
- Version history
- Last updated date
- Effective date
- Preview button
- Publish button

**Version History:**
- List of all versions
- Date and admin who updated
- View diff
- Restore previous version

**DMCA Management:**
- DMCA takedown requests
- Request form
- Review and action
- Counter-notice handling
- Compliance tracking



---

## Analytics & Reports

### Analytics Overview (`/admin/analytics`)

**Date Range Selector:**
- Predefined: Today / Yesterday / Last 7 days / Last 30 days / This month / Last month / Custom
- Comparison toggle (compare to previous period)

**Key Metrics (Top Row):**
1. **Total Revenue**
   - Amount (₦)
   - Change % (vs previous period)
   - Mini trend chart

2. **New Users**
   - Count
   - Change %
   - Customer vs Contributor split

3. **Total Downloads**
   - Count
   - Change %
   - Free vs Paid split

4. **Active Contributors**
   - Count
   - Change %
   - Upload activity

**Charts Section:**

1. **Revenue Trend**
   - Line chart
   - Daily/Weekly/Monthly toggle
   - Breakdown by source
   - Hover tooltips

2. **User Growth**
   - Area chart
   - New users over time
   - Cumulative total line
   - Customer vs Contributor stacked

3. **Content Stats**
   - Bar chart
   - Uploads, Approvals, Rejections
   - Grouped by day/week/month

4. **Download Activity**
   - Line chart
   - Downloads over time
   - Free vs Paid comparison

**Top Performers:**
- Top 10 assets by downloads
- Top 10 assets by revenue
- Top 10 contributors by earnings
- Top 10 customers by spending

**Category Breakdown:**
- Pie chart
- Downloads by category
- Revenue by category
- Upload count by category

### Revenue Analytics (`/admin/analytics/revenue`)

**Revenue Dashboard:**

**Summary Cards:**
1. Total Revenue (period)
2. Average Transaction Value
3. Revenue per User
4. Revenue Growth Rate

**Detailed Charts:**

1. **Revenue by Source**
   - Stacked area chart
   - Credit purchases
   - Subscriptions
   - One-time downloads
   - Daily breakdown

2. **Revenue by License Type**
   - Bar chart
   - Standard / Enhanced / Editorial
   - Comparison over time

3. **Revenue by Country**
   - Map visualization
   - Top countries table
   - Revenue heatmap

4. **Revenue Forecast**
   - Predictive line chart
   - Based on historical data
   - Confidence intervals

**Revenue Breakdown Table:**
- Date
- Credit purchases (₦)
- Subscriptions (₦)
- Downloads (₦)
- Total (₦)
- Growth %

**Export Options:**
- Custom date range
- Format (CSV/Excel/PDF)
- Include charts toggle
- Email report

### User Analytics (`/admin/analytics/users`)

**User Metrics:**

**Summary Cards:**
1. Total Users
2. Active Users (30d)
3. New Users (period)
4. Churn Rate
5. Average Session Duration
6. User Retention Rate

**Charts:**

1. **User Growth**
   - Line chart
   - New users over time
   - Cumulative total
   - Customer vs Contributor

2. **User Activity**
   - Heatmap
   - Active hours
   - Active days
   - Peak usage times

3. **User Retention**
   - Cohort analysis
   - Retention by signup month
   - Color-coded retention rates

4. **User Engagement**
   - Bar chart
   - Downloads per user
   - Boards per user
   - Likes per user

**User Segmentation:**
- By role (Customer/Contributor)
- By country
- By signup date
- By activity level
- By spending tier

**User Funnel:**
- Signup → Email verification → First download
- Conversion rates at each step
- Drop-off analysis

### Content Analytics (`/admin/analytics/content`)

**Content Metrics:**

**Summary Cards:**
1. Total Assets
2. Pending Moderation
3. Approval Rate
4. Average Quality Score
5. Assets per Contributor
6. Storage Used

**Charts:**

1. **Upload Trend**
   - Line chart
   - Uploads over time
   - By category
   - By contributor tier

2. **Moderation Stats**
   - Stacked bar chart
   - Approved / Rejected / Pending
   - Daily breakdown

3. **Quality Distribution**
   - Histogram
   - Quality score distribution
   - Average quality trend

4. **Category Distribution**
   - Pie chart
   - Assets by category
   - Upload trends by category

**Top Content:**
- Most downloaded assets
- Most viewed assets
- Most liked assets
- Highest earning assets

**Content Performance:**
- Average downloads per asset
- Average earnings per asset
- Conversion rate (views to downloads)
- Engagement metrics

### Search Analytics (`/admin/analytics/search`)

**Search Metrics:**

**Summary Cards:**
1. Total Searches
2. Unique Searchers
3. Zero Result Rate
4. Average Results per Search
5. Click-Through Rate

**Charts:**

1. **Search Volume**
   - Line chart
   - Searches over time
   - Peak search times

2. **Popular Searches**
   - Bar chart
   - Top 20 search queries
   - Search count

3. **Zero Result Searches**
   - List of queries with no results
   - Frequency count
   - Content gap identification

4. **Search to Download**
   - Funnel chart
   - Search → View → Download
   - Conversion rates

**Search Terms:**
- Top search terms
- Trending searches
- Failed searches (zero results)
- Search suggestions performance

**Filter Usage:**
- Most used filters
- Filter combinations
- Filter impact on results

**Content Gaps:**
- Searches with no/few results
- Suggested content to fill gaps
- Priority ranking
- Notify contributors button



---

## Support & Tickets

### Support Tickets (`/admin/support`)

**Ticket Queue:**

**Filter Bar:**
- Status: All / Open / In Progress / Waiting User / Resolved / Closed
- Priority: All / Low / Normal / High / Urgent
- Category: All / Technical / Billing / Content / Account / Other
- Assigned to: All / Me / Unassigned / Specific admin
- Date range
- Search by ticket ID, user, subject

**Ticket List:**

**Columns:**
- Ticket ID (clickable)
- Subject
- User (name + avatar)
- Category badge
- Priority badge
- Status badge
- Assigned to (avatar)
- Created date
- Last updated
- Actions (View/Assign/Close)

**Ticket Stats (Sidebar):**
- Open tickets count
- My tickets count
- Unassigned count
- Average response time
- Average resolution time
- Satisfaction score

**Bulk Actions:**
- Assign tickets
- Change priority
- Change status
- Close tickets

### Ticket Detail (`/admin/support/[id]`)

**Ticket Header:**
- Ticket ID (with copy button)
- Subject
- Status dropdown (editable)
- Priority dropdown (editable)
- Category dropdown (editable)
- Assigned to dropdown (editable)
- Created date
- Last updated

**User Info (Sidebar):**
- Avatar and name
- Email (with copy)
- Role badge
- Account status
- Total tickets
- Link to user profile
- Quick actions:
  - View user
  - Send email
  - Adjust credits

**Ticket Thread:**
- Chronological message list
- User messages (left-aligned)
- Admin responses (right-aligned)
- System messages (centered)
- Timestamps
- Attachments (if any)
- Internal notes (admin-only, highlighted)

**Message Composer:**
- Rich text editor
- Formatting toolbar
- File attachment
- Canned responses dropdown
- Internal note toggle
- Send button
- Save draft button

**Canned Responses:**
- Predefined response templates
- Insert and edit
- Categories:
  - Greeting
  - Common issues
  - Closing
  - Follow-up

**Ticket Actions:**
- Change status
- Change priority
- Assign to admin
- Add internal note
- Merge with another ticket
- Convert to bug report
- Close ticket

**Ticket History:**
- All status changes
- Priority changes
- Assignments
- Admin who made changes
- Timestamps

**Related Tickets:**
- Other tickets from same user
- Similar tickets (by subject)
- Linked tickets

### FAQ Management (`/admin/support/faq`)

**FAQ Categories:**
- List of categories
- Add new category
- Edit category
- Reorder (drag & drop)
- Delete category

**FAQ Items:**

**Table:**
- Question (clickable to edit)
- Category
- Order
- Views count
- Helpful votes
- Status (Published/Draft)
- Actions (Edit/Duplicate/Delete)

**Add/Edit FAQ Modal:**
- Question (text input)
- Answer (rich text editor)
- Category (dropdown)
- Tags (multi-select)
- Display order
- Status (Published/Draft)
- Related articles
- Save button

**FAQ Analytics:**
- Most viewed FAQs
- Most helpful FAQs
- Least helpful FAQs (need improvement)
- Search terms leading to FAQs

### Help Articles (`/admin/support/articles`)

**Article List:**
- Similar to FAQ but more detailed
- Categories
- Search functionality
- Status filter

**Article Editor:**
- Title
- Content (rich text)
- Category
- Tags
- Related FAQs
- Related tickets
- Publish/Draft status



---

## System Monitoring

### System Health (`/admin/system`)

**Health Dashboard:**

**Status Cards (Top Row):**
1. **API Status**
   - Status indicator (green/yellow/red)
   - Uptime percentage (99.95%)
   - Response time (ms)
   - Requests per minute

2. **Database Status**
   - Connection status
   - Query performance (avg ms)
   - Active connections
   - Slow queries count

3. **Storage Status**
   - Total storage used (GB)
   - Available storage (GB)
   - Usage percentage
   - Growth rate

4. **Queue Status**
   - Active jobs
   - Pending jobs
   - Failed jobs
   - Processing rate

**Service Health:**
- PostgreSQL (status, latency)
- Redis (status, memory usage)
- S3 (status, bandwidth)
- Meilisearch (status, index size)
- Flutterwave (status, last check)
- Email service (status, queue size)

**Performance Metrics:**

1. **API Response Times**
   - Line chart (last 24 hours)
   - P50, P95, P99 percentiles
   - Endpoint breakdown

2. **Error Rate**
   - Line chart
   - 4xx errors
   - 5xx errors
   - Error rate percentage

3. **Database Performance**
   - Query time distribution
   - Slow queries (>100ms)
   - Connection pool usage

4. **Cache Hit Rate**
   - Redis cache hit percentage
   - CDN cache hit percentage
   - Trend over time

**Alerts:**
- Active alerts list
- Alert severity (Critical/Warning/Info)
- Alert message
- Triggered time
- Acknowledge button
- Resolve button

**Recent Incidents:**
- Incident timeline
- Incident type
- Duration
- Impact
- Resolution
- Post-mortem link

### Error Logs (`/admin/system/logs`)

**Log Viewer:**

**Filter Bar:**
- Log level: All / Error / Warning / Info / Debug
- Service: All / API / Database / Queue / Storage
- Date range
- Search by message or trace ID

**Log Table:**
- Timestamp
- Level badge (color-coded)
- Service
- Message (truncated)
- User (if applicable)
- Request ID
- Actions (View Details)

**Log Detail Modal:**
- Full error message
- Stack trace
- Request details:
  - Method and URL
  - Headers
  - Body
  - Query params
- User context
- Server info
- Related logs
- Copy button
- Create ticket button

**Log Analytics:**
- Error frequency chart
- Top errors (by count)
- Error rate trend
- Affected users count

**Export Logs:**
- Date range
- Log level filter
- Format (JSON/CSV)
- Download button

### Background Jobs (`/admin/system/jobs`)

**Job Queue Dashboard:**

**Queue Stats:**
1. Active Jobs
   - Currently processing
   - Job types
2. Pending Jobs
   - Waiting in queue
   - Estimated wait time
3. Completed Jobs (24h)
   - Success count
   - Success rate
4. Failed Jobs
   - Failure count
   - Retry count

**Job Types:**
- Asset processing (EXIF, watermark, thumbnails)
- Email sending
- Payout processing
- Search indexing
- Analytics computation
- Cache warming
- Cleanup tasks

**Job List:**

**Columns:**
- Job ID
- Type
- Status (Active/Pending/Completed/Failed)
- Progress (%)
- Started at
- Duration
- Attempts
- Actions (View/Retry/Cancel)

**Job Detail Modal:**
- Job ID and type
- Status and progress
- Input data (JSON)
- Output data (JSON)
- Error message (if failed)
- Execution log
- Retry history
- Actions:
  - Retry now
  - Cancel job
  - View related jobs

**Failed Jobs:**
- List of failed jobs
- Failure reason
- Retry count
- Last attempt
- Actions:
  - Retry
  - Delete
  - Bulk retry

**Job Scheduler:**
- Scheduled jobs list
- Cron expression
- Next run time
- Last run time
- Status
- Actions (Run now/Edit/Disable)

### Cache Management (`/admin/system/cache`)

**Cache Overview:**

**Cache Stats:**
1. Redis Memory Usage
   - Used memory (MB)
   - Max memory (MB)
   - Usage percentage
2. Cache Hit Rate
   - Hit percentage
   - Miss percentage
   - Trend chart
3. Cached Keys
   - Total keys
   - By namespace
4. Eviction Rate
   - Keys evicted
   - Eviction policy

**Cache Namespaces:**
- Search results
- Asset details
- User sessions
- API responses
- Trending data
- Leaderboards

**Cache Operations:**
- Clear all cache (with confirmation)
- Clear by namespace
- Clear by pattern
- Warm cache (preload popular data)

**Cache Keys:**
- Search cache keys
- View key details
- TTL remaining
- Key size
- Delete key

**Cache Performance:**
- Hit/miss ratio chart
- Response time with/without cache
- Cache size over time
- Eviction rate chart



---

## Campaigns & Promotions

### Campaigns List (`/admin/campaigns`)

**Campaign Cards:**
- Campaign name
- Type badge (Supply Gap / Bonus / Promotion)
- Status (Active/Scheduled/Ended)
- Start and end dates
- Budget (₦)
- Spent (₦)
- Participants count
- Performance metrics
- Actions (Edit/Pause/End/Duplicate)

**Create Campaign (`/admin/campaigns/new`):**

**Campaign Types:**
1. **Supply Gap Campaign**
   - Target specific content needs
   - Set bonus payouts
   - Notify contributors
   
2. **Bonus Campaign**
   - Reward high-demand content
   - Set bonus multiplier
   - Category/tag targeting

3. **Promotional Campaign**
   - Discount codes
   - Credit bonuses
   - Limited time offers

**Campaign Form:**
- Name (required)
- Type (dropdown)
- Description
- Start date/time
- End date/time
- Budget (₦)
- Target audience:
  - All contributors
  - Specific tiers
  - Specific countries
  - Top performers
- Campaign rules (JSON editor)
- Notification message
- Auto-end toggle

**Supply Gap Settings:**
- Content categories needed
- Tags needed
- Bonus amount per asset (₦)
- Max bonus per contributor
- Quality threshold

**Bonus Campaign Settings:**
- Bonus multiplier (1.5x, 2x, etc.)
- Target categories
- Target tags
- Minimum quality score

**Promotional Settings:**
- Discount code
- Discount percentage
- Credit bonus amount
- Usage limit per user
- Total usage limit

### Campaign Detail (`/admin/campaigns/[id]`)

**Campaign Overview:**
- Name and description
- Status badge
- Dates
- Budget vs spent
- Participants count
- Assets submitted
- Success rate

**Performance Metrics:**
- Assets submitted chart
- Participants over time
- Budget utilization
- Quality score distribution

**Participants:**
- List of contributors
- Assets submitted
- Bonus earned
- Quality scores

**Campaign Actions:**
- Edit campaign
- Pause/Resume
- End early
- Extend deadline
- Adjust budget
- Send update notification

---

## Admin Components Library

### Layout Components

**AdminSidebar:**
- Logo
- Navigation menu with icons
- Active state highlighting
- Collapsible sections
- User profile at bottom
- Logout button
- Collapse/expand toggle

**AdminHeader:**
- Breadcrumb navigation
- Search bar (global)
- Notifications bell (admin alerts)
- User menu dropdown
- Quick actions menu

**AdminBreadcrumb:**
- Dynamic breadcrumb trail
- Clickable path items
- Current page indicator

### Data Display Components

**StatCard:**
- Metric value (large)
- Metric label
- Trend indicator (↑↓)
- Percentage change
- Mini chart (optional)
- Color coding (green/red)

**DataTable:**
- Sortable columns
- Filterable columns
- Pagination
- Row selection (checkboxes)
- Bulk actions bar
- Export button
- Column visibility toggle
- Responsive (horizontal scroll)

**TrendChart:**
- Line/Area/Bar charts
- Multiple datasets
- Hover tooltips
- Legend
- Date range selector
- Export chart button

**ProgressBar:**
- Percentage display
- Color coding
- Label
- Animated

### Form Components

**FormInput:**
- Label
- Input field
- Validation error display
- Helper text
- Required indicator

**FormSelect:**
- Label
- Dropdown
- Search functionality
- Multi-select support
- Validation

**FormTextarea:**
- Label
- Resizable textarea
- Character count
- Validation

**RichTextEditor:**
- WYSIWYG editor
- Formatting toolbar
- Image upload
- Link insertion
- Code blocks
- Preview mode

**DateRangePicker:**
- Start date
- End date
- Predefined ranges
- Calendar popup

**FileUploader:**
- Drag & drop zone
- Browse button
- File preview
- Progress bar
- Multiple files support
- File type validation

### Action Components

**ActionButton:**
- Primary/Secondary/Destructive variants
- Loading state
- Disabled state
- Icon support

**BulkActionBar:**
- Selected count display
- Action buttons
- Clear selection
- Sticky positioning

**ConfirmDialog:**
- Warning message
- Confirm/Cancel buttons
- Destructive action warning
- Checkbox confirmation (for critical actions)

**Toast Notifications:**
- Success/Error/Warning/Info variants
- Auto-dismiss
- Action button (optional)
- Close button

### Status Components

**StatusBadge:**
- Color-coded badges
- Status text
- Icon (optional)
- Variants: Success/Warning/Error/Info/Neutral

**HealthIndicator:**
- Status dot (green/yellow/red)
- Status text
- Last checked time
- Tooltip with details

**ProgressIndicator:**
- Circular progress
- Linear progress
- Percentage display
- Indeterminate state

---

## Admin API Endpoints

### Authentication
```
POST   /api/admin/auth/login
POST   /api/admin/auth/logout
POST   /api/admin/auth/refresh
POST   /api/admin/auth/verify-2fa
GET    /api/admin/auth/me
```

### Dashboard
```
GET    /api/admin/dashboard/stats
GET    /api/admin/dashboard/activity
GET    /api/admin/dashboard/alerts
```

### Moderation
```
GET    /api/admin/moderation/queue
GET    /api/admin/moderation/assets/:id
POST   /api/admin/moderation/assets/:id/approve
POST   /api/admin/moderation/assets/:id/reject
POST   /api/admin/moderation/assets/:id/flag
POST   /api/admin/moderation/bulk-approve
POST   /api/admin/moderation/bulk-reject
PATCH  /api/admin/moderation/assets/:id
```

### Contributors
```
GET    /api/admin/contributors
GET    /api/admin/contributors/:id
PATCH  /api/admin/contributors/:id
POST   /api/admin/contributors/:id/suspend
POST   /api/admin/contributors/:id/unsuspend
GET    /api/admin/contributors/applications
POST   /api/admin/contributors/applications/:id/approve
POST   /api/admin/contributors/applications/:id/reject
GET    /api/admin/contributors/:id/performance
```

### Users
```
GET    /api/admin/users
GET    /api/admin/users/:id
PATCH  /api/admin/users/:id
POST   /api/admin/users/:id/suspend
POST   /api/admin/users/:id/adjust-credits
DELETE /api/admin/users/:id
GET    /api/admin/users/:id/activity
```

### Finance
```
GET    /api/admin/finance/overview
GET    /api/admin/finance/pricing
PATCH  /api/admin/finance/pricing
GET    /api/admin/finance/payouts
POST   /api/admin/finance/payouts/:id/approve
POST   /api/admin/finance/payouts/:id/reject
GET    /api/admin/finance/transactions
POST   /api/admin/finance/transactions/:id/refund
GET    /api/admin/finance/revenue
```

### Editorial
```
GET    /api/admin/editorial/articles
POST   /api/admin/editorial/articles
GET    /api/admin/editorial/articles/:id
PATCH  /api/admin/editorial/articles/:id
DELETE /api/admin/editorial/articles/:id
POST   /api/admin/editorial/articles/:id/publish
GET    /api/admin/editorial/collections
POST   /api/admin/editorial/collections
PATCH  /api/admin/editorial/collections/:id
```

### Campaigns
```
GET    /api/admin/campaigns
POST   /api/admin/campaigns
GET    /api/admin/campaigns/:id
PATCH  /api/admin/campaigns/:id
DELETE /api/admin/campaigns/:id
POST   /api/admin/campaigns/:id/pause
POST   /api/admin/campaigns/:id/resume
```

### Support
```
GET    /api/admin/support/tickets
GET    /api/admin/support/tickets/:id
PATCH  /api/admin/support/tickets/:id
POST   /api/admin/support/tickets/:id/reply
POST   /api/admin/support/tickets/:id/close
GET    /api/admin/support/faq
POST   /api/admin/support/faq
PATCH  /api/admin/support/faq/:id
DELETE /api/admin/support/faq/:id
```

### Analytics
```
GET    /api/admin/analytics/overview
GET    /api/admin/analytics/revenue
GET    /api/admin/analytics/users
GET    /api/admin/analytics/content
GET    /api/admin/analytics/search
POST   /api/admin/analytics/export
```

### Settings
```
GET    /api/admin/settings
PATCH  /api/admin/settings
GET    /api/admin/settings/categories
POST   /api/admin/settings/categories
PATCH  /api/admin/settings/categories/:id
DELETE /api/admin/settings/categories/:id
GET    /api/admin/settings/tags
POST   /api/admin/settings/tags/merge
DELETE /api/admin/settings/tags/:id
```

### System
```
GET    /api/admin/system/health
GET    /api/admin/system/logs
GET    /api/admin/system/jobs
POST   /api/admin/system/jobs/:id/retry
GET    /api/admin/system/cache
POST   /api/admin/system/cache/clear
```

---

## Admin Types & Interfaces

### Core Admin Types

```typescript
// Admin User
interface AdminUser {
  id: string
  name: string
  email: string
  role: 'super_admin' | 'content_admin' | 'support_admin' | 'finance_admin'
  avatar?: string
  permissions: AdminPermission[]
  twoFactorEnabled: boolean
  lastLogin: Date
  createdAt: Date
}

// Admin Permissions
type AdminPermission =
  | 'moderation.view'
  | 'moderation.approve'
  | 'moderation.reject'
  | 'contributors.view'
  | 'contributors.manage'
  | 'contributors.approve'
  | 'users.view'
  | 'users.manage'
  | 'users.delete'
  | 'finance.view'
  | 'finance.manage'
  | 'finance.payouts'
  | 'editorial.view'
  | 'editorial.manage'
  | 'campaigns.view'
  | 'campaigns.manage'
  | 'support.view'
  | 'support.manage'
  | 'analytics.view'
  | 'settings.view'
  | 'settings.manage'
  | 'system.view'
  | 'system.manage'

// Moderation Queue Item
interface ModerationQueueItem {
  id: string
  asset: Asset
  contributor: ContributorSummary
  uploadedAt: Date
  aiScore: number
  nsfwProbability: number
  duplicates: Asset[]
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
}

// Contributor Application
interface ContributorApplication {
  id: string
  userId: string
  user: UserProfile
  bio: string
  specialties: string[]
  portfolioUrl?: string
  instagram?: string
  sampleWorkUrls: string[]
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
  rejectionReason?: string
  autoApproved: boolean
}

// Payout Request
interface PayoutRequest {
  id: string
  contributorId: string
  contributor: ContributorSummary
  amount: number // in kobo
  currency: string
  method: 'bank' | 'paypal' | 'mobile_money'
  bankDetails?: BankDetails
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
  requestedAt: Date
  processedAt?: Date
  completedAt?: Date
  failureReason?: string
  transactionRef?: string
}

// Campaign
interface Campaign {
  id: string
  name: string
  type: 'supply_gap' | 'bonus' | 'promotion'
  description: string
  status: 'draft' | 'active' | 'paused' | 'ended'
  startDate: Date
  endDate: Date
  budget: number // in kobo
  spent: number // in kobo
  targetAudience: CampaignAudience
  rules: CampaignRules
  participants: number
  assetsSubmitted: number
  createdBy: string
  createdAt: Date
}

// Support Ticket
interface SupportTicket {
  id: string
  userId: string
  user: UserProfile
  subject: string
  message: string
  category: 'technical' | 'billing' | 'content' | 'account' | 'other'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'waiting_user' | 'resolved' | 'closed'
  assignedTo?: string
  assignedAdmin?: AdminUser
  thread: TicketMessage[]
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
}

// Analytics Data
interface AnalyticsOverview {
  revenue: RevenueMetrics
  users: UserMetrics
  content: ContentMetrics
  downloads: DownloadMetrics
  period: DateRange
}

// System Health
interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down'
  services: ServiceHealth[]
  uptime: number
  responseTime: number
  errorRate: number
  lastChecked: Date
}
```

---

## Security & Permissions

### Role-Based Access Control

**Super Admin:**
- Full access to all features
- User management (including other admins)
- System settings
- Financial controls
- Audit logs

**Content Admin:**
- Content moderation (approve/reject)
- Editorial management
- Collections curation
- Campaign management
- Limited user view

**Support Admin:**
- Support tickets (full access)
- User management (view only)
- FAQ management
- Help articles
- Limited analytics

**Finance Admin:**
- Payout management
- Pricing controls
- Revenue reports
- Transaction management
- Refund processing

### Audit Logging

**All admin actions logged:**
- User ID and name
- Action type
- Resource affected
- Old and new values
- IP address
- Timestamp
- User agent

**Audit log retention:**
- 90 days in hot storage
- 2 years in cold storage
- Export capability

### Security Features

- 2FA optional (can be enabled per admin)
- Session timeout (2 hours)
- IP whitelist (optional)
- Rate limiting on admin endpoints
- Encrypted admin sessions
- Password complexity requirements
- Login attempt tracking
- Suspicious activity alerts

---

## Development Guidelines

### Code Organization

- Feature-based folder structure
- Shared components in `/components/admin`
- Admin-specific utilities in `/lib/admin`
- Type definitions in `/types/admin.ts`
- API client in `/lib/admin/api.ts`

### State Management

- React Query for server state
- Zustand for UI state
- Form state with React Hook Form
- Optimistic updates where appropriate

### Performance

- Server-side rendering for data-heavy pages
- Client-side rendering for interactive dashboards
- Pagination for large lists
- Virtual scrolling for very large lists
- Debounced search inputs
- Memoized expensive computations

### Testing

- Unit tests for utilities
- Component tests for UI components
- Integration tests for critical flows
- E2E tests for admin workflows

---

## Deployment & Monitoring

### Environment Variables

```env
NEXT_PUBLIC_ADMIN_API_URL=
ADMIN_JWT_SECRET=
ADMIN_SESSION_TIMEOUT=7200
ADMIN_2FA_REQUIRED=false
ADMIN_IP_WHITELIST=
```

### Monitoring

- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- User activity tracking (PostHog)
- Uptime monitoring (UptimeRobot)
- Log aggregation (Axiom)

### Alerts

- System health alerts
- Error rate alerts
- Performance degradation alerts
- Security alerts
- Failed payout alerts
- High-priority ticket alerts

---

## Future Enhancements

### Phase 2 Features

1. **Advanced Analytics**
   - Predictive analytics
   - ML-powered insights
   - Custom report builder
   - Automated anomaly detection

2. **Workflow Automation**
   - Auto-moderation rules
   - Auto-approval for trusted contributors
   - Automated payout processing
   - Smart ticket routing

3. **Multi-Admin Collaboration**
   - Real-time collaboration
   - Admin chat
   - Task assignment
   - Workload distribution

4. **Mobile Admin App**
   - React Native app
   - Push notifications
   - Quick actions
   - Offline support

5. **AI-Powered Features**
   - Auto-tagging suggestions
   - Quality prediction
   - Fraud detection
   - Content gap analysis

---

## Conclusion

This Admin Dashboard PRD provides a comprehensive specification for building a powerful, secure, and user-friendly admin interface for 234photos. The dashboard empowers administrators to efficiently manage all aspects of the platform while maintaining security and auditability.

**Key Features:**
- ✅ Complete content moderation workflow
- ✅ Contributor application and management
- ✅ Financial controls and payout management
- ✅ Editorial content management
- ✅ User management and activity tracking
- ✅ Comprehensive analytics and reporting
- ✅ Support ticket system
- ✅ System monitoring and health checks
- ✅ Campaign and promotion management
- ✅ Platform settings and configuration
- ✅ Role-based access control
- ✅ Audit logging and security

**Next Steps:**
1. Backend API implementation
2. Admin authentication system
3. Component library development
4. Dashboard implementation
5. Testing and QA
6. Security audit
7. Production deployment

---

**Document Version:** 1.0  
**Last Updated:** April 23, 2026  
**Maintained By:** Engineering Team
