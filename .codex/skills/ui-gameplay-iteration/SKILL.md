---
name: ui-gameplay-iteration
description: Iterate gameplay UX, clarity, and accessibility for Cellular Conquest UI. Use when work touches pages/components, board interaction cues, status messaging, tooltips, visual feedback, or user-guidance improvements in `src/app/**` and `src/app/globals.css`.
---

# UI Gameplay Iteration

## Overview

Use this skill to improve player comprehension, interaction feedback, and interface consistency without breaking game logic.

## Workflow

1. Read `references/component-map.md` before changing component boundaries.
2. Read `references/ux-feedback.md` to prioritize user pain points already captured.
3. Read `references/accessibility-checklist.md` before introducing new controls or motion.
4. Keep game rules in engine/context files; keep visual and interaction changes in UI components and styles.
5. Update copy, legend, and status cues together when changing interaction semantics.

## Guardrails

- Keep actionable feedback visible: whose turn, move limits, upcoming simulation changes, and victory state.
- Preserve mobile and desktop usability.
- Avoid introducing accessibility regressions in focus handling, keyboard actions, or color contrast.
- Prefer small reusable UI components over duplicated JSX.

## Validation

- Verify primary flows: offline game, login modal, lobby, multiplayer game, leaderboard.
- Confirm key interactions: space to validate, cell selection limits, tooltip behavior.
- If dependencies are installed, run lint/typecheck/tests before handoff.
