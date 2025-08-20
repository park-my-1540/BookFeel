import { useFetcher, useNavigate, useOutletContext } from "react-router";
import CardInDelete from "~/components/common/CardInDelete";
import UpvoteButton from "~/components/common/UpvoteButton";
import { Caption, Title1 } from "~/components/ui/Typography";

export interface PlaylistCardProps {
  id: number;
  url: string;
  title: string;
  author: string;
  isUpvoted: boolean;
  isUsers: boolean;
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
    <div className="overflow-hidden bg-card text-card-foreground flex flex-col border shadow-sm pt-6">
      <div className="px-8">
        <div className="w-full relative pb-[56.25%] px-8">
          <iframe
            src={url}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>
      <div className="px-8 py-6 flex flex-row justify-between relative">
        <div>
          <Title1>{title}</Title1>
          <Caption>{author}</Caption>
        </div>
        <UpvoteButton
          absorbClick={absorbClick}
          state={fetcher.state}
          votesCount={upvotes}
          isUpvoted={isUpvoted}
        />
        <CardInDelete isUsers={isUsers} remove={remove} />
      </div>
    </div>
  );
}
