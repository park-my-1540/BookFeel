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
    <div className="grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,280px)] gap-4 md:gap-8 items-center justify-between py-3 px-1 border-b sm:px-4  ">
      <Thumbnail book={book} width={58} height={78} />

      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_auto] items-center justify-between w-full gap-2 ">
        <Title3 className="break-words">{title}</Title3>
        <Body2 className="text-textSecondary break-words">{author}</Body2>
        <Title3 className="text-end text-ellipsis">
          {formatKrCurrency(priceSales > 0 ? priceSales : priceStandard)}
        </Title3>
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
