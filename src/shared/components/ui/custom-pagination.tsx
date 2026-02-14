import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "./button";

interface PaginationButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export const CustomPaginationPrevious = ({
  className,
  disabled,
  ...props
}: PaginationButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariants({ variant: "outline" }),
        "gap-1 ps-2.5",
        className
      )}
      disabled={disabled}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>السابق</span>
    </button>
  );
};

export const CustomPaginationNext = ({
  className,
  disabled,
  ...props
}: PaginationButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariants({ variant: "outline" }),
        "gap-1 pe-2.5",
        className
      )}
      disabled={disabled}
      {...props}
    >
      <span>التالي</span>
      <ChevronRight className="h-4 w-4" />
    </button>
  );
};
