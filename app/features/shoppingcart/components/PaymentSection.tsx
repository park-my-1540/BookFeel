import { Body1, Heading2, Title1 } from "~/components/ui/Typography";
import type { BookCardItem } from "~/features/books/type";
import { Button } from "../../../components/ui/button";

type PaymentSectionProps = {
  cart: BookCardItem[];
  total: number;
  handleSubmit: () => void;
};
export default function PaymentSection({
  cart,
  total,
  handleSubmit,
}: PaymentSectionProps) {
  return (
    <div className="col-span-2 px-md pb-md bg-gray">
      <Heading2>My order</Heading2>
      <ul className="mb-4">
        {cart.map((item) => (
          <li key={item.itemId} className="flex justify-between leading-9">
            <Body1>{item.title}</Body1>
            <Body1>{item.priceSales!.toLocaleString()}원</Body1>
          </li>
        ))}
      </ul>

      <div className="flex justify-between text-lg font-bold mb-4 py-sm border-borderGray border-t">
        <Title1>Total</Title1>
        <Title1>{total.toLocaleString()} 원</Title1>
      </div>
      <aside className="col-span-3 mb-7">
        <div id="toss-payment-methods"></div>
        <div id="toss-payment-agreement"></div>
      </aside>

      <Button
        className="text-lg py-6 w-full"
        size={"lg"}
        onClick={() => handleSubmit()}
      >
        구매하기
      </Button>
    </div>
  );
}
