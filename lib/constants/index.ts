// App constants

export const APP_NAME = "234photos";
export const APP_DESCRIPTION = "Africa's Stock Media Marketplace";

export const MEDIA_TYPES = ["photo", "video", "vector", "illustration"] as const;
export const ORIENTATIONS = ["horizontal", "vertical", "square"] as const;
export const LICENSE_TYPES = ["standard", "enhanced", "editorial"] as const;

export const SUPPORTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
export const SUPPORTED_VIDEO_FORMATS = ["video/mp4", "video/quicktime"];

export const MAX_FILE_SIZE = 4 * 1024 * 1024 * 1024; // 4GB
export const MAX_BATCH_UPLOAD = 100;

export const CURRENCIES = {
  NGN: { symbol: "₦", name: "Nigerian Naira" },
  GHS: { symbol: "₵", name: "Ghanaian Cedi" },
  KES: { symbol: "KSh", name: "Kenyan Shilling" },
  ZAR: { symbol: "R", name: "South African Rand" },
  USD: { symbol: "$", name: "US Dollar" },
} as const;

export const COUNTRIES = [
  { code: "NG", name: "Nigeria", currency: "NGN" },
  { code: "GH", name: "Ghana", currency: "GHS" },
  { code: "KE", name: "Kenya", currency: "KES" },
  { code: "ZA", name: "South Africa", currency: "ZAR" },
  { code: "EG", name: "Egypt", currency: "USD" },
  { code: "MA", name: "Morocco", currency: "USD" },
  { code: "ET", name: "Ethiopia", currency: "USD" },
  { code: "TZ", name: "Tanzania", currency: "USD" },
  { code: "UG", name: "Uganda", currency: "USD" },
  { code: "RW", name: "Rwanda", currency: "USD" },
] as const;

export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  ASSET_DETAIL: "/asset",
  CONTRIBUTOR_DASHBOARD: "/contributor/dashboard",
  CONTRIBUTOR_UPLOAD: "/contributor/upload",
  CONTRIBUTOR_PORTFOLIO: "/contributor/portfolio",
  BUYER_BOARDS: "/buyer/boards",
  BUYER_ACCOUNT: "/buyer/account",
  ENTERPRISE_TEAM: "/enterprise/team",
  ENTERPRISE_BILLING: "/enterprise/billing",
  ADMIN_MODERATION: "/admin/moderation",
  ADMIN_LIQUIDITY: "/admin/liquidity",
} as const;

export const API_ENDPOINTS = {
  SEARCH: "/api/search",
  ASSETS: "/api/assets",
  UPLOAD: "/api/upload",
  BOARDS: "/api/boards",
  NOTIFICATIONS: "/api/notifications",
  EARNINGS: "/api/contributor/earnings",
} as const;

export const PERFORMANCE_BUDGETS = {
  INITIAL_JS_BUNDLE: 200 * 1024, // 200KB gzipped
  TOTAL_JS: 500 * 1024, // 500KB
  CRITICAL_CSS: 50 * 1024, // 50KB
  LCP_TARGET: 2500, // 2.5s
  FCP_TARGET: 1800, // 1.8s
  TTI_TARGET: 3500, // 3.5s
  CLS_TARGET: 0.1,
} as const;
