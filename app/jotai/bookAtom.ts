import { atom } from "jotai";

export type bookAtomType = {
  cover: string;
  title: string;
  author: string;
  isbn: string;
  itemId: string;
};

const bookState = atom<bookAtomType>({
  cover: "",
  title: "",
  author: "",
  isbn: "",
  itemId: "",
});

export default bookState;
