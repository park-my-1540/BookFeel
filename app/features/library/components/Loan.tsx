// components/LoanAvailabilityMVP.tsx
import React, { useMemo, useState } from "react";

type Lib = {
  libCode: string;
  libName: string;
  address: string;
  latitude: number;
  longitude: number;
  distanceKm?: number;
};
type Loan = { libCode: string; loanAvailable: boolean; returnDate?: string };

function qs(p: Record<string, string | number | undefined>) {
  return Object.entries(p)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
    )
    .join("&");
}
const KEY = "293f332879b7b18d01da31d31c726e5f0dac36685b6607a94d5e3a249094ddcf";
async function fetchXML(path: string, params: Record<string, any>) {
  const BASE = "https://data4library.kr/api";
  const url = `${BASE}/${path}?${qs({ ...params, authKey: KEY })}`;
  const res = await fetch(url);
  const text = await res.text();
  const doc = new DOMParser().parseFromString(text, "text/xml");
  const err = doc.querySelector("parsererror");
  if (err) throw new Error("XML parse error");
  return doc;
}
const x = (el: Element | null, sel: string) =>
  el?.querySelector(sel)?.textContent?.trim() ?? "";

function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const A =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));
}

type Props = { isbn13: string; limit?: number };

export default function LoanAvailabilityMVP({ isbn13, limit = 10 }: Props) {
  const [loading, setLoading] = useState(false);
  const [libs, setLibs] = useState<Lib[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const merged = useMemo(() => {
    const map = new Map(loans.map((l) => [l.libCode, l]));
    return libs.map((lib) => {
      const s = map.get(lib.libCode);
      const state = s?.loanAvailable
        ? "AVAILABLE"
        : s?.returnDate
          ? "DUE"
          : "UNAVAILABLE";
      return { ...lib, state, returnDate: s?.returnDate };
    });
  }, [libs, loans]);

  async function run() {
    if (!isbn13) return;
    setLoading(true);
    setError(null);
    try {
      // 1) 위치
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 8000,
        })
      );
      const me = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setUserLoc(me);

      // 2) 소장 도서관 목록
      const doc = await fetchXML("libSrchByBook", {
        isbn13,
        pageNo: 1,
        pageSize: 200,
      });
      console.log(doc);
      const list = [...doc.querySelectorAll("libs > lib")].map((el) => {
        const latitude = parseFloat(x(el, "latitude"));
        const longitude = parseFloat(x(el, "longitude"));
        return {
          libCode: x(el, "libCode"),
          libName: x(el, "libName"),
          address: x(el, "address"),
          latitude,
          longitude,
          distanceKm:
            Math.round(distanceKm(me, { lat: latitude, lng: longitude }) * 10) /
            10,
        } as Lib;
      });

      // 3) 근처 N개만
      const near = list
        .filter(
          (l) => Number.isFinite(l.latitude) && Number.isFinite(l.longitude)
        )
        .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
        .slice(0, limit);
      setLibs(near);

      // 4) 대출 여부 병렬
      const loanDocs = await Promise.all(
        near.map((lib) =>
          fetchXML("bookExist", { libCode: lib.libCode, isbn13 })
        )
      );
      const loanResults: Loan[] = loanDocs.map((d) => {
        const r = d.querySelector("result");
        const code = x(r, "libCode");
        const avail = x(r, "loanAvailable") === "Y";
        const due = x(r, "returnDate") || undefined;
        return { libCode: code, loanAvailable: avail, returnDate: due };
      });
      setLoans(loanResults);
    } catch (e: any) {
      setError(e?.message ?? "조회 중 오류가 발생했어요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='border rounded-xl p-3'>
      <div className='flex items-center gap-2'>
        <div className='font-medium'>내 주변 도서관 대출 여부</div>
        <button
          className='ml-auto px-3 py-1.5 border rounded-md text-sm'
          onClick={run}
          disabled={loading}
        >
          {loading ? "조회 중…" : "조회하기"}
        </button>
      </div>
      <p className='mt-1 text-xs text-neutral-500'>
        ※ 대출 상태는 전일 기준일 수 있어요.
      </p>
      {error && <div className='mt-2 text-sm text-red-600'>{error}</div>}

      {userLoc && (
        <div className='mt-2 text-xs text-neutral-600'>
          기준 위치: {userLoc.lat.toFixed(4)}, {userLoc.lng.toFixed(4)}
        </div>
      )}

      <ul className='mt-3 space-y-2'>
        {merged.map((lib) => (
          <li
            key={lib.libCode}
            className='flex items-center justify-between border rounded-lg px-3 py-2'
          >
            <div className='min-w-0'>
              <div className='font-medium truncate'>{lib.libName}</div>
              <div className='text-xs text-neutral-500 truncate'>
                {lib.distanceKm}km • {lib.address}
              </div>
            </div>
            <div className='text-sm'>
              {lib.state === "AVAILABLE" && (
                <span className='text-green-600 font-semibold'>
                  ✅ 대출 가능
                </span>
              )}
              {lib.state === "DUE" && (
                <span className='text-amber-600 font-semibold'>
                  ⏳ 반납 예정: {lib.returnDate}
                </span>
              )}
              {lib.state === "UNAVAILABLE" && (
                <span className='text-neutral-500'>❌ 대출 불가</span>
              )}
            </div>
          </li>
        ))}
        {!loading && merged.length === 0 && (
          <li className='text-sm text-neutral-500'>
            아직 조회 전이거나 주변 소장 도서관이 없어요.
          </li>
        )}
      </ul>
    </div>
  );
}
