import { Modal } from "@/components/shared/Modal";
import { Button } from "@/shared/components/ui/button";
import { useDeleteWorkingDay } from "@/shared/lib/react-query/dashboard/doctors/workingDays";
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

const DeleteWorkingDay = ({ name, id }: IProps) => {
  const token = cookieServices.getToken() || "";
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: deleteWorkingDay, isPending } = useDeleteWorkingDay();

  const handleDelete = async () => {
    try {
      const { message, status } = await deleteWorkingDay({ id, token });

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
