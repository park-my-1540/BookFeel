import { DotIcon, MessageCircle } from "lucide-react";
import { DateTime } from "luxon";
import { Link, useFetcher, useNavigate } from "react-router";
import AvatarUser from "~/components/common/AvatarUser";
import CardInDelete from "~/components/common/CardInDelete";
import UpvoteButton from "~/components/common/UpvoteButton";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
interface PostCardProps {
  id: number;
  title: string;
  author: string;
  authorAvatarUrl: string;
  category: string;
  postedAt: string;
  expanded?: boolean;
  votesCount?: number;
  replies: number;
  isUpvoted?: boolean;
  isUsers?: boolean;
}

export function PostCard({
  id,
  title,
  author,
  authorAvatarUrl,
  category,
  postedAt,
  replies,
  expanded = false,
  isUpvoted = false,
  isUsers = false,
  votesCount = 0,
}: PostCardProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetcher.submit(null, {
      method: "POST",
      action: `/community/${id}/upvote`,
    });
  };
  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("postId", id.toString());

    fetcher.submit(formData, {
      method: "POST",
      action: `/community`,
    });
  };
  const update = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/community/${id}/update`, {
      state: {
        postId: id,
      },
    });
  };
  return (
    <Card className="relative flex min-w-0 flex-row items-center justify-between gap-2 rounded-xl border-borderGray bg-white px-3 py-4 transition-colors hover:bg-gray sm:gap-4 sm:px-5">
      <CardHeader className="flex min-w-0 flex-1 flex-row items-center gap-2 sm:gap-4">
        <AvatarUser avatar={authorAvatarUrl} fallback={author?.[0] ?? ""} />
        <div className="min-w-0 space-y-2">
          <CardTitle className="break-words leading-snug">
            <Link
              className="hover:underline focus-visible:underline"
              to={`/community/${id}`}
            >
              {title}
            </Link>
          </CardTitle>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 break-words text-xs text-muted-foreground sm:text-sm">
            <span>{author} on</span>
            <span>{category}</span>
            <DotIcon className="w-4 h-4" />
            <span>{DateTime.fromISO(postedAt).toRelative()}</span>
            <DotIcon className="w-4 h-4" />
            <span className="flex gap-1 items-center">
              <MessageCircle className="w-4 h-4" />
              {replies}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardFooter className="flex shrink-0 justify-end p-0">
        <UpvoteButton
          absorbClick={absorbClick}
          state={fetcher.state}
          votesCount={votesCount}
          isUpvoted={isUpvoted}
        />
      </CardFooter>
      <CardInDelete isUsers={isUsers} remove={remove} update={update} />
    </Card>
  );
}
