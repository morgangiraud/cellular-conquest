# Game Rules Reference

## Core constants
- `BOARD_SIZE = 13`
- `NB_MAX_MOVES = 5`
- `NB_UPDATE_PER_TURN = 7`
- `FRAME_RATE = 8`

## Cell model
- Cell states: `empty`, `a`, `b`.
- Territories: `a`, `b`, `ab`, `empty`.

## Turn constraints
- Players can toggle cells in their allowed territory.
- Max toggles per player turn is `NB_MAX_MOVES`.
- Validation requires both players before simulation starts.

## Simulation rule set
- Use Conway-style neighbor counting over 8 neighbors.
- Birth rule: empty cell with 3 live neighbors.
- Birth owner: majority of live neighbor types (`a` vs `b`).
- Death rule: non-empty cell dies with <2 or >3 live neighbors.

## Territory computation
- Initial split by board middle rows.
- Existing occupied cells force territory ownership at their coordinates.
- Neighbor influence can merge into `ab` contested territory.

## Win condition
- Player B wins if any `b` cell enters fortress A bounds.
- Player A wins if any `a` cell enters fortress B bounds.
- `false` means no winner yet.
