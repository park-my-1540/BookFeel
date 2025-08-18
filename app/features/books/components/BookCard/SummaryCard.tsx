import DetailToggleButton from "@/components/ui/ToggleButton";
import { formatKrCurrency } from "@/util/util";
import { Body2, Title3 } from "@components/ui/Typography";
import { Button } from "~/components/ui/button";
import Thumbnail from "./Thumbnail";
import type { SummaryCardProps } from "./type";

export default function SummaryCard({
  book,
  onToggle,
  isExpanded,
  checkLibrary,
}: SummaryCardProps) {
  const { title, author, price, sale_price, cover, isbn, id } = book;

  return (
    <div className="grid grid-cols-[auto_1fr_240px] gap-1 md:gap-8 items-center justify-between py-3 pl-5 border-b  ">
      <Thumbnail book={book} width={58} height={78} />

      <div className="grid grid-cols-[2fr_1fr_0.8fr] items-center justify-between w-full gap-2">
        <Title3 className="break-keep">{title}</Title3>
        <Body2 className="text-textSecondary break-keep">{author}</Body2>
        <Title3 className="text-end text-ellipsis">
          {formatKrCurrency(sale_price > 0 ? sale_price : price)}
        </Title3>
      </div>

      <div className="w-full flex flex-row gap-2 items-center">
        <Button className="flex-1">장바구니 담기</Button>
        <Button
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
          대출가능?
        </Button>
        <DetailToggleButton
          className="flex-1"
          isExpanded={isExpanded}
          onClick={onToggle}
        />
      </div>
    </div>
  );
}
