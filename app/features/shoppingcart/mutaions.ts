import type { SupabaseClient } from "@supabase/supabase-js";
import type { BookCardItem } from "../books/type";

export const insertItem = async (
  client: SupabaseClient,
  books: BookCardItem,
  profile_id: string
) => {
  const { error } = await client.from("shopping_cart").insert({
    itemId: books.itemId,
    title: books.title,
    author: books.author,
    thumbnail: books.cover,
    price: books.priceStandard,
    sale_price: books.priceSales,
    contents: books.contents,
    profile_id,
  });
  if (error) {
    throw error;
  }
};

export const deleteItem = async (
  client: SupabaseClient,
  bookId: string,
  userId: string
) => {
  const { error } = await client
    .from("shopping_cart")
    .delete()
    .eq("itemId", bookId)
    .eq("profile_id", userId);
  if (error) {
    throw error;
  }
};
export const clearItem = async (client: SupabaseClient) => {
  const { error } = await client.from("shopping_cart").delete();
  if (error) {
    throw error;
  }
};
