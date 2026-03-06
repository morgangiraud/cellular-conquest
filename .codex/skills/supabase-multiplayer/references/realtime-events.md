# Realtime Events Reference

## Channels

- Lobby channel: `lobby`
- Game channel: `game-{id}`

## Lobby events

- `game_start`
- Payload:
  - `game_id: string`
  - `players: string[]`

## Game events

- `move`
  - `player`
  - `move: [row, col]`
  - `moves: [string[], string[]]`
  - `cells`
  - `game_frozen_cells`
- `validation`
  - `player`
  - `playerValidations: [boolean, boolean]`
  - `cells`

## Current implementation notes

- Broadcast uses `self: true` in channel config.
- Event handlers currently cast incoming payloads and rebuild `Cell` objects.
- Payload contracts are maintained in `src/types/supabase.ts`.
