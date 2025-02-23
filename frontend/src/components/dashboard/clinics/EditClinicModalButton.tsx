import { FaPencil } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
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
import Modal from "@/components/shared/Modal";

interface IProps {
  id: number;
  name: string;
  status: boolean;
}
const EditClinicModalButton = ({ id, name, status }: IProps) => {
  const token = cookieServices.getToken() || "";

  const [isOpen, setIsOpen] = useState<boolean>(false);
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
      status: status,
    });
  }, [name, status, form]);

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        className="bg-primary  bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm py-1 px-1 w-9 h-9"
      >
        <FaPencil size={24} />
      </Button>

      {/* Edit Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تعديل عيادة"
        description="يمكنك تعديل العيادة المحددة هنا"
        showFooter={false}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      onChange={(e) => form.setValue("name", e.target.value)}
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
                      className="data-[state=unchecked]:bg-black/50 data-[state=checked]:bg-green-700 dark:data-[state=unchecked]:bg-white/50 dark:data-[state=checked]:bg-green-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <AlertDialogFooter className="text-start !justify-start gap-2">
              <AlertDialogCancel className="text-black dark:text-white py-3 h-auto">
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="py-3 h-auto"
              >
                حفظ
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </Modal>
    </div>
  );
};

export default EditClinicModalButton;
