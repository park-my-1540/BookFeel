create or replace function increment_used_count(uid uuid)
returns void as $$
begin
    update user_gemini_usage
    set used_count = used_count + 1
    where profile_id = uid;
end
$$ language plpgsql;