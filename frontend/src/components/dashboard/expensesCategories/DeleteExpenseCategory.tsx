import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import TooltipButton from "@/components/ui/TooltipButton";
import { IExpenseCategory } from "@/interfaces/dashboard/expenses/expenseCategory";
import { useDeleteExpenseCategory } from "@/lib/react-query/dashboard/expenses/expensesCategories";
import cookieServices from "@/utils/cookieServices";
import handleResErr from "@/utils/handleResponseError";
import { memo, useState } from "react";
import { MdDelete } from "react-icons/md";
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
          className="text-white gap-2 text-sm  py-1 px-1 w-8 h-8"
        >
          <MdDelete size={24} />
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
