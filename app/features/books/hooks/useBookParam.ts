import { useBookParamStore } from "~/features/books/stores/useBookParamsStore";

export const useBookParams = () => {
  const query = useBookParamStore((state) => state.query);
  const page = useBookParamStore((state) => state.page);
  const size = useBookParamStore((state) => state.size);
  const target = useBookParamStore((state) => state.target);
  const setQuery = useBookParamStore((state) => state.setQuery);
  const setTarget = useBookParamStore((state) => state.setTarget);

  return {
    query,
    page,
    size,
    target,
    setQuery,
    setTarget,
  };
};
