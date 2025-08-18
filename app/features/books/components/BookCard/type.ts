import type { bookAtomType } from "~/jotai/bookAtom";
import type { BookDetail, BookSummary } from "../../type";

export type SummaryCardProps = {
  book: BookSummary;
  onToggle: () => void;
  isExpanded: boolean;
  checkLibrary: (book: bookAtomType) => void;
};

export type DetailCardProps = {
  book: BookDetail;
  onToggle: () => void;
  isExpanded: boolean;
};
