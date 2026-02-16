import { Button } from "@/shared/components/ui/button";
import { useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { handleResErr } from "@/shared/utils/handleResError";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { cn } from "@/shared/lib/utils";

interface IProps {
  name: string;
  deleteAction: () => Promise<{ status: boolean; message: string }>;
  navigatePath?: string;
  className?: string;
}

export const DeleteAlert = ({
  name,
  deleteAction,
  navigatePath,
  className,
}: IProps) => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const { status, message } = await deleteAction();

        // * Delete Success
        if (status) {
          if (navigatePath) navigate(navigatePath);
          toast.success(message || "تم الحذف بنجاح");
        } else throw new Error(message); // ! Delete failed
      } catch (error) {
        handleResErr(error);
      } finally {
        setIsOpen(false);
      }
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <TooltipButton title="حذف">
          <Button
            size={"icon"}
            onClick={() => setIsOpen(true)}
            variant={"outline"}
            className={cn("btn-destructive rounded-full", className)}
          >
            <Trash2 size={20} />
          </Button>
        </TooltipButton>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-xl">
        <AlertDialogHeader className="gap-4">
          <AlertDialogTitle className="text-center text-black dark:text-white">
            حذف
          </AlertDialogTitle>
          <AlertDialogDescription>
            هل انت متأكد من حذف{" "}
            <span className="font-medium text-black dark:text-white">
              {name}
            </span>
            ؟ هذا الاجراء لا يمكن التراجع عنه!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            className="bg-slate-100! text-slate-900! hover:bg-slate-200/70! hover:text-slate-900!"
          >
            إلغاء
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500/15! text-red-500! hover:bg-red-500/10! hover:text-red-800!"
            onClick={handleDelete}
            disabled={isPending}
          >
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
