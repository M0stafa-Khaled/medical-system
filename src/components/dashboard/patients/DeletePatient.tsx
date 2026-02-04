import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import TooltipButton from "@/components/ui/TooltipButton";
import { useDeletePatient } from "@/lib/react-query/dashboard/patients";
import cookieServices from "@/utils/cookieServices";
import handleResErr from "@/utils/handleResponseError";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IProps {
  name: string;
  id: number;
}

const DeletePatient = ({ name, id }: IProps) => {
  const navigate = useNavigate();
  const token = cookieServices.getToken() || "";
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: deletePatient, isPending } = useDeletePatient();

  const handleDelete = async () => {
    try {
      const { status, message } = await deletePatient({ id, token });

      // ! Delete failed
      if (!status) return toast.error(message);
      // * Delete Success
      navigate("/dashboard/patients");
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
        title="حذف مريض"
        description={{
          text: `هل انت متاكد من حذف المريض ${name}؟`,
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

export default DeletePatient;
