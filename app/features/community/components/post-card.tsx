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
    <Link to={`/community/${id}`} className="block">
      <Card className="relative flex flex-row items-center justify-between bg-transparent hover:bg-gray transition-colors border-borderGray rounded-md px-10">
        <CardHeader className="flex flex-row gap-4 items-center">
          <AvatarUser avatar={authorAvatarUrl} fallback={author[0]} />
          <div className="space-y-3">
            <CardTitle>{title}</CardTitle>
            <div className="flex gap-2 text-sm leading-none text-muted-foreground">
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

        <CardFooter className="flex justify-end pt-0 pb-0">
          <UpvoteButton
            absorbClick={absorbClick}
            state={fetcher.state}
            votesCount={votesCount}
            isUpvoted={isUpvoted}
          />
        </CardFooter>
        <CardInDelete isUsers={isUsers} remove={remove} update={update} />
      </Card>
    </Link>
  );
}
