import axios from "axios";
import type {
  BookRankingResponse,
  FetchBooksParams,
  FetchBooksResponse,
  BookCardItem,
} from "../type";
import { generateId } from "@/util/util";
/**
 * 카카오 도서 API를 호출하여 도서 목록을 가져오는 함수
 *
 * @param params - 검색 조건 (query, target, page, size 등)
 * @returns API 응답 데이터에 key값 추가하여 반환
 */
export const fetchBooks = async (
  params: FetchBooksParams
): Promise<FetchBooksResponse> => {
  try {
    const { data } = await axios.get<FetchBooksResponse>(
      "https://dapi.kakao.com/v3/search/book",
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
        },
        params,
      }
    );
    return {
      ...data,
      documents: data.documents.map((book) => ({
        ...book,
        id: generateId(book),
      })),
    };
  } catch (error) {
    console.error("fetchBooks error: " + error);
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
      { params }
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
      { params }
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
  limit: number = 5
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
          MaxResults: 3,
          Start: 1,
          Output: "JS",
          Version: "20131101",
          Cover: "Big",
          CategoryId: "1",
        },
      }
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
