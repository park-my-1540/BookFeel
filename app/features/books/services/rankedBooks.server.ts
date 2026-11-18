import { load } from "cheerio";
import type { BookCardItem } from "../type";

const bestsellerUrl =
  "https://www.aladin.co.kr/shop/common/wbest.aspx?BestType=Bestseller&BranchType=1&CID=1";

export async function rankedBooks(): Promise<BookCardItem[]> {
  const response = await fetch(bestsellerUrl, {
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) {
    throw new Error(`알라딘 주간 베스트 응답 오류 (${response.status})`);
  }

  const $ = load(await response.text());
  const books: BookCardItem[] = [];

  $(".ss_book_box[itemid]").slice(0, 10).each((index, element) => {
    const book = $(element);
    const itemId = book.attr("itemid");
    const titleLink = book.find(".ss_book_list a.bo3").first();
    const title = titleLink.text().trim();
    const cover = book.find("img.i_cover").first().attr("src");
    if (!itemId || !title || !cover) return;

    const credits = titleLink.closest("li").next();
    const price = credits.next();
    const priceSales = price.find(".ss_p2 em").first().text().match(/[\d,]+/);
    const priceStandard = price.text().trim().match(/^[\d,]+(?=원\s*→)/);

    books.push({
      itemId,
      title,
      cover,
      author: credits.text().split("|")[0].trim(),
      bestRank: index + 1,
      priceSales: priceSales ? Number(priceSales[0].replaceAll(",", "")) : undefined,
      priceStandard: priceStandard
        ? Number(priceStandard[0].replaceAll(",", ""))
        : undefined,
    });
  });

  if (books.length === 0) {
    throw new Error("알라딘 주간 베스트에서 도서 목록을 찾을 수 없습니다.");
  }
  return books;
}
