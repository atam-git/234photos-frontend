# 234photos — Backend Engineering PRD

### TL;DR

This document provides the complete backend engineering specification for 234photos—Africa’s next-generation stock media marketplace. It covers all aspects of backend design and delivery: Node.js/Next.js API layer, tRPC routes, microservice architecture (worker jobs), PostgreSQL database with Prisma ORM, asynchronous jobs with BullMQ, payment integrations, AI/ML pipelines, real-time systems, security, CDN, and cloud infrastructure. All details are consolidated from the Series A-ready master PRD with complete gap closure and best-in-class operational, quality, and compliance strategies.

---

## Goals

### Business Goals

* Achieve search API p95 latencies under 50ms (cache hit) and under 150ms (cold) through aggressive caching and optimized ranking.

* Maintain 99.95% API uptime, even under burst load, through horizontal scaling.

* Guarantee atomic quota enforcement for concurrent downloads—zero race conditions tolerated.

* Lower chargeback rate to less than 0.5% through robust refund-abuse controls.

* Sustain a Supply Coverage Score greater than 95% to ensure customers can reliably find relevant content.

* Achieve upload speeds of 10MB/s+ for African contributors through direct-to-S3 uploads with Transfer Acceleration.

### User Goals

* Guarantee that all paid downloads serve a reliable, signed S3 URL with expiry.

* Display user and contributor wallets/payouts with real-time accuracy and no double-counting.

* Calculate and distribute royalties automatically on every edge case (refunds, reversals, bonus campaigns).

* Provide contributors with instant notifications of sales, earnings, and approvals.

* Remove all traces of PII/EXIF before asset exposure while upholding privacy and local regulations.

### Non-Goals

* No frontend application work: no assets, no pages, no CSS/JS/React here.

* No training of proprietary ML models (OpenAI, CLIP, and CNNDetect are all integrated as third-party).

* No management of physical infrastructure: all services are cloud-managed (SaaS/PaaS).

---

## User Stories

### Contributor (Photographer/Uploader)

* As a contributor, I want to bulk upload photos using resumable multipart uploads (S3 multipart with client-side chunking), so that I never lose progress due to network interruptions.

* As a contributor, I want my uploads to be processed automatically with AI scoring and tagging, so my content is accurately searchable.

* As a contributor, I want instant notification on asset approval/rejection and sales, so I can improve and celebrate milestones.

* As a contributor, I want payout batch jobs to automatically aggregate and disburse my month’s earnings (Flutterwave (with Stripe as international fallback)), so I am paid efficiently and transparently.

* As a contributor, I want to see personalized content requests (gap lists) and earn bonuses for filling supply gaps.

### Customer (Creative/Agency)

* As a customer, I want to search and instantly preview African-centric assets, so my projects reflect my brand’s target market.

* As a customer, I want concurrent, quota-safe downloads for team usage, so I never hit arbitrary limits.

* As a customer, I want to receive a legal license PDF with every download for compliance.

* As a customer, I want all sensitive asset EXIF and GPS data removed before files are delivered.

### Search System

* As a search operator, I want every asset indexed in Meilisearch and CLIP embeddings in Pinecone, so queries are always fresh and semantically rich.

* As a user, I need results ranked using a weighted algorithm accounting for relevance, recency, popularity, and my own history.

### Admin

* As an admin, I want access to a liquidity dashboard tracking coverage, trends, and campaigns.

* As an admin, I need to review moderation and audit logs.

* As an admin, I want to push campaigns/notifications to contributors to direct supply where needed.

### Enterprise/B2B

* As an enterprise admin, I want SSO onboarding (SAML2/OIDC, SCIM), so my team can join with corporate identity.

* As an enterprise admin, I want shared and per-member quota enforcement.

* As an enterprise admin, I want analytics on usage and team spend.

### Developer API Consumer

* As a developer, I want robust, rate-limited REST endpoints, so I can integrate 234photos into my app.

* As a developer, I need webhook events on asset and purchase actions, with secure delivery and signed payloads.

* As a developer, I want API key management and abuse protection.

---

## Functional Requirements

### Authentication & Session Management (Priority: P0)

* NextAuth.js v5 JWT RS256 with refresh token rotation

* Redis-backed token revocation

* Google OAuth, API keys (Bcrypt), CSRF protection

### Asset Upload & Processing Pipeline (P0)

**Upload Architecture for African Networks:**

* **Resumable multipart uploads** using S3 multipart upload protocol (NOT pre-signed POST)
  * Client-side chunking: 5MB default, adaptive (1MB for slow, 10MB for fast connections)
  * Each chunk gets pre-signed PUT URL with 1-hour expiry
  * Automatic retry with exponential backoff (3 attempts per chunk)
  * Progress tracking in IndexedDB for resume after browser close
  * S3 Transfer Acceleration enabled for Lagos/Nairobi/Johannesburg regions

* **Upload Flow:**
  1. `POST /api/upload/initiate` → Returns `{ uploadId, partUrls[], chunkSize }`
  2. Client uploads chunks: `PUT partUrls[0]`, `PUT partUrls[1]`... with retry logic
  3. Client tracks progress in IndexedDB: `{ uploadId, completedParts: [1,2,3] }`
  4. `POST /api/upload/complete` → S3 CompleteMultipartUpload + trigger processing
  5. If interrupted: `POST /api/upload/resume` → Returns remaining partUrls

* **Network Resilience:**
  * Bandwidth detection: Test upload 100KB, adjust chunk size accordingly
  * Packet loss handling: Retry failed chunks up to 3 times
  * Connection timeout: 60 seconds per chunk (not per file)
  * Offline queue: Service worker queues uploads, resumes when online
  * Upload verification: MD5 checksum per chunk

* **Processing Pipeline (BullMQ):**
  * **Priority 1 (blocking):** EXIF removal (5s), watermark (3s), thumbnail generation (5s)
  * **Priority 2 (async):** Color extraction (2s), quality scoring (10s), NSFW detection (5s)
  * **Priority 3 (batch):** Duplicate detection via pHash (weekly job)
  * All jobs run in parallel where possible
  * Failed jobs retry 3 times with exponential backoff
  * Dead letter queue for manual review after 3 failures

* **Upload Limits:**
  * Max file size: 4GB per file
  * Max files per batch: 100
  * Max daily uploads: 500 files per contributor
  * Supported formats: JPG, PNG, WebP, MP4, MOV (video deferred to P1)

* **Deferred to Phase 2:** 
  * CLIP embeddings for semantic search
  * FFmpeg video transcoding
  * AI-powered tagging (OpenAI)

### Search API & Ranking (P0)

**Search Architecture for <50ms Cache Hit, <150ms Cold:**

* **Meilisearch Configuration:**
  * All ranking done in Meilisearch (NO Node.js post-processing)
  * Built-in ranking: words > typo > proximity > attribute > sort > exactness
  * Custom sort attributes: downloads:desc, views:desc, created_at:desc, quality_score:desc
  * Faceted search for filters (pre-computed, cached separately)

* **Query Normalization (Critical for Cache Hit Rate):**
  * Lowercase all queries: "Lagos Skyline" → "lagos skyline"
  * Trim whitespace: "lagos  skyline " → "lagos skyline"
  * Sort filter keys alphabetically: `{type:'image',license:'standard'}` → consistent cache key
  * Remove empty filters before caching
  * Target: >80% cache hit rate (vs <30% without normalization)

* **Multi-Layer Caching Strategy:**
  
  **Layer 1: Redis (Hot Queries)**
  * Popular queries: 1 hour TTL (not 5 minutes)
  * Cache key: `search:${normalizedQuery}:${sortedFilters}:${page}`
  * Stale-while-revalidate: Serve stale cache immediately, refresh in background
  * Cache warming: Pre-cache top 100 queries on deploy
  * Estimated hit rate: 70-80% for popular queries
  
  **Layer 2: Facets Cache**
  * Separate cache for facets (categories, file types, contributors)
  * TTL: 1 hour (facets change slowly)
  * Cache key: `facets:${filters}`
  * Reduces query time by 30-50ms
  
  **Layer 3: CDN (Removed)**
  * ❌ CDN caching for search removed (5% hit rate, waste of money)
  * ✅ CDN only for static assets (thumbnails, previews)

* **Cache Stampede Prevention:**
  * Use Redis SETNX for lock: Only one request refreshes cache
  * Other requests wait max 100ms, then serve stale cache
  * Background job refreshes popular queries every 30 minutes

* **Asset Detail Page Optimization:**
  * **Problem:** 4 parallel fetches = 400ms minimum
  * **Solution:** Single aggregation endpoint
  * `GET /api/assets/:id?include=similar,contributor,profile`
  * Returns all data in one query using Prisma aggregation with includes
  * Target: <150ms for complete page load

* **Search Query Example:**
```javascript
// Normalized cache key
const cacheKey = `search:${query.toLowerCase().trim()}:${JSON.stringify(sortFilters(filters))}:${page}`

// Check cache with stale-while-revalidate
const cached = await redis.get(cacheKey)
if (cached) {
  const age = Date.now() - cached.timestamp
  if (age < 3600000) { // 1 hour
    return cached.data // Fresh
  } else if (age < 7200000) { // 2 hours
    // Stale but acceptable, refresh in background
    refreshCacheInBackground(cacheKey, query, filters)
    return cached.data
  }
}

// Cache miss: Query Meilisearch
const results = await meilisearch.search(query, filters)
await redis.setex(cacheKey, 3600, { data: results, timestamp: Date.now() })
```

* **Performance Targets:**
  * Cache hit: 30-50ms (Redis GET + JSON parse)
  * Cache miss: 120-150ms (Meilisearch query + Redis SET)
  * Asset detail: 100-150ms (single aggregation query)

