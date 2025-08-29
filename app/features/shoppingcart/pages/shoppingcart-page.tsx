import { Loader2, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { useNavigation, useOutletContext } from "react-router";
import { Button } from "~/components/ui/button";
import { Heading2 } from "~/components/ui/Typography";
import BookNoResult from "~/features/books/components/BookNoResult";
import { getUserProfileById } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import CartList from "../components/CartList";
import PaymentSection from "../components/PaymentSection";
import { useShoppingCart } from "../hooks/useShoppingCart";
import { useTossPayment } from "../hooks/useTossPayment";
import type { Route } from "./+types/shoppingcart-page";

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
  const { isLoggedIn } = useOutletContext<{ isLoggedIn: boolean }>();
  const {
    items: cart,
    removeFromCart,
    clearCart,
    loading,
  } = useShoppingCart({ _isLoggedIn: isLoggedIn });
  const navigation = useNavigation();
  const isLoading =
    navigation.state === "loading" || navigation.state === "submitting";
  const total = useMemo(
    () => cart && cart.reduce((sum, item) => sum + (item.priceSales ?? 0), 0),
    [cart]
  );

  const { requestPay } = useTossPayment({
    userId: loaderData.userId,
    total,
  });

  const handleClearCart = () => {
    clearCart();
  };

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
        title: orderName,
        total_price: total,
        cover_url: cart[0].cover,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 h-[var(--header-h)]">
      <div className="lg:col-span-3 px-md pb-md">
        <Heading2>My Shopping Cart</Heading2>
        <div className="text-end">
          <Button variant={"link"} onClick={handleClearCart}>
            전체삭제 <Trash2 size={20} />
          </Button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center w-full min-h-[500px]">
            <Loader2 className="mr-2 h-10 w-10 animate-spin text-main" />
          </div>
        ) : !cart.length ? (
          <BookNoResult message="장바구니가 비었습니다." />
        ) : (
          <>
            {cart?.map((item) => (
              <CartList
                key={item.itemId}
                item={item}
                handleRemove={() => handleRemove(item.itemId)}
              />
            ))}
          </>
        )}
      </div>
      <PaymentSection cart={cart} handleSubmit={handleSubmit} total={total} />
    </div>
  );
}
