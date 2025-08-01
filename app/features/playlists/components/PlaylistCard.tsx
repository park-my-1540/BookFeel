import { ChevronUpIcon } from "lucide-react";
import { useFetcher, useNavigate, useOutletContext } from "react-router";
import { Title1, Caption } from "~/components/ui/Typography";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
interface PlaylistCardProps {
  id: number;
  url: string;
  title: string;
  author: string;
  isUpvoted: boolean;
  upvotes: number;
}
export function PlaylistCard({
  id,
  url,
  title,
  author,
  isUpvoted,
  upvotes,
}: PlaylistCardProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { isLoggedIn } = useOutletContext<{ isLoggedIn: boolean }>();
  const optimisitcupvotes =
    fetcher.state === "idle" ? upvotes : isUpvoted ? upvotes - 1 : upvotes + 1;

  const optimisitcIsUpvoted = fetcher.state === "idle" ? isUpvoted : !isUpvoted;
  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please log in first!");
      navigate("/auth/login");
      return;
    }

    fetcher.submit(null, {
      method: "POST",
      action: `/playlists/${id}/upvote`,
    });
  };

  return (
    <Card>
      <CardContent>
        <div className='flex flex-row'>
          <div className='w-full relative pb-[56.25%]'>
            <iframe
              src={url}
              title={title}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
              className='absolute top-0 left-0 w-full h-full'
            ></iframe>
          </div>
        </div>
        <div className='pt-5'>
          <Title1>{title}</Title1>
          <Caption>{author}</Caption>
        </div>
        <div>
          <Button
            onClick={absorbClick}
            variant='outline'
            className={cn(
              "flex flex-col h-14",
              optimisitcIsUpvoted ? "border-primary text-primary" : ""
            )}
          >
            <ChevronUpIcon className='size-4 shrink-0' />
            <span>{optimisitcupvotes}</span>
            <span>{optimisitcIsUpvoted}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