* All searches logged to `search_logs` (async write, non-blocking), automatic zero-result detection, content gap creation

### Download System (P0)

**Download Architecture for <200ms Initiation:**

* **Quota Management with Transaction Safety:**
  ```javascript
  // Step 1: Check quota (non-blocking)
  const credits = await redis.get(`credits:${userId}`)
  if (credits < 1) throw new Error('Insufficient credits')
  
  // Step 2: Create pending download record (PostgreSQL via Prisma)
  const download = await prisma.download.create({
    data: {
      userId,
      assetId,
      status: 'pending',
      createdAt: new Date()
    }
  })
  
  // Step 3: Atomic decrement (Redis DECR)
  const remaining = await redis.decr(`credits:${userId}`)
  if (remaining < 0) {
    // Rollback: Refund credit
    await redis.incr(`credits:${userId}`)
    await prisma.download.delete({ where: { id: download.id } })
    throw new Error('Concurrent download conflict')
  }
  
  // Step 4: Generate S3 signed URL (1 hour expiry, not 15min)
  const downloadUrl = s3.getSignedUrl('getObject', {
    Bucket: 'assets',
    Key: assetKey,
    Expires: 3600, // 1 hour for slow connections
    ResponseContentDisposition: `attachment; filename="${asset.title}.jpg"`
  })
  
  // Step 5: Generate license PDF (synchronous, <500ms)
  const licensePdf = await generateLicensePDF({
    asset,
    user,
    licenseType,
    downloadDate: new Date()
  })
  const licenseUrl = await uploadToS3(licensePdf)
  
  // Step 6: Update download record
  await prisma.download.update({
    where: { id: download.id },
    data: { 
      status: 'active',
      downloadUrl,
      licenseUrl,
      expiresAt: new Date(Date.now() + 3600000)
    }
  })
  
  // Step 7: Credit contributor (async)
  await queue.add('credit-contributor', {
    contributorId: asset.contributorId,
    amount: calculateEarnings(licenseType),
    assetId,
    downloadId: download.id
  })
  
  return { downloadUrl, licenseUrl, expiresAt }
  ```

* **Download Resume Support:**
  * S3 signed URLs support Range requests automatically
  * Client can resume with `Range: bytes=1000000-` header
  * No backend changes needed

* **Download Verification:**
  * Background job checks S3 CloudWatch logs
  * Marks download as 'completed' when S3 logs show successful transfer
  * Used for accurate analytics (not billing)

* **License PDF Generation:**
  * Synchronous generation using PDFKit (<500ms)
  * Template includes: asset preview, license terms, user info, download date
  * Stored in S3 with 7-day expiry (user can re-download from history)

* **Error Handling:**
  * If S3 URL generation fails: Refund credit, delete download record
  * If license PDF fails: Still allow download, generate PDF async
  * If contributor credit fails: Retry 3 times, alert admin

* **Performance Targets:**
  * Quota check: 5-10ms (Redis GET)
  * Download record: 20-30ms (PostgreSQL INSERT via Prisma)
  * Credit decrement: 5-10ms (Redis DECR)
  * S3 signed URL: 10-20ms
  * License PDF: 300-500ms (synchronous)
  * **Total: 340-570ms** (within <200ms for URL generation, PDF can be async if needed)

* **Rate Limiting:**
  * Max 10 downloads per minute per user
  * Max 100 downloads per hour per user
  * Prevents abuse and DOS attacks

### Payment Processing (P0)

* **Flutterwave primary** for Nigerian/African transactions (better local payment methods, lower fees, faster settlements)

* **Stripe secondary** for international transactions and as fallback

* Flutterwave for contributor payouts (bank transfer, mobile money)

* Webhook event handling, idempotency keys, chargeback/refund/abuse controls

* **Deferred to P1:** Stripe Tax (VAT/GST) automation - start with manual tax handling

### Recommendation Engine (P1)

* CLIP embeddings in Pinecone

* “Similar Assets” (top 20 cosine sim, Redis cached)

* “Recommended For You” (hybrid: 60% content, 40% collaborative; batch update; Redis cached)

* Trending formulas (downloads, CTR, temporal)

### Marketplace Liquidity Engine (P1)

* Daily calculation of Supply Coverage Score

* Zero-result pipeline to flag demand gaps, auto-suggest to contributors

* Bonus payouts for high-demand content

* Demand-digest to contributors/admin weekly

### Notification System (P1)

* **Phase 1 (Launch):** Email (Resend with 7 core templates) + in-app notifications

  * Core templates: Welcome, Asset Approved/Rejected, Sale Made, Payout Processed, Download Receipt, Password Reset, Weekly Digest

* In-app notifications stored in `notifications` table with read tracking

* **Phase 1 includes** lightweight polling (30-second interval) for notification count. **Deferred to P2:** Real-time SSE endpoints, Redis pub/sub, push notifications

* Email delivery via BullMQ jobs with retry logic

### Gamification & Growth Mechanics (P1)

* Event-driven badge and streak engine (15 badge types, milestones)

* Leaderboards (by country/topic), upload streak tracking, weekly digests, campaign events

### Payout Processing (P1)

* **Weekly batch earnings computation** (every Monday) with minimum threshold (₦80,000)

* Flutterwave transfers (bank transfer, mobile money) with state machine (pending/processing/completed/failed)

* Automatic retry logic for failed payouts, contributor notification on all state changes

* Admin dashboard for manual payout review and approval

### Enterprise & SSO (P3 - Post-Launch)

* **Deferred to post-launch** - focus on core marketplace first

* SAML2/OIDC login, JIT user provisioning; SCIM for offboarding

* Quota logic for team, pooled vs. per-user

* Centralized billing

### Developer API (P2 - Simplified)

* `/api/v1/` REST endpoints for search, asset details, download (authenticated via API keys)

* **Deferred to P3:** Webhooks, HMAC signatures, advanced integrations

* Focus on internal API performance first, public API second

### Rate Limiting & Abuse Protection (P2)

* Redis token bucket for all routes (full table)

* Cloudflare WAF, anomaly & bot detection, refund/credential sharing abuse

### Data Model (Cross-Priority)

* All primary collections (assets, downloads, contributors, users, payout_jobs, moderation_logs, search_logs, notifications, enterprise_teams, boards, reviews, API keys, etc.)

* S3 versioning/backup, EXIF/GPS compliance, legal jurisdiction flag per asset/user

---

## User Experience

**Entry Point & First-Time User Experience**

* API keys generated via secure dashboard for developers; onboarding/walkthrough emailed

* Sandbox environment available for integrations; OpenAPI 3.0 doc at `/api/docs`

* Swagger UI for interactive API testing and documentation

**Core Experience**

* **Step 1: Asset Upload**

  * Contributor initiates upload via pre-signed S3 POST URL with Transfer Acceleration; client handles chunking with progress tracking.

  * Backend verifies file integrity, schedules BullMQ jobs.

  * Jobs: EXIF removal, watermarking, thumbnail/previews, video transcode, pHash for deduplication, AI scoring/classification, CLIP tagging, moderation queuing.

  * Success: contributor notified, asset available for moderation/approval.

* **Step 2: Search**

  * Customer enters query, backend logs search in `search_logs`, auto-flags zero results.

  * Query parsed by Meilisearch, ranked; post-query re-ranking layer applies weighted/dynamic adjustments.

  * Personalization overlays (user download/board history).

  * Search result cached and streamed with latency <100ms (hit) / 300ms (cold); CDN cache applied where possible.

* **Step 3: Download**

  * Customer authenticated and plan/quota validated; Redis DECR used for atomic consistency.

  * Download record created; signed S3 URL (15min valid) generated.

  * License PDF job triggered asynchronously; contributor earnings credited.

  * SSE/in-app/email notification delivered.

* **Step 4: Payments**

  * Webhook from Stripe/Flutterwave received, signature/idempotency verified.

  * Purchase/subscription state updated; downstream effects (quota grant, earnings, confirmation email).

* **Step 5: Payouts**

  * Every Monday, batch job aggregates contributor earnings (reversals/threshold/minimum applied).

  * Payout attempt via Flutterwave (bank transfer/mobile money); state machine updated (pending/completed/failed).

  * Contributors notified of payout.

* **Step 6: Notifications**

  * Fan-out via Redis pub/sub; PostgreSQL write via Prisma, SSE pushes, Resend email job.

  * Error handling: failed deliveries retried with exponential backoff and alerting.

**Advanced & Edge Flows**

* Protection against upload flooding (100/day cap), download anomalies, bot/credential sharing via WAF and backend logic.

* Refund and payout abuse detection.

* S3 cross-region replication and auto-backup, Glacier tier for deleted assets.

* pHash duplicate asset detection at scale (dedicated index for Hamming <8).

* EXIF/gps removal before any asset exposed or served via search/download.

**UI/UX Highlights**

* Consistent error envelope (error codes, tracing, retry guidance)

* X-Request-ID propagation for traceability in all logs/responses

* Rate limit headers and Retry-After for all rate-limited endpoints

* Distributed tracing enabled for all async job execution

---

## Narrative

Fatima, a Nairobi-based photographer, uploads 50 high-resolution photos to 234photos using the bulk upload API. On the backend, each file chunk lands directly in S3 with resumable guarantees. BullMQ jobs process every image within 60 seconds: EXIF data is stripped for privacy, duplicates flagged via pHash, watermarks and thumbnails are created, and each image is passed through proprietary and third-party AI for quality rating, auto-tagging, and NSFW checks. Moderators receive an instant notification and can approve images with one keystroke via the dashboard. Upon approval, assets are indexed immediately in Meilisearch and vectorized in Pinecone. Trending and liquidity scoring algorithms identify that three images match urgent search demand—these get a 1.5× bonus and are fast-tracked to top search slots and contributor bonuses.

