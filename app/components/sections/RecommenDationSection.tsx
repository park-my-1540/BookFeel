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
  if (books.length === 0) return null;

  return (
    <div className="mx-auto max-w-screen-2xl px-lg pb-sm">
      <Heading2>Our recommendations</Heading2>
      <div className="w-full">
        <Carousel className="px-1 sm:px-12">
          <CarouselContent>
            {books.map((book) => (
              <CarouselItem
                key={book.itemId}
                className="basis-1/2 sm:basis-1/3 lg:basis-1/5 xl:basis-1/6"
              >
                <BookCard
                  itemId={book.itemId}
                  cover={book.cover}
                  author={book.author}
                  title={book.title}
                  priceSales={book.priceSales}
                  priceStandard={book.priceStandard}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 size-11 bg-dark text-primary-foreground" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 size-11 bg-dark text-primary-foreground" />
        </Carousel>
      </div>
    </div>
  );
}
