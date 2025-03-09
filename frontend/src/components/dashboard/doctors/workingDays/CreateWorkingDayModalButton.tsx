import { useState } from "react";
import { Form } from "@/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
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
import { DOCTOR_WORKING_DAY_INPUTS } from "@/constants";
import doctorActionSchema from "@/validations/doctorActionSchema";
import { useCreateDoctorAction } from "@/lib/react-query/doctors/doctorActions";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import RenderFormFields from "@/components/forms/RenderFormFields";
import { IClinic } from "@/interfaces/clinic";

interface IProps {
  clinics: IClinic[];
  doctorId: string;
}

const CreateWorkingDayButton = ({ doctorId, clinics }: IProps) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);

  const clinicsOptions = clinics?.map((clinic) => ({
    value: clinic.id.toString(),
    label: clinic.name,
  }));

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
      setIsOpen(false);
      form.reset();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant={"outline"}
        className="w-full md:w-fit bg-primary md:bg-transparent md:text-primary text-primary-foreground gap-2 hover:!bg-primary hover:!text-white !border-primary dark:hover:!text-black h-auto py-3 !rounded-lg font-semibold"
      >
        إضافة يوم عمل
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="إضافة يوم عمل"
        description={{
          text: "يمكنك اضافة يوم عمل جديد من هنا",
        }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 text-black dark:text-white"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DOCTOR_WORKING_DAY_INPUTS.map((input, idx) => (
                <motion.div
                  variants={itemVariants}
                  key={input.name}
                  custom={idx}
                >
                  <RenderFormFields
                    input={input}
                    form={form}
                    schema={doctorActionSchema}
                    options={{
                      clinic_name: clinicsOptions!,
                    }}
                  />
                </motion.div>
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
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default CreateWorkingDayButton;
