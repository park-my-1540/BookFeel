import { create } from "zustand";

type CartCountState = {
  count: number;
  set: (n: number) => void;
  inc: (n?: number) => void;
  dec: (n?: number) => void;
  reset: () => void;
};

export const useCartCount = create<CartCountState>((set) => ({
  count: 0,
  set: (n) => set({ count: Math.max(0, n) }),
  inc: (n = 1) => set((s) => ({ count: Math.max(0, s.count + n) })),
  dec: (n = 1) => set((s) => ({ count: Math.max(0, s.count - n) })),
  reset: () => set({ count: 0 }),
}));
