import type { BookCardItem } from "~/features/books/type";
const STORAGE_KEY = "shopping_cart";

const isBrowser = () => typeof window !== "undefined";

export function getCartLS(): BookCardItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem("shopping_cart");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
}

export function addToCartLS(book: BookCardItem) {
  if (!isBrowser()) return;
  const cur = getCartLS();
  if (cur.some((i) => i.id === book.id)) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...cur, book]));
}

export function removeFromCartLS(id: string) {
  if (!isBrowser()) return;
  const cur = getCartLS().filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cur));
}

export function clearCartLS() {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEY);
}
