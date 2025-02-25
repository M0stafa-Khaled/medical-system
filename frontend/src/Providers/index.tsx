import { QueryProvider } from "@/Providers/QueryProvider";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import ThemeProvider from "./ThemeProvider";
import { store } from "@/app/store";

interface IProps {
  children: ReactNode;
}
const index = ({ children }: IProps) => {
  return (
    <QueryProvider>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </QueryProvider>
  );
};

export default index;
