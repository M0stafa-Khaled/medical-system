import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
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
import { useUpdateDoctorAction } from "@/lib/react-query/dashboard/doctors/doctorActions";
import { FaPencil } from "react-icons/fa6";
import { IDoctorAction } from "@/interfaces/dashboard/doctors/doctorActions";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import RenderFormFields from "@/components/forms/dashboard/RenderFormFields";

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
      const errorObj = error as AxiosError<{
        errors: { [key: string]: string[] };
        message: string;
      }>;
      if (errorObj?.response?.data.errors) {
        Object.keys(errorObj.response.data.errors).forEach((key) => {
          errorObj?.response?.data.errors[key].forEach((error) =>
            toast.error(error, {
              autoClose: 5000,
            })
          );
        });
      }
      if (
        errorObj?.response?.data.message &&
        !errorObj?.response?.data.errors
      ) {
        toast.error(errorObj?.response?.data.message, {
          autoClose: 5000,
        });
      }
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
                <RenderFormFields
                  input={input}
                  form={form}
                  schema={doctorActionSchema}
                />
              </motion.div>
            ))}
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
                تعديل
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateAction;
