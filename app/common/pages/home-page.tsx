import { useState } from "react";
import { redirect, useNavigation, useSearchParams } from "react-router";
import z from "zod";
import BestSellerSection from "~/components/sections/BestSellerSection";
import CuratedVibesSection, {
  type PlaylistsProps,
} from "~/components/sections/CuratedVibesSection";
import GeminiBooksSection from "~/components/sections/GeminiBooksSection";
import MainSection from "~/components/sections/MainSection";
import RecommenDationSection from "~/components/sections/RecommenDationSection";
import {
  choicesBooks,
  rankedBooks,
} from "~/features/books/services/fetchBooks";
import type { BookCardItem } from "~/features/books/type";
import { getCategories, getGeminiBooks } from "~/features/ideas/queries";
import { getPlaylists } from "~/features/playlists/queries";
import { getLoggedInUserId, getUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { submitKeywordToGemini } from "../services/generateBooksByGemeni";
import type { Route } from "./+types/home-page";

export const meta: Route.MetaFunction = () => [
  { title: "BookFeel" },
  {
    name: "description",
    content:
      "오늘의 감정에 맞는 책을 찾고, 음악 플레이리스트와 함께 즐겨보세요. Bookfeel이 당신의 독서 경험을 더 특별하게 만듭니다",
  },
  { property: "og:title", content: "BookFeel" },
  {
    property: "og:description",
    content:
      "오늘의 감정에 맞는 책을 찾고, 음악 플레이리스트와 함께 즐겨보세요. Bookfeel이 당신의 독서 경험을 더 특별하게 만듭니다",
  },
  { property: "og:url", content: "https://book-feel.vercel.app/" },
  {
    property: "og:image",
    content: "https://book-feel.vercel.app/thumbnail.png",
  },
  { property: "og:type", content: "website" },
];

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

  const { client } = makeSSRClient(request);

  if (keyword) {
    const userId = await getLoggedInUserId(client);
    const result = await submitKeywordToGemini(
      client,
      keyword as string,
      userId
    );
    if (!result.success) {
      return {
        success: false,
        message:
          result.reason === "limit-exceeded"
            ? "오늘의 감정 책 추천 횟수를 모두 사용하셨어요. 내일 다시 시도해보세요!"
            : "추천 생성에 실패했어요. 다시 시도해주세요.",
      };
    }
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
  playlists: PlaylistsProps;
};

export const loader = async ({
  request,
}: Route.LoaderArgs): Promise<LoaderData> => {
  const { client } = makeSSRClient(request);
  const url = new URL(request.url);
  const userId = await getUserId(client);

  const { data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  try {
    const [books, choices, geminiBooks, search_keyword, playlists] =
      await Promise.all([
        rankedBooks(),
        choicesBooks(),
        getGeminiBooks(client, parsedData?.keyword ?? "장마", userId ?? ""),
        getCategories(client),
        getPlaylists(client, { sorting: "popular" }),
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

export default function HomePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [searchParams] = useSearchParams(); // 쿼리 파라미터를 관리하는 훅
  const [toggle, setToggle] = useState(
    searchParams.get("keyword") === "userCustom"
  );

  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="h-full">
      <MainSection />
      <RecommenDationSection books={loaderData.choices} />

      <div className="grid grid-layout gap-6 px-lg pb-lg">
        <GeminiBooksSection
          searchKeyword={loaderData.search_keyword}
          books={loaderData.geminiBooks ?? []}
          isSubmitting={isSubmitting}
          toggle={toggle}
          setToggle={setToggle}
          searchParams={searchParams}
          errorMessage={actionData?.message ?? null}
        />
        <BestSellerSection books={loaderData.books} />
      </div>

      <CuratedVibesSection playlists={loaderData.playlists.slice(0, 3) ?? []} />
    </div>
  );
}
