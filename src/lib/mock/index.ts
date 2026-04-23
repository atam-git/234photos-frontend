/**
 * Centralized mock data exports
 * All mock data uses types from @/types
 */

// Users (comprehensive)
export * from './users'

// Assets
export * from './assets'
export * from './assetDetail'

// Collections & Boards
export * from './collections'
export * from './boards'

// Transactions
export * from './transactions'

// Notifications
export * from './notifications'

// Content (Articles, Editorial, Campaigns)
export * from './content'

// Contributors (for backward compatibility - data is in users.ts)
export { 
  CONTRIBUTORS,
  NAME_TO_USERNAME,
  getContributor,
  getContributorByName,
  getContributorAvatar,
  getContributorUsername,
} from './contributors'

// Analytics & Stats
export * from './analytics'

// Leaderboard
export * from './leaderboard'

// Backward compatibility exports
export { MOCK_BUYER_USER as MOCK_USER } from './users'
export { MOCK_ASSETS as MOCK_ASSETS_SEARCH } from './searchAssets'
export { MOCK_ARTICLES as ARTICLES, getArticleBySlug as getArticle } from './content'

// Marketing & Dashboard data
export * from './marketing'
export * from './dashboard'

// Billing & Earnings
export * from './billing'
export * from './earnings'

// Discover feed
export * from './discover'

// UI components data
export * from './ui'

// Blog & Editorial
export * from './blog'

// Boards & Collections
export * from './boards'

// My Assets (contributor dashboard)
export * from './myAssets'
