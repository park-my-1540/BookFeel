import BookSearch from "@/features/search/components/SearchBarContainer";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtomValue } from "jotai";
import { Form, useNavigation } from "react-router";
import { LoadingButton } from "~/components/common/LoadingButton";
import { Body1, Heading1, Title3 } from "~/components/ui/Typography";
import { BookCard } from "~/features/books/components/BestPreviewCard/BookCard";
import bookState from "~/jotai/bookAtom";
import type { Route } from "../../books/pages/+types/list-page";
import RegionSelect from "../components/RegionSelect";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const region = url.searchParams.get("region");
  const dtl_region = url.searchParams.get("dtl_region");
  const isbn13 = url.searchParams.get("isbn");

  if (!isbn13 || !region) {
    return new Response("isbn13, region 필수", { status: 400 });
  }

  // 1) 소장 도서관 목록 (지역 필터) — libSrchByBook (파라미터명: isbn)
  const libListURL = new URL("http://data4library.kr/api/libSrchByBook");
  libListURL.searchParams.set(
    "authKey",
    "293f332879b7b18d01da31d31c726e5f0dac36685b6607a94d5e3a249094ddcf",
  );

  libListURL.searchParams.set("isbn", isbn13);
  libListURL.searchParams.set("region", region);
  if (dtl_region && dtl_region !== "전체") {
    libListURL.searchParams.set("dtl_region", dtl_region);
  }
  libListURL.searchParams.set("format", "json");

  const libsRes = await fetch(libListURL.toString());
  if (!libsRes.ok) return new Response("libSrchByBook 실패", { status: 502 });
  const libsJson = await libsRes.json();

  const rows = libsJson?.response?.libs ?? libsJson?.libs ?? [];
  const libs = rows
    .map((it: any) => {
      const lib = it.lib ?? it;
      return {
        libCode: String(lib.libCode ?? lib.lib_code ?? ""),
        libName: String(lib.libName ?? lib.lib_name ?? ""),
        address: lib.address ?? "",
      };
    })
    .filter((x: any) => x.libCode);

  // 2) 도서관별 대출 가능 여부 — bookExist (파라미터명: isbn13)
  const limit = pLimit(6);
  const items = await Promise.all(
    libs.map((lib: any) =>
      limit(async () => {
        const url = new URL("http://data4library.kr/api/bookExist");
        url.searchParams.set(
          "authKey",
          "293f332879b7b18d01da31d31c726e5f0dac36685b6607a94d5e3a249094ddcf",
        );
        url.searchParams.set("libCode", lib.libCode);
        url.searchParams.set("isbn13", isbn13); // ← 여기서는 isbn13
        url.searchParams.set("format", "json");

        const r = await fetch(url.toString());
        const txt = await r.text();
        if (txt.includes("<error>") || txt.includes('"error"')) {
          return { ...lib, hasBook: false, loanAvailable: false, _error: true };
        }
        let data: any;
        try {
          data = JSON.parse(txt);
        } catch {
          data = {};
        }
        const res = data?.response?.result ?? {};
        const hasBook = String(res.hasBook ?? "").toUpperCase() === "Y";
        const loanAvailable =
          String(res.loanAvailable ?? "").toUpperCase() === "Y";
        return { ...lib, hasBook, loanAvailable };
      }),
    ),
  );

  // 3) 정렬: 대출 가능 우선 → 소장만 → 이름순
  items.sort((a: any, b: any) => {
    const aScore = a.loanAvailable ? 0 : a.hasBook ? 1 : 2;
    const bScore = b.loanAvailable ? 0 : b.hasBook ? 1 : 2;
    if (aScore !== bScore) return aScore - bScore;
    return a.libName.localeCompare(b.libName, "ko");
  });

  return { items: items ?? [] };
};

function pLimit(max: number) {
  let active = 0;
  const q: Array<() => void> = [];
  const next = () => {
    active--;
    if (q.length) q.shift()!();
  };
  return function <T>(fn: () => Promise<T>) {
    return new Promise<T>((resolve, reject) => {
      const run = () => {
        active++;
        fn().then(
          (v) => {
            resolve(v);
            next();
          },
          (e) => {
            reject(e);
            next();
          },
        );
      };
      if (active < max) run();
      else q.push(run);
    });
  };
}

export default function LoanExplorerPage({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  const book = useAtomValue(bookState);
  return (
    <div className="container mx-auto py-lg w-2/3">
      <Form method="get">
        <Heading1 className="mb-5">바로 빌릴 수 있는 곳 찾기</Heading1>
        {!book ? (
          <BookSearch />
        ) : (
          <div className="w-1/3">
            <BookCard
              direction="row"
              key={book.itemId}
              itemId={book.itemId}
              cover={book.cover}
              title={book.title}
              author={book.author}
            />
          </div>
        )}
        <div className="space-y-5 flex gap-8 justify-start items-end">
          <RegionSelect />
          <LoadingButton isLoading={isSubmitting}>검색하기</LoadingButton>
        </div>
      </Form>

      <div className="w-full mt-8">
        {loaderData.items?.length < 0 ? (
          <p className="text-textSubtitle text-lg">
            해당 조건의 소장 도서관이 없어요.
          </p>
        ) : (
          <ul className="space-y-5">
            {loaderData?.items?.map((it) => {
              return (
                <li
                  key={it.libCode}
                  className="flex items-center justify-between border-borderGray border rounded p-4"
                >
                  <div>
                    <Title3>{it.libName}</Title3>
                    <Body1>{it.address}</Body1>
                  </div>
                  <Body1>
                    {it._error ? (
                      <span className="text-red">조회 오류</span>
                    ) : it.loanAvailable ? (
                      <span className="text-green-600">
                        대출 가능{" "}
                        <FontAwesomeIcon
                          icon={faCircleCheck as IconProp}
                          size="lg"
                        />
                      </span>
                    ) : it.hasBook ? (
                      <span className="text-amber-600">소장(대출 불가)</span>
                    ) : (
                      <span className="text-textSubtitle">미소장</span>
                    )}
                  </Body1>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
