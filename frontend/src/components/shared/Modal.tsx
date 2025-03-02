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
  description: {
    text: string;
    color?: string;
  };
  children?: React.ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  isLoading?: boolean;
  showFooter?: boolean;
  variant?: "default" | "destructive" | "ghost" | "outline" | "secondary";
}

const Modal = ({
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
          <AlertDialogDescription
            className={`text-center ${
              description.color ? description.color : ""
            }`}
          >
            {description.text}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {children}

        {showFooter && (
          <AlertDialogFooter className="text-start !justify-start gap-2">
            <AlertDialogCancel
              onClick={onCancel}
              className="text-black dark:text-white py-2.5 h-auto"
            >
              إلغاء
            </AlertDialogCancel>
            {onConfirm && (
              <Button
                onClick={onConfirm}
                disabled={isLoading}
                variant={variant}
                className="py-2.5 h-auto"
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

export default Modal;
