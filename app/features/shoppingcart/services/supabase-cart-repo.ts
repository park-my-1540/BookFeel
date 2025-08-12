import type { BookCardItem } from "~/features/books/type";
import type { CartRepository } from "./cart-repo";
import type { Database } from "database.types";

type Cart = Database["public"]["Tables"]["shopping_cart"]["Row"];
export class SupabaseCartRepo implements CartRepository {
  async list(): Promise<BookCardItem[]> {
    const res = await fetch("shoppingcart/api");
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
    const res = await fetch("shoppingcart/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent: "add", book }),
    });
    if (!res.ok) {
      throw new Error("장바구니 추가 요청에 실패했습니다.");
    }
  }
  async remove(itemId: string) {
    const res = await fetch("shoppingcart/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent: "remove", itemId }),
    });

    if (!res.ok) {
      throw new Error("장바구니 삭제 요청에 실패했습니다.");
    }
  }

  async clear() {
    const res = await fetch("shoppingcart/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent: "clear" }),
    });

    if (!res.ok) {
      throw new Error("장바구니 비우기 요청에 실패했습니다.");
    }
  }
}
