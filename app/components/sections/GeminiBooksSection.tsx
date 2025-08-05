import { Form, Link } from "react-router";
import { BookCard } from "~/features/books/components/BestPreviewCard/BookCard";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Loader2 } from "lucide-react";
import type { BookCardItem } from "~/features/books/type";
import { LoadingButton } from "../common/LoadingButton";

interface GeminiBooksSectionProps {
  searchKeyword: { keyword: string; category_id: string }[];
  books: BookCardItem[];
  isSubmitting: boolean;
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
  searchParams: URLSearchParams;
}

export default function GeminiBooksSection({
  searchKeyword,
  books,
  isSubmitting,
  toggle,
  setToggle,
  searchParams,
}: GeminiBooksSectionProps) {
  return (
    <section className='a p-9 pb-0 bg-white'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold'>
          Gemeni가 추천해주는 감성 키워드 도서
        </h2>
      </div>
      <div className='flex gap-3'>
        {searchKeyword?.map(({ keyword, category_id }) => (
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
        <LoadingButton
          variant='outline'
          className={cn(toggle && "bg-accent")}
          isLoading={isSubmitting}
          onClick={() => setToggle(true)}
        >
          <Link to='?keyword=userCustom' preventScrollReset>
            # 직접 입력하기
          </Link>
        </LoadingButton>
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
            {books?.map((book) => (
              <BookCard
                key={book.itemId}
                itemId={book.itemId}
                cover={book.cover}
                author={book.author}
                link={book.link}
                title={book.title}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
