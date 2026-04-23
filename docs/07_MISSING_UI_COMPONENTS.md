# Missing UI Components & Patterns

**Document Version:** 1.0  
**Last Updated:** April 23, 2026  
**Status:** Analysis Complete

This document outlines UI components and patterns that are currently missing from the 234photos frontend implementation but should be considered for a complete user experience.

---

## Overview

While the current implementation includes comprehensive features for both customers and contributors, there are several UI patterns and components that would enhance the user experience, improve accessibility, and ensure legal compliance.

**Current Status:**
- ✅ Core features implemented
- ✅ Basic empty states
- ✅ Loading states (inline)
- ⚠️ Limited error handling
- ❌ No toast system
- ❌ No onboarding flow
- ❌ No bulk actions

---

## 1. Toast/Notification System ❌

### Status
- **Type defined:** ✅ `src/types/ui.ts`
- **Component implemented:** ❌ No
- **Priority:** 🔴 High

### Description
A global toast notification system for displaying temporary success, error, warning, and info messages to users.

### Use Cases
- "Asset saved to board"
- "Download started"
- "Profile updated successfully"
- "Payment successful"
- "Upload failed - please try again"
- "Copied to clipboard"
- "Asset removed from board"

### Requirements
- Auto-dismiss after 3-5 seconds
- Manual dismiss option
- Stack multiple toasts
- Position: Top-right or bottom-right
- Animation: Slide in/fade out
- Action button support (e.g., "Undo")
- Icon based on type (✓, ✕, ⚠, ℹ)

### Implementation Notes
```typescript
interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}
```

### Files to Create
- `src/components/shared/Toast.tsx`
- `src/components/shared/ToastContainer.tsx`
- `src/stores/toastStore.ts` (Zustand)

---

## 2. Error Boundary ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🔴 High

### Description
React Error Boundary component to catch JavaScript errors anywhere in the component tree and display a fallback UI instead of crashing the entire app.

### Use Cases
- Catch rendering errors
- Prevent white screen of death
- Log errors to monitoring service
- Provide recovery options

### Requirements
- Friendly error message
- "Try again" button
- "Go to homepage" button
- Error details (dev mode only)
- Automatic error reporting
- Different fallbacks for different error types

### Implementation Notes
```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  
  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    console.error('Error caught:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />
    }
    return this.props.children
  }
}
```

### Files to Create
- `src/components/shared/ErrorBoundary.tsx`
- `src/components/shared/ErrorFallback.tsx`
- `src/lib/errorReporting.ts`

---

## 3. Pagination Component ❌

### Status
- **Type defined:** ✅ `src/types/api.ts` (PaginatedResponse)
- **Component implemented:** ❌ No
- **Priority:** 🔴 High

### Description
Reusable pagination component for navigating through large datasets. Currently only using infinite scroll.

### Use Cases
- Search results (alternative to infinite scroll)
- Transaction history
- Asset lists
- Notification history
- Earnings history

### Requirements
- Page numbers with ellipsis (1 2 3 ... 10)
- Previous/Next buttons
- Jump to first/last page
- Show current page and total pages
- Keyboard navigation (arrow keys)
- Responsive (mobile shows fewer page numbers)
- URL parameter sync

### Implementation Notes
```typescript
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisible?: number // Max page numbers to show
  showFirstLast?: boolean
}
```

### Files to Create
- `src/components/shared/Pagination.tsx`

---

## 4. Global Loading States ⚠️

### Status
- **Inline loading:** ✅ Yes (various pages)
- **Consistent component:** ❌ No
- **Priority:** 🟡 Medium

### Description
Consistent loading indicators and skeleton screens for better perceived performance.

### Use Cases
- Page transitions
- Data fetching
- Image loading
- Form submissions
- File uploads

### Requirements
- Spinner component (various sizes)
- Page-level loader (full screen)
- Skeleton screens (content placeholders)
- Progress bars (determinate/indeterminate)
- Consistent styling across app

### Implementation Notes
```typescript
// Spinner sizes
type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'

// Skeleton types
type SkeletonVariant = 'text' | 'circular' | 'rectangular'
```

### Files to Create
- `src/components/shared/Spinner.tsx`
- `src/components/shared/Skeleton.tsx`
- `src/components/shared/PageLoader.tsx`
- `src/components/shared/ProgressBar.tsx`

---

## 5. Onboarding/Tutorial Flow ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🟡 Medium

