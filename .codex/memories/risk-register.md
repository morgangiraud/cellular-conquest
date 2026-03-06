# Risk Register

## Active risks

### R1: Engine and context coupling
- Severity: high
- Description: Engine objects are mutated and then cloned into React state across multiple flows, increasing regression risk.
- Impact: subtle sync bugs between visual state and true game state.
- Mitigation: isolate immutable snapshots and add tests around assign/clone/update boundaries.

### R2: Low automated coverage
- Severity: high
- Description: Tests focus on selected territory and clone behavior only.
- Impact: rule regressions can ship unnoticed.
- Mitigation: expand tests for `nextState`, `checkWin`, context state transitions, and realtime event handling.

### R3: Duplicated flow logic offline vs multiplayer
- Severity: medium
- Description: Turn/simulation logic exists in both contexts with similar but separate implementations.
- Impact: behavior drift and double maintenance.
- Mitigation: extract shared helpers/state transition utilities.

### R4: Realtime payload fragility
- Severity: medium
- Description: Event handlers rely on payload casting and reconstruction with minimal runtime validation.
- Impact: malformed events can desync client game state.
- Mitigation: enforce stricter typing and guard checks at channel boundaries.

### R5: Security posture in leaderboard/service-role usage
- Severity: medium
- Description: Leaderboard page uses service role key in server component path.
- Impact: accidental exposure risk if boundaries are changed incorrectly.
- Mitigation: keep service-role usage isolated and audited; prefer least-privilege reads when feasible.

### R6: UX clarity debt
- Severity: medium
- Description: Feedback indicates confusion about outcomes, territory, and strategic options.
- Impact: player retention and gameplay quality issues.
- Mitigation: improve guidance, previews, and progressive onboarding aids.
