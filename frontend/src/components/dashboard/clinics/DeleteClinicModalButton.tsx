import ClinicModal from "@/components/shared/ClinicModal";
import { Button } from "@/components/ui/button";
import { useDeleteClinic } from "@/lib/react-query/clinics";
import cookieServices from "@/utils/cookieServices";
import { AxiosError } from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

interface IProps {
  name: string;
  id: number;
}

const DeleteClinicButton = ({ name, id }: IProps) => {
  const token = cookieServices.getToken() || "";
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const { mutateAsync: deleteClinic, isPending } = useDeleteClinic();

  const handleDelete = async () => {
    try {
      const { status, message } = await deleteClinic({ id, token });

      // ! Delete Field
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

      <ClinicModal
        isOpen={isOpenDeleteModal}
        onOpenChange={() => setIsOpenDeleteModal(false)}
        title="حذف العيادة"
        description={`هل انت متاكد من حذف عيادة ${name}؟`}
        onConfirm={handleDelete}
        confirmText="حذف"
        isLoading={isPending}
        variant="destructive"
      />
    </>
  );
};

export default DeleteClinicButton;
