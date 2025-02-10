import { FaPencil } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clinicSchema from "@/validations/clinicSchema";
import { useUpdateClinic } from "@/lib/react-query/clinics";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import cookieServices from "@/utils/cookieServices";

interface IProps {
  id: number;
  name: string;
  status: boolean;
}
const EditClinicModalButton = ({ id, name, status }: IProps) => {
  const token = cookieServices.getToken() || "";

  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const { mutateAsync: updateClinic, isPending } = useUpdateClinic();

  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: name,
      status: status,
    },
  });
  const onSubmit = async ({ name, status }: z.infer<typeof clinicSchema>) => {
    try {
      const {
        status: statusServer,
        message,
        data,
      } = await updateClinic({ id, name, status, token });

      // ! Create Field
      if (!statusServer) return toast.error(message);
      // * Create Success
      return toast.success(`${message} (${data.name})`);
    } catch (error) {
      const errorObj = error as AxiosError<{ message: string }>;
      toast.error(errorObj.response?.data.message || "هناك خطأ حاول لاحقا");
    } finally {
      setIsOpenEditModal(false);
      form.reset({ name, status });
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpenEditModal(true);
        }}
        size={"sm"}
        className="bg-primary text-white dark:text-black gap-2 text-sm"
      >
        تعديل
        <FaPencil size={18} />
      </Button>

      {/* Edit Modal */}
      <AlertDialog
        open={isOpenEditModal}
        onOpenChange={() =>
          setIsOpenEditModal((prev) => {
            form.reset();
            return !prev;
          })
        }
      >
        <AlertDialogContent className="border-muted">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black dark:text-white text-center">
              تعديل العيادة
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              تعديل عيادة{" "}
              <span className="font-bold text-black dark:text-white">
                {name}
              </span>
              ؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-fit leading-relaxed text-black dark:text-white">
                        اسم العيادة:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="اسم العيادة"
                          {...field}
                          value={field.value}
                          onChange={(e) =>
                            form.setValue("name", e.target.value)
                          }
                          className="py-3 placeholder:h-14 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-black/50 dark:placeholder:text-white/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-4">
                      <FormLabel className="text-black dark:text-white">
                        متاحة:
                      </FormLabel>
                      <FormControl>
                        <Switch
                          dir="ltr"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=unchecked]:bg-black/50 dark:data-[state=unchecked]:bg-white/50"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <AlertDialogFooter className="text-start !justify-start gap-2">
                  <AlertDialogCancel className="text-black dark:text-white">
                    إلغاء
                  </AlertDialogCancel>
                  <Button type="submit" disabled={isPending}>
                    حفظ
                    {isPending && <Loader2 className="animate-spin" />}
                  </Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditClinicModalButton;
