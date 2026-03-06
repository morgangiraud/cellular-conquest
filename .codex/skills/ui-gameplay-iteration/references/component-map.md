# Component Map Reference

## Root layout

- `src/app/layout.tsx`: global shell, nav, footer, analytics.
- `src/app/page.tsx`: auth-aware entry, mounts `MultiPlayerSwitch`.

## Mode routing

- `src/app/MultiPlayerSwitch.tsx`: routes between offline game and multiplayer lobby/game.

## Offline gameplay

- `src/app/Game.tsx`
- `src/app/contexts/GameContext.tsx`

## Multiplayer gameplay

- `src/app/MultiplayerGame.tsx`
- `src/app/contexts/MultiplayerGameContext.tsx`
- `src/app/lobby.tsx`

## Shared game UI

- `src/app/components/GridView.tsx`
- `src/app/components/CellView.tsx`
- `src/app/components/Legend.tsx`
- `src/app/components/Button.tsx`
- `src/app/components/Loader.tsx`
- `src/app/components/AboutModal.tsx`

## Auth/navigation

- `src/app/components/login.tsx`
- `src/app/components/LoginForm.tsx`
- `src/app/components/Nav.tsx`

## Styles

- `src/app/globals.css`
- `tailwind.config.js`
