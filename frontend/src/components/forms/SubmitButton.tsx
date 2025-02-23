import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  action: "add" | "update";
  isLoadingAdd: boolean;
  isLoadingUpdate?: boolean;
  addText?: string;
  loadingAddText?: string;
  updateText?: string;
  loadingUpdateText?: string;
}

const SubmitButton = ({
  action,
  isLoadingAdd,
  isLoadingUpdate,
  addText = "إضافة",
  loadingAddText = "جاري الإضافة",
  updateText = "تحديث",
  loadingUpdateText = "جاري التحديث",
}: SubmitButtonProps) => (
  <Button
    type="submit"
    disabled={isLoadingAdd || isLoadingUpdate}
    className="py-6 w-full md:w-fit"
  >
    {action === "add"
      ? isLoadingAdd
        ? loadingAddText
        : addText
      : isLoadingUpdate
      ? loadingUpdateText
      : updateText}
    {(isLoadingAdd || isLoadingUpdate) && (
      <Loader2 className="animate-spin ml-2" />
    )}
  </Button>
);

export default SubmitButton;
