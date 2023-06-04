create sequence "public"."games_id_seq";

create table "public"."games" (
    "id" integer not null default nextval('games_id_seq'::regclass),
    "player_a_id" uuid not null,
    "player_b_id" uuid not null,
    "start_time" timestamp without time zone not null default CURRENT_TIMESTAMP,
    "end_time" timestamp without time zone,
    "winner_id" uuid
);


alter table "public"."games" enable row level security;

alter sequence "public"."games_id_seq" owned by "public"."games"."id";

CREATE UNIQUE INDEX games_pkey ON public.games USING btree (id);

alter table "public"."games" add constraint "games_pkey" PRIMARY KEY using index "games_pkey";

alter table "public"."games" add constraint "games_player_a_id_fkey" FOREIGN KEY (player_a_id) REFERENCES auth.users(id) not valid;

alter table "public"."games" validate constraint "games_player_a_id_fkey";

alter table "public"."games" add constraint "games_player_b_id_fkey" FOREIGN KEY (player_b_id) REFERENCES auth.users(id) not valid;

alter table "public"."games" validate constraint "games_player_b_id_fkey";
