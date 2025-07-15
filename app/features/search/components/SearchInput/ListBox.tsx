import React from "react";
import { isEmpty } from "@/util/util";

import SearchHistoryList from "@/features/search/components/SearchHistoryList";
import { useSearchSubmit } from "@search/hooks/useSearchSubmit";
import { useMatchHistory } from "@search/hooks/useMatchHistory";
import { useSearchHistory } from "@search/hooks/useSearchHistory";

export default function ListBox() {
  const { word, isOpen } = useSearchSubmit();
  const { matchList } = useMatchHistory(word);
  const { removeToHistory, history } = useSearchHistory();

  const listToShow = isEmpty(matchList) && isEmpty(word) ? history : matchList;
  const isListOpen = isOpen && listToShow.length > 0;

  return isListOpen ? (
    <SearchHistoryList list={listToShow} onRemove={removeToHistory} />
  ) : null;
}
