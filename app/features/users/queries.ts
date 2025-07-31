import type { SupabaseClient } from "@supabase/supabase-js";

export const getUserProfileById = async (
  client: SupabaseClient,
  { id }: { id: string }
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
          profile_id, name, username, avatar, bio`
    )
    .eq("profile_id", id)
    .single();
  if (error) throw error;
  return data;
};
