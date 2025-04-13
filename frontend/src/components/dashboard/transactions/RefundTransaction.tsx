import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { useRefundTransaction } from "@/lib/react-query/dashboard/transactions/transactions";
import cookieServices from "@/utils/cookieServices";
import { Loader2, RefreshCcwDot } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { containerVariants } from "@/animations/dashboardAnimations";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import InputFormItem from "@/components/forms/formItems/InputFormItem";
import handleResErr from "@/utils/handleResponseError";

interface IProps {
  code: string;
  id: number;
}

const refundSchema = z.object({
  refund_info: z.string({ message: "ادخل ملاحظات" }).optional(),
});

const RefundTransaction = ({ code, id }: IProps) => {
  const token = cookieServices.getToken() || "";
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
        token,
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
        size={"sm"}
        onClick={() => setIsOpen(true)}
        variant={"destructive"}
        className="text-white gap-2 text-sm  py-1 px-1 w-9 h-9"
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
            className="space-y-4 text-black dark:text-white"
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

            <AlertDialogFooter className="text-start !justify-start gap-2">
              <AlertDialogCancel
                onClick={handleCloseModal}
                className="text-black dark:text-white py-2.5 h-auto"
              >
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                variant={"destructive"}
                className="py-2.5 h-auto"
              >
                استرداد
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default RefundTransaction;
