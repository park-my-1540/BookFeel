import type { BookState } from "~/store/bookStore";
import type { BookCardItem, BookDetail, BookSummary } from "../../type";

export type SummaryCardProps = {
  book: BookSummary;
  onToggle: () => void;
  onSubmit: (book: BookCardItem) => void;
  isExpanded: boolean;
  checkLibrary: (book: BookState) => void;
};

export type DetailCardProps = {
  book: BookDetail;
  onToggle: () => void;
  onSubmit: (book: BookCardItem) => void;
  isExpanded: boolean;
  checkLibrary: (book: BookState) => void;
};
