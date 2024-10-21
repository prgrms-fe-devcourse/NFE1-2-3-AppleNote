import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { CustomThemeProvider } from "@common/styles/ThemeProvider.tsx";

import router from "routes/router.tsx";

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
      <CustomThemeProvider>
        <RouterProvider router={router} />
      </CustomThemeProvider>
    </StrictMode>
  );
});
