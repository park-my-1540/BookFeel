import { ChevronUpIcon } from "lucide-react";
import type { MouseEventHandler } from "react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
interface upvoteProps {
  absorbClick: MouseEventHandler<HTMLButtonElement>;
  state: string;
  votesCount: number;
  isUpvoted: boolean;
}
export default function UpvoteButton({
  absorbClick,
  state,
  votesCount,
  isUpvoted,
}: upvoteProps) {
  const optimisitcVotesCount =
    state === "idle" ? votesCount : isUpvoted ? votesCount - 1 : votesCount + 1;

  const optimisitcIsUpvoted = state === "idle" ? isUpvoted : !isUpvoted;

  return (
    <Button
      onClick={absorbClick}
      variant="outline"
      className={cn(
        "flex flex-col h-14",
        optimisitcIsUpvoted ? "border-primary text-primary" : ""
      )}
    >
      <ChevronUpIcon className="size-4 shrink-0" />
      <span>{optimisitcVotesCount}</span>
    </Button>
  );
}
