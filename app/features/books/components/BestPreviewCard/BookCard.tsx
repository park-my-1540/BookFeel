import { Title3, Caption } from "~/components/ui/Typography";
import { Card } from "~/components/ui/card";
import type { BookCardItem } from "../../type";
import ShoppingCartButton from "~/features/shoppingcart/components/ShoppingCartButton";

type Props = BookCardItem & { direction?: "col" | "row" };

export function BookCard({ direction = "col", ...props }: Props) {
  if (direction === "row") {
    return <RowCard {...props} />;
  }
  return <ColCard {...props} />;
}

function ColCard(props: BookCardItem) {
  const { cover, title, author, priceSales, priceStandard } = props;

  return (
    <Card className='bg-transparent border-none shadow-none relative'>
      <div className='flex flex-col gap-4'>
        <div className='thumb'>
          <img src={cover} alt={title} className='shadow-lg' />
          <SaleBadge priceSales={priceSales} priceStandard={priceStandard} />
        </div>

        <div>
          <Title3>{title}</Title3>
          <Caption>{author}</Caption>
        </div>
        <div className='flex justify-between'>
          <PriceTag priceSales={priceSales} priceStandard={priceStandard} />
          <ShoppingCartButton book={props} />
        </div>
      </div>
    </Card>
  );
}

function RowCard(props: BookCardItem) {
  const { link, cover, title, author, priceSales, priceStandard } = props;
  return (
    <a href={link} target='_blank' className='block relative'>
      <Card className='bg-transparent border-none shadow-none py-2 relative w-full'>
        <div className='flex flex-row gap-4 items-center'>
          <div className='w-28 max-w-28 min-w-28 shadow'>
            <img src={cover} alt={title} className='w-full h-auto' />
          </div>
          <div className='w-full mt-4'>
            <Title3>{title}</Title3>
            <Caption>{author}</Caption>
            <div className='flex justify-between'>
              <PriceTag priceSales={priceSales} priceStandard={priceStandard} />
              <ShoppingCartButton book={props} />
            </div>
          </div>
        </div>
      </Card>
    </a>
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
    <div className='mt-1 flex justify-between flex-row'>
      {isDiscount ? (
        <div className='flex items-start gap-2'>
          <Title3>{priceSales!.toLocaleString()}원</Title3>
          {/* <span className='text-md text-gray-500 line-through'>
            {priceStandard!.toLocaleString()}원
          </span> */}
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
    <span className='absolute top-5 -right-2 bg-destructive text-white text-sm px-3 py-1'>
      -{discountRate}%
    </span>
  );
}
