import type { Route } from "./+types/home-page";
import type { BookCardItem } from "~/features/books/type";
import { redirect, useNavigation, useSearchParams } from "react-router";
import {
  choicesBooks,
  rankedBooks,
} from "~/features/books/services/fetchBooks";
import { makeSSRClient } from "~/supa-client";
import { getPlaylists } from "~/features/playlists/queries";
import z from "zod";
import { useState } from "react";
import { getCategories, getGeminiBooks } from "~/features/ideas/queries";
import GeminiBooksSection from "~/components/sections/GeminiBooksSection";
import { generateBooksByGemini } from "../services/generateBooksByGemeni";
import BestSellerSection from "~/components/sections/BestSellerSection";
import CurrentVibesSection from "~/components/sections/CurrentVibesSection";
import MainSection from "~/components/sections/MainSection";
import RecommenDationSection from "~/components/sections/RecommenDationSection";

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

type LoaderData = {
  books: BookCardItem[];
  choices: BookCardItem[];
  geminiBooks: BookCardItem[];
  search_keyword: { keyword: string; category_id: string }[];
  playlists: unknown;
};

export const loader = async ({
  request,
}: Route.LoaderArgs): Promise<LoaderData> => {
  const { client } = makeSSRClient(request);
  const url = new URL(request.url);
  const { data: parsedData } = searchParamsSchema.safeParse(
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
    return {
      books: [] as BookCardItem[],
      choices: [],
      search_keyword: [],
      geminiBooks: [],
      playlists: [],
    };
  }
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams(); // 쿼리 파라미터를 관리하는 훅
  const [toggle, setToggle] = useState(
    searchParams.get("keyword") === "userCustom"
  );

  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className='h-full'>
      <MainSection />
      <RecommenDationSection books={loaderData.choices} />
      <CurrentVibesSection playlists={loaderData.playlists ?? []} />

      <div className='p-14'>
        <div className='grid grid-layout gap-6'>
          <GeminiBooksSection
            searchKeyword={
              loaderData.search_keyword ?? [{ keyword: "장마", category_id: 3 }]
            }
            books={loaderData.geminiBooks ?? []}
            isSubmitting={isSubmitting}
            toggle={toggle}
            setToggle={setToggle}
            searchParams={searchParams}
          />
          <BestSellerSection books={loaderData.books} />
        </div>
      </div>
    </div>
  );
}
