create function public.update_players_elo_score()
 returns trigger
 language plpgsql
security definer set search_path = public
as $$
declare 
    score_a float;
    score_b float;
    ea float; -- expected score of player a
    eb float; -- expected score of player b
    k constant float := 32; -- k-factor. adjust as necessary.
    win_point int;
begin
    select profiles.score into score_a from profiles where id = new.player_a_id;
    select profiles.score into score_b from profiles where id = new.player_b_id;

    ea = 1.0 / (1.0 + 10.0^((score_b - score_a) / 400.0));
    eb = 1.0 / (1.0 + 10.0^((score_a - score_b) / 400.0));

    if new.winner_id = new.player_a_id then
        win_point = 1;
    else
        win_point = 0;
    end if;
    score_a = score_a + k * (win_point - ea);
    score_b = score_b + k * ((1 - win_point) - eb);

    update profiles set score = score_a where id = new.player_a_id;
    update profiles set score = score_b where id = new.player_b_id;
    
    return new;
end;
$$;

create trigger on_games_winner_updated
  after update on public.games
  for each row execute function public.update_players_elo_score();