import { useEffect, useState } from "react";
import { Form, FormField } from "@/shared/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/shared/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { toast } from "react-toastify";
import { Loader2, Pen } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/animations";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { handleResErr } from "@/shared/utils/handleResError";
import InputFormItem from "@/components/forms/formItems/InputFormItem";
import { IExpenseCategory } from "../types";
import { useUpdateExpenseCategory } from "../queriesAndMutations";
import { expenseCategorySchema } from "../schema";

interface IProps {
  category: IExpenseCategory;
}
export const UpdateExpenseCategory = ({ category }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: updateCategory, isPending } = useUpdateExpenseCategory();

  const form = useForm<z.infer<typeof expenseCategorySchema>>({
    resolver: zodResolver(expenseCategorySchema),
    defaultValues: {
      name: category.name,
    },
  });

  const onSubmit = async ({ name }: z.infer<typeof expenseCategorySchema>) => {
    try {
      const { status, message } = await updateCategory({
        id: `${category.id}`,
        name,
      });

      // ! Update failed
      if (!status) return toast.error(message);

      // * Update Success
      return toast.success(message);
    } catch (error) {
      handleResErr(error);
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset({
      name: category.name,
    });
  };
  useEffect(() => {
    form.reset({
      name: category.name,
    });
  }, [form, category]);

  return (
    <>
      <TooltipButton title="تعديل">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          size={"icon"}
          className="btn-edit rounded-full"
        >
          <Pen size={20} />
        </Button>
      </TooltipButton>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تعديل تصنيف"
        description={{
          text: "يمكنك تعديل التصنيف المحدد هنا",
        }}
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
            <motion.div custom={"category-name"} variants={itemVariants}>
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
              <AlertDialogCancel onClick={handleCloseModal}>
                إلغاء
              </AlertDialogCancel>
              <Button type="submit" disabled={isPending}>
                تعديل
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
