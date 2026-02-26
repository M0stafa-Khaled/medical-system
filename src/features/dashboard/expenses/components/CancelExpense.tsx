import { useState } from "react";
import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Modal } from "@/shared/components/Modal";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/shared/animations";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { handleResErr } from "@/shared/utils/handleResError";
import { cancelExpenseSchema } from "@/features/dashboard/expenses/schema";
import { useCancelExpense } from "../queriesAndMutations";
import RenderExpensesFormFields from "./RenderExpensesFormFields";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";

export const CancelExpense = ({ id }: { id: number }) => {
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
          size={"icon"}
          onClick={() => setIsOpen(true)}
          className="btn-destructive rounded-full"
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
            className="space-y-6"
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

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button onClick={handleCloseModal} variant={"outline"}>
                  إلغاء
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isPending}
                className="h-auto py-2.5"
                variant={"destructive"}
              >
                تأكيد
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </DialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
