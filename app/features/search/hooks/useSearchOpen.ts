import { useSearchOpenStore } from "@search/stores/useSearchOpenStore";

export const useSearchOpen = () => {
  const isOpen = useSearchOpenStore((state) => state.isOpen);
  const setIsOpen = useSearchOpenStore((state) => state.setIsOpen);

  return {
    isOpen,
    setIsOpen,
  };
};
