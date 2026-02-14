import { useQueryClient } from "@tanstack/react-query";
import { Button, ButtonProps } from "../../shared/components/ui/button";
import { RefreshCcw } from "lucide-react";
import Query_Keys from "@/enums/queryKeys";
import { TooltipButton } from "../../shared/components/ui/TooltipButton";

interface IProps extends ButtonProps {
  isLoading: boolean;
  queryKey: Query_Keys;
}

const RefetchDataButton = ({ isLoading, queryKey, ...rest }: IProps) => {
  const queryClient = useQueryClient();
  const handelRefetchDate = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKey],
    });
  };

  return (
    <TooltipButton title="تحديث">
      <Button
        {...rest}
        onClick={handelRefetchDate}
        className="flex h-auto items-center gap-2 py-3"
      >
        <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
      </Button>
    </TooltipButton>
  );
};

export default RefetchDataButton;
