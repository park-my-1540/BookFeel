import BookListPanel from "@book/components/BookListPanel";
import BookSearch from "@search/components/SearchBarContainer";
import { ArrowUpRight, Search } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigation } from "react-router";
import { Button } from "~/components/ui/button";
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
  } catch {
    return { books: [], keyword: query, searchFailed: true };
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
    <main className="mx-auto w-full max-w-6xl px-lg pb-md pt-sm text-textPrimary">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3 sm:mb-7">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
            도서 검색
          </h1>
          <p className="mt-2 text-sm text-textSecondary sm:text-base">
            책 제목, 저자, 출판사로 읽고 싶은 책을 찾아보세요.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/library">
            도서관 찾기 <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <section className="min-w-0 rounded-2xl border border-borderGray bg-white p-4 sm:p-5">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
          <Search className="size-5 text-sub" aria-hidden="true" />
          검색 조건
        </h2>
        <BookSearch />
      </section>

      <BookListPanel
        keyword={loaderData.keyword}
        books={loaderData.books}
        isFetching={isLoading}
        searchFailed={loaderData.searchFailed}
      />
    </main>
  );
}
