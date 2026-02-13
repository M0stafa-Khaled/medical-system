import { Provider } from "react-redux";
import { store } from "@/store/store";
import { RouterProvider } from "react-router";
import { router } from "@/routes";
import { HelmetProvider } from "react-helmet-async";

import ThemeProvider from "@/providers/ThemeProvider";
import QueryProvider from "@/providers/QueryProvider";
import { LazyMotion, domAnimation } from "framer-motion";

const Providers = () => {
  return (
    <HelmetProvider>
      <QueryProvider>
        <Provider store={store}>
          <ThemeProvider>
            <LazyMotion features={domAnimation}>
              <RouterProvider router={router} />
            </LazyMotion>
          </ThemeProvider>
        </Provider>
      </QueryProvider>
    </HelmetProvider>
  );
};

export default Providers;
