/**
 * 입력값과 히스토리만 있으면 계산 가능한 로직이므로.
 * 별도 유틸함수로 분리.
 */
export function filterSearchHistory(word: string, history: string[]): string[] {
  const lowerWord = word.toLowerCase();

  const includesMatches = history.filter((item) =>
    item.toLowerCase().includes(lowerWord)
  );

  const startsWithMatches = includesMatches.filter((item) =>
    item.toLowerCase().startsWith(lowerWord)
  );

  const others = includesMatches.filter(
    (item) => !item.toLowerCase().startsWith(lowerWord)
  );

  return [...startsWithMatches, ...others];
}
