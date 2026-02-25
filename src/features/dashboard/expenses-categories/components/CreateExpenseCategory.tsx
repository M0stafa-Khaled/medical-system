import { useState } from "react";
import { Form, FormField } from "@/shared/components/ui/form";
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
import InputFormItem from "@/components/forms/formItems/InputFormItem";
import { useCreateExpenseCategory } from "../queriesAndMutations";
import { expenseCategorySchema } from "../schema";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";

export const CreateExpenseCategory = () => {
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
        size={"lg"}
        className="dark:btn-primary"
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
            className="space-y-4"
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
