import { useSearchHistoryStore } from "../stores/useSearchHistoryStore";

export const useSearchHistory = () => {
  const history = useSearchHistoryStore((state) => state.history);
  const addToHistory = useSearchHistoryStore((state) => state.addToHistory);
  const removeToHistory = useSearchHistoryStore(
    (state) => state.removeToHistory
  );

  return {
    history,
    addToHistory,
    removeToHistory,
  };
};
