import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  action: "create" | "update";
  isLoadingCreate: boolean;
  isLoadingUpdate?: boolean;
  createText?: string;
  loadingCreateText?: string;
  updateText?: string;
  loadingUpdateText?: string;
}

const SubmitButton = ({
  action,
  isLoadingCreate,
  isLoadingUpdate,
  createText = "إضافة",
  loadingCreateText = "جاري الإضافة",
  updateText = "تحديث",
  loadingUpdateText = "جاري التحديث",
}: SubmitButtonProps) => (
  <Button
    type="submit"
    disabled={isLoadingCreate || isLoadingUpdate}
    className="h-10 w-full md:w-fit"
  >
    {action === "create"
      ? isLoadingCreate
        ? loadingCreateText
        : createText
      : isLoadingUpdate
        ? loadingUpdateText
        : updateText}
    {(isLoadingCreate || isLoadingUpdate) && (
      <Loader2 className="ml-2 animate-spin" />
    )}
  </Button>
);

export default SubmitButton;
