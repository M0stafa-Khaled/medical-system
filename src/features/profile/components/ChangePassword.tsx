import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2, LucideLock } from "lucide-react";
import { Modal } from "@/shared/components/Modal";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import { useChangePassword } from "../queriesAndMutations";
import { handleResErr } from "@/shared/utils/handleResError";
import { changePasswordSchema } from "../schema";
import { CHANGE_PASSWORD_INPUTS } from "../constants";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";
import { IFormInput } from "@/shared/types";
import { Input } from "@/shared/components/ui/input";

interface ChangePasswordProps {
  compact?: boolean;
  fullPage?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
}

export const ChangePassword = ({
  compact,
  fullPage,
  variant = "default",
  className = "",
}: ChangePasswordProps) => {
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
      {compact ? (
        <Button
          variant={variant}
          className={`w-full gap-2 ${className}`}
          onClick={() => setIsOpen(true)}
        >
          <LucideLock className="h-4 w-4" />
          تغيير كلمة المرور
        </Button>
      ) : fullPage ? (
        <Form {...form}>
          <motion.form
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
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
                    <PasswordInput
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

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="h-auto py-2.5"
              >
                تغيير كلمة المرور
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </div>
          </motion.form>
        </Form>
      ) : (
        <Button className="px-4 font-medium!" onClick={() => setIsOpen(true)}>
          تغيير كلمة المرور
        </Button>
      )}

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
                    <PasswordInput
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
              <Button type="submit" disabled={isPending}>
                تغيير كلمة المرور
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </DialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

const PasswordInput = ({
  input,
  field,
}: {
  input: IFormInput;
  field: ControllerRenderProps<any>;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormItem>
      <FormLabel htmlFor={input.name}>{input.label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            className="absolute top-2/4 left-3 grid -translate-y-2/4 place-items-center"
            name={showPassword ? "اخفاء كلمة المرور" : "عرض كلمة المرور"}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </Button>
          <Input
            id={input.name}
            placeholder={input.placeholder}
            type={showPassword ? "text" : input.type}
            {...field}
            className="placeholder:text-muted-foreground h-auto py-2.5 pr-2 pl-9 placeholder:h-14 placeholder:text-sm md:py-3.5"
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
