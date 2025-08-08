import { Title3 } from "./Typography";

export default function PriceTag({
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
        <div className='flex flex-col items-start gap-2'>
          <Title3>
            판매가 :{" "}
            <span className='text-destructive'>
              {priceSales!.toLocaleString()}
            </span>
            원
          </Title3>
          <span className='text-md text-textSecondary line-through'>
            정가 {priceStandard!.toLocaleString()}원
          </span>
        </div>
      ) : (
        <Title3>{(priceSales ?? priceStandard)?.toLocaleString()}원</Title3>
      )}
    </div>
  );
}
