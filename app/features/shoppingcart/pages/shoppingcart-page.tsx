import { Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import PriceTag from "~/components/ui/pricetag";
import {
  Body1,
  Caption,
  Heading2,
  Title1,
  Title3,
} from "~/components/ui/Typography";
import type { Route } from "./+types/shoppingcart-page";
import {
  loadTossPayments,
  type TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { makeSSRClient } from "~/supa-client";
import {
  getLoggedInUserId,
  getUserProfileById,
} from "~/features/users/queries";

const dummyItems = [
  {
    id: 1,
    title: "혼모노",
    author: "성해은",
    priceSales: 24000,
    priceStandard: 28000,
    cover: "https://via.placeholder.com/100x150?text=Book1",
  },
  {
    id: 2,
    title: "광인",
    author: "이혁진",
    priceSales: 24000,
    priceStandard: 28000,
    cover: "https://via.placeholder.com/100x150?text=Book1",
  },
];
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const profile = await getUserProfileById(client, { id: userId });
  return {
    userId,
    profile,
  };
};
export default function ShoppingCart({ loaderData }: Route.ComponentProps) {
  const widgets = useRef<TossPaymentsWidgets | null>(null);
  useEffect(() => {
    const initToss = async () => {
      const toss = loadTossPayments("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm");
      widgets.current = (await toss).widgets({
        customerKey: loaderData.userId,
      });

      await widgets.current.setAmount({
        value: total,
        currency: "KRW",
      });

      // render
      await widgets.current.renderPaymentMethods({
        selector: "#toss-payment-methods",
      });
      await widgets.current.renderAgreement({
        selector: "#toss-payment-agreement",
      });
    };
    initToss();
  }, []);

  useEffect(() => {
    const updateAmount = async () => {
      if (widgets.current) {
        await widgets.current.setAmount({
          value: total,
          currency: "KRW",
        });
      }
    };
    updateAmount();
  }, [dummyItems]);

  const [items, setItems] = useState(dummyItems);

  const handleRemove = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSubmit = async () => {
    const product = dummyItems;

    if (!product) return;

    await widgets.current?.requestPayment({
      orderId: crypto.randomUUID(),
      orderName: `${items[0].title} 외 ${items.length - 1}권`,
      customerEmail: loaderData.profile.email,
      customerName: loaderData.profile.name,
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
      metadata: {
        titles: items.map((i) => i.title).join(", "),
        totalPrice: total,
      },
    });
  };

  const total = items.reduce((sum, item) => sum + item.priceSales, 0);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
      <div className='lg:col-span-3 p-lg'>
        <Heading2>My shopping cart</Heading2>
        {items.map((item) => (
          <div
            key={item.id}
            className='flex items-center gap-8 py-4 border-b px-md'
          >
            <img src={item.cover} alt={item.title} className='w-24 h-auto' />
            <div className='flex-1'>
              <Title3>{item.title}</Title3>
              <Caption>{item.author}</Caption>
            </div>
            <PriceTag
              priceSales={item.priceSales}
              priceStandard={item.priceStandard}
            />
            <div className='flex items-center gap-2'>
              <button
                onClick={() => handleRemove(item.id)}
                className='text-textSubtitle hover:text-red-500'
              >
                <Trash className='text-textSubtitle' size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='col-span-2 p-lg bg-gray'>
        <Heading2>My order</Heading2>
        <ul className='mb-4'>
          {items.map((item) => (
            <li key={item.id} className='flex justify-between leading-9'>
              <Body1>{item.title}</Body1>
              <Body1>{item.priceSales}원</Body1>
            </li>
          ))}
        </ul>

        <div className='flex justify-between text-lg font-bold mb-4 py-sm border-borderGray border-t'>
          <Title1>Total</Title1>
          <Title1>{total.toLocaleString()} 원</Title1>
        </div>
        <aside className='col-span-3 mb-7'>
          <div id='toss-payment-methods'></div>
          <div id='toss-payment-agreement'></div>
        </aside>

        <Button
          className='text-lg py-6 w-full'
          size={"lg"}
          onClick={() => handleSubmit()}
        >
          구매하기
        </Button>
      </div>
    </div>
  );
}