Moments later, Adaeze in London runs a “Lagos cityscape” search: the ranked pipeline returns Fatima’s images at the top, using a weighted, user-personalized formula. When Adaeze downloads, the backend manages quota in a race-proof way, generates a signed S3 URL, logs the transaction, and triggers license PDF generation. Fatima instantly receives an SSE notification and watches her earnings update in real time. Refund monitoring, duplicate checks, and abuse controls ensure payouts are robust and the marketplace remains healthy as it scales.

---

## Success Metrics

### Tracking Plan (Key Event Instrumentation)

* upload_pipeline_completed (timing, success/fail)

* moderation_decision (approve/reject/reason)

* download_initiated (user, asset, quota state)

* payment_webhook_received (event, verification status)

* payout_job_run (results, stats)

* badge_awarded (type, recipient)

* liquidity_campaign_tagged (asset, reward)

* webhook_delivery_attempt (success/failure)

* rate_limit_triggered (route, actor)

* abuse_flag_raised

---

## Technical Considerations

### Technical Needs

* Node.js 20+ runtime; Next.js 15 for API/tRPC router endpoints.

* Standalone worker microservice (Dockerized, Railway) for CPU/gpu jobs (Sharp.js, FFmpeg, CLIP, pHash).

* BullMQ orchestration for jobs (uploads, AI, PDFs, payout, discovery).

* NextAuth.js v5 with advanced session, CSRF, Google OAuth, API key auth.

* PostgreSQL with Prisma ORM for all relational data (assets, downloads, users, contributors, notifications, enterprise_teams, boards, reviews, search_logs, moderation_logs, etc.)

* Redis/Upstash for cache, token bucket, queue, and pub/sub.

* Meilisearch and Pinecone for search & vector semantics.

* PDFKit, Resend, and S3 with CRR and Glacier for robust storage & delivery.

### Integration Points

* Stripe/Stripe Connect/Stripe Tax

* Flutterwave

* SAML/OIDC/SCIM (passport-saml, openid-client)

* Pinecone, Meilisearch, OpenAI API

* Cloudflare WAF (bot/abuse layer), Turnstile

* Sentry (errors), Axiom (logs), PostHog (analytics)

* Resend (email)

### Data Storage & Privacy

* All PII/asset data encrypted at rest (PostgreSQL with encryption at rest, S3 SSE-KMS).

* EXIF removal prior to public exposure.

* Never store GPS on publicly accessible assets.

* Hashed refresh tokens in Redis (not database).

* API keys stored Bcrypt hashed.

* Data routing and legal compliance per-user/asset region (NDPR, GDPR, CCPA).

### Scalability & Performance

* BullMQ worker concurrency per job type (e.g., upload 5, email 50, payout 1).

* Worker auto-scaling via Railway.

* PostgreSQL with connection pooling (PgBouncer)/Pinecone/Redis/Upstash auto-scale.

* S3 CRR + Glacier for rapid backup/recovery.

* CDN (Cloudflare) for asset delivery—cache rules per asset/previews/thumbnails/responses (30d/7d/60s).

### Potential Challenges

* High-velocity CLIP/Pinecone inference at scale (batch/gpu required at 1M+).

* FFmpeg memory spikes with 4K video (resource limits, OOM protection).

* pHash deduplication performance—dedicated index and batching.

* Stripe Connect KYC latency for African contributors—need fallback.

* Legal compliance across Africa/EU/US for asset retention/deletion.

---

## Milestones & Sequencing

### Project Estimate

* Large: 10–14 weeks

### Team Size & Composition

* Medium Team: 2 backend engineers + 1 DevOps/infra engineer (part-time during initial and final weeks)

* Startup mentality: fast, highly cross-functional, minimal overhead

### Suggested Phases

**Phase 1: Schema & Auth Foundations (Weeks 1–3)**

* PostgreSQL schema + Prisma migrations (all tables with indexes)

* NextAuth.js v5/JWT/refresh+revocation, Google OAuth, tRPC scaffold, API key auth, CSRF

* GitHub Actions pipeline with lint, typecheck, unit tests; staging env

  * Dependencies: Confirm design; cloud infra provisioned

**Phase 2: Upload Pipeline & Worker Jobs (Weeks 4–6)**

* S3 multipart with pre-signed URLs, BullMQ workers (Sharp, FFmpeg, pHash, CLIP, quality, moderation)

* EXIF removal, abuse/duplicate detection, S3 CRR/Glacier backup

  * Dependencies: Phase 1 complete

**Phase 3: Search, Payment, Download Core (Weeks 7–9)**

* Full-text search (BM25), re-ranking engine, personalization overlays

* Stripe/Flutterwave integration (webhook, event flow), Redis quota logic

* S3 signed URL downloads, PDFKit license gen, Resend email, notification fan-out (SSE/Redis)

  * Dependencies: Prior phases complete

**Phase 4: Recommendation, Liquidity, Gamification (Weeks 10–12)**

* Pinecone embedding, similar & recommended-for-you flows, trending formulas

* Supply coverage calculation, demand gaps, bonus tagging, campaign emails/notifs

* Badge, leaderboard, streak digests, payout job & document state machine

**Phase 5: Enterprise, API Public, Hardening (Weeks 13–14)**

* SAML/OIDC SSO, SCIM endpoint, enterprise quota/pool logic

* REST API at `/v1`, webhook with HMAC/abuse/rate limits, dashboard reporting endpoints

* k6 load tests, Sentry, Axiom, full observability and WAF go-live

---

## Performance Optimization Strategy (CRITICAL)

### Upload Speed Optimizations

* **Direct-to-S3 uploads** using pre-signed POST URLs - files never touch Node.js server
* **S3 Transfer Acceleration** enabled for all African regions (Lagos, Nairobi, Johannesburg)
* **Multipart uploads** for files >5MB with automatic retry logic
* **Client-side chunking** with progress tracking and resume capability
* Target: 10MB/s+ upload speeds from Lagos/Nairobi

### Search Speed Optimizations

* **Meilisearch custom ranking rules** - all ranking logic in Meilisearch, not Node.js post-processing
* **Aggressive Redis caching:**
  * Popular queries: 5-minute TTL
  * Asset details: 15-minute TTL
  * Contributor profiles: 30-minute TTL
  * Trending assets: 1-hour TTL
* **CDN caching** (Cloudflare):
  * Search API responses: 60-second TTL with stale-while-revalidate
  * Asset thumbnails/previews: 30-day TTL
  * Asset metadata: 7-day TTL
* **Response compression:** Brotli for API responses (60-70% size reduction)
* Target: <50ms cache hit, <150ms cold query

### Database Speed Optimizations

**PostgreSQL Architecture for <100ms Queries:**

* **Schema Design with Prisma ORM:**

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Users & Authentication
model User {
  id                    String    @id @default(uuid())
  email                 String    @unique
  name                  String
  username              String    @unique
  avatar                String?
  role                  Role      @default(CUSTOMER)
  country               String?
  countryFlag           String?
  credits               Int       @default(0)
  joinedYear            Int
  isContributorApproved Boolean   @default(false)
  
  // Profile fields (JSONB for flexibility)
  profile               Json?     // {bio, location, website, instagram, etc}
  
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  
  // Relations
  assets                Asset[]
  downloads             Download[]
  boards                Board[]
  notifications         Notification[]
  transactions          Transaction[]
  earnings              Earning[]
  
  @@index([email])
  @@index([username])
  @@index([role, isContributorApproved])
}

enum Role {
  CUSTOMER
  CONTRIBUTOR
  ADMIN
}

// Assets
model Asset {
  id              String   @id @default(uuid())
  title           String
  slug            String   @unique
  description     String?
  
  contributorId   String
  contributor     User     @relation(fields: [contributorId], references: [id])
  
  // File info
  fileType        String
  mimeType        String
  fileSize        String
  dimensions      String
  aspectRatio     Float?
  resolution      String?
  
  // URLs
  src             String
  thumbnailUrl    String
  previewUrl      String
  watermarkedUrl  String
  originalUrl     String?
  
  // Classification (JSONB for flexibility)
  metadata        Json     // {tags, colors, category, etc}
  
  // Licensing
  license         String
  isEditorial     Boolean  @default(false)
  isAI            Boolean  @default(false)
  isFree          Boolean  @default(false)
  modelRelease    Boolean  @default(false)
  propertyRelease Boolean  @default(false)
  
  // Pricing (in kobo)
  prices          Json     // {standard, enhanced, editorial}
  
  // Stats (updated periodically from Redis)
  stats           Json     // {views, downloads, likes, earnings}
  
  // Status
  status          AssetStatus @default(PENDING)
  rejectionReason String?
  
  uploadedAt      DateTime @default(now())
  publishedAt     DateTime?
  updatedAt       DateTime @updatedAt
  
  // Relations
  downloads       Download[]
  earnings        Earning[]
  
  @@index([contributorId, status, uploadedAt(sort: Desc)])
  @@index([status, uploadedAt(sort: Desc)])
  @@index([status, fileType, uploadedAt(sort: Desc)])
  @@fulltext([title, description])
}

enum AssetStatus {
  PENDING
  APPROVED
  REJECTED
  ARCHIVED
}

// Downloads
model Download {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  assetId     String
  asset       Asset    @relation(fields: [assetId], references: [id])
  
  licenseType String
  format      String
  size        String
  creditsCost Int
  
  downloadUrl String
  licenseUrl  String?
  expiresAt   DateTime?
  
  status      DownloadStatus @default(PENDING)
  downloadedAt DateTime @default(now())
  
  @@index([userId, downloadedAt(sort: Desc)])
  @@index([assetId, status])
}

