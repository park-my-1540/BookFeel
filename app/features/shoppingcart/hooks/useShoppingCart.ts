import { useCallback, useEffect, useState } from "react";
import type { BookCardItem } from "~/features/books/type";
import {
  getCartLS,
  addToCartLS,
  removeFromCartLS,
  clearCartLS,
} from "../services/cartStorage";

export function useShoppingCart() {
  const [items, setItems] = useState<BookCardItem[]>([]);

  const reload = useCallback(() => setItems(getCartLS()), []);
  const addToCart = useCallback(
    (book: BookCardItem) => {
      addToCartLS(book);
      reload();
    },
    [reload]
  );
  const removeFromCart = useCallback(
    (link: string) => {
      removeFromCartLS(link);
      reload();
    },
    [reload]
  );
  const clearCart = useCallback(() => {
    clearCartLS();
    reload();
  }, [reload]);

  useEffect(() => {
    reload();
  }, [reload]); // 클라이언트에서만 실행됨

  return { items, addToCart, removeFromCart, clearCart, reload };
}
