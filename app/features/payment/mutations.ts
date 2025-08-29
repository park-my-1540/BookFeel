import type { SupabaseClient } from "@supabase/supabase-js";

export const createOrders = async (
  client: SupabaseClient,
  {
    userId,
    total_price,
    title,
    method,
    cover_url,
  }: {
    userId: string;
    total_price?: number;
    title: string;
    method: string;
    cover_url: string;
  }
) => {
  const { data: orderId, error } = await client
    .from("orders")
    .insert({
      profile_id: userId,
      total_price,
      method,
      title,
      cover_url,
    })
    .select("id");
  if (error) {
    throw error;
  }

  return { orderId };
};
