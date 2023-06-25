create policy "Enable read access for all users"
on "public"."games"
as permissive
for select
to public
using (true);


create policy "Users can insert new games"
on "public"."games"
as permissive
for insert
to authenticated
with check (true);


create policy "Users can update their games"
on "public"."games"
as permissive
for update
to public
using (((auth.uid() = player_a_id) OR (auth.uid() = player_b_id)))
with check (((auth.uid() = player_a_id) OR (auth.uid() = player_b_id)));



