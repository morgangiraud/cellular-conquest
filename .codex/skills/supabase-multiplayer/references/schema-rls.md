# Schema and RLS Reference

## Tables

- `profiles`
  - `id` (uuid, pk, fk to `auth.users.id`)
  - `username` (unique)
  - `score` (default 400)
- `games`
  - `id` (sequence int pk)
  - `player_a_id` / `player_b_id` (uuid fk to users)
  - `start_time`
  - `end_time`
  - `winner_id`

## Triggers/functions

- `handle_new_user`: create profile row on auth user insert.
- `update_players_elo_score`: update both player scores after game update.

## Policies

- `profiles`: users can select/insert/update only own profile.
- `games`: select allowed for all; insert for authenticated; update when auth user is `player_a_id` or `player_b_id`.

## Safety checks for changes

- Keep migration files append-only and chronological.
- Re-evaluate policy permissiveness before widening access.
- After schema updates, regenerate `src/lib/database.types.ts`.
