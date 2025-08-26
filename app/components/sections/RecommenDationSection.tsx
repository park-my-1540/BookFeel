import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { BookCard } from "~/features/books/components/BestPreviewCard/BookCard";
import type { BookCardItem } from "~/features/books/type";
import { Heading2 } from "../ui/Typography";
export default function RecommenDationSection({
  books,
}: {
  books: BookCardItem[];
}) {
  return (
    <div className="flex flex-col items-center justify-center pb-md">
      <Heading2>Our recommendations</Heading2>
      <div className="w-full">
        <Carousel className="overflow-x-auto px-20">
          <CarouselContent className="flex px-10 gap-8">
            {books.map((book) => (
              <CarouselItem
                key={book.itemId}
                className="basis-[25%] lg:basis-[14%]"
              >
                <BookCard
                  itemId={book.itemId}
                  cover={book.cover}
                  author={book.author}
                  title={book.title}
                  bestRank={book.bestRank}
                  priceSales={book.priceSales}
                  priceStandard={book.priceStandard}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-5 top-1/2 -translate-y-1/2 size-11 bg-dark text-primary-foreground" />
          <CarouselNext className="absolute right-5 top-1/2 -translate-y-1/2 size-11 bg-dark text-primary-foreground" />
        </Carousel>
      </div>
    </div>
  );
}
