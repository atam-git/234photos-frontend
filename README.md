# 234photos Frontend

Africa's Stock Media Marketplace - Frontend Application

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS + CSS Modules
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand (client) + TanStack Query (server)
- **API Integration**: tRPC
- **Forms**: React Hook Form + Zod
- **Image Handling**: next/image + sharp
- **Upload**: tus.io + Uppy
- **Real-time**: Server-Sent Events (SSE)
- **PWA**: next-pwa + Workbox
- **Analytics**: PostHog
- **Monitoring**: Sentry
- **Testing**: Jest + React Testing Library + Playwright

## Project Structure

```
234photos-frontend/
├── app/                      # Next.js App Router
│   ├── (marketing)/         # Marketing routes (public)
│   ├── (buyer)/             # Authenticated buyer routes
│   ├── (contributor)/       # Contributor routes
│   ├── (enterprise)/        # Enterprise routes
│   ├── (admin)/             # Admin routes
│   ├── api/                 # API routes (tRPC, webhooks)
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── shared/              # Shared components
│   ├── features/            # Feature-specific components
│   └── layouts/             # Layout components
├── lib/
│   ├── trpc/                # tRPC client/server
│   ├── api/                 # API client utilities
│   ├── auth/                # Authentication utilities
│   ├── utils/               # Utility functions
│   └── constants/           # App constants
├── hooks/                   # Custom React hooks
├── stores/                  # Zustand stores
├── types/                   # TypeScript types
├── styles/                  # Global styles, CSS variables
├── config/                  # App configuration
└── public/                  # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env.local` and configure environment variables:

```bash
cp .env.example .env.local
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run type-check` - Run TypeScript type checking

## Environment Variables

See `.env.example` for all available environment variables.

Key variables:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_CDN_URL` - CDN URL for assets
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog analytics key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY` - Flutterwave public key

## Performance Targets

- **LCP**: <2.5s on 4G mobile
- **FCP**: <1.8s
- **TTI**: <3.5s
- **CLS**: <0.1
- **Initial JS Bundle**: ≤200KB (gzipped)
- **Lighthouse Score**: ≥90

## Accessibility

This project aims for WCAG 2.1 AA compliance:
- Semantic HTML
- ARIA attributes where needed
- Keyboard navigation support
- Color contrast ratios ≥4.5:1
- Screen reader compatibility

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Samsung Internet 15+

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

Proprietary - All rights reserved

## Documentation

For detailed documentation, see the [Frontend Engineering PRD](./docs/frontend-prd.md)
