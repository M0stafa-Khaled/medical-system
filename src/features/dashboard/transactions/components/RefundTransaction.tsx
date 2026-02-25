import { Modal } from "@/shared/components/Modal";
import { Button } from "@/shared/components/ui/button";
import { useRefundTransaction } from "@/features/dashboard/transactions/queriesAndMutations";
import { Loader2, RefreshCcwDot } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { containerVariants } from "@/shared/animations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField } from "@/shared/components/ui/form";
import InputFormItem from "@/components/forms/formItems/InputFormItem";
import { handleResErr } from "@/shared/utils/handleResError";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";

interface IProps {
  code: string;
  id: number;
}

const refundSchema = z.object({
  refund_info: z.string({ message: "ادخل ملاحظات" }).optional(),
});

export const RefundTransaction = ({ code, id }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: refundTransaction, isPending } = useRefundTransaction();

  const form = useForm<z.infer<typeof refundSchema>>({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      refund_info: "",
    },
  });

  const onSubmit = async ({ refund_info }: z.infer<typeof refundSchema>) => {
    try {
      const { status, message } = await refundTransaction({
        id,
        refund_info: refund_info || "",
      });

      // ! Refund failed
      if (!status) return toast.error(message);

      // * Refund Success
      return toast.success(message);
    } catch (error) {
      handleResErr(error);
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset();
  };
  const isOptionalField = (fieldName: string) => {
    const optionalFields = ["refund_info"];

    return optionalFields.includes(fieldName);
  };

  return (
    <>
      <Button
        size={"icon"}
        onClick={() => setIsOpen(true)}
        variant={"outline"}
        className={"btn-destructive rounded-full"}
      >
        <RefreshCcwDot size={24} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="استرداد تحصيل"
        description={{
          text: `هل انت متأكد من استراد التحصيل رقم ${code}؟
          لاحظ أنه لايمكن الرجوع في هذا الإجراء`,
          color: "text-red-500",
        }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="refund_info"
              render={({ field }) => (
                <InputFormItem
                  field={field}
                  input={{
                    name: "refund_info",
                    label: "سبب الاستراد",
                    type: "text",
                    placeholder: "ادخل سبب الاستراد",
                  }}
                  isOptionalField={isOptionalField}
                />
              )}
            />

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button onClick={handleCloseModal} variant={"outline"}>
                  إلغاء
                </Button>
              </DialogClose>
              <Button
                className="btn-destructive"
                onClick={() => onSubmit(form.getValues())}
                disabled={isPending}
              >
                استرداد
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </DialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
