import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import PageLoader from "./shared/components/PageLoader";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import { DirectionProvider } from "@/shared/components/ui/direction";
import { store } from "@/app/store";
import { logout } from "@/app/store/features/auth/authSlice";
import { registerLogoutHandler } from "@/shared/lib/axios";

const App = lazy(() => import("./App"));
registerSW({
  immediate: true,
});

registerLogoutHandler(() => {
  store.dispatch(logout());
});

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<PageLoader />}>
    <DirectionProvider dir="rtl">
      <App />
    </DirectionProvider>
  </Suspense>
);
