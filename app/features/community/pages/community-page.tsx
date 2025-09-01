import { data, Form, Link, redirect } from "react-router";
import { z } from "zod";
import SortingDropMenu from "~/components/common/SortingMenu";
import { Button } from "~/components/ui/button";
import { Heading2, Title2 } from "~/components/ui/Typography";
import BookNoResult from "~/features/books/components/BookNoResult";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { PostCard } from "../components/post-card";
import { deletePost } from "../mutations";
import { getPosts, getTopics } from "../queries";
import type { Route } from "./+types/community-page";

const searchParamsSchema = z.object({
  sorting: z.enum(["newest", "popular"]).optional().default("newest"),
  keyword: z.string().optional(),
  topic: z.string().optional(),
});
export const action = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);

  const formData = await request.formData();
  const postId = formData.get("postId");

  if (typeof postId !== "string") {
    throw new Error("Invalid postId");
  }
  await deletePost(client, {
    profile_id: userId,
    post_id: postId,
  });
  return redirect("/community");
};
export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "invalid_search_params",
        message: "Invalid search params",
      },
      { status: 400 }
    );
  }
  const { client } = makeSSRClient(request);

  const [topics, posts] = await Promise.all([
    getTopics(client),
    getPosts(client, {
      sorting: parsedData.sorting,
      topic: parsedData.topic,
      keyword: parsedData.keyword,
    }),
  ]);

  return { topics, posts };
};

export const meta: Route.MetaFunction = () => [{ title: "커뮤니티" }];

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full px-lg pb-md">
      <Heading2>Community</Heading2>
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 space-y-10">
          <div className="flex justify-between">
            <div className="space-y-5 w-full">
              <SortingDropMenu />
              <Form className="w-2/3">
                <input
                  type="text"
                  className="p-3 w-full bg-gray rounded-md"
                  name="keyword"
                  placeholder="검색어를 입력해주세요."
                />
              </Form>
            </div>
            <Button asChild>
              <Link to="/community/create">글 올리기</Link>
            </Button>
          </div>
          <div className="space-y-5">
            {loaderData.posts?.length > 0 ? (
              <>
                {loaderData.posts.map((post) => (
                  <PostCard
                    id={post.post_id}
                    key={post.post_id}
                    title={post.title}
                    author={post.author}
                    authorAvatarUrl={post.author_avatar}
                    category={post.topic}
                    postedAt={post.created_at}
                    votesCount={post.upvotes}
                    replies={post.replies}
                    isUpvoted={post.is_upvoted}
                    isUsers={post.is_users}
                    expanded={true}
                  />
                ))}
              </>
            ) : (
              <BookNoResult message={"작성된 포스트가 없습니다."} />
            )}
          </div>
        </div>
        <aside className="col-span-2">
          <Title2>Topics</Title2>
          <div className="flex flex-col gap-4 items-start mt-5">
            {loaderData.topics.map((topic) => (
              <Button
                asChild
                variant={"link"}
                key={topic.slug}
                className="pl-0 text-md text-sub"
              >
                <Link to={`/community?topic=${topic.slug}`}>{topic.name}</Link>
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
