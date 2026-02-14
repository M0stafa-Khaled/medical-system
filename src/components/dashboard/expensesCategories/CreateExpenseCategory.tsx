import { memo, useState } from "react";
import { Form, FormField } from "@/shared/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/shared/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import cookieServices from "@/shared/utils/cookieServices";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/animations";
import { useCreateExpenseCategory } from "@/shared/lib/react-query/dashboard/expenses/expensesCategories";
import { handleResErr } from "@/shared/utils/handleResError";
import { expenseCategorySchema } from "@/validations/dashboard/expenseSchema";
import InputFormItem from "@/components/forms/formItems/InputFormItem";

const CreateExpenseCategory = () => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: createCategory, isPending } = useCreateExpenseCategory();

  const form = useForm<z.infer<typeof expenseCategorySchema>>({
    resolver: zodResolver(expenseCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async ({ name }: z.infer<typeof expenseCategorySchema>) => {
    try {
      const { status, message } = await createCategory({
        token,
        name,
      });

      // ! Create failed
      if (!status) return toast.error(message);

      // * Create Success
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

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex h-auto items-center gap-2 py-3"
      >
        إضافة تصنيف
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="إضافة تصنيف جديد"
        description={{ text: "يمكنك اضافة تصنيف جديد من هنا" }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 text-black dark:text-white"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <InputFormItem
                    field={field}
                    input={{
                      name: "name",
                      label: "اسم التصنيف",
                      type: "text",
                      placeholder: "اسم التصنيف",
                    }}
                  />
                )}
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
              >
                إضافة
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default memo(CreateExpenseCategory);
