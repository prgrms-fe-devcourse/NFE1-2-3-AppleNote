import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@components/main/AppLayout";
import ErrorPage from "routes/ErrorPage.tsx";
import HomePage from "@components/main/HomePage";
import NotFoundPage from "routes/NotFoundPage.tsx";
import CreatePostPage from "@components/post/CreatePostPage";
import PostListPage from "@components/main/PostListPage";
import LandingPage from "@components/landing/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />, // 루트 경로에 랜딩페이지 설정
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <AppLayout />, // 상위 레이아웃으로 AppLayout 설정
    children: [
      { path: "home", element: <HomePage /> }, // 메인 페이지
      { path: "posts", element: <PostListPage /> }, // 포스트 목록 페이지
      { path: "create-post", element: <CreatePostPage /> }, // 포스트 작성
    ],
  },
  { path: "/*", element: <NotFoundPage /> }, // 404 페이지
]);

export default router;
