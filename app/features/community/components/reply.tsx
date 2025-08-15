import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Form, Link, useActionData, useOutletContext } from "react-router";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useEffect, useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { DateTime } from "luxon";
import { z } from "zod";
import type { action } from "../pages/post-page";
interface ReplyProps {
  name: string;
  username: string;
  avatarUrl: string | null;
  content: string;
  timestamp: string;
  topLevel: boolean;
  topLevelId: number;
  replies?: {
    post_reply_id: number;
    reply: string;
    created_at: string;
    topLevelId?: number;
    user: {
      name: string;
      avatar: string | null;
      username: string;
    };
  }[];
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
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex items-start gap-5 w-2/3'>
        <Avatar className='size-14'>
          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-2 items-start w-full'>
          <div className='flex items-center gap-2'>
            <Link to={`/users/@${username}`}>
              <h4 className='font-medium'>{name}</h4>
            </Link>
            <DotIcon className='size-5' />
            <span className='text-xs text-muted-foreground'>
              {DateTime.fromISO(timestamp).toRelative()}
            </span>
          </div>

          <p className='text-muted-foreground'>{content}</p>
          {isLoggedIn && (
            <Button
              variant='ghost'
              className='self-end'
              onClick={toggleReplying}
            >
              <MessageCircleIcon className='size-4 shrink-0' />
              <span>답댓글 달기</span>
            </Button>
          )}
        </div>
      </div>
      {replying && (
        <Form className='flex items-start gap-5 w-3/4' method='post'>
          <input type='hidden' name='topLevelId' value={topLevelId} />
          <Avatar className='size-14'>
            <AvatarFallback>{loggedInName[0]}</AvatarFallback>
            {avatar ? <AvatarImage src={avatar} /> : null}
          </Avatar>
          <div className='w-full flex flex-col gap-5 items-end'>
            <Textarea
              name='reply'
              placeholder='댓글을 입력하세요.'
              className='resize-none w-full'
              defaultValue={`@${username} `}
              rows={5}
            />
            <Button type='submit'>댓글 작성</Button>
          </div>
        </Form>
      )}
      {topLevel && replies && (
        <div className='pl-20 w-full'>
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
      )}
    </div>
  );
}
