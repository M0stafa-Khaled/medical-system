import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import { Bounce, ToastContainer } from "react-toastify";

interface IProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: IProps) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
