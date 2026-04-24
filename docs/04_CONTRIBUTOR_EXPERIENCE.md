# Contributor Experience

This document covers all contributor-specific features including the dashboard, upload wizard with AI-assisted tagging, asset management, and earnings tracking.

---

## Contributor Dashboard (`/dashboard`)

### Application Status Banners

**Pending Application:**
- Yellow banner with timeline
- Application steps: Submitted → Under Review → Decision
- Current step highlighted
- Estimated review time (2-3 business days)

**Rejected Application:**
- Red banner with rejection reason
- Guidance on how to improve
- Reapply button
- Support contact link

### Stats Cards

- Total earnings (with trend percentage)
- Total downloads (with trend)
- Total views (with trend)
- Leaderboard rank (with position change)

### Dashboard Sections

1. **Quick Actions** - Upload, View Portfolio, Analytics
2. **Top Performing Assets** - Grid with earnings and download stats
3. **Recent Activity** - Timeline of downloads, likes, comments
4. **Earnings Chart** - Monthly earnings visualization
5. **Achievement Badges** - Gamification elements

---

## Upload Page (`/my-assets/upload`)

### Basic Features

- Drag and drop file upload
- Multiple file support (up to 100 files, max 4GB each)
- Upload progress tracking with status indicators
- **AI-Assisted Metadata Generation** (🤖 NEW)
- Per-file metadata using centralized UploadFile type:
  - Title (auto-generated from filename, editable, 🤖 AI-suggested)
  - Description (textarea, 🤖 AI-suggested)
  - Category dropdown (10 categories, 🤖 AI-suggested)
  - Model release toggle (Yes/No)
  - Tags (add/remove chips, 🤖 AI-suggested)
  - AI-generated checkbox
  - Editorial use checkbox
- Auto-detected metadata (read-only):
  - Dimensions (width × height in pixels)
  - File size (in MB)
  - File type (from MIME type)
- File list sidebar with thumbnails
- Active file highlighting
- "Apply to all files" functionality (copies metadata except title)
- Upload status tracking (uploading → processing → AI analyzing → complete)
- Success screen with asset count
- Uses centralized UploadFile type with proper field names:
  - fileName (not name)
  - preview (not src)
  - fileSize as number (not string)
  - mimeType (not fileType)
  - dimensions as object (not string)
  - modelRelease and propertyRelease booleans

---

## AI-Assisted Tagging Flow

### Step 1: Upload Files

```
┌─────────────────────────────────────────────┐
│ Upload Your Photos                          │
├─────────────────────────────────────────────┤
│                                              │
│ [Drag & drop photos here]                   │
│ or click to browse                          │
│                                              │
│ Supports: JPG, PNG, WebP                    │
│ Max 100 photos per upload                   │
│ Max 4GB per photo                           │
│                                              │
│ [Select Photos]                             │
│                                              │
│ Selected: 0 photos                          │
└─────────────────────────────────────────────┘
```

### Step 2: AI Processing

```
┌─────────────────────────────────────────────┐
│ Processing 5 photos...                      │
├─────────────────────────────────────────────┤
│                                              │
│ ████████████████░░░░░░░░░░ 65%             │
│                                              │
│ ✓ Uploaded to cloud                         │
│ ✓ Images optimized                          │
│ 🤖 AI analyzing images...                   │
│ 🤖 Generating smart suggestions...          │
│                                              │
│ Estimated time: 30 seconds                  │
└─────────────────────────────────────────────┘
```

### Step 3: Review & Edit with AI Suggestions

**Left Panel - File List:**
```
┌─────────────────────────────────────────────┐
│ Your Photos (5)                             │
├─────────────────────────────────────────────┤
│ [✓] [Thumbnail] lagos-sunset.jpg            │
│     🤖 AI: 92% confident                    │
│                                              │
│ [ ] [Thumbnail] nairobi-market.jpg          │
│     🤖 AI: 88% confident                    │
│                                              │
│ [ ] [Thumbnail] accra-beach.jpg             │
│     🤖 AI: 85% confident                    │
│                                              │
│ [Select All] [Apply to All]                │
└─────────────────────────────────────────────┘
```

**Right Panel - Metadata Editor:**
```
┌─────────────────────────────────────────────┐
│ Edit Details - lagos-sunset.jpg             │
├─────────────────────────────────────────────┤
│                                              │
│ Title: 🤖                                    │
│ [Lagos Skyline at Sunset_______________]    │
│ ✓ Use AI suggestion                         │
│                                              │
│ Description: 🤖                              │
│ [Stunning view of Lagos Island skyline___]  │
│ [during golden hour with vibrant colors__]  │
│ ✓ Use AI suggestion                         │
│                                              │
│ Category: 🤖                                 │
│ [Landscapes ▼]                              │
│ ✓ Use AI suggestion                         │
│                                              │
│ Tags: 🤖                                     │
│ [lagos] [nigeria] [skyline] [sunset]        │
│ [cityscape] [golden hour] [+ Add]           │
│ ✓ Use AI suggestions                        │
│                                              │
│ Location: 🤖 [Lagos, Nigeria___________]    │
│                                              │
│ Additional Info:                            │
│ [ ] AI-generated                            │
│ [ ] Editorial use only                      │
│ [✓] Model release                           │
│ [ ] Property release                        │
│                                              │
│ AI Confidence: ████████░░ 92%               │
│                                              │
│ [< Previous] [Next >] [Save & Continue]    │
└─────────────────────────────────────────────┘
```

