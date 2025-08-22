import { Link } from "react-router";
import SortingDropMenu from "~/components/common/SortingMenu";
import { Heading2 } from "~/components/ui/Typography";
import { Button } from "~/components/ui/button";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { PlaylistCard } from "../components/PlaylistCard";
import { deletePlaylist, getPlaylists } from "../queries";
import type { Route } from "./+types/playlist-page";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const url = new URL(request.url);
  const sorting =
    url.searchParams.get("sorting") === "popular" ? "popular" : "newest";
  const playlists = await getPlaylists(client, {
    sorting,
  });
  return { playlists };
};
export const action = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);

  const formData = await request.formData();
  const playlistId = formData.get("playlistId");

  if (typeof playlistId !== "string") {
    throw new Error("Invalid playlistId");
  }
  await deletePlaylist(client, {
    profile_id: userId,
    playlist_id: playlistId,
  });
};
export default function PlaylistPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full px-lg pb-md">
      <Heading2>Curated Vibes</Heading2>
      <div className="flex justify-between items-center mb-14">
        <SortingDropMenu />
        <Button asChild>
          <Link to="/playlists/submit">플레이리스트 생성하기</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loaderData?.playlists.map((playlist) => (
          <PlaylistCard
            id={playlist.playlist_id}
            key={playlist.playlist_id}
            url={playlist.url}
            isUpvoted={playlist.is_upvoted}
            upvotes={playlist.upvotes}
            title={playlist.title}
            author={playlist.author}
            isUsers={playlist.is_users}
          />
        ))}
      </div>
    </div>
  );
}
