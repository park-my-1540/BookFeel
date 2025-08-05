import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { BookCard } from "~/features/books/components/BestPreviewCard/BookCard";
import type { BookCardItem } from "~/features/books/type";
export default function RecommenDationSection({
  books,
}: {
  books: BookCardItem[];
}) {
  return (
    <div className='flex flex-col items-center justify-center h-[65vh]'>
      <h1 className='text-4xl font-bold font-winky text-center block w-full'>
        Our RecommenDations
      </h1>
      <Carousel className='overflow-x-auto px-20'>
        <CarouselContent className='flex px-10 gap-8'>
          {books.map((book) => (
            <CarouselItem key={book.itemId} className='basis-[14%]'>
              <BookCard
                itemId={book.itemId}
                cover={book.cover}
                author={book.author}
                link={book.link}
                title={book.title}
                bestRank={book.bestRank}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute left-5 top-1/2 -translate-y-1/2 size-11 bg-dark text-primary-foreground' />
        <CarouselNext className='absolute right-5 top-1/2 -translate-y-1/2 size-11 bg-dark text-primary-foreground' />
      </Carousel>
    </div>
  );
}
