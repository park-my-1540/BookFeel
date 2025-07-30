import type { Route } from "../../../+types/root";
import { promptMap } from "../prompts";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
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

  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword") ?? "장마";
  const prompt = promptMap[keyword];
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

  let jsonString: string | null = extractJsonFromText(text);

  if (!jsonString) {
    return null;
  }
  // JSON 파싱
  let parsedJson;
  try {
    parsedJson = JSON.parse(jsonString);
  } catch (e) {
    return Response.json(
      { error: "Invalid JSON format from Gemini" },
      { status: 400 }
    );
  }
  const books = parsedJson;
  const booksWithKeyword = parsedJson.books.map((book) => ({
    keyword,
    title: book.title,
    author: book.author,
    cover_url: book.cover,
  }));

  // await insertIdeas(adminClient, descriptions);
  return Response.json({ ok: true });
};

function extractJsonFromText(text: string): string | null {
  const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
  const match = text.match(codeBlockRegex);

  if (match && match[1]) {
    return match[1].trim(); // 중간 JSON 부분만 추출
  }

  // 혹시 코드블럭이 없으면 기존 방식 fallback
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1) return null;
  return text.slice(firstBrace, lastBrace + 1);
}
