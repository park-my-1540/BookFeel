import { Title3, Body2 } from "@components/ui/Typography";
import DetailToggleButton from "@/components/ui/ToggleButton";
import type { SummaryCardProps } from "./type";
import { formatKrCurrency } from "@/util/util";
import Thumbnail from "./Thumbnail";
import React from "react";
import { Button } from "~/components/ui/button";

export default function SummaryCard({
  book,
  onToggle,
  isExpanded,
}: SummaryCardProps) {
  const { title, authors, price, sale_price, url } = book;
  return (
    <div className='grid grid-cols-[auto_1fr_240px] gap-1 md:gap-8 items-center justify-between py-3 pl-5 border-b  '>
      <Thumbnail book={book} width={58} height={78} />

      <div className='grid grid-cols-[2fr_1fr_0.8fr] items-center justify-between w-full gap-2'>
        <Title3 className='break-keep'>{title}</Title3>
        <Body2 className='text-textSecondary break-keep'>
          {authors.join(", ")}
        </Body2>
        <Title3 className='text-end text-ellipsis'>
          {formatKrCurrency(sale_price > 0 ? sale_price : price)}
        </Title3>
      </div>

      <div className='w-full flex flex-row gap-2 items-center'>
        <Button asChild className='flex-1'>
          <a href={url} target='_blank'>
            구매하기
          </a>
        </Button>
        <DetailToggleButton
          className='flex-1'
          isExpanded={isExpanded}
          onClick={onToggle}
        />
      </div>
    </div>
  );
}
