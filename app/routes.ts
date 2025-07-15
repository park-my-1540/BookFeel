// routes.ts
import { route, prefix, index } from "@react-router/dev/routes";

export default [
  route("/", "common/pages/home-page.tsx"),
  ...prefix("books", [index("features/books/pages/list-page.tsx")]),
];
