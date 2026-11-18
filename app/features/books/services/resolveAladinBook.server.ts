import { load } from "cheerio";
import type { BookState } from "~/store/bookStore";

export async function resolveAladinBook(
  code: string
): Promise<BookState | null> {
  if (!/^(?:[a-z0-9]{10}|97[89]\d{10})$/i.test(code)) return null;

  const url = new URL("https://www.aladin.co.kr/shop/wproduct.aspx");
  url.searchParams.set("ISBN", code.toUpperCase());

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) return null;

    const $ = load(await response.text());
    const isbn = $('meta[property="books:isbn"]').attr("content") ?? "";
    const title = $('meta[name="title"]')
      .attr("content")
      ?.replace(/\s*:\s*알라딘$/, "");
    const author = $('meta[property="og:author"]').attr("content") ?? "";
    const cover = $('meta[property="og:image"]').attr("content") ?? "";

    if (!/^97[89]\d{10}$/.test(isbn) || !title) return null;
    return { itemId: code, isbn, title, author, cover };
  } catch {
    return null;
  }
}
