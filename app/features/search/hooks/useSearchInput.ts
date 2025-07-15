import { useSearchInputStore } from "@search/stores/useSearchInputStore";

export const useSearchInput = () => {
  const word = useSearchInputStore((state) => state.word);
  const setWord = useSearchInputStore((state) => state.setWord);

  return {
    word,
    setWord,
  };
};
