# Accessibility Checklist

## Keyboard

- Keep space key validation functional and discoverable.
- Ensure modal open/close supports keyboard interaction.
- Ensure focus states are visible on interactive controls.

## Semantics

- Use button elements for click actions.
- Add meaningful labels/text for icon-only controls.
- Preserve heading hierarchy on game/lobby pages.

## Visual contrast and motion

- Verify contrast for text over `--background`, `--cell-a`, and `--cell-b` colors.
- Keep animation optional and short; avoid excessive bounce/flicker.
- Preserve readable status text and move counters on small screens.

## Responsive behavior

- Verify board, legend, and status do not overlap on mobile widths.
- Ensure tooltips and modals stay within viewport bounds.

## Validation pass

- Manual pass for offline, lobby, multiplayer, leaderboard.
- Confirm no interaction depends on hover-only affordances.
