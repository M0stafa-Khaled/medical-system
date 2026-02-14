import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  title: string;
}
export const TooltipButton = ({ children, title }: IProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
