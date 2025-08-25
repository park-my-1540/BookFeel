create or replace view all_gemini_ideas as
select
  title,
  author,
  NULL::uuid as profile_id,
  cover,
  keyword,
  created_at
from gemini_ideas

union all

select
  title,
  author,
  profile_id,
  cover,
  keyword,
  created_at
from user_custom_keywords;


select * from all_gemini_ideas;