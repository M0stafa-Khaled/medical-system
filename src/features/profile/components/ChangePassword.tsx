import { useState } from "react";
import { Form, FormField } from "@/shared/components/ui/form";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Modal } from "@/shared/components/Modal";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import { useChangePassword } from "../queriesAndMutations";
import { handleResErr } from "@/shared/utils/handleResError";
import { changePasswordSchema } from "../schema";
import InputFormItem from "@/components/forms/formItems/InputFormItem";
import { CHANGE_PASSWORD_INPUTS } from "../constants";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";

export const ChangePassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async ({
    password,
    password_confirmation,
  }: z.infer<typeof changePasswordSchema>) => {
    try {
      const { status, message } = await changePassword({
        password,
        password_confirmation,
      });

      // ! Change failed
      if (!status) return toast.error(message);

      // * change Success
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
      <Button className="px-4 font-medium!" onClick={() => setIsOpen(true)}>
        تغيير كلمة المرور
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تغيير كلمة المرور"
        description={{
          text: "يمكنك تغيير كلمة المرور من هنا",
        }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3"
          >
            {CHANGE_PASSWORD_INPUTS.map((input) => (
              <motion.div
                variants={itemVariants}
                key={input.name}
                custom={input.name}
              >
                <FormField
                  control={form.control}
                  name={
                    input.name as keyof z.infer<typeof changePasswordSchema>
                  }
                  render={({ field }) => (
                    <InputFormItem
                      field={
                        field as unknown as ControllerRenderProps<
                          FieldValues,
                          string
                        >
                      }
                      input={input}
                    />
                  )}
                />
              </motion.div>
            ))}

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button onClick={handleCloseModal} variant={"outline"}>
                  إلغاء
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isPending}
                className="h-auto py-2.5"
              >
                تحديث
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </DialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
