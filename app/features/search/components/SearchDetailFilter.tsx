import React, { useState, useCallback, useEffect } from "react";
import SelectBox from "@components/common/SelectBox";
import type { TargetParams } from "~/features/books/type";
import { useSearchSubmit } from "@search/hooks/useSearchSubmit";
import { useSearchInput } from "../hooks/useSearchInput";
import { Button } from "~/components/ui/button";
import { Form } from "react-router";

const filterOptions = [
  { id: "title", name: "제목" },
  { id: "author", name: "저자" },
  { id: "publisher", name: "출판사" },
];

// 필터 셀렉트 박스 분리 컴포넌트
function FilterSelectBoxComponent({
  selectedFilter,
  onChange,
}: {
  selectedFilter: TargetParams;
  onChange: (value: TargetParams) => void;
}) {
  return (
    <SelectBox
      className='w-full'
      onChange={onChange}
      value={selectedFilter}
      name='options'
      options={filterOptions.map((opt) => ({
        key: opt.id,
        value: opt.id,
        label: opt.name,
      }))}
    />
  );
}

// 인풋 박스 분리 컴포넌트
function KeywordInputComponent({
  keyword,
  onChange,
}: {
  keyword: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type='text'
      name='search'
      onChange={onChange}
      value={keyword}
      autoComplete='off'
      className='border-b border-primary w-full pl-2'
      placeholder='검색어 입력'
    />
  );
}

const KeywordInput = React.memo(KeywordInputComponent);
const FilterSelectBox = React.memo(FilterSelectBoxComponent);

type Props = {
  onClose: () => void;
};
export default function SearchDetailFilter({ onClose }: Props) {
  const [selectedFilter, setSelectedFilter] = useState<TargetParams>("title");
  const [keyword, setKeyword] = useState("");
  const { setWord } = useSearchInput();

  useEffect(() => {
    setWord("");
  }, [setWord]);

  const handleChangeFilter = useCallback((value: TargetParams) => {
    setSelectedFilter(value);
  }, []);

  const handleChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    onClose();
  }, [keyword, selectedFilter, onClose]);

  return (
    <Form method='post' action='/' className='relative'>
      <div className='flex'>
        <div className='min-w-[100px]'>
          <FilterSelectBox
            selectedFilter={selectedFilter}
            onChange={handleChangeFilter}
          />
        </div>
        <KeywordInput keyword={keyword} onChange={handleChangeKeyword} />
      </div>
      <Button size='lg' className='w-full mt-5' onClick={handleSubmit}>
        검색하기
      </Button>
    </Form>
  );
}
