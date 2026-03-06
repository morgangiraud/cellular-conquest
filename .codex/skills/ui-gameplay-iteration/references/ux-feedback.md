# UX Feedback Reference

## Feedback summary (session 1)

- Game felt too long.
- Players felt blocked from impacting the opposite fortress area.
- Information density was not enough for players to understand outcomes.
- Rules felt random due to lack of guidance.

## Existing/recorded direction

- Increase move capacity (already reflected as `NB_MAX_MOVES = 5`).
- Allow territorial influence expansion around active cells.
- Show immediate next-step update preview.
- Improve visibility of playable territory.
- Provide bestiary or pattern guidance for strategic play.

## Current UX surfaces to improve first

- Turn status clarity in `Game.tsx` and `MultiplayerGame.tsx`.
- Move limit feedback and tooltip behavior in `GridView.tsx`.
- Onboarding explanation in `AboutModal.tsx` and `Legend.tsx`.
