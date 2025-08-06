import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import InputBox from "@search/components/SearchInput/InputBox";
import ListBox from "@search/components/SearchInput/ListBox";
import { useSearchOpen } from "@search/hooks/useSearchOpen";
import { Form } from "react-router";

export default function SearchInput() {
  const ref = useRef<HTMLDivElement>(null);
  const { setIsOpen } = useSearchOpen();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <Form
      method='post'
      action='/'
      className='relative flex flex-row w-full items-center gap-2 bg-lightGray rounded-[100px]'
    >
      <div className='w-full' ref={ref}>
        <InputBox />
        <ListBox />
      </div>
    </Form>
  );
}
