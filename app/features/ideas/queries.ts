import type { SupabaseClient } from "@supabase/supabase-js";
import type { BookCardItem } from "~/features/books/type";

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
): Promise<BookCardItem[]> => {
  const fromTable = !userId ? "gemini_ideas" : "all_gemini_ideas";

  const { data, error } = await client
    .from(`${fromTable}`)
    .select("*", { head: false, count: "exact" })
    .eq("keyword", keyword)
    .limit(10);

  if (error) throw new Error(error.message);
  const books = new Map<string, BookCardItem>();
  for (const row of data) {
    const title = typeof row.title === "string" ? row.title.trim() : "";
    if (!title) continue;

    const author = typeof row.author === "string" ? row.author.trim() : "";
    const cover = typeof row.cover === "string" ? row.cover.trim() : "";
    const itemId = JSON.stringify([title, author, cover]);
    books.set(itemId, { itemId, title, author, cover });
  }
  return [...books.values()];
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
