import { prefix, index, route, layout } from "@react-router/dev/routes";

export default [
  route("/", "common/pages/home-page.tsx"),
  ...prefix("books", [
    index("features/books/pages/list-page.tsx"),
    ...prefix("generate", [index("features/books/api/generate-idea-page.tsx")]),
  ]),
  ...prefix("shoppingcart", [
    index("features/shoppingcart/pages/shoppingcart-page.tsx"),
    route("/api", "features/shoppingcart/api/cart.tsx"),
  ]),
  ...prefix("payment", [
    route("/success", "features/payment/pages/payment-success-page.tsx"),
    route("/failure", "features/payment/pages/payment-failure-page.tsx"),
  ]),
  route("/wishlist", "features/wishlist/pages/wishlist-page.tsx"),
  ...prefix("playlists", [
    index("features/playlists/pages/playlist-page.tsx"),
    route("/submit", "features/playlists/pages/submit-playlist-page.tsx"),
    ...prefix("/:playlistId", [
      route("/upvote", "features/playlists/pages/playlist-upvote-page.tsx"),
    ]),
  ]),
  ...prefix("community", [
    index("features/community/pages/community-page.tsx"),
    route("/:postId", "features/community/pages/post-page.tsx"),
    route("/:postId/upvote", "features/community/pages/upvote-post-page.tsx"),
    route("/create", "features/community/pages/submit-post-page.tsx"),
  ]),
  ...prefix("library", [index("features/library/pages/library-page.tsx")]),
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
  ...prefix("my", [
    route("/profile", "features/users/pages/my-profile-page.tsx"),
    route("/settings", "features/users/pages/settings-page.tsx"),
  ]),
  ...prefix("users/:username", [
    layout("features/users/pages/profile-layout.tsx", [
      index("features/users/pages/profile-page.tsx"),
      route("/playlist", "features/users/pages/profile-playlist-page.tsx"),
    ]),
  ]),
];
