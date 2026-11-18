import BookSearch from "@/features/search/components/SearchBarContainer";
import {
  ArrowUpRight,
  BookOpen,
  LibraryBig,
  MapPin,
  Search,
} from "lucide-react";
import { useEffect } from "react";
import { Form, Link, useNavigation, useSearchParams } from "react-router";
import { LoadingButton } from "~/components/common/LoadingButton";
import { Button } from "~/components/ui/button";
import { resolveAladinBook } from "~/features/books/services/resolveAladinBook.server";
import { REGION_CODES } from "~/features/contants";
import { useBookStore } from "~/store/bookStore";
import RegionSelect from "../components/RegionSelect";
import { fetchBookExists, fetchLibSrchByBook } from "../services/fetchLibrary";
import type { Route } from "./+types/library-page";

type LibraryItem = {
  libCode: string;
  libName: string;
  address: string;
  _error?: boolean;
  loanAvailable?: boolean;
  hasBook?: boolean;
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const region = url.searchParams.get("region") ?? "";
  const dtl_region = url.searchParams.get("dtl_region");
  const bookCode = url.searchParams.get("book");
  const selectedBook = bookCode ? await resolveAladinBook(bookCode) : null;
  const isbn = bookCode
    ? (selectedBook?.isbn ?? "")
    : (url.searchParams.get("isbn") ?? "");
  if (!isbn || !region)
    return { items: [], selectedBook, isbn, lookupFailed: false };

  try {
    const libCode = await fetchLibSrchByBook({ isbn, region, dtl_region });
    const items = await fetchBookExists({ libCode, isbn });
    return { items, selectedBook, isbn, lookupFailed: false };
  } catch {
    return { items: [], selectedBook, isbn, lookupFailed: true };
  }
};

export default function LoanExplorerPage({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isbnParam = loaderData.isbn;
  const bookCode = searchParams.get("book");
  const regionParam = searchParams.get("region") ?? "";
  const storedBook = useBookStore((s) => s.book);
  const book =
    loaderData.selectedBook ??
    (storedBook.isbn === isbnParam ? storedBook : null);
  const resetBook = useBookStore((s) => s.resetBook);
  useEffect(() => {
    if (!isbnParam && storedBook.isbn !== "") {
      resetBook();
    }
  }, [isbnParam, storedBook.isbn, resetBook]);

  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  const items = (loaderData.items ?? []) as unknown as LibraryItem[];

  const district = searchParams.get("dtl_region") ?? "전체";
  const regionLabel = REGION_CODES.find(
    ({ value }) => value === regionParam
  )?.label;
  const available = items.filter((item) => item.loanAvailable).length;
  const hasSelection = Boolean(isbnParam);
  const hasSearched = hasSelection && Boolean(regionParam);

  return (
    <main className="mx-auto w-full max-w-6xl px-lg pb-md pt-sm text-textPrimary">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3 sm:mb-7">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
            대출 가능한 도서관 찾기
          </h1>
          <p className="mt-2 text-sm text-textSecondary sm:text-base">
            책과 지역을 선택하면 도서관별 소장·대출 상태를 확인할 수 있어요.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/library/top-borrowed">
            인기 대출 도서 <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <div className="grid items-start gap-4 md:grid-cols-2">
        <section className="min-w-0 rounded-2xl border border-borderGray bg-white p-4 sm:p-5">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
            <BookOpen className="size-5 text-sub" aria-hidden="true" />
            조회 도서
          </h2>
          {bookCode && !loaderData.selectedBook && (
            <p className="mb-3 text-sm text-red" role="status">
              도서 정보를 불러오지 못했어요. 다시 검색해 주세요.
            </p>
          )}
          {!hasSelection ? (
            <BookSearch />
          ) : (
            <div className="flex min-w-0 items-start gap-3">
              {book?.cover && (
                <img
                  src={book.cover}
                  alt=""
                  className="aspect-[3/4] w-14 shrink-0 rounded-md object-cover sm:w-16"
                />
              )}
              <div className="min-w-0">
                <h3 className="break-words text-base font-bold">
                  {book?.title || `ISBN ${isbnParam}`}
                </h3>
                {book?.author && (
                  <p className="mt-1 break-words text-sm text-textSecondary">
                    {book.author}
                  </p>
                )}
                <Link
                  to="/books"
                  className="mt-2 inline-block text-sm font-medium text-sub underline underline-offset-4"
                >
                  다른 책 찾기
                </Link>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-borderGray bg-white p-4 sm:p-5">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
            <MapPin className="size-5 text-sub" aria-hidden="true" />
            지역 선택
          </h2>
          <Form method="get" className="grid gap-3">
            <RegionSelect
              key={`${regionParam}:${district}`}
              initialRegion={regionParam}
              initialDistrict={district}
            />
            <input type="hidden" name="isbn" value={isbnParam} />
            {bookCode && <input type="hidden" name="book" value={bookCode} />}
            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              disabled={!hasSelection || isSubmitting}
              loadingText="조회 중…"
              className="min-h-11 w-full"
            >
              <Search aria-hidden="true" /> 도서관 조회
            </LoadingButton>
          </Form>
        </section>
      </div>

      <section className="mt-6 sm:mt-8" aria-busy={isSubmitting}>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold">조회 결과</h2>
          {items.length > 0 && (
            <p className="text-sm text-textSecondary">
              {regionLabel && `${regionLabel} · `}도서관 {items.length}곳 중{" "}
              <strong className="text-sub">대출 가능 {available}곳</strong>
            </p>
          )}
        </div>

        {items.length === 0 ? (
          <div
            role="status"
            className="grid justify-items-center rounded-2xl border border-borderGray bg-white px-4 py-9 text-center"
          >
            <LibraryBig
              className="mb-3 size-7 text-textSecondary"
              aria-hidden="true"
            />
            <p className="font-medium">
              {isSubmitting
                ? "도서관을 조회하고 있어요."
                : loaderData.lookupFailed
                  ? "도서관 조회 서비스에 연결하지 못했어요."
                  : hasSearched
                    ? "조회된 도서관이 없어요."
                    : hasSelection
                      ? "지역을 선택하고 도서관을 조회해 주세요."
                      : "먼저 대출하려는 책을 검색해 주세요."}
            </p>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => {
              const status = item._error
                ? { label: "조회 오류", color: "bg-red-50 text-red-800" }
                : item.loanAvailable
                  ? {
                      label: "대출 가능",
                      color: "bg-emerald-100 text-emerald-900",
                    }
                  : item.hasBook
                    ? {
                        label: "대출 불가",
                        color: "bg-amber-100 text-amber-900",
                      }
                    : { label: "미소장", color: "bg-gray text-textPrimary" };
              return (
                <li
                  key={item.libCode}
                  className="flex flex-wrap items-start justify-between gap-2 rounded-xl border border-borderGray bg-white p-4"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words font-bold">{item.libName}</h3>
                    <p className="mt-1 break-words text-sm text-textSecondary">
                      {item.address}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${status.color}`}
                  >
                    {status.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
