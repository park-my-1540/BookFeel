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
  const { title, author, priceStandard, priceSales, cover, isbn, id } = book;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_320px] gap-4 md:gap-8 items-center justify-between py-3 pl-5 border-b  ">
      <Thumbnail book={book} width={58} height={78} />

      <div className="grid grid-cols-[2fr_1fr_0.8fr] items-center justify-between w-full gap-2 ">
        <Title3 className="break-keep">{title}</Title3>
        <Body2 className="text-textSecondary break-keep">{author}</Body2>
        <Title3 className="text-end text-ellipsis">
          {formatKrCurrency(priceSales > 0 ? priceSales : priceStandard)}
        </Title3>
      </div>

      <div className="w-full flex flex-row gap-2 items-center">
        <Button className="flex-1" onClick={() => onSubmit(book)}>
          장바구니 담기
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() =>
            checkLibrary({
              itemId: id,
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
