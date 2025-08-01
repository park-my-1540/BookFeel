CREATE OR REPLACE VIEW playlist_list_view AS
SELECT
    playlist_id,
    name,
    stats->>'upvotes' as upvotes,
    (SELECT EXISTS (SELECT 1 FROM public.upvotes WHERE upvotes.playlist_id = playlists.playlist_id AND upvotes.profile_id = auth.uid())) AS is_upvoted,
    created_at,
    stats
FROM playlists;

select * from playlist_list_view

-- upvote의 profile id와 playlistid가 동일하면 is_upvoted true