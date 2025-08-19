import type { bookAtomType } from "~/jotai/bookAtom";
import type { BookCardItem, BookDetail, BookSummary } from "../../type";

export type SummaryCardProps = {
  book: BookSummary;
  onToggle: () => void;
  onSubmit: (book: BookCardItem) => void;
  isExpanded: boolean;
  checkLibrary: (book: bookAtomType) => void;
};

export type DetailCardProps = {
  book: BookDetail;
  onToggle: () => void;
  onSubmit: (book: BookCardItem) => void;
  isExpanded: boolean;
  checkLibrary: (book: bookAtomType) => void;
};
