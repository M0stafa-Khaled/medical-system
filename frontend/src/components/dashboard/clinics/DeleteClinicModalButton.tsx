import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteClinic } from "@/lib/react-query/clinics";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

interface IProps {
  name: string;
  id: number;
}

const DeleteClinicButton = ({ name, id }: IProps) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const { mutateAsync: deleteClinic, isPending } = useDeleteClinic();

  const handleDelete = async () => {
    try {
      const { status, message } = await deleteClinic(id);

      // ! Delete Field
      if (!status) return toast.error(message);

      // * Delete Success
      return toast.success(message);
    } catch (error) {
      const errorObj = error as AxiosError<{ message: string }>;
      toast.error(errorObj.response?.data.message || "هناك خطأ حاول لاحقا");
    } finally {
      setIsOpenDeleteModal(false);
    }
  };

  return (
    <div>
      <Button
        size={"sm"}
        onClick={() => setIsOpenDeleteModal(true)}
        variant={"destructive"}
        className="ext-white gap-2 text-sm"
      >
        حذف
        <MdDelete size={18} />
      </Button>

      {/* Delete Modal */}
      <AlertDialog
        open={isOpenDeleteModal}
        onOpenChange={() => setIsOpenDeleteModal((prev) => !prev)}
      >
        <AlertDialogContent className="border-muted">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black dark:text-white text-start">
              حذف العيادة
            </AlertDialogTitle>
            <AlertDialogDescription className="text-start">
              هل انت متاكد من حذف عيادة{" "}
              <span className="font-medium text-black dark:text-white">
                {name}
              </span>
              ؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="text-start !justify-start gap-2">
            <AlertDialogCancel className="text-black dark:text-white">
              إلغاء
            </AlertDialogCancel>
            <Button
              onClick={handleDelete}
              variant={"destructive"}
              disabled={isPending}
            >
              حذف
              {isPending && <Loader2 className="animate-spin" />}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteClinicButton;
