import type { SupabaseClient } from "@supabase/supabase-js";
import { keywordPrompt } from "~/features/books/prompts";
import { booksByKeyword } from "~/features/books/services/fetchBooks";
import { insertIdeasByUser } from "~/features/ideas/mutaions";
import { canUseGemini } from "~/features/ideas/queries";
import { adminClient } from "~/supa-client";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash-8b-latest"; // 또는 gemini-pro 등

export async function generateBooksByGemini(keyword: string) {
  const prompt = keywordPrompt(keyword);
  if (!prompt) {
    return Response.json({ error: "Invalid keyword" }, { status: 400 });
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    return Response.json({ error: "No response from Gemini" }, { status: 400 });
  }
  const books = await booksByKeyword(JSON.parse(text));

  const booksWithKeyword = books.map((book) => {
    return {
      keyword: "userCustom",
      title: book.title,
      author: book.author,
      cover: book.cover,
    };
  });

  await insertIdeasByUser(adminClient, booksWithKeyword);
  return Response.json({ ok: true });
}

type SubmitResult =
  | { success: true }
  | {
      success: false;
      reason: "limit-exceeded" | "gemini-failed" | "rpc-failed";
      error?: any;
    };

export async function submitKeywordToGemini(
  client: SupabaseClient,
  keyword: string,
  userId: string
): Promise<SubmitResult> {
  if (!keyword) return { success: false, reason: "gemini-failed" };

  try {
    const canUse = await canUseGemini(client, userId);
    if (!canUse) {
      return { success: false, reason: "limit-exceeded" };
    }

    await generateBooksByGemini(keyword);

    const { data, error } = await client.rpc("increment_used_count", {
      uid: userId,
    });
    if (error) {
      return { success: false, reason: "rpc-failed", error };
    }
    return { success: true };
  } catch (err) {
    console.error("Gemini 추천 처리 중 예외 발생:", err);
    return { success: false, reason: "gemini-failed", error: err };
  }
}
