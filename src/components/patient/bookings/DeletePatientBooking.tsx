import { Modal } from "@/shared/components/Modal";
import { Button } from "@/shared/components/ui/button";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { useDeletePatientBooking } from "@/shared/lib/react-query/patient/patientBookings";
import cookieServices from "@/shared/utils/cookieServices";
import { handleResErr } from "@/shared/utils/handleResError";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  id: string;
}

const DeletePatientBooking = ({ id }: IProps) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: deleteBooking, isPending } = useDeletePatientBooking();

  const handleDelete = async () => {
    try {
      const { status, message } = await deleteBooking({ id, token });

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
          onClick={() => setIsOpen(true)}
          variant={"destructive"}
          className="h-auto w-1/2 gap-2 py-3 text-white"
        >
          <Trash2 size={24} />
          إلغاء الحجز
        </Button>
      </TooltipButton>

      <Modal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        title="إلغاء حجز"
        description={{
          text: `هل انت متأكد من إلغاء الحجز`,
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

export default DeletePatientBooking;
