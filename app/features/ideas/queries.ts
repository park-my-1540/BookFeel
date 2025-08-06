import type { SupabaseClient } from "@supabase/supabase-js";

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
    .limit(10);
  if (keyword) {
    baseQuery.eq("keyword", keyword);
  }

  const { data, error } = await baseQuery;

  if (error) throw new Error(error.message);
  return data;
};

export const canUseGemini = async (
  client: SupabaseClient,
  profileId: string,
  dailyLimit = 2
): Promise<boolean> => {
  const { data, error } = await client
    .from("user_gemini_usage")
    .select("used_count")
    .eq("profile_id", profileId)
    .single();
  if (error) {
    throw error;
  }

  return data.used_count < dailyLimit;
};
