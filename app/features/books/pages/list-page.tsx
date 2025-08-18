import BookListPanel from "@book/components/BookListPanel";
import BookSearch from "@search/components/SearchBarContainer";
import { useEffect } from "react";
import { useNavigation } from "react-router";
import { Heading2 } from "~/components/ui/Typography";
import { useSearchHistory } from "~/features/search/hooks/useSearchHistory";
import { useSearchOpen } from "~/features/search/hooks/useSearchOpen";
import { fetchBooks } from "../services/fetchBooks";
import type { TargetParams } from "../type";
import type { Route } from "./+types/list-page";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  const target = url.searchParams.get("target") as TargetParams;
  if (!query) return { books: [] };

  try {
    const res = await fetchBooks({ query, target });
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
    <div className="w-full px-lg pb-md">
      <Heading2>도서 검색</Heading2>
      <div className="w-2/3">
        <BookSearch />
      </div>
      <BookListPanel
        subtitle="도서 검색 결과"
        books={loaderData.books}
        isFetching={isLoading}
      />
    </div>
  );
}
