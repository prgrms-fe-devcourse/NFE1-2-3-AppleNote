import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@components/main/AppLayout";
import ErrorPage from "routes/ErrorPage.tsx";
import HomePage from "@components/main/HomePage";
import NotFoundPage from "routes/NotFoundPage.tsx";
import CreatePostPage from "@components/post/CreatePostPage";
import PostListPage from "@components/main/PostListPage";
import SettingPage from "@components/myPage/SettingPage";
import PostPage from "@components/post/PostPage";
import Login from "@components/auth/Login";
import Signup from "@components/auth/Signup";
import LandingPage from "@components/landing/LandingPage";

// TODO: Creating protected routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />, // 루트 경로에 랜딩 페이지 설정
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <AppLayout />, // 상위 레이아웃으로 AppLayout 설정
    children: [
      { path: "", element: <HomePage /> }, // 기본 경로는 빈 문자열로 설정하여 "/app"으로 접근 가능
      { path: "posts", element: <PostListPage /> }, // "/app/posts" 경로
      { path: "post/:id", element: <PostPage /> },
      { path: "categories/:categoryId", element: <PostListPage /> }, // "/app/categories/:categoryId" 경로
      { path: "create-post", element: <CreatePostPage /> }, // "/app/create-post" 경로
      { path: "setting", element: <SettingPage /> }, // "/app/setting" 경로
    ],
  },
  { path: "/login", element: <Login /> }, // 로그인 페이지
  { path: "/signup", element: <Signup /> }, // 회원가입 페이지
  { path: "*", element: <NotFoundPage /> }, // 404 페이지
]);

export default router;
