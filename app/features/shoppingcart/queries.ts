import type { SupabaseClient } from "@supabase/supabase-js";

export const getShoppingCart = async (
  client: SupabaseClient,
  userId: string
) => {
  const { data, error } = await client
    .from("shopping_cart")
    .select(`*`)
    .eq("profile_id", userId)
    .order("created_at", { ascending: false })
    .select();
  if (error) throw error;
  return { data, error };
};
