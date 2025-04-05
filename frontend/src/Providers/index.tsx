import { Provider } from "react-redux";
import { store } from "@/store/store";
import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { HelmetProvider } from "react-helmet-async";
import { lazy } from "react";

const QueryProvider = lazy(() => import("@/providers/QueryProvider"));
import ThemeProvider from "@/providers/ThemeProvider";

const Providers = () => {
  return (
    <HelmetProvider>
      <QueryProvider>
        <Provider store={store}>
          <ThemeProvider>
            <RouterProvider
              router={router}
              future={{ v7_startTransition: true }}
            />
          </ThemeProvider>
        </Provider>
      </QueryProvider>
    </HelmetProvider>
  );
};

export default Providers;
