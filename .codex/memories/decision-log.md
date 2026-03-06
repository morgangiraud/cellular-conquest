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
