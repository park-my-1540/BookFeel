CREATE OR REPLACE VIEW community_post_list_view AS
SELECT
  posts.post_id,
  posts.title,
  posts.created_at,
  topics.name AS topic,
  profiles.name AS author,
  profiles.avatar AS author_avatar,
  profiles.username AS author_username,
  COUNT(post_replies.post_reply_id) as replies,
  posts.upvotes,
  topics.slug AS topic_slug,
  (posts.profile_id = auth.uid()) AS is_users,
  (SELECT EXISTS (SELECT 1 FROM public.post_upvotes WHERE post_upvotes.post_id = posts.post_id AND post_upvotes.profile_id = auth.uid())) AS is_upvoted
FROM posts
INNER JOIN topics ON topics.topic_id = posts.topic_id
LEFT JOIN post_replies ON post_replies.post_id = posts.post_id
INNER JOIN profiles ON profiles.profile_id = posts.profile_id
GROUP BY
  posts.post_id,
  posts.title,
  posts.created_at,
  topics.name,
  profiles.name,
  profiles.avatar,
  profiles.username,
  posts.upvotes,
  topics.slug,
  posts.profile_id;

SELECT * FROM community_post_list_view

GRANT SELECT ON community_post_list_view TO anon;

DROP VIEW IF EXISTS community_post_list_view;