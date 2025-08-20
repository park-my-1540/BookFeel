import { ChevronUpIcon, EllipsisVertical, Trash2 } from "lucide-react";
import { useFetcher, useNavigate, useOutletContext } from "react-router";
import { Caption, Title1 } from "~/components/ui/Typography";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";

export interface PlaylistCardProps {
  id: number;
  url: string;
  title: string;
  author: string;
  isUpvoted: boolean;
  isUsers?: boolean;
  upvotes: number;
}

export function PlaylistCard({
  id,
  url,
  title,
  author,
  isUpvoted,
  isUsers,
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
      alert("로그인 해주세요.");
      navigate("/auth/login");
      return;
    }

    fetcher.submit(null, {
      method: "POST",
      action: `/playlists/${id}/upvote`,
    });
  };
  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const formData = new FormData();
    formData.append("playlistId", id.toString());

    fetcher.submit(formData, {
      method: "POST",
      action: `/playlists`,
    });
  };

  return (
    <Card>
      <CardContent className="relative px-8">
        {isUsers ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon2"}
                className="border-none text-textSubtitle absolute bottom-3 right-0"
              >
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild className="cursor-pointer">
                <button type="button" onClick={remove}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  삭제
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}

        <div className="w-full relative pb-[56.25%]">
          <iframe
            src={url}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
        <div className="pt-5 flex flex-row justify-between">
          <div>
            <Title1>{title}</Title1>
            <Caption>{author}</Caption>
          </div>
          <Button
            onClick={absorbClick}
            variant="outline"
            className={cn(
              "flex flex-col h-14",
              optimisitcIsUpvoted ? "border-primary text-primary" : ""
            )}
          >
            <ChevronUpIcon className="size-4 shrink-0" />
            <span>{optimisitcupvotes}</span>
            <span>{optimisitcIsUpvoted}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
