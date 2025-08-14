import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "react-router";

export const updateUserAvatar = async (
  client: SupabaseClient,
  { id, avatarUrl }: { id: string; avatarUrl: string }
) => {
  const { error } = await client
    .from("profiles")
    .update({ profile_id: id, avatar: avatarUrl })
    .eq("profile_id", id);
  if (error) throw error;
};

export const updateUser = async (
  client: SupabaseClient,
  { id, username, bio }: { id: string; username: string; bio: string }
) => {
  const { data, error } = await client
    .from("profiles")
    .update({ profile_id: id, username, bio })
    .eq("profile_id", id);
  if (error) throw error;
};

export const getUserId = async (client: SupabaseClient) => {
  const { data, error } = await client.auth.getUser();
  const user = !error && data?.user ? data.user : null;
  return user?.id ?? null;
};
export const getUserProfile = async (
  client: SupabaseClient,
  { username }: { username: string }
) => {
  const { data, error } = await client
    .from("profiles")
    .select(`profile_id, name, username, avatar, bio, email`)
    .eq("username", username)
    .single();
  if (error) throw error;
  return data;
};
