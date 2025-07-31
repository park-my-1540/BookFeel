import type { Route } from "./+types/playlist-page";
import { makeSSRClient } from "~/supa-client";
import { getPlaylists } from "../queries";
import { PlaylistCard } from "../components/PlaylistCard";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const playlists = await getPlaylists(client);
  return { playlists };
};

export default function ProductsHomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-8'>Featured Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {loaderData?.playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.playlist_id}
            url={playlist.url}
            upvotes={playlist.upvotes}
            title={playlist.title}
            author={playlist.author}
          />
        ))}
      </div>
    </div>
  );
}
