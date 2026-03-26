import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";

interface IProps extends React.ComponentPropsWithoutRef<typeof DialogContent> {
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

const maxWidthClasses: Record<string, string> = {
  sm: "max-w-sm!",
  md: "max-w-md!",
  lg: "max-w-lg!",
  xl: "max-w-xl!",
  "2xl": "max-w-2xl!",
  "3xl": "max-w-3xl!",
  "4xl": "max-w-4xl!",
  "5xl": "max-w-5xl!",
  "6xl": "max-w-6xl!",
};

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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={`border-muted z-1000! w-full ${maxWidthClasses[maxWidth] ?? "max-w-lg!"} rounded-lg`}
        {...rest}
      >
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription
            className={`mx-auto max-w-md text-center ${
              description.color ? description.color : ""
            }`}
          >
            {description.text}
          </DialogDescription>
        </DialogHeader>

        {children}

        {showFooter && (
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button onClick={onCancel} variant={"outline"}>
                إلغاء
              </Button>
            </DialogClose>
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
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
