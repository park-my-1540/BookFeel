import type { Database } from "database.types";
import { Link } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "~/components/ui/carousel";
import { PlaylistCard } from "~/features/playlists/components/PlaylistCard";
import { Button } from "../ui/button";
import { Heading2 } from "../ui/Typography";
export type PlaylistsProps =
  Database["public"]["Views"]["playlist_list_view"]["Row"][];
export default function CuratedVibesSection({
  playlists,
}: {
  playlists: PlaylistsProps;
}) {
  return (
    <div className="bg-dark px-lg p-sm pb-md">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex justify-between items-center w-full">
          <Heading2 className="text-white">Curated Vibes</Heading2>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to={"/playlists"}>더 보러가기 &rarr;</Link>
          </Button>
        </div>
        <div className="gap-4 w-full">
          <Carousel className="pb-12">
            <CarouselContent>
              {playlists.map((playlist) => (
                <CarouselItem className="basis-[100%] lg:basis-1/3">
                  <PlaylistCard
                    key={playlist.playlist_id}
                    id={playlist.playlist_id ?? 0}
                    url={playlist.url ?? ""}
                    isUpvoted={playlist.is_upvoted ?? false}
                    isUsers={playlist.is_users ?? false}
                    upvotes={playlist.upvotes ?? 0}
                    title={playlist.title ?? ""}
                    author={playlist.author ?? ""}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
