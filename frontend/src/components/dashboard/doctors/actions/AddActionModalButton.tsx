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
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { DOCTOR_ACTION_INPUTS } from "@/constants";
import doctorActionSchema from "@/validations/doctorActionSchema";
import { useCreateDoctorAction } from "@/lib/react-query/doctorActions";

const AddActionButton = ({ doctorId }: { doctorId: string }) => {
  const token = cookieServices.getToken() || "";
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const { mutateAsync: createDoctorAction, isPending } =
    useCreateDoctorAction();
  const form = useForm<z.infer<typeof doctorActionSchema>>({
    resolver: zodResolver(doctorActionSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const onSubmit = async ({
    name,
    price,
  }: z.infer<typeof doctorActionSchema>) => {
    try {
      const { message, status } = await createDoctorAction({
        token,
        formData: { name, price: `${price}`, doctor_id: doctorId },
      });
      // ! Create failed
      if (!status) return toast.error(message);
      // * Create Success
      return toast.success(message);
    } catch (error) {
      const errorObj = error as AxiosError<{ message: string }>;
      toast.error(errorObj.response?.data.message || "هناك خطأ حاول لاحقا");
    } finally {
      setIsOpenAddModal(false);
      form.reset();
    }
  };

  const handleCloseModal = () => {
    setIsOpenAddModal(false);
    form.reset();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpenAddModal(true)}
        variant={"outline"}
        className="w-full md:w-fit bg-primary md:bg-transparent md:text-primary text-primary-foreground gap-2 hover:!bg-primary hover:!text-white !border-primary dark:hover:!text-black h-auto py-3 !rounded-lg font-semibold"
      >
        إضافة إجراء
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpenAddModal}
        onOpenChange={handleCloseModal}
        title="إضافة إجراء"
        description={{
          text: "يمكنك اضافة إجراء جديد من هنا",
        }}
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
                className="text-black dark:text-white py-2.5 h-auto"
              >
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="py-2.5 h-auto"
              >
                إضافة
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default AddActionButton;
