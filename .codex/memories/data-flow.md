# Data Flow Snapshot

## Offline gameplay flow

1. `GameContextProvider` creates a `Game` instance and initializes state.
2. User toggles cells via `GridView -> CellView -> handleCellClick`.
3. Move state is stored locally in React state (`moves`, `cells`).
4. User validates; once both player validations are true, state enters `GAME_OF_LIFE`.
5. Interval loop calls `game.grid.update()` and checks `game.checkWin()`.
6. On completion, next diff map is computed for preview of upcoming step.

## Multiplayer lobby flow

1. Authenticated user enters `Lobby`.
2. Client Supabase instance is created through `getSupabaseBrowserClient()`.
3. Client subscribes to `lobby` channel with presence tracking.
4. Initiator inserts game row in `games` table.
5. Initiator broadcasts `game_start` with numeric `game_id` and players.
6. Both players load metadata and mount multiplayer context.

## Auth/session flow

1. Server components create Supabase clients via `getSupabaseServerClient()` (async `cookies()` compatible with Next 16).
2. Route handler `/auth/callback` exchanges auth code using `createServerClient` and writes updated cookies onto the redirect response.
3. `src/proxy.ts` uses `createServerClient` with request/response cookie bridging to keep sessions refreshed.
4. Client components share a singleton browser client via `getSupabaseBrowserClient()`.

## Multiplayer game flow

1. Client subscribes to `game-{id}` channel for `move` and `validation`.
2. Broadcast payloads now use string literal event type `"broadcast"` in sync with latest Supabase realtime typings.
3. On `move`, receiver updates staged cells, move list, and diff preview.
4. On `validation`, receiver updates validation flags and turn state.
5. When both validated, each client runs local simulation loop.
6. Winning client updates `games.winner_id`; DB trigger updates ELO scores.

## Persistence boundaries

- Local cell evolution is in-memory on clients.
- Persistent records:
  - `games` table (participants, winner, timestamps)
  - `profiles` table (username, score)

## CI validation flow

1. GitHub `push`, `pull_request`, or manual dispatch triggers `.github/workflows/ci.yml`.
2. Runner checks out repository and installs dependencies from `yarn.lock`.
3. Targeted engine regression suite runs with `yarn test --runInBand tests/Game.test.ts`.
4. `yarn ci` runs lint, type check, and full unit tests in sequence.
5. `yarn build` validates production build compilation in the same pipeline run.

## Missing-env fallback flow

1. Server components check for required Supabase env vars before constructing Supabase clients.
2. If vars are missing on `/`, page returns single-player mode (`user = null`) instead of attempting auth lookup.
3. If vars are missing in nav login, login control is not rendered.
4. If vars are missing on `/leaderboard`, page returns an availability message and skips database queries.
5. If Supabase calls throw during auth/profile access, components catch errors and return the same safe fallback rendering.
