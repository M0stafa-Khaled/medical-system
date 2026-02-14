import { useEffect, useState } from "react";
import { Form } from "@/shared/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/shared/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { toast } from "react-toastify";
import { Loader2, Pen } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import cookieServices from "@/shared/utils/cookieServices";
import { DOCTOR_ACTION_INPUTS } from "@/constants";
import doctorActionSchema from "@/validations/dashboard/doctorActionSchema";
import { useUpdateDoctorAction } from "@/shared/lib/react-query/dashboard/doctors/doctorActions";
import { IDoctorAction } from "@/interfaces/dashboard/doctors/doctorActions";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { handleResErr } from "@/shared/utils/handleResError";
import RenderDoctorFormFields from "@/components/forms/dashboard/doctors/RenderDoctorFormFields";

interface IProps {
  doctorId: string;
  action: IDoctorAction;
}
const UpdateAction = ({ doctorId, action }: IProps) => {
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
      // ! Update failed
      if (!status) return toast.error(message);
      // * Create Success
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
      name: action.name,
      price: action.price,
    });
  }, [action, form]);

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

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تعديل إجراء"
        description={{
          text: "يمكنك تعديل الإجراء المحدد هنا",
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
            {DOCTOR_ACTION_INPUTS.map((input, idx) => (
              <motion.div variants={itemVariants} key={input.name} custom={idx}>
                <RenderDoctorFormFields
                  input={input}
                  form={form}
                  schema={doctorActionSchema}
                />
              </motion.div>
            ))}
            <AlertDialogFooter className="justify-start! gap-2 text-start">
              <AlertDialogCancel
                onClick={handleCloseModal}
                className="h-auto py-2.5 text-black dark:text-white"
              >
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="h-auto py-2.5"
              >
                تعديل
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateAction;
