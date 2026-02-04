import { Provider } from "react-redux";
import { store } from "@/store/store";
import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { HelmetProvider } from "react-helmet-async";

import ThemeProvider from "@/providers/ThemeProvider";
import QueryProvider from "@/providers/QueryProvider";
const Providers = () => {
  return (
    <HelmetProvider>
      <QueryProvider>
        <Provider store={store}>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </Provider>
      </QueryProvider>
    </HelmetProvider>
  );
};

export default Providers;
