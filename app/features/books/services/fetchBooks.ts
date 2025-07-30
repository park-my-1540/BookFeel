import axios from "axios";
import type {
  BookRankingResponse,
  FetchBooksParams,
  FetchBooksResponse,
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
export const rankedBooks = async (): Promise<BookRankingResponse> => {
  const params = {
    ttbkey: process.env.NEXT_PUBLIC_ALADIN_API_KEY,
    QueryType: "Bestseller",
    MaxResults: 10,
    start: 1,
    SearchTarget: "Book",
    output: "js",
    Version: "20131101",
  };
  try {
    const { data } = await axios.get<BookRankingResponse>(
      "https://www.aladin.co.kr/ttb/api/ItemList.aspx?",
      { params }
    );
    return data;
  } catch (error) {
    console.error("fetchBooks error:", error);
    throw error;
  }
};
