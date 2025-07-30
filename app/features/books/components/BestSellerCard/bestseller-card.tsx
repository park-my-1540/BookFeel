import { CarouselItem } from "~/components/ui/carousel";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Caption, Title3 } from "~/components/ui/Typography";
import type { BestSellerItem } from "../../type";

export function BestSellerCard({
  itemId,
  link,
  cover,
  title,
  bestRank,
  author,
}: BestSellerItem) {
  return (
    <CarouselItem key={itemId} className='flex-shrink-0 basis-[18%]'>
      <a href={link} target='blank' className='block'>
        <Card className='bg-transparent border-none shadow-none'>
          <CardContent>
            <div className='w-full aspect-[2/3]'>
              <img
                src={cover}
                alt={title}
                className='object-cover rounded-xl w-full h-auto'
              />
            </div>
          </CardContent>
          <CardFooter className='flex-col item-start'>
            <p>{bestRank}</p>
            <Title3>{title}</Title3>
            <Caption>{author}</Caption>
          </CardFooter>
        </Card>
      </a>
    </CarouselItem>
  );
}
