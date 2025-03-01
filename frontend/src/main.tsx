import { createRoot } from "react-dom/client";
import "./index.css";
import { Suspense, lazy } from "react";
import LoadingSpinnerPage from "./components/LoadingSpinnerPage.tsx";

const App = lazy(() => import("./App"));

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<LoadingSpinnerPage />}>
    <App />
  </Suspense>
);
