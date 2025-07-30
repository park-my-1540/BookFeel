import { prefix, index, route } from "@react-router/dev/routes";

export default [
  index("common/pages/home-page.tsx"),
  ...prefix("books", [
    index("features/books/pages/list-page.tsx"),
    route("/generate", "features/books/api/generate-idea-page.tsx"),
  ]),
];
