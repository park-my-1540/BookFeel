import { Title3, Caption } from "~/components/ui/Typography";
import { Card } from "~/components/ui/card";
import type { BookCardItem } from "../../type";
import ShoppingCartButton from "~/features/shoppingcart/components/ShoppingCartButton";
import { useShoppingCart } from "~/features/shoppingcart/hooks/useShoppingCart";
import { useOutletContext } from "react-router";

type Props = BookCardItem & { direction?: "col" | "row" };

export function BookCard({ direction = "col", ...props }: Props) {
  const { isLoggedIn } = useOutletContext<{ isLoggedIn: boolean }>();
  const { addToCart } = useShoppingCart({ _isLoggedIn: isLoggedIn });
  const onSubmit = async (book: BookCardItem) => {
    try {
      await addToCart(book); // 성공 시에만 실행
      alert("장바구니에 추가되었습니다.");
    } catch (error) {
      console.log(error);
      alert(error instanceof Error ? error.message : String(error));
    }
  };

  if (direction === "row") {
    return <RowCard {...props} onSubmit={onSubmit} />;
  }
  return <ColCard {...props} onSubmit={onSubmit} />;
}

function ColCard(
  props: BookCardItem & { onSubmit?: (book: BookCardItem) => void }
) {
  const { cover, title, author, priceSales, priceStandard, onSubmit } = props;

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
          <ShoppingCartButton book={props} onSubmit={onSubmit} />
        </div>
      </div>
    </Card>
  );
}

function RowCard(
  props: BookCardItem & { onSubmit?: (book: BookCardItem) => void }
) {
  const { link, cover, title, author, priceSales, priceStandard, onSubmit } =
    props;
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
              <ShoppingCartButton book={props} onSubmit={onSubmit} />
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
