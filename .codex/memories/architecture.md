# Architecture Snapshot

## Stack

- Next.js 16 app router with TypeScript and Tailwind CSS (v3.4 line).
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
- Auth/session edge entry:
  - `src/app/auth/callback/route.ts`
  - `src/proxy.ts`
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
- Supabase auth clients are now centralized in `src/lib/supabase/*`:
  - `browser.ts` for client components.
  - `server.ts` for server components.
  - `config.ts` for shared env resolution.

## Tests

- `tests/Game.test.ts` now covers territory assignment, evolution rules (`nextState`, `computeNextStates`, `update`), assignment/snapshot deep-copy semantics, and `Game` constructor/win behavior.
- No integration coverage yet for contexts/realtime flows.

## Delivery automation

- GitHub Actions CI workflow lives in `.github/workflows/ci.yml`.
- Workflow triggers on `push`, `pull_request`, and manual `workflow_dispatch`.
- CI runner uses Node.js `24` with Yarn dependency caching and deterministic install via `yarn install --frozen-lockfile`.
- Validation sequence runs targeted engine regression tests, then `yarn ci`, then `yarn build`.
- Concurrency cancellation is enabled per branch/ref to avoid duplicate in-flight runs.

## Runtime resilience

- Server-rendered auth/leaderboard entry points now guard against missing Supabase environment variables.
- `/` and nav login fallback to offline/single-player behavior when Supabase client env is absent.
- `/leaderboard` renders an unavailable message when required Supabase env values are not configured.
- Server components wrap Supabase client/session/data calls in `try/catch` to avoid build-time crashes when env values are present but invalid or unreachable.
- Global font loading no longer depends on runtime fetches from `next/font/google`, reducing sandbox/network build sensitivity.
