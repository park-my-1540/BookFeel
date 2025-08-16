import type { SupabaseClient } from "@supabase/supabase-js";

export const getPosts = async (
  client: SupabaseClient,
  { sorting, keyword, topic }
) => {
  const baseQuery = client.from("community_post_list_view").select("*");

  if (sorting === "newest") {
    baseQuery.order("created_at", { ascending: false });
  } else {
    baseQuery.order("upvotes", { ascending: false });
  }

  if (keyword) {
    baseQuery.ilike("title", `%${keyword}`);
  }

  if (topic) {
    baseQuery.eq("topic_slug", topic);
  }

  const { data, error } = await baseQuery;

  if (error) throw new Error(error.message);
  return data;
};
export const getTopics = async (client: SupabaseClient) => {
  const baseQuery = client.from("topics").select("*");

  const { data, error } = await baseQuery;

  if (error) throw new Error(error.message);
  return data;
};

export const getPostById = async (
  client: SupabaseClient,
  { postId }: { postId: number }
) => {
  const { data, error } = await client
    .from("community_post_detail")
    .select("*")
    .eq("post_id", postId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};
