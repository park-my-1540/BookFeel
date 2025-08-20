import type { SupabaseClient } from "@supabase/supabase-js";

export const getPosts = async (
  client: SupabaseClient,
  {
    sorting,
    keyword,
    topic,
  }: { sorting: "newest" | "popular"; keyword?: string; topic?: string }
) => {
  const baseQuery = client.from("community_post_list_view").select("*");

  if (sorting === "newest") {
    baseQuery.order("created_at", { ascending: false });
  } else {
    baseQuery.order("upvotes", { ascending: false });
  }

  if (keyword) {
    baseQuery.ilike("title", `%${keyword}%`);
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

export const getReplies = async (
  client: SupabaseClient,
  { postId }: { postId: number }
) => {
  const replyQuery = `       
    post_reply_id,
    reply, 
    created_at,
    user:profiles(
    name,
    avatar,
    username
  )
  `;
  const { data, error } = await client
    .from("post_replies")
    .select(
      `
      ${replyQuery},
      post_replies(${replyQuery})`
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }
  return data;
};