enum DownloadStatus {
  PENDING
  ACTIVE
  COMPLETED
  EXPIRED
}

// Boards (saved collections)
model Board {
  id          String   @id @default(uuid())
  name        String
  description String?
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  assetIds    String[] // Array of asset IDs
  type        BoardType @default(PRIVATE)
  
  collaborators Json?  // [{userId, role, addedAt}]
  shareLink     String?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([userId, updatedAt(sort: Desc)])
}

enum BoardType {
  PRIVATE
  SHARED
  TEAM
}

// Transactions
model Transaction {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  type        TransactionType
  amount      Int      // In kobo
  currency    String   @default("NGN")
  credits     Int?
  
  status      TransactionStatus @default(PENDING)
  description String
  metadata    Json?
  
  createdAt   DateTime @default(now())
  
  @@index([userId, type, createdAt(sort: Desc)])
  @@index([status, createdAt(sort: Desc)])
}

enum TransactionType {
  CREDIT_PURCHASE
  DOWNLOAD
  SUBSCRIPTION
  REFUND
  PAYOUT
}

enum TransactionStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

// Earnings (for contributors)
model Earning {
  id            String   @id @default(uuid())
  contributorId String
  contributor   User     @relation(fields: [contributorId], references: [id])
  assetId       String
  asset         Asset    @relation(fields: [assetId], references: [id])
  downloadId    String
  
  amount        Int      // In kobo
  currency      String   @default("NGN")
  status        EarningStatus @default(PENDING)
  
  earnedAt      DateTime @default(now())
  availableAt   DateTime?
  paidAt        DateTime?
  
  @@index([contributorId, status, earnedAt(sort: Desc)])
  @@index([status, availableAt])
}

enum EarningStatus {
  PENDING
  AVAILABLE
  PAID
}

// Notifications
model Notification {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  
  type      String
  title     String
  message   String
  metadata  Json?
  
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
  
  @@index([userId, isRead, createdAt(sort: Desc)])
}

// Search logs (for analytics)
model SearchLog {
  id        String   @id @default(uuid())
  userId    String?
  query     String
  filters   Json?
  results   Int
  duration  Int      // milliseconds
  createdAt DateTime @default(now())
  
  @@index([createdAt(sort: Desc)])
  @@index([query])
}

// Collections (contributor-created asset collections)
model Collection {
  id            String   @id @default(uuid())
  name          String
  description   String?
  slug          String   @unique
  contributorId String
  
  assetIds      String[] // Array of asset IDs
  thumbnails    String[] // 4 images for 2x2 collage
  assetCount    Int      @default(0)
  isPublic      Boolean  @default(false)
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([contributorId, isPublic])
  @@index([slug])
}

// Withdrawals (contributor payout requests)
model Withdrawal {
  id            String   @id @default(uuid())
  contributorId String
  
  amount        Int      // In kobo
  currency      String   @default("NGN")
  status        WithdrawalStatus @default(PENDING)
  
  bankDetails   Json     // {accountNumber, bankName, accountName}
  metadata      Json?    // {flutterwaveRef, failureReason, etc}
  
  requestedAt   DateTime @default(now())
  processedAt   DateTime?
  completedAt   DateTime?
  
  @@index([contributorId, status, requestedAt(sort: Desc)])
  @@index([status, requestedAt])
}

enum WithdrawalStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  CANCELLED
}

// Notification Preferences
model NotificationPreference {
  id     String  @id @default(uuid())
  userId String  @unique
  
  email  Json    // {sales: true, uploads: true, weekly: false, etc}
  inApp  Json    // {sales: true, uploads: true, etc}
  push   Json?   // For future push notifications
  
  updatedAt DateTime @updatedAt
}

// Support Tickets
model SupportTicket {
  id        String   @id @default(uuid())
  userId    String
  
  subject   String
  message   String
  category  String   // 'technical', 'billing', 'content', 'other'
  status    TicketStatus @default(OPEN)
  priority  String   @default("normal") // 'low', 'normal', 'high', 'urgent'
  
  responses Json?    // [{from, message, timestamp}]
  metadata  Json?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  closedAt  DateTime?
  
  @@index([userId, status, createdAt(sort: Desc)])
  @@index([status, priority])
}

enum TicketStatus {
  OPEN
  IN_PROGRESS
  WAITING_USER
  RESOLVED
  CLOSED
}

// Follows (users following contributors)
model Follow {
  id            String   @id @default(uuid())
  userId        String
  contributorId String
  
  createdAt     DateTime @default(now())
  
  @@unique([userId, contributorId])
  @@index([userId])
  @@index([contributorId])
}

// Likes (users liking assets)
model Like {
  id        String   @id @default(uuid())
  userId    String
  assetId   String
  
  createdAt DateTime @default(now())
  
  @@unique([userId, assetId])
  @@index([userId])
  @@index([assetId])
}

// Upload Sessions (for resumable uploads)
model UploadSession {
  id          String   @id @default(uuid())
  userId      String
  
  uploadId    String   // S3 multipart upload ID
  fileName    String
  fileSize    Int
  mimeType    String
  
  chunks      Json     // {total, completed: [1,2,3]}
  metadata    Json?    // {title, description, tags, etc}
  
  status      UploadStatus @default(IN_PROGRESS)
  expiresAt   DateTime
  createdAt   DateTime @default(now())
  completedAt DateTime?
  
  @@index([userId, status])
  @@index([expiresAt])
}

enum UploadStatus {
  IN_PROGRESS
  COMPLETED
  FAILED
  EXPIRED
}

// Share Links (for board sharing)
model ShareLink {
  id        String   @id @default(uuid())
  boardId   String
  token     String   @unique
  
  expiresAt DateTime?
  maxUses   Int?
  useCount  Int      @default(0)
  
  createdAt DateTime @default(now())
  
  @@index([token])
  @@index([boardId])
}

// Badges (gamification)
model Badge {
  id          String   @id @default(uuid())
  userId      String
  
  type        String   // 'first_upload', 'top_seller', 'streak_7', etc
  name        String
  description String
  icon        String
  
  progress    Int      @default(0)
  target      Int
  isUnlocked  Boolean  @default(false)
  
  unlockedAt  DateTime?
  createdAt   DateTime @default(now())
  
  @@index([userId, isUnlocked])
  @@index([type])
}

// Leaderboard Cache (for performance)
model LeaderboardCache {
  id        String   @id @default(uuid())
  
  period    String   // 'daily', 'weekly', 'monthly', 'all_time'
  region    String?  // 'NG', 'KE', 'ZA', null for global
  category  String   // 'earnings', 'downloads', 'uploads'
  
  data      Json     // [{rank, userId, username, avatar, value}]
  
  updatedAt DateTime @updatedAt
  
  @@unique([period, region, category])
  @@index([period, category])
}
```

* **PostgreSQL Configuration:**
  * **Primary database:** Neon or Railway PostgreSQL (Lagos/Frankfurt regions)
  * **Read replicas:** 
    * Nairobi (via Fly.io Postgres)
    * London (via Neon read replica)
  * **Connection pooling:** PgBouncer (transaction mode)
  * **Max connections:** 100 per instance
  * **Statement timeout:** 5 seconds
  * **Idle transaction timeout:** 10 seconds

* **Connection Pooling with Prisma:**
```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Connection pool configuration (in DATABASE_URL)
// postgresql://user:pass@host:5432/db?connection_limit=20&pool_timeout=10
```

* **Query Optimization Patterns:**

```typescript
// BAD: N+1 query problem
const assets = await prisma.asset.findMany({ where: { contributorId } })
for (const asset of assets) {
  asset.contributor = await prisma.user.findUnique({ where: { id: asset.contributorId } })
}

// GOOD: Use include/select
const assets = await prisma.asset.findMany({
  where: { contributorId },
  include: {
    contributor: {
      select: { id: true, name: true, username: true, avatar: true }
    }
  }
})

// BEST: Single query for asset detail page
const assetDetail = await prisma.asset.findUnique({
  where: { id: assetId },
  include: {
    contributor: {
      select: { 
        id: true, 
        name: true, 
        username: true, 
        avatar: true,
        profile: true 
      }
    },
    // Get similar assets via raw SQL for performance
  }
})

