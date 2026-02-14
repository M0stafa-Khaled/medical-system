import { useState } from "react";
import { Form } from "@/shared/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/shared/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import cookieServices from "@/shared/utils/cookieServices";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/animations";
import { useCancelExpense } from "@/shared/lib/react-query/dashboard/expenses/expenses";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { handleResErr } from "@/shared/utils/handleResError";
import { cancelExpenseSchema } from "@/validations/dashboard/expenseSchema";
import RenderExpensesFormFields from "@/components/forms/dashboard/expenses/RenderExpensesFormFields";

const CancelExpense = ({ id }: { id: number }) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: cancelExpense, isPending } = useCancelExpense();

  const form = useForm<z.infer<typeof cancelExpenseSchema>>({
    resolver: zodResolver(cancelExpenseSchema),
    defaultValues: {
      cancelled_info: "",
    },
  });

  const onSubmit = async ({
    cancelled_info,
  }: z.infer<typeof cancelExpenseSchema>) => {
    try {
      const { status, message } = await cancelExpense({
        token,
        id: `${id}`,
        cancelled_info,
      });

      // ! Cancel failed
      if (!status) return toast.error(message);

      // * Cancel Success
      return toast.success(message);
    } catch (error) {
      handleResErr(error);
    } finally {
      setIsOpen(false);
      form.reset();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset();
  };

  return (
    <>
      <TooltipButton title="إلغاء">
        <Button
          size={"sm"}
          onClick={() => setIsOpen(true)}
          className="h-9 w-9 gap-2 bg-gray-600 px-1 py-1 text-sm text-white hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600"
        >
          <MdDoNotDisturbAlt size={24} />
        </Button>
      </TooltipButton>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="إلغاء مصروف"
        description={{
          text: "يرجى العلم أن الإلغاء لا يمكن التراجع عنه!",
          color: "text-red-700",
        }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-black dark:text-white"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <RenderExpensesFormFields
                form={form}
                input={{
                  name: "cancelled_info",
                  label: "سبب الإلغاء",
                  type: "text",
                  placeholder: "اذكر سبب الإلغاء",
                }}
                schema={cancelExpenseSchema}
              />
            </motion.div>

            <AlertDialogFooter className="justify-start! gap-2 text-start">
              <AlertDialogCancel
                onClick={handleCloseModal}
                className="h-auto py-2.5 text-black dark:text-white"
              >
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="h-auto py-2.5"
                variant={"destructive"}
              >
                تأكيد
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default CancelExpense;
