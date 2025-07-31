create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    -- 익명 프로필을 만든다.
    -- new 키워드는 어떤 데이터에 접근할수 잇음
    if new.raw_app_meta_data is not null then
      -- raw_app_meta_data칼럼을 가지고 있고 provider이 email이면 이메일로 계정이 생성되었을때
        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' then
            if new.raw_user_meta_data ? 'name' and new.raw_user_meta_data ? 'username' then
                insert into public.profiles (profile_id, name, username)
                values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'username');
            else
                insert into public.profiles (profile_id, name, username)
                values (new.id, 'Anonymous', 'mr.' || substr(md5(random()::text), 1, 8));
            end if;
        end if;
        -- 카카오
         if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'kakao' then
            insert into public.profiles (profile_id, name, username, avatar)
            values (new.id, 
                    new.raw_user_meta_data ->> 'name', 
                    new.raw_user_meta_data ->> 'preferred_username', 
                    new.raw_user_meta_data ->> 'avatar_url');
        end if;
        -- 구글
         if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'google' then
            insert into public.profiles (profile_id, name, username, avatar)
            values (
                new.id,
                new.raw_user_meta_data ->> 'name',
                new.raw_user_meta_data ->> 'full_name', 
                new.raw_user_meta_data ->> 'avatar_url'
            );
        end if;


    end if;
    return new;
end;
$$;

create trigger user_to_profile_trigger --이 function이 실행된다.
after insert on auth.users --auth.users에 새로운 유저가 insert 된 이후에
for each row execute function public.handle_new_user(); --이 작업은 각행에 대해 실행