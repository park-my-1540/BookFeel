import { Loader2 } from "lucide-react";
import type { BookItem } from "../type";
import BookCard from "./BookCard";
import BookNoResult from "./BookNoResult";

interface Props {
  subtitle: string;
  books: BookItem[];
  isFetching?: boolean;
}

export default function BookListPanel({ subtitle, books, isFetching }: Props) {
  return (
    <>
      <div className="text-textPrimary mb-2">
        {subtitle} 총 <span className="text-primary">{books?.length}</span>건
      </div>

      {isFetching ? (
        <div className="flex items-center justify-center w-full min-h-[500px]">
          <Loader2 className="mr-2 h-10 w-10 animate-spin text-main" />
        </div>
      ) : !books?.length ? (
        <BookNoResult message="검색된 결과가 없습니다." />
      ) : (
        <>
          {books.map((book) => (
            <BookCard key={book.itemId} book={book} />
          ))}
        </>
      )}
    </>
  );
}
