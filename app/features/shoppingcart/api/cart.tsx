import type { BookCardItem } from "~/features/books/type";
import type { Route } from "../pages/+types/shoppingcart-page";
import { makeSSRClient } from "~/supa-client";
import { clearItem, deleteItem, insertItem } from "../mutaions";
import { getShoppingCart } from "../queries";
import { getUserId } from "~/features/users/queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  // 첫 페이지 진입 시 기본 데이터 불러오기
  const { client } = makeSSRClient(request);
  const userId = await getUserId(client);

  if (!userId) {
    return { items: [], userId: null };
  }

  const { data, error } = await getShoppingCart(client, userId);
  if (error) throw new Response(error, { status: 500 });

  return { items: data ?? [], userId };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const { client, headers } = makeSSRClient(request);
  const userId = await getUserId(client);
  if (!userId) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 401,
      headers,
    });
  }

  const { intent, book, itemId } = await request.json();

  try {
    if (intent === "add") {
      await insertItem(
        client,
        {
          ...book,
          profile_id: userId,
        } as BookCardItem,
        userId
      );
    }
    if (intent === "remove") {
      await deleteItem(client, itemId, userId);
    }
    if (intent === "clear") {
      await clearItem(client);
    }
  } catch (err: any) {
    if (err.code === "23505") {
      return new Response(
        JSON.stringify({
          ok: false,
          message: "이미 장바구니에 있는 상품입니다.",
        }),
        { status: 409, headers }
      );
    }
    throw err;
  }
};
