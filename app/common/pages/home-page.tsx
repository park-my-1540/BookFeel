import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import type { Route } from "./+types/home-page";
import { redirect } from "react-router";
import { Card, CardContent } from "~/components/ui/card";
import { rankedBooks } from "~/features/books/services/fetchBooks";
import { Caption, Title1 } from "~/components/ui/Typography";
import { BookCard } from "~/features/books/components/BestPreviewCard/BookCard";

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
    <div className='h-full'>
      <div className='bg-dark h-[50%]'>
        <div className='flex flex-col items-start justify-center px-10 h-full space-y-10'>
          <div className='grid grid-cols-3 gap-4 w-full'>
            <Card>
              <CardContent>
                <div className='flex flex-row'>
                  <div className='w-full relative pb-[56.25%]'>
                    <iframe
                      src='https://www.youtube.com/embed/TSGkOliZNQ8?si=s2vf7a3RshEu-4R0'
                      title='YouTube video player'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      referrerPolicy='strict-origin-when-cross-origin'
                      allowFullScreen
                      className='absolute top-0 left-0 w-full h-full'
                    ></iframe>
                  </div>
                </div>
                <div className='pt-5'>
                  <Title1>혼모노</Title1>
                  <Caption>성해은</Caption>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className='flex flex-row'>
                  <div className='w-full relative pb-[56.25%]'>
                    <iframe
                      src='https://www.youtube.com/embed/TSGkOliZNQ8?si=s2vf7a3RshEu-4R0'
                      title='YouTube video player'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      referrerPolicy='strict-origin-when-cross-origin'
                      allowFullScreen
                      className='absolute top-0 left-0 w-full h-full'
                    ></iframe>
                  </div>
                </div>
                <div className='pt-5'>
                  <Title1>혼모노</Title1>
                  <Caption>성해은</Caption>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className='flex flex-row'>
                  <div className='w-full relative pb-[56.25%]'>
                    <iframe
                      src='https://www.youtube.com/embed/TSGkOliZNQ8?si=s2vf7a3RshEu-4R0'
                      title='YouTube video player'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      referrerPolicy='strict-origin-when-cross-origin'
                      allowFullScreen
                      className='absolute top-0 left-0 w-full h-full'
                    ></iframe>
                  </div>
                </div>
                <div className='pt-5'>
                  <Title1>혼모노</Title1>
                  <Caption>성해은</Caption>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center h-[85%]'>
        <div className='flex flex-col items-start justify-center h-full space-y-10'>
          <h1 className='text-4xl font-bold text-center block w-full'>
            Our Recomandations
          </h1>
          <Carousel className='overflow-x-auto'>
            <CarouselContent className='flex px-10'>
              {loaderData.books.map((book) => (
                <CarouselItem
                  key={book.itemId}
                  className='flex-shrink-0 basis-[18%]'
                >
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
            <CarouselPrevious className='absolute left-5 top-1/2 -translate-y-1/2 size-11 bg-primary text-primary-foreground' />
            <CarouselNext className='absolute right-5 top-1/2 -translate-y-1/2 size-11 bg-primary text-primary-foreground' />
          </Carousel>
        </div>
      </div>
      <div className='bg-dark h-[70%]'>
        <div className='flex flex-col items-start justify-center px-10 h-full space-y-10'>
          <h1 className='text-4xl font-bold text-primary-foreground'>
            유저들이 고른 플레이리스트
          </h1>
          <div className='grid grid-cols-3 gap-4 w-full'>
            <Card>
              <CardContent>
                <div className='flex flex-row'>
                  <div className='w-full relative pb-[56.25%]'>
                    <iframe
                      src='https://www.youtube.com/embed/TSGkOliZNQ8?si=s2vf7a3RshEu-4R0'
                      title='YouTube video player'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      referrerPolicy='strict-origin-when-cross-origin'
                      allowFullScreen
                      className='absolute top-0 left-0 w-full h-full'
                    ></iframe>
                  </div>
                </div>
                <div className='pt-5'>
                  <Title1>혼모노</Title1>
                  <Caption>성해은</Caption>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className='flex flex-row'>
                  <div className='w-full relative pb-[56.25%]'>
                    <iframe
                      src='https://www.youtube.com/embed/TSGkOliZNQ8?si=s2vf7a3RshEu-4R0'
                      title='YouTube video player'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      referrerPolicy='strict-origin-when-cross-origin'
                      allowFullScreen
                      className='absolute top-0 left-0 w-full h-full'
                    ></iframe>
                  </div>
                </div>
                <div className='pt-5'>
                  <Title1>혼모노</Title1>
                  <Caption>성해은</Caption>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className='flex flex-row'>
                  <div className='w-full relative pb-[56.25%]'>
                    <iframe
                      src='https://www.youtube.com/embed/TSGkOliZNQ8?si=s2vf7a3RshEu-4R0'
                      title='YouTube video player'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      referrerPolicy='strict-origin-when-cross-origin'
                      allowFullScreen
                      className='absolute top-0 left-0 w-full h-full'
                    ></iframe>
                  </div>
                </div>
                <div className='pt-5'>
                  <Title1>혼모노</Title1>
                  <Caption>성해은</Caption>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className='p-14'>
        <div className='grid grid-layout gap-6'>
          <section className='a p-9 pb-0 bg-white'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-bold'>
                Gemeni가 추천해주는 장마 키워드 도서
              </h2>
            </div>
            <div className='grid grid-cols-5 gap-8'>
              {loaderData.books.slice(0, 5).map((book) => (
                <BookCard
                  itemId={book.itemId}
                  cover={book.cover}
                  author={book.author}
                  link={book.link}
                  title={book.title}
                  bestRank={book.bestRank}
                />
              ))}
            </div>
          </section>

          <section className='b p-9 pb-0 bg-white'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-bold'>
                Gemeni가 추천해주는 무더위 키워드 도서
              </h2>
            </div>
            <div className='grid grid-cols-5 gap-8'>
              {loaderData.books.slice(0, 5).map((book) => (
                <BookCard
                  itemId={book.itemId}
                  cover={book.cover}
                  author={book.author}
                  link={book.link}
                  title={book.title}
                  bestRank={book.bestRank}
                />
              ))}
            </div>
          </section>

          {/* 오른쪽: Bestseller 리스트 */}
          <div className='c p-9 bg-white'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-bold'>Bestsellers</h2>
              <button className='text-sm text-gray-500 hover:underline'>
                View more
              </button>
            </div>
            <ol className='w-full'>
              {loaderData.books.slice(0, 5).map((book) => (
                <BookCard
                  direction='row'
                  itemId={book.itemId}
                  cover={book.cover}
                  author={book.author}
                  link={book.link}
                  title={book.title}
                  bestRank={book.bestRank}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
