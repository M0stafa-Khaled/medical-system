import { InputHTMLAttributes } from "react";
import { Input } from "./input";
import { cn } from "@/shared/lib/utils";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
}
const InputFilter = ({ placeholder, className, ...reset }: IProps) => {
  return (
    <Input
      placeholder={placeholder || ""}
      className={cn(
        "border-border placeholder:text-muted-foreground h-auto py-3 placeholder:h-14 placeholder:text-sm",
        className
      )}
      type="search"
      {...reset}
    />
  );
};

export default InputFilter;
