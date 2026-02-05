# Mishkat Frontend Guidelines

## Project Overview
Next.js 14 frontend for Mishkat learning platform - an Arabic educational platform for AI-powered design workshops.

## Architecture

### Directory Structure
- `src/app/` - Next.js App Router pages
- `src/components/` - Reusable React components
- `src/lib/` - Utilities and server-side helpers
- `src/types/` - TypeScript type definitions

### Key Pages
- `/` - Homepage with courses showcase
- `/workshop/[id]` - Workshop landing page (should redirect enrolled users)
- `/workshop/[id]/watch/[lessonId]` - Video watching page (auth protected)
- `/profile` - User dashboard with progress stats

### Components Organization
- `components/home/` - Homepage components
- `components/workshop/` - Workshop display components
- `components/profile/` - Profile/dashboard components
- `components/shared/` - Shared UI components
- `components/guards/` - Auth guards

### Data Fetching
- Server-side: `lib/server/user.ts` - `getUser()`, `getDashboardStats()`
- Client-side: Use `credentials: "include"` for authenticated requests
- API URL: `process.env.API_URL` (server) or `process.env.NEXT_PUBLIC_API_URL` (client)

### Progress Display
- Dashboard shows: Courses completed, Hours learned, Certificates
- Workshop cards show: Progress bar, Completed/Total sessions
- "Continue Learning" should link to next unwatched session

### Session Navigation
- Sessions indexed by `idx` field (1, 2, 3...)
- URL pattern: `/workshop/{workshopSlug}/watch/{sessionId}`

## Important Files
- `src/app/workshop/[id]/page.tsx` - Workshop landing (needs redirect logic)
- `src/components/profile/Dashboard.tsx` - Progress display
- `src/lib/server/user.ts` - Server-side data fetching
- `src/types/workshop.ts` - Workshop type definitions

## Last Updated
2026-02-03 - Added session navigation and progress tracking documentation
