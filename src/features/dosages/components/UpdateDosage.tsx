import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import { Form, FormField } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { dosageSchema } from "../schema";
import { toast } from "react-toastify";
import { Loader2, Pen } from "lucide-react";
import { Modal } from "@/shared/components/Modal";
import { containerVariants, itemVariants } from "@/shared/animations";
import { motion } from "framer-motion";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { handleResErr } from "@/shared/utils/handleResError";
import { useUpdateDosage } from "../queriesAndMutations";
import InputFormItem from "@/shared/components/formItems/InputFormItem";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";

interface IProps {
  id: number;
  name: string;
}
export const UpdateDosage = ({ id, name }: IProps) => {
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
          size={"icon"}
          className="btn-edit rounded-full"
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
            className="space-y-5"
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

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button onClick={handleCloseModal} variant={"outline"}>
                  إلغاء
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                حفظ
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </DialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
