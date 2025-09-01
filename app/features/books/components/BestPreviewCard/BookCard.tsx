import { useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Caption, Title3 } from "~/components/ui/Typography";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import ShoppingCartButton from "~/features/shoppingcart/components/ShoppingCartButton";
import { useShoppingCart } from "~/features/shoppingcart/hooks/useShoppingCart";
import { useBookStore, type BookState } from "~/store/bookStore";
import type { BookCardItem } from "../../type";

export type BookSearchProps = BookCardItem & {
  direction?: "col" | "row";
  bestRank?: number;
  loanCount?: number;
};

export function BookCard({ direction = "col", ...props }: BookSearchProps) {
  const { setBook } = useBookStore();
  const navigate = useNavigate();
  const checkLibrary = (book: BookState) => {
    setBook(book);
    navigate(`/library?isbn=${book.isbn}`);
  };
  const { isLoggedIn } = useOutletContext<{ isLoggedIn: boolean }>();
  const { addToCart } = useShoppingCart({ _isLoggedIn: isLoggedIn });
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
  if (direction === "row") {
    return (
      <RowCard {...props} onSubmit={onSubmit} checkLibrary={checkLibrary} />
    );
  }
  return <ColCard {...props} onSubmit={onSubmit} checkLibrary={checkLibrary} />;
}

function ColCard(
  props: BookSearchProps &
    BookCardItem & {
      onSubmit: (book: BookCardItem) => void;
      checkLibrary?: (book: BookState) => void;
    }
) {
  const {
    itemId,
    cover,
    title,
    author,
    priceSales,
    priceStandard,
    isbn,
    bestRank,
    loanCount,
    onSubmit,
    checkLibrary,
  } = props;
  return (
    <Card className="bg-transparent border-none shadow-none relative">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <div className="thumb">
            <img src={cover} alt={title} className="shadow-lg" />
            <SaleBadge priceSales={priceSales} priceStandard={priceStandard} />
          </div>
          {bestRank ? <RankBadge rank={bestRank} /> : null}
        </div>

        <div>
          <Title3>{title}</Title3>
          <Caption>{author}</Caption>
          {loanCount ? (
            <Caption className="pt-2">대출 건수 : {loanCount}</Caption>
          ) : null}
        </div>
        <div className="flex justify-between">
          <PriceTag priceSales={priceSales} priceStandard={priceStandard} />
          {typeof priceStandard === "number" ? (
            <ShoppingCartButton book={props} onSubmit={onSubmit} />
          ) : null}
        </div>
        {isbn ? (
          <Button
            variant="outline"
            className="flex-1"
            disabled={!isbn}
            onClick={() =>
              isbn &&
              checkLibrary?.({
                itemId,
                author,
                title,
                cover,
                isbn,
              })
            }
          >
            대출 가능 여부 확인
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

function RowCard(
  props: BookSearchProps &
    BookCardItem & {
      onSubmit: (book: BookCardItem) => void;
      checkLibrary?: (book: BookState) => void;
    }
) {
  const {
    cover,
    itemId,
    title,
    author,
    priceSales,
    priceStandard,
    isbn,
    bestRank,
    loanCount,
    onSubmit,
    checkLibrary,
  } = props;
  return (
    <Card className="bg-transparent border-none shadow-none py-2 relative w-full">
      <div className="flex flex-row gap-4 items-center">
        <div className="w-28 max-w-28 min-w-28 min-h-36 shadow relative">
          <img src={cover} alt={title} className="w-full h-auto" />
          {bestRank ? <RankBadge rank={bestRank} /> : null}
        </div>
        <div className="w-full mt-4">
          <Title3>{title}</Title3>
          <Caption>{author}</Caption>
          {loanCount ? (
            <Caption className="pt-2">대출 건수 : {loanCount}</Caption>
          ) : null}

          <div className="flex justify-between pt-2">
            <PriceTag priceSales={priceSales} priceStandard={priceStandard} />
            {typeof priceStandard === "number" ? (
              <ShoppingCartButton book={props} onSubmit={onSubmit} />
            ) : null}
          </div>
          {isbn ? (
            <Button
              variant="outline"
              className="flex-1"
              disabled={!isbn}
              onClick={() =>
                isbn &&
                checkLibrary?.({
                  itemId,
                  author,
                  title,
                  cover,
                  isbn,
                })
              }
            >
              대출 여부 검색
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

function PriceTag({
  priceSales,
  priceStandard,
}: {
  priceSales?: number;
  priceStandard?: number;
}) {
  if (typeof priceSales !== "number" && typeof priceStandard !== "number")
    return null;

  const isDiscount =
    typeof priceSales === "number" &&
    typeof priceStandard === "number" &&
    priceSales < priceStandard;

  return (
    <div className="mt-1 flex justify-between flex-row">
      {isDiscount ? (
        <div className="flex items-start gap-2">
          <Title3>{priceSales!.toLocaleString()}원</Title3>
        </div>
      ) : (
        <Title3>{(priceSales ?? priceStandard)?.toLocaleString()}원</Title3>
      )}
    </div>
  );
}

export function SaleBadge({
  priceSales,
  priceStandard,
}: {
  priceSales?: number;
  priceStandard?: number;
}) {
  if (
    typeof priceSales !== "number" ||
    typeof priceStandard !== "number" ||
    priceSales >= priceStandard
  )
    return null;

  const discountRate = Math.round(
    ((priceStandard - priceSales) / priceStandard) * 100
  );

  return (
    <span className="absolute top-5 -right-2 bg-destructive text-white text-sm px-3 py-1">
      -{discountRate}%
    </span>
  );
}
export function RankBadge({ rank }: { rank?: number }) {
  if (!rank) return null;
  return (
    <span className="absolute top-3 -left-2 bg-destructive text-white text-sm px-3 py-1">
      {rank}
    </span>
  );
}
