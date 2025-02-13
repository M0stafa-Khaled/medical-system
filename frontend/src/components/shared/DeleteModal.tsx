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
import { Loader2 } from "lucide-react";

interface IProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  description: string;
  children?: React.ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  isLoading?: boolean;
  showFooter?: boolean;
  variant?: "default" | "destructive" | "ghost" | "outline" | "secondary";
}

const DeleteModal = ({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  onCancel,
  onConfirm,
  confirmText = "تأكيد",
  isLoading = false,
  showFooter = true,
  variant = "default",
}: IProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-muted !z-[1000] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black dark:text-white text-center">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {children}

        {showFooter && (
          <AlertDialogFooter className="text-start !justify-start gap-2">
            <AlertDialogCancel
              onClick={onCancel}
              className="text-black dark:text-white"
            >
              إلغاء
            </AlertDialogCancel>
            {onConfirm && (
              <Button
                onClick={onConfirm}
                disabled={isLoading}
                variant={variant}
              >
                {confirmText}
                {isLoading && <Loader2 className="animate-spin ml-2" />}
              </Button>
            )}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
