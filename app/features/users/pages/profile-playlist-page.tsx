import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/profile-playlist-page";
import { getUserPlaylists } from "~/features/playlists/queries";
import { PlaylistCard } from "~/features/playlists/components/PlaylistCard";
import { getUserId } from "../queries";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Posts - ${params.username}` },
];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getUserId(client);
  if (!userId) return { playlists: [] };

  const playlists = await getUserPlaylists(client, {
    profile_id: userId,
  });
  return { playlists };
};
export default function ProfilePlaylistPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {loaderData?.playlists.map((playlist) => (
        <PlaylistCard
          id={playlist.playlist_id}
          key={playlist.playlist_id}
          url={playlist.url}
          isUpvoted={playlist.is_upvoted}
          upvotes={playlist.upvotes}
          title={playlist.title}
          author={playlist.author}
        />
      ))}
    </div>
  );
}
