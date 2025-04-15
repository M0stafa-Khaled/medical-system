import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Form, FormField } from "@/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dosageSchema from "@/validations/dashboard/dosageSchema";
import { toast } from "react-toastify";
import { Loader2, Pen } from "lucide-react";
import cookieServices from "@/utils/cookieServices";
import Modal from "@/components/shared/Modal";
import { containerVariants, itemVariants } from "@/animations";
import { motion } from "framer-motion";
import TooltipButton from "@/components/ui/TooltipButton";
import handleResErr from "@/utils/handleResponseError";
import { useUpdateDosage } from "@/lib/react-query/dashboard/dosages";
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
          className="bg-primary  bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm py-1 px-1 w-9 h-9"
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

            <AlertDialogFooter className="text-start !justify-start gap-2">
              <AlertDialogCancel className="text-black dark:text-white py-2.5 h-auto">
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="py-2.5 h-auto"
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
