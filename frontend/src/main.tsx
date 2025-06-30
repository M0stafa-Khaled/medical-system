import { createRoot } from "react-dom/client";
import "./index.css";
import { registerSW } from "virtual:pwa-register";
import { lazy, Suspense } from "react";
import SuspenseLoader from "./components/shared/SuspenseLoader";

const App = lazy(() => import("./App"));
registerSW();

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<SuspenseLoader />}>
    <App />
  </Suspense>
);
