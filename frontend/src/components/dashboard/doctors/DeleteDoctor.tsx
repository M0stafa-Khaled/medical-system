import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { useDeleteDoctor } from "@/lib/react-query/dashboard/doctors/doctors";
import cookieServices from "@/utils/cookieServices";
import { AxiosError } from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TooltipButton from "@/components/ui/TooltipButton";
interface IProps {
  name: string;
  id: number;
}

const DeleteDoctor = ({ name, id }: IProps) => {
  const navigate = useNavigate();
  const token = cookieServices.getToken() || "";
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: deleteDoctor, isPending } = useDeleteDoctor();

  const handleDelete = async () => {
    try {
      const { status, message } = await deleteDoctor({ id, token });

      // ! Delete failed
      if (!status) return toast.error(message);
      // * Delete Success
      navigate("/dashboard/doctors");
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
          className="text-white gap-2 text-sm  py-1 px-1 w-9 h-9"
        >
          <MdDelete size={24} />
        </Button>
      </TooltipButton>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        title="حذف طبيب"
        description={{
          text: `هل انت متاكد من حذف الطبيب ${name}؟`,
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

export default DeleteDoctor;
