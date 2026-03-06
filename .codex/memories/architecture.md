# Architecture Snapshot

## Stack
- Next.js 13 app router with TypeScript and Tailwind CSS.
- Supabase for auth, realtime channels, and PostgreSQL.
- Jest for current unit tests.

## Core domains
- Game engine domain in `src/Game.ts`.
- Shared game constants/types in `src/constants.ts`.
- Utility helpers in `src/utils.ts`.

## Runtime modules
- App root:
  - `src/app/layout.tsx`
  - `src/app/page.tsx`
- Offline mode:
  - `src/app/Game.tsx`
  - `src/app/contexts/GameContext.tsx`
- Multiplayer mode:
  - `src/app/MultiPlayerSwitch.tsx`
  - `src/app/lobby.tsx`
  - `src/app/MultiplayerGame.tsx`
  - `src/app/contexts/MultiplayerGameContext.tsx`
- Shared presentation:
  - `src/app/components/*`
  - `src/app/svgs/*`
  - `src/app/globals.css`

## Data and backend
- Supabase config in `supabase/config.toml`.
- Schema and policies in `supabase/migrations/*.sql`.
- Generated DB typing in `src/lib/database.types.ts`.
- Event typing in `src/types/supabase.ts`.

## Tests
- Current tests in `tests/Game.test.ts` target selected `Grid` behavior.
- No integration coverage yet for contexts/realtime flows.
