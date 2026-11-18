import DetailToggleButton from "@/components/ui/ToggleButton";
import { formatKrCurrency } from "@/util/util";
import { Body2, Title3 } from "@components/ui/Typography";
import { Button } from "~/components/ui/button";
import Thumbnail from "./Thumbnail";
import type { SummaryCardProps } from "./type";

export default function SummaryCard({
  book,
  onToggle,
  onSubmit,
  isExpanded,
  checkLibrary,
}: SummaryCardProps) {
  const { title, author, priceStandard, priceSales, cover, isbn, itemId } =
    book;

  return (
    <div className="grid gap-3 rounded-xl border border-borderGray bg-white p-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="flex min-w-0 items-start gap-3">
        <div className="shrink-0">
          <Thumbnail book={book} width={58} height={78} />
        </div>
        <div className="min-w-0">
          <Title3 className="break-words">{title}</Title3>
          <Body2 className="mt-1 break-words text-textSecondary">
            {author}
          </Body2>
          <p className="mt-2 text-sm font-bold">
            {formatKrCurrency(priceSales > 0 ? priceSales : priceStandard)}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center gap-2">
        <Button className="flex-1" onClick={() => onSubmit(book)}>
          장바구니 담기
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() =>
            checkLibrary({
              itemId,
              author,
              title,
              cover,
              isbn,
            })
          }
        >
          대출 여부 확인
        </Button>

        <DetailToggleButton isExpanded={isExpanded} onClick={onToggle} />
      </div>
    </div>
  );
}
