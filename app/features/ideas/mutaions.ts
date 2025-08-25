import type { SupabaseClient } from "@supabase/supabase-js";
interface booksWithKeyword {
  title: string;
  author: string;
  cover: string;
  keyword: string;
}

export const insertIdeasByUser = async (
  client: SupabaseClient,
  booksWithKeyword: booksWithKeyword[],
  userId: string
) => {
  // 먼저 해당 유저의 userCustom 관련 데이터 삭제
  const { error: deleteError } = await client
    .from("user_custom_keywords")
    .delete()
    .eq("profile_id", userId);

  if (deleteError) {
    console.error("삭제 실패:", deleteError);
    throw deleteError;
  }

  // 이후 새로운 데이터 삽입
  const { data, error: insertError } = await client
    .from("user_custom_keywords")
    .insert(
      booksWithKeyword.map((book) => ({
        ...book,
        keyword: "userCustom",
        profile_id: userId,
      }))
    );

  if (insertError) {
    console.error("삽입 실패:", insertError);
    throw insertError;
  }
};
export const insertIdeas = async (
  client: SupabaseClient,
  booksWithKeyword: booksWithKeyword[]
) => {
  const { data, error } = await client.from("gemini_ideas").insert(
    booksWithKeyword.map((book) => ({
      title: book.title,
      author: book.author,
      cover: book.cover,
      keyword: book.keyword,
    }))
  );
  if (error) {
    console.error(error);
    throw error;
  }
};

export const resetUsedGemini = async (client: SupabaseClient) => {
  const { data, error } = await client
    .from("user_gemini_usage")
    .update({ used_count: 0 })
    .not("used_count", "is", null);
  if (error) {
    throw error;
  }
};
