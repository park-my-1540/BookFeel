import { DotIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Form, Link, useActionData, useOutletContext } from "react-router";
import { z } from "zod";
import AvatarUser from "~/components/common/AvatarUser";
import { Button } from "~/components/ui/button";
import { Body1, Caption } from "~/components/ui/Typography";
import type { action } from "../pages/post-page";

interface CommentItem {
  name: string;
  username: string;
  avatarUrl: string | null;
  content: string;
  timestamp: string;
}
interface ReplyProps extends CommentItem {
  topLevel: boolean;
  topLevelId: number;
  replies?: repliesProps[];
}
interface repliesProps {
  post_reply_id: number;
  reply: string;
  created_at: string;
  topLevelId?: number;
  user: {
    name: string;
    avatar: string | null;
    username: string;
  };
}

export const formSchema = z.object({
  reply: z.string().min(1),
});

export function Reply({
  name,
  username,
  avatarUrl,
  content,
  timestamp,
  topLevelId,
  topLevel = false,
  replies,
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  const {
    isLoggedIn,
    name: loggedInName,
    avatar,
  } = useOutletContext<{
    isLoggedIn: boolean;
    name: string;
    avatar?: string;
  }>();

  // 가장 최근에 POST navigation form submit의 actionData를 반환.
  const actionData = useActionData<typeof action>();
  useEffect(() => {
    if (actionData?.ok) {
      setReplying(false);
    }
  }, [actionData]);
  return (
    <div className="flex flex-col gap-2 w-full">
      <CommentItem
        avatarUrl={avatarUrl}
        name={name}
        username={username}
        timestamp={timestamp}
        content={content}
        isLoggedIn={isLoggedIn}
        toggleReplying={toggleReplying}
      />
      {replying && (
        <ReplyInput
          avatar={avatar}
          topLevelId={topLevelId}
          loggedInName={loggedInName}
          username={username}
        />
      )}
      {topLevel && replies && (
        <NestedReply replies={replies} topLevelId={topLevelId} />
      )}
    </div>
  );
}
function CommentItem({
  avatarUrl,
  name,
  username,
  timestamp,
  content,
  isLoggedIn,
  toggleReplying,
}: CommentItem & { isLoggedIn: boolean; toggleReplying: () => void }) {
  return (
    <div className="flex items-start gap-5 w-3/4">
      <AvatarUser avatar={avatarUrl ?? ""} fallback={name[0]} />
      <div className="flex flex-col gap-2 items-start w-full">
        <div className="flex items-center gap-2">
          <Link to={`/users/@${username}`}>
            <h4 className="font-medium">{name}</h4>
          </Link>
          <DotIcon className="size-5" />
          <Caption>{DateTime.fromISO(timestamp).toRelative()}</Caption>
        </div>

        <Body1>{content}</Body1>
        {isLoggedIn && (
          <Button
            variant="ghost"
            className="self-end border border-borderGray"
            onClick={toggleReplying}
          >
            답글
          </Button>
        )}
      </div>
    </div>
  );
}
interface ReplyInputProps {
  avatar?: string;
  topLevelId: number;
  loggedInName: string;
  username: string;
}
function ReplyInput({
  avatar,
  topLevelId,
  loggedInName,
  username,
}: ReplyInputProps) {
  return (
    <Form className="flex items-start gap-5 w-3/4" method="post">
      <input type="hidden" name="topLevelId" value={topLevelId} />
      <AvatarUser avatar={avatar ?? ""} fallback={loggedInName[0]} />
      <div className="w-full flex flex-col gap-5 items-end">
        <textarea
          name="reply"
          placeholder="댓글을 입력하세요."
          className="resize-none w-full p-3 bg-gray rounded-sm"
          defaultValue={`@${username} `}
          rows={5}
        />
        <Button type="submit">댓글 작성</Button>
      </div>
    </Form>
  );
}

function NestedReply({
  replies,
  topLevelId,
}: {
  replies: repliesProps[];
  topLevelId: number;
}) {
  return (
    <div className="pl-20 w-full">
      {replies.map((reply, index) => (
        <Reply
          key={index}
          name={reply.user.name}
          username={reply.user.username}
          avatarUrl={reply.user.avatar}
          content={reply.reply}
          timestamp={reply.created_at}
          topLevel={false}
          topLevelId={topLevelId}
        />
      ))}
    </div>
  );
}
