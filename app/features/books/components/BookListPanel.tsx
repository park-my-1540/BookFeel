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

      {false ? (
        <div>로딩중입니다...</div>
      ) : !books?.length ? (
        <BookNoResult message="검색된 결과가 없습니다." />
      ) : (
        <>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </>
      )}
    </>
  );
}
