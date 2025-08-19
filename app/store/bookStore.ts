import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BookState = {
  cover: string;
  title: string;
  author: string;
  isbn: string;
  itemId: string;
};

type Store = {
  book: BookState;
  setBook: (book: BookState) => void;
  resetBook: () => void;
};

export const useBookStore = create<Store>()(
  persist(
    (set) => ({
      book: {
        cover: "",
        title: "",
        author: "",
        isbn: "",
        itemId: "",
      },
      setBook: (book) => set({ book }),
      resetBook: () =>
        set({
          book: { cover: "", title: "", author: "", isbn: "", itemId: "" },
        }),
    }),
    {
      name: "bookState",
    }
  )
);
