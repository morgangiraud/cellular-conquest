# Decision Log

Append only. Do not rewrite past entries; add a new entry for reversals.

## 2026-03-06 - Node 24 baseline alignment

- Context: Local environment and team runtime moved forward to Node 24 after the initial dependency refresh standardized on Node 22.13.0.
- Decision: Raise project runtime baseline to Node 24 across `.nvmrc`, package engines, CI setup, and docs.
- Rationale: Keep local/CI runtime expectations aligned and unlock newest engine-compatible dependency paths without `--ignore-engines` workarounds.

## 2026-03-06 - Major dependency refresh with Node baseline bump

- Context: Upgrading direct dependencies to current major versions introduced engine constraints (ESLint/Next stack) and API changes (Supabase auth helper clients, Next 16 cookie/session flow).
- Decision: Standardize project runtime on Node `22.13.0`, migrate auth client creation to shared `src/lib/supabase/*` factories, adopt ESLint flat config for Next 16, and prune unused direct dependencies while keeping Tailwind on the 3.4 line for compatibility.
- Rationale: Preserve momentum on security/runtime freshness without a full UI styling migration, while restoring passing lint/type/test/build checks after framework and SDK upgrades.

## 2026-03-06 - Codex workflow defaults

- Context: Need explicit standing execution rules for all future Codex work in this repository.
- Decision: Always start new work on a dedicated branch, keep memories/stored docs updated, and run all applicable checks before handoff.
- Rationale: Improve traceability, reduce stale project knowledge, and catch regressions earlier.

## 2026-03-06 - Long-work bootstrap

- Context: Need persistent project scaffolding for long-running collaboration.
- Decision: Standardize on repo-local `.codex/skills`, `.codex/memories`, and root `AGENTS.md`.
- Rationale: Keep project context discoverable, versioned, and reusable across sessions.

## 2026-03-06 - GitHub Actions CI baseline

- Context: Need a proper automated CI pipeline on `chore/codex-long-work-bootstrap` to validate every change consistently.
- Decision: Add `.github/workflows/ci.yml` that runs on `push`, `pull_request`, and manual dispatch with Node 20, Yarn cache, `yarn install --frozen-lockfile`, `yarn ci`, then `yarn build`.
- Rationale: Keep local and remote validation aligned while catching lint/type/test/build regressions before merge.

## 2026-03-06 - Prettier cleanup scope

- Context: Lint failed because Prettier checks covered repository docs/memory files in addition to source files, and existing drift was spread across `.codex/*` and `AGENTS.md`.
- Decision: Apply `yarn format` at repository scope (not source-only) so CI lint and local lint enforce one consistent formatting baseline.
- Rationale: Avoid recurring false-negative lint failures from non-source files and keep tooling behavior predictable.

## 2026-03-06 - Build-safe Supabase env handling

- Context: CI/Vercel builds failed while prerendering `/` and `/leaderboard` because Supabase env vars were missing and server components instantiated clients unconditionally.
- Decision: Add server-side env guards and fallback rendering paths rather than requiring CI secrets for build-only validation.
- Rationale: Keeps build deterministic across environments and preserves offline/single-player availability when Supabase is not configured.

## 2026-03-06 - Supabase runtime failure fallback

- Context: Vercel status remained failed after env-guard changes, suggesting some deployments may still have partial/invalid Supabase configuration that can fail during server-side calls.
- Decision: Wrap server-side Supabase auth/profile calls in `try/catch` and return safe fallback UI/state instead of throwing.
- Rationale: Prevent transient or misconfigured Supabase connectivity from blocking deployments or static generation.

## 2026-03-06 - Engine regression test expansion for optimization safety

- Context: Future engine optimizations could unintentionally change deterministic rule outcomes, while existing tests mostly covered territory seeding and grid cloning.
- Decision: Expand `tests/Game.test.ts` with deterministic regression coverage for `Grid.nextState`, `Grid.computeNextStates`, `Grid.update`, `Grid.assignCells`, and `Game.checkWin` fortress boundary handling.
- Rationale: Protect gameplay rules with behavior-level assertions so implementation-level optimization can proceed safely.
- Consequences: Unit test scope increases slightly, but confidence in refactor safety improves.
- Follow-up: Add context/state-machine transition tests when turn-flow logic is optimized.

## 2026-03-06 - Explicit engine-risk CI gate

- Context: Need faster signal on rule regressions while optimizing the game engine and preserving deterministic behavior.
- Decision: Add a dedicated CI step that runs `yarn test --runInBand tests/Game.test.ts` before the broader `yarn ci` and build steps.
- Rationale: Fails fast on the highest-risk engine contract while keeping full lint/type/full-test/build coverage.
- Consequences: Engine tests run twice in CI (targeted + full suite) but improve failure diagnostics.
- Follow-up: Split test suites by domain if test volume grows enough to require runtime optimization.
