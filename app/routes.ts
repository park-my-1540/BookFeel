import { prefix, index, route, layout } from "@react-router/dev/routes";

export default [
  route("/", "common/pages/home-page.tsx"),
  ...prefix("books", [
    index("features/books/pages/list-page.tsx"),
    route("/generate", "features/books/api/generate-idea-page.tsx"),
  ]),
  ...prefix("auth", [
    layout("features/auth/layouts/auth-layout.tsx", [
      route("/login", "features/auth/pages/login-page.tsx"),
      route("/logout", "features/auth/pages/logout-page.tsx"),
      route("/join", "features/auth/pages/join-page.tsx"),
      ...prefix("/social/:provider", [
        route("/start", "features/auth/pages/social-start-page.tsx"),
        route("/complete", "features/auth/pages/social-complete-page.tsx"),
      ]),
    ]),
  ]),
];
