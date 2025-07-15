/**
 * 검색어 히스토리를 전역에서 관리하기 위한 Zustand Store.
 * -`search`: 최근 검색어 배열
 * -`addToHistory`: 새 검색어 추가
 * -`removeToHistory`: 특정 검색어 삭제
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HistoryStore {
  history: string[];
  addToHistory: (keyword: string) => void;
  removeToHistory: (keyword: string) => void;
}

export const useSearchHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (keyword) =>
        set((state) => {
          if (state.history.find((h) => h === keyword)) return state;
          const newHistory =
            state.history.length >= 8
              ? [keyword, ...state.history.slice(0, 7)]
              : [keyword, ...state.history];
          return { history: newHistory };
        }),
      removeToHistory: (keyword) =>
        set((state) => {
          const update = state.history.filter((h) => h !== keyword);
          return { history: [...update] };
        }),
    }),
    {
      name: "search-storage",
    }
  )
);
