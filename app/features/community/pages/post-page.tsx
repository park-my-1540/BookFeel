import { DotIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useRef } from "react";
import {
  Form,
  Link,
  useFetcher,
  useNavigation,
  useOutletContext,
} from "react-router";
import { z } from "zod";
import AvatarUser from "~/components/common/AvatarUser";
import CardInDelete from "~/components/common/CardInDelete";
import { LoadingButton } from "~/components/common/LoadingButton";
import UpvoteButton from "~/components/common/UpvoteButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Body1, Body3, Caption } from "~/components/ui/Typography";
import { Reply } from "~/features/community/components/reply";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import AsideInfo from "../components/AsideInfo";
import { createReply } from "../mutations";
import { getPostById, getReplies } from "../queries";
import type { Route } from "./+types/post-page";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `title: ${params.postId}` },
];

const formSchema = z.object({
  reply: z.string().min(1),
  topLevelId: z.coerce.number().optional(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
    };
  }

  const { reply, topLevelId } = data;
  await createReply(client, {
    postId: Number(params.postId),
    reply,
    userId,
    topLevelId: Number(topLevelId),
  });
  return {
    ok: true,
  };
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);

  const [post, replies] = await Promise.all([
    getPostById(client, { postId: Number(params.postId) }),
    getReplies(client, { postId: Number(params.postId) }),
  ]);

  return { post, replies };
};

export default function PostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { isLoggedIn, name, username, avatar } = useOutletContext<{
    isLoggedIn: boolean;
    name?: string;
    username?: string;
    avatar?: string;
  }>();
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  const fetcher = useFetcher();

  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postId", loaderData.post.post_id.toString());
    fetcher.submit(formData, {
      method: "POST",
      action: `/community`,
    });
  };

  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetcher.submit(null, {
      method: "POST",
      action: `/community/${loaderData.post.post_id}/upvote`,
    });
  };

  useEffect(() => {
    formRef.current?.reset();
  }, [actionData?.ok]);
  return (
    <div className="w-full px-lg py-sm pb-lg">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community?topic=${loaderData.post.topic_slug}`}>
                {loaderData.post.topic_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/postId`}>{loaderData.post.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-6 gap-40 items-start mt-10">
        <div className="col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <fetcher.Form
              method="post"
              action={`/community/${loaderData.post.post_id}/upvote`}
            >
              <UpvoteButton
                state={fetcher.state}
                votesCount={loaderData.post.upvotes}
                isUpvoted={loaderData.post.is_upvoted}
                absorbClick={absorbClick}
              />
            </fetcher.Form>
            <div className="space-y-20 w-full">
              <div className="space-y-2 relative">
                <h2 className="text-3xl font-bold">{loaderData.post.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground relative">
                  <Caption>{loaderData.post.author_name}</Caption>
                  <DotIcon className="size-4 shrink-0" />
                  <Caption>
                    {DateTime.fromISO(loaderData.post.created_at).toRelative()}
                  </Caption>
                  <DotIcon className="size-4 shrink-0" />
                  <Caption>{loaderData.post.replies}개의 댓글</Caption>
                  <CardInDelete
                    isUsers={loaderData.post.is_users}
                    remove={remove}
                  />
                </div>
                <div className="pt-4">
                  <Body3>{loaderData.post.content}</Body3>
                </div>
              </div>

              {isLoggedIn ? (
                <Form
                  ref={formRef}
                  className="flex items-start gap-5 w-3/4"
                  method="post"
                >
                  <AvatarUser
                    avatar={avatar ?? ""}
                    fallback={name?.charAt(0) ?? ""}
                  />

                  <div className="w-full flex flex-col gap-5 items-end">
                    <textarea
                      name="reply"
                      placeholder="댓글을 입력하세요."
                      className="resize-none w-full p-3 bg-gray rounded-sm"
                      rows={5}
                    />
                    <LoadingButton isLoading={isSubmitting}>
                      댓글 작성
                    </LoadingButton>
                  </div>
                </Form>
              ) : (
                <Caption>댓글을 달려면 로그인하세요.</Caption>
              )}

              <div className="space-y-10">
                <Body1>{loaderData.post.replies}개의 댓글</Body1>
                <div className="flex flex-col gap-5">
                  {loaderData.replies.map((reply: any, index) => (
                    <Reply
                      key={index}
                      name={reply.user.name}
                      username={reply.user.username}
                      avatarUrl={reply.user.avatar}
                      content={reply.reply}
                      timestamp={reply.created_at}
                      topLevel={true}
                      topLevelId={reply.post_reply_id}
                      replies={reply.post_replies}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <AsideInfo
          avatar={loaderData.post.author_avatar}
          author={loaderData.post.author_name}
          created_at={loaderData.post.author_created_at}
        />
      </div>
    </div>
  );
}
