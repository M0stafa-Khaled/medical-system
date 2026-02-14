import { Modal } from "@/components/shared/Modal";
import { Button } from "@/shared/components/ui/button";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { IExpenseCategory } from "@/interfaces/dashboard/expenses";
import { useDeleteExpenseCategory } from "@/shared/lib/react-query/dashboard/expenses/expensesCategories";
import cookieServices from "@/shared/utils/cookieServices";
import { handleResErr } from "@/shared/utils/handleResError";
import { Trash2 } from "lucide-react";
import { memo, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  category: IExpenseCategory;
}

const DeleteExpenseCategory = ({ category }: IProps) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: deleteCategory, isPending } = useDeleteExpenseCategory();

  const handleDelete = async () => {
    try {
      const { message, status } = await deleteCategory({
        id: `${category?.id}`,
        token,
      });

      // ! Delete failed
      if (!status) return toast.error(message);

      // * Delete Success
      return toast.success(message);
    } catch (error) {
      handleResErr(error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <TooltipButton title="حذف">
        <Button
          size={"sm"}
          onClick={() => setIsOpen(true)}
          variant={"destructive"}
          className="h-8 w-8 gap-2 px-1 py-1 text-sm text-white"
        >
          <Trash2 size={20} />
        </Button>
      </TooltipButton>

      <Modal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        title="حذف تصنيف"
        description={{
          text: `هل أنت متأكد من حذف تصنيف ${category?.name}؟`,
          color: "text-red-700",
        }}
        onConfirm={handleDelete}
        confirmText="حذف"
        isLoading={isPending}
        variant="destructive"
      />
    </>
  );
};

export default memo(DeleteExpenseCategory);
