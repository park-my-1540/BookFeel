import type { Route } from "../../books/pages/+types/list-page";

import { makeSSRClient } from "~/supa-client";

import LoanAvailabilityMVP from "../components/Loan";
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
};

/**
 * LoanExplorerPage – 도서 대출 여부 전용 페이지 (옵션 B)
 *
 * 경로 예시: /loans?isbn=9781234567890&lat=37.4979&lng=127.0276
 *
 * 기능
 * - 상단 책 요약(간단)
 * - 반경/정렬/필터 컨트롤
 * - (좌) 지도 자리(추후 지도 라이브러리 연결), (우) 도서관 리스트
 * - 도서관별 대출 가능 여부 (data4library bookExist)
 * - usageTrend(혼잡도) 영역은 토글로 추후 확장
 *
 * NOTE
 * - 데이터포맷은 data4library XML 응답 기준. 실제 필드명은 서비스 문서에 맞춰 조정 필요
 * - 지역/좌표/라이브러리 필드가 부족하면 보조 API(libSrch 등)로 보완
 * - 빌드 타깃에 따라 VITE_ / NEXT_PUBLIC_ 등 환경변수 프리픽스를 조정하세요.
 */

export default function LoanExplorerPage() {
  return (
    <div className='space-y-4'>
      {/* ...책 정보 영역... */}
      <LoanAvailabilityMVP isbn13={9788936439743} />
    </div>
  );
}
function useLoanExplorer(isbn: string, lat: number, lng: number) {
  throw new Error("Function not implemented.");
}
