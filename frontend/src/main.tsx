import { createRoot } from "react-dom/client";
import "./index.css";
import { registerSW } from "virtual:pwa-register";
import { lazy, Suspense } from "react";
import LoadingSpinnerPage from "./components/LoadingSpinnerPage";

const App = lazy(() => import("./App"));
registerSW();

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<LoadingSpinnerPage />}>
    <App />
  </Suspense>
);
