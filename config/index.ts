// Application configuration

export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    cdnUrl: process.env.NEXT_PUBLIC_CDN_URL || "https://cdn.234photos.com",
    tusEndpoint: process.env.NEXT_PUBLIC_TUS_ENDPOINT || "http://localhost:3000/api/upload",
  },
  
  auth: {
    url: process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000/api/auth",
  },
  
  analytics: {
    posthog: {
      key: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    },
  },
  
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "",
  },
  
  payment: {
    stripe: {
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
    },
    flutterwave: {
      publicKey: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
    },
  },
  
  upload: {
    maxFileSize: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || "4294967296"),
    maxBatchUpload: parseInt(process.env.NEXT_PUBLIC_MAX_BATCH_UPLOAD || "100"),
  },
  
  features: {
    visualSearch: process.env.NEXT_PUBLIC_ENABLE_VISUAL_SEARCH === "true",
    boards: process.env.NEXT_PUBLIC_ENABLE_BOARDS === "true",
    sso: process.env.NEXT_PUBLIC_ENABLE_SSO === "true",
  },
  
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;
