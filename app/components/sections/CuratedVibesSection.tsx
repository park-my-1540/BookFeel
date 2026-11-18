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
    <div className="bg-dark px-lg py-sm">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center">
        <div className="flex w-full flex-wrap items-center justify-between gap-x-3">
          <Heading2 className="text-white">Curated Vibes</Heading2>
          <Button
            variant="link"
            asChild
            className="p-0 text-sm text-white underline-offset-4 sm:text-base"
          >
            <Link to={"/playlists"}>더 보러가기 &rarr;</Link>
          </Button>
        </div>
        <div className="gap-4 w-full">
          <Carousel className="pb-12">
            <CarouselContent>
              {playlists.map((playlist) => (
                <CarouselItem
                  key={playlist.playlist_id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <PlaylistCard
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