// Similar assets via raw SQL (faster than Prisma for complex queries)
const similar = await prisma.$queryRaw`
  SELECT a.* FROM assets a
  WHERE a.status = 'APPROVED'
  AND a.id != ${assetId}
  AND a.metadata->>'tags' && ${JSON.stringify(asset.metadata.tags)}
  ORDER BY a.stats->>'downloads' DESC
  LIMIT 20
`
```

* **Transaction Safety for Financial Operations:**
```typescript
// ACID transaction for download (all or nothing)
const result = await prisma.$transaction(async (tx) => {
  // 1. Decrement credits
  const user = await tx.user.update({
    where: { id: userId },
    data: { credits: { decrement: 1 } }
  })
  
  if (user.credits < 0) {
    throw new Error('Insufficient credits')
  }
  
  // 2. Create download record
  const download = await tx.download.create({
    data: {
      userId,
      assetId,
      licenseType,
      format,
      size,
      creditsCost: 1,
      downloadUrl,
      licenseUrl,
      status: 'ACTIVE'
    }
  })
  
  // 3. Create earning for contributor
  await tx.earning.create({
    data: {
      contributorId: asset.contributorId,
      assetId,
      downloadId: download.id,
      amount: calculateEarnings(licenseType),
      status: 'PENDING',
      availableAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  })
  
  return download
})
```

* **Performance Indexes (Auto-created by Prisma):**
  * All `@@index` directives in schema create PostgreSQL indexes
  * `@@fulltext` creates GIN index for full-text search
  * Foreign keys automatically indexed
  * Composite indexes for common query patterns

* **Hot Data in Redis:**
  * **User credits:** `credits:${userId}` - Never expires, updated on purchase/download
  * **Active sessions:** `session:${sessionId}` - 7 day TTL
  * **Trending assets:** `trending:daily` - 1 hour TTL, top 100 assets
  * **Leaderboard:** `leaderboard:${period}:${region}` - 1 hour TTL
  * **Asset view counts:** `views:${assetId}` - Increment in Redis, flush to PostgreSQL hourly
  * **Search result cache:** `search:${cacheKey}` - 1 hour TTL

* **Redis Configuration:**
```javascript
const redisConfig = {
  maxmemory: '4gb',
  'maxmemory-policy': 'allkeys-lru', // Evict least recently used
  'maxmemory-samples': 5,
  // Persistence for critical data
  appendonly: 'yes',
  'appendfsync': 'everysec',
}
```

* **Performance Monitoring:**
  * Enable PostgreSQL slow query log (>100ms)
  * Track query execution times in APM
  * Alert on queries >500ms
  * Weekly index optimization review
  * Use `EXPLAIN ANALYZE` for slow queries

### API Response Optimizations

* **Pagination:** Max 50 items per page, cursor-based for large datasets
* **Field selection:** Allow clients to specify which fields to return
* **Compression:** Gzip/Brotli for all API responses
* **ETags:** For conditional requests (304 Not Modified)
* **Batch endpoints:** Allow fetching multiple assets in one request

### CDN Strategy (Cloudflare)

* **Image optimization:**
  * Automatic WebP/AVIF conversion for modern browsers
  * On-the-fly resizing (thumbnail, preview, full)
  * Quality optimization based on network speed
* **Edge caching rules:**
  * Static assets: 1 year
  * Thumbnails/previews: 30 days
  * ~~Search results: 60 seconds~~ (Removed - waste of money)
  * Asset metadata: 7 days
* **Regional edge locations:** Prioritize African POPs (Lagos, Johannesburg, Nairobi)

### Background Job Optimizations

* **Job prioritization:**
  * Critical (P0): EXIF removal, watermarking, thumbnail generation
  * High (P1): Quality scoring, NSFW detection
  * Medium (P2): Email notifications, analytics
  * Low (P3): Weekly digests, batch reports
* **Concurrency limits per job type:**
  * Image processing: 10 concurrent
  * Email: 50 concurrent
  * Analytics: 5 concurrent
  * Payouts: 1 concurrent (sequential for safety)
* **Timeout protection:** All jobs have max execution time
* **Dead letter queue:** Failed jobs after 3 retries go to DLQ for manual review
* **Parallel job triggering:**
```javascript
// BAD: Sequential (slow)
await queue.add('watermark', { assetId })
await queue.add('thumbnail', { assetId })
await queue.add('exif', { assetId })

// GOOD: Parallel (fast)
await Promise.all([
  queue.add('watermark', { assetId }),
  queue.add('thumbnail', { assetId }),
  queue.add('exif', { assetId }),
])
```

---

## Critical Anti-Patterns to Avoid

### 1. N+1 Query Problem
**Problem:** Fetching related data in loops
```javascript
// ❌ BAD: 1 + N queries
const assets = await prisma.asset.findMany({ where: { contributorId } })
for (const asset of assets) {
  asset.contributor = await prisma.user.findUnique({ where: { id: asset.contributorId } })
}

// ✅ GOOD: Use Prisma include
const assets = await prisma.asset.findMany({
  where: { contributorId },
  include: {
    contributor: {
      select: { id: true, name: true, username: true, avatar: true }
    }
  }
})
```

### 2. Missing Rate Limiting
**Problem:** One user can DOS the platform
```javascript
// ✅ GOOD: Redis token bucket
const rateLimit = async (userId, action, limit, window) => {
  const key = `ratelimit:${userId}:${action}`
  const current = await redis.incr(key)
  
  if (current === 1) {
    await redis.expire(key, window)
  }
  
  if (current > limit) {
    throw new Error('Rate limit exceeded')
  }
}

// Apply to all expensive operations
await rateLimit(userId, 'search', 60, 60) // 60 searches per minute
await rateLimit(userId, 'upload', 100, 86400) // 100 uploads per day
await rateLimit(userId, 'download', 10, 60) // 10 downloads per minute
```

### 3. No Circuit Breaker for External Services
**Problem:** S3/Meilisearch/Flutterwave failures cascade
```javascript
// ✅ GOOD: Circuit breaker pattern
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureCount = 0
    this.threshold = threshold
    this.timeout = timeout
    this.state = 'CLOSED' // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now()
  }
  
  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN')
      }
      this.state = 'HALF_OPEN'
    }
    
    try {
      const result = await fn()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }
  
  onSuccess() {
    this.failureCount = 0
    this.state = 'CLOSED'
  }
  
  onFailure() {
    this.failureCount++
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN'
      this.nextAttempt = Date.now() + this.timeout
    }
  }
}

// Use for all external services
const s3CircuitBreaker = new CircuitBreaker()
const searchCircuitBreaker = new CircuitBreaker()
```

### 4. Synchronous External API Calls
**Problem:** Blocks Node.js event loop
```javascript
// ❌ BAD: Synchronous
const asset = await prisma.asset.findUnique({ where: { id } })
const similar = await searchService.findSimilar(asset.tags)
const contributor = await prisma.user.findUnique({ where: { id: asset.contributorId } })

// ✅ GOOD: Parallel with timeout
const [asset, similar, contributor] = await Promise.all([
  prisma.asset.findUnique({ where: { id } }),
  searchService.findSimilar(tags).timeout(2000),
  prisma.user.findUnique({ where: { id: contributorId } }),
])
```

### 5. No Request Timeout
**Problem:** Slow requests block resources
```javascript
// ✅ GOOD: Global request timeout
app.use((req, res, next) => {
  req.setTimeout(30000) // 30 second timeout
  res.setTimeout(30000)
  next()
})

// Per-route timeout for expensive operations
app.post('/api/search', timeout('5s'), async (req, res) => {
  // Search must complete in 5 seconds
})
```

---

## Monitoring & Observability

### Application Performance Monitoring (APM)

**Required Metrics:**
```javascript
// Track all critical operations
metrics.timing('search.query', duration)
metrics.timing('upload.complete', duration)
metrics.timing('download.initiate', duration)
metrics.timing('db.query', duration, { collection, operation })

// Track error rates
metrics.increment('errors', { type: error.name, endpoint })

// Track business metrics
metrics.increment('downloads.completed')
metrics.increment('uploads.completed')
metrics.gauge('active_users', count)
```

**Alerts:**
- Search p95 latency >200ms
- Upload failure rate >5%
- Download failure rate >2%
- Database query >500ms
- Error rate >1%
- API 5xx errors >0.1%

### Logging Strategy

```javascript
// Structured logging with context
logger.info('Search query', {
  userId,
  query,
  filters,
  duration,
  cacheHit,
  resultCount,
  requestId,
})

