import { insertIdeas } from "~/features/ideas/mutaions";
import { adminClient } from "~/supa-client";
import type { Route } from "../../../+types/root";
import { keywordPrompt } from "../prompts";
import { booksByKeyword } from "../services/fetchBooks";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash-8b-latest"; // 또는 gemini-pro 등

export const loader = async ({ request }: Route.LoaderArgs) => {
  //   endpoint 보호
  // if (request.method !== "POST") {
  //   return new Response(null, { status: 404 });
  // }

  // //   필요한 헤더 있는지
  // const headers = request.headers.get("X-POTATO");
  // if (!headers || headers !== "X-TOMATO") {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  if (!GEMINI_API_KEY) {
    // 프로덕션 키 누락 즉시 확인
    return Response.json({ error: "GEMINI_API_KEY missing" }, { status: 500 });
  }

  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword") ?? "";
  const userCustom = url.searchParams.get("target") ?? null;

  if (!keyword) {
    // 프로덕션 키 누락 즉시 확인
    return Response.json({ error: "keyword missing" }, { status: 500 });
  }

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
  if (!res.ok) {
    return Response.json(
      { googleError: data, status: res.status },
      { status: res.status }
    );
  }
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    return Response.json({ error: "No response from Gemini" }, { status: 400 });
  }

  const books = await booksByKeyword(JSON.parse(text));

  const booksWithKeyword = books.map((book) => {
    return {
      keyword: userCustom ? "userCustom" : keyword,
      title: book.title,
      author: book.author,
      cover: book.cover,
    };
  });

  await insertIdeas(adminClient, booksWithKeyword);
  return Response.json({ ok: true });
};
