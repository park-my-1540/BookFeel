import type { BookCardItem, BookItem } from "~/features/books/type";
import { Button } from "../../../components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useShoppingCart } from "~/features/shoppingcart/hooks/useShoppingCart";
import { insertItem } from "~/features/shoppingcart/mutaions";
import { useFetcher } from "react-router";

type ShoppingCartButtonProps = {
  book: BookItem;
  size?: "sm" | "lg";
};

export default function ShoppingCartButton({ book }: ShoppingCartButtonProps) {
  const fetcher = useFetcher();
  const { addToCart } = useShoppingCart();
  const submitShoppingCart = (book) => {
    const form = new FormData();
    form.append("intent", "add");
    form.append("book", JSON.stringify(book)); // 객체는 JSON으로

    /**
     * 로그인 했다면 하지 않았다면....
     */
    fetcher.submit(form, {
      method: "POST",
      action: `/shoppingcart`,
      encType: "multipart/form-data",
    });
    // addToCart(book);
    alert("장바구니에 추가되었습니다.");
  };

  return (
    <Button
      size={"sm"}
      variant={"outline"}
      onClick={() => submitShoppingCart(book)}
    >
      <ShoppingCart />
    </Button>
  );
}
