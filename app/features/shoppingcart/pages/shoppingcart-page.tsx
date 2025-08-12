import type { Route } from "./+types/shoppingcart-page";
import { useMemo } from "react";
import { makeSSRClient } from "~/supa-client";
import { getUserProfileById } from "~/features/users/queries";
import { useShoppingCart } from "../hooks/useShoppingCart";
import { useTossPayment } from "../hooks/useTossPayment";
import PaymentSection from "../components/PaymentSection";
import CartList from "../components/CartList";
import { Heading2 } from "~/components/ui/Typography";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const { data, error } = await client.auth.getUser();
  const user = !error && data?.user ? data.user : null;
  const profile = user
    ? await getUserProfileById(client, { id: user.id })
    : null;

  return {
    client,
    userId: user?.id ?? null,
    profile,
  };
};

export default function ShoppingCart({ loaderData }: Route.ComponentProps) {
  const { items: cart, removeFromCart } = useShoppingCart();

  const total = useMemo(
    () => cart && cart.reduce((sum, item) => sum + (item.priceSales ?? 0), 0),
    [cart]
  );

  const { requestPay } = useTossPayment({
    userId: loaderData.userId,
    total,
  });

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  const handleSubmit = async () => {
    if (!cart.length) {
      alert("장바구니가 비었습니다.");
      return;
    }
    const orderName =
      cart.length === 1
        ? cart[0].title
        : `${cart[0].title} 외 ${cart.length - 1}권`;

    await requestPay({
      orderId: crypto.randomUUID(),
      orderName,
      customerEmail: loaderData.profile?.email ?? "guest@example.com",
      customerName: loaderData.profile?.name ?? "Guest",
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
      metadata: {
        titles: cart.map((i) => i.title).join(", "),
        totalPrice: total,
      },
    });
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
      <div className='lg:col-span-3 p-lg'>
        <Heading2>My Shopping Cart</Heading2>

        {cart?.map((item) => (
          <CartList
            key={item.itemId}
            item={item}
            handleRemove={() => handleRemove(item.itemId)}
          />
        ))}
      </div>
      <PaymentSection cart={cart} handleSubmit={handleSubmit} total={total} />
    </div>
  );
}
