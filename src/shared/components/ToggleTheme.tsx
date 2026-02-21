import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { TooltipButton } from "./ui/TooltipButton";
import { cn } from "@/shared/lib/utils";

const ToggleTheme = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  return (
    <TooltipButton title="تغيير الثيم">
      <Button
        name="تغيير الثيم"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        size={"icon"}
        variant={"outline"}
        className={cn("btn-edit rounded-full", className)}
        aria-label="تغيير الثيم"
      >
        {theme === "dark" ? (
          <IoIosSunny size={24} className="text-amber-400" />
        ) : (
          <IoIosMoon size={24} />
        )}
      </Button>
    </TooltipButton>
  );
};

export default ToggleTheme;
