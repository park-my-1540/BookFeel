import { useSetAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router";
import bookState, { type bookAtomType } from "~/jotai/bookAtom";
import type { BookDetail, BookSummary } from "../../type";
import DetailCard from "./DetailCard";
import SummaryCard from "./SummaryCard";

export default function BookCard({ book }: { book: BookSummary | BookDetail }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const setList = useSetAtom(bookState);
  const onToggle = () => setIsExpanded((prev) => !prev);
  const checkLibrary = (book: bookAtomType) => {
    setList(book);
    navigate(`/library?isbn=${book.isbn}`);
  };
  return (
    <div>
      {isExpanded ? (
        <DetailCard
          book={book as BookDetail}
          onToggle={onToggle}
          isExpanded={isExpanded}
        />
      ) : (
        <SummaryCard
          book={book as BookSummary}
          onToggle={onToggle}
          isExpanded={isExpanded}
          checkLibrary={checkLibrary}
        />
      )}
    </div>
  );
}
