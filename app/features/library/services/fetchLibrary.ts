/**
 * 특정 도서를 소장하고 있는 도서관 목록을 조회합니다.
 *
 * @endpoint http://data4library.kr/api/libSrchByBook
 *
 * @param authKey 인증키 (필수, string)
 * @param isbn 13자리 ISBN (필수, string | number)
 * @param region 지역 코드 (필수, number)
 * @param dtl_region 세부 지역 코드 (선택, number)
 * @param pageNo 페이지 번호 (선택, number, 기본 1)
 * @param pageSize 페이지 크기 (선택, number, 기본 10)
 * @param format 응답 유형 (선택, 'xml' | 'json', 기본 xml)
 *
 * @returns {
 *   libs: Array<{
 *     libCode: string;   // 도서관 코드
 *     libName: string;   // 도서관 이름
 *     address?: string;  // 도서관 주소 (옵션)
 *   }>
 * }
 */
export const fetchLibSrchByBook = async ({ isbn13, region, dtl_region }) => {
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

  return libs;
};

/**
 * 도서관별 도서 소장 여부 및 대출 가능 여부를 조회합니다.
 *
 * @endpoint http://data4library.kr/api/bookExist
 *
 * @param authKey 인증키 (필수, string)
 * @param libCode 도서관 코드 (필수, string)
 * @param isbn13  13자리 ISBN (필수, string | number)
 * @param format 응답 유형 (선택, 'xml' | 'json', 기본 xml)
 *
 * @returns {
 *   libCode: string;
 *   hasBook: 'Y' | 'N';
 *   loanAvailable: 'Y' | 'N';
 * }
 */
export const fetchBookExist = async ({ libs, isbn13 }) => {
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
