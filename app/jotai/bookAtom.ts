import { atomWithStorage } from "jotai/utils";

export type bookAtomType = {
  cover: string;
  title: string;
  author: string;
  isbn: string;
  itemId: string;
};

const bookState = atomWithStorage<bookAtomType>("bookState", {
  cover: "",
  title: "",
  author: "",
  isbn: "",
  itemId: "",
});

export default bookState;
