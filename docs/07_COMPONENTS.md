# Component Library

This document provides a comprehensive overview of all components in the 234photos frontend application.

---

## Shared Components

### Header (`components/shared/Header.tsx`)

- Logo
- Navigation menu
- Search bar (on search variant)
- Browse dropdown
- User menu / Auth buttons
- Mobile menu
- Sticky on scroll

### Footer (`components/shared/Footer.tsx`)

- Logo and tagline
- Link columns (Company, Resources, Legal, Community)
- Social media links
- Newsletter signup
- Copyright

### Hero (`components/shared/Hero.tsx`)

- Full-width background
- Centered content
- Search bar
- CTA buttons
- Responsive design

### CategoryGrid (`components/shared/CategoryGrid.tsx`)

- 8 category cards
- Image backgrounds
- Hover effects
- Responsive grid (2/4/4 columns)

### Collections (`components/shared/Collections.tsx`)

- Collection cards with 2x2 photo collage
- Hover effects
- Responsive grid

### TrendingContent (`components/shared/TrendingContent.tsx`)

- Horizontal scroll
- Asset cards
- Navigation arrows

### BlogSection (`components/shared/BlogSection.tsx`)

- Blog post cards
- Featured post
- Read more links

### ContributorSection (`components/shared/ContributorSection.tsx`)

- Contributor cards
- Avatar, name, stats
- Follow button

### Breadcrumb (`components/shared/Breadcrumb.tsx`)

- Navigation breadcrumbs
- Clickable path items
- Current page indicator

### PricingSection (`components/shared/PricingSection.tsx`)

- Pricing cards
- Feature lists
- CTA buttons

### StatsBar (`components/shared/StatsBar.tsx`)

- Platform statistics
- Animated counters
- Icon display

### CreativeTools (`components/shared/CreativeTools.tsx`)

- Tool showcase
- Feature highlights
- Integration info

---

## Feature Components

### Asset Components

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

### Dashboard Components

**DashboardSidebar** (`components/features/dashboard/DashboardSidebar.tsx`)
- Logo
- Navigation links with icons
- Active state
- User profile section
- Credits display
- Logout button
- Mobile drawer

### Search Components

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

---

## Modal Components

### Core Modals

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

### Collection Modals

**CreateCollectionModal** (`components/shared/Modals/CreateCollectionModal.tsx`)
- Collection name
- Description
- Visibility toggle
- Create button

**EditCollectionModal** (`components/shared/Modals/EditCollectionModal.tsx`)
- Edit name and description
- Visibility toggle
- Save button

### Asset & Earnings Modals

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

### Additional Modals

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

**ModalBackdrop** (`components/shared/Modals/ModalBackdrop.tsx`)
- Reusable backdrop
- Click outside to close
- Fade animation

---

## Component Structure

### Typical Component Pattern

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

### File Naming Conventions

- Components: PascalCase (e.g., `AssetCard.tsx`)
- Utilities: camelCase (e.g., `formatPrice.ts`)
- Pages: lowercase with hyphens (e.g., `my-assets/`)
- Constants: UPPER_SNAKE_CASE

---

## Related Documentation

- **[01_OVERVIEW.md](./01_OVERVIEW.md)** - Architecture overview
- **[06_DESIGN_SYSTEM.md](./06_DESIGN_SYSTEM.md)** - Design system and styling
- **[08_STATE_AND_DATA.md](./08_STATE_AND_DATA.md)** - State management and types
- **Design Folder:**
  - **[design/DESIGN_SYSTEM.md](./design/DESIGN_SYSTEM.md)** - Detailed design system
  - **[design/UI_IMPLEMENTATION_PLAN.md](./design/UI_IMPLEMENTATION_PLAN.md)** - Implementation plan
  - **[design/MISSING_UI_COMPONENTS.md](./design/MISSING_UI_COMPONENTS.md)** - Missing components
