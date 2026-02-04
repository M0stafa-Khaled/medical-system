import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import PageLoader from "./components/shared/PageLoader";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
const App = lazy(() => import("./App"));
registerSW({
  immediate: true,
});

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<PageLoader />}>
    <App />
  </Suspense>,
);
