import { LibraryBig, Loader2 } from "lucide-react";
import { Form, Link, useNavigate, useOutletContext } from "react-router";
import { Button } from "~/components/ui/button";
import { BookCard } from "~/features/books/components/BestPreviewCard/BookCard";
import type { BookCardItem } from "~/features/books/type";
import {
  getRecommendationBookCode,
  getRecommendationReason,
} from "~/features/ideas/recommendationReasons";
import { cn } from "~/lib/utils";
import { Title1, Title2 } from "../ui/Typography";

interface GeminiBooksSectionProps {
  searchKeyword: { keyword: string; category_id: string }[];
  books: BookCardItem[];
  isSubmitting: boolean;
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
  searchParams: URLSearchParams;
  errorMessage: string | null;
}

export default function GeminiBooksSection({
  searchKeyword,
  books,
  isSubmitting,
  toggle,
  setToggle,
  searchParams,
  errorMessage,
}: GeminiBooksSectionProps) {
  const { isLoggedIn } = useOutletContext<{ isLoggedIn: boolean }>();
  const navigate = useNavigate();
  const selectedKeyword =
    searchParams.get("keyword") || searchKeyword[0]?.keyword || "장마";

  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLoggedIn) {
      alert("로그인 해주세요.");
      navigate("/auth/login");
      return;
    }
  };
  return (
    <section className="min-w-0 rounded-2xl border border-borderGray bg-white p-sm shadow-sm">
      <Title1 className="mb-3">기분에 맞는 책</Title1>
      <div className="flex flex-wrap gap-2">
        {searchKeyword?.map(({ keyword, category_id }) => (
          <Button
            asChild
            key={category_id}
            variant={"outline"}
            className={cn(
              selectedKeyword === keyword &&
                "bg-accent bg-main text-white hover:bg-main/90 hover:text-white"
            )}
          >
            <Link
              to={`?keyword=${encodeURIComponent(keyword)}`}
              preventScrollReset
              onClick={() => setToggle(false)}
            >
              # {keyword}
            </Link>
          </Button>
        ))}
        <div className="relative p-[1px] rounded-md bg-white bg-gradient-to-br from-red to-yellow-500">
          <Button
            asChild
            variant="outline"
            className={cn(
              "relative z-10 bg-white",
              selectedKeyword === "userCustom" && "bg-accent"
            )}
          >
            <Link
              to="?keyword=userCustom"
              preventScrollReset
              onClick={() => setToggle(true)}
            >
              # 직접 입력하기
            </Link>
          </Button>
          <div className="absolute inset-0 rounded-md bg-white bg-gradient-to-br from-red to-yellow-500 blur-sm opacity-30 z-0"></div>
        </div>
      </div>
      {toggle ? (
        <Form method="post" action="/">
          <div className="flex w-full max-w-md items-center gap-2 pt-5">
            <input
              type="text"
              name="keyword"
              pattern="^\S{1,10}$"
              className="min-w-0 flex-1 p-2 border-borderGray border rounded-lg"
              placeholder="키워드를 5자 이내 한 단어로 입력해주세요."
              maxLength={5}
            />
            <Button type="submit" disabled={isSubmitting} onClick={absorbClick}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>로딩 중...</span>
                </div>
              ) : (
                "검색"
              )}
            </Button>
          </div>
          <span className="text-red text-lg mt-2">{errorMessage}</span>
        </Form>
      ) : null}
      <div className="pt-3">
        {isSubmitting ? (
          <div className="flex items-center justify-center w-full min-h-32">
            <Loader2 className="mr-2 h-10 w-10 animate-spin text-main" />
          </div>
        ) : (
          <>
            {books?.length > 0 ? (
              <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
                {books.map((book) => {
                  const code = getRecommendationBookCode(book.cover);
                  return (
                    <li
                      key={book.itemId}
                      className="flex min-w-0 flex-col gap-2 rounded-lg border p-2 sm:p-3"
                    >
                      <BookCard {...book} compact />
                      <p className="text-xs leading-snug text-textSecondary sm:text-sm">
                        {getRecommendationReason(book.title, selectedKeyword)}
                      </p>
                      {code ? (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="mt-auto w-full gap-1 px-1 text-xs sm:px-2"
                        >
                          <Link
                            to={`/library?book=${encodeURIComponent(code)}`}
                            aria-label={`${book.title} 가까운 도서관에서 찾기`}
                          >
                            <LibraryBig aria-hidden="true" />
                            도서관 찾기
                          </Link>
                        </Button>
                      ) : (
                        <p className="mt-auto text-sm text-textSecondary">
                          도서관 조회에 필요한 도서 정보가 없어요.
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <Title2 className="mt-10">
                로그인 하여 Gemini가 추천해주는 도서를 검색해보세요!
              </Title2>
            )}
          </>
        )}
      </div>
    </section>
  );
}
