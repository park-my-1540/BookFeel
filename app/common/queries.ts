import type { SupabaseClient } from "@supabase/supabase-js";

export const getGeminiBooks = async (
  client: SupabaseClient,
  keyword: string
) => {
  const baseQuery = client
    .from("all_gemini_ideas")
    .select("*", { head: false, count: "exact" })
    .limit(10);
  if (keyword) {
    baseQuery.eq("keyword", keyword);
  }

  const { data, error } = await baseQuery;

  if (error) throw new Error(error.message);
  return data;
};
