import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import TooltipButton from "@/components/ui/TooltipButton";
import { useDeleteExpense } from "@/lib/react-query/dashboard/expenses/expenses";
import cookieServices from "@/utils/cookieServices";
import handleResErr from "@/utils/handleResponseError";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

interface IProps {
  id: number;
  name: string;
}

const DeleteExpense = ({ id, name }: IProps) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: deleteExpense, isPending } = useDeleteExpense();

  const handleDelete = async () => {
    try {
      const { message, status } = await deleteExpense({
        id: `${id}`,
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
          className="text-white gap-2 text-sm  py-1 px-1 w-9 h-9"
        >
          <MdDelete size={24} />
        </Button>
      </TooltipButton>

      <Modal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        title="حذف مصروف"
        description={{
          text: `هل انت متاكد من حذف مصروف ${name}؟`,
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

export default DeleteExpense;
