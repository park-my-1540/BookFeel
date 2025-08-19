import type { Database } from "database.types";
import type { BookCardItem } from "~/features/books/type";
import type { CartRepository } from "./cart-repo";

type Cart = Database["public"]["Tables"]["shopping_cart"]["Row"];
export class SupabaseCartRepo implements CartRepository {
  async list(): Promise<BookCardItem[]> {
    const res = await fetch("/shoppingcart/api");
    if (!res.ok) throw new Error("Failed to fetch cart");
    const data = await res.json();
    return data.items?.map((item: Cart) => ({
      author: item.author,
      contents: item.contents,
      itemId: item.itemId,
      priceSales: item.sale_price,
      priceStandard: item.price,
      title: item.title,
      cover: item.thumbnail,
    }));
  }

  async add(book: BookCardItem) {
    const res = await fetch("/shoppingcart/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent: "add", book }),
    });
    if (res.status === 409) {
      throw new Error("이미 장바구니에 있는 상품입니다.");
    }
  }
  async remove(itemId: string) {
    await fetch("/shoppingcart/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent: "remove", itemId }),
    });
  }

  async clear() {
    await fetch("/shoppingcart/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent: "clear" }),
    });
  }
}
