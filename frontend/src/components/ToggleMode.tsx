import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const ToggleMode = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9 px-0 py-0"
    >
      {theme === "dark" ? (
        <IoIosSunny size={24} className="text-amber-400 h-10 w-10" />
      ) : (
        <IoIosMoon size={24} className="text-white dark:text-black h-10 w-10" />
      )}
    </Button>
  );
};

export default ToggleMode;
