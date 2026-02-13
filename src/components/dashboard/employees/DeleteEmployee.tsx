import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { useDeleteEmployee } from "@/lib/react-query/dashboard/employees";
import cookieServices from "@/utils/cookieServices";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import TooltipButton from "@/components/ui/TooltipButton";
import handleResErr from "@/utils/handleResponseError";
import { Trash2 } from "lucide-react";

interface IProps {
  name: string;
  id: number;
}

const DeleteEmployee = ({ name, id }: IProps) => {
  const navigate = useNavigate();
  const token = cookieServices.getToken() || "";
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const { mutateAsync: deleteEmployee, isPending } = useDeleteEmployee();

  const handleDelete = async () => {
    try {
      const { status, message } = await deleteEmployee({ id, token });

      // ! Delete failed
      if (!status) return toast.error(message);
      // * Delete Success
      navigate("/dashboard/employees");
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
        title="حذف موظف"
        description={{
          text: `هل انت متاكد من حذف الموظف ${name}؟`,
        }}
        onConfirm={handleDelete}
        confirmText="حذف"
        isLoading={isPending}
        variant="destructive"
      />
    </>
  );
};

export default DeleteEmployee;
