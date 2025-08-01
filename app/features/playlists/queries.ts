import type { SupabaseClient } from "@supabase/supabase-js";

export const getPlaylists = async (client: SupabaseClient) => {
  const { data, error } = await client
    .from("playlist_list_view")
    .select(`*`)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const getUserPlaylists = async (
  client: SupabaseClient,
  { profile_id }: { profile_id: string }
) => {
  const { data, error } = await client
    .from("playlist_list_view")
    .select(`*`)
    .eq("profiles.profile_id", profile_id);
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

export const togglePlaylistUpvote = async (
  client: SupabaseClient,
  { playlistId, userId }: { playlistId: string; userId: string }
) => {
  const { count } = await client
    .from("upvotes")
    .select("*", { count: "exact", head: true })
    .eq("playlist_id", playlistId)
    .eq("profile_id", userId);

  if (count === 0) {
    await client
      .from("upvotes")
      .insert({ profile_id: userId, playlist_id: playlistId });
  } else {
    const { data, error } = await client
      .from("upvotes")
      .delete()
      .eq("playlist_id", playlistId)
      .eq("profile_id", userId);
  }
};
