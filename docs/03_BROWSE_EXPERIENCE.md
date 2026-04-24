# 234photos Frontend - Browse Experience

Public pages accessible without authentication.

---

## Search Page (`/search`)

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

---

## Asset Detail Page (`/assets/[id]`)

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

---

## Boards (`/boards`)

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

---

## Downloads (`/downloads`)

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

---

## Liked Assets (`/liked`)

Authenticated feature for managing liked assets.

**Features:**
- Grid of liked assets
- Unlike functionality
- Preview modal
- Search functionality
- Empty state

---

## Next Steps

- **Contributor Experience:** See [04_CONTRIBUTOR_EXPERIENCE.md](./04_CONTRIBUTOR_EXPERIENCE.md)
- **Dashboard:** See [05_DASHBOARD.md](./05_DASHBOARD.md)
