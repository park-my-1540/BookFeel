import type { SupabaseClient } from "@supabase/supabase-js";

interface books {
  title: string;
  author: string;
  cover: string;
  keyword: string;
}

export const insertItem = async (client: SupabaseClient, books) => {
  const { error } = await client.from("shopping_cart").insert({
    id: books.itemId,
    title: books.title,
    authors: books.author,
    publisher: books.publisher,
    thumbnail: books.cover,
    price: books.priceStandard,
    sale_price: books.priceSales,
    contents: books.contents,
  });
  if (error) {
    throw error;
  }
};

export const deleteItem = async (client: SupabaseClient, books) => {
  const { error } = await client.from("shopping_cart").delete();
  if (error) {
    throw error;
  }
};
