import type { SupabaseClient } from "@supabase/supabase-js";
import { desc } from "drizzle-orm";

interface booksWithKeyword {
  title: string;
  author: string;
  cover_url: string;
  keyword: string;
}

export const insertIdeasByUser = async (
  client: SupabaseClient,
  booksWithKeyword: booksWithKeyword[]
) => {
  // 먼저 해당 유저의 userCustom 관련 데이터 삭제
  const { error: deleteError } = await client
    .from("user_custom_keywords")
    .delete()
    .eq("keyword", "userCustom");

  if (deleteError) {
    console.error("삭제 실패:", deleteError);
    throw deleteError;
  }

  // 이후 새로운 데이터 삽입
  const { error: insertError } = await client
    .from("user_custom_keywords")
    .insert(
      booksWithKeyword.map((book) => ({
        ...book,
        keyword: "userCustom",
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
      cover_url: book.cover_url,
      keyword: book.keyword,
    }))
  );
  if (error) {
    console.error(error);
    throw error;
  }
};
