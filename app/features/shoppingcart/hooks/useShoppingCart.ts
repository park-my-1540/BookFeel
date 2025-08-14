import { useCallback, useEffect, useMemo, useState } from "react";
import type { BookCardItem } from "~/features/books/type";
import type { CartRepository } from "../services/cart-repo";
import { getCartLS, clearCartLS } from "../services/cartStorage";
import { LocalCartRepo } from "../services/local-cart-repo";
import { SupabaseCartRepo } from "../services/supabase-cart-repo";
import { useOutletContext } from "react-router";

type Options = {
  _isLoggedIn?: boolean | null; // 로그인 시 전달
};

export function useShoppingCart({ _isLoggedIn }: Options = {}) {
  const outletCtx = useOutletContext<{ isLoggedIn: boolean } | null>();
  const isLoggedIn = _isLoggedIn ?? outletCtx?.isLoggedIn ?? false;

  const repo: CartRepository = useMemo(() => {
    if (isLoggedIn) return new SupabaseCartRepo();
    return new LocalCartRepo();
  }, [isLoggedIn]);

  const [items, setItems] = useState<BookCardItem[]>();
  const [count, setCount] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const list = await repo.list();
      setCount(list.length);
      setItems(list);
    } finally {
      setLoading(false);
    }
  }, [repo]);

  useEffect(() => {
    const onCartChange = () => reload();
    window.addEventListener("cart:changed", onCartChange);

    return () => {
      window.removeEventListener("cart:changed", onCartChange);
    };
  }, [reload]);

  const addToCart = useCallback(
    async (book: BookCardItem) => {
      setError(null);
      try {
        await repo.add(book);
        window.dispatchEvent(new Event("cart:changed"));
        await reload();
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
          throw e;
        }
        throw e;
      }
    },
    [repo, reload]
  );

  const removeFromCart = useCallback(
    async (itemId: string) => {
      setError(null);
      try {
        await repo.remove(itemId);
        window.dispatchEvent(new Event("cart:changed"));
        await reload();
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
          throw e;
        }
        throw e;
      }
    },
    [repo, reload]
  );

  const clearCart = useCallback(async () => {
    setError(null);
    try {
      await repo.clear();
      await reload();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        throw e;
      }
      throw e;
    }
  }, [repo, reload]);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    //  다른 탭이나 창에서 변경됐을 때 현재 탭도 동기화
    const onStorage = (e: StorageEvent) => {
      if (e.key === "shopping_cart") reload();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [reload]);

  useEffect(() => {
    (async () => {
      const localItems = getCartLS();
      if (localItems.length === 0) {
        await reload();
        return;
      }
      try {
        const current = await new SupabaseCartRepo().list();
        const existingIds = new Set(current.map((i) => i.itemId));

        const toInsert = localItems.filter((i) => !existingIds.has(i.itemId));
        if (toInsert.length) {
          const supa = new SupabaseCartRepo();
          for (const it of toInsert) {
            await supa.add(it);
          }
        }
        clearCartLS();
      } catch {
        setError("장바구니 동기화에 실패했어요.");
      } finally {
        await reload();
      }
    })();
  }, [isLoggedIn, reload]);
  return {
    count: count ?? 0,
    items: items ?? [],
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    reload,
  };
}
