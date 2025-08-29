import type { SupabaseClient } from "@supabase/supabase-js";

export const getOrders = async (
  client: SupabaseClient,
  { userId }: { userId: string }
) => {
  const { data, error } = await client
    .from("orders")
    .select(`*`)
    .eq("profile_id", userId);

  if (error) throw error;
  return data;
};
