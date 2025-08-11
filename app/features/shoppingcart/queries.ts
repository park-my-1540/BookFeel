import type { SupabaseClient } from "@supabase/supabase-js";

export const getShoppingCart = async (client: SupabaseClient) => {
  const { data, error } = await client
    .from("shopping_cart")
    .select(`*`)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};
