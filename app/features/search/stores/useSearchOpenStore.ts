/**
 * 검색어 리스트 열림 상태를 전역에서 관리하기 위한 Zustand Store.
 * -`isOpen` : 검색어 리스트 열림 상태 여부
 * -`setIsOpen` : 검색어 리스트 열림상태 설정함수
 */
import { create } from "zustand";

type State = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const useSearchOpenStore = create<State>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}));
