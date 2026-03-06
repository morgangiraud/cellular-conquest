# Decision Log

Append only. Do not rewrite past entries; add a new entry for reversals.

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