### Description
First-time user guidance and feature discovery system to help new users understand the platform.

### Use Cases

**For New Contributors:**
- "Welcome! Let's set up your profile"
- "How to upload your first asset"
- "Understanding earnings and payouts"
- "Tips for getting more downloads"

**For New Customers:**
- "How to search for assets"
- "Understanding credits and licenses"
- "How to create boards"
- "Download your first asset"

### Requirements
- Multi-step wizard
- Progress indicator
- Skip option
- "Don't show again" checkbox
- Contextual tooltips
- Interactive hotspots
- Video tutorials (optional)

### Implementation Notes
```typescript
interface OnboardingStep {
  id: string
  title: string
  description: string
  target?: string // CSS selector for highlighting
  action?: string // Button text
  image?: string
  video?: string
}

interface OnboardingFlow {
  id: string
  name: string
  userType: 'customer' | 'contributor'
  steps: OnboardingStep[]
}
```

### Files to Create
- `src/components/shared/Onboarding/OnboardingWizard.tsx`
- `src/components/shared/Onboarding/OnboardingStep.tsx`
- `src/components/shared/Onboarding/OnboardingTooltip.tsx`
- `src/lib/mock/onboarding.ts`
- `src/stores/onboardingStore.ts`

---

## 6. Confirmation Dialog ⚠️

### Status
- **Specific modals:** ✅ Yes (DeleteAccountModal)
- **Generic component:** ❌ No
- **Priority:** 🔴 High

### Description
Reusable confirmation dialog for dangerous or irreversible actions.

### Use Cases
- Delete asset
- Remove from board
- Cancel subscription
- Clear all filters
- Discard changes
- Logout

### Requirements
- Customizable title and message
- Danger variant (red) for destructive actions
- Confirm/Cancel buttons
- Optional checkbox ("I understand this cannot be undone")
- Keyboard support (Enter to confirm, Esc to cancel)
- Focus trap

### Implementation Notes
```typescript
interface ConfirmDialogProps {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'danger'
  requireCheckbox?: boolean
  checkboxLabel?: string
  onConfirm: () => void
  onCancel: () => void
}
```

### Files to Create
- `src/components/shared/ConfirmDialog.tsx`
- `src/stores/confirmDialogStore.ts`

---

## 7. Bulk Actions UI ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🟡 Medium

### Description
UI for selecting multiple items and performing batch operations.

### Use Cases
- Select multiple assets to add to board
- Delete multiple assets at once
- Bulk edit tags/metadata
- Bulk download
- Bulk change visibility (public/private)

### Requirements
- Checkbox selection
- "Select all" option
- Selection counter ("3 items selected")
- Floating action toolbar
- Bulk action buttons
- Clear selection
- Keyboard shortcuts (Shift+Click for range select)

### Implementation Notes
```typescript
interface BulkActionsProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  actions: BulkAction[]
}

interface BulkAction {
  label: string
  icon: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'danger'
  disabled?: boolean
}
```

### Files to Create
- `src/components/shared/BulkActionsToolbar.tsx`
- `src/components/shared/SelectableCard.tsx`
- `src/hooks/useBulkSelection.ts`

---

## 8. Drag & Drop Reordering ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🟢 Low

### Description
Drag and drop functionality for reordering items in lists and grids.

### Use Cases
- Reorder assets in collections
- Reorder boards
- Prioritize upload queue
- Arrange portfolio layout

### Requirements
- Visual feedback during drag
- Drop zones
- Smooth animations
- Touch support (mobile)
- Keyboard accessibility
- Auto-scroll when dragging near edges

### Implementation Notes
```typescript
// Consider using @dnd-kit/core library
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
```

### Files to Create
- `src/components/shared/DraggableList.tsx`
- `src/components/shared/DraggableItem.tsx`
- `src/hooks/useDragAndDrop.ts`

---

## 9. Keyboard Shortcuts ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🟡 Medium

### Description
Keyboard shortcuts for power users and improved accessibility.

### Shortcuts to Implement

**Global:**
- `/` - Focus search
- `Esc` - Close modal/dialog
- `?` - Show keyboard shortcuts help
- `Ctrl/Cmd + K` - Command palette

**Navigation:**
- `g + h` - Go to home
- `g + d` - Go to dashboard
- `g + u` - Go to upload
- `g + s` - Go to search

**Asset Actions:**
- `d` - Download asset
- `b` - Add to board
- `l` - Like/unlike
- `←/→` - Navigate between assets

