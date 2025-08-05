import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselDots,
  CarouselPrevious,
} from "~/components/ui/carousel";
import type { Route } from "./+types/home-page";
import {
  Form,
  Link,
  redirect,
  useNavigation,
  useSearchParams,
} from "react-router";
import { Card, CardContent } from "~/components/ui/card";
import {
  choicesBooks,
  rankedBooks,
} from "~/features/books/services/fetchBooks";
import { Caption, Title1 } from "~/components/ui/Typography";
import { BookCard } from "~/features/books/components/BestPreviewCard/BookCard";
import { makeSSRClient } from "~/supa-client";
import { getPlaylists } from "~/features/playlists/queries";
import { PlaylistCard } from "~/features/playlists/components/PlaylistCard";
import { Button } from "~/components/ui/button";
import z from "zod";
import { cn } from "~/lib/utils";
import { useState } from "react";
import { getCategories, getGeminiBooks } from "~/features/ideas/queries";
import { generateBooksByGemini } from "./generateBooksByGemeni";
import { Loader2 } from "lucide-react";

export function meta() {
  return [
    { title: "Home | Bookfeel" },
    { name: "description", content: "Welcome to Bookfeel" },
  ];
}

export const keywordSchema = z
  .string()
  .min(1, "1자 이상 입력해주세요.")
  .max(5, "5자 이내로 입력해주세요.")
  .regex(/^\S+$/, "띄어쓰기 없이 한 단어로 입력해주세요.");

const searchParamsSchema = z.object({
  keyword: z.string().optional().default("장마"),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const search = formData.get("search");
  const target = formData.get("options") ?? "title";
  const keyword = formData.get("keyword");
  if (keyword) {
    await generateBooksByGemini(keyword as string);
    return redirect(`/?keyword=userCustom`);
  }

  if (search) {
    return redirect(
      `/books?q=${encodeURIComponent(search as string)}&target=${encodeURIComponent(target as string)}`
    );
  }
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  try {
    const [books, choices, geminiBooks, search_keyword, playlists] =
      await Promise.all([
        rankedBooks(),
        choicesBooks(),
        getGeminiBooks(client, parsedData?.keyword ?? ""),
        getCategories(client),
        getPlaylists(client),
      ]);
    return {
      books,
      choices,
      search_keyword,
      geminiBooks,
      playlists,
    };
  } catch (e) {
    console.error("서버에서 책 가져오기 실패", e);
    return { books: [] };
  }
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const SEARCH_KEYWORD = loaderData.search_keyword;
  const [searchParams, setSearchParams] = useSearchParams(); // 쿼리 파라미터를 관리하는 훅
  const [toggle, setToggle] = useState(
    searchParams.get("keyword") === "userCustom"
  );

  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className='h-full'>
      <div className='bg-dark h-[45vh]'>
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
      <div className='flex flex-col items-center justify-center h-[65vh]'>
        <h1 className='text-4xl font-bold font-winky text-center block w-full'>
          Our Recomandations
        </h1>
        <Carousel className='overflow-x-auto px-20'>
          <CarouselContent className='flex px-10 gap-8'>
            {loaderData.choices.map((book) => (
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
      <div className='bg-dark h-[65vh]'>
        <div className='flex flex-col items-start justify-center px-10 h-full space-y-10'>
          <h1 className='text-4xl font-bold text-primary-foreground font-winky'>
            Curated Vibes
          </h1>
          <div className='gap-4 w-full'>
            <Carousel className='pb-10'>
              <CarouselContent>
                {loaderData.playlists.map((playlist) => (
                  <CarouselItem className='basis-1/3'>
                    <PlaylistCard
                      key={playlist.playlist_id}
                      id={playlist.playlist_id}
                      url={playlist.url}
                      isUpvoted={playlist.is_upvoted}
                      upvotes={playlist.upvotes}
                      title={playlist.title}
                      author={playlist.author}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselDots />
            </Carousel>
          </div>
        </div>
      </div>
      <div className='p-14'>
        <div className='grid grid-layout gap-6'>
          <section className='a p-9 pb-0 bg-white'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-bold'>
                Gemeni가 추천해주는 감성 키워드 도서
              </h2>
            </div>
            <div className='flex gap-3'>
              {SEARCH_KEYWORD?.map(({ keyword, category_id }) => (
                <Button
                  key={category_id}
                  variant={"outline"}
                  className={cn(
                    searchParams.get("keyword") === keyword && "bg-accent"
                  )}
                >
                  <Link
                    to={`?keyword=${keyword}`}
                    preventScrollReset
                    onClick={() => setToggle(false)}
                  >
                    # {keyword}
                  </Link>
                </Button>
              ))}
              <Button
                variant={"outline"}
                className={cn(toggle && "bg-accent")}
                onClick={() => {
                  setSearchParams(
                    { keyword: "userCustom" },
                    { preventScrollReset: true }
                  );
                  setToggle(true);
                }}
              >
                # 직접 입력하기
              </Button>
            </div>
            {toggle ? (
              <Form method='post' action='/'>
                <div className='flex w-[350px] items-center pt-2 gap-2'>
                  <input
                    type='text'
                    name='keyword'
                    pattern='^\S{1,10}$'
                    className='w-full p-3'
                    placeholder='키워드를 5자 이내 한 단어로 입력해주세요.'
                    maxLength={5}
                  />
                  <Button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className='flex items-center gap-2'>
                        <Loader2 className='w-4 h-4 animate-spin' />
                        <span>로딩 중...</span>
                      </div>
                    ) : (
                      "검색"
                    )}
                  </Button>
                </div>
              </Form>
            ) : null}
            <div className='min-h-[400px]'>
              {isSubmitting ? (
                <div className='flex items-center justify-center w-full min-h-[500px]'>
                  <Loader2 className='mr-2 h-10 w-10 animate-spin text-primary' />
                </div>
              ) : (
                <div className='grid grid-cols-5 gap-8 min-h-[500px]'>
                  {loaderData.geminiBooks?.map((book) => (
                    <BookCard
                      key={book.itemId}
                      itemId={book.itemId}
                      cover={book.cover_url}
                      author={book.author}
                      link={book.link}
                      title={book.title}
                      bestRank={book.bestRank}
                    />
                  ))}
                </div>
              )}
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
              {loaderData.books
                ?.slice(0, 5)
                .map((book) => (
                  <BookCard
                    direction='row'
                    key={book.itemId}
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
