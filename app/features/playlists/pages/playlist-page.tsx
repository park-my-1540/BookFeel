import type { Route } from "./+types/playlist-page";
import { makeSSRClient } from "~/supa-client";
import { getPlaylists } from "../queries";
import { PlaylistCard } from "../components/PlaylistCard";
import { Button } from "~/components/ui/button";
import { Link, useSearchParams } from "react-router";
import { Heading2 } from "~/components/ui/Typography";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

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

const SORT_OPTIONS_MAP = new Map([
  ["newest", "최신순"],
  ["popular", "인기순"],
]);

export default function ProductsHomePage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  return (
    <div className='container mx-auto py-lg'>
      <Heading2>Curated Vibes</Heading2>
      <div className='flex justify-between items-center mb-14'>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center gap-2'>
            <span className='text-md capitalize'>
              {SORT_OPTIONS_MAP.get(sorting)}
            </span>
            <ChevronDownIcon className='w-4 h-4' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[...SORT_OPTIONS_MAP.entries()].map(([key, value]) => (
              <DropdownMenuCheckboxItem
                className='capitalize cursor-pointer'
                onCheckedChange={(checked: boolean) => {
                  if (checked) {
                    searchParams.set("sorting", key);
                    setSearchParams(searchParams);
                  }
                }}
                key={key}
              >
                {value}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
