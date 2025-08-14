import type { Route } from "./+types/playlist-page";
import { makeSSRClient } from "~/supa-client";
import { getPlaylists } from "../queries";
import { PlaylistCard } from "../components/PlaylistCard";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { Heading2 } from "~/components/ui/Typography";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const playlists = await getPlaylists(client);
  return { playlists };
};

export default function ProductsHomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='container mx-auto py-lg'>
      <div className='flex justify-between items-center mb-14'>
        <Heading2>Curated Vibes</Heading2>
        <Button asChild>
          <Link to='/playlists/submit'>플레이리스트 생성하기</Link>
        </Button>
      </div>
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
    </div>
  );
}
