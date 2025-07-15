/**
 * 검색인풋 상태를 전역에서 관리하기 위한 Zustand Store.
 * -`word`: 현재 인풋에 입력된 검색어
 * -`setWord` : 인풋값 설정함수
 */
import { create } from "zustand";

type State = {
  word: string;
  setWord: (value: string) => void;
};

export const useSearchInputStore = create<State>((set) => ({
  word: "",
  setWord: (value) => set({ word: value }),
}));
