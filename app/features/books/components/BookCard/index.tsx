import { useState } from "react";
import DetailCard from "./DetailCard";
import SummaryCard from "./SummaryCard";
import type { BookDetail, BookSummary } from "../../type";

export default function BookCard({ book }: { book: BookSummary | BookDetail }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const onToggle = () => setIsExpanded((prev) => !prev);

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
        />
      )}
    </div>
  );
}