// Error logging with stack traces
logger.error('Upload failed', {
  userId,
  assetId,
  error: error.message,
  stack: error.stack,
  requestId,
})
```

**Log Levels:**
- ERROR: All errors, failed operations
- WARN: Slow queries, rate limits, retries
- INFO: Successful operations, business events
- DEBUG: Detailed execution flow (dev only)

### Health Checks

```javascript
// /health endpoint
app.get('/health', async (req, res) => {
  const checks = await Promise.all([
    checkPostgreSQL(),
    checkRedis(),
    checkS3(),
    checkMeilisearch(),
  ])
  
  const healthy = checks.every(c => c.status === 'ok')
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'healthy' : 'unhealthy',
    checks,
    timestamp: new Date().toISOString(),
  })
})
```

### Database Sharding Strategy (Future)

* **Shard key:** `contributor_id` for assets table (keeps contributor's assets together)
* **Trigger point:** 10M+ assets or 1TB+ data
* **Shard distribution:** By region (Africa, Europe, Americas)
* **Implementation:** PostgreSQL native partitioning or Citus extension

---

## Simplified Launch Priorities

### Phase 1 (MVP - 8 weeks)

**Week 1-2: Foundation**
* PostgreSQL schema + Prisma migrations (ALL indexes specified above)
* NextAuth.js JWT auth
* Resumable multipart upload with S3
* Basic BullMQ worker setup

**Week 3-4: Core Features**
* Asset processing pipeline (watermark, thumbnails, EXIF removal)
* Meilisearch integration with custom ranking
* Redis caching layer
* Download system with atomic quotas

**Week 5-6: Payments & Notifications**
* Flutterwave integration (payments + payouts)
* Email notifications (7 core templates)
* In-app notifications
* Weekly payout processing

**Week 7-8: Polish & Launch**
* Rate limiting
* CDN configuration
* Load testing (k6)
* Monitoring (Sentry, Axiom)
* Security audit

### Phase 2 (Post-Launch - 4 weeks)

* Stripe integration (international payments)
* Simple recommendations (tag-based)
* Gamification (badges, leaderboards)
* Marketplace liquidity engine
* pHash duplicate detection (batch job)

### Phase 3 (Growth - 6 weeks)

* CLIP embeddings + Pinecone
* Advanced recommendations
* Developer API (public)
* Enterprise SSO
* Video support (FFmpeg)

### Frontend Integration Prep (Parallel with Phase 1)

* Create `src/lib/api/client.ts` — typed fetch wrapper with auth headers, error envelope handling, and retry logic
* Create React Query hooks per domain (`useAssets`, `useSearch`, `useAuth`, `useDownloads`, `useEarnings`, etc.)
* Refactor `authStore.ts` from mock login to real JWT handling (access token in memory, refresh token in httpOnly cookie, auto-refresh on 401)
* Add environment-based API URL switching (`NEXT_PUBLIC_API_URL`)
* Add `ContributorApplication` type to `@/types/user.ts`

---

## Technology Stack (Finalized)

### Core
* **Runtime:** Node.js 20+
* **Framework:** Next.js 15 (API routes + tRPC)
* **Language:** TypeScript 5+

### Database & Cache
* **Primary DB:** PostgreSQL 15+ (Neon, Railway, or managed PostgreSQL)
* **ORM:** Prisma (type-safe database access)
* **Cache:** Redis/Upstash (sessions, rate limiting, job queue)
* **Search:** Meilisearch (full-text search)
* **Vectors:** Pinecone (Phase 2 - semantic search)

### Storage & CDN
* **Object Storage:** AWS S3 with Transfer Acceleration
* **CDN:** Cloudflare (caching, image optimization, WAF)

### Jobs & Workers
* **Queue:** BullMQ (Redis-backed)
* **Image Processing:** Sharp.js
* **Video Processing:** FFmpeg (Phase 3)

### Payments
* **Primary:** Flutterwave (African payments + payouts)
* **Secondary:** Stripe (international + fallback)

### Auth & Security
* **Auth:** NextAuth.js v5 (JWT RS256)
* **Security:** Cloudflare WAF, rate limiting, CSRF protection

### Monitoring & Observability
* **Errors:** Sentry
* **Logs:** Axiom
* **Analytics:** PostHog
* **APM:** Built-in Next.js instrumentation

### Email & Notifications
* **Email:** Resend
* **In-app:** PostgreSQL + Redis pub/sub

### Infrastructure
* **Hosting:** Railway (API + workers)
* **CI/CD:** GitHub Actions
* **Environments:** Development, Staging, Production

---


## Frontend-Backend Alignment

This section maps the actual frontend implementation to required backend endpoints and features.

### Implemented Frontend Routes (32 pages)

#### Marketing Routes (Public, No Auth)
1. `/` - Homepage
2. `/about` - About page
3. `/collections` - Collections listing
4. `/collections/[slug]` - Collection detail
5. `/editorial` - Editorial listing
6. `/editorial/[slug]` - Editorial article
7. `/pricing` - Pricing plans
8. `/contact` - Contact form
9. `/contribute` - Contributor application info
10. `/how-it-works` - How it works guide
11. `/login` - Login page
12. `/signup` - Signup page
13. `/terms` - Terms of service
14. `/privacy` - Privacy policy
15. `/cookies` - Cookie policy
16. `/licence` - License information

#### Browse Routes (Public, No Auth Required)
17. `/search` - Asset search with filters
18. `/assets/[id]` - Asset detail page
19. `/profile/[username]` - Contributor public profile

#### Dashboard Routes (Authenticated)
20. `/home` - Redirect page
21. `/discover` - Discovery feed
22. `/dashboard` - Contributor dashboard (contributor only)
23. `/my-assets` - Asset management (contributor only)
24. `/my-assets/upload` - Upload wizard (contributor only)
25. `/my-assets/collections/[id]` - Collection detail (contributor only)
26. `/boards` - Boards listing
27. `/boards/[id]` - Board detail
28. `/downloads` - Download history
29. `/liked` - Liked assets
30. `/earnings` - Earnings dashboard (contributor only)
31. `/account` - Account settings
32. `/billing` - Billing & credits
33. `/notifications` - Notifications center
34. `/notifications/preferences` - Notification preferences
35. `/support` - Support & FAQ

---

## Required Backend API Endpoints

### 1. Authentication & User Management

#### Auth Endpoints
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me
```

**Frontend Usage:**
- `/login` page - email/password login
- `/signup` page - account creation (auto-generates username from name)
- Dashboard layout - session validation
- Account settings - password change

**Data Requirements:**
- User object with: id, email, name, username (auto-generated from name by backend), avatar, role, credits, joinedYear, isContributorApproved
- JWT tokens with refresh rotation
- Username auto-generation from user's name (backend handles this, e.g., "John Doe" → "johndoe" or "johndoe123" if taken)

#### User Profile Endpoints
```
GET    /api/users/me
PATCH  /api/users/me
GET    /api/users/:username
POST   /api/users/avatar
```

**Frontend Usage:**
- `/account` page - profile editing (name, bio, location, website, instagram, twitter, facebook, country, timezone, language)
- `/profile/[username]` - public contributor profile
- Dashboard sidebar - user info display

**Data Requirements:**
- Full UserProfile type with all optional fields
- Avatar upload to S3
- Username uniqueness validation

#### Contributor Application
```
POST   /api/contributors/apply
GET    /api/contributors/application-status
```

**Frontend Usage:**
- `/contribute` page - application form
- `/dashboard` page - application status display (pending/approved/rejected with reason)
- Contributor modal - application submission

**Data Requirements:**
- Application fields: bio, specialties (array), instagram, portfolio URL
- Status tracking: pending → approved/rejected
- Rejection reason field
- Auto-approval for demo (can be manual in production)

> **Note:** Frontend needs a `ContributorApplication` type added to `@/types/user.ts` before integration.

---

### 2. Asset Management

#### Asset CRUD
```
GET    /api/assets
GET    /api/assets/:id
POST   /api/assets
PATCH  /api/assets/:id
DELETE /api/assets/:id
```

**Frontend Usage:**
- `/search` - asset listing with filters
- `/assets/[id]` - asset detail view
- `/my-assets/upload` - asset creation
- `/my-assets` - asset management

**Data Requirements:**
- Full Asset type with: src, thumbnailUrl, previewUrl, watermarkedUrl, originalUrl
- Metadata: fileType, mimeType, fileSize, dimensions, aspectRatio, resolution, duration, fps
- Classification: category, tags, colors (array of hex codes)
- Licensing: license type, isEditorial, isAI, isFree, modelRelease, propertyRelease
- Prices: standard, enhanced, editorial (in Naira)
- Contributor info: contributorId, contributorAvatar, contributorCountry
- Stats: views, downloads, likes, earnings
- Status: pending/approved/rejected with rejectionReason
- Color palette: 5 colors with hex codes (clickable for color search)
- Release badges: modelRelease (green), propertyRelease (blue)

#### Asset Upload
```
POST   /api/assets/upload/initiate
POST   /api/assets/upload/complete
POST   /api/assets/upload/abort
```

**Frontend Usage:**
- `/my-assets/upload` - multi-file upload wizard

**Data Requirements:**
- Direct-to-S3 pre-signed POST URLs
- UploadFile type: fileName, fileSize, mimeType, status, progress, thumbnailUrl, preview
- Metadata per file: title, description, category, tags, isAI, isEditorial, modelRelease, propertyRelease
- Auto-detected: dimensions (width × height), duration, aspectRatio
- "Apply to all files" functionality (copies metadata except title)
- Upload status tracking: queued → uploading → processing → complete/error

#### Asset Search & Filters
```
GET    /api/assets/search
GET    /api/assets/autocomplete
```

**Frontend Usage:**
- `/search` - main search page
- Homepage - search bar

**Data Requirements:**
- SearchFilters type: type, orientation, license, price, dateAdded, aiContent, color, contributors, resolution, modelRelease, propertyRelease, sort, q, page, limit
- Meilisearch integration with custom ranking
- Faceted search results
- Autocomplete suggestions
- Color search by hex code

#### Asset Stats
```
GET    /api/assets/:id/stats
```

**Frontend Usage:**
- `/my-assets` - asset performance modal
- `/dashboard` - top performing assets

**Data Requirements:**
- AssetStats type: views, downloads, likes, earnings, conversionRate, avgEarningsPerDownload
- Performance insights calculations

---

### 3. Collections & Boards

#### Collections (Contributor's organized assets)
```
GET    /api/collections
POST   /api/collections
GET    /api/collections/:id
PATCH  /api/collections/:id
DELETE /api/collections/:id
POST   /api/collections/:id/assets
DELETE /api/collections/:id/assets/:assetId
```

**Frontend Usage:**
- `/my-assets` - collections tab
- `/my-assets/collections/[id]` - collection detail
- `/collections` - public collections listing
- `/collections/[slug]` - public collection view

**Data Requirements:**
- Collection type: id, name, description, slug, contributorId, assetIds, thumbnails (4 images for 2x2 collage), assetCount, isPublic
- Visibility toggle: public/private

#### Boards (Customer's saved assets)
```
GET    /api/boards
POST   /api/boards
GET    /api/boards/:id
PATCH  /api/boards/:id
DELETE /api/boards/:id
POST   /api/boards/:id/assets
DELETE /api/boards/:id/assets/:assetId
```

**Frontend Usage:**
- `/boards` - boards listing
- `/boards/[id]` - board detail
- Asset detail page - "Save to board" button

**Data Requirements:**
- Board type: id, name, description, userId, assetIds, thumbnails (4 images), assetCount, type (private/shared/team), collaborators, shareLink
- Board types: private, shared, team

#### Board Collaboration
```
POST   /api/boards/:id/collaborators
DELETE /api/boards/:id/collaborators/:userId
PATCH  /api/boards/:id/collaborators/:userId
GET    /api/boards/:id/share-link
```

**Frontend Usage:**
- `/boards/[id]` - manage collaborators modal
- Share board modal - invite by email

**Data Requirements:**
- BoardCollaborator type with nested user object: { userId, user: UserProfile, role: 'viewer'|'editor'|'admin', addedAt }
- Role permissions: Admin (full access), Editor (add/remove assets), Viewer (view only)
- Email invitations with role selection

