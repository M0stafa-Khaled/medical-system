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
import { useState } from "react";
import { MdDelete } from "react-icons/md";

const DeleteClinicButton = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

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
                {"عظام"}
              </span>
              ؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="text-start !justify-start gap-2">
            <AlertDialogCancel className="text-black dark:text-white">
              إلغاء
            </AlertDialogCancel>
            <Button
              onClick={() => setIsOpenDeleteModal(false)}
              variant={"destructive"}
            >
              حذف
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteClinicButton;
