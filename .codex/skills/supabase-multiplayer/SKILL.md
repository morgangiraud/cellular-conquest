---
name: supabase-multiplayer
description: Maintain realtime multiplayer and Supabase-backed gameplay flows. Use when tasks involve auth/session handling, lobby/game channels, Supabase event payloads, SQL migrations, RLS policies, profile score updates, or `src/app/contexts/MultiplayerGameContext.tsx`.
---

# Supabase Multiplayer

## Overview
Use this skill to implement reliable multiplayer behavior across realtime events, database state, and auth boundaries.

## Workflow
1. Read `references/realtime-events.md` before changing payload shapes or channel handlers.
2. Read `references/schema-rls.md` before touching migrations, policies, or generated DB types.
3. Read `references/game-lifecycle.md` before changing lobby start, game end, or winner persistence.
4. Keep frontend Supabase logic in context/page files and database changes in `supabase/migrations`.
5. Regenerate `src/lib/database.types.ts` only when schema changes.

## Guardrails
- Keep payload contracts in `src/types/supabase.ts` aligned with channel send/listen behavior.
- Avoid broad RLS policies when tighter policy conditions are possible.
- Ensure winner updates remain idempotent and only happen on valid end states.
- Treat service-role usage as high risk; keep it server-side only.

## Validation
- Validate TypeScript contracts for events after any payload changes.
- For SQL changes, verify migration ordering and policy compatibility.
- If dependencies are installed, run `yarn typecheck` and targeted multiplayer tests.
