/**
 * 검색어(`word`)와 저장된 검색기록(`history`)를 기반으로
 * 검색어와 일치하거나 포함하는 목록(`matchList`)를 반환하는 커스텀 훅
 * @param word 현재 입력된 검색어
 * @returns 검색 기록 전체(`history`)와 필터링된 결과 목록(`matchList`)
 */
import { useEffect, useState } from "react";
import { useSearchHistory } from "./useSearchHistory";
import { filterSearchHistory } from "~/util/filterSearchHistory";

export function useMatchHistory(word: string) {
  const { history } = useSearchHistory();
  const [matchList, setMatchList] = useState<string[]>([]);

  useEffect(() => {
    if (!word) return setMatchList([]);
    const result = filterSearchHistory(word, history);
    setMatchList(result);
  }, [word, history]);

  return {
    matchList,
  };
}
