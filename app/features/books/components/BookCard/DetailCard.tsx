import DetailToggleButton from "@/components/ui/ToggleButton";
import { formatKrCurrency } from "@/util/util";
import {
  Body1,
  Body2,
  Caption,
  Small,
  Title3,
  Title4,
} from "@components/ui/Typography";
import { Button } from "~/components/ui/button";
import Thumbnail from "./Thumbnail";
import type { DetailCardProps } from "./type";

export default function DetailCard({
  book,
  onToggle,
  onSubmit,
  isExpanded,
  checkLibrary,
}: DetailCardProps) {
  const {
    title,
    author,
    priceStandard,
    description,
    priceSales,
    cover,
    isbn,
    itemId,
  } = book;

  return (
    <div className="grid gap-4 rounded-xl border border-borderGray bg-white p-4 sm:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,260px)]">
      <Thumbnail width={210} height={280} size="lg" book={book} />

      <div className="grid grid-rows w-full gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Title3 className="break-words">{title}</Title3>
          <Body2 className="text-textSecondary break-words">{author}</Body2>
        </div>
        <div>
          <Caption className="mb-3">책소개</Caption>
          <Body1 className="break-words">{description}</Body1>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between gap-3 text-end sm:col-span-2 lg:col-span-1">
        <DetailToggleButton isExpanded={isExpanded} onClick={onToggle} />
        <div className="w-full">
          <BookPrice priceStandard={priceStandard} priceSales={priceSales} />
          <div className="flex w-full flex-wrap gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}

function BookPrice({
  priceStandard,
  priceSales = 0,
}: {
  priceStandard: number;
  priceSales?: number;
}) {
  return priceSales > 0 ? (
    <>
      <div className="flex justify-end items-center gap-3">
        <Small className="text-textSubtitle">정가</Small>
        <p className="text-lg text-textPrimary line-through">
          {formatKrCurrency(priceStandard)}
        </p>
      </div>
      <div className="flex justify-end items-center gap-3 mb-[30px]">
        <Small className="text-textSubtitle">할인가</Small>
        <Title4>{formatKrCurrency(priceSales)}</Title4>
      </div>
    </>
  ) : (
    <div className="flex justify-end items-center gap-3 mb-[30px]">
      <Small className="text-textSubtitle">판매가</Small>
      <Title4>{formatKrCurrency(priceStandard)}</Title4>
    </div>
  );
}
