import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { useDeletePatient } from "@/lib/react-query/patients";
import cookieServices from "@/utils/cookieServices";
import { AxiosError } from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IProps {
  name: string;
  id: number;
}

const DeletePatientButton = ({ name, id }: IProps) => {
  const navigate = useNavigate();
  const token = cookieServices.getToken() || "";
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const { mutateAsync: deletePatient, isPending } = useDeletePatient();

  const handleDelete = async () => {
    try {
      const { status, message } = await deletePatient({ id, token });

      // ! Delete Field
      if (!status) return toast.error(message);
      // * Delete Success
      navigate("/dashboard/patients");
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
        title="حذف مريض"
        description={`هل انت متاكد من حذف المريض ${name}؟`}
        onConfirm={handleDelete}
        confirmText="حذف"
        isLoading={isPending}
        variant="destructive"
      />
    </>
  );
};

export default DeletePatientButton;
