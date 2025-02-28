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
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { EXPENSE_FORM_INPUTS } from "@/constants";
import { motion } from "framer-motion";
import RenderFormFields from "@/components/forms/RenderFormFields";
import {
  itemVariants,
  containerVariants,
} from "@/animations/dashboardAnimations";
import addExpenseSchema from "@/validations/addExpenseSchema";
import { useCreateExpense } from "@/lib/react-query/expenses";
import { useGetAllExpensesCategories } from "@/lib/react-query/expensesCategories";

const AddExpenseButton = () => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);
  const { data: expensesCategories } = useGetAllExpensesCategories({ token });
  const { mutateAsync: createExpense, isPending } = useCreateExpense();

  const expensesCategoriesOptions = expensesCategories?.data.map(
    (category) => ({
      value: category.id.toString(),
      label: category.name,
    })
  );
  const form = useForm<z.infer<typeof addExpenseSchema>>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: {
      name: "",
      status: true,
      price: 0,
      category_id: {
        value: "",
        label: "",
      },
    },
  });

  const onSubmit = async (dataForm: z.infer<typeof addExpenseSchema>) => {
    try {
      const { status, message } = await createExpense({
        token,
        dataForm: {
          status: dataForm.status ? "1" : "0",
          category_id: dataForm.category_id.value,
          description: dataForm.description || "",
          name: dataForm.name,
          price: dataForm.price,
        },
      });

      // ! Create Field
      if (!status) return toast.error(message);

      // * Create Success
      return toast.success(message);
    } catch (error) {
      const errorObj = error as AxiosError<{
        errors: { [key: string]: string[] };
        message: string;
      }>;
      if (errorObj?.response?.data.errors) {
        Object.keys(errorObj.response.data.errors).forEach((key) => {
          errorObj?.response?.data.errors[key].forEach((error) =>
            toast.error(error, {
              autoClose: 5000,
            })
          );
        });
      }
      if (errorObj?.response?.data.message) {
        toast.error(errorObj?.response?.data.message, {
          autoClose: 5000,
        });
      }
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
      <Button
        onClick={() => setIsOpen(true)}
        size={"sm"}
        variant={"outline"}
        className="bg-primary md:bg-transparent md:text-primary text-primary-foreground gap-2 hover:!bg-primary hover:!text-white !border-primary dark:hover:!text-black py-[1.4rem] !rounded-lg font-semibold"
      >
        إضافة مصروف
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="إضافة مصروف جديد"
        description="يمكنك اضافة مصروف جديد من هنا"
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
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white"
              variants={containerVariants}
            >
              {EXPENSE_FORM_INPUTS.map((input, idx) => (
                <motion.div
                  key={input.name}
                  custom={idx}
                  variants={itemVariants}
                >
                  <RenderFormFields
                    input={input}
                    form={form as any}
                    schema={addExpenseSchema}
                    categories={expensesCategoriesOptions}
                  />
                </motion.div>
              ))}
            </motion.div>

            <AlertDialogFooter className="text-start !justify-start gap-2">
              <AlertDialogCancel
                onClick={handleCloseModal}
                className="text-black dark:text-white py-3 h-auto"
              >
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="py-3 h-auto"
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

export default AddExpenseButton;
