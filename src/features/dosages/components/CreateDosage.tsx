import { useState } from "react";
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
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { handleResErr } from "@/shared/utils/handleResError";
import { useCreateDosage } from "@/features/dosages/queriesAndMutations";
import { dosageSchema } from "../schema";
import InputFormItem from "@/components/forms/formItems/InputFormItem";

export const CreateDosage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: createClinic, isPending } = useCreateDosage();

  const form = useForm<z.infer<typeof dosageSchema>>({
    resolver: zodResolver(dosageSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async ({ name }: z.infer<typeof dosageSchema>) => {
    try {
      const { status, message } = await createClinic({
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
        className="dark:btn-primary"
        size={"lg"}
      >
        إضافة جرعة جديدة
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="إضافة جرعة جديدة"
        description={{
          text: "يمكنك اضافة جرعة جديدة من هنا",
        }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <motion.div variants={itemVariants}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <InputFormItem
                    field={field}
                    input={{
                      name: "name",
                      label: "اسم الجرعة",
                      placeholder: "ادخل اسم الجرعة",
                      type: "text",
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
