import { Modal } from "@/shared/components/Modal";
import { Button } from "@/shared/components/ui/button";
import { handleResErr } from "@/shared/utils/handleResError";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useCreateDoctorTransaction } from "../../queriesAndMutations";

export const CreateDoctorExpense = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: createTransaction, isPending } =
    useCreateDoctorTransaction();

  const handleCreateTransaction = async () => {
    try {
      const { status, message } = await createTransaction({ id });

      // ! create failed
      if (!status) return toast.error(message);

      // * create Success
      return Swal.fire({
        icon: "success",
        title: "تم",
        text: message,
      });
    } catch (error) {
      handleResErr(error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size={"lg"}
        className="dark:btn-primary"
      >
        إضافة مصروف للطبيب
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        title="إضافة مصروف"
        description={{
          text: `هل انت متاكد من إضافة مصروف للطبيب ${name}؟`,
          color: "text-blue-600",
        }}
        onConfirm={handleCreateTransaction}
        confirmText="إضافة مصروف"
        isLoading={isPending}
      />
    </>
  );
};
