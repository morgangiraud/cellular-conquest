# Multiplayer Lifecycle Reference

## Entry points
- `src/app/page.tsx`: read session user and route to switch.
- `src/app/MultiPlayerSwitch.tsx`: choose lobby or active game.
- `src/app/lobby.tsx`: track presence and start game.
- `src/app/contexts/MultiplayerGameContext.tsx`: in-game realtime orchestration.

## Lifecycle
1. Authenticated user opens home.
2. User joins lobby presence list.
3. Initiator inserts a `games` row and broadcasts `game_start`.
4. Both players fetch game metadata and enter multiplayer context.
5. Clients exchange `move` and `validation` broadcasts.
6. After dual validation, both simulate locally.
7. Winner transition sets local `end`; winner writes `games.winner_id`.
8. DB trigger updates ELO scores in `profiles`.

## Failure points to watch
- Dropped channel subscription or stale channel cleanup.
- Payload shape drift between sender and listener.
- Duplicate winner writes.
- Service role usage in server components.
