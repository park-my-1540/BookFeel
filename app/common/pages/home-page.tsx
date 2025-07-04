import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import type { Route } from "./+types/home-page";
import { Card, CardContent, CardFooter } from "~/components/ui/card";

export function meta() {
  return [
    { title: "Home | Bookfeel" },
    { name: "description", content: "Welcome to Bookfeel" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  return null;
};

export default function HomePage() {
  return (
    <div className='h-full'>
      <div className='flex flex-col items-center h-[calc(100%-40px)] justify-between bg-blue-500'>
        <div className='px-16 h-full space-y-10'>
          <h1 className='text-7xl font-bold text-primary-foreground text-right'>
            Match Your <br />
            Mood to a Book
          </h1>
          <div className='w-full h-3/4 relative'>
            <Carousel className='h-full'>
              <CarouselContent className='h-full'>
                <CarouselItem>
                  <div className='size-full'>
                    <img
                      src='https://i.pinimg.com/736x/42/fe/11/42fe1147e2f23b5c376751762663cc0c.jpg'
                      alt='book'
                      className='h-full object-contain'
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className='size-full'>
                    <img
                      src='https://i.pinimg.com/736x/42/fe/11/42fe1147e2f23b5c376751762663cc0c.jpg'
                      alt='book'
                      className='h-full object-contain'
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className='absolute left-10 top-1/2 size-15' />
              <CarouselNext className='absolute right-10 top-1/2 size-15' />
            </Carousel>
          </div>
        </div>
      </div>
      <div className='bg-accent-foreground h-[70%]'>
        <div className='flex flex-col items-start justify-center px-16 h-full space-y-10'>
          <h1 className=' text-4xl font-bold text-primary-foreground'>
            유저들이 고른 플레이리스트
          </h1>
          <div className='grid grid-cols-4 gap-4'>
            <Card>
              <CardContent>
                <div className='flex flex-row'>
                  <div className='w-35 h-full'>
                    <img
                      src='https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936439743.jpg'
                      alt='book'
                    />
                  </div>
                  <div>
                    <iframe
                      width='100%'
                      height='100%'
                      src='https://www.youtube.com/embed/videoseries?list=PL1234567890ABCDEFG'
                      title='YouTube video player'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    ></iframe>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p>
                  혼모노 : 성해은 <span>#호러</span>
                </p>
              </CardFooter>
            </Card>
            <Card>
              <CardContent>
                <div className='flex flex-row'>
                  <div className='w-35 h-full'>
                    <img
                      src='https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936439743.jpg'
                      alt='book'
                    />
                  </div>
                  <div>
                    <iframe
                      width='100%'
                      height='100%'
                      src='https://www.youtube.com/embed/videoseries?list=PL1234567890ABCDEFG'
                      title='YouTube video player'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    ></iframe>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p>
                  혼모노 : 성해은 <span>#호러</span>
                </p>
              </CardFooter>
            </Card>
            <Card>
              <CardContent>
                <div className='flex flex-row'>
                  <div className='w-35 h-full'>
                    <img
                      src='https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936439743.jpg'
                      alt='book'
                    />
                  </div>
                  <div>
                    <iframe
                      width='100%'
                      height='100%'
                      src='https://www.youtube.com/embed/videoseries?list=PL1234567890ABCDEFG'
                      title='YouTube video player'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    ></iframe>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p>
                  혼모노 : 성해은 <span>#호러</span>
                </p>
              </CardFooter>
            </Card>
            <Card>
              <CardContent>
                <div className='flex flex-row'>
                  <div className='w-35 h-full'>
                    <img
                      src='https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936439743.jpg'
                      alt='book'
                    />
                  </div>
                  <div>
                    <iframe
                      width='100%'
                      height='100%'
                      src='https://www.youtube.com/embed/videoseries?list=PL1234567890ABCDEFG'
                      title='YouTube video player'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    ></iframe>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p>
                  혼모노 : 성해은 <span>#호러</span>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center h-[85%]'>
        <div className='flex flex-col items-start justify-center px-16 h-full space-y-10'>
          <h1 className='text-4xl font-bold'>
            <span className='text-primary'>지금 인기 있는 책</span>
          </h1>
          <Carousel className='overflow-x-auto'>
            <CarouselContent className='flex gap-6 px-4'>
              {[...Array(5)].map((_, index) => (
                <CarouselItem key={index} className='flex-shrink-0 basis-[28%]'>
                  <Card className='bg-transparent border-none shadow-none'>
                    <CardContent>
                      <div className='w-full aspect-[2/3]'>
                        <img
                          src='https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936439743.jpg'
                          alt='book'
                          className='w-full h-full object-cover rounded-xl'
                        />
                      </div>
                    </CardContent>
                    <CardFooter className='text-center'>
                      <p>Card Footer</p>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='absolute left-10 top-1/2 -translate-y-1/2 size-15 bg-primary text-primary-foreground' />
            <CarouselNext className='absolute right-0 top-1/2 -translate-y-1/2 size-15 bg-primary text-primary-foreground' />
          </Carousel>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center border-2 bg-blue-500 h-[50%]'>
        <div>이미지</div>
        <h1 className='text-4xl font-bold'>
          <span className='text-primary'>GPT 감정 기반 추천</span>
          <span className='text-primary'>[😊 장마] [😞 오싹] [😤 화나요]</span>
        </h1>
      </div>
    </div>
  );
}
