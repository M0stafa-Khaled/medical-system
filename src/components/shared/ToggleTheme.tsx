import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import TooltipButton from "../ui/TooltipButton";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <TooltipButton title="تغيير الثيم">
      <Button
        name="تغيير الثيم"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        size={"icon"}
        variant={"outline"}
        className="btn-edit rounded-full"
      >
        {theme === "dark" ? (
          <IoIosSunny size={24} className="h-10 w-10 text-amber-400" />
        ) : (
          <IoIosMoon size={24} className="h-10 w-10" />
        )}
      </Button>
    </TooltipButton>
  );
};

export default ToggleTheme;