### Requirements
- Keyboard shortcuts help modal
- Visual hints (tooltips showing shortcuts)
- Customizable shortcuts
- No conflicts with browser shortcuts
- Disabled in input fields

### Implementation Notes
```typescript
interface KeyboardShortcut {
  key: string
  modifiers?: ('ctrl' | 'shift' | 'alt' | 'meta')[]
  description: string
  action: () => void
  category: string
}
```

### Files to Create
- `src/components/shared/KeyboardShortcutsModal.tsx`
- `src/hooks/useKeyboardShortcut.ts`
- `src/lib/keyboardShortcuts.ts`

---

## 10. Contextual Help/Tooltips ⚠️

### Status
- **Limited usage:** ⚠️ Some tooltips exist
- **Consistent system:** ❌ No
- **Priority:** 🟡 Medium

### Description
Comprehensive tooltip and help system for explaining features and guiding users.

### Use Cases
- License type explanations
- Credit system details
- Badge requirements
- Form field hints
- Feature explanations
- Icon meanings

### Requirements
- Hover tooltips
- Click-to-show popovers
- Rich content support (text, images, links)
- Positioning (top, bottom, left, right, auto)
- Arrow pointing to target
- Keyboard accessible
- Mobile-friendly (tap to show)

### Implementation Notes
```typescript
interface TooltipProps {
  content: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
  trigger?: 'hover' | 'click' | 'focus'
  delay?: number
  maxWidth?: number
}
```

### Files to Create
- `src/components/shared/Tooltip.tsx`
- `src/components/shared/Popover.tsx`
- `src/components/shared/HelpIcon.tsx`

---

## 11. Progress Indicators ⚠️

### Status
- **Upload progress:** ✅ Yes
- **Profile completion:** ✅ Yes (just added)
- **Multi-step forms:** ❌ No
- **Priority:** 🟡 Medium

### Description
Visual progress indicators for multi-step processes and long-running operations.

### Use Cases
- Multi-step forms (signup, contributor application)
- Onboarding checklist
- Profile completion
- Upload progress
- Processing status

### Requirements
- Step indicators (1/5, 2/5, etc.)
- Progress bars
- Checkmarks for completed steps
- Current step highlighting
- Clickable steps (if allowed)
- Responsive design

### Implementation Notes
```typescript
interface ProgressStepsProps {
  steps: string[]
  currentStep: number
  completedSteps?: number[]
  onStepClick?: (step: number) => void
}
```

### Files to Create
- `src/components/shared/ProgressSteps.tsx`
- `src/components/shared/ProgressCircle.tsx`
- `src/components/shared/Checklist.tsx`

---

## 12. Comparison View ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🟢 Low

### Description
Side-by-side comparison of assets or license types.

### Use Cases
- Compare similar assets before downloading
- Compare license features
- Compare subscription plans
- Compare contributor stats

### Requirements
- Side-by-side layout
- Synchronized scrolling
- Highlight differences
- Add/remove items to compare
- Maximum 2-4 items
- Responsive (stack on mobile)

### Implementation Notes
```typescript
interface ComparisonViewProps {
  items: any[]
  fields: ComparisonField[]
  maxItems?: number
  onRemove?: (itemId: string) => void
}

interface ComparisonField {
  key: string
  label: string
  render: (item: any) => React.ReactNode
}
```

### Files to Create
- `src/components/shared/ComparisonView.tsx`
- `src/components/shared/ComparisonTable.tsx`

---

## 13. Quick Actions Menu ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🟢 Low

### Description
Right-click context menu for quick actions on assets and other items.

### Use Cases
- Right-click on asset: Download, Add to board, Share, Copy link
- Right-click on board: Edit, Share, Delete
- Right-click on collection: Edit, Delete, Make public/private

### Requirements
- Right-click trigger
- Keyboard accessible (Shift+F10)
- Position near cursor
- Close on click outside
- Keyboard navigation (arrow keys)
- Dividers between action groups
- Icons for actions

### Implementation Notes
```typescript
interface ContextMenuProps {
  items: ContextMenuItem[]
  onClose: () => void
}

interface ContextMenuItem {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'danger'
  divider?: boolean
  disabled?: boolean
}
```

### Files to Create
- `src/components/shared/ContextMenu.tsx`
- `src/hooks/useContextMenu.ts`

---

## 14. Offline State ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🟢 Low

### Description
Detection and messaging for offline/poor connection states.

