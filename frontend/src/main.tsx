import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "routes/ErrorPage.tsx";
import HomePage from "routes/HomePage.tsx";
import NotFoundPage from "routes/NotFoundPage.tsx";

const router = createBrowserRouter([
  // 메인 페이지
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  // 404 페이지
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);

const enableMocking = async () => {
  if (process.env.NODE_ENV !== "development" || import.meta.env.VITE_MSW_ENABLED !== "true") {
    return;
  }

  const { worker } = await import("./mocks/browser.ts");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
};

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});
