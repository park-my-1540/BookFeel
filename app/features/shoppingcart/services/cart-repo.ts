import type { BookCardItem } from "~/features/books/type";

//공통 인터페이스(Repository)
export interface CartRepository {
  list(): Promise<BookCardItem[]>;
  add(item: BookCardItem): Promise<void>;
  remove(itemId: string): Promise<void>;
  clear(): Promise<void>;
}
