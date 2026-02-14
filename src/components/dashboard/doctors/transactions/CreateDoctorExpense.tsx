import { Modal } from "@/components/shared/Modal";
import { Button } from "@/shared/components/ui/button";
import { useCreateDoctorTransaction } from "@/shared/lib/react-query/dashboard/doctors/doctorTransactions";
import cookieServices from "@/shared/utils/cookieServices";
import { handleResErr } from "@/shared/utils/handleResError";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CreateDoctorExpense = ({ id }: { id: string }) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: createTransaction, isPending } =
    useCreateDoctorTransaction();

  const handleCreateTransaction = async () => {
    try {
      const { status, message } = await createTransaction({ id, token });

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
        className="flex h-auto w-full items-center gap-2 py-3 md:w-fit"
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

export default CreateDoctorExpense;
