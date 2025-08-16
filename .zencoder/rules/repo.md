# Repository Info

- **Name**: InterviewX
- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript/React
- **Styling**: Tailwind CSS, shadcn/ui
- **Auth**: Clerk
- **DB**: PostgreSQL (Neon) with Drizzle ORM
- **AI**: Gemini via @google/generative-ai

## Scripts
- **dev**: next dev
- **build**: next build
- **start**: next start
- **db:push**: npx drizzle-kit push
- **db:studio**: npx drizzle-kit studio

## Env Vars
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY
- NEXT_PUBLIC_GEMINI_API_KEY
- DATABASE_URL
- NEXT_PUBLIC_DATABASE_URL

## Protected Routes
- /dashboard/*
- /forum/*

## Entry
- app/layout.js wraps with ClerkProvider
- app/page.js redirects to /dashboard