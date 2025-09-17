import { createRoot } from "react-dom/client";
import "./index.css";
import { registerSW } from "virtual:pwa-register";
import { lazy, Suspense } from "react";
import PageLoader from "./components/shared/PageLoader";

const App = lazy(() => import("./App"));
registerSW();

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<PageLoader />}>
    <App />
  </Suspense>
);
