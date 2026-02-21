import { Modal } from "@/shared/components/Modal";
import { Button } from "@/shared/components/ui/button";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { useDeleteDoctorPrescription } from "@/shared/lib/react-query/doctor/prescriptions";
import { handleResErr } from "@/shared/utils/handleResError";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  name: string;
  id: string;
}

const DoctorDeletePrescription = ({ name, id }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: deletePrescription, isPending } =
    useDeleteDoctorPrescription();

  const handleDelete = async () => {
    try {
      const { status, message } = await deletePrescription({ id });

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
        title="حذف روشتة"
        description={{
          text: `هل انت متاكد من حذف روشتة المريض ${name}؟`,
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

export default DoctorDeletePrescription;
