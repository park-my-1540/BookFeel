import axios from "axios";
import { generateId } from "~/util/util";
import type { BookCardItem, BookRankingResponse, TargetParams } from "../type";
/**
 * 카카오 도서 API를 호출하여 도서 목록을 가져오는 함수
 *
 * @param params - 검색 조건 (query, target, page, size 등)
 * @returns API 응답 데이터에 key값 추가하여 반환
 */
export const fetchBooks = async ({
  query,
  target,
}: {
  query: string;
  target: TargetParams;
}) => {
  const params = {
    TTBKey: process.env.NEXT_PUBLIC_ALADIN_API_KEY,
    Query: query,
    QueryType: target,
    SearchTarget: "Book",
    Output: "JS",
    Version: "20131101",
    Start: 1,
    Cover: "Big",
    MaxResults: 10,
  };

  try {
    const { data } = await axios.get(
      "https://www.aladin.co.kr/ttb/api/ItemSearch.aspx",
      { params },
    );

    // data.item 배열 안에 책 리스트 있음
    const books = (data.item ?? []).map((book: any) => ({
      id: generateId(book),
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      pubDate: book.pubDate,
      isbn: book.isbn13,
      cover: book.cover,
      description: book.description,
      link: book.link,
    }));

    return { ...data, documents: books };
  } catch (error) {
    console.error("fetchBooks error:", error);
    throw error;
  }
};

/**
 * 알라딘 Open API를 호출하여 도서 목록을 가져오는 함수
 *
 * @returns API 응답 데이터에 key값 추가하여 반환
 */
export const rankedBooks = async (): Promise<BookCardItem[]> => {
  const params = {
    ttbkey: process.env.NEXT_PUBLIC_ALADIN_API_KEY,
    QueryType: "Bestseller",
    MaxResults: 10,
    start: 1,
    SearchTarget: "Book",
    output: "js",
    Version: "20131101",
    Cover: "Big",
    CategoryId: 1,
  };
  try {
    const { data } = await axios.get<BookRankingResponse>(
      "https://www.aladin.co.kr/ttb/api/ItemList.aspx?",
      { params },
    );
    return data.item ?? [];
  } catch (error) {
    console.error("fetchBooks error:", error);
    throw error;
  }
};

/**
 * 알라딘 Open API를 호출하여 도서 목록을 가져오는 함수
 *
 * @returns API 응답 데이터에 key값 추가하여 반환
 */
export const choicesBooks = async (): Promise<BookCardItem[]> => {
  const params = {
    ttbkey: process.env.NEXT_PUBLIC_ALADIN_API_KEY!,
    QueryType: "ItemNewSpecial",
    MaxResults: 10,
    Start: 1,
    SearchTarget: "Book",
    Output: "JS",
    Version: "20131101",
    Cover: "Big",
    CategoryId: 1,
  };
  try {
    const { data } = await axios.get<BookRankingResponse>(
      "https://www.aladin.co.kr/ttb/api/ItemList.aspx?",
      { params },
    );
    return data.item ?? [];
  } catch (error) {
    console.error("fetchBooks error:", error);
    throw error;
  }
};

export type Book = {
  title: string;
  author: string;
  cover: string;
  description: string;
  isbn: string;
  publisher: string;
};

export const booksByKeyword = async (
  keywords: string[],
  limit: number = 10,
): Promise<Book[]> => {
  const allBooks: Book[] = [];

  for (const keyword of keywords) {
    const { data } = await axios.get(
      "https://www.aladin.co.kr/ttb/api/ItemSearch.aspx",
      {
        params: {
          TTBKey: process.env.NEXT_PUBLIC_ALADIN_API_KEY!,
          Query: keyword,
          QueryType: "Keyword",
          SearchTarget: "Book",
          MaxResults: 4,
          Start: 1,
          Output: "JS",
          Version: "20131101",
          Cover: "Big",
          CategoryId: "1",
        },
      },
    );

    const books = data.item.map((book: any) => ({
      title: book.title,
      author: book.author,
      isbn: book.isbn13,
      cover: book.cover,
      description: book.description,
      publisher: book.publisher,
      link: book.link,
    }));
    allBooks.push(...books);
  }

  // ISBN 기준 중복 제거 + limit 제한
  const unique = new Map<string, Book>();
  for (const book of allBooks) {
    if (!unique.has(book.isbn)) {
      unique.set(book.isbn, book);
    }
    if (unique.size >= limit) break;
  }

  return Array.from(unique.values());
};
