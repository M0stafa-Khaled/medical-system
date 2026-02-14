import { Modal } from "@/components/shared/Modal";
import { Button } from "@/shared/components/ui/button";
import { useDeleteDoctor } from "@/shared/lib/react-query/dashboard/doctors/doctors";
import cookieServices from "@/shared/utils/cookieServices";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { handleResErr } from "@/shared/utils/handleResError";
import { Trash2 } from "lucide-react";
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
