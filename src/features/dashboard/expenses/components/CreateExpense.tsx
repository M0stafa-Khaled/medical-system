import { useState } from "react";
import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Modal } from "@/shared/components/Modal";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/shared/animations";
import { handleResErr } from "@/shared/utils/handleResError";
import { useGetAllExpensesCategories } from "../../expenses-categories";
import { useCreateExpense } from "../queriesAndMutations";
import { createExpenseSchema } from "../schema";
import RenderExpensesFormFields from "./RenderExpensesFormFields";
import { EXPENSE_FORM_INPUTS } from "../constants";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";

export const CreateExpense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: expensesCategories } = useGetAllExpensesCategories({});
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
      date: new Date().toISOString().split("T")[0],
      name: "",
      status: true,
      price: 0,
      category_id: "",
    },
  });

  const onSubmit = async (dataForm: z.infer<typeof createExpenseSchema>) => {
    try {
      const { status, message } = await createExpense({
        dataForm: {
          status: dataForm.status ? "1" : "0",
          category_id: dataForm.category_id,
          name: dataForm.name,
          price: dataForm.price,
          date: dataForm.date,
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
        className="dark:btn-primary"
        size={"lg"}
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
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
              variants={containerVariants}
            >
              {EXPENSE_FORM_INPUTS.map((input, idx) => (
                <motion.div
                  key={input.name}
                  custom={idx}
                  variants={itemVariants}
                  className={`${
                    input.name === "name" ||
                    input.name === "category_id" ||
                    input.name === "date"
                      ? "col-span-full"
                      : ""
                  }`}
                >
                  <RenderExpensesFormFields
                    input={input}
                    form={form}
                    schema={createExpenseSchema}
                    categories={expensesCategoriesOptions!}
                  />
                </motion.div>
              ))}
            </motion.div>

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button onClick={handleCloseModal} variant={"outline"}>
                  إلغاء
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                إضافة
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </DialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
