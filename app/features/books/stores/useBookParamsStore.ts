/**
 * 도서 검색 파라미터 상태를 관리하기 위한 Zustand Store.
 * -`query`: 질의어
 * -`page`: 페이지 번호
 * -`size`: 한 페이지에 보여질 문서 수
 * -`target`: 검색 필드 - (title, publisher, person)
 * -`setQuery`: 질의어 상태 설정 함수
 * -`setTarget`: 필드 상태 설정 함수
 */
import { create } from "zustand";
import type { TargetParams } from "~/features/books/type";

type BookStore = {
  query: string;
  page: number;
  size: number;
  target: TargetParams;
  setQuery: (query: string) => void;
  setTarget: (query: TargetParams) => void;
};

export const useBookParamStore = create<BookStore>((set) => ({
  query: "",
  page: 1,
  size: 10,
  target: "title",
  setQuery: (query) => set({ query }),
  setTarget: (target) => set({ target }),
}));
