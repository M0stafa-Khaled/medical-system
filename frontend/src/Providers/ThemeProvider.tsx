import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: IProps) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
