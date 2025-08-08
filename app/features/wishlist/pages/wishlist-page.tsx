import { useNavigation } from "react-router";
import type { Route } from "../../books/pages/+types/list-page";
import { Title2 } from "~/components/ui/Typography";
import BookSearch from "@search/components/SearchBarContainer";
import BookListPanel from "@book/components/BookListPanel";
import { useEffect } from "react";
import { useSearchHistory } from "~/features/search/hooks/useSearchHistory";
import { useSearchOpen } from "~/features/search/hooks/useSearchOpen";
import { makeSSRClient } from "~/supa-client";
import { getPlaylists } from "~/features/playlists/queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const playlists = await getPlaylists(client);
  return { playlists };
};

export default function ListPage({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const { setIsOpen } = useSearchOpen();
  const { addToHistory } = useSearchHistory();

  useEffect(() => {
    if (loaderData.keyword) {
      addToHistory(loaderData.keyword);
      setIsOpen(false);
    }
  }, [loaderData.keyword, addToHistory]);

  return (
    <div className='pt-10 max-w-5xl mx-auto'>
      <Title2>도서 검색</Title2>
      <BookSearch />
      <BookListPanel
        subtitle='도서 검색 결과'
        books={loaderData.books}
        isFetching={isLoading}
      />
    </div>
  );
}
