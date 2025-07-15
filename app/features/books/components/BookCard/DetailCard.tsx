import { Title3, Body2, Body2Bold, Small } from "@components/ui/Typography";
import DetailToggleButton from "@/components/ui/ToggleButton";
import type { DetailCardProps } from "./type";
import { formatKrCurrency } from "@/util/util";
import Thumbnail from "./Thumbnail";
import { Button } from "~/components/ui/button";

export default function DetailCard({
  book,
  onToggle,
  isExpanded,
}: DetailCardProps) {
  const { title, authors, price, contents, sale_price, url } = book;

  return (
    <div className='grid grid-cols-[1fr_1fr_auto] md:grid-cols-[auto_1fr_240px] gap-1 md:gap-8 py-5 pl-5 border-b '>
      <Thumbnail width={210} height={280} size='lg' book={book} />

      <div className='grid grid-rows w-full gap-2'>
        <div className='inline-flex gap-2 items-center justify-between'>
          <Title3 className='break-keep'>{title}</Title3>
          <Body2 className='text-textSecondary break-keep'>
            {authors.join(", ")}
          </Body2>
        </div>
        <div>
          <Body2Bold className='mb-3'>책소개</Body2Bold>
          <Small className='break-keep'>{contents}</Small>
        </div>
      </div>

      <div className='flex flex-col items-end justify-between gap-5 md:col-span-1 col-span-full'>
        <DetailToggleButton
          className='flex-1 w-1/2'
          isExpanded={isExpanded}
          onClick={onToggle}
        />
        <div className='w-full'>
          <BookPrice price={price} sale_price={sale_price} />
          <Button asChild>
            <a href={url} target='_blank'>
              구매하기
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function BookPrice({
  price,
  sale_price = 0,
}: {
  price: number;
  sale_price?: number;
}) {
  return sale_price > 0 ? (
    <>
      <div className='flex justify-end items-center gap-3'>
        <Small className='text-textSubtitle'>정가</Small>
        <p className='text-lg text-textPrimary line-through'>
          {formatKrCurrency(price)}
        </p>
      </div>
      <div className='flex justify-end items-center gap-3 mb-[30px]'>
        <Small className='text-textSubtitle'>할인가</Small>
        <Title3>{formatKrCurrency(sale_price)}</Title3>
      </div>
    </>
  ) : (
    <div className='flex justify-end items-center gap-3 mb-[30px]'>
      <Small className='text-textSubtitle'>판매가</Small>
      <Title3>{formatKrCurrency(price)}</Title3>
    </div>
  );
}
