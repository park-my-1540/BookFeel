import type { SupabaseClient } from "@supabase/supabase-js";

export const createPost = async (
  client: SupabaseClient,
  {
    title,
    content,
    topic,
    profile_id,
  }: { title: string; content: string; topic: string; profile_id: string }
) => {
  const { data: topics, error: topicError } = await client
    .from("topics")
    .select("topic_id")
    .eq("slug", topic)
    .single();

  if (topicError) {
    throw topicError;
  }

  const { data, error } = await client
    .from("posts")
    .insert({
      title,
      content,
      topic_id: topics.topic_id,
      profile_id,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

/**
 * topLevelId
 * o 대댓글 -> set parent_id === topLevelId
 * x 그냥 댓글 -> set post_id
 */
export const createReply = async (
  client: SupabaseClient,
  {
    postId,
    reply,
    userId,
    topLevelId,
  }: { postId: number; reply: string; userId: string; topLevelId?: number }
) => {
  const { data, error } = await client.from("post_replies").insert({
    ...(topLevelId ? { parent_id: topLevelId } : { post_id: Number(postId) }),
    reply,
    profile_id: userId,
  });

  if (error) {
    throw error;
  }
};

export const togglePostpvote = async (
  client: SupabaseClient,
  { postId, userId }: { postId: string; userId: string }
) => {
  const { count } = await client
    .from("post_upvotes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId)
    .eq("profile_id", userId);

  if (count === 0) {
    await client
      .from("post_upvotes")
      .insert({ profile_id: userId, post_id: postId });
  } else {
    const { data, error } = await client
      .from("post_upvotes")
      .delete()
      .eq("post_id", postId)
      .eq("profile_id", userId);
    if (error) {
      throw error;
    }
  }
};
export const deletePost = async (
  client: SupabaseClient,
  { profile_id, post_id }: { profile_id: string; post_id: string }
) => {
  const { error } = await client
    .from("posts")
    .delete()
    .eq("post_id", Number(post_id))
    .eq("profile_id", profile_id)
    .single();
  if (error) throw error;
};
