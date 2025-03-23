import { QueryProvider } from "@/providers/QueryProvider";
import { Provider } from "react-redux";
import ThemeProvider from "./ThemeProvider";
import { store } from "@/store/store";
import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { HelmetProvider } from "react-helmet-async";

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
