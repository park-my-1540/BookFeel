CREATE OR REPLACE FUNCTION public.handle_playlist_upvote()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.playlists SET upvotes = upvotes + 1 WHERE playlist_id = NEW.playlist_id;
    RETURN NEW;
END;
$$;

CREATE TRIGGER playlist_upvote_trigger
AFTER INSERT ON public.upvotes
FOR EACH ROW EXECUTE FUNCTION public.handle_playlist_upvote();


CREATE OR REPLACE  FUNCTION public.handle_playlist_unvote()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.playlists SET upvotes = upvotes - 1 WHERE playlist_id = OLD.playlist_id;
    RETURN OLD;
END;
$$;

CREATE TRIGGER playlist_unvote_trigger
AFTER DELETE ON public.upvotes
FOR EACH ROW EXECUTE FUNCTION public.handle_playlist_unvote();