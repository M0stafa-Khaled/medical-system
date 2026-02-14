import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
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

export const Modal = ({
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
          <AlertDialogTitle className="text-center text-black dark:text-white">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription
            className={`mx-auto max-w-md text-center text-base ${
              description.color ? description.color : ""
            }`}
          >
            {description.text}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {children}

        {showFooter && (
          <AlertDialogFooter className="justify-start! gap-2 text-start">
            <AlertDialogCancel
              onClick={onCancel}
              className="h-auto py-2.5 text-black dark:text-white"
            >
              إلغاء
            </AlertDialogCancel>
            {onConfirm && (
              <Button
                onClick={onConfirm}
                disabled={isLoading}
                variant={variant}
                className="h-auto py-2.5"
              >
                {confirmText}
                {isLoading && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            )}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
