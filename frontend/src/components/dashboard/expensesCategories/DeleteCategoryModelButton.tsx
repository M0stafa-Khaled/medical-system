import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { IExpenseCategory } from "@/interfaces/expenses/expenseCategory";
import { useDeleteExpenseCategory } from "@/lib/react-query/expenses/expensesCategories";
import cookieServices from "@/utils/cookieServices";
import { AxiosError } from "axios";
import { memo, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

interface IProps {
  category: IExpenseCategory;
}

const DeleteCategoryButton = ({ category }: IProps) => {
  const token = cookieServices.getToken()!;
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
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
      const errorObj = error as AxiosError<{ message: string }>;
      toast.error(errorObj.response?.data.message || "هناك خطأ حاول لاحقا");
    } finally {
      setIsOpenDeleteModal(false);
    }
  };

  return (
    <>
      <Button
        size={"sm"}
        onClick={() => setIsOpenDeleteModal(true)}
        variant={"destructive"}
        className="text-white gap-2 text-sm  py-1 px-1 w-8 h-8"
      >
        <MdDelete size={24} />
      </Button>

      <Modal
        isOpen={isOpenDeleteModal}
        onOpenChange={() => setIsOpenDeleteModal(false)}
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

export default memo(DeleteCategoryButton);
