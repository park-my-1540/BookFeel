import type { SupabaseClient } from "@supabase/supabase-js";
import { desc } from "drizzle-orm";

export const getCategories = async (client: SupabaseClient) => {
  const { data, error } = await client
    .from("category")
    .select(`*`)
    .order("category_id", { ascending: false });

  if (error) throw error;
  return data;
};

export const getGeminiBooks = async (
  client: SupabaseClient,
  keyword: string
) => {
  const baseQuery = client
    .from("all_gemini_ideas")
    .select("*", { head: false, count: "exact" })
    .limit(5);
  if (keyword) {
    baseQuery.eq("keyword", keyword);
  }

  const { data, error } = await baseQuery;

  if (error) throw new Error(error.message);
  return data;
};
