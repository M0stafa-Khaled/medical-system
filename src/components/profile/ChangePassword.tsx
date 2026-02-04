import { useState } from "react";
import { Form, FormField } from "@/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { changePasswordSchema } from "@/validations/dashboard/profileSchema";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { CHANGE_PASSWORD_INPUTS } from "@/constants";
import InputFormItem from "../forms/formItems/InputFormItem";
import { useChangePassword } from "@/lib/react-query/profile/profile";
import handleResErr from "@/utils/handleResponseError";

const ChangePassword = () => {
  const token = cookieServices.getToken()!;
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
        token,
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
            className="space-y-3 text-black dark:text-white"
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

            <AlertDialogFooter className="text-start justify-start! gap-2">
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
                تحديث
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePassword;
