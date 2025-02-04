import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import ThemeProvider from "./Providers/ThemeProvider.tsx";
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </QueryProvider>
);
