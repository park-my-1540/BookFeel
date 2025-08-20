import type { SupabaseClient } from "@supabase/supabase-js";

export const getCategories = async (client: SupabaseClient) => {
  const { data, error } = await client
    .from("category")
    .select(`*`)
    .order("category_id", { ascending: true });

  if (error) throw error;
  return data;
};

export const getGeminiBooks = async (
  client: SupabaseClient,
  keyword: string,
  userId: string
) => {
  if (!userId) return [];
  const baseQuery = client
    .from("all_gemini_ideas")
    .select("*", { head: false, count: "exact" })
    .limit(10);

  if (keyword === "userCustom") {
    baseQuery.eq("keyword", "userCustom");
    baseQuery.eq("profile_id", userId);
  } else {
    baseQuery.eq("keyword", keyword);
  }

  const { data, error } = await baseQuery;

  if (error) throw new Error(error.message);
  return data;
};

export const canUseGemini = async (
  client: SupabaseClient,
  profileId: string,
  dailyLimit = 15
): Promise<boolean> => {
  const { data, error } = await client
    .from("user_gemini_usage")
    .select("used_count")
    .eq("profile_id", profileId)
    .maybeSingle();

  if (error) {
    throw error;
  }
  if (!data) return true;

  return data.used_count < dailyLimit;
};