---

### 4. Downloads & Transactions

#### Download System
```
POST   /api/downloads
GET    /api/downloads
GET    /api/downloads/:id
GET    /api/downloads/:id/url
```

**Frontend Usage:**
- Asset detail page - download button
- `/downloads` - download history

**Data Requirements:**
- Download type: id, userId, assetId, asset, licenseType, format, size, creditsCost, downloadUrl (signed S3 URL, 15min expiry), downloadedAt, expiresAt, licenseUrl (PDF)
- Atomic quota management (Redis DECR)
- License PDF generation (async BullMQ job)
- Format options: JPG, PNG, WebP
- Size options: Small, Medium, Original

#### Transaction History
```
GET    /api/transactions
GET    /api/transactions/:id
```

**Frontend Usage:**
- `/billing` - transaction history tab
- `/earnings` - transaction history (contributor view)

**Data Requirements:**
- Transaction type: id, userId, type, amount, currency (NGN), credits, status, description, date, asset, customer, metadata
- Transaction types: credit_purchase, download, subscription, refund, payout
- Filter by type and date range

---

### 5. Payments & Billing

#### Credit Packages
```
GET    /api/billing/packages
POST   /api/billing/purchase
```

**Frontend Usage:**
- `/billing` - credits tab
- Purchase credits modal

**Data Requirements:**
- CreditPackage type: id, name, credits, price (NGN), currency, discount, popular, save
- Packages: 10, 25, 50, 100, 250 credits
- Flutterwave integration (primary)
- Stripe integration (secondary/international)

#### Payment Methods
```
GET    /api/billing/payment-methods
POST   /api/billing/payment-methods
DELETE /api/billing/payment-methods/:id
PATCH  /api/billing/payment-methods/:id/default
```

**Frontend Usage:**
- `/billing` - payment methods section
- Add payment method modal

**Data Requirements:**
- PaymentMethod type: id, type (card/bank/paypal/mobile_money), last4, brand, expiry, isDefault
- Flutterwave tokenization

---

### 6. Contributor Earnings & Payouts

#### Earnings Dashboard
```
GET    /api/earnings/stats
GET    /api/earnings/transactions
GET    /api/earnings/chart
```

**Frontend Usage:**
- `/earnings` - earnings dashboard

**Data Requirements:**
- EARNINGS_STATS type: availableBalance, pendingBalance, totalAllTime, thisMonth, lastMonth, currency (NGN)
- Earnings chart: 6 months of data
- Transaction list with: asset, amount, date, license type, status (pending/available/paid), availableAt, paidAt
- All amounts in Naira with comma formatting

#### Withdrawal System
```
POST   /api/earnings/withdraw
GET    /api/earnings/withdrawals
GET    /api/earnings/withdrawals/:id
```

**Frontend Usage:**
- `/earnings` - withdraw button and withdrawal history
- Withdraw earnings modal

**Data Requirements:**
- Withdrawal type: id, contributorId, amount, currency (NGN), method (bank/paypal/mobile_money), status (pending/processing/completed/failed), requestedAt, processedAt, failureReason
- Minimum withdrawal: ₦80,000
- Weekly payout processing (every Monday)
- Payout methods: Bank transfer, PayPal, Mobile money (M-Pesa, MTN, Airtel)
- 30-day hold on new earnings

#### Payout Method Setup
```
GET    /api/earnings/payout-methods
POST   /api/earnings/payout-methods
PATCH  /api/earnings/payout-methods/:id
```

**Frontend Usage:**
- `/account` - contributor settings section
- `/earnings` - payout method selection

**Data Requirements:**
- PayoutMethod type: type (bank/paypal/mobile_money), details (account info), isDefault
- Bank details: account number, bank name, account name
- Mobile money: phone number, provider

---

### 7. Notifications

#### Notification Center
```
GET    /api/notifications
PATCH  /api/notifications/:id/read
POST   /api/notifications/mark-all-read
DELETE /api/notifications/:id
```

**Frontend Usage:**
- `/notifications` - notifications center
- Header - notification bell with unread count

**Data Requirements:**
- Notification type: id, userId, type, title, message, icon, emoji, iconBg, iconColor, actionUrl, link, metadata, isRead, time, createdAt
- Notification types: download, like, comment, follow, earning, system, approval, rejection
- Unread count badge

#### Notification Preferences
```
GET    /api/notifications/preferences
PATCH  /api/notifications/preferences
```

**Frontend Usage:**
- `/notifications/preferences` - preferences page

**Data Requirements:**
- NotificationPreferences type with channels: email, push, inApp
- Per-channel settings for: downloads, likes, comments, follows, earnings, system
- Toggle switches for each combination

---

### 8. Dashboard & Analytics

#### Contributor Dashboard
```
GET    /api/dashboard/stats
GET    /api/dashboard/activity
GET    /api/dashboard/top-assets
GET    /api/dashboard/badges
```

**Frontend Usage:**
- `/dashboard` - contributor dashboard

**Data Requirements:**
- DASHBOARD_STATS: Earnings this month, Downloads this month, Total views, Leaderboard rank (all with trend percentages)
- DASHBOARD_ACTIVITY: Recent activity feed with icons and timestamps
- Top performing assets with earnings
- DASHBOARD_BADGES: Badge progress and earned status

#### Discovery Feed
```
GET    /api/discover/feed
GET    /api/discover/trending
```

**Frontend Usage:**
- `/discover` - discovery feed page

**Data Requirements:**
- FeedItem type: contributorId, contributor, contributorAvatar, uploadDate, assets
- Filter tabs: Latest, Popular, Featured, For You
- Category filters

---

### 9. Social Features

#### Likes
```
POST   /api/assets/:id/like
DELETE /api/assets/:id/like
GET    /api/users/me/liked
```

**Frontend Usage:**
- Asset cards - like button
- `/liked` - liked assets page

#### Follows
```
POST   /api/contributors/:id/follow
DELETE /api/contributors/:id/follow
GET    /api/users/me/following
```

**Frontend Usage:**
- Contributor cards - follow button
- `/profile/[username]` - follow button

---

### 10. Support & Help

#### Support Tickets
```
POST   /api/support/tickets
GET    /api/support/tickets
GET    /api/support/tickets/:id
```

**Frontend Usage:**
- `/support` - contact form

**Data Requirements:**
- SupportTicket type: id, userId, subject, message, category, priority, status, attachments, createdAt, updatedAt, resolvedAt

#### FAQ
```
GET    /api/support/faq
```

**Frontend Usage:**
- `/support` - FAQ section

**Data Requirements:**
- FAQCategory type with questions array
- Categories: Getting Started, Licensing, Account & Billing, Contributors

---

### 11. Public Content

#### Collections
```
GET    /api/public/collections
GET    /api/public/collections/:slug
```

**Frontend Usage:**
- `/collections` - collections listing
- `/collections/[slug]` - collection detail

#### Editorial
```
GET    /api/public/editorial
GET    /api/public/editorial/:slug
```

**Frontend Usage:**
- `/editorial` - editorial listing
- `/editorial/[slug]` - editorial article

**Data Requirements:**
- Article type: id, slug, title, excerpt, content, coverImage (not image), category, source, author (with name and avatar), tags, date, publishedAt, updatedAt, readTime, featured
- Category color coding
- Related articles

#### Blog
```
GET    /api/public/blog
GET    /api/public/blog/:slug
```

**Frontend Usage:**
- Homepage - blog section
- Future blog pages

---

### 12. Leaderboard & Gamification

#### Leaderboard
```
GET    /api/leaderboard
GET    /api/leaderboard/:period
```

**Frontend Usage:**
- `/dashboard` - leaderboard preview
- Leaderboard modal - full leaderboard

**Data Requirements:**
- ContributorLeaderboard type: period (day/week/month/all), region, category, entries, userRank
- LeaderboardEntry type: rank, contributorId, contributor (with avatar, country, countryFlag), score, earnings, downloads, uploads, rankChange, badge
- Periods: Week, Month, All-time
- Earnings in Naira

#### Badges
```
GET    /api/users/me/badges
```

**Frontend Usage:**
- `/dashboard` - badges section
- Badge details modal

**Data Requirements:**
- Badge type: id, name, description, icon, earnedAt
- Badge types: Top 10 Nigeria, 30-day streak, Gap filler, 1000 downloads, 5000 downloads
- Progress tracking for unearned badges

---

## Data Model Requirements

### PostgreSQL Tables (via Prisma)

Based on frontend implementation, these tables are required:

1. **users** - User accounts with role, credits, profile fields
2. **assets** - Assets with full metadata, stats, status, rejection reasons
3. **collections** - Contributor collections with visibility
4. **boards** - Customer boards with collaborators
5. **downloads** - Download history with license info
6. **transactions** - All financial transactions
7. **earnings** - Contributor earnings with status tracking
8. **withdrawals** - Withdrawal requests with status
9. **notifications** - User notifications with read status
10. **notification_preferences** - Per-user notification settings
11. **support_tickets** - Support requests
12. **follows** - Contributor follows
13. **likes** - Asset likes
14. **search_logs** - Search queries for analytics
15. **upload_sessions** - Upload progress tracking
16. **share_links** - Board share links
17. **badges** - User badges and progress
18. **leaderboard_cache** - Cached leaderboard data

### Redis Keys

1. **sessions:{userId}** - User sessions
2. **credits:{userId}** - User credit balance (atomic operations)
3. **search:cache:{query}** - Search result cache (5min TTL)
4. **asset:cache:{id}** - Asset detail cache (15min TTL)
5. **trending:assets** - Trending assets list (1hr TTL)
6. **leaderboard:{period}** - Leaderboard cache (1hr TTL)
7. **rate_limit:{ip}:{endpoint}** - Rate limiting
8. **upload:progress:{sessionId}** - Upload progress tracking

