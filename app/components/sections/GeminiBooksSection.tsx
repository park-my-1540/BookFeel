import { Loader2 } from "lucide-react";
import { Form, Link, useNavigate, useOutletContext } from "react-router";
import { Button } from "~/components/ui/button";
import { BookCard } from "~/features/books/components/BestPreviewCard/BookCard";
import type { BookCardItem } from "~/features/books/type";
import { cn } from "~/lib/utils";
import { Title1 } from "../ui/Typography";

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
    searchParams.get("keyword") || searchKeyword[0].keyword;

  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLoggedIn) {
      alert("로그인 해주세요.");
      navigate("/auth/login");
      return;
    }
  };
  return (
    <section className="a p-sm bg-white shadow-sm">
      <Title1 className="mb-5">Gemini가 추천해주는 감성 키워드 도서</Title1>
      <div className="flex gap-3">
        {searchKeyword?.map(({ keyword, category_id }) => (
          <Button
            key={category_id}
            variant={"outline"}
            className={cn(
              selectedKeyword === keyword &&
                "bg-accent bg-main text-white hover:bg-main/90 hover:text-white",
            )}
          >
            <Link
              to={`?keyword=${keyword}`}
              preventScrollReset
              onClick={() => setToggle(false)}
            >
              # {keyword}
            </Link>
          </Button>
        ))}
        <div className="relative p-[1px] rounded-md bg-white bg-gradient-to-br from-red to-yellow-500">
          <Button
            variant="outline"
            className={
              (cn(selectedKeyword === "userCustom" && "bg-accent"),
              "bg-white relative z-10")
            }
            onClick={() => setToggle(true)}
          >
            <Link to="?keyword=userCustom" preventScrollReset>
              # 직접 입력하기
            </Link>
          </Button>
          <div className="absolute inset-0 rounded-md bg-white bg-gradient-to-br from-red to-yellow-500 blur-sm opacity-30 z-0"></div>
        </div>
      </div>
      {toggle ? (
        <Form method="post" action="/">
          <div className="flex w-[370px] items-center pt-5 gap-2">
            <input
              type="text"
              name="keyword"
              pattern="^\S{1,10}$"
              className="w-full p-2 border-borderGray border rounded-lg"
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
      <div className="min-h-[400px] pt-3">
        {isSubmitting ? (
          <div className="flex items-center justify-center w-full min-h-[500px]">
            <Loader2 className="mr-2 h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[500px]">
            {books?.map((book) => (
              <BookCard
                key={book.itemId}
                itemId={book.itemId}
                cover={book.cover}
                author={book.author}
                title={book.title}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
