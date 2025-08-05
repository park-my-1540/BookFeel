import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "~/components/ui/carousel";
import { PlaylistCard } from "~/features/playlists/components/PlaylistCard";
import type { Database } from "database.types";
export default function CurrentVibesSection({
  playlists,
}: {
  playlists: Database["public"]["Views"]["playlist_list_view"]["Row"][];
}) {
  return (
    <div className='bg-dark h-[65vh]'>
      <div className='flex flex-col items-start justify-center px-10 h-full space-y-10'>
        <h1 className='text-4xl font-bold text-primary-foreground font-winky'>
          Curated Vibes
        </h1>
        <div className='gap-4 w-full'>
          <Carousel className='pb-10'>
            <CarouselContent>
              {playlists.map((playlist) => (
                <CarouselItem className='basis-1/3'>
                  <PlaylistCard
                    key={playlist.playlist_id}
                    id={playlist.playlist_id ?? 0}
                    url={playlist.url ?? ""}
                    isUpvoted={playlist.is_upvoted ?? false}
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
