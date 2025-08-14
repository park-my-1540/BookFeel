import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "~/components/ui/carousel";
import { Card, CardContent } from "~/components/ui/card";
import { Caption } from "~/components/ui/Typography";
import { Button } from "../ui/button";

export default function MainSection() {
  return (
    <div className='bg-dark p-lg'>
      <Carousel className='pb-10'>
        <CarouselContent className='flex w-full'>
          <CarouselItem className='basis-[100%] lg:basis-1/3'>
            <Card className='h-full'>
              <div className='flex h-full items-center justify-between px-md'>
                <div className='w-[calc(100% - 500px)]'>
                  <p className='text-4xl font-MontBold leading-snug'>STONER</p>
                  <p className='my-5 text-textSubtitle text-lg'>
                    John Williams
                  </p>
                  <Button
                    className='border-main border text-main rounded-none'
                    variant={"outline"}
                    size={"lg"}
                  >
                    Detail More
                  </Button>
                </div>
                <div className='w-[200px] shadow border'>
                  <img
                    src='https://image.aladin.co.kr/product/36582/41/cover500/8925573555_2.jpg'
                    alt='스토너'
                    className='w-full'
                  />
                </div>
              </div>
            </Card>
          </CarouselItem>
          <CarouselItem className='basis-[100%] lg:basis-1/3'>
            <Card className='h-full'>
              <div className='flex h-full items-center justify-between px-md'>
                <div className='w-[calc(100% - 500px)]'>
                  <p className='text-4xl font-MontBold leading-snug'>1984</p>
                  <p className='my-5 text-textSubtitle text-lg'>
                    George Orwell
                  </p>
                  <Button
                    className='border-main border text-main rounded-none'
                    variant={"outline"}
                    size={"lg"}
                  >
                    Detail More
                  </Button>
                </div>
                <div className='w-[200px] shadow border'>
                  <img
                    src='https://image.aladin.co.kr/product/47/23/cover500/04515249ff_1.jpg'
                    alt='George Orwell'
                    className='w-full'
                  />
                </div>
              </div>
            </Card>
          </CarouselItem>
          <CarouselItem className='basis-[100%] lg:basis-1/3'>
            <Card className='h-full'>
              <CardContent>
                <div className='flex flex-row'>
                  <div className='w-full relative pb-[56.25%]'>
                    <iframe
                      src='https://www.youtube.com/embed/IPQ6nAefyMM?si=8qV2hJqgqj4hetTt'
                      title='YouTube video player'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      referrerPolicy='strict-origin-when-cross-origin'
                      allowFullScreen
                      className='absolute top-0 left-0 w-full h-full'
                    ></iframe>
                  </div>
                </div>
                <div className='pt-5'>
                  <p className='text-4xl font-MontBold leading-snug'>
                    Project Hail Mary
                  </p>
                  <Caption>Andy Weir</Caption>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    </div>
  );
}
