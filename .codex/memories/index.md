# Cellular Conquest Memory Index

## Purpose

Persistent project memory for long-running engineering work in this repository.

## Files

- `architecture.md`: module map and system boundaries.
- `data-flow.md`: runtime and event flows.
- `risk-register.md`: active technical and product risks.
- `decision-log.md`: append-only decisions.
- `worklog/2026-03.md`: append-only operational log.
- `templates/decision-entry.md`: decision entry template.
- `templates/worklog-entry.md`: worklog entry template.

## Update protocol

- Start each new task on a dedicated branch before making repository changes.
- Update memory files in every substantive implementation PR/session.
- Keep stored facts current when behavior or architecture changes.
- Add one decision log entry when a non-trivial tradeoff is made.
- Add one worklog entry per completed task batch.
- Run all applicable checks for touched areas and record blocked checks in the worklog.
