# 234photos Frontend - State Management & Mock Data

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

## Type System

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

**All types exported from `src/types/index.ts`**

---

## Mock Data

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

## Next Steps

- **Overview:** See [01_OVERVIEW.md](./01_OVERVIEW.md)
- **Components:** See [07_COMPONENTS.md](./07_COMPONENTS.md)
