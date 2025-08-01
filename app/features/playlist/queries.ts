import type { SupabaseClient } from "@supabase/supabase-js";

export const getPlaylists = async (client: SupabaseClient) => {
  const { data, error } = await client
    .from("playlists")
    .select(`profile_id,title,author,url,upvotes, playlist_id`);
  if (error) throw error;
  return data;
};

export const createPlaylist = async (
  client: SupabaseClient,
  {
    userId,
    title,
    author,
    url,
    reason,
  }: {
    userId: string;
    title: string;
    author: string;
    url: string;
    reason: string;
  }
) => {
  const { error } = await client.from("playlists").insert({
    profile_id: userId,
    title,
    author,
    url,
    reason,
  });
  if (error) throw error;
};
