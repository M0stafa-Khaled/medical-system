import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import TooltipButton from "@/components/ui/TooltipButton";
import { useDeleteClinic } from "@/lib/react-query/dashboard/clinics";
import cookieServices from "@/utils/cookieServices";
import handleResErr from "@/utils/handleResponseError";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  name: string;
  id: number;
}

const DeleteClinic = ({ name, id }: IProps) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: deleteClinic, isPending } = useDeleteClinic();

  const handleDelete = async () => {
    try {
      const { status, message } = await deleteClinic({ id, token });

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
          className="text-white gap-2 text-sm  py-1 px-1 w-9 h-9"
        >
          <Trash2 size={20} />
        </Button>
      </TooltipButton>

      <Modal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        title="حذف العيادة"
        description={{
          text: `هل انت متاكد من حذف عيادة ${name}؟`,
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

export default DeleteClinic;
