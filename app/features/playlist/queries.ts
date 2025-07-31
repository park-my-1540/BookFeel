import type { SupabaseClient } from "@supabase/supabase-js";

export const getPlaylists = async (client: SupabaseClient) => {
  const { data, error } = await client
    .from("playlists")
    .select(`profile_id,title,author,url,upvotes, playlist_id`);
  if (error) throw error;
  return data;
};
