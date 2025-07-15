/**
 * 찜한 목록을 전역에서 관리하기 위한 Zustand Store.
 * -`wishlist`: 찜한 목록 배열
 * -`addToWishlist`: 새 도서 추가
 * -`removeToWishlist`: 특정 도서 삭제
 * -`isInWishlist`: 찜한 도서 여부
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookItem } from "../type";

interface WishlistStore {
  wishlist: BookItem[];
  addToWishlist: (book: BookItem) => void;
  removeToWishlist: (book: BookItem) => void;
  isInWishlist: (bookId: string) => boolean;
}

export const useWishListStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (book) =>
        set((state) => {
          if (state.wishlist.find((b) => b.id === book.id)) return state;
          return { wishlist: [...state.wishlist, book] };
        }),
      removeToWishlist: (book) =>
        set((state) => {
          const update = state.wishlist.filter((b) => b.id !== book.id);
          return { wishlist: [...update] };
        }),
      isInWishlist: (bookId) => {
        const wishlist = get().wishlist;
        return !!wishlist.find((b) => b.id === bookId);
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
