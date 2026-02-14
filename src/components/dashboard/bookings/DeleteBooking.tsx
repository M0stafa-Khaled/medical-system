import { Modal } from "@/components/shared/Modal";
import { Button } from "@/shared/components/ui/button";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { useDeleteBooking } from "@/shared/lib/react-query/dashboard/bookings";
import cookieServices from "@/shared/utils/cookieServices";
import { handleResErr } from "@/shared/utils/handleResError";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  name: string;
  id: string;
}

const DeleteBooking = ({ name, id }: IProps) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: deleteBooking, isPending } = useDeleteBooking();

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
          size={"sm"}
          onClick={() => setIsOpen(true)}
          variant={"destructive"}
          className="h-9 w-9 gap-2 px-1 py-1 text-sm text-white"
        >
          <Trash2 size={20} />
        </Button>
      </TooltipButton>

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
