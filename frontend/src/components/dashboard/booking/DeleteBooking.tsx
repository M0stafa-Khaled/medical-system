import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { useDeleteBooking } from "@/lib/react-query/dashboard/bookings";
import cookieServices from "@/utils/cookieServices";
import { AxiosError } from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IProps {
  name: string;
  id: string;
}

const DeleteBooking = ({ name, id }: IProps) => {
  const navigate = useNavigate();
  const token = cookieServices.getToken() || "";
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: deleteBooking, isPending } = useDeleteBooking();

  const handleDelete = async () => {
    try {
      const { status, message } = await deleteBooking({ id, token });

      // ! Delete failed
      if (!status) return toast.error(message);
      // * Delete Success
      navigate("/dashboard/bookings");
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
      <Button
        size={"sm"}
        onClick={() => setIsOpen(true)}
        variant={"destructive"}
        className="text-white gap-2 text-sm  py-1 px-1 w-9 h-9"
      >
        <MdDelete size={24} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        title="إلغاء حجز"
        description={{
          text: `هل انت متاكد من إلغاء حجز المريض ${name}؟`,
          color: "text-red-700",
        }}
        onConfirm={handleDelete}
        confirmText="إلغاء"
        isLoading={isPending}
        variant="destructive"
      />
    </>
  );
};

export default DeleteBooking;
