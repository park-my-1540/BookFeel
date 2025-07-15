import { useNavigation } from "react-router";
import type { Route } from "./+types/list-page";
import { Title2 } from "~/components/ui/Typography";
import BookSearch from "@search/components/SearchBarContainer";
import BookListPanel from "@book/components/BookListPanel";
import { fetchBooks } from "../services/fetchBooks";
import { useSearchSubmit } from "~/features/search/hooks/useSearchSubmit";
import { useEffect } from "react";
import { useSearchHistory } from "~/features/search/hooks/useSearchHistory";
import { useSearchOpen } from "~/features/search/hooks/useSearchOpen";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  const target = url.searchParams.get("target");

  if (!query) return { books: [] };
  const params = {
    query,
    page: 1,
    size: 10,
    target: target,
  };

  try {
    const res = await fetchBooks(params);
    return { books: res.documents, keyword: query };
  } catch (e) {
    console.error("서버에서 책 가져오기 실패", e);
    return { books: [] };
  }
};

export default function ListPage({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const { setIsOpen } = useSearchOpen();
  const { addToHistory } = useSearchHistory();

  useEffect(() => {
    if (loaderData.keyword) {
      addToHistory(loaderData.keyword);
      setIsOpen(false);
    }
  }, [loaderData.keyword, addToHistory]);

  return (
    <div className='pt-10 max-w-5xl mx-auto'>
      <Title2>도서 검색</Title2>
      <BookSearch />
      <BookListPanel
        subtitle='도서 검색 결과'
        books={loaderData.books}
        isFetching={isLoading}
      />
    </div>
  );
}
