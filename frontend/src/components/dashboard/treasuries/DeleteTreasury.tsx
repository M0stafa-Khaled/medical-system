import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import TooltipButton from "@/components/ui/TooltipButton";
import { ITreasury } from "@/interfaces/dashboard/treasury";
import { useDeleteTreasury } from "@/lib/react-query/dashboard/treasuries";
import cookieServices from "@/utils/cookieServices";
import { AxiosError } from "axios";
import { memo, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

interface IProps {
  treasury: ITreasury;
}

const DeleteTreasuryButton = ({ treasury }: IProps) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: deleteTreasury, isPending } = useDeleteTreasury();

  const handleDelete = async () => {
    try {
      const { message, status } = await deleteTreasury({
        id: `${treasury?.id}`,
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
          className="text-white gap-2 text-sm py-1 px-1 w-8 h-8"
        >
          <MdDelete size={24} />
        </Button>
      </TooltipButton>

      <Modal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        title="حذف خزينة"
        description={{
          text: `هل أنت متأكد من حذف الخزينة ${treasury?.name}؟`,
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

export default memo(DeleteTreasuryButton);
