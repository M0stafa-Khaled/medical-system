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
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { DOCTOR_ACTION_INPUTS } from "@/constants";
import doctorActionSchema from "@/validations/doctorActionSchema";
import { useUpdateDoctorAction } from "@/lib/react-query/doctorActions";
import { FaPencil } from "react-icons/fa6";
import { IDoctorAction } from "@/interfaces/doctorActions";

interface IProps {
  doctorId: string;
  action: IDoctorAction;
}
const EditActionModalButton = ({ doctorId, action }: IProps) => {
  const token = cookieServices.getToken() || "";
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: updateDoctorAction, isPending } =
    useUpdateDoctorAction();
  const form = useForm<z.infer<typeof doctorActionSchema>>({
    resolver: zodResolver(doctorActionSchema),
    defaultValues: {
      name: action.name,
      price: action.price,
    },
  });

  const onSubmit = async ({
    name,
    price,
  }: z.infer<typeof doctorActionSchema>) => {
    try {
      const { message, status } = await updateDoctorAction({
        token,
        formData: { name, price: `${price}`, doctor_id: doctorId },
        id: `${action.id}`,
      });
      // ! Update Field
      if (!status) return toast.error(message);
      // * Create Success
      return toast.success(message);
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
      name: action.name,
      price: action.price,
    });
  }, [action, form]);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        className="bg-primary  bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm py-1 px-1 w-9 h-9"
      >
        <FaPencil size={24} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تعديل إجراء"
        description="يمكنك تعديل الإجراء المحدد هنا"
        showFooter={false}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 md:space-y-8"
          >
            <div className="space-y-4">
              {DOCTOR_ACTION_INPUTS.map((input) => (
                <FormField
                  key={input.name}
                  control={form.control}
                  name={input.name as keyof z.infer<typeof doctorActionSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-fit leading-relaxed text-black dark:text-white">
                        {input.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={input.type}
                          min={0}
                          placeholder={input.placeholder}
                          {...field}
                          className="py-3 placeholder:h-14 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-black/50 dark:placeholder:text-white/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <AlertDialogFooter className="text-start !justify-start gap-2">
              <AlertDialogCancel
                onClick={handleCloseModal}
                className="text-black dark:text-white py-3 h-auto"
              >
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="py-3 h-auto"
              >
                تعديل
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default EditActionModalButton;
