import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { useDeleteWorkingDay } from "@/lib/react-query/dashboard/doctors/workingDays";
import cookieServices from "@/utils/cookieServices";
import { AxiosError } from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

interface IProps {
  name: string;
  id: number;
}

const DeleteWorkingDay = ({ name, id }: IProps) => {
  const token = cookieServices.getToken() || "";
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const { mutateAsync: deleteWorkingDay, isPending } = useDeleteWorkingDay();

  const handleDelete = async () => {
    try {
      const { message, status } = await deleteWorkingDay({ id, token });

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
        className="text-white gap-2 text-sm  py-1 px-1 w-9 h-9"
      >
        <MdDelete size={24} />
      </Button>

      <Modal
        isOpen={isOpenDeleteModal}
        onOpenChange={() => setIsOpenDeleteModal(false)}
        title="حذف يوم عمل"
        description={{
          text: `هل انت متاكد من حذف يوم العمل ${name}؟`,
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

export default DeleteWorkingDay;
