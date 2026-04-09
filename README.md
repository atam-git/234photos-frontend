# 234photos - Frontend

Africa's next-generation stock media marketplace built with Next.js 14.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **State Management:** Zustand + TanStack Query
- **Forms:** React Hook Form + Zod

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

## Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── shared/         # Shared components
│   └── features/       # Feature-specific components
├── lib/                # Utilities and helpers
├── hooks/              # Custom React hooks
├── stores/             # Zustand stores
├── types/              # TypeScript types
└── styles/             # Global styles
```

## Development

- Run `npm run lint` to check for linting errors
- Run `npm run type-check` to check TypeScript types
- Run `npm test` to run unit tests

## Documentation

See [234photos _ Frontend Engineering PRD.md](./234photos%20_%20Frontend%20Engineering%20PRD.md) for complete specifications.
