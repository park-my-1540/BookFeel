create or replace function increment_used_count(uid uuid)
returns void as $$
begin
    insert into user_gemini_usage (profile_id, used_count)
    values (uid, 1)
    on conflict (profile_id) 
    do update set used_count = user_gemini_usage.used_count + 1;
end
$$ language plpgsql;