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
