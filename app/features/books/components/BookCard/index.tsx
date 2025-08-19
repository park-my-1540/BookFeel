import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { useShoppingCart } from "~/features/shoppingcart/hooks/useShoppingCart";
import bookState, { type bookAtomType } from "~/jotai/bookAtom";
import type { BookCardItem, BookDetail, BookSummary } from "../../type";
import DetailCard from "./DetailCard";
import SummaryCard from "./SummaryCard";

export default function BookCard({ book }: { book: BookSummary | BookDetail }) {
  const { isLoggedIn } = useOutletContext<{ isLoggedIn: boolean }>();
  const { addToCart } = useShoppingCart({ _isLoggedIn: isLoggedIn });
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const setList = useSetAtom(bookState);
  const onToggle = () => setIsExpanded((prev) => !prev);

  const checkLibrary = (book: bookAtomType) => {
    setList(book);
    navigate(`/library?isbn=${book.isbn}`);
  };
  const onSubmit = useCallback(
    async (book: BookCardItem) => {
      try {
        await addToCart(book); // 성공 시에만 실행
        alert("장바구니에 추가되었습니다.");
      } catch (error) {
        alert(error instanceof Error ? error.message : String(error));
      }
    },
    [addToCart]
  );
  return (
    <div>
      {isExpanded ? (
        <DetailCard
          book={book as BookDetail}
          onToggle={onToggle}
          onSubmit={onSubmit}
          isExpanded={isExpanded}
          checkLibrary={checkLibrary}
        />
      ) : (
        <SummaryCard
          book={book as BookSummary}
          onToggle={onToggle}
          onSubmit={onSubmit}
          isExpanded={isExpanded}
          checkLibrary={checkLibrary}
        />
      )}
    </div>
  );
}
