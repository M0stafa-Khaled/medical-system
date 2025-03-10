import { QueryProvider } from "@/Providers/QueryProvider";
import { Provider } from "react-redux";
import ThemeProvider from "./ThemeProvider";
import { store } from "@/store/store";
import { RouterProvider } from "react-router-dom";
import router from "@/routes";

const Providers = () => {
  return (
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
  );
};

export default Providers;
