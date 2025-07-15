/**
 * 검색어 submit, 검색어 리스트 열림상태를 관리하는 커스텀 훅
 */
import { useSearchInput } from "@search/hooks/useSearchInput";
import { useSearchOpen } from "./useSearchOpen";

export function useSearchSubmit() {
  const { setWord, word } = useSearchInput();
  const { setIsOpen, isOpen } = useSearchOpen();

  return {
    setIsOpen,
    setWord,
    word,
    isOpen,
  };
}
