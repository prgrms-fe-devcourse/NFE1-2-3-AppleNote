import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@components/main/AppLayout";
import ErrorPage from "routes/ErrorPage.tsx";
import HomePage from "@components/main/HomePage";
import NotFoundPage from "routes/NotFoundPage.tsx";
import CreatePostPage from "@components/post/CreatePostPage";
import PostListPage from "@components/main/PostListPage";
import SettingPage from "@components/myPage/SettingPage";
import SearchResultPage from "@components/search/SearchResultPage";
import PostPage from "@components/post/PostPage";
import Login from "@components/auth/Login";
import Signup from "@components/auth/Signup";
import LandingPage from "@components/landing/LandingPage";

// TODO: Creating protected routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // 루트에 AppLayout을 그대로 유지
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <LandingPage /> }, // 루트 경로에서 랜딩 페이지 표시
      { path: "/home", element: <HomePage /> }, // 메인 페이지
      { path: "/posts", element: <PostListPage /> }, // 포스트 목록 페이지
      { path: "/posts/:id", element: <PostPage /> }, // 포스트 상세 페이지
      { path: "/categories/:categoryId", element: <PostListPage /> }, // 특정 카테고리별 포스트 목록 페이지
      { path: "/search", element: <SearchResultPage /> }, // 검색 페이지
      { path: "/create-post", element: <CreatePostPage /> }, // 포스트 작성 페이지
      { path: "/setting", element: <SettingPage /> }, // 세팅 페이지
    ],
  },
  { path: "/login", element: <Login /> }, // 로그인 페이지
  { path: "/signup", element: <Signup /> }, // 회원가입 페이지
  { path: "*", element: <NotFoundPage /> }, // 404 페이지
]);

export default router;
