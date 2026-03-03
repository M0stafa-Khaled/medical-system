import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { handleResErr } from "@/shared/utils/handleResError";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Modal } from "@/shared/components/Modal";
import { useCreateDoctorTransaction } from "../queriesAndMutations";
import { Wallet } from "lucide-react";

interface CreateDoctorExpenseProps {
  id: string;
}

export const CreateDoctorExpense = ({ id }: CreateDoctorExpenseProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: createTransaction, isPending } =
    useCreateDoctorTransaction();

  const handleCreateTransaction = async () => {
    try {
      const { status, message } = await createTransaction({ id });

      if (!status) return toast.error(message);

      return Swal.fire({
        icon: "success",
        title: "تم",
        text: message,
        confirmButtonText: "حسناً",
        customClass: {
          confirmButton: "swal-confirm-btn",
        },
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
        size="lg"
        className="dark:btn-primary"
      >
        <Wallet size={18} />
        إضافة مصروف للطبيب
        <FiPlus size={18} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        title="إضافة مصروف"
        description={{
          text: `هل أنت متأكد من إضافة مصروف للطبيب ؟`,
          color: "text-blue-600",
        }}
        onConfirm={handleCreateTransaction}
        confirmText="إضافة مصروف"
        isLoading={isPending}
      />
    </>
  );
};
