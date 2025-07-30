import type { BookDetail, BookSummary } from "../../type";

export type SummaryCardProps = {
  book: BookSummary;
  onToggle: () => void;
  isExpanded: boolean;
};

export type DetailCardProps = {
  book: BookDetail;
  onToggle: () => void;
  isExpanded: boolean;
};
