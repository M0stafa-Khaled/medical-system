import { Modal } from "@/components/shared/Modal";
import { Button } from "@/shared/components/ui/button";
import { useDeleteDoctorAction } from "@/shared/lib/react-query/dashboard/doctors/doctorActions";
import cookieServices from "@/shared/utils/cookieServices";
import { useState } from "react";
import { toast } from "react-toastify";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { handleResErr } from "@/shared/utils/handleResError";
import { Trash2 } from "lucide-react";

interface IProps {
  name: string;
  id: number;
}

const DeleteAction = ({ name, id }: IProps) => {
  const token = cookieServices.getToken() || "";
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const { mutateAsync: deleteAction, isPending } = useDeleteDoctorAction();

  const handleDelete = async () => {
    try {
      const { message, status } = await deleteAction({ id: `${id}`, token });

      // ! Delete failed
      if (!status) return toast.error(message);

      // * Delete Success
      return toast.success(message);
    } catch (error) {
      handleResErr(error);
    } finally {
      setIsOpenDeleteModal(false);
    }
  };

  return (
    <>
      <TooltipButton title="حذف">
        <Button
          size={"sm"}
          onClick={() => setIsOpenDeleteModal(true)}
          variant={"destructive"}
          className="h-9 w-9 gap-2 px-1 py-1 text-sm text-white"
        >
          <Trash2 size={20} />
        </Button>
      </TooltipButton>

      <Modal
        isOpen={isOpenDeleteModal}
        onOpenChange={() => setIsOpenDeleteModal(false)}
        title="حذف إجراء"
        description={{
          text: `هل انت متاكد من حذف إجراء ${name}؟`,
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

export default DeleteAction;