### AI Suggestion Features

**1. Smart Suggestions:**
- Title: Descriptive, SEO-friendly (max 60 chars)
- Description: 2-3 sentences (max 200 chars)
- Tags: 10-15 relevant, searchable tags
- Category: Best-fit category from 10 options
- Location: City and country (if identifiable)

**2. Confidence Indicator:**
- High (90-100%): Green badge, auto-applied
- Good (70-89%): Blue badge, suggested
- Fair (50-69%): Yellow badge, review recommended
- Low (<50%): Red badge, manual input needed

**3. One-Click Actions:**
- ✓ Accept all AI suggestions (per photo)
- ✓ Accept individual suggestions (per field)
- ✗ Reject and edit manually
- 🔄 Regenerate suggestions (if not satisfied)

**4. Bulk Actions:**
- Apply AI suggestions to all photos
- Apply custom metadata to all photos
- Mix: AI for some fields, custom for others

**5. AI Toggle (Settings):**
- Enable/disable AI suggestions
- Choose AI model (fast vs. accurate)
- Set confidence threshold (auto-apply if >X%)

### AI Suggestions Panel (Collapsible)

```
┌─────────────────────────────────────────────┐
│ 🤖 AI Analysis                              │
├─────────────────────────────────────────────┤
│ Detected:                                   │
│ • Location: Lagos, Nigeria                  │
│ • Time: Evening/Golden Hour                 │
│ • Subjects: Cityscape, Buildings, Sky       │
│ • Mood: Vibrant, Energetic                  │
│ • Colors: Orange, Blue, Gold                │
│                                              │
│ Suggested Tags:                             │
│ [lagos] [nigeria] [skyline] [sunset]        │
│ [cityscape] [golden hour] [urban]           │
│ [africa] [west africa] [architecture]       │
│                                              │
│ Similar Assets: 234 photos                  │
│ Demand: High 🔥                             │
│                                              │
│ [Accept All Suggestions]                    │
└─────────────────────────────────────────────┘
```

### Step 4: Submit for Review

```
┌─────────────────────────────────────────────┐
│ Ready to Submit?                            │
├─────────────────────────────────────────────┤
│ 5 photos ready for review                   │
│                                              │
│ ✓ All photos have titles                   │
│ ✓ All photos have descriptions              │
│ ✓ All photos have tags                      │
│ ✓ All photos have categories                │
│                                              │
│ AI Confidence: 88% average                  │
│                                              │
│ [Submit for Review]  [Save as Draft]       │
└─────────────────────────────────────────────┘
```

### AI-Assisted Tagging Benefits

- ⚡ 80-85% time saved on metadata entry
- 🎯 Better SEO with AI-optimized titles/tags
- 🔍 Higher discoverability in search
- ✅ Consistent quality across uploads
- 🚀 Faster approval (complete metadata)

### Cost & Privacy

**Cost:**
- Free for all contributors
- Powered by OpenAI GPT-4o-mini
- ~$0.00015 per image (platform absorbs cost)

**Privacy:**
- Images analyzed securely via API
- No data stored by OpenAI
- AI suggestions are optional
- Contributors can edit/reject any suggestion

---

## My Assets (`/my-assets`)

### Tabs

**1. All Assets** - Table view with:
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

**2. Collections** - Grid of collections with:
- 2x2 photo collage
- Collection name, description, and asset count
- Visibility toggle (Public/Private)
- Create new collection button

### Asset Stats Modal

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

### Collection Detail (`/my-assets/collections/[id]`)

- Collection header with edit/delete options
- Toggle visibility (Public/Private)
- Asset grid with selection mode
- Remove assets functionality
- Preview modal
- Edit collection modal (name, description, visibility)
- Clickable assets showing stats

---

## Earnings Page (`/earnings`)

### Balance Cards

- Available balance (ready to withdraw) with green badge
- Pending balance (30-day hold) with yellow badge

### Summary Cards

- This month earnings with trend
- Total earned (all time)
- Total downloads with trend

### Earnings Chart

- 6-month bar chart showing monthly earnings

### Withdraw Button

- Opens withdrawal modal
- Minimum withdrawal: ₦80,000

### Withdrawal History Section

- Past withdrawal requests
- Amount, date, method (Bank/PayPal/Mobile Money)
- Status badges (completed/processing/pending/failed)
- Processing dates for completed withdrawals
- Failure reasons for failed withdrawals

### Transaction History

- Clickable transactions showing asset stats modal
- Date, asset thumbnail, license type
- Amount with green color
- Status indicators (pending/available/paid)
- Available date for pending earnings
- Paid date for completed earnings
- Filter and search

### Withdraw Modal

- Method selection (Bank Transfer, PayPal, Mobile Money)
- Amount input with MAX button
- Minimum withdrawal: ₦80,000
- Processing time info (3-5 business days)
- Confirm button

---

## Related Documentation

- **[01_OVERVIEW.md](./01_OVERVIEW.md)** - Architecture and user roles
- **[05_DASHBOARD.md](./05_DASHBOARD.md)** - Dashboard features
- **[07_COMPONENTS.md](./07_COMPONENTS.md)** - Component library
- **[08_STATE_AND_DATA.md](./08_STATE_AND_DATA.md)** - State management and types
