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
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { EXPENSE_FORM_INPUTS } from "@/constants";
import { motion } from "framer-motion";
import RenderFormFields from "@/components/forms/dashboard/RenderFormFields";
import {
  itemVariants,
  containerVariants,
} from "@/animations/dashboardAnimations";
import createExpenseSchema from "@/validations/createExpenseSchema";
import { useCreateExpense } from "@/lib/react-query/dashboard/expenses/expenses";
import { useGetAllExpensesCategories } from "@/lib/react-query/dashboard/expenses/expensesCategories";
import handleResErr from "@/utils/handleResponseError";

const CreateExpense = () => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);
  const { data: expensesCategories } = useGetAllExpensesCategories({ token });
  const { mutateAsync: createExpense, isPending } = useCreateExpense();

  const expensesCategoriesOptions = expensesCategories?.data?.map(
    (category) => ({
      value: category.id.toString(),
      label: category.name,
    })
  );

  const form = useForm<z.infer<typeof createExpenseSchema>>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      name: "",
      status: true,
      price: 0,
    },
  });

  const onSubmit = async (dataForm: z.infer<typeof createExpenseSchema>) => {
    try {
      const { status, message } = await createExpense({
        token,
        dataForm: {
          status: dataForm.status ? "1" : "0",
          category_id: dataForm.category_id.value,
          name: dataForm.name,
          price: dataForm.price,
        },
      });

      // ! Create failed
      if (!status) return toast.error(message);

      // * Create Success
      return toast.success(message || "تم إضافة مصروف جديد بنجاح");
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
        className="flex items-center gap-2 h-auto py-3"
      >
        إضافة مصروف
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="إضافة مصروف جديد"
        description={{
          text: "يمكنك اضافة مصروف جديد من هنا",
        }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-3 text-black dark:text-white"
              variants={containerVariants}
            >
              {EXPENSE_FORM_INPUTS.map((input, idx) => (
                <motion.div
                  key={input.name}
                  custom={idx}
                  variants={itemVariants}
                  className={`${
                    input.name === "name" || input.name === "category_id"
                      ? "col-span-full"
                      : ""
                  }`}
                >
                  <RenderFormFields
                    input={input}
                    form={form as any}
                    schema={createExpenseSchema}
                    options={{ categories: expensesCategoriesOptions! }}
                  />
                </motion.div>
              ))}
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
              >
                إضافة
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default CreateExpense;
