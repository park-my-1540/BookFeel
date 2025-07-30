import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import type { Route } from "./+types/home-page";
import { redirect } from "react-router";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import BookSearch from "@/features/search/components/SearchBarContainer";
import { rankedBooks } from "~/features/books/services/fetchBooks";
import { BestSellerCard } from "~/features/books/components/BestSellerCard/bestseller-card";

export function meta() {
  return [
    { title: "Home | Bookfeel" },
    { name: "description", content: "Welcome to Bookfeel" },
  ];
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const keyword = formData.get("search");
  const target = formData.get("options") ?? "title";

  if (keyword) {
    return redirect(
      `/books?q=${encodeURIComponent(keyword as string)}&target=${encodeURIComponent(target as string)}`
    );
  }
};

export const loader = async () => {
  /**
   * 가장 인기있는 책 알라딘 Open API
   */
  try {
    const res = await rankedBooks();
    return { books: Array.isArray(res.item) ? res.item : [] };
  } catch (e) {
    console.error("서버에서 책 가져오기 실패", e);
    return { books: [] };
  }
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='h-full mt-10'>
      <div className='flex flex-col items-center  justify-between border'>
        <div className='px-16 h-full space-y-10'>
          <h1 className='text-7xl font-bold text-primary-foreground text-right'>
            Match Your <br />
            Mood to a Book
          </h1>
          <div className='w-full h-3/4 relative'>
            <BookSearch />
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
        <div className='flex flex-col items-start justify-center h-full space-y-10'>
          <h1 className='text-4xl font-bold'>
            <span className='text-primary'>지금 인기 있는 책</span>
          </h1>
          <Carousel className='overflow-x-auto'>
            <CarouselContent className='flex px-16'>
              {loaderData.books.map((book) => (
                <BestSellerCard
                  itemId={book.itemId}
                  cover={book.cover}
                  author={book.author}
                  link={book.link}
                  title={book.title}
                  bestRank={book.bestRank}
                />
              ))}
            </CarouselContent>
            <CarouselPrevious className='absolute left-5 top-1/2 -translate-y-1/2 size-11 bg-primary text-primary-foreground' />
            <CarouselNext className='absolute right-5 top-1/2 -translate-y-1/2 size-11 bg-primary text-primary-foreground' />
          </Carousel>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center border-2 h-[50%]'>
        <div>이미지</div>
        <h1 className='text-4xl font-bold'>
          <span className='text-primary'>GPT 감정 기반 추천</span>
          <span className='text-primary'>[😊 장마] [😞 오싹] [😤 화나요]</span>
        </h1>
      </div>
    </div>
  );
}