---

## Critical Backend Features for Frontend

### Must-Have for Launch (P0)

1. **Direct-to-S3 Uploads** - Pre-signed POST URLs, no server bottleneck
2. **Atomic Quota Management** - Redis DECR for concurrent downloads
3. **Signed Download URLs** - 15-minute expiry, S3 signed URLs
4. **EXIF Removal** - Strip all metadata before serving
5. **Watermark Generation** - For preview images
6. **Thumbnail Generation** - Multiple sizes (small, medium, large)
7. **Color Extraction** - 5-color palette with hex codes
8. **Search with Filters** - Meilisearch with custom ranking
9. **License PDF Generation** - Async job, stored in S3
10. **Email Notifications** - 7 core templates (Resend)
11. **Flutterwave Integration** - Payments and payouts
12. **Weekly Payouts** - Automated batch processing
13. **Application Status Tracking** - Pending/approved/rejected with reasons
14. **Asset Status Tracking** - Pending/approved/rejected with reasons

### Nice-to-Have for Launch (P1)

1. **Simple Recommendations** - Tag-based similar assets
2. **Trending Algorithm** - Download velocity calculation
3. **Badge System** - Achievement tracking
4. **Leaderboard** - By period and region
5. **Activity Feed** - Recent uploads from followed contributors
6. **Duplicate Detection** - pHash (weekly batch job)
7. **Quality Scoring** - Basic sharpness/noise detection

### Post-Launch (P2)

1. **CLIP Embeddings** - Semantic search with Pinecone
2. **Advanced Recommendations** - Collaborative filtering
3. **Video Support** - FFmpeg transcoding
4. **Stripe Integration** - International payments
5. **Enterprise SSO** - SAML/OIDC
6. **Developer API** - Public REST endpoints
7. **Webhooks** - Event notifications

---

## API Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 1000,
    "hasMore": true
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_CREDITS",
    "message": "You don't have enough credits",
    "statusCode": 400,
    "details": {
      "required": 1,
      "available": 0
    }
  }
}
```

### Pagination
- Default limit: 50
- Max limit: 100
- Cursor-based for large datasets
- Include `hasMore` flag

### Currency Convention
- All monetary amounts returned as **integers in kobo** (smallest currency unit, e.g., ₦5,000 = 500000)
- Frontend handles formatting (comma separation, ₦ symbol, kobo-to-naira conversion)
- Currency field always included: `"currency": "NGN"`

---

## Authentication Flow

### Login
1. Frontend: POST `/api/auth/login` with email/password
2. Backend: Validate credentials, generate JWT tokens
3. Backend: Return user object + tokens
4. Frontend: Store tokens, redirect to dashboard

### Session Management
1. Access token: 15 minutes expiry
2. Refresh token: 7 days expiry, stored in httpOnly cookie
3. Auto-refresh on 401 responses
4. Logout: Revoke tokens in Redis

### Protected Routes
1. Frontend checks auth state (Zustand store)
2. If not authenticated, redirect to `/login`
3. Backend validates JWT on all protected endpoints
4. Return 401 if invalid/expired

---

## File Upload Flow

### Upload Process
1. Frontend: POST `/api/assets/upload/initiate` with file metadata
2. Backend: Generate pre-signed S3 POST URL with Transfer Acceleration
3. Frontend: Upload directly to S3 with progress tracking
4. Frontend: POST `/api/assets/upload/complete` with S3 key
5. Backend: Trigger BullMQ jobs (watermark, thumbnails, EXIF removal, quality check)
6. Backend: Create asset record with status=pending
7. Backend: Notify contributor when processing complete

### Processing Jobs (BullMQ)
1. **EXIF Removal** (P0, 5s) - Strip all metadata
2. **Watermark** (P0, 3s) - Add watermark to preview
3. **Thumbnails** (P0, 5s) - Generate 3 sizes
4. **Color Extraction** (P0, 2s) - Extract 5-color palette
5. **Quality Check** (P1, 10s) - Sharpness, noise, resolution
6. **NSFW Detection** (P1, 5s) - Flag inappropriate content
7. **Duplicate Detection** (P2, batch) - pHash comparison

---

## Search Implementation

### Meilisearch Configuration
```json
{
  "searchableAttributes": [
    "title",
    "description",
    "tags",
    "category",
    "contributor"
  ],
  "filterableAttributes": [
    "fileType",
    "license",
    "isAI",
    "isEditorial",
    "isFree",
    "modelRelease",
    "propertyRelease",
    "category",
    "contributorId",
    "colors",
    "resolution",
    "status"
  ],
  "sortableAttributes": [
    "downloads",
    "views",
    "likes",
    "earnings",
    "uploadedAt"
  ],
  "rankingRules": [
    "words",
    "typo",
    "proximity",
    "attribute",
    "sort",
    "exactness",
    "downloads:desc",
    "views:desc"
  ]
}
```

### Search Query Example
```typescript
const results = await meili.index('assets').search(query, {
  filter: [
    'status = approved',
    'fileType = image',
    'license = standard',
    'isAI = false'
  ],
  sort: ['downloads:desc'],
  limit: 50,
  offset: 0
})
```

---

## Performance Targets

### API Response Times
- Search (cache hit): <50ms
- Search (cold): <150ms
- Asset detail: <100ms
- Download initiation: <200ms
- Upload initiation: <100ms

### Upload Speeds
- Target: 10MB/s+ from Lagos/Nairobi
- S3 Transfer Acceleration enabled
- Direct-to-S3 (no server bottleneck)

### Database Queries
- All queries <100ms
- Proper indexing on all filter fields
- Read replicas for analytics

### Caching Strategy
- Redis: Hot data (credits, sessions, trending)
- CDN: Static assets (30 days)
- API responses: 60 seconds with stale-while-revalidate

---

## Security Requirements

### Data Protection
- EXIF/GPS removal before public exposure
- Watermarks on all preview images
- Signed URLs with expiration
- Encryption at rest (PostgreSQL, S3)
- HTTPS only

### Rate Limiting
- Auth endpoints: 5 req/min per IP
- Search: 60 req/min per user
- Upload: 100 files/day per contributor
- Download: Based on credits

### Abuse Prevention
- Duplicate upload detection
- Download anomaly detection
- Refund abuse monitoring
- Credential sharing detection
- Bot protection (Cloudflare Turnstile)

---

This alignment document ensures the backend implementation matches the actual frontend requirements and user flows.


---

## Performance Targets Summary

### Optimized Architecture Performance Estimates

| Operation | Target | Optimized Estimate | Status |
|-----------|--------|-------------------|--------|
| **Upload Speed** | 10MB/s+ from Lagos/Nairobi | 8-12MB/s | ✅ Achievable |
| **Search (cache hit)** | <50ms | 30-60ms | ✅ Achievable |
| **Search (cold)** | <150ms | 120-180ms | ⚠️ Close (single aggregation needed) |
| **Download initiation** | <200ms | 150-250ms | ✅ Achievable |
| **Database queries** | <100ms | 20-80ms | ✅ Achievable |
| **Asset detail page** | <500ms | 150-250ms | ✅ Achievable (with aggregation) |

### Key Optimizations Applied

1. ✅ **Resumable uploads** with multipart S3 + retry logic
2. ✅ **Query normalization** for 80%+ cache hit rate
3. ✅ **Stale-while-revalidate** caching to prevent stampede
4. ✅ **Single aggregation** for asset detail (not 4 queries)
5. ✅ **All PostgreSQL indexes specified** (15+ indexes via Prisma)
6. ✅ **Circuit breakers** for external services
7. ✅ **Rate limiting** on all expensive operations
8. ✅ **Connection pooling** and read replicas
9. ✅ **Parallel job triggering** for BullMQ
10. ✅ **Comprehensive monitoring** and alerting

### Cost Optimization

**Before optimization:** $2,500-3,500/month at 10K users
**After optimization:** $1,200-1,800/month at 10K users
**Savings:** ~45% reduction

**Key cost savings:**
- Removed CDN caching for search (5% hit rate = waste)
- Proper query optimization reduces PostgreSQL instance size
- Connection pooling (PgBouncer) reduces database connections
- Parallel job processing reduces worker idle time

### Launch Readiness Checklist

- [ ] All PostgreSQL indexes created and tested via Prisma migrations
- [ ] Resumable upload flow implemented with multipart S3
- [ ] Search caching with normalization and stale-while-revalidate
- [ ] Single aggregation endpoint for asset detail
- [ ] Circuit breakers for S3, Meilisearch, Flutterwave
- [ ] Rate limiting on search, upload, download
- [ ] APM and logging configured (Sentry, Axiom)
- [ ] Health check endpoint implemented
- [ ] Load testing completed (k6)
- [ ] Monitoring alerts configured

### Performance Testing Plan

```bash
# Load test search endpoint
k6 run --vus 100 --duration 60s tests/search.js
# Target: p95 < 150ms, p99 < 300ms

# Load test upload endpoint
k6 run --vus 50 --duration 300s tests/upload.js
# Target: 8MB/s+ average, <5% failure rate

# Load test download endpoint
k6 run --vus 200 --duration 60s tests/download.js
# Target: p95 < 200ms, 0% quota conflicts

# Stress test database
k6 run --vus 500 --duration 120s tests/db-stress.js
# Target: All queries < 100ms under load
```

---

**Document Status:** Optimized for African market performance
**Last Updated:** April 23, 2026
**Next Review:** After Phase 1 launch (Week 8)