### Use Cases
- Show banner when offline
- Queue actions for when back online
- Disable features that require connection
- Show cached content

### Requirements
- Offline detection
- Banner notification
- Retry button
- Queue failed requests
- Show cached data
- PWA support

### Implementation Notes
```typescript
// Use navigator.onLine and online/offline events
window.addEventListener('online', handleOnline)
window.addEventListener('offline', handleOffline)
```

### Files to Create
- `src/components/shared/OfflineBanner.tsx`
- `src/hooks/useOnlineStatus.ts`
- `src/lib/offlineQueue.ts`

---

## 15. Rate Limiting Feedback ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🟡 Medium

### Description
User-friendly messaging when API rate limits are hit.

### Use Cases
- Too many search requests
- Too many download attempts
- Too many API calls
- Spam prevention

### Requirements
- Clear error message
- Countdown timer ("Try again in 30 seconds")
- Explanation of rate limits
- Upgrade prompt (if applicable)
- Automatic retry when limit resets

### Implementation Notes
```typescript
interface RateLimitError {
  message: string
  retryAfter: number // seconds
  limit: number
  remaining: number
  resetAt: Date
}
```

### Files to Create
- `src/components/shared/RateLimitMessage.tsx`
- `src/lib/rateLimitHandler.ts`

---

## 16. Maintenance Mode Banner ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🟢 Low

### Description
Banner to notify users of scheduled maintenance or system updates.

### Use Cases
- Scheduled maintenance notification
- System upgrade warning
- Feature deprecation notice
- Service disruption alert

### Requirements
- Dismissible banner
- Countdown to maintenance
- Severity levels (info, warning, critical)
- Sticky positioning
- Link to status page
- Scheduled display (show X hours before)

### Implementation Notes
```typescript
interface MaintenanceBanner {
  message: string
  startTime: Date
  endTime: Date
  severity: 'info' | 'warning' | 'critical'
  statusPageUrl?: string
}
```

### Files to Create
- `src/components/shared/MaintenanceBanner.tsx`
- `src/lib/maintenanceSchedule.ts`

---

## 17. Cookie Consent Banner ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🔴 High (Legal requirement)

### Description
GDPR-compliant cookie consent banner for EU users.

### Use Cases
- First-time visitors
- GDPR compliance
- Cookie preferences management
- Analytics opt-in/out

### Requirements
- Show on first visit
- Accept all / Reject all buttons
- Customize preferences
- Remember choice
- Link to privacy policy
- Link to cookie policy
- Granular controls (necessary, analytics, marketing)

### Implementation Notes
```typescript
interface CookieConsent {
  necessary: boolean // Always true
  analytics: boolean
  marketing: boolean
  preferences: boolean
}
```

### Files to Create
- `src/components/shared/CookieConsentBanner.tsx`
- `src/components/shared/CookiePreferencesModal.tsx`
- `src/lib/cookieConsent.ts`
- `src/stores/cookieConsentStore.ts`

---

## 18. Referral/Invite System ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🟢 Low

### Description
UI for inviting other contributors or customers to the platform.

### Use Cases
- Refer a friend
- Invite contributors
- Share referral link
- Track referral rewards
- Referral leaderboard

### Requirements
- Unique referral link
- Copy link button
- Email invite form
- Social sharing buttons
- Referral stats (clicks, signups, earnings)
- Reward tracking
- Referral history

### Implementation Notes
```typescript
interface ReferralData {
  code: string
  link: string
  clicks: number
  signups: number
  earnings: number
  reward: number
}
```

### Files to Create
- `src/components/shared/ReferralCard.tsx`
- `src/components/shared/Modals/InviteFriendsModal.tsx`
- `src/app/(dashboard)/referrals/page.tsx`

---

## 19. Asset Comparison Table ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🟡 Medium

### Description
Comparison table for license types to help users choose the right license.

### Use Cases
- Compare Standard vs Enhanced vs Editorial licenses
- Show what's included in each license
- Highlight differences
- Help users make informed decisions

### Requirements
- Side-by-side comparison
- Feature checkmarks
- Price display
- "Choose this" buttons
- Highlight recommended option
- Responsive (stack on mobile)
- Expandable details

### Implementation Notes
```typescript
interface LicenseComparison {
  name: string
  price: number
  features: {
    label: string
    included: boolean
    details?: string
  }[]
  recommended?: boolean
}
```

### Files to Create
- `src/components/shared/LicenseComparisonTable.tsx`
- `src/lib/mock/licenseComparison.ts`

