import React, { useCallback } from "react";
import { Caption } from "@/components/ui/Typography";
import { X } from "lucide-react";
import { useSubmit } from "react-router";

type Props = {
  list: string[];
  onRemove: (keyword: string) => void;
};

type ItemProps = {
  keyword: string;
  onClick: (keyword: string) => void;
  onRemove: (keyword: string) => void;
};

/**
 * 개별 검색어 항목 컴포넌트
 * props 함수(onClick, onRemove)의 레퍼런스 고정을 위해 React.memo 사용
 * 리스트 항목이 자주 바뀌므로 리렌더 자체를 막진 못하지만, 불필요한 함수 비교를 줄임
 */
const KeywordItem = React.memo(function KeywordItem({
  keyword,
  onClick,
  onRemove,
}: ItemProps) {
  return (
    <div className='flex items-center justify-between w-full'>
      <a onClick={() => onClick(keyword)} className='cursor-pointer w-full'>
        <Caption className='hover:text-textPrimary'>{keyword}</Caption>
      </a>
      <button onClick={() => onRemove(keyword)} className='p-1'>
        <X className='w-5 h-5 text-black' />
      </button>
    </div>
  );
});

// 전체 검색 기록 리스트
function SearchHistoryList({ list, onRemove }: Props) {
  const submit = useSubmit();
  const handleClick = useCallback(
    (keyword: string) => {
      submit(
        { search: keyword },
        {
          method: "post",
          action: "/",
        }
      );
    },
    [submit]
  );

  const handleRemove = useCallback(
    (keyword: string) => {
      onRemove(keyword);
    },
    [onRemove]
  );

  return (
    <div className='absolute top-[50px] rounded-b-3xl left-0 w-full py-5 pr-5 pl-[60px] space-y-2 dropdown-container bg-lightGray shadow-md'>
      {list.map((keyword, index) => (
        <div key={keyword} className='flex items-center justify-between'>
          <KeywordItem
            key={`${keyword}-${index}`}
            keyword={keyword}
            onClick={handleClick}
            onRemove={handleRemove}
          />
        </div>
      ))}
    </div>
  );
}
export default SearchHistoryList;
