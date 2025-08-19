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
import { useBookStore } from "~/store/bookStore";
import type { Route } from "../../books/pages/+types/list-page";
import RegionSelect from "../components/RegionSelect";
import { fetchBookExists, fetchLibSrchByBook } from "../services/fetchLibrary";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const region = url.searchParams.get("region") ?? "";
  const dtl_region = url.searchParams.get("dtl_region");
  const isbn = url.searchParams.get("isbn") ?? "";
  const libCode = await fetchLibSrchByBook({ isbn, region, dtl_region });
  const items = await fetchBookExists({ libCode, isbn });

  return { items: items ?? [] };
};

export default function LoanExplorerPage({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isbnParam = searchParams.get("isbn") ?? "";
  const book = useBookStore((s) => s.book);
  const resetBook = useBookStore((s) => s.resetBook);
  useEffect(() => {
    if (!isbnParam && book.isbn !== "") {
      resetBook();
    }
    if (isbnParam && book.isbn !== "") {
    }
  }, [isbnParam, book.isbn]);

  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="w-full px-lg pb-md">
      <Heading2>대출 가능한 도서관 찾기</Heading2>
      <div className="grid row-span-1 lg:grid-cols-6 gap-5 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-4 space-y-10">
          <div className="space-y-5 flex gap-8 justify-start items-end">
            <RegionSelect />
            <div className="flex gap-2">
              <LoadingButton isLoading={isSubmitting}>
                도서관 조회
              </LoadingButton>
            </div>
          </div>
        </div>
        <aside className="order-1 lg:order-2 row-span-1 lg:col-span-2">
          <Form method="get">
            {!isbnParam ? (
              <BookSearch />
            ) : (
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
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
          </Form>
        </aside>
      </div>

      <div className="w-full mt-8">
        {loaderData.items?.length < 0 ? (
          <p className="text-textSubtitle text-lg">
            해당 조건의 소장 도서관이 없어요.
          </p>
        ) : (
          <ul className="space-y-5">
            {loaderData?.items?.map((it) => {
              return (
                <li
                  key={it.libCode}
                  className="flex items-center justify-between border-borderGray border rounded p-4"
                >
                  <div>
                    <Title3>{it.libName}</Title3>
                    <Body1>{it.address}</Body1>
                  </div>
                  <Body1>
                    {it._error ? (
                      <span className="text-red">조회 오류</span>
                    ) : it.loanAvailable ? (
                      <span className="text-green-600">
                        대출 가능{" "}
                        <FontAwesomeIcon
                          icon={faCircleCheck as IconProp}
                          size="lg"
                        />
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
