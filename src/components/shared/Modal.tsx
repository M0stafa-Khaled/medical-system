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

interface IProps extends React.ComponentPropsWithoutRef<
  typeof AlertDialogContent
> {
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
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
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
  maxWidth = "lg",
  ...rest
}: IProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={`border-muted z-1000! rounded-lg max-w-${maxWidth} w-full`}
        {...rest}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black dark:text-white text-center">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription
            className={`text-base text-center max-w-md mx-auto ${
              description.color ? description.color : ""
            }`}
          >
            {description.text}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {children}

        {showFooter && (
          <AlertDialogFooter className="text-start justify-start! gap-2">
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
