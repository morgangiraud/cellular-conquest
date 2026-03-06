# Repository Guidelines

## Purpose

This repository hosts Cellular Conquest, a Next.js strategy game with offline and Supabase-powered multiplayer modes. Use this file as the primary runbook for engineering changes.

## Command Runbook

- Install deps: `yarn`
- Dev server: `yarn dev`
- Build: `yarn build`
- Lint: `yarn lint`
- Type check: `yarn typecheck`
- Tests: `yarn test`
- CI sequence: `yarn ci`
- Supabase type regen: `yarn db:gen`
- Supabase linked diff: `yarn db:diff:linked`
- Clean Next artifacts: `yarn clean`

## Project Map

- Game engine and rules:
  - `src/Game.ts`
  - `src/constants.ts`
  - `src/utils.ts`
- Offline gameplay:
  - `src/app/Game.tsx`
  - `src/app/contexts/GameContext.tsx`
- Multiplayer gameplay and lobby:
  - `src/app/MultiPlayerSwitch.tsx`
  - `src/app/lobby.tsx`
  - `src/app/MultiplayerGame.tsx`
  - `src/app/contexts/MultiplayerGameContext.tsx`
- Shared UI:
  - `src/app/components/*`
  - `src/app/globals.css`
- Auth and middleware:
  - `src/app/auth/callback/route.ts`
  - `src/proxy.ts`
- Supabase schema and config:
  - `supabase/config.toml`
  - `supabase/migrations/*.sql`
  - `src/lib/database.types.ts`
  - `src/types/supabase.ts`
- Current tests:
  - `tests/Game.test.ts`

## Skills Routing

Invoke these repo-local skills when matching work appears:

- `$cellular-engine`: game rules, state machine, territory logic, move limits, win checks, engine tests.
- `$supabase-multiplayer`: auth, lobby/game channels, realtime payloads, SQL migrations/policies, DB type alignment.
- `$ui-gameplay-iteration`: UX clarity, board interactions, game status messaging, layout, accessibility, guidance UI.

## Workflow Defaults

- Start every new task on a dedicated branch before editing files.
- Update `.codex/memories` whenever architecture, data flow, risks, or major decisions change.
- Keep all stored project information current when related code or behavior changes.
- Run all applicable checks before handoff (`yarn lint`, `yarn typecheck`, `yarn test`, plus targeted checks for the touched area).
- If a check cannot run, explicitly report what is blocked and why.

## Contribution Rules

- Keep engine logic deterministic and test-backed.
- Keep UI concerns in components/styles and rule concerns in engine/context files.
- Keep Supabase schema changes append-only through new migration files.
- When changing event payloads, update both sender/listener logic and `src/types/supabase.ts`.
- Avoid broad refactors that mix engine, UI, and backend changes without explicit need.

## Testing Expectations

- For rule/engine changes, run targeted game tests first.
- For multiplayer changes, verify channel payload shape and lifecycle behavior.
- Before handoff, run all applicable checks when dependencies are installed.
- If dependencies are missing, report exactly what could not be executed.

## Memory Protocol

Persistent project memory is stored in `.codex/memories`.

Update requirements for non-trivial tasks:

- Add or update architecture/data-flow facts when behavior changes.
- Add one entry to `decision-log.md` when making a non-obvious tradeoff.
- Add one entry to `worklog/YYYY-MM.md` with files touched and validation run.
- Keep memory files append-only where noted.
