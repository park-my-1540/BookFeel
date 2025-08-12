import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "react-router";

export const getUserProfileById = async (
  client: SupabaseClient,
  { id }: { id: string }
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id, name, username, avatar, bio, email`
    )
    .eq("profile_id", id)
    .single();
  if (error) throw error;
  return data;
};

export const getLoggedInUserId = async (client: SupabaseClient) => {
  const { data, error } = await client.auth.getUser();
  if (error || data.user === null) {
    throw redirect("/auth/login");
  }
  return data.user.id;
};

export const getUserId = async (client: SupabaseClient) => {
  const { data, error } = await client.auth.getUser();
  const user = !error && data?.user ? data.user : null;
  return user?.id ?? null;
};
