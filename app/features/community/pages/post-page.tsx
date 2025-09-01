import { DotIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useRef } from "react";
import {
  Form,
  useFetcher,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "react-router";
import z from "zod";
import AvatarUser from "~/components/common/AvatarUser";
import BreadComp from "~/components/common/BreadComp";
import CardInDelete from "~/components/common/CardInDelete";
import { LoadingButton } from "~/components/common/LoadingButton";
import UpvoteButton from "~/components/common/UpvoteButton";
import { Body1, Body3, Caption } from "~/components/ui/Typography";
import { Reply } from "~/features/community/components/reply";
import { getLoggedInUserId, getUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import AsideInfo from "../components/AsideInfo";
import { createReply, deleteReply } from "../mutations";
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

  const intent = formData.get("intent");
  if (intent === "delete-reply") {
    const postId = formData.get("postId") as string;
    const replyId = formData.get("replyId") as string;
    const topLevelId = formData.get("topLevelId") as string;

    await deleteReply(client, {
      postId: Number(postId),
      replyId: replyId,
      userId,
      topLevelId: Number(topLevelId),
    });
  } else {
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
  }
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getUserId(client);

  const [post, replies] = await Promise.all([
    getPostById(client, { postId: Number(params.postId) }),
    getReplies(client, { postId: Number(params.postId) }),
  ]);

  return { post, replies, userId };
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
  const navigate = useNavigate();
  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postId", loaderData.post.post_id.toString());
    fetcher.submit(formData, {
      method: "POST",
      action: `/community`,
    });
  };
  const update = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/community/${loaderData.post.post_id}/update`, {
      state: {
        postId: loaderData.post.post_id,
      },
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
      <BreadComp
        link={[
          { to: "/community", name: "Community" },
          {
            to: `/community?topic=${loaderData.post.topic_slug}`,
            name: loaderData.post.topic_name,
          },
          {
            to: `/community/postId`,
            name: loaderData.post.title,
          },
        ]}
      />

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
                    update={update}
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
                      placeholder="댓글을 입력하세요"
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
                      isUsers={reply.user.profile_id === loaderData.userId}
                      key={index}
                      name={reply.user.name}
                      username={reply.user.username}
                      avatarUrl={reply.user.avatar}
                      content={reply.reply}
                      timestamp={reply.created_at}
                      topLevel={true}
                      postId={loaderData.post.post_id}
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
