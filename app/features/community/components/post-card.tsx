import { cn } from "~/lib/utils";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { Link, useFetcher } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { DateTime } from "luxon";
import AvatarUser from "~/components/common/AvatarUser";
interface PostCardProps {
  id: number;
  title: string;
  author: string;
  authorAvatarUrl: string;
  category: string;
  postedAt: string;
  expanded?: boolean;
  votesCount?: number;
  isUpvoted?: boolean;
}

export function PostCard({
  id,
  title,
  author,
  authorAvatarUrl,
  category,
  postedAt,
  expanded = false,
  isUpvoted = false,
  votesCount = 0,
}: PostCardProps) {
  const fetcher = useFetcher();

  const optimisitcVotesCount =
    fetcher.state === "idle"
      ? votesCount
      : isUpvoted
        ? votesCount - 1
        : votesCount + 1;

  const optimisitcIsUpvoted = fetcher.state === "idle" ? isUpvoted : !isUpvoted;

  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetcher.submit(null, {
      method: "POST",
      action: `/community/${id}/upvote`,
    });
  };

  return (
    <Link to={`/community/${id}`} className='block'>
      <Card
        className={cn(
          "bg-transparent hover:bg-gray transition-colors border-borderGray rounded-md px-sm",
          expanded ? "flex flex-row items-center justify-between" : ""
        )}
      >
        <CardHeader className='flex flex-row gap-2 items-center'>
          <AvatarUser avatar={authorAvatarUrl} fallback={author[0]} />
          <div className='space-y-2'>
            <CardTitle>{title}</CardTitle>
            <div className='flex gap-2 text-xs leading-none text-muted-foreground'>
              <span>{author} on</span>
              <span>{category}</span>
              <DotIcon className='w-4 h-4' />
              <span>{DateTime.fromISO(postedAt).toRelative()}</span>
            </div>
          </div>
        </CardHeader>
        {!expanded && (
          <CardFooter className='flex justify-end'>
            <Button variant='link'>Reply &rarr;</Button>
          </CardFooter>
        )}
        {expanded && (
          <CardFooter className='flex justify-end pt-0 pb-0'>
            <Button
              onClick={absorbClick}
              variant='outline'
              className={cn(
                "flex flex-col h-14",
                optimisitcIsUpvoted ? "border-primary text-primary" : ""
              )}
            >
              <ChevronUpIcon className='size-4 shrink-0' />
              <span>{optimisitcVotesCount}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
