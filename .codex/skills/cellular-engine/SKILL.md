---
name: cellular-engine
description: Maintain and evolve the local game engine for Cellular Conquest. Use when work touches game rules, turn resolution, territory computation, win checks, simulation updates, move limits, or tests around `src/Game.ts`, `src/constants.ts`, and `tests/Game.test.ts`.
---

# Cellular Engine

## Overview

Use this skill to implement and validate deterministic game behavior in offline and multiplayer modes.

## Workflow

1. Read `references/game-rules.md` before changing any rules or constants.
2. Read `references/state-machine.md` when changing turn flow or validation behavior.
3. Read `references/test-strategy.md` before adding or modifying tests.
4. Keep engine changes in `src/Game.ts`, `src/constants.ts`, or pure helpers in `src/utils.ts`.
5. Keep UI-only changes out of this skill unless required to expose engine outputs.
6. Run focused tests first, then broader checks if dependencies are available.

## Guardrails

- Preserve deterministic behavior for `Grid.computeNextStates`, `Grid.computeTerritories`, `Grid.update`, and `Game.checkWin`.
- Prefer adding tests for every behavior change in engine logic.
- Keep constants and behavior aligned: `NB_MAX_MOVES`, `NB_UPDATE_PER_TURN`, `BOARD_SIZE`, and `FRAME_RATE`.
- Avoid hidden coupling between React state and engine classes; clone cell state when crossing boundaries.

## Validation

- Run `yarn test --runInBand tests/Game.test.ts` for engine-level changes.
- If dependencies are installed, run `yarn typecheck` and `yarn test` before handoff.
