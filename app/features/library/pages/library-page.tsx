import BookSearch from "@/features/search/components/SearchBarContainer";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Form, Link, useNavigation, useSearchParams } from "react-router";
import { LoadingButton } from "~/components/common/LoadingButton";
import { Button } from "~/components/ui/button";
import { Body1, Heading2, Title1, Title3 } from "~/components/ui/Typography";
import { BookCard } from "~/features/books/components/BestPreviewCard/BookCard";
import { resolveAladinBook } from "~/features/books/services/resolveAladinBook.server";
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
  const book = loaderData.selectedBook ?? storedBook;
  const resetBook = useBookStore((s) => s.resetBook);
  useEffect(() => {
    if (!isbnParam && book.isbn !== "") {
      resetBook();
    }
  }, [isbnParam, book.isbn]);

  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  const items = (loaderData.items ?? []) as unknown as LibraryItem[];

  return (
    <div className="w-full px-lg pb-md">
      <Heading2>대출 가능한 도서관 찾기</Heading2>
      <Form method="get">
        <div className="grid gap-5 lg:grid-cols-6 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-4 space-y-10">
            <div className="flex flex-wrap items-end gap-3">
              <RegionSelect isbn={isbnParam} />
              {bookCode && <input type="hidden" name="book" value={bookCode} />}
              <div className="flex gap-2">
                <LoadingButton isLoading={isSubmitting}>
                  도서관 조회
                </LoadingButton>
              </div>
            </div>
          </div>
          <aside className="order-1 min-w-0 rounded-2xl border border-borderGray bg-white p-sm lg:order-2 lg:col-span-2">
            {bookCode && !loaderData.selectedBook ? (
              <p className="text-red" role="status">
                도서관 조회에 필요한 도서 정보를 불러오지 못했어요.
              </p>
            ) : !isbnParam ? (
              <BookSearch />
            ) : (
              <div className="w-full">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <Title1>조회 도서</Title1>
                  <Button variant="secondary" asChild>
                    <Link to="/books">다른 책으로 조회 &rarr;</Link>
                  </Button>
                </div>
                {isbnParam && book.isbn === "" ? (
                  <p className="text-red mt-10">다시 도서를 조회해주세요.</p>
                ) : null}
                <BookCard
                  direction="row"
                  key={book.itemId}
                  itemId={book.itemId}
                  cover={book.cover}
                  title={book.title}
                  author={book.author}
                />
              </div>
            )}
          </aside>
        </div>
      </Form>

      <div className="w-full mt-8">
        {bookCode &&
        !loaderData.selectedBook ? null : loaderData.lookupFailed ? (
          <p className="text-textSubtitle text-lg" role="status">
            도서관 조회 서비스에 연결하지 못했어요. 잠시 뒤 다시 시도해 주세요.
          </p>
        ) : !regionParam ? (
          <p className="text-textSubtitle text-lg">
            지역을 선택하여 도서를 조회해주세요
          </p>
        ) : items.length === 0 ? (
          <p className="text-textSubtitle text-lg">조회된 도서관이 없습니다.</p>
        ) : (
          <ul className="space-y-5">
            {items.map((it) => {
              return (
                <li
                  key={it.libCode}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-borderGray bg-white p-4"
                >
                  <div>
                    <Title3>{it.libName}</Title3>
                    <Body1>{it.address}</Body1>
                  </div>
                  <Body1>
                    {it._error ? (
                      <span className="text-red">조회 오류</span>
                    ) : it.loanAvailable ? (
                      <span className="text-green-600 h-10">
                        대출 가능{" "}
                        <span className="min-h-7 text-green-600 inline-block">
                          <FontAwesomeIcon
                            icon={faCircleCheck as IconProp}
                            size="lg"
                          />
                        </span>
                      </span>
                    ) : it.hasBook ? (
                      <span className="text-amber-600">소장(대출 불가)</span>
                    ) : (
                      <span className="text-textSubtitle">미소장</span>
                    )}
                  </Body1>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
