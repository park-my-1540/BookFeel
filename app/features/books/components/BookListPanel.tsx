import { BookOpen, Loader2 } from "lucide-react";
import type { BookItem } from "../type";
import BookCard from "./BookCard";

interface Props {
  keyword?: string;
  books: BookItem[];
  isFetching?: boolean;
  searchFailed?: boolean;
}

export default function BookListPanel({
  keyword,
  books,
  isFetching,
  searchFailed,
}: Props) {
  return (
    <section className="mt-6 sm:mt-8" aria-busy={isFetching}>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold">검색 결과</h2>
        {keyword && !isFetching && !searchFailed && (
          <p className="min-w-0 break-words text-sm text-textSecondary">
            ‘{keyword}’ · <strong className="text-sub">{books.length}권</strong>
          </p>
        )}
      </div>

      {isFetching || books.length === 0 ? (
        <div
          role="status"
          className="grid justify-items-center rounded-2xl border border-borderGray bg-white px-4 py-9 text-center"
        >
          {isFetching ? (
            <Loader2
              className="mb-3 size-7 animate-spin text-main"
              aria-hidden="true"
            />
          ) : (
            <BookOpen
              className="mb-3 size-7 text-textSecondary"
              aria-hidden="true"
            />
          )}
          <p className="font-medium">
            {isFetching
              ? "도서를 검색하고 있어요."
              : searchFailed
                ? "도서 검색 서비스에 연결하지 못했어요."
                : keyword
                  ? "검색 결과가 없어요."
                  : "검색어를 입력해 주세요."}
          </p>
        </div>
      ) : (
        <ul className="grid gap-3">
          {books.map((book) => (
            <li key={book.itemId} className="min-w-0">
              <BookCard book={book} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
