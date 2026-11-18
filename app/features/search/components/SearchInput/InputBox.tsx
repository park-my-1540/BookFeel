import { useSearchOpen } from "@search/hooks/useSearchOpen";
import { useSearchSubmit } from "@search/hooks/useSearchSubmit";
import React from "react";

export default function InputBox() {
  const { word, setWord } = useSearchSubmit();
  const { setIsOpen } = useSearchOpen();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true);
    setWord(e.currentTarget.value);
  };

  return (
    <div className="flex flex-row items-center gap-2 px-1 bg-gray w-full cursor-text rounded-lg">
      <input
        value={word}
        type="text"
        name="search"
        aria-label="도서 검색"
        placeholder="도서를 검색해주세요."
        autoComplete="off"
        className="bg-transparent w-full h-[50px] placeholder:text-textSubtitle px-3 rounded-lg sm:px-5"
        onChange={onChange}
        onFocus={() => setIsOpen(true)}
      />
    </div>
  );
}
