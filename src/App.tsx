import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { domAnimation, LazyMotion } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";
import { store } from "@/app/store";
import { router } from "./app/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <HelmetProvider>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              rtl
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
            <LazyMotion features={domAnimation}>
              <RouterProvider router={router} />
            </LazyMotion>
          </ThemeProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </HelmetProvider>
  );
};

export default App;
