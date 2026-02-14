import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import { Form, FormField } from "@/shared/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/shared/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dosageSchema from "@/validations/dashboard/dosageSchema";
import { toast } from "react-toastify";
import { Loader2, Pen } from "lucide-react";
import cookieServices from "@/shared/utils/cookieServices";
import { Modal } from "@/components/shared/Modal";
import { containerVariants, itemVariants } from "@/animations";
import { motion } from "framer-motion";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { handleResErr } from "@/shared/utils/handleResError";
import { useUpdateDosage } from "@/shared/lib/react-query/dashboard/dosages";
import InputFormItem from "@/components/forms/formItems/InputFormItem";

interface IProps {
  id: number;
  name: string;
}
const UpdateDosage = ({ id, name }: IProps) => {
  const token = cookieServices.getToken() || "";

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: updateClinic, isPending } = useUpdateDosage();

  const form = useForm<z.infer<typeof dosageSchema>>({
    resolver: zodResolver(dosageSchema),
    defaultValues: {
      name: name,
    },
  });
  const onSubmit = async ({ name }: z.infer<typeof dosageSchema>) => {
    try {
      const { status, message } = await updateClinic({
        id,
        name,
        token,
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
    form.reset();
  };

  useEffect(() => {
    form.reset({
      name: name,
    });
  }, [name, form]);

  return (
    <>
      <TooltipButton title="تعديل">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          className="h-9 w-9 gap-2 bg-blue-600 px-1 py-1 text-sm text-white hover:bg-blue-700"
        >
          <Pen size={20} />
        </Button>
      </TooltipButton>

      {/* Update Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تعديل جرعة"
        description={{
          text: "يمكنك تعديل الجرعة المحددة من هنا",
        }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 text-black dark:text-white"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
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
              <AlertDialogCancel className="h-auto py-2.5 text-black dark:text-white">
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="h-auto py-2.5"
              >
                حفظ
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateDosage;
