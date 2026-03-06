# State Machine Reference

## States

- `init`
- `a`
- `a_waiting`
- `b`
- `b_waiting`
- `gol`
- `end`

## Offline flow

1. Start in `init`, then pick initial player on restart.
2. Active player toggles up to `NB_MAX_MOVES` cells.
3. Player validates.
4. When both validated, transition to `gol`.
5. Run `NB_UPDATE_PER_TURN` engine updates or stop early on win.
6. Return to initial player state or transition to `end`.

## Multiplayer flow

1. Lobby emits `game_start` with game id and players.
2. Each client subscribes to `game-{id}` channel.
3. `move` events sync local staged board and move list.
4. `validation` events sync validation flags and move turn progression.
5. When both validated, both clients execute `gol` loop.
6. Winner triggers DB update (`games.winner_id`) by winning client.

## Timing behavior

- Simulation loop interval is `1000 / FRAME_RATE` ms.
- Diff preview is recomputed before/after simulation phase.
