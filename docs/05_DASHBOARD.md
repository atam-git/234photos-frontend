# Dashboard Features

This document covers all authenticated dashboard features including the discover feed, boards, downloads, account settings, billing, notifications, and support.

---

## Discover Feed (`/discover`)

### Features

- Filter tabs: Latest, Popular, Featured, For You
- Category filter chips
- Feed of recent uploads from followed contributors
- Asset grid with contributor info
- Load more functionality
- Search bar
- Empty state for new users

---

## Boards (`/boards`)

Authenticated feature for saving and organizing assets.

### Features

- Create new boards button
- Board cards with 2x2 photo collage
- Board types: Private, Shared, Team (with icons)
- Board description display
- More menu (Edit, Share, Manage Collaborators, Delete)
- Empty state with CTA

### Board Detail (`/boards/[id]`)

- Board header with name and description
- Action buttons:
  - Share modal with link copying and email invite
  - Manage collaborators modal
  - Edit board modal
- Asset grid with selection mode
- Remove assets functionality
- Preview modal for quick view

### Share Board Modal

- Share link display
- Copy link button with success state
- Email invite option
- Social sharing buttons (future)

### Manage Collaborators Modal

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

---

## Downloads (`/downloads`)

Authenticated feature showing download history.

### Features

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

---

## Liked Assets (`/liked`)

Authenticated feature for managing liked assets.

### Features

- Grid of liked assets
- Unlike functionality
- Preview modal
- Search functionality
- Empty state

---

## Account Settings (`/account`)

### 1. Profile Information

- Avatar upload
- Name, username (read-only), email
- Bio, location
- Website, Instagram, Twitter, Facebook
- Country selection

### 2. Customer Information (if customer role)

- Subscription plan display
- Subscription status
- Total downloads count
- Total spent amount

### 3. Contributor Settings (if contributor)

- Application status display with timeline
- Rejection reason (if rejected) with guidance
- Portfolio URL
- Specialties (multi-select)
- Payout method selection (Bank/PayPal/Mobile Money)
- Available balance display
- Pending balance display

### 4. Password & Security

- Change password form
- Two-factor authentication toggle
- Active sessions list

### 5. Preferences

- Email notifications toggle
- Language selection
- Timezone selection

---

## Billing & Credits (`/billing`)

### Tabs

**1. Credits**
- Current balance
- Credit packages (10, 25, 50, 100, 250 credits)
- Purchase with credit card
- Credit history

**2. Transaction History**
- Date, description, amount, status
- Filter by type
- Export functionality

**3. Subscription** (Future)
- Current plan
- Upgrade options
- Billing cycle
- Payment method

---

## Notifications (`/notifications`)

### Features

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

### Notification Preferences (`/notifications/preferences`)

- Back to notifications link
- Comprehensive table with:
  - Notification types (Downloads, Likes, Comments, Follows, Earnings, System)
  - Email channel toggle
  - Push notification toggle
  - In-app notification toggle
- Toggle buttons with checkmarks
- Channel descriptions (Email, Push, In-App)
- Save preferences button with success state

---

## Support (`/support`)

### Sections

**1. FAQ Accordion**
- Common questions
- Expandable answers
- Search functionality

**2. Contact Form**
- Subject, message
- File attachment
- Priority selection
- Submit ticket

**3. Help Articles**
- Getting started
- Upload guidelines
- Licensing info
- Payment help

---

## Related Documentation

- **[01_OVERVIEW.md](./01_OVERVIEW.md)** - Architecture and user roles
- **[03_BROWSE_EXPERIENCE.md](./03_BROWSE_EXPERIENCE.md)** - Browse and search features
- **[04_CONTRIBUTOR_EXPERIENCE.md](./04_CONTRIBUTOR_EXPERIENCE.md)** - Contributor features
- **[07_COMPONENTS.md](./07_COMPONENTS.md)** - Component library
- **[08_STATE_AND_DATA.md](./08_STATE_AND_DATA.md)** - State management and types
