import { useQuery } from "@tanstack/react-query";
import { fetchBooks, rankedBooks } from "../services/fetchBooks";
import { useBookParams } from "~/features/books/hooks/useBookParam";
import { toast } from "sonner";

export const useFetchBookQuery = () => {
  const { query, page, size, target } = useBookParams();
  const params = {
    query,
    page,
    size,
    target,
  };
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => fetchBooks(params),
    select: (res) => res.documents,
    enabled: !!query,
    onError: () => {
      toast.error("책 목록을 불러오는데 실패하였습니다.");
    },
  });
};
export const useFetchBookQuery2 = () => {
  const { query, page, size, target } = useBookParams();
  const params = {
    query,
    page,
    size,
    target,
  };
  return useQuery({
    queryKey: ["bestSeller"],
    queryFn: () => rankedBooks(),
    select: (res) => res.item,
    enabled: !!query,
    onError: () => {
      toast.error("책 목록을 불러오는데 실패하였습니다.");
    },
  });
};
