import { lazy } from "react";
const Providers = lazy(() => import("./providers"));

const App = () => {
  return <Providers />;
};

export default App;
