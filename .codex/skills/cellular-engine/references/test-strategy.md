# Test Strategy Reference

## Existing coverage
- `tests/Game.test.ts` covers `Grid.computeTerritories` scenarios and `Grid.clone` behavior.

## Priority test gaps
- `Grid.nextState` birth/death edge cases.
- `Grid.update` correctness across multi-step transitions.
- `Game.checkWin` fortress boundary checks for both players.
- `assignCells` integrity and deep-copy semantics.
- Turn/state transitions inside context providers.

## Test design rules
- Prefer deterministic matrix fixtures for board states.
- Validate both state and territory outcomes after each transition.
- Keep test names behavior-driven and specific.
- Add regression tests for every bug fix touching rule logic.

## Practical commands
- `yarn test --runInBand tests/Game.test.ts`
- `yarn test --runInBand`
