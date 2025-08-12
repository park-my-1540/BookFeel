import type { BookCardItem } from "~/features/books/type";
import type { CartRepository } from "./cart-repo";
import {
  addToCartLS,
  clearCartLS,
  getCartLS,
  removeFromCartLS,
} from "./cartStorage";

export class LocalCartRepo implements CartRepository {
  async list() {
    return getCartLS();
  }
  async add(item: BookCardItem) {
    addToCartLS(item);
  }
  async remove(itemId: string) {
    removeFromCartLS(itemId);
  }
  async clear() {
    clearCartLS();
  }
}
