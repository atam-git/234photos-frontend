# 234photos - Frontend

Africa's premier stock media marketplace connecting African creators with global buyers. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15.1.0 (App Router)
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS + Custom CSS
- **State Management:** Zustand
- **Icons:** Lucide React
- **Font:** Plus Jakarta Sans (Google Fonts)
- **Deployment:** Vercel-ready

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/atam-git/234photos-frontend)

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Select the repository
4. Configure environment variables (if needed)
5. Click "Deploy"

Or manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── (marketing)/    # Public marketing pages
│   ├── (browse)/       # Public browsing (search, assets, profiles)
│   └── (dashboard)/    # Authenticated dashboard
├── components/          # React components
│   ├── features/       # Feature-specific components
│   └── shared/         # Shared components & modals
├── lib/
│   └── mock/           # Mock data (24 files)
├── types/              # TypeScript types (20 files, 81+ types)
├── stores/             # Zustand stores
└── public/             # Static assets
docs/                   # Documentation
```

## Development

- Run `npm run lint` to check for linting errors
- Run `npm run type-check` to check TypeScript types
- Run `npm test` to run unit tests

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

## Documentation

- **[Product Requirements](./docs/PRD.md)** - Complete feature specifications
- **[Design System](./docs/DESIGN_SYSTEM.md)** - UI patterns and components
- **[Type System](./docs/TYPE_SYSTEM.md)** - TypeScript type definitions
- **[UI Plan](./docs/UI_PLAN.md)** - Build order and component breakdown