---

## 20. Feedback Widget ❌

### Status
- **Component implemented:** ❌ No
- **Priority:** 🟢 Low

### Description
In-app feedback mechanism for bug reports, feature requests, and general feedback.

### Use Cases
- Report bugs
- Request features
- General feedback
- Rate experience
- Contact support

### Requirements
- Floating button (bottom-right)
- Feedback form
- Screenshot capture
- Category selection (bug, feature, feedback)
- Email notification
- Feedback history
- Status tracking

### Implementation Notes
```typescript
interface FeedbackSubmission {
  type: 'bug' | 'feature' | 'feedback'
  message: string
  screenshot?: string
  url: string
  userAgent: string
  email?: string
}
```

### Files to Create
- `src/components/shared/FeedbackWidget.tsx`
- `src/components/shared/Modals/FeedbackModal.tsx`
- `src/lib/feedbackCapture.ts`

---

## Priority Matrix

### 🔴 High Priority (Build Now)
1. **Toast System** - Essential for user feedback
2. **Error Boundary** - Prevents app crashes
3. **Confirmation Dialog** - Reusable for dangerous actions
4. **Pagination Component** - Better UX for large datasets
5. **Cookie Consent** - Legal requirement (GDPR)

### 🟡 Medium Priority (Build Soon)
6. **Onboarding Flow** - Improves new user experience
7. **Bulk Actions** - Power user feature
8. **Keyboard Shortcuts** - Accessibility & efficiency
9. **Contextual Help** - Reduces support burden
10. **Progress Indicators** - Better multi-step UX
11. **Rate Limiting Feedback** - Better error handling
12. **Asset Comparison Table** - Helps decision making

### 🟢 Low Priority (Nice to Have)
13. **Drag & Drop Reordering** - Enhanced UX
14. **Asset Comparison View** - Advanced feature
15. **Quick Actions Menu** - Power user feature
16. **Offline State** - PWA enhancement
17. **Maintenance Banner** - Operational tool
18. **Referral System** - Growth feature
19. **Feedback Widget** - Support tool

---

## Implementation Roadmap

### Phase 1: Critical Components (Week 1-2)
- [ ] Toast System
- [ ] Error Boundary
- [ ] Confirmation Dialog
- [ ] Cookie Consent Banner

### Phase 2: Core UX Improvements (Week 3-4)
- [ ] Pagination Component
- [ ] Loading States (Spinner, Skeleton)
- [ ] Contextual Tooltips
- [ ] Rate Limiting Feedback

### Phase 3: Enhanced Features (Week 5-6)
- [ ] Onboarding Flow
- [ ] Keyboard Shortcuts
- [ ] Bulk Actions UI
- [ ] Progress Indicators

### Phase 4: Advanced Features (Week 7-8)
- [ ] Asset Comparison Table
- [ ] Drag & Drop Reordering
- [ ] Quick Actions Menu
- [ ] Feedback Widget

### Phase 5: Growth & Optimization (Week 9-10)
- [ ] Referral System
- [ ] Offline State
- [ ] Maintenance Banner
- [ ] Asset Comparison View

---

## Technical Considerations

### State Management
- Use Zustand for global state (toasts, modals, onboarding)
- Use React Context for component-level state
- Consider Jotai for atomic state management

### Accessibility
- All components must be keyboard accessible
- ARIA labels and roles
- Focus management
- Screen reader support
- Color contrast compliance (WCAG AA)

### Performance
- Lazy load heavy components
- Virtual scrolling for long lists
- Debounce/throttle user inputs
- Optimize animations (use CSS transforms)
- Code splitting

### Testing
- Unit tests for utility functions
- Component tests with React Testing Library
- E2E tests for critical flows
- Accessibility tests with axe-core

### Documentation
- Component API documentation
- Usage examples
- Storybook stories
- Accessibility guidelines

---

## Conclusion

This document outlines 20 missing UI components and patterns that would significantly enhance the 234photos platform. The priority matrix and implementation roadmap provide a structured approach to building these features over time.

**Next Steps:**
1. Review and approve priority rankings
2. Assign components to development sprints
3. Create detailed technical specifications for Phase 1 components
4. Begin implementation starting with Toast System and Error Boundary

**Document Maintenance:**
- Update status as components are implemented
- Add new missing components as discovered
- Revise priorities based on user feedback
- Track implementation progress

---

**Last Updated:** April 23, 2026  
**Next Review:** May 1, 2026
