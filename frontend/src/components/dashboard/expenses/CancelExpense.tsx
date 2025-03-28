import { useState } from "react";
import { Form } from "@/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import RenderFormFields from "@/components/forms/dashboard/RenderFormFields";
import {
  itemVariants,
  containerVariants,
} from "@/animations/dashboardAnimations";
import { useCancelExpense } from "@/lib/react-query/dashboard/expenses/expenses";
import { MdDoNotDisturbAlt } from "react-icons/md";
import TooltipButton from "@/components/ui/TooltipButton";
import handleResErr from "@/utils/handleResponseError";

const CancelExpense = ({ id }: { id: number }) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: cancelExpense, isPending } = useCancelExpense();
  const cancelExpenseSchema = z.object({
    cancelled_info: z
      .string({ message: "السبب مطلوب" })
      .nonempty({ message: "السبب مطلوب" }),
  });

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
          className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white gap-2 text-sm  py-1 px-1 w-9 h-9"
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
              <RenderFormFields
                input={{
                  name: "cancelled_info",
                  label: "سبب الإلغاء",
                  type: "text",
                  placeholder: "اذكر سبب الإلغاء",
                }}
                form={form as any}
                schema={cancelExpenseSchema}
              />
            </motion.div>

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
                className="py-2.5 h-auto"
                variant={"destructive"}
              >
                تأكيد
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default CancelExpense;
